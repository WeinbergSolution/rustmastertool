# RustMaps Provider Integration — Phase 2.4-B1 Report

**Branch:** `feature/rustmaps-provider-integration` · **Base:** `origin/main` (`9eb942b`) · **Datum:** 2026-07-08
**Status:** Provider-Foundation gebaut (produktionsnah). **Kein Supabase-Deploy, keine DB-Migration ausgeführt, kein API-Key** — alles wartet auf separates Owner-Go.

## Was wurde gebaut
Der interne Flow **Frontend → Supabase Edge Function → RustMaps Public API v4 → DB-Cache → Frontend Viewer**. Die Karte wird **in RustMasterTool** angezeigt; kein `rustmaps.com`-Redirect, kein API-Key im Frontend, keine Internal-API, keine User-Bearer-Tokens.

## DB-Schema (`rustmaps_map_cache`)
Migration `supabase/migrations/20260708190000_rustmaps_provider_cache.sql`.
- Identity: `cache_key` (unique), `battlemetrics_server_id?`, `seed`, `world_size`, `staging`.
- State: `rustmaps_id?` (unique), `state` (default `idle`), `queue_position?`, `current_step?`, `status_message?`, `last_error?`.
- Assets: `map_url`, `raw_image_url`, `image_url`, `image_icon_url`, `thumbnail_url`, `download_url`, `can_download`.
- Data: `total_monuments?`, `monuments jsonb`, `biome_percentages jsonb?`, `map_stats jsonb?`, `provider_payload jsonb?`.
- Timestamps: `provider_checked_at?`, `generated_at?`, `estimated_deletion_date?`, `created_at`, `updated_at` (+ `set_updated_at` trigger).
- Constraints: `seed > 0`, `world_size 1000..6000`, `state ∈` erlaubte Menge, `cache_key ~ '^procedural:[0-9]+:[0-9]+:(true|false)$'`.
- Indexes: `(world_size, seed, staging)`, `state`, `rustmaps_id`, `battlemetrics_server_id`; `cache_key` unique.
- **RLS:** aktiviert, **public SELECT** erlaubt, **keine** anon INSERT/UPDATE/DELETE-Policy → Writes nur über Service Role (Edge Function). `server_map_identity` unangetastet.

## Edge Function Contract (`supabase/functions/rustmaps-provider/index.ts`)
`POST /functions/v1/rustmaps-provider`
- `{ action: "get_or_create", seed, worldSize, battlemetricsServerId?, staging? }`
- `{ action: "poll", cacheKey }`

