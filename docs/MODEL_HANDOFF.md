# Model Handoff

## 1. Project Context
RustMasterTool is a server intelligence dashboard for Rust server owners, currently operating in Phase 1.2-A (Supabase Auth Foundation + Profile Trigger).

## 2. Recent Progress
- `useAuth` hook has been integrated with real Supabase Auth `getSession` and `onAuthStateChange`.
- Minimal Magic Link UI (`AuthUI.tsx`) created and integrated into `Topbar.tsx`.
- Auto-profile trigger migration (`20260705200000_profile_auto_create.sql`) created to automatically populate `public.profiles` on new user registration in `auth.users`.
- Remote smoke test script updated to test this trigger.
- Environment templates updated to clarify frontend vs backend secrets.

## 3. Current State
- `feature/phase-1-2-a-auth-foundation` contains the Phase 1.2-A codebase and migration.
- **NO REMOTE FIX OR DB PUSH HAS OCCURRED YET FOR PHASE 1.2-A**.
- SupabaseWatchlistRepository remains inactive.
- Data Mode `fixture` remains the default.

## 4. Guardrails in Effect
- **NO LIVE CALLS**.
- **NO CLOUD WATCHLIST PERSISTENCE (yet)**.
- **NO SECRETS EXPOSED**.
- Stop-and-confirm is strictly active before the remote push of the new migration.

## 5. Next Recommended Step
- **STOP AND CONFIRM**: The Owner must explicitly respond with `CONFIRM AUTH FOUNDATION MIGRATION TO fcmjevwfuwzqtpozwigf STAGING` after running local checks and a remote `--dry-run`. Only then should `db push` be initiated.
