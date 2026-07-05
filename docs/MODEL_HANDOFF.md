# Model Handoff

## 1. Project Context
RustMasterTool is a server intelligence dashboard for Rust server owners, currently operating in Phase 1.2-A (Steam-first Auth Boundary Correction).

## 2. Recent Progress
- `useAuth` hook has been integrated with real Supabase Auth `getSession` and `onAuthStateChange`, kept generic without Email-specific constraints.
- Product UI (`AuthUI.tsx`) has been corrected to display a disabled "Sign in with Steam" button as the primary auth mechanism.
- Email Magic Link has been hidden behind a DEV flag (`VITE_ENABLE_DEV_MAGIC_LINK=true`) and is strictly NOT for production.
- Auto-profile trigger migration (`20260705200000_profile_auto_create.sql`) kept as a generic foundation for `public.profiles`.

## 3. Current State
- `feature/phase-1-2-a-auth-foundation` contains the Steam-first boundary codebase.
- **NO REMOTE FIX OR DB PUSH HAS OCCURRED YET FOR PHASE 1.2-A**.
- SupabaseWatchlistRepository remains inactive.
- Data Mode `fixture` remains the default.

## 4. Guardrails in Effect
- **NO LIVE CALLS**.
- **NO CLOUD WATCHLIST PERSISTENCE (yet)**.
- **NO SECRETS EXPOSED**.
- **NO REMOTE PUSH** without explicit replan and architecture review.

## 5. Next Recommended Step
- **Claude/Opus 4.8 Replan/Review**: Steam Auth + Supabase Identity Architecture needs to be planned before any further implementation or remote push.
