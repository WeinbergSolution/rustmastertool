# RustMaps Provider Integration — Phase 2.4-B1 Report

**Branch:** `feature/rustmaps-provider-integration` · **Base:** `origin/main` (`9eb942b`) · **Datum:** 2026-07-08
**Status:** 🔧 **AKTIV / B1.2 400-Fix (2026-07-08).** *(Hinweis: Der frühere „parked"-Stand wurde vom Owner revidiert — Migration + Function deployt, `RUSTMAPS_API_KEY` gesetzt. Siehe „Provider 400 Investigation (B1.2)" am Ende. Merge-Entscheidung weiterhin separat.)*
**(Historisch) Grund für Parken:** ursprünglich kein RustMaps-API-Zugang erwartet.
- **Kein Deploy durchgeführt:** kein `db push`, kein `functions deploy`, kein Secret gesetzt. Live-Probe bestätigt: Function ist 404/NOT_FOUND (nicht deployt).
- **Kein Merge empfohlen:** Der Branch bleibt als geparkte, lauffähig kompilierte Foundation erhalten (siehe unten), falls sich der Zugang später ändert.
- **No-API-Alternativen:** siehe `docs/reviews/no-api-map-source-strategy-audit.md`.
- Ursprünglicher Aufbau der Foundation ist unten dokumentiert (Code bleibt im Branch, inaktiv).

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

## CORS & Deploy Readiness (B1.1)
- **Browser-Aufrufe brauchen CORS/OPTIONS.** Die Function beantwortet den `OPTIONS`-Preflight **als Erstes** (Status **204**), bevor Body-Parsing/Env/DB/Provider-Calls laufen. **Alle** Responses (inkl. Fehler und `provider_not_configured`) tragen CORS-Header über einen zentralen Helper `corsHeadersFor(origin)`.
- **Header:** `Access-Control-Allow-Origin` (echoet für localhost / `*.vercel.app` / `ALLOWED_ORIGIN(S)`-env, sonst `*`), `Access-Control-Allow-Headers: authorization, x-client-info, apikey, content-type`, `Access-Control-Allow-Methods: POST, OPTIONS`, `Vary: Origin`.
- **Die Preview allein reicht NICHT.** Der Browser-Fehler „preflight … does not have HTTP ok status" tritt auf, solange die Function **nicht deployt** ist (Supabase liefert dann keine CORS-fähige OPTIONS-Antwort). Erst nach Deploy von Migration **und** Function greift der CORS-Fix.
- **Aktivierung ist ein separates Owner-Gate:** `supabase db push` + `supabase functions deploy rustmaps-provider` + `supabase secrets set RUSTMAPS_API_KEY=…`. Ohne diese Schritte zeigt die UI ehrlich „Provider function is not deployed or not reachable yet." (state `unavailable`) bzw. nach Deploy ohne Key „RustMaps Provider is not configured yet." (state `provider_not_configured`).
- **UI unterscheidet jetzt:** Erreichbarkeits-/CORS-/Deploy-Problem → `unavailable` → Button „Retry provider request"; echter RustMaps-Generierungsfehler → `failed` → Button „Generation failed — retry".

### CORS-Smoke (nach Deploy)
```bash
# Preflight muss 204 + CORS-Header liefern:
curl -i -X OPTIONS "https://<project>.supabase.co/functions/v1/rustmaps-provider" \
  -H "Origin: https://rustmastertool-web.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: content-type, authorization, apikey"
# Erwartung: HTTP/2 204, Access-Control-Allow-Origin, Access-Control-Allow-Methods: POST, OPTIONS, Vary: Origin

# POST (ohne Key -> provider_not_configured, MIT CORS-Header, kein Crash):
curl -i -X POST "https://<project>.supabase.co/functions/v1/rustmaps-provider" \
  -H "Origin: https://rustmastertool-web.vercel.app" -H "Content-Type: application/json" \
  -H "apikey: <anon-key>" -H "Authorization: Bearer <anon-key>" \
  -d '{"action":"get_or_create","seed":123456,"worldSize":4000}'
```

## Provider 400 Investigation (B1.2)
**Symptom:** Nach Deploy + Key + grünem CORS lieferten **alle** Kategorien (official/community/modded) einen Provider-**400**. Also kein reines Custom-Map-Problem.

**Swagger geprüft** (`https://api.rustmaps.com/swagger/v4-public/swagger.json`, live via curl gezogen und mit Node geparst):
- **`GET /v4/maps/{size}/{seed}`** hat einen **`staging`-Query-Parameter mit `required: true`** (`parameters: [{name:size,in:path},{name:seed,in:path},{name:staging,in:query,required:true}]`). Dokumentierte Responses: 200/401/403/404/409.
- **`POST /v4/maps`** Body-Schema: `{ size:int(1000–6000), seed:int(>0), staging:bool }`, `additionalProperties:false`. Responses: 200/201/401/403/409. Auth-Schema: `X-API-Key` (header).

