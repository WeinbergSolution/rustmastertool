-- Provider Server Population Snapshots
CREATE TABLE public.server_population_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_server_id uuid NOT NULL REFERENCES public.provider_servers(id) ON DELETE CASCADE,
  provider_type text NOT NULL DEFAULT 'battlemetrics',
  provider_id text NOT NULL,
  observed_at timestamptz NOT NULL DEFAULT now(),
  snapshot_bucket timestamptz NOT NULL,
  players integer,
  max_players integer,
  queued_players integer,
  rank integer,
  status text,
  country text,
  rust_type text,
  map_name text,
  map_size integer,
  map_seed text,
  last_wipe_at timestamptz,
  last_seed_change_at timestamptz,
  raw_details jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(provider_server_id, snapshot_bucket)
);

-- Indexes for efficient querying of population data
CREATE INDEX idx_snapshots_server_observed ON public.server_population_snapshots(provider_server_id, observed_at DESC);
CREATE INDEX idx_snapshots_provider ON public.server_population_snapshots(provider_type, provider_id);
CREATE INDEX idx_snapshots_bucket ON public.server_population_snapshots(snapshot_bucket);
CREATE INDEX idx_snapshots_wipe ON public.server_population_snapshots(last_wipe_at);
CREATE INDEX idx_snapshots_type ON public.server_population_snapshots(rust_type);
CREATE INDEX idx_snapshots_country ON public.server_population_snapshots(country);

-- RLS: Only Service Role can write, Public can read (for UI Pulse graphics)
ALTER TABLE public.server_population_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view population snapshots" ON public.server_population_snapshots FOR SELECT USING (true);
-- No auth write policies -> enforced service_role only for inserts/updates

-- Optional Wipe Events
CREATE TABLE public.server_wipe_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_server_id uuid NOT NULL REFERENCES public.provider_servers(id) ON DELETE CASCADE,
  wipe_at timestamptz NOT NULL,
  detected_at timestamptz NOT NULL DEFAULT now(),
  source text NOT NULL DEFAULT 'battlemetrics',
  raw_value jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(provider_server_id, wipe_at)
);

CREATE INDEX idx_wipe_events_server ON public.server_wipe_events(provider_server_id, wipe_at DESC);

ALTER TABLE public.server_wipe_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view wipe events" ON public.server_wipe_events FOR SELECT USING (true);
-- No auth write policies
