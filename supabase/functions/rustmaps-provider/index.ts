// RustMaps Provider Integration Edge Function.
//
// Frontend -> this function -> RustMaps Public API v4 (X-API-Key) -> DB cache.
// The map is rendered INSIDE RustMasterTool. No rustmaps.com redirect, no
// API key in the frontend, no internal RustMaps API, no user bearer tokens.
//
// Contract (POST /functions/v1/rustmaps-provider):
//   { action: "get_or_create", seed, worldSize, battlemetricsServerId?, staging? }
//   { action: "poll", cacheKey }
//
// Always responds HTTP 200 with a unified JSON shape so supabase-js does not
// throw a generic FunctionsHttpError; real status lives in `state`/`ok`.
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type ProviderState =
  | "idle" | "queued" | "in_queue" | "generating" | "processing" | "uploading"
  | "active" | "failed" | "unavailable" | "quota_exhausted" | "provider_not_configured";

const PENDING_STATES: ProviderState[] = ["queued", "in_queue", "generating", "processing", "uploading"];

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function buildCacheKey(worldSize: number, seed: number, staging: boolean): string {
  return `procedural:${worldSize}:${seed}:${staging}`;
}

// Map RustMaps' MapStates enum onto our lowercase state set.
function normalizeProviderState(raw: unknown): ProviderState {
  switch (String(raw ?? "").toLowerCase()) {
    case "active": return "active";
    case "inqueue": return "in_queue";
    case "generating": return "generating";
    case "processing": return "processing";
    case "uploading": return "uploading";
    default: return "queued";
  }
}

// Extract the fields we care about from a RustMaps MapAPIDTO / MapStatusDTO.
function normalizeMapDto(dto: any) {
  const monuments = Array.isArray(dto?.monuments) ? dto.monuments : [];
  const mapStats = {
    landPercentageOfMap: dto?.landPercentageOfMap ?? null,
    islands: dto?.islands ?? null,
    mountains: dto?.mountains ?? null,
    iceLakes: dto?.iceLakes ?? null,
    rivers: dto?.rivers ?? null,
    lakes: dto?.lakes ?? null,
    canyons: dto?.canyons ?? null,
    oases: dto?.oases ?? null,
    buildableRocks: dto?.buildableRocks ?? null,
  };
  return {
    rustmaps_id: dto?.id ?? dto?.mapId ?? null,
    map_url: dto?.url ?? null,
    raw_image_url: dto?.rawImageUrl ?? null,
    image_url: dto?.imageUrl ?? null,
    image_icon_url: dto?.imageIconUrl ?? null,
    thumbnail_url: dto?.thumbnailUrl ?? null,
    download_url: dto?.downloadUrl ?? null,
    can_download: Boolean(dto?.canDownload),
    total_monuments: typeof dto?.totalMonuments === "number" ? dto.totalMonuments : monuments.length,
    monuments,
    biome_percentages: dto?.biomePercentages ?? null,
    map_stats: mapStats,
    queue_position: typeof dto?.queuePosition === "number" ? dto.queuePosition : null,
    current_step: dto?.currentStep ?? null,
    estimated_deletion_date: dto?.estimatedDeletionDate ?? null,
  };
}

