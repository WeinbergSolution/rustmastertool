# Phase 1.3-A: Real BattleMetrics Server Explorer - Report

## 1. Goal
Implement a real, live BattleMetrics Server Explorer integrated into the existing product UI without exposing any backend secrets to the frontend.

## 2. Implementation Summary
- **Edge Function Proxy:** Created `supabase/functions/battlemetrics/index.ts` to securely proxy requests to the BattleMetrics API. The `BATTLEMETRICS_TOKEN` is injected via Supabase secrets and is not exposed to the client.
- **Frontend API Contract:** Implemented `apps/web/src/lib/api/battlemetrics.ts` which uses `supabase.functions.invoke` to call the edge function for `search` and `details` actions.
- **UI Integration:** 
  - Updated `Dashboard.tsx` to include a live search form that queries the edge function.
  - Replaced static mock server generation with live data handling.
  - Updated `ServerCard.tsx` and `ServerDetailPanel.tsx` to handle the normalized data structure from the API (`map`, `ip`, `details`, etc.).
  - Handled loading, error, and empty states appropriately in the UI.
- **Security Check:** Verified that no tokens were committed. `.env.example` files were updated with placeholder instructions.

## 3. Results
- **Status:** GREEN
- **Build & Typecheck:** Both `build:web` and `typecheck:web` passed successfully.
- **Live Readiness:** The frontend expects the edge function at `battlemetrics`. Since deployment to Staging requires Owner Gate (due to CLI login constraints), a runbook (`docs/runbooks/phase-1-3-a-battlemetrics-edge-function.md`) was provided for the Owner to execute local serving, secret setting, and remote deployment.

## 4. Next Steps
- Owner to review, test locally using the runbook, and deploy the edge function to Staging.
- Merge the `feature/phase-1-3-a-real-battlemetrics-server-explorer` branch into `main`.
