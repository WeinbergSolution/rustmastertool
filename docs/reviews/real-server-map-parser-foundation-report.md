# Server Map Viewer — Preview Foundation Honesty Pass

**Branch:** `feature/real-server-map-parser-foundation` · **Datum:** 2026-07-08
**Scope:** UI ehrlich als *Preview Foundation* darstellen. **Keine** RustMaps-API-Integration, **keine** Fake-Koordinaten/-Heatmaps, kein DB/Supabase/Auth/env.

## Ziel
Der Viewer zeigt aktuell nur ein RustMaps-Thumbnail/Preview. Die UI darf nicht behaupten, das sei bereits die generierte/geparste Karte. Diese Änderung finalisiert die ehrliche Darstellung.

## Geänderte Dateien (Honesty Pass)
- `apps/web/src/features/map/serverMapModel.ts` — Badge „RustMaps image" → „Map preview"; `rustmapsViewerUrl` (echte `rustmaps_map_url`/`url` bevorzugt, sonst `https://rustmaps.com/map/{size}_{seed}`).
- `apps/web/src/features/map/mapLayerTypes.ts` — ehrliche Labels; alle Marker-/Heatmap-/Build-/Route-Layer `isFuture: true` + „(Coming later)".
- `apps/web/src/features/map/ServerMapViewer.tsx` — „Open full map on RustMaps"-Button (aktiv/disabled), Provider-Hinweis, „Map preview"-Copy, Image→Thumbnail-Fallback + Empty-State.
- `apps/web/src/features/map/ServerMapViewer.css` — Styling für den RustMaps-Button (+ disabled-Variante).

## Label-/Copy-Änderungen
- `Map Image` → **Map Preview**; Beschreibung → „Map preview thumbnail from RustMaps".
- Badge `RustMaps image` → **Map preview** (Fallback: „Map thumbnail preview" / „No map image").
- Bild-alt/Loader → „Map Preview" / „Loading map preview…".
- Empty-State: „Map preview could not be loaded."

## RustMaps-Link-Verhalten
- Priorität: vorhandene `rustmaps_map_url` / `rustmapsUrl` / `url` / `mapImageUrl` (nur wenn `rustmaps.com/map`) → **direkt nutzen**.
- Sonst `worldSize` + `seed` → `https://rustmaps.com/map/{worldSize}_{seed}`.
- **Wenn seed/size fehlen (und keine URL):** Button wird **disabled** dargestellt mit Tooltip „Full RustMaps link requires seed and map size." (nicht versteckt → ehrlich sichtbar).

## Provider-Hinweis
Vorhanden in der Sidebar: „Full generated map, coordinates and markers require RustMaps Provider integration." Zusätzlich Koordinaten-Hinweis: Marker erst nach Coordinate-Enrichment.

## Layer-Zustände (ehrlich)
- **Aktiv:** Map Preview, Monument List.
- **Coming later (disabled, `isFuture`):** Monument Markers, Population Heatmap, PvP Death Heatmap, Base Build Spots, Loot Routes.

## Bild-Fallback (robust)
`imageUrl` → bei `onError` Fallback auf `thumbnailUrl` → sonst Empty-State (kein kaputtes Browser-Image); Loader während des Ladens; ESC/Overlay-Klick schließt.

## Koordinaten / Marker
- `coordinateMode` strikt `'none'`. **Keine** Marker gerendert. **Keine** Fake-Koordinaten, **keine** Fake-Heatmaps.

## Checks
- `npm run typecheck:web` — **EXIT 0**
- `npm run build:web` — **EXIT 0** (nur vorbestehende 500-kB-Chunk-Info)
- `npm run lint --workspace=apps/web` — **EXIT 0** (nur vorbestehende unused-catch-Warnungen; keine aus `features/map/`)
- `npm run build` (Root) — **existiert nicht** im Repo-Root; nicht improvisiert. Build erfolgt über `build:web`.

## Bestätigungen
- Keine RustMaps-API-Integration, kein API-Key, kein Map-Parser, keine Fake-Koordinaten/-Heatmaps.
- Keine DB/Supabase/Auth/env-Änderung, keine Migration.
- Keine Map-Intel-Dateien geändert (`apps/web/src/features/learn/map-intel/`, `apps/web/public/map-intel/` unberührt).
- Kein `main`-Push, kein Force-Push, kein `git add .`, keine `.docx` committet.
