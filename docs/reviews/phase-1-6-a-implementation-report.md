# Phase 1.6-A Implementation Report: Server Explorer Data Expansion

## BattleMetrics Data Layer
- **New Fields Utilized:** 
  - `details.rust_world_size` -> `mapSize`
  - `details.rust_world_seed` -> `seed`
  - `details.rust_last_wipe` -> `lastWipe` / `wipeAge`
  - `details.rust_type` -> `rustType` (Official, Community, Modded)
  - `details.rust_queued_players` -> `queue`
  - `rank` (global server rank)
- **Pagination Support:** The Edge Function now supports passing a direct `nextUrl` for page cursors and respects a dynamic `page[size]`, which defaults to 25.
- **Category Fetching:** `filter[rust_type]` is natively supported by BattleMetrics for Rust, allowing true fetching of Official, Community, or Modded lists directly from the API.

## Filter & Sorting Capabilities
- **Active Backend Filters:** 
  - `query` text search maps to `filter[search]`
  - `rust_type` explicitly maps to `filter[rust_type]` (values: official, community, modded)
  - Pagination (`nextUrl`) uses the true pagination link returned from BattleMetrics.
- **Future API Enhancements Required:** 
  - Player Count, Region, Map Size, and Wipe Schedule filters are currently static UI elements (`(Soon)` / informational). A backend expansion to convert these into BattleMetrics API flags (e.g. `filter[players][min]`, `filter[features][]`) will be needed to make them fully functional.

## Pagination & Load More
- The `ServersExplorer` now extracts the `links.next` from the BattleMetrics JSON:API response.
- A "Load More Servers" button is appended to the bottom of the result list if a `nextUrl` is present.
- Fetched results on "Load More" are appended to the existing array, preserving scroll state and current results.
- Page size is hardcoded in the frontend request options to `25` (up from previous 15).

## Official / Community / Modded
- Categorization is completely driven by real data. Clicking on "Official" or "Community" issues a dedicated fetch with `rustType` specified, querying BattleMetrics for those specific tags.
- The `rustType` is prominently displayed as a badge on the `ServerCard` and in the `ServerDetailPanel`.

## Deploy & Security Status
- **Edge Function:** `supabase/functions/battlemetrics/index.ts` **HAS BEEN MODIFIED** to support `nextUrl`, `pageSize`, `sort`, and `rust_type`.
- **Deploy Gate Open:** ⚠️ **OWNER ACTION REQUIRED** - You must review and deploy the Edge Function for the new filters/pagination to work. (e.g., `npx supabase functions deploy battlemetrics`).
- **Secrets:** Secret checks confirm no `VITE_BATTLEMETRICS_TOKEN`, `VITE_STEAM_API_KEY`, or any backend URLs have leaked into the frontend.

## Base Blueprints Roadmap
- A new section "Base Blueprints" has been added under "Pre-Game" in the sidebar.
- It is currently an honest, locked roadmap shell. No YouTube APIs, scraping logic, or dummy videos were implemented in this phase.
- **Future Technical Direction:** 
  - Use YouTube Data API strictly on the server-side for metadata.
  - Rely on YouTube IFrame Player for embedded playback to adhere to terms of service.
  - Implement a `base_blueprints` and `user_saved_blueprints` DB schema.

## Core Loop Integrity
- **Watchlist & Active Server:** Fully intact. User-scoped DB integration and Live Refresh eventing remain untouched and functional.
- **Steam Login & Logout Boundary:** Fully intact. Private user data continues to be cleared correctly on logout.

## What Owner Should Test
1. **Deploy Edge Function:** Deploy the updated `battlemetrics` function.
2. **Tab Switching:** Click between Official, Community, and Modded tabs in the Server Explorer. Verify new searches trigger automatically and return correct categories.
3. **Load More:** Scroll to the bottom of 25 results and click "Load More Servers". Ensure it appends rather than replaces.
4. **Data Visibility:** Open a Server Detail Panel. Check for Map Size, Seed, Wipe Date, Queue, and Rust Type badge.
5. **Base Blueprints:** Check the Sidebar under Pre-Game for the new Roadmap entry.
