-- Securely activate Server Pulse Cron Jobs via Supabase Vault (Fix: use decrypted_secrets)

SELECT cron.unschedule('server-pulse-official-hourly');
SELECT cron.unschedule('server-pulse-community-hourly');
SELECT cron.unschedule('server-pulse-modded-hourly');

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
          'SERVER_PULSE_INGEST_SECRET', (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'server_pulse_ingest_secret' LIMIT 1)
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
          'SERVER_PULSE_INGEST_SECRET', (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'server_pulse_ingest_secret' LIMIT 1)
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
          'SERVER_PULSE_INGEST_SECRET', (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'server_pulse_ingest_secret' LIMIT 1)
        )
      ),
      body:=jsonb_build_object('category', 'modded', 'maxPages', 1, 'mode', 'scheduled')
    );
  $$
);
