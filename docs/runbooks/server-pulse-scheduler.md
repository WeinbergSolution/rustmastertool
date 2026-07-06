# Server Pulse Scheduler Runbook

This document describes how to securely enable and manage the automated execution of the `server-pulse-ingest` Edge Function. 

To strictly adhere to security guidelines, **no secrets are stored in SQL migrations**. The scheduling relies on the native `pg_cron` and `pg_net` extensions, but must be configured securely by the database owner.

## Architecture

The scheduler uses the following tables to track state:
- `server_pulse_scheduler_state`: Controls whether a specific category (official, community, modded) is currently scheduled, and how often.
- `server_pulse_ingest_runs`: A historical log of every run (both manual and scheduled).

## Securely Activating the Cron Job (pg_cron)

You can schedule the Edge Function to run automatically by utilizing Supabase Vault for the secret, and `pg_net` to execute the HTTP POST request.

**WARNING: NEVER commit your `SERVER_PULSE_INGEST_SECRET` to GitHub or place it in a `.sql` file.**

### Option 1: GitHub Actions (Recommended for simplicity)

If you prefer keeping cron jobs out of the database, you can create a `.github/workflows/server-pulse-cron.yml` that makes a simple cURL request to the Edge Function, using a GitHub Secret for authentication.

### Option 2: pg_cron + pg_net (Native Supabase)

If you prefer keeping execution native to the Supabase Postgres instance:

1. Enable the `pg_net` and `supabase_vault` extensions via the Supabase Dashboard.
2. In the Supabase Dashboard -> Vault, create a new secret named `SERVER_PULSE_INGEST_SECRET`.
3. Open the Supabase SQL Editor and run a script similar to the following. (Modify the schedule as needed, e.g., `0 * * * *` for hourly).

```sql
-- Example for hourly official server ingest
SELECT cron.schedule(
  'server-pulse-official-hourly', 
  '0 * * * *', 
  $$
    SELECT net.http_post(
      url := 'https://[PROJECT_REF].supabase.co/functions/v1/server-pulse-ingest',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('request.jwt.env.supabase_service_role_key', true),
        'SERVER_PULSE_INGEST_SECRET', (SELECT secret FROM vault.decrypted_secrets WHERE name = 'SERVER_PULSE_INGEST_SECRET' LIMIT 1)
      ),
      body := '{"category":"official", "maxPages":2}'::jsonb
    );
  $$
);
```

4. Once the cron job is successfully invoking the function, update the scheduler state so the UI reflects the active status:
```sql
UPDATE public.server_pulse_scheduler_state SET enabled = true WHERE id = 'official';
```

## Monitoring

- **Dashboard:** The RustMasterTool `Server Pulse` view automatically reads `server_pulse_ingest_runs` and displays a table of recent runs, errors, and processed counts.
- **Errors:** If runs are failing, check the Supabase Edge Function logs for details.

## Deactivating the Cron

If you need to stop the ingest:
1. Turn it off in pg_cron: `SELECT cron.unschedule('server-pulse-official-hourly');`
2. Update the state: `UPDATE public.server_pulse_scheduler_state SET enabled = false WHERE id = 'official';`
