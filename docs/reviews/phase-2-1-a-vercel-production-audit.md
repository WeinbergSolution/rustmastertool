# Phase 2.1-A Vercel Production Audit Review

**Date:** 2026-07-06
**Status:** Completed
**Branch:** feature/phase-2-1-a-vercel-production-data-fix

## Root Cause for Vercel Data Load Failure
The data load failure on the Vercel production domain (`rustmastertool-web.vercel.app`) was caused by missing frontend environment variables.

In the codebase, `VITE_DATA_MODE` is used to determine whether to load data from Supabase or fallback to local static fixtures:
```typescript
const dataMode = import.meta.env.VITE_DATA_MODE || 'fixture';
```
Since `VITE_DATA_MODE` was not set in the Vercel project, it defaulted to `fixture`, meaning no live Supabase data was queried.
Additionally, if `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are not set, the Supabase client cannot be initialized.

## Action Required by Owner
There were no code bugs to fix (no hardcoded localhost URLs were found in the frontend components). The fix requires the owner to apply the correct environment variables directly in the Vercel dashboard and Supabase Vault.

A detailed checklist and Runbook have been created at `docs/runbooks/vercel-production-deployment.md`.

### Required Env Vars in Vercel:
- `VITE_DATA_MODE=supabase`
- `VITE_SUPABASE_URL=...`
- `VITE_SUPABASE_ANON_KEY=...`

### Required Supabase Secrets:
- `ALLOWED_ORIGIN=https://rustmastertool-web.vercel.app` (for the `steam-auth` Edge Function to allow CORS and redirect correctly).

## Audit Findings
- **RLS Policies:** Confirmed that `SELECT` policies for public access exist on `provider_servers`, `server_map_identity`, and `base_blueprints`. No RLS changes were needed.
- **Edge Functions:** The `steam-auth` edge function dynamically checks `Deno.env.get('ALLOWED_ORIGIN')`. Without this, production Steam logins will fail with a 403.
- **Secrets Security:** Verified that no secrets (`SUPABASE_SERVICE_ROLE_KEY`, `SERVER_PULSE_INGEST_SECRET`, `YOUTUBE_API_KEY`) are leaked into the frontend source code. `RUSTMAPS_API_KEY` is not present in the project.
