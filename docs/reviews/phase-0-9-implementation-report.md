# Phase 0.9 Implementation Report: Auth Boundary & Async Repository

## Changes Made
- **Watchlist Repository**: Converted all methods (`getWatchedServerIds`, `setWatchedServerIds`, `addServer`, `removeServer`, `toggleServer`, `isWatched`) to be `Promise`-based async methods to prepare for future Cloud/Supabase integration.
- **Dashboard Refactor**: Removed direct React lifecycle overwrites to the repository. The Dashboard now treats the repository as the authoritative source of truth. Data is fetched on mount and updated asynchronously when toggling.
- **Auth Seam (`useAuth`)**: Created a passive authentication seam hook that returns `unauthenticated`. This prevents breaking the UI while ensuring that components can gracefully adapt once real auth is supplied.
- **Topbar UI**: Integrated `useAuth` into the Topbar to explicitly show the "Local Mode — not signed in" status without altering the core visual design.

## Constraints Respected
- **NO Supabase Queries**: The `SupabaseWatchlistRepository` remains fully stubbed and inactive. `supabaseClient.ts` was untouched.
- **NO Real Auth**: `useAuth` is entirely mocked/static.
- **NO Database/Migrations**: Completely offline.
- **NO `localStorage` leaks in UI**: `Dashboard.tsx` uses only the repository.

## Open Considerations for Phase 0.9.1+
- **Local to Cloud Mapping**: Local fixture servers use mock IDs that do not perfectly map to the `provider_servers.id` UUID schema in Supabase. A mapping layer or normalization step will be required when bridging local to cloud data.
- **Steam OpenID**: Remains in the planning and research phase. ADR-014 exists but implementation is deferred.
