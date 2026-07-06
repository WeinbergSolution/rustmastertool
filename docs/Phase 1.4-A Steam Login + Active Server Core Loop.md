# Phase 1.4-A: Steam Login + Active Server Core Loop

The goal of this phase is to implement the Steam Login bridge via Supabase Edge Functions, migrate the `profiles` table to store Steam identity and `active_server_id`, extend the BattleMetrics Edge Function to upsert servers, and integrate this into the dashboard.

## Proposed Changes

### 1. Database Migrations
#### [NEW] [20260706000000_profiles_steam_identity_and_active_server.sql](file:///C:/Users/pasca/Documents/Developer%20Academy/DEV-Projekte/rustMasterTool/supabase/migrations/20260706000000_profiles_steam_identity_and_active_server.sql)
- Add `steam_id` (text, unique), `steam_persona_name` (text), `last_steam_sync_at` (timestamptz) to `profiles`.
- Add `active_server_id` (uuid) to `profiles`, referencing `provider_servers`.
- Revoke `UPDATE` on `profiles` from `authenticated`.
- Grant `UPDATE` specifically on `(username, avatar_url, active_server_id)` to `authenticated` (so `steam_id` can only be set by the service role).

### 2. Edge Functions
#### [NEW] [supabase/functions/steam-auth/index.ts](file:///C:/Users/pasca/Documents/Developer%20Academy/DEV-Projekte/rustMasterTool/supabase/functions/steam-auth/index.ts)
- Handles `action=login` to redirect to `https://steamcommunity.com/openid/login` with `openid.return_to` pointing back to the Edge Function.
- Handles `action=callback` to receive Steam's OpenID assertion, call `check_authentication` against Steam, and if valid, extract `steamID64`.
- Uses Supabase Admin API (`SUPABASE_SERVICE_ROLE_KEY`) to find/create a user via `email` (e.g., `<steamid64>@steam.rustmastertool.local`).
- Calls `admin.generateLink({type: 'magiclink', email})` to get a `token_hash`.
- Redirects the user to `http://localhost:5173/auth/steam/callback?token_hash=...`.

#### [MODIFY] [supabase/functions/battlemetrics/index.ts](file:///C:/Users/pasca/Documents/Developer%20Academy/DEV-Projekte/rustMasterTool/supabase/functions/battlemetrics/index.ts)
- Add functionality to `upsert` the requested server into `provider_servers` when fetching `details` using the Supabase Service Role client.

### 3. Frontend Integration
#### [NEW] [apps/web/src/features/auth/SteamCallback.tsx](file:///C:/Users/pasca/Documents/Developer%20Academy/DEV-Projekte/rustMasterTool/apps/web/src/features/auth/SteamCallback.tsx)
- New component route `/auth/steam/callback` that reads `token_hash` from the URL, calls `supabase.auth.verifyOtp({ type: 'magiclink', token_hash, type: 'email' })` and redirects to the Dashboard.

#### [MODIFY] [apps/web/src/components/AuthUI.tsx](file:///C:/Users/pasca/Documents/Developer%20Academy/DEV-Projekte/rustMasterTool/apps/web/src/components/AuthUI.tsx)
- Hook up the "Sign in with Steam" button to redirect to the `steam-auth` Edge Function.

#### [MODIFY] [apps/web/src/features/dashboard/Dashboard.tsx](file:///C:/Users/pasca/Documents/Developer%20Academy/DEV-Projekte/rustMasterTool/apps/web/src/features/dashboard/Dashboard.tsx)
- Display the current Active Server based on the user's `profile.active_server_id`.
- Show Steam Persona in the "My Rust Context".
- Allow setting a BattleMetrics server as the Active Server (saving the UUID to `profiles`).

#### [MODIFY] [apps/web/src/lib/data/watchlistRepository.ts](file:///C:/Users/pasca/Documents/Developer%20Academy/DEV-Projekte/rustMasterTool/apps/web/src/lib/data/watchlistRepository.ts)
- Update `SupabaseWatchlistRepository` to actually query and manipulate `user_watchlists` and `watchlist_items` when a valid Session is present.

### 4. UI Cleanup
- Update Maps and Alerts sections to be honest "Disabled/Roadmap" cards.

## Verification Plan

### Automated Tests
- Run `npm run db:verify:local` to ensure migrations pass.
- Run `npm run typecheck:web` and `npm run build:web` to ensure no build breaks.
- Use `git grep` to ensure no secrets or service roles leaked into `apps/web/src`.

### Manual Verification
- Stop and ask the Owner to confirm `db push --dry-run` to Staging (`fcmjevwfuwzqtpozwigf`).
- Once pushed, the Owner should test the Steam Login flow locally by clicking "Sign in with Steam".
- Verify that a Steam login returns a valid session.
- Verify setting an "Active Server" upserts into `provider_servers` and updates the profile.

> [!IMPORTANT]
> The Edge Function requires configuration in the Supabase project. The Owner will need to run:
> `npx supabase secrets set SUPABASE_SERVICE_ROLE_KEY="..." STEAM_API_KEY="..." --project-ref fcmjevwfuwzqtpozwigf`
> We will provide exact runbook commands in a `docs/runbooks/phase-1-4-a-steam-auth.md` file.
