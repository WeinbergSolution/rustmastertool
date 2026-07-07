-- 1. server_monitoring_targets
CREATE TABLE public.server_monitoring_targets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_server_id uuid NOT NULL REFERENCES public.provider_servers(id) ON DELETE CASCADE,
  priority_tier integer NOT NULL DEFAULT 3,
  priority_score integer NOT NULL DEFAULT 0,
  reason_codes jsonb NOT NULL DEFAULT '[]'::jsonb,
  check_interval_minutes integer NOT NULL DEFAULT 240,
  last_checked_at timestamptz,
  next_check_at timestamptz NOT NULL DEFAULT now(),
  active boolean NOT NULL DEFAULT true,
  last_error text,
  fail_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(provider_server_id),
  CONSTRAINT server_monitoring_targets_priority_tier_check CHECK (priority_tier BETWEEN 1 AND 4),
  CONSTRAINT server_monitoring_targets_check_interval_minutes_check CHECK (check_interval_minutes > 0),
  CONSTRAINT server_monitoring_targets_fail_count_check CHECK (fail_count >= 0)
);

CREATE INDEX idx_server_monitoring_targets_active_next_check ON public.server_monitoring_targets(active, next_check_at);
CREATE INDEX idx_server_monitoring_targets_tier_active ON public.server_monitoring_targets(priority_tier, active);
CREATE INDEX idx_server_monitoring_targets_score_desc ON public.server_monitoring_targets(priority_score DESC);

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.server_monitoring_targets FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.server_monitoring_targets ENABLE ROW LEVEL SECURITY;
-- No auth policies (Backend service_role only)

-- 2. server_health_scores_latest
CREATE TABLE public.server_health_scores_latest (
  provider_server_id uuid PRIMARY KEY REFERENCES public.provider_servers(id) ON DELETE CASCADE,
  calculated_at timestamptz NOT NULL DEFAULT now(),
  wipe_age_hours numeric,
  current_players integer,
  max_players integer,
  queue_players integer,
  peak_players_24h integer,
  peak_players_since_wipe integer,
  dropoff_percent_from_peak numeric,
  slope_1h numeric,
  slope_3h numeric,
  slope_6h numeric,
  estimated_hours_until_dead numeric,
  death_risk_score integer NOT NULL DEFAULT 0,
  health_label text NOT NULL DEFAULT 'unknown',
  confidence numeric NOT NULL DEFAULT 0,
  reason_summary text,
  reason_factors jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT server_health_scores_latest_death_risk_score_check CHECK (death_risk_score BETWEEN 0 AND 100),
  CONSTRAINT server_health_scores_latest_confidence_check CHECK (confidence BETWEEN 0 AND 1),
  CONSTRAINT server_health_scores_latest_health_label_check CHECK (health_label IN ('unknown', 'booming', 'healthy', 'fading', 'critical', 'dead')),
  CONSTRAINT server_health_scores_latest_current_players_check CHECK (current_players >= 0 OR current_players IS NULL),
  CONSTRAINT server_health_scores_latest_peak_players_24h_check CHECK (peak_players_24h >= 0 OR peak_players_24h IS NULL)
);

CREATE INDEX idx_server_health_scores_latest_risk_desc ON public.server_health_scores_latest(death_risk_score DESC);
CREATE INDEX idx_server_health_scores_latest_label ON public.server_health_scores_latest(health_label);
CREATE INDEX idx_server_health_scores_latest_calculated_desc ON public.server_health_scores_latest(calculated_at DESC);

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.server_health_scores_latest FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.server_health_scores_latest ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view server health scores" ON public.server_health_scores_latest FOR SELECT USING (true);
-- No auth writes

-- 3. server_population_rollups_hourly
CREATE TABLE public.server_population_rollups_hourly (
  provider_server_id uuid NOT NULL REFERENCES public.provider_servers(id) ON DELETE CASCADE,
  hour_bucket timestamptz NOT NULL,
  samples_count integer NOT NULL DEFAULT 0,
  avg_players numeric,
  max_players integer,
  min_players integer,
  first_players integer,
  last_players integer,
  avg_queue numeric,
  max_queue integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (provider_server_id, hour_bucket),
  CONSTRAINT server_population_rollups_hourly_samples_count_check CHECK (samples_count >= 0),
  CONSTRAINT server_population_rollups_hourly_max_players_check CHECK (max_players >= 0 OR max_players IS NULL),
  CONSTRAINT server_population_rollups_hourly_min_players_check CHECK (min_players >= 0 OR min_players IS NULL)
);

CREATE INDEX idx_server_population_rollups_hourly_server_bucket_desc ON public.server_population_rollups_hourly(provider_server_id, hour_bucket DESC);
CREATE INDEX idx_server_population_rollups_hourly_bucket_desc ON public.server_population_rollups_hourly(hour_bucket DESC);

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.server_population_rollups_hourly FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.server_population_rollups_hourly ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view server rollups" ON public.server_population_rollups_hourly FOR SELECT USING (true);
-- No auth writes

-- 4. server_wipe_events (Recreating with new schema)
DROP TABLE IF EXISTS public.server_wipe_events;

CREATE TABLE public.server_wipe_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_server_id uuid NOT NULL REFERENCES public.provider_servers(id) ON DELETE CASCADE,
  detected_wipe_at timestamptz NOT NULL,
  source text NOT NULL DEFAULT 'map_identity',
  previous_seed bigint,
  new_seed bigint,
  previous_world_size integer,
  new_world_size integer,
  previous_level_name text,
  new_level_name text,
  previous_map_hash text,
  new_map_hash text,
  confidence numeric NOT NULL DEFAULT 0.5,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT server_wipe_events_confidence_check CHECK (confidence BETWEEN 0 AND 1),
  CONSTRAINT server_wipe_events_source_check CHECK (source IN ('map_identity', 'battlemetrics', 'manual', 'inferred'))
);

CREATE INDEX idx_server_wipe_events_server_date_desc ON public.server_wipe_events(provider_server_id, detected_wipe_at DESC);
CREATE INDEX idx_server_wipe_events_date_desc ON public.server_wipe_events(detected_wipe_at DESC);
CREATE INDEX idx_server_wipe_events_source ON public.server_wipe_events(source);

ALTER TABLE public.server_wipe_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view server wipe events" ON public.server_wipe_events FOR SELECT USING (true);
-- No auth writes

-- 5. Snapshot Retention Index
CREATE INDEX IF NOT EXISTS idx_server_population_snapshots_observed_at ON public.server_population_snapshots(observed_at);
