# Model Handoff

## 1. Project Context
RustMasterTool is a server intelligence dashboard for Rust server owners. We are currently implementing Phase 1.7-B Server Pulse Activation + Retention Intelligence UI. The primary goal is to securely build historical server population data over time and visually display honest retention metrics (how well a server holds population after wipe).

## 2. Recent Progress
- **Remote DB Push**: `20260706001000_server_population_snapshots.sql` was pushed to Staging.
- **Edge Function Deploy**: `server-pulse-ingest` was deployed to Staging.
- **UI Enhancements**: 
  - Cleaned up `ServerPulseView` to look like a gamer-focused product module, dropping the raw `curl` commands.
  - Implemented real-time stats (Server count and Snapshot count) polling for the `ServerPulseView`.
  - Added a "Pulse collecting" badge on `ServerCard`.
  - Upgraded `ServerDetailPanel` to show honest Retention Buckets (6h, 12h, 18h, 24h, 30h) derived from snapshots using the new `calculatePulseSummary` utility in `apps/web/src/lib/api/retention.ts`.
- **Top Bar**: Changed Phase label to "Server Intelligence Alpha".

## 3. Current State
- `feature/phase-1-7-a-server-pulse-foundation` contains all Phase 1.7-A and 1.7-B commits.
- Remote Gate passed for pushing DB schema and Edge Function.
- Ingestion Secret Check showed that `SERVER_PULSE_INGEST_SECRET` is NOT yet set on Supabase.
- Code builds cleanly and typecheck passes.
- No secrets are leaked in the frontend.

## 4. Guardrails in Effect
- **NO SECRETS EXPOSED** in frontend or git.
- **NO FAKE/MOCK DATA** for retention curves. We honestly tell the user if there are not enough snapshots yet.
- Steam Login, Servers Explorer, Watchlist, Active Server and Logout Boundary remain completely intact.

## 5. Next Recommended Step
- **Owner Task**: Set the `SERVER_PULSE_INGEST_SECRET` in Supabase via `npx supabase secrets set SERVER_PULSE_INGEST_SECRET="..."`.
- **Owner Gate**: Manually trigger the edge function ingest via `curl` to populate the DB with initial data.
- **Owner Smoke Test**: Validate that `ServerPulseView` and `ServerDetailPanel` display the fetched data accurately.
- **Merge**: Merge the feature branch into main once verified.
