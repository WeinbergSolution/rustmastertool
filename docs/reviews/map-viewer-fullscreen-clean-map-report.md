# Map Viewer Fullscreen Clean Map Report

## Main Base Commit
Based on `origin/main` (42baf53 fix(web): harden RustMaps GET lookup headers).

## Changed Files
- `apps/web/src/features/map/ServerMapViewer.tsx`
- `apps/web/src/features/map/ServerMapViewer.css`
- `apps/web/src/features/map/serverMapModel.ts`
- `apps/web/src/features/map/mapLayerTypes.ts`
- `apps/web/src/features/map/rustmapsProviderClient.ts`

## Image Priority
- **Before:** Preferred `imageIconUrl` as the default provider image.
- **After:**
  - **Clean Layer (Default):** Prefers `imageUrl` (clean normalized map) > `rawImageUrl` > `thumbnailUrl`. Only falls back to `imageIconUrl` if nothing else exists.
  - **Icon Layer:** Prefers `imageIconUrl` when explicitly toggled.

## Fullscreen Behavior
- **Desktop:** The map viewer container now removes padding, border radius, and size limits to take over 100vw and 100vh of the screen when opened.
- **Mobile:** Mobile behavior already leverages full screen inside the safe area logic. Close buttons are easily accessible, and escape key / back behavior is preserved.

## Clean vs Icon Layer Behavior
- **Clean Map:** Enabled by default. Shows a badge subtitle `· Clean RustMaps image`.
- **Icon Map:** Optional toggle. Enabled if `imageIconUrl` is present in the map data. If not present, the button is disabled with a helpful tooltip.

## Heatmap Discovery
**Parked for separate audit.**
The owner found a RustMaps `pageData` workflow showing heatMaps/tile URLs for Nodes, Bears, Boars, Horses, Hemp, PlayerSpawns, and Berries. 
**Decision:** This requires a separate official API/ToS audit before product integration. No scraping or internal pageData dependency was added in this sprint. Heatmap and marker future options were removed from the UI for now to maintain honest copy.

## No DB/Supabase/Auth/Env Changes
Confirmed. No backend configuration or migration was executed. All changes are confined to the React frontend map viewer code.
