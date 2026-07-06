create table public.server_map_identity (
  id uuid primary key default gen_random_uuid(),
  provider_server_id uuid references public.provider_servers(id) on delete cascade,
  battlemetrics_server_id text,
  server_ip text,
  server_port int,
  map_type text check (map_type in ('procedural', 'barren', 'custom', 'unknown')),
  level_name text,
  seed bigint,
  world_size int,
  map_hash text,
  wipe_detected_at timestamptz,
  source text,
  confidence numeric(3,2) check (confidence >= 0 and confidence <= 1),
  is_custom_map boolean default false,
  custom_map_url text,
  rustmaps_url text,
  rustmaps_thumbnail_url text,
  rustmaps_map_url text,
  monument_count int,
  monument_names jsonb,
  monument_counts jsonb,
  biome_percentages jsonb,
  raw_source jsonb,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create unique index server_map_identity_provider_wipe_idx on public.server_map_identity(provider_server_id, wipe_detected_at);

create trigger handle_updated_at before update on public.server_map_identity
  for each row execute function public.set_updated_at();

-- RLS
alter table public.server_map_identity enable row level security;
create policy "Public can view server map identities" on public.server_map_identity for select using (true);
