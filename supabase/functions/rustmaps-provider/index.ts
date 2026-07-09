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

const ALLOW_HEADERS = "authorization, x-client-info, apikey, content-type";

// Allow localhost, any *.vercel.app (covers preview + production), and any
// origins configured via ALLOWED_ORIGIN / ALLOWED_ORIGINS env. Unknown origins
// fall back to "*" so the endpoint never breaks (no cookies/credentials, no
// user secrets are returned here).
function isAllowedOrigin(o: string): boolean {
  if (o.startsWith("http://localhost:") || o.startsWith("http://127.0.0.1:")) return true;
  if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(o)) return true;
  const single = (Deno.env.get("ALLOWED_ORIGIN") || "").trim();
  if (single && o === single) return true;
  const list = (Deno.env.get("ALLOWED_ORIGINS") || "").split(",").map((s) => s.trim()).filter(Boolean);
  return list.includes(o);
}

function corsHeadersFor(origin: string | null): Record<string, string> {
  const allowOrigin = origin && isAllowedOrigin(origin) ? origin : "*";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Headers": ALLOW_HEADERS,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

type ProviderState =
  | "idle" | "queued" | "in_queue" | "generating" | "processing" | "uploading"
  | "active" | "failed" | "unavailable" | "quota_exhausted" | "provider_not_configured"
  | "provider_bad_request" | "validation_error"
  | "provider_success_without_data" | "active_lookup_required" | "provider_lookup_failed";

const PENDING_STATES: ProviderState[] = ["queued", "in_queue", "generating", "processing", "uploading"];
// States that mean "the provider accepted the request; fetch details via a
// lookup on the next call — do NOT POST again (avoids generation spam)."
const LOOKUP_STATES: ProviderState[] = ["active_lookup_required", "provider_success_without_data"];

// Sanitize a provider error body for safe surfacing: cap length and mask any
// long token-like strings (defensive — the provider body should not contain our
// key, but we never risk echoing a secret).
function sanitizeBody(text: string | null): string | null {
  if (!text) return null;
  return text.replace(/[A-Za-z0-9_-]{32,}/g, "***").slice(0, 1000);
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
  const payload = row?.provider_payload;
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
      saveVersion: payload?.saveVersion ?? null,
      tileBaseUrl: payload?.tileBaseUrl ?? null,
      heatMaps: payload?.heatMaps ?? [],
      undergroundOverlayUrl: payload?.undergroundOverlayUrl ?? null,
      buildingBlockAreaUrl: payload?.buildingBlockAreaUrl ?? null,
    },
    message: message ?? null,
  };
}

async function verifyTileUrls(saveVersion: number, rustmapsId: string) {
  const contentBase = `https://content.rustmaps.com/maps/${saveVersion}/${rustmapsId}`;
  
  const probe = async (url: string) => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);
      let res = await fetch(url, { method: "HEAD", signal: controller.signal });
      if (res.status === 405 || res.status === 403 || res.status === 500) {
        res = await fetch(url, { method: "GET", signal: controller.signal });
        if (res.body && res.body.cancel) await res.body.cancel().catch(() => {});
      }
      clearTimeout(timeout);
      return res.status === 200;
    } catch {
      return false;
    }
  };

  const hasBase = await probe(`${contentBase}/tiles-webp/0/0/0.webp`);
  let tileBaseUrl = null;
  if (hasBase) tileBaseUrl = `${contentBase}/tiles-webp/{z}/{x}/{y}.webp`;

  const candidateHeatmaps = [
    { name: "Nodes", path: "nodes" },
    { name: "Hemp", path: "hemp" },
    { name: "Berries", path: "berries" },
    { name: "Bears", path: "bears" },
    { name: "Boars", path: "boars" },
    { name: "Horses", path: "horses" },
    { name: "PlayerSpawns", path: "playerspawns" }
  ];

  const heatMaps = [];
  for (const hm of candidateHeatmaps) {
    if (await probe(`${contentBase}/${hm.path}/tiles/0/0/0.webp`)) {
      heatMaps.push({ name: hm.name, url: `${contentBase}/${hm.path}/tiles/` });
    }
  }

  const hasUnderground = await probe(`${contentBase}/tunnel/tiles/0/0/0.webp`);
  const undergroundOverlayUrl = hasUnderground ? `${contentBase}/tunnel/tiles/` : null;

  const hasBuildingBlocks = await probe(`${contentBase}/building_block.json`);
  const buildingBlockAreaUrl = hasBuildingBlocks ? `${contentBase}/building_block.json` : null;

  return { tileBaseUrl, heatMaps, undergroundOverlayUrl, buildingBlockAreaUrl };
}

