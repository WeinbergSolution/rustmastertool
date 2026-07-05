# Model Handoff

## 1. Project Context
RustMasterTool is a server intelligence dashboard for Rust server owners, currently operating in Phase 1.1-B-FIX-2 (Remote/Staging Migration Fix 2).

## 2. Recent Progress
- Phase 1.1-B (Remote Execution) push of foundation and grants was successful.
- The `alert_events` grant fix was applied successfully.
- **Issue Discovered:** Remote Smoke Test failed on Provider Table write grants. `anon` and `authenticated` roles had INSERT/UPDATE/DELETE privileges on `provider_servers` and `provider_source_status`, violating the security rule (SELECT-only).
- **Fix Prepared:** Created `20260705180000_restrict_provider_table_client_grants.sql` to explicitly REVOKE write access on Provider tables and enforce least privilege.
- Remote Smoke SQL was updated to include robust assertions for `provider_source_status`.

## 3. Current State
- `feature/phase-1-1-b-remote-migration-exec` contains the fix-2 migration and updated reports.
- **NO REMOTE FIX-2 EXECUTION HAS OCCURRED YET**.
- The AI environment cannot perform authenticated Supabase CLI operations.

## 4. Guardrails in Effect
- **NO LIVE CALLS**.
- **NO AUTH IMPLEMENTED**.
- **NO SECRETS EXPOSED**.
- Stop-and-confirm is strictly active for the fix-2 migration.

## 5. Next Recommended Step
- **STOP AND CONFIRM**: The Owner must explicitly respond with `CONFIRM PROVIDER GRANT FIX TO fcmjevwfuwzqtpozwigf STAGING` before any `db push` for the fix-2 can be initiated.
