# Model Handoff

## 1. Project Context
RustMasterTool is a server intelligence dashboard for Rust server owners, currently operating in Phase 1.3-A Real BattleMetrics Server Explorer (GREEN). The primary goal is to show real live data securely via an Edge Function, and ultimately secure user interaction via Steam Authentication. Email Magic Link is NOT product auth.

## 2. Recent Progress
- **Edge Function**: Implemented `supabase/functions/battlemetrics/index.ts` to securely proxy BattleMetrics API requests, keeping the API token out of the client.
- **API Contract**: Implemented `apps/web/src/lib/api/battlemetrics.ts` to call the edge function cleanly from the frontend.
- **Frontend Dashboard**: Replaced `MOCK_SERVERS` with live API calls. The `ServerExplorer` UI now fetches real server data based on the user's search term. `ServerDetailPanel` fetches live server details on demand.
- **Security Check**: Verified that no secrets (e.g. `BATTLEMETRICS_TOKEN`) are leaked in the frontend code or committed to git.
- **Runbook**: Created `docs/runbooks/phase-1-3-a-battlemetrics-edge-function.md` to guide the Owner in configuring and deploying the Edge Function remotely, as the CLI lacks direct token auth in this agent session.

## 3. Current State
- `feature/phase-1-3-a-real-battlemetrics-server-explorer` is GREEN and ready for Owner review.
- SupabaseWatchlistRepository remains inactive.
- Live data from BattleMetrics is integrated for Search and Details.
- Auth UI remains disabled (Steam OpenID pending).

## 4. Guardrails in Effect
- **NO SECRETS EXPOSED** in frontend or git.
- **NO CLOUD WATCHLIST PERSISTENCE (yet)**.
- **NO FAKE/MOCK DATA** in the Server Explorer flow.

## 5. Next Recommended Step
- **Owner Gate**: Owner to execute the runbook locally to test and deploy the `battlemetrics` edge function.
- **Merge to main** after successful remote smoke testing.
- **Next Phase**: Either enable cloud watchlist persistence (Phase 1.4) or implement Steam Auth ADR/Spike for real user sessions.
