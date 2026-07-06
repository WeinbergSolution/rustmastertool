-- Securely activate Server Pulse Cron Jobs via Supabase Vault

-- 1. Create pg_cron jobs
-- Note: 'server_pulse_ingest_secret' MUST exist in vault.secrets.
-- If it doesn't, the jobs will pass a NULL token and the edge function will cleanly reject with 401.

-- Official (Every hour at minute 05)
SELECT cron.schedule(
  'server-pulse-official-hourly',
  '5 * * * *',
  $$
    SELECT net.http_post(
      url:='https://fcmjevwfuwzqtpozwigf.supabase.co/functions/v1/server-pulse-ingest',
      headers:=(
        SELECT jsonb_build_object(
          'Content-Type', 'application/json',
          'SERVER_PULSE_INGEST_SECRET', (SELECT secret FROM vault.secrets WHERE name = 'server_pulse_ingest_secret' LIMIT 1)
        )
      ),
      body:=jsonb_build_object('category', 'official', 'maxPages', 1, 'mode', 'scheduled')
    );
  $$
);

-- Community (Every hour at minute 25)
SELECT cron.schedule(
  'server-pulse-community-hourly',
  '25 * * * *',
  $$
    SELECT net.http_post(
      url:='https://fcmjevwfuwzqtpozwigf.supabase.co/functions/v1/server-pulse-ingest',
      headers:=(
        SELECT jsonb_build_object(
          'Content-Type', 'application/json',
          'SERVER_PULSE_INGEST_SECRET', (SELECT secret FROM vault.secrets WHERE name = 'server_pulse_ingest_secret' LIMIT 1)
        )
      ),
      body:=jsonb_build_object('category', 'community', 'maxPages', 1, 'mode', 'scheduled')
    );
  $$
);

-- Modded (Every hour at minute 45)
SELECT cron.schedule(
  'server-pulse-modded-hourly',
  '45 * * * *',
  $$
    SELECT net.http_post(
      url:='https://fcmjevwfuwzqtpozwigf.supabase.co/functions/v1/server-pulse-ingest',
      headers:=(
        SELECT jsonb_build_object(
          'Content-Type', 'application/json',
          'SERVER_PULSE_INGEST_SECRET', (SELECT secret FROM vault.secrets WHERE name = 'server_pulse_ingest_secret' LIMIT 1)
        )
      ),
      body:=jsonb_build_object('category', 'modded', 'maxPages', 1, 'mode', 'scheduled')
    );
  $$
);

-- 2. Update scheduler state to reflect activation
UPDATE public.server_pulse_scheduler_state
SET 
  enabled = true,
  interval_minutes = 60,
  max_pages_per_run = 1,
  max_page_window = COALESCE(max_page_window, 20),
  updated_at = now()
WHERE category IN ('official', 'community', 'modded');