Einheitliche Antwort (immer HTTP 200):
```json
{ "ok": true, "state": "active|in_queue|generating|processing|uploading|quota_exhausted|provider_not_configured|failed|unavailable",
  "cacheKey": "procedural:4000:123456:false",
  "data": { "seed", "worldSize", "rustmapsId", "imageUrl", "rawImageUrl", "imageIconUrl", "thumbnailUrl", "mapUrl", "totalMonuments", "monuments", "biomePercentages", "mapStats", "queuePosition", "currentStep" },
  "message": "…" }
```
Env: `RUSTMAPS_API_KEY` (required für Live-Calls), `RUSTMAPS_API_BASE_URL` (default `https://api.rustmaps.com`), `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.

**get_or_create-Flow:** validieren → `cache_key` → Cache prüfen (active → serve; pending+id → poll once; failed/unavailable → return) → optional `GET /v4/maps/limits` (bei erschöpft → `quota_exhausted`, keine Generation) → `GET /v4/maps/{size}/{seed}` (200 → active; 404 → weiter; 409 → pending) → `POST /v4/maps {size,seed,staging}` (200/201 → state/mapId; 409 → pending). Auth v4: `X-API-Key`.

## Frontend Flow (`rustmapsProviderClient.ts` + `ServerMapViewer.tsx`)
- CTA im Viewer: `seed`+`worldSize` vorhanden → **aktiver** Button „Generate full map in RustMasterTool"; sonst disabled „Seed and map size required".
- Klick → `requestRustMapsProviderMap({seed, worldSize, battlemetricsServerId})` (via `supabase.functions.invoke`, **kein** API-Key im Client).
- States: `Requesting RustMaps generation…` → pending (`Map generation queued` / `Generating terrain` / `Processing map images` / `Finalising`) → `active`.
- **Active:** Bildquelle-Priorität `imageIconUrl → imageUrl → rawImageUrl → thumbnailUrl`; Badge „Generated map"; Provider-Hinweis „Generated via RustMaps Provider and displayed inside RustMasterTool."; Biome/Stats-Tiles (Snow/Desert/Forest/Tundra/Jungle + Rivers/Lakes/Mountains/Islands/Build Rocks…).
- `provider_not_configured` → „RustMaps Provider is not configured yet." (kein Secret-Hinweis). `quota_exhausted`/`failed`/`unavailable` → Retry-Button.

## Cache-Strategie
`cache_key = procedural:{worldSize}:{seed}:{staging}`. Active + vorhandenes Bild wird direkt aus dem Cache serviert (0 Provider-Calls). Pending-Zustände pollen den Provider und aktualisieren die Zeile. Upsert per `onConflict: cache_key`.

## Polling-Strategie
Auto-Poll alle **9 s** (`action:"poll"`), gedeckelt auf **5 min**; danach „Still generating — check again"-Retry. Kein 1-s-Polling. `409` = erwartetes „noch nicht fertig", kein Fehler.

## Security Boundaries
- API-Key **nur** in der Edge Function (`RUSTMAPS_API_KEY`), nie im Frontend/Docs/Logs.
- Keine Secrets/Header geloggt; Fehler werden auf generische States gemappt (401/403 → `failed`/auth, 429 → `quota_exhausted`, 5xx → `unavailable`).
- Kein `rustmaps.com`-Redirect; keine Internal-API; keine Bearer-Tokens/Cookies/User-Sessions.
- DB-Writes nur via Service Role; Clients read-only (RLS).

## Bewusst NICHT gebaut
- Kein Supabase-Deploy, keine `db push`, keine ausgeführte Migration.
- Keine `RUSTMAPS_API_KEY`-Setzung / Secret-Änderung.
- Keine interaktiven Monument-Marker (Koordinaten-Projektion noch nicht validiert), keine Heatmaps, keine Fake-Koordinaten.
- Keine Cron/Worker-Automatik (Polling ist frontend-getrieben in dieser Phase).
- Custom Maps (nur procedural in dieser Phase).

## Was für Deploy/Env noch fehlt (Owner-Go nötig)
1. `supabase db push` der neuen Migration (Tabelle + RLS).
2. `supabase functions deploy rustmaps-provider`.
3. Secrets: `RUSTMAPS_API_KEY` (+ optional `RUSTMAPS_API_BASE_URL`) via `supabase secrets set` (nicht ins Repo/Frontend).
4. Sicherstellen, dass `SUPABASE_SERVICE_ROLE_KEY`/`SUPABASE_URL` der Function verfügbar sind (Standard bei Supabase Functions).

## Owner Smoke Checklist (nach Deploy + Key)
- Server mit `seed`+`worldSize` öffnen → CTA aktiv „Generate full map in RustMasterTool".
- Klick → „Requesting…" → pending-Status → nach Fertigstellung `active` + generiertes Bild im Viewer (kein Redirect).
- Badge zeigt „Generated map"; Biome/Stats-Tiles erscheinen; Monument-Count aus Provider.
- Zweiter Klick auf denselben Server = sofort aus Cache (schnell).
- Ohne gesetzten Key: „RustMaps Provider is not configured yet." (kein Crash, kein Secret-Leak).
- Quota/Fehler: sauberer Retry, keine Endlosschleife (5-min-Cap).
- Console frei von Exceptions; kein externer rustmaps.com-Link.