**Unser alter Request:** `GET /v4/maps/{worldSize}/{seed}` **ohne** `?staging=` → das ASP.NET-Model-Binding lehnt den **required** Query-Parameter mit **400** ab (400 ist bei RustMaps nicht als fachliche Response dokumentiert, sondern Framework-Validierung). Da dieser Lookup **vor** dem POST läuft und jedes Nicht-200/404/409 früh als Fehler zurückkam, scheiterten **alle** Kategorien — unabhängig vom Map-Typ. `POST /v4/maps` selbst war bereits korrekt (`{size,seed,staging}`, keine Extra-Felder).

**Unterschied gefunden:** fehlender **required** `staging`-Query-Parameter am Seed/Size-Lookup.

**Fix angewendet:** Lookup ist jetzt `GET /v4/maps/{worldSize}/{seed}?staging={staging}`.

**400-Diagnostics jetzt sichtbar:** Bei jedem Nicht-2xx (v. a. 400) liefert die Function sanitized:
```json
{ "ok": false, "state": "provider_bad_request", "message": "RustMaps rejected the map request.",
  "providerStatus": 400, "providerMessage": "<sanitized body, <=1000, long tokens masked>",
  "cacheKey": "…", "requestDebug": { "endpoint": "/v4/maps/{size}/{seed}?staging=false", "method": "GET", "seed": 123, "worldSize": 4000, "sentBodyKeys": [] }, "data": null }
```
Keine Secrets, keine Request-Header im Payload/Log. UI zeigt „RustMaps rejected this map request." + gekürzte Provider-Message + kleine Debug-Zeile (Status/Seed/Size/Endpoint/Body-Keys). `validation_error` (200 + State) für fehlende/ungültige Eingaben — bewusst **kein** rohes 422 (sonst verschluckt supabase-js den Body).

**Nächste Smoke-Schritte (nach Function-Redeploy):**
1. `npx supabase functions deploy rustmaps-provider` — Function-Code geändert → **Redeploy nötig**.
2. Browser: „Generate full map…" → erwartet jetzt `active`/pending statt `provider_bad_request`.
3. Falls weiterhin 400: neue `providerMessage`/`requestDebug` in UI/Response lesen → exakter Grund ohne Secrets.

## B1.3 Seed/Size Lookup Removed
**Owner-Smoke nach Redeploy (B1.2):** `GET /v4/maps/{size}/{seed}?staging=false` lieferte **400 SerializerErrors** — „The input does not contain any JSON tokens. Expected the input to start with a valid JSON token." (z. B. `GET /v4/maps/3900/11975?staging=false`, `sentBodyKeys: []`), reproduzierbar über mehrere Server. Der `?staging=`-Fix aus B1.2 hat den 400 also **nicht** behoben — dieser Endpoint ist in unserem Integrationspfad **unzuverlässig**.

**Entscheidung/Änderung (B1.3):**
- **`GET /v4/maps/{size}/{seed}` wurde vollständig aus dem Flow entfernt.** Er blockiert die Generierung nicht mehr.
- **`POST /v4/maps`** ist jetzt der **kanonische Generierungs-Einstieg** (Body `{size, seed, staging}`).
- **Polling** ausschließlich über **`GET /v4/maps/{mapId}`**; `409` = erwartetes „noch nicht fertig" (pending), `200` = fertige MapAPIDTO → Cache active.
- **Cache** verhindert Doppel-Generierung: aktive Maps (mit Bild-URL) werden direkt aus `rustmaps_map_cache` serviert; pending Maps mit bekannter `rustmaps_id` werden nur gepollt, nicht neu gestartet.
- **Limits** (`GET /v4/maps/limits`) bleibt, aber **soft**: nur `401/403` (auth) und `429` (quota) stoppen hart; jeder andere Nicht-200 (inkl. Parse-Fehler) wird sanitized geloggt und **blockiert die Generierung nicht**.
- **Diagnostics** zeigen jetzt `requestDebug.endpoint = "/v4/maps"`, `method = "POST"`, `sentBodyKeys = ["size","seed","staging"]` (bzw. `GET /v4/maps/{mapId}` beim Poll). Ein `GET /v4/maps/{size}/{seed}` darf im B1-Pfad **nicht mehr** auftauchen — falls doch, ist das ein Bug.
- **Zukunft:** Ein Lookup-/Search-Endpoint (`/v4/maps/{size}/{seed}` oder `/v4/maps/search`) kann später **separat** neu evaluiert werden (evtl. anderes Request-Format), ist aber **nicht Teil von B1**.

**Redeploy nötig:** `npx supabase functions deploy rustmaps-provider`.

## B1.5 rustmaps-cli Alignment
- rustmaps-cli sendet seed als String.
- POST /maps 200 wird als Success behandelt, nicht als Fehler.
- alter Code behandelte 200 Success + data:null falsch als failed.
- /v4/maps/search ist kein Seed-Lookup.
- neuer Zustand:
  seed String,
  Success+data:null neutraler State,
  Follow-up Lookup/Status,
  kein POST-Spam.
