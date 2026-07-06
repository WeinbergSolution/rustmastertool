# Implementation Plan: Phase 1.9-A Automation and Blueprint Polish

This plan addresses both the implementation of the Server Pulse automated scheduler foundation and the final polish for the Base Blueprint library, strictly adhering to remote gates and secret management rules.

## Proposed Changes

### Part A: Server Pulse Automated Scheduler

#### 1. Database Schema (Migration)
[NEW] `supabase/migrations/20260706090000_server_pulse_scheduler.sql`
- Create `server_pulse_ingest_runs` table to log every manual or scheduled execution of the ingest function.
- Create `server_pulse_scheduler_state` table to track global scheduler toggles, intervals, and last success/error timestamps.
- Apply RLS: `SELECT` available to public/authenticated for dashboard transparency. `INSERT/UPDATE` restricted to the service role (Edge Function).

#### 2. Edge Function Update
[MODIFY] `supabase/functions/server-pulse-ingest/index.ts`
- Modify the function to insert a record into `server_pulse_ingest_runs` at the end of execution (or upon failure).
- The function will capture `category`, `max_pages`, `pages_processed`, `server_upsert_attempts`, `snapshot_insert_attempts`, `errors`, `started_at`, and `finished_at`.
- Dry runs will also be logged but explicitly marked with `dry_run = true`.

#### 3. UI Dashboard Updates
[MODIFY] `apps/web/src/features/dashboard/ServerPulseView.tsx`
- Add a new "Scheduler Status" section to display metrics like "Total Tracked Servers", "Total Snapshots", and "Last Successful Run".
- Show a table/list of recent ingest runs querying the `server_pulse_ingest_runs` table.
- If the scheduler is not yet actively ticking (no recent automated runs), show "Scheduler prepared, awaiting activation."

#### 4. Architecture & Runbook (No Hardcoded Secrets)
[NEW] `docs/runbooks/server-pulse-scheduler.md`
- The `SERVER_PULSE_INGEST_SECRET` must **never** be committed to Git or written in plain SQL migrations.
- I propose using an external cron scheduler (like GitHub Actions or Vercel Cron) OR documenting exactly how the Owner can manually enable `pg_cron` + `pg_net` via the Supabase SQL editor using `supabase_vault` to securely fetch the secret at runtime.
- The initial deployment will prepare all the DB state, UI, and edge functions, but the *actual* cron execution will remain an open "Remote Gate" for the owner to enable manually.

---

### Part B: Base Blueprint Library Polish

#### 1. Search Enhancements
[MODIFY] `supabase/functions/base-blueprints/index.ts`
- Enhance the `search` action. Currently it searches `title` and `category`. I will update the query to also search the `tags` text array (using PostgREST array operators).
- Ensure `raw_youtube` isn't sent back to save bandwidth.

#### 2. Saved Blueprints (Saved UX)
[MODIFY] `apps/web/src/features/dashboard/BaseBlueprintsView.tsx`
[MODIFY] `apps/web/src/lib/api/baseBlueprints.ts`
- Implement the UI to "Save" and "Remove" a blueprint using the `user_saved_blueprints` table.
- If the user is logged in and has saved blueprints, render a new horizontal rail at the very top: "My Saved Blueprints".
- If logged out, clicking "Save" will show a tooltip or trigger a login CTA.

#### 3. Player Modal Polish
[MODIFY] `apps/web/src/features/dashboard/BaseBlueprintsView.tsx`
- Add keyboard event listeners to the Player Modal so pressing the `Escape` key closes the modal.
- Ensure the modal traps focus or handles z-index perfectly.

#### 4. Documentation
[NEW] `docs/runbooks/base-blueprints-library-maintenance.md`
- Create a runbook explaining how the markdown seed works, how to add new links, and how the cache-first architecture avoids YouTube rate-limits.

## Verification Plan

### Automated Tests
- `npm run typecheck:web`
- `npm run build:web`

### Manual Verification
- Secret Check: Ensure no secrets are leaked in any `.sql`, `.ts`, or `.md` files.
- UI Smoke Test: Validate that the Base Blueprints UI displays the "Saved" functionality correctly, and Server Pulse UI shows the new Scheduler tab.

## User Review Required

> [!IMPORTANT]
> **Scheduler Execution Engine:** To strictly adhere to your secret rules, the SQL migration will NOT contain a `pg_cron` schedule. Instead, the `server-pulse-scheduler.md` runbook will outline how to set it up securely in your remote dashboard. Do you approve this architecture?
