-- Seed data for Provider Source Status
INSERT INTO public.provider_source_status (provider_type, status, last_check_at)
VALUES 
  ('battlemetrics', 'pending', now()),
  ('rustmaps', 'pending', now())
ON CONFLICT (provider_type) DO NOTHING;

-- Seed data for Provider Servers (Synthetic Fixture Data)
INSERT INTO public.provider_servers (
  provider_type, provider_id, name, address, port, status, players, max_players, country, map_name, last_wipe, world_seed, world_size, fps, entity_count
) VALUES
(
  'battlemetrics',
  '987654321',
  'EU Facepunch 1',
  '192.168.1.100',
  28015,
  'online',
  145,
  200,
  'EU',
  'Procedural Map',
  '2026-07-02T19:00:00Z',
  1234567,
  4500,
  255,
  234567
),
(
  'battlemetrics',
  '123456789',
  'Rusty Moose |Mini|',
  '192.168.1.101',
  28015,
  'online',
  98,
  150,
  'US',
  'Procedural Map',
  '2026-07-01T14:00:00Z',
  9876543,
  3500,
  240,
  180000
),
(
  'battlemetrics',
  '555555555',
  'Rustafied.com - EU Main',
  '192.168.1.102',
  28015,
  'online',
  240,
  300,
  'EU',
  'Procedural Map',
  '2026-07-03T20:00:00Z',
  5555555,
  4000,
  180,
  250000
)
ON CONFLICT (provider_type, provider_id) DO NOTHING;
