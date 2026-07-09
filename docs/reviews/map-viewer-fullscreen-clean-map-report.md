# Map Viewer Fullscreen Clean Map Report

## Main Base Commit
Based on `origin/main` (42baf53 fix(web): harden RustMaps GET lookup headers) and augmented with B2.1 fixes.

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

## Fullscreen API Behavior (B2.1)
- Added native Browser Fullscreen API integration via `requestFullscreen` and `exitFullscreen`.
- A dedicated toggle button appears on desktop viewports when the API is supported.
- Gracefully syncs state with the `fullscreenchange` event and exits fullscreen upon closing the viewer.

## Zoom/Pan Behavior (B2.1)
- Implemented lightweight local zoom and pan logic without external packages.
- Map image allows zooming from 1x to 5x.
- **Controls:** Floating overlay buttons (Zoom In, Zoom Out, Reset). 
- **Desktop:** Supports scroll-wheel zooming when hovering over the map.
- **Drag-to-pan:** Enabled via pointer events when zoom level > 1. Pan boundaries are roughly clamped to prevent the image from disappearing.

## Mobile Layout & Scroll Accessibility (B2.1)
- Changed the mobile container behavior: the root viewer is now fully scrollable vertically.
- The map viewport is restricted to a maximum of `55svh` on mobile, ensuring the lower information panel (layers, stats, monuments) remains easily accessible without getting pushed entirely off-screen.
- Added a clear top-left mobile-friendly back button in the sticky header for simple navigation.

## Generate Button Repositioning (B2.1)
- The provider action / Generate button CTA has been moved directly into the top header row for immediate visibility.
- It is now compact and easily accessible without requiring users to scroll down past the map.
- Diagnostic logs remain cleanly positioned beneath the map.

## Clean vs Icon Layer Behavior
- **Clean Map:** Enabled by default. 
- **Icon Map:** Optional toggle. Enabled if `imageIconUrl` is present in the map data. If not present, the button is disabled with a helpful tooltip.
- Visual cleanup removed redundant "Clean RustMaps image" badge text to keep UI tidy.

## Heatmap Discovery
**Parked for separate audit.**
The owner found a RustMaps `pageData` workflow showing heatMaps/tile URLs. 
**Decision:** This requires a separate official API/ToS audit before product integration. No scraping or internal pageData dependency was added in this sprint. Heatmap and marker future options were removed from the UI for now to maintain honest copy.

## No DB/Supabase/Auth/Env Changes
Confirmed. No backend configuration or migration was executed. All changes are confined to the React frontend map viewer code.
