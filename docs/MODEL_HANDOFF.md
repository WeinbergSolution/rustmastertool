# Model Handoff

## 1. Project Context
RustMasterTool is a server intelligence dashboard for Rust server owners. We are currently implementing Phase 2.1-A Vercel Production Audit. The primary goal is to ensure the Vercel production deployment can successfully connect to the remote Supabase instance and authenticate users.

## 2. Recent Progress
- **Map Intelligence Integration**: Phase 2.0-A Map Identity was successfully merged into main, actively filling the `server_map_identity` database table automatically during cron runs.
- **Vercel Audit**: Discovered that the Vercel Production deployment was missing the core environment variables required for the Vite React frontend to talk to Supabase. Thus, `VITE_DATA_MODE` was defaulting to `fixture` mode and the `supabaseClient` was `null`.
- **CORS / Steam Auth Audit**: Verified that the `steam-auth` Edge Function validates `ALLOWED_ORIGIN`. Since Vercel is a different domain than localhost, the Vercel domain needs to be allowed.
- **Runbook Creation**: Created `docs/runbooks/vercel-production-deployment.md` which includes all necessary manual configuration steps for the Vercel and Supabase environments.

## 3. Current State
- `feature/phase-2-1-a-vercel-production-data-fix` branch contains the updated documentation.
- The codebase itself (TypeScript/React) required zero bug fixes, as the lack of hardcoded secrets and robust fallback logic prevented crashes. The frontend properly defaulted to a safe state when variables were missing.
- Typecheck and Build are completely GREEN.

## 4. Guardrails in Effect
- **NO SECRETS EXPOSED** in frontend or git.
- **NO HARDCODED LOCALHOST FIXES**; proper environment variables must be utilized.
- Steam Login, Servers Explorer, Watchlist, Active Server and Logout Boundary remain completely intact.

## 5. Next Recommended Step
- **Owner Task**: Set up the Vercel Environment Variables (`VITE_DATA_MODE`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) in the Vercel Dashboard.
- **Owner Task**: Add `ALLOWED_ORIGIN=https://rustmastertool-web.vercel.app` to Supabase Edge Function Secrets.
- **Owner Task**: Verify Vercel deployment loads production data successfully.
