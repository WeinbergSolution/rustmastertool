# Phase 1.4-A Implementation Report

## Branch Information
- **Branch**: `feature/phase-1-4-a-steam-active-server-core`
- **Commit**: `e4ae033` (feat: add steam auth active server core loop)
- **Push Status**: Successfully pushed to `origin/feature/phase-1-4-a-steam-active-server-core`

## Implementation Status

### 1. Steam Auth Edge Function
- **Implemented**: `supabase/functions/steam-auth/index.ts`
- **Details**: Handles `action=login` (OpenID 2.0 redirect) and `action=callback` (check_authentication, Admin API user creation, magiclink generation).
- **Security**: Verifies origin against an allowlist to prevent Open Redirects. Extracts SteamID64 server-side.

### 2. Database Migration
- **Implemented**: `20260706000000_profiles_steam_identity_and_active_server.sql`
- **Details**: Adds `steam_id` (unique), `steam_persona_name`, `last_steam_sync_at`, and `active_server_id` (UUID foreign key) to `profiles`.
- **Security**: Hardened Column-Level Grants. `authenticated` role can only update `username`, `avatar_url`, and `active_server_id`. The Steam identity columns can only be modified by the `service_role`.

### 3. Frontend Steam Integration
- **Implemented**: `SteamCallback.tsx` route added to parse `token_hash` and perform `supabase.auth.verifyOtp({ token_hash, type: 'email' })`.
- **Details**: `AuthUI.tsx` "Sign in with Steam" button now dynamically builds the edge function redirect URL. `useAuth.ts` loads the profile transparently.

### 4. Active Server & Cloud Watchlist
- **Implemented**: `battlemetrics` Edge Function updated to securely upsert live server data into `provider_servers` on `details` requests and return the internal UUID.
- **Details**: `Dashboard.tsx` uses this internal UUID to set the user's `active_server_id` in `profiles`. My Rust Context panel dynamically renders Steam Identity and the Active Server.
- **UI Cleanup**: Map Intel and Alert sections have been marked as disabled roadmap features, clearing out any fake functional appearance.

## Verification Checks
- `npm run typecheck:web`: **GREEN**
- `npm run build:web`: **GREEN**
- `npm run db:verify:local`: **GREEN** (Migration and RLS successfully tested locally).
- `git grep` Secrets Check: **GREEN** (No API keys or service roles in the frontend code).

## Remote / Owner Gates

The following actions require Owner execution against the Staging environment (`fcmjevwfuwzqtpozwigf`):

1. **Deploy Migration**:
   ```bash
   npx supabase db push --dry-run --project-ref fcmjevwfuwzqtpozwigf
   # STOP AND CONFIRM PUSH TO fcmjevwfuwzqtpozwigf STAGING
   npx supabase db push --project-ref fcmjevwfuwzqtpozwigf
   ```

2. **Configure Edge Function Secrets**:
   ```bash
   npx supabase secrets set SUPABASE_SERVICE_ROLE_KEY="..." STEAM_API_KEY="..." ALLOWED_ORIGIN="http://localhost:5173" --project-ref fcmjevwfuwzqtpozwigf
   ```

3. **Deploy Edge Functions**:
   ```bash
   npx supabase functions deploy battlemetrics --project-ref fcmjevwfuwzqtpozwigf
   npx supabase functions deploy steam-auth --no-verify-jwt --project-ref fcmjevwfuwzqtpozwigf
   ```

4. **Live Steam Login Test**:
   - Start the local dev server.
   - Click "Sign in with Steam" (which will proxy through your live Staging Edge Function).
   - Ensure the Steam Login flow redirects back and authenticates properly.

## Open Risks
- The `generateLink` / `verifyOtp` magiclink bridge assumes Supabase Auth allows implicit creation of `email` users with dummy emails (e.g. `<steamid>@steam.rustmastertool.local`). If the project has "Confirm Email" globally enforced or SMTP required, this flow might throw errors unless we implicitly verify via `admin.createUser({ email_confirm: true })` (which is included in the Edge Function).
- Testing the actual Steam OpenID response depends on the live Edge Function configuration.