serve(async (req) => {
  const origin = req.headers.get("Origin");
  const cors = corsHeadersFor(origin);
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

  // Answer the CORS preflight FIRST — before body parsing, env checks, DB init
  // or any provider call — so it can never fail with a non-2xx status.
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
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
  async function callProvider(path: string, init: RequestInit = {}): Promise<{ status: number; data: any; text: string | null }> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const method = (init.method || "GET").toUpperCase();
      const baseHeaders: Record<string, string> = {
        "X-API-Key": apiKey!,
        "Accept": "application/json",
      };
      if (method === "POST") {
        baseHeaders["Content-Type"] = "application/json";
      }

      const res = await fetch(`${apiBase}${path}`, {
        ...init,
        headers: { ...baseHeaders, ...(init.headers as Record<string, string> || {}) },
        signal: controller.signal,
      });
      const text = await res.text();
      let data: any = null;
      try { data = text ? JSON.parse(text) : null; } catch { data = null; }
      return { status: res.status, data, text: text ? text.slice(0, 2000) : null };
    } catch (_e) {
      // Network/timeout — do not leak details.
      return { status: 0, data: null, text: null };
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
    if (status === 400) return { state: "provider_bad_request", message: "RustMaps rejected the map request." };
    if (status === 401 || status === 403) return { state: "failed", message: "Provider authentication error." };
    if (status === 429) return { state: "quota_exhausted", message: "RustMaps rate limit / quota reached." };
    if (status >= 500) return { state: "unavailable", message: "RustMaps provider is temporarily unavailable." };
    return { state: "failed", message: `Provider error (${status}).` };
  }

  // Build a diagnostics-rich error response (sanitized — no secrets/headers).
  function providerErrorResponse(
    cacheKey: string,
    status: number,
    text: string | null,
    debug: { endpoint: string; method: string; seed: number; worldSize: number; sentBodyKeys: string[] },
  ) {
    const es = errorState(status);
    return json({
      ok: false,
      state: es.state,
      message: es.message,
      cacheKey,
      providerStatus: status,
      providerMessage: sanitizeBody(text),
      requestDebug: debug,
      data: null,
    });
  }

  // Fetch map details. Prefers GET /v4/maps/{mapId}; falls back to the
  // CLI-style GET /v4/maps/{size}/{seed}. A failed lookup (e.g. the size/seed
  // endpoint's 400 SerializerErrors) is NEVER a hard failure here — the map
  // request was already accepted, so we stay in a neutral waiting state.
  async function attemptLookup(cacheKey: string, base: { seed: number; worldSize: number; staging: boolean; battlemetricsServerId?: string }, row: any) {
    const rid = row?.rustmaps_id ?? null;
    const path = rid ? `/v4/maps/${encodeURIComponent(rid)}` : `/v4/maps/${base.worldSize}/${base.seed}?staging=${base.staging}`;
    const { status, data, text } = await callProvider(path);

    if (status === 200 && data?.data) {
      const d = data.data;
      if (d.saveVersion && (d.id || d.mapId) && !d.tileBaseUrl) {
        const tiles = await verifyTileUrls(d.saveVersion, d.id || d.mapId);
        d.tileBaseUrl = tiles.tileBaseUrl;
        d.heatMaps = tiles.heatMaps;
        d.undergroundOverlayUrl = tiles.undergroundOverlayUrl;
        d.buildingBlockAreaUrl = tiles.buildingBlockAreaUrl;
      }
      const { patch, state } = dtoToPatch(d, base);
      const updated = await upsertCache(cacheKey, patch);
      return json(toResponse(true, state, cacheKey, updated ?? row));
    }
    if (status === 409) {
      const updated = await upsertCache(cacheKey, { state: "generating" });
      return json(toResponse(true, "generating", cacheKey, updated ?? row, "Map is still generating."));
    }
    // Auth / quota are still hard signals even during lookup.
    if (status === 401 || status === 403) {
      await upsertCache(cacheKey, { state: "failed", last_error: `lookup ${status}` });
      return json(toResponse(false, "failed", cacheKey, row, "Provider authentication error."));
    }
    if (status === 429) {
      const updated = await upsertCache(cacheKey, { state: "quota_exhausted" });
      return json(toResponse(false, "quota_exhausted", cacheKey, updated ?? row, "RustMaps rate limit / quota reached."));
    }
    // Lookup did not (yet) yield a payload — neutral waiting, not a failure.
    const updated = await upsertCache(cacheKey, {
      seed: base.seed, world_size: base.worldSize, staging: base.staging,
      state: "provider_success_without_data", last_error: `lookup ${status}`,
      ...(base.battlemetricsServerId ? { battlemetrics_server_id: base.battlemetricsServerId } : {}),
    });
    const resp = toResponse(true, "provider_success_without_data", cacheKey, updated ?? row,
      "RustMaps accepted the map request but returned no map payload yet.");
    return json({
      ...resp,
      providerStatus: status,
      providerMessage: sanitizeBody(text),
      requestDebug: { endpoint: path, method: "GET", seed: base.seed, worldSize: base.worldSize, sentBodyKeys: [] },
    });
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
      // Server-side validation (HTTP 200 + state so supabase-js keeps the body).
      if (!Number.isFinite(seed) || seed <= 0) {
        return json({ ok: false, state: "validation_error", message: "A positive numeric seed is required." });
      }
      if (!Number.isFinite(worldSize) || worldSize < 1000 || worldSize > 6000) {
        return json({ ok: false, state: "validation_error", message: "worldSize must be a number between 1000 and 6000." });
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
      return await attemptLookup(cacheKey, base, existing);
    }

    // ---- get_or_create -------------------------------------------------------
    // 1) Serve fresh active cache.
    if (existing?.state === "active" && (existing.image_url || existing.image_icon_url || existing.raw_image_url)) {
      return json(toResponse(true, "active", cacheKey, existing));
    }
    // 2) Pending, or "accepted-without-payload" — look up details first instead
    //    of POSTing again (prevents generation spam on repeated clicks).
    if (existing && (PENDING_STATES.includes(existing.state) || LOOKUP_STATES.includes(existing.state))) {
      return await attemptLookup(cacheKey, base, existing);
    }

    // 3) Optional quota guard. Soft by design: a parse error / non-200 must NOT
    //    block generation. Only hard-stop on auth (401/403) and quota (429).
    const limits = await callProvider("/v4/maps/limits");
    if (limits.status === 401 || limits.status === 403) {
      await upsertCache(cacheKey, { seed, world_size: worldSize, staging, state: "failed", last_error: `limits ${limits.status}` });
      return json(toResponse(false, "failed", cacheKey, existing, "Provider authentication error."));
    }
    if (limits.status === 429) {
      const updated = await upsertCache(cacheKey, { seed, world_size: worldSize, staging, state: "quota_exhausted", ...(battlemetricsServerId ? { battlemetrics_server_id: battlemetricsServerId } : {}) });
      return json(toResponse(false, "quota_exhausted", cacheKey, updated ?? existing, "RustMaps rate limit / quota reached."));
    }
    if (limits.status === 200 && limits.data?.data) {
      const c = limits.data.data.concurrent;
      const mth = limits.data.data.monthly;
      const concurrentFull = c && typeof c.current === "number" && typeof c.allowed === "number" && c.current >= c.allowed;
      const monthlyFull = mth && typeof mth.current === "number" && typeof mth.allowed === "number" && mth.current >= mth.allowed;
      if (concurrentFull || monthlyFull) {
        const updated = await upsertCache(cacheKey, { seed, world_size: worldSize, staging, state: "quota_exhausted", ...(battlemetricsServerId ? { battlemetrics_server_id: battlemetricsServerId } : {}) });
        return json(toResponse(false, "quota_exhausted", cacheKey, updated ?? existing, "Generation quota reached. Try again later."));
      }
    } else if (limits.status !== 200) {
      // Non-fatal (e.g. the endpoint returned a parse error) — continue to POST.
      console.warn("rustmaps limits check non-200, ignored:", limits.status);
    }

    // 4) Start generation via POST — the canonical entrypoint.
    //    B1.3: the GET /v4/maps/{size}/{seed} preflight lookup was REMOVED
    //    (it returned 400 SerializerErrors live and blocked all generation).
    //    B1.5: send seed as a STRING (matches the working rustmaps-cli); the
    //    numeric seed produced HTTP 200 + data:null (misread as failed before).
    const created = await callProvider("/v4/maps", {
      method: "POST",
      body: JSON.stringify({ size: worldSize, seed: String(seed), staging }),
    });

    if ((created.status === 200 || created.status === 201) && created.data?.data) {
      const d = created.data.data;
      if (d.saveVersion && (d.id || d.mapId) && !d.tileBaseUrl) {
        const tiles = await verifyTileUrls(d.saveVersion, d.id || d.mapId);
        d.tileBaseUrl = tiles.tileBaseUrl;
        d.heatMaps = tiles.heatMaps;
        d.undergroundOverlayUrl = tiles.undergroundOverlayUrl;
        d.buildingBlockAreaUrl = tiles.buildingBlockAreaUrl;
      }
      const { patch, state } = dtoToPatch(d, base);
      const updated = await upsertCache(cacheKey, patch);
      const pendingMsg = state === "active" ? undefined : "Map generation started.";
      return json(toResponse(true, state, cacheKey, updated ?? existing, pendingMsg));
    }
    // B1.5: HTTP 200/201 with meta.Success but data:null is NOT a failure —
    // the request was accepted. Record it and fetch details via a follow-up
    // lookup instead of returning "failed".
    if (created.status === 200 || created.status === 201) {
      const rid = created.data?.data?.id ?? created.data?.data?.mapId ?? created.data?.mapId ?? null;
      await upsertCache(cacheKey, {
        seed, world_size: worldSize, staging, state: "active_lookup_required",
        ...(rid ? { rustmaps_id: rid } : {}),
        ...(battlemetricsServerId ? { battlemetrics_server_id: battlemetricsServerId } : {}),
      });
      return await attemptLookup(cacheKey, base, { rustmaps_id: rid });
    }
    if (created.status === 409) {
      // Already generating / exists — extract an id if present, report pending.
      const d = created.data?.data ?? created.data ?? null;
      const rid = d?.id ?? d?.mapId ?? null;
      const updated = await upsertCache(cacheKey, { seed, world_size: worldSize, staging, state: "generating", ...(rid ? { rustmaps_id: rid } : {}), ...(battlemetricsServerId ? { battlemetrics_server_id: battlemetricsServerId } : {}) });
      return json(toResponse(true, "generating", cacheKey, updated ?? existing, "Map is already generating."));
    }

    await upsertCache(cacheKey, { seed, world_size: worldSize, staging, state: errorState(created.status || 500).state, last_error: `post ${created.status}` });
    return providerErrorResponse(cacheKey, created.status || 500, created.text, {
      endpoint: "/v4/maps", method: "POST", seed, worldSize, sentBodyKeys: ["size", "seed", "staging"],
    });
  } catch (e) {
    // Never leak internals.
    console.error("rustmaps-provider unexpected error", (e as Error)?.message);
    return json({ ok: false, state: "failed", message: "Unexpected provider error." });
  }
});