// Shape a cache row into the unified client response.
function toResponse(ok: boolean, state: ProviderState, cacheKey: string, row: any, message?: string) {
  return {
    ok,
    state,
    cacheKey,
    data: {
      seed: row?.seed ?? null,
      worldSize: row?.world_size ?? null,
      rustmapsId: row?.rustmaps_id ?? null,
      mapUrl: row?.map_url ?? null,
      imageUrl: row?.image_url ?? null,
      rawImageUrl: row?.raw_image_url ?? null,
      imageIconUrl: row?.image_icon_url ?? null,
      thumbnailUrl: row?.thumbnail_url ?? null,
      totalMonuments: row?.total_monuments ?? null,
      monuments: row?.monuments ?? [],
      biomePercentages: row?.biome_percentages ?? null,
      mapStats: row?.map_stats ?? null,
      queuePosition: row?.queue_position ?? null,
      currentStep: row?.current_step ?? null,
    },
    message: message ?? null,
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const apiKey = Deno.env.get("RUSTMAPS_API_KEY");
  const apiBase = (Deno.env.get("RUSTMAPS_API_BASE_URL") || "https://api.rustmaps.com").replace(/\/+$/, "");
  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, state: "failed", message: "Invalid JSON body." });
  }

  const action: string = body?.action ?? "get_or_create";

  // Provider is optional at rest: never leak or crash when the key is absent.
  if (!apiKey) {
    return json({
      ok: false,
      state: "provider_not_configured",
      message: "RustMaps Provider is not configured yet.",
    });
  }

  if (!supabaseUrl || !serviceRoleKey) {
    return json({ ok: false, state: "failed", message: "Server storage is not configured." });
  }

  const db = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Thin RustMaps API caller. Returns status + parsed JSON, never throws.
  async function callProvider(path: string, init: RequestInit = {}): Promise<{ status: number; data: any }> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const res = await fetch(`${apiBase}${path}`, {
        ...init,
        headers: { "X-API-Key": apiKey!, "Content-Type": "application/json", ...(init.headers || {}) },
        signal: controller.signal,
      });
      let data: any = null;
      try { data = await res.json(); } catch { data = null; }
      return { status: res.status, data };
    } catch (_e) {
      // Network/timeout — do not leak details.
      return { status: 0, data: null };
    } finally {
      clearTimeout(timeout);
    }
  }

  async function upsertCache(cacheKey: string, patch: Record<string, unknown>) {
    const payload = { cache_key: cacheKey, provider_checked_at: new Date().toISOString(), ...patch };
    const { data, error } = await db
      .from("rustmaps_map_cache")
      .upsert(payload, { onConflict: "cache_key" })
      .select("*")
      .single();
    if (error) {
      console.error("cache upsert failed", error.message);
      return null;
    }
    return data;
  }

  async function readCache(cacheKey: string) {
    const { data } = await db.from("rustmaps_map_cache").select("*").eq("cache_key", cacheKey).maybeSingle();
    return data;
  }

  // Map a provider DTO into a cache patch + resolved state.
  function dtoToPatch(dto: any, base: { seed: number; worldSize: number; staging: boolean; battlemetricsServerId?: string }) {
    const norm = normalizeMapDto(dto);
    const state = normalizeProviderState(dto?.state ?? (norm.image_url || norm.raw_image_url ? "active" : "generating"));
    const patch: Record<string, unknown> = {
      seed: base.seed,
      world_size: base.worldSize,
      staging: base.staging,
      state,
      rustmaps_id: norm.rustmaps_id,
      queue_position: norm.queue_position,
      current_step: norm.current_step,
      map_url: norm.map_url,
      raw_image_url: norm.raw_image_url,
      image_url: norm.image_url,
      image_icon_url: norm.image_icon_url,
      thumbnail_url: norm.thumbnail_url,
      download_url: norm.download_url,
      can_download: norm.can_download,
      total_monuments: norm.total_monuments,
      monuments: norm.monuments,
      biome_percentages: norm.biome_percentages,
      map_stats: norm.map_stats,
      estimated_deletion_date: norm.estimated_deletion_date,
      provider_payload: dto ?? null,
      last_error: null,
    };
    if (base.battlemetricsServerId) patch.battlemetrics_server_id = base.battlemetricsServerId;
    if (state === "active") patch.generated_at = new Date().toISOString();
    return { patch, state };
  }

  // Translate a provider HTTP error into a state.
  function errorState(status: number): { state: ProviderState; message: string } {
    if (status === 401 || status === 403) return { state: "failed", message: "Provider authentication error." };
    if (status === 429) return { state: "quota_exhausted", message: "RustMaps rate limit / quota reached." };
    if (status >= 500) return { state: "unavailable", message: "RustMaps provider is temporarily unavailable." };
    return { state: "failed", message: `Provider error (${status}).` };
  }

  // Poll a known map by rustmaps_id, update cache, return response.
  async function pollById(cacheKey: string, row: any, base: { seed: number; worldSize: number; staging: boolean; battlemetricsServerId?: string }) {
    if (!row?.rustmaps_id) {
      return json(toResponse(true, (row?.state as ProviderState) ?? "queued", cacheKey, row, "No provider map id to poll yet."));
    }
    const { status, data } = await callProvider(`/v4/maps/${encodeURIComponent(row.rustmaps_id)}`);
    if (status === 200 && data?.data) {
      const { patch, state } = dtoToPatch(data.data, base);
      const updated = await upsertCache(cacheKey, patch);
      return json(toResponse(true, state, cacheKey, updated ?? row));
    }
    if (status === 409) {
      // Still generating — expected.
      const updated = await upsertCache(cacheKey, { state: row.state && PENDING_STATES.includes(row.state) ? row.state : "generating" });
      return json(toResponse(true, (updated?.state as ProviderState) ?? "generating", cacheKey, updated ?? row, "Map is still generating."));
    }
    const { state, message } = errorState(status || 500);
    const updated = await upsertCache(cacheKey, { state, last_error: message });
    return json(toResponse(false, state, cacheKey, updated ?? row, message));
  }

  try {
    // ---- Validate inputs (both actions need a cacheKey / seed+size) ----------
    let seed: number;
    let worldSize: number;
    let staging: boolean;
    let cacheKey: string;
    const battlemetricsServerId: string | undefined =
      typeof body?.battlemetricsServerId === "string" ? body.battlemetricsServerId : undefined;

    if (action === "poll") {
      cacheKey = String(body?.cacheKey ?? "");
      const m = cacheKey.match(/^procedural:(\d+):(\d+):(true|false)$/);
      if (!m) return json({ ok: false, state: "failed", message: "Invalid or missing cacheKey." });
      worldSize = Number(m[1]); seed = Number(m[2]); staging = m[3] === "true";
    } else {
      seed = Number(body?.seed);
      worldSize = Number(body?.worldSize);
      staging = Boolean(body?.staging ?? false);
      if (!Number.isFinite(seed) || seed <= 0) return json({ ok: false, state: "failed", message: "Invalid seed." });
      if (!Number.isFinite(worldSize) || worldSize < 1000 || worldSize > 6000) {
        return json({ ok: false, state: "failed", message: "worldSize must be between 1000 and 6000." });
      }
      cacheKey = buildCacheKey(worldSize, seed, staging);
    }

    const base = { seed, worldSize, staging, battlemetricsServerId };
    const existing = await readCache(cacheKey);

    // ---- poll action ---------------------------------------------------------
    if (action === "poll") {
      if (!existing) return json({ ok: false, state: "failed", message: "Unknown cacheKey." });
      if (existing.state === "active" && (existing.image_url || existing.image_icon_url || existing.raw_image_url)) {
        return json(toResponse(true, "active", cacheKey, existing));
      }
      return await pollById(cacheKey, existing, base);
    }

    // ---- get_or_create -------------------------------------------------------
    // 1) Serve fresh active cache.
    if (existing?.state === "active" && (existing.image_url || existing.image_icon_url || existing.raw_image_url)) {
      return json(toResponse(true, "active", cacheKey, existing));
    }
    // 2) Pending with a known id — poll once.
    if (existing?.rustmaps_id && PENDING_STATES.includes(existing.state)) {
      return await pollById(cacheKey, existing, base);
    }

    // 3) Optional quota guard before starting new work.
    const limits = await callProvider("/v4/maps/limits");
    if (limits.status === 200 && limits.data?.data) {
      const c = limits.data.data.concurrent;
      const mth = limits.data.data.monthly;
      const concurrentFull = c && typeof c.current === "number" && typeof c.allowed === "number" && c.current >= c.allowed;
      const monthlyFull = mth && typeof mth.current === "number" && typeof mth.allowed === "number" && mth.current >= mth.allowed;
      if (concurrentFull || monthlyFull) {
        const updated = await upsertCache(cacheKey, { seed, world_size: worldSize, staging, state: "quota_exhausted", ...(battlemetricsServerId ? { battlemetrics_server_id: battlemetricsServerId } : {}) });
        return json(toResponse(false, "quota_exhausted", cacheKey, updated ?? existing, "Generation quota reached. Try again later."));
      }
    }

    // 4) Does the map already exist on the provider? (seed + size lookup)
    const lookup = await callProvider(`/v4/maps/${worldSize}/${seed}`);
    if (lookup.status === 200 && lookup.data?.data) {
      const { patch, state } = dtoToPatch(lookup.data.data, base);
      const updated = await upsertCache(cacheKey, patch);
      return json(toResponse(true, state, cacheKey, updated ?? existing));
    }
    if (lookup.status === 409 && lookup.data?.data) {
      // Exists but not finished — record id if present and report pending.
      const rid = lookup.data.data.id ?? lookup.data.data.mapId ?? null;
      const updated = await upsertCache(cacheKey, { seed, world_size: worldSize, staging, state: "generating", ...(rid ? { rustmaps_id: rid } : {}), ...(battlemetricsServerId ? { battlemetrics_server_id: battlemetricsServerId } : {}) });
      return json(toResponse(true, "generating", cacheKey, updated ?? existing, "Map is still generating."));
    }
    if (lookup.status !== 404 && lookup.status !== 200 && lookup.status !== 0) {
      const { state, message } = errorState(lookup.status);
      // Auth/quota errors should not silently trigger a POST.
      if (state === "failed" || state === "quota_exhausted") {
        const updated = await upsertCache(cacheKey, { seed, world_size: worldSize, staging, state, last_error: message });
        return json(toResponse(false, state, cacheKey, updated ?? existing, message));
      }
    }

    // 5) Start a new procedural generation.
    const created = await callProvider("/v4/maps", {
      method: "POST",
      body: JSON.stringify({ size: worldSize, seed, staging }),
    });

    if ((created.status === 200 || created.status === 201) && created.data?.data) {
      const { patch, state } = dtoToPatch(created.data.data, base);
      const updated = await upsertCache(cacheKey, patch);
      const pendingMsg = state === "active" ? undefined : "Map generation started.";
      return json(toResponse(true, state, cacheKey, updated ?? existing, pendingMsg));
    }
    if (created.status === 409 && created.data?.data) {
      const rid = created.data.data.id ?? created.data.data.mapId ?? null;
      const updated = await upsertCache(cacheKey, { seed, world_size: worldSize, staging, state: "generating", ...(rid ? { rustmaps_id: rid } : {}), ...(battlemetricsServerId ? { battlemetrics_server_id: battlemetricsServerId } : {}) });
      return json(toResponse(true, "generating", cacheKey, updated ?? existing, "Map is already generating."));
    }

    const { state, message } = errorState(created.status || 500);
    const updated = await upsertCache(cacheKey, { seed, world_size: worldSize, staging, state, last_error: message });
    return json(toResponse(false, state, cacheKey, updated ?? existing, message));
  } catch (e) {
    // Never leak internals.
    console.error("rustmaps-provider unexpected error", (e as Error)?.message);
    return json({ ok: false, state: "failed", message: "Unexpected provider error." });
  }
});
