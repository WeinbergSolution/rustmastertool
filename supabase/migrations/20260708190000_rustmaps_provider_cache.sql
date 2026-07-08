-- RustMaps Provider Integration — server-side map generation cache.
-- Populated ONLY by the rustmaps-provider Edge Function (service role).
-- Clients may read (SELECT) but never write directly.
--
-- Independent of server_map_identity; an optional battlemetrics_server_id lets
-- us relate a cached map to a server without modifying the existing table.

create table if not exists public.rustmaps_map_cache (
  id uuid primary key default gen_random_uuid(),

  -- Identity ------------------------------------------------------------------
  cache_key text unique not null,
  battlemetrics_server_id text,
  seed integer not null,
  world_size integer not null,
  staging boolean not null default false,

  -- Provider generation state -------------------------------------------------
  rustmaps_id text unique,
  state text not null default 'idle',
  queue_position integer,
  current_step text,
  status_message text,
  last_error text,

  -- Map assets & links --------------------------------------------------------
  map_url text,
  raw_image_url text,
  image_url text,
  image_icon_url text,
  thumbnail_url text,
  download_url text,
  can_download boolean not null default false,

  -- Map data ------------------------------------------------------------------
  total_monuments integer,
  monuments jsonb not null default '[]'::jsonb,
  biome_percentages jsonb,
  map_stats jsonb,
  provider_payload jsonb,

  -- Timestamps ----------------------------------------------------------------
  provider_checked_at timestamptz,
  generated_at timestamptz,
  estimated_deletion_date timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Constraints ---------------------------------------------------------------
  constraint rustmaps_map_cache_seed_positive check (seed > 0),
  constraint rustmaps_map_cache_world_size_range check (world_size between 1000 and 6000),
  constraint rustmaps_map_cache_state_allowed check (
    state in (
      'idle', 'queued', 'in_queue', 'generating', 'processing', 'uploading',
      'active', 'failed', 'unavailable', 'quota_exhausted', 'provider_not_configured'
    )
  ),
  constraint rustmaps_map_cache_key_format check (
    cache_key ~ '^procedural:[0-9]+:[0-9]+:(true|false)$'
  )
);

-- Indexes ---------------------------------------------------------------------
create index if not exists rustmaps_map_cache_lookup_idx
  on public.rustmaps_map_cache (world_size, seed, staging);
create index if not exists rustmaps_map_cache_state_idx
  on public.rustmaps_map_cache (state);
create index if not exists rustmaps_map_cache_rustmaps_id_idx
  on public.rustmaps_map_cache (rustmaps_id);
create index if not exists rustmaps_map_cache_bm_server_idx
  on public.rustmaps_map_cache (battlemetrics_server_id);

-- updated_at trigger (reuses the shared helper from core_foundation) -----------
create trigger handle_updated_at before update on public.rustmaps_map_cache
  for each row execute function public.set_updated_at();

-- RLS: public read-only. All writes go through the service role (Edge Function).
alter table public.rustmaps_map_cache enable row level security;

create policy "Public can view rustmaps map cache"
  on public.rustmaps_map_cache
  for select
  using (true);

-- Note: intentionally NO insert/update/delete policies for anon/authenticated.
-- The service role bypasses RLS, so only the Edge Function can write.
