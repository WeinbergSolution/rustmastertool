-- Custom updated_at trigger function
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Profiles
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text,
  avatar_url text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Provider Servers (Static/Normalized Data)
CREATE TABLE public.provider_servers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_type text NOT NULL, -- e.g., 'battlemetrics', 'rustmaps'
  provider_id text NOT NULL,
  name text NOT NULL,
  address text,
  port integer,
  status text NOT NULL DEFAULT 'offline',
  players integer DEFAULT 0 NOT NULL,
  max_players integer DEFAULT 0 NOT NULL,
  country text,
  map_name text,
  last_wipe timestamptz,
  world_seed integer,
  world_size integer,
  fps integer,
  fps_avg numeric,
  entity_count integer,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(provider_type, provider_id)
);
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.provider_servers FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.provider_servers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view provider servers" ON public.provider_servers FOR SELECT USING (true);
-- No auth writes for provider_servers (managed by backend service role)

-- Provider Source Status
CREATE TABLE public.provider_source_status (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_type text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'pending', -- 'healthy', 'degraded', 'offline', 'pending'
  last_check_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.provider_source_status FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.provider_source_status ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view provider source status" ON public.provider_source_status FOR SELECT USING (true);
-- No auth writes

-- User Watchlists
CREATE TABLE public.user_watchlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  is_default boolean DEFAULT false NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id, name)
);
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.user_watchlists FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.user_watchlists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own watchlists" ON public.user_watchlists FOR ALL USING (auth.uid() = user_id);

-- Watchlist Items
CREATE TABLE public.watchlist_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  watchlist_id uuid NOT NULL REFERENCES public.user_watchlists(id) ON DELETE CASCADE,
  provider_server_id uuid NOT NULL REFERENCES public.provider_servers(id) ON DELETE CASCADE,
  added_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(watchlist_id, provider_server_id)
);

ALTER TABLE public.watchlist_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage items in own watchlists" ON public.watchlist_items FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_watchlists
    WHERE user_watchlists.id = watchlist_items.watchlist_id
    AND user_watchlists.user_id = auth.uid()
  )
);

-- Alert Rules
CREATE TABLE public.alert_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  provider_server_id uuid NOT NULL REFERENCES public.provider_servers(id) ON DELETE CASCADE,
  rule_type text NOT NULL, -- e.g., 'population_spike', 'wipe_detected'
  threshold_value numeric,
  is_active boolean DEFAULT true NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.alert_rules FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.alert_rules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own alert rules" ON public.alert_rules FOR ALL USING (auth.uid() = user_id);

-- Alert Events
CREATE TABLE public.alert_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_rule_id uuid NOT NULL REFERENCES public.alert_rules(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'unread', -- 'unread', 'read', 'archived'
  message text NOT NULL,
  dedup_key text NOT NULL,
  fired_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id, dedup_key)
);

ALTER TABLE public.alert_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can select own alert events" ON public.alert_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own alert events" ON public.alert_events FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own alert events" ON public.alert_events FOR DELETE USING (auth.uid() = user_id);
-- Insert handled by system/service-role
