-- Migration: Server Pulse Scheduler Foundation

CREATE TABLE IF NOT EXISTS public.server_pulse_ingest_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  mode text NOT NULL DEFAULT 'scheduled',
  dry_run boolean NOT NULL DEFAULT false,
  started_at timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz,
  max_pages integer,
  pages_processed integer DEFAULT 0,
  servers_found integer DEFAULT 0,
  server_upsert_attempts integer DEFAULT 0,
  snapshot_insert_attempts integer DEFAULT 0,
  actual_server_count_after integer,
  actual_snapshot_count_after integer,
  errors_count integer DEFAULT 0,
  errors jsonb DEFAULT '[]'::jsonb,
  status text NOT NULL DEFAULT 'running',
  note text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.server_pulse_scheduler_state (
  id text PRIMARY KEY,
  category text NOT NULL,
  enabled boolean NOT NULL DEFAULT true,
  interval_minutes integer NOT NULL DEFAULT 60,
  max_pages_per_run integer NOT NULL DEFAULT 1,
  last_run_at timestamptz,
  last_success_at timestamptz,
  last_error_at timestamptz,
  last_error_message text,
  consecutive_errors integer DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.server_pulse_ingest_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.server_pulse_scheduler_state ENABLE ROW LEVEL SECURITY;

-- Policies for server_pulse_ingest_runs
CREATE POLICY "Public can view ingest runs"
  ON public.server_pulse_ingest_runs
  FOR SELECT USING (true);

-- Policies for server_pulse_scheduler_state
CREATE POLICY "Public can view scheduler state"
  ON public.server_pulse_scheduler_state
  FOR SELECT USING (true);

-- Insert safe defaults
INSERT INTO public.server_pulse_scheduler_state (id, category, enabled, interval_minutes, max_pages_per_run)
VALUES
  ('official', 'official', false, 60, 1),
  ('community', 'community', false, 60, 1),
  ('modded', 'modded', false, 60, 1)
ON CONFLICT (id) DO NOTHING;
