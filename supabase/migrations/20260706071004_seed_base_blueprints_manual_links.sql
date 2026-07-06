-- Migration: Seed Base Blueprints with Manual YouTube Links
-- Generated from docs/seeds/rust_youtube_links.md


INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'Z9aBXjut-uU', 
  'THE BOOTCH: The Ideal Low Cost Solo Bunker Base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/Z9aBXjut-uU/hqdefault.jpg', 
  'rust solo base build', 
  'solo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'solo', 'bunker', 'cheap'], 
  'solo', 
  'solo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=Z9aBXjut-uU","source_categories":[{"key":"solo","label":"Solo","order":1},{"key":"bunker","label":"Bunker","order":11},{"key":"cheap","label":"Cheap","order":12}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'Wcb5TTleBK4', 
  'This ''''Willjum Core'''' is OP – Solo/Duo', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/Wcb5TTleBK4/hqdefault.jpg', 
  'rust solo base build', 
  'solo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'solo', 'duo', 'cheap'], 
  'solo', 
  'solo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=Wcb5TTleBK4","source_categories":[{"key":"solo","label":"Solo","order":2},{"key":"duo","label":"Duo","order":6},{"key":"cheap","label":"Cheap","order":13}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'j85CVfH6wG0', 
  'Mini OPENCORE Solo/Duo – Open Core Base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/j85CVfH6wG0/hqdefault.jpg', 
  'rust solo base build', 
  'solo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'solo', 'duo'], 
  'solo', 
  'solo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=j85CVfH6wG0","source_categories":[{"key":"solo","label":"Solo","order":3},{"key":"duo","label":"Duo","order":8}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'DHsEePKHfMM', 
  'Die PERFEKTE Solo Base in Rust (Meta 2025)', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/DHsEePKHfMM/hqdefault.jpg', 
  'rust solo base build', 
  'solo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'solo', 'cheap'], 
  'solo', 
  'solo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=DHsEePKHfMM","source_categories":[{"key":"solo","label":"Solo","order":4},{"key":"cheap","label":"Cheap","order":2}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '836__nw1Foo', 
  'Das ULTIMATIVE Solo-Basisdesign 2025', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/836__nw1Foo/hqdefault.jpg', 
  'rust solo base build', 
  'solo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'solo', 'beautiful'], 
  'solo', 
  'solo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=836__nw1Foo","source_categories":[{"key":"solo","label":"Solo","order":5},{"key":"beautiful","label":"Beautiful","order":9}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'GKTPmoXX2AI', 
  'This ''''Willjum'''' BASE is OP – Solo/Duo/Trio', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/GKTPmoXX2AI/hqdefault.jpg', 
  'rust solo base build', 
  'solo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'solo', 'duo'], 
  'solo', 
  'solo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=GKTPmoXX2AI","source_categories":[{"key":"solo","label":"Solo","order":6},{"key":"duo","label":"Duo","order":15}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'EoKycJXI4bo', 
  'Rust BUNKER SOLO / DUO Base Design', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/EoKycJXI4bo/hqdefault.jpg', 
  'rust solo base build', 
  'solo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'solo', 'bunker'], 
  'solo', 
  'solo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=EoKycJXI4bo","source_categories":[{"key":"solo","label":"Solo","order":7},{"key":"bunker","label":"Bunker","order":15}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'DpZVObbJ868', 
  'The ''''PERFECT SOLO'''' – New Solo/Duo', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/DpZVObbJ868/hqdefault.jpg', 
  'rust solo base build', 
  'solo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'solo'], 
  'solo', 
  'solo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=DpZVObbJ868","source_categories":[{"key":"solo","label":"Solo","order":8}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'GF8R_YKBIUs', 
  'Die einfache Solo-Basis (Starter)', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/GF8R_YKBIUs/hqdefault.jpg', 
  'rust solo base build', 
  'solo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'solo', 'starter_wipe_day'], 
  'solo', 
  'solo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=GF8R_YKBIUs","source_categories":[{"key":"solo","label":"Solo","order":9},{"key":"starter_wipe_day","label":"Starter / Wipe Day","order":7}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'asX_9fH2q50', 
  'Willjum''s Coziest Solo Base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/asX_9fH2q50/hqdefault.jpg', 
  'rust solo base build', 
  'solo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'solo'], 
  'solo', 
  'solo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=asX_9fH2q50","source_categories":[{"key":"solo","label":"Solo","order":10}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'IuH6dUgIipQ', 
  'The Knight – SEHR STARKES Solo/Duo', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/IuH6dUgIipQ/hqdefault.jpg', 
  'rust solo base build', 
  'solo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'solo', 'beautiful'], 
  'solo', 
  'solo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=IuH6dUgIipQ","source_categories":[{"key":"solo","label":"Solo","order":11},{"key":"beautiful","label":"Beautiful","order":10}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'auhPevJ6cRk', 
  'The BEAST – Super Strong Solo/Duo/Trio', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/auhPevJ6cRk/hqdefault.jpg', 
  'rust solo base build', 
  'solo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'solo', 'duo', 'trio', 'beautiful'], 
  'solo', 
  'solo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=auhPevJ6cRk","source_categories":[{"key":"solo","label":"Solo","order":12},{"key":"duo","label":"Duo","order":12},{"key":"trio","label":"Trio","order":2},{"key":"beautiful","label":"Beautiful","order":14}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'nw2xeZMQb64', 
  'Ich habe in Rust eine geheime Basis', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/nw2xeZMQb64/hqdefault.jpg', 
  'rust solo base build', 
  'solo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'solo', 'near_monument', 'crazy'], 
  'solo', 
  'solo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=nw2xeZMQb64","source_categories":[{"key":"solo","label":"Solo","order":13},{"key":"near_monument","label":"Near Monument","order":13},{"key":"crazy","label":"Crazy","order":10}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'pIHQ-dsU7kE', 
  'The ''''PERFECT SOLO'''' 2x1 Expansion', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/pIHQ-dsU7kE/hqdefault.jpg', 
  'rust solo base build', 
  'solo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'solo'], 
  'solo', 
  'solo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=pIHQ-dsU7kE","source_categories":[{"key":"solo","label":"Solo","order":14}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'dA65_TrBJaQ', 
  'Effizient, robust und gut geschützt', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/dA65_TrBJaQ/hqdefault.jpg', 
  'rust solo base build', 
  'solo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'solo', 'duo'], 
  'solo', 
  'solo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=dA65_TrBJaQ","source_categories":[{"key":"solo","label":"Solo","order":15},{"key":"duo","label":"Duo","order":19}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'QuT0eNfxg6Y', 
  'Rust – The Arbiter – Einzel', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/QuT0eNfxg6Y/hqdefault.jpg', 
  'rust solo base build', 
  'solo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'solo'], 
  'solo', 
  'solo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=QuT0eNfxg6Y","source_categories":[{"key":"solo","label":"Solo","order":16}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'nFIjdbu9Bwo', 
  'Die ULTIMATIVE 2x1-Erweiterung', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/nFIjdbu9Bwo/hqdefault.jpg', 
  'rust solo base build', 
  'solo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'solo', 'starter_wipe_day', 'air_airlock'], 
  'solo', 
  'solo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=nFIjdbu9Bwo","source_categories":[{"key":"solo","label":"Solo","order":17},{"key":"starter_wipe_day","label":"Starter / Wipe Day","order":18},{"key":"air_airlock","label":"Air / Airlock","order":14}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'mNgLwS-idCk', 
  'Willjum''s Secret BUNKER Base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/mNgLwS-idCk/hqdefault.jpg', 
  'rust solo base build', 
  'solo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'solo', 'bunker'], 
  'solo', 
  'solo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=mNgLwS-idCk","source_categories":[{"key":"solo","label":"Solo","order":18},{"key":"bunker","label":"Bunker","order":7}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'frWrdJZa2zY', 
  'THE TEAL: 1x1 Solo/Duo', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/frWrdJZa2zY/hqdefault.jpg', 
  'rust solo base build', 
  'solo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'solo', 'air_airlock', 'near_monument'], 
  'solo', 
  'solo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=frWrdJZa2zY","source_categories":[{"key":"solo","label":"Solo","order":19},{"key":"air_airlock","label":"Air / Airlock","order":17},{"key":"near_monument","label":"Near Monument","order":9}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'mpXulAutYOU', 
  'The ''''SOLO META'''' – Solo/Duo', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/mpXulAutYOU/hqdefault.jpg', 
  'rust solo base build', 
  'solo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'solo'], 
  'solo', 
  'solo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=mpXulAutYOU","source_categories":[{"key":"solo","label":"Solo","order":20}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'IbO2NqJorTI', 
  'THE AKIRA: Smaller is Better', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/IbO2NqJorTI/hqdefault.jpg', 
  'rust solo base build', 
  'solo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'solo'], 
  'solo', 
  'solo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=IbO2NqJorTI","source_categories":[{"key":"solo","label":"Solo","order":21}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'Jk9EQ6rg03Y', 
  '''''PERFECT TRIO'''' – Base Design', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/Jk9EQ6rg03Y/hqdefault.jpg', 
  'rust solo base build', 
  'solo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'solo', 'duo', 'trio', 'cheap', 'tips', 'tricks'], 
  'solo', 
  'solo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=Jk9EQ6rg03Y","source_categories":[{"key":"solo","label":"Solo","order":22},{"key":"duo","label":"Duo","order":22},{"key":"trio","label":"Trio","order":18},{"key":"cheap","label":"Cheap","order":20},{"key":"tips","label":"Tips","order":18},{"key":"tricks","label":"Tricks","order":17}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'gY4m-byHgnE', 
  'The BEST Solo/Duo Base In RUST', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/gY4m-byHgnE/hqdefault.jpg', 
  'rust duo base build', 
  'duo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'duo', 'cheap'], 
  'duo', 
  'duo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=gY4m-byHgnE","source_categories":[{"key":"duo","label":"Duo","order":1},{"key":"cheap","label":"Cheap","order":18}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'cPDjHvSZ92M', 
  'Perfect DUO Base / Rust Base Design', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/cPDjHvSZ92M/hqdefault.jpg', 
  'rust duo base build', 
  'duo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'duo'], 
  'duo', 
  'duo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=cPDjHvSZ92M","source_categories":[{"key":"duo","label":"Duo","order":2}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'lKeKREPJ4cY', 
  'The Jigsaw – The BEST Duo/Trio', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/lKeKREPJ4cY/hqdefault.jpg', 
  'rust duo base build', 
  'duo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'duo', 'trio'], 
  'duo', 
  'duo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=lKeKREPJ4cY","source_categories":[{"key":"duo","label":"Duo","order":3},{"key":"trio","label":"Trio","order":5}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'hSQBqjp1v5U', 
  'Perfect Bunker Base Design', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/hSQBqjp1v5U/hqdefault.jpg', 
  'rust duo base build', 
  'duo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'duo', 'bunker'], 
  'duo', 
  'duo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=hSQBqjp1v5U","source_categories":[{"key":"duo","label":"Duo","order":4},{"key":"bunker","label":"Bunker","order":14}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '_m7uNPK-ZKA', 
  'The Snare – Solo/Duo MINI TApe', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/_m7uNPK-ZKA/hqdefault.jpg', 
  'rust duo base build', 
  'duo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'duo'], 
  'duo', 
  'duo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=_m7uNPK-ZKA","source_categories":[{"key":"duo","label":"Duo","order":5}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '1DwXiCGxtO8', 
  'PERFECT Rust Duo SNOWBALL Base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/1DwXiCGxtO8/hqdefault.jpg', 
  'rust duo base build', 
  'duo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'duo'], 
  'duo', 
  'duo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=1DwXiCGxtO8","source_categories":[{"key":"duo","label":"Duo","order":7}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  's94Q2HlLSYI', 
  'The NEW META Solo/Duo Base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/s94Q2HlLSYI/hqdefault.jpg', 
  'rust duo base build', 
  'duo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'duo'], 
  'duo', 
  'duo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=s94Q2HlLSYI","source_categories":[{"key":"duo","label":"Duo","order":9}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'PD1EL52nvk0', 
  'The Frustrator (2025)', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/PD1EL52nvk0/hqdefault.jpg', 
  'rust duo base build', 
  'duo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'duo', 'trio', 'air_airlock', 'cheap'], 
  'duo', 
  'duo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=PD1EL52nvk0","source_categories":[{"key":"duo","label":"Duo","order":10},{"key":"trio","label":"Trio","order":13},{"key":"air_airlock","label":"Air / Airlock","order":16},{"key":"cheap","label":"Cheap","order":11}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'zzmH8hP3sG8', 
  'Das Duo-Versteck – Gemütlich', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/zzmH8hP3sG8/hqdefault.jpg', 
  'rust duo base build', 
  'duo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'duo'], 
  'duo', 
  'duo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=zzmH8hP3sG8","source_categories":[{"key":"duo","label":"Duo","order":11}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'pa0P0vHp2JY', 
  'Rust – Solo Duo Base Design (Cheap)', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/pa0P0vHp2JY/hqdefault.jpg', 
  'rust duo base build', 
  'duo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'duo', 'cheap'], 
  'duo', 
  'duo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=pa0P0vHp2JY","source_categories":[{"key":"duo","label":"Duo","order":13},{"key":"cheap","label":"Cheap","order":4}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '3V4x7iJ91_4', 
  '(NEW) Perfect for DUO / BUNKER', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/3V4x7iJ91_4/hqdefault.jpg', 
  'rust duo base build', 
  'duo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'duo', 'bunker'], 
  'duo', 
  'duo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=3V4x7iJ91_4","source_categories":[{"key":"duo","label":"Duo","order":14},{"key":"bunker","label":"Bunker","order":9}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '7CUxebCuOKc', 
  'The PERFECT Duo Base in Rust', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/7CUxebCuOKc/hqdefault.jpg', 
  'rust duo base build', 
  'duo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'duo'], 
  'duo', 
  'duo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=7CUxebCuOKc","source_categories":[{"key":"duo","label":"Duo","order":16}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'BpQ2vE1U-dY', 
  'THE KUBLA: Solo/Duo/Trio Affordable', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/BpQ2vE1U-dY/hqdefault.jpg', 
  'rust duo base build', 
  'duo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'duo', 'trio', 'cheap', 'beautiful'], 
  'duo', 
  'duo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=BpQ2vE1U-dY","source_categories":[{"key":"duo","label":"Duo","order":17},{"key":"trio","label":"Trio","order":16},{"key":"cheap","label":"Cheap","order":5},{"key":"beautiful","label":"Beautiful","order":15}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'mFVk6NCkpJs', 
  'Perfect DUO Base / Base Design', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/mFVk6NCkpJs/hqdefault.jpg', 
  'rust duo base build', 
  'duo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'duo'], 
  'duo', 
  'duo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=mFVk6NCkpJs","source_categories":[{"key":"duo","label":"Duo","order":18}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'NIU9bgTwOtI', 
  'RUST PvE Base Build | The Palace', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/NIU9bgTwOtI/hqdefault.jpg', 
  'rust duo base build', 
  'duo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'duo', 'trio', 'cheap', 'big_clan', 'beautiful', 'tips', 'farming'], 
  'duo', 
  'duo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=NIU9bgTwOtI","source_categories":[{"key":"duo","label":"Duo","order":20},{"key":"trio","label":"Trio","order":19},{"key":"cheap","label":"Cheap","order":14},{"key":"big_clan","label":"Big Clan","order":16},{"key":"beautiful","label":"Beautiful","order":6},{"key":"tips","label":"Tips","order":21},{"key":"farming","label":"Farming","order":20}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'uCzqtSkxChY', 
  '*NEW* PERFECT 2x2 Expansion', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/uCzqtSkxChY/hqdefault.jpg', 
  'rust duo base build', 
  'duo', 
  ARRAY['manual_seed', 'youtube', 'rust', 'duo', 'trio', 'air_airlock'], 
  'duo', 
  'duo', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=uCzqtSkxChY","source_categories":[{"key":"duo","label":"Duo","order":21},{"key":"trio","label":"Trio","order":22},{"key":"air_airlock","label":"Air / Airlock","order":9}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '_mu3iRotO8s', 
  '(NEW) ''''The PERFECT TRIO''''', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/_mu3iRotO8s/hqdefault.jpg', 
  'rust trio base build', 
  'trio', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trio'], 
  'trio', 
  'trio', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=_mu3iRotO8s","source_categories":[{"key":"trio","label":"Trio","order":1}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'U-7vIURzRf4', 
  'WARLOCK – Bestes Offline-Duo/Trio', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/U-7vIURzRf4/hqdefault.jpg', 
  'rust trio base build', 
  'trio', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trio'], 
  'trio', 
  'trio', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=U-7vIURzRf4","source_categories":[{"key":"trio","label":"Trio","order":3}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'lBrHAEJVNZY', 
  '(NEW) The ''''2026 TRIO''''', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/lBrHAEJVNZY/hqdefault.jpg', 
  'rust trio base build', 
  'trio', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trio'], 
  'trio', 
  'trio', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=lBrHAEJVNZY","source_categories":[{"key":"trio","label":"Trio","order":4}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'WLlJEqc4eao', 
  'SUNRAKU | Solo/Duo/Trio Base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/WLlJEqc4eao/hqdefault.jpg', 
  'rust trio base build', 
  'trio', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trio'], 
  'trio', 
  'trio', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=WLlJEqc4eao","source_categories":[{"key":"trio","label":"Trio","order":6}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'Fok2bW4Xe00', 
  '(NEW) META Trio Base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/Fok2bW4Xe00/hqdefault.jpg', 
  'rust trio base build', 
  'trio', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trio'], 
  'trio', 
  'trio', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=Fok2bW4Xe00","source_categories":[{"key":"trio","label":"Trio","order":7}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'r0t0bx9OBDg', 
  'Strong DUO/TRIO Base Design', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/r0t0bx9OBDg/hqdefault.jpg', 
  'rust trio base build', 
  'trio', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trio'], 
  'trio', 
  'trio', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=r0t0bx9OBDg","source_categories":[{"key":"trio","label":"Trio","order":8}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'eGIqo0U5iqA', 
  'THE EMPRESS – Best Trio', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/eGIqo0U5iqA/hqdefault.jpg', 
  'rust trio base build', 
  'trio', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trio'], 
  'trio', 
  'trio', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=eGIqo0U5iqA","source_categories":[{"key":"trio","label":"Trio","order":9}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '10_drL3cWpk', 
  'Strong DUO/TRIO Base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/10_drL3cWpk/hqdefault.jpg', 
  'rust trio base build', 
  'trio', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trio'], 
  'trio', 
  'trio', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=10_drL3cWpk","source_categories":[{"key":"trio","label":"Trio","order":10}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'xKU2HQtqgTg', 
  '*NEW* ''''The OP'''' TRIO', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/xKU2HQtqgTg/hqdefault.jpg', 
  'rust trio base build', 
  'trio', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trio'], 
  'trio', 
  'trio', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=xKU2HQtqgTg","source_categories":[{"key":"trio","label":"Trio","order":11}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'Ed-kn4cZeR4', 
  'Nemesis 2 – Das ULTIMATIVE Trio', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/Ed-kn4cZeR4/hqdefault.jpg', 
  'rust trio base build', 
  'trio', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trio'], 
  'trio', 
  'trio', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=Ed-kn4cZeR4","source_categories":[{"key":"trio","label":"Trio","order":12}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'CZW0KApXGMA', 
  '(NEW) The ''''ULTIMATE TRIO''''', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/CZW0KApXGMA/hqdefault.jpg', 
  'rust trio base build', 
  'trio', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trio'], 
  'trio', 
  'trio', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=CZW0KApXGMA","source_categories":[{"key":"trio","label":"Trio","order":14}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'sGmManycLwA', 
  '(NEW) Meta Trio Base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/sGmManycLwA/hqdefault.jpg', 
  'rust trio base build', 
  'trio', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trio'], 
  'trio', 
  'trio', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=sGmManycLwA","source_categories":[{"key":"trio","label":"Trio","order":15}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'i8aIAKsv_kE', 
  'Rust OPENCORE Base Design', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/i8aIAKsv_kE/hqdefault.jpg', 
  'rust trio base build', 
  'trio', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trio', 'beautiful'], 
  'trio', 
  'trio', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=i8aIAKsv_kE","source_categories":[{"key":"trio","label":"Trio","order":17},{"key":"beautiful","label":"Beautiful","order":3}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'KqUQQEAZAno', 
  'Perfect Base 2x2 for TRIO', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/KqUQQEAZAno/hqdefault.jpg', 
  'rust trio base build', 
  'trio', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trio', 'bunker', 'cheap', 'big_clan', 'widegap', 'crazy'], 
  'trio', 
  'trio', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=KqUQQEAZAno","source_categories":[{"key":"trio","label":"Trio","order":20},{"key":"bunker","label":"Bunker","order":22},{"key":"cheap","label":"Cheap","order":19},{"key":"big_clan","label":"Big Clan","order":12},{"key":"widegap","label":"Widegap","order":20},{"key":"crazy","label":"Crazy","order":15}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'YL7uUMOd2Sk', 
  'PILLBOX – Cheap & Cosy Solo/Duo', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/YL7uUMOd2Sk/hqdefault.jpg', 
  'rust trio base build', 
  'trio', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trio', 'cheap', 'ocean_water', 'crazy', 'tips'], 
  'trio', 
  'trio', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=YL7uUMOd2Sk","source_categories":[{"key":"trio","label":"Trio","order":21},{"key":"cheap","label":"Cheap","order":17},{"key":"ocean_water","label":"Ocean / Water","order":22},{"key":"crazy","label":"Crazy","order":22},{"key":"tips","label":"Tips","order":22}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'LK9uhISuSfg', 
  'Drei STARTER-BASEN für den Wipe', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/LK9uhISuSfg/hqdefault.jpg', 
  'rust starter base wipe day build', 
  'starter_wipe_day', 
  ARRAY['manual_seed', 'youtube', 'rust', 'starter_wipe_day'], 
  'starter_wipe_day', 
  NULL, 
  'wipe_day', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=LK9uhISuSfg","source_categories":[{"key":"starter_wipe_day","label":"Starter / Wipe Day","order":1}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'vrU7Xrpq59o', 
  'The ONLY Starter Base You Need', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/vrU7Xrpq59o/hqdefault.jpg', 
  'rust starter base wipe day build', 
  'starter_wipe_day', 
  ARRAY['manual_seed', 'youtube', 'rust', 'starter_wipe_day'], 
  'starter_wipe_day', 
  NULL, 
  'wipe_day', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=vrU7Xrpq59o","source_categories":[{"key":"starter_wipe_day","label":"Starter / Wipe Day","order":2}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'yH5uS-3aiMg', 
  'Meistere den Rust Wipe Day', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/yH5uS-3aiMg/hqdefault.jpg', 
  'rust starter base wipe day build', 
  'starter_wipe_day', 
  ARRAY['manual_seed', 'youtube', 'rust', 'starter_wipe_day', 'journey_wipe'], 
  'starter_wipe_day', 
  NULL, 
  'wipe_day', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=yH5uS-3aiMg","source_categories":[{"key":"starter_wipe_day","label":"Starter / Wipe Day","order":3},{"key":"journey_wipe","label":"Allgemein (Journey / Movie / Wipe)","order":5}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'A4ma1GZMx5I', 
  'Die besten STARTER BASES des Jahres', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/A4ma1GZMx5I/hqdefault.jpg', 
  'rust starter base wipe day build', 
  'starter_wipe_day', 
  ARRAY['manual_seed', 'youtube', 'rust', 'starter_wipe_day'], 
  'starter_wipe_day', 
  NULL, 
  'wipe_day', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=A4ma1GZMx5I","source_categories":[{"key":"starter_wipe_day","label":"Starter / Wipe Day","order":4}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'XofIBwLGjlY', 
  'The PERFECT Solo Fort Base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/XofIBwLGjlY/hqdefault.jpg', 
  'rust starter base wipe day build', 
  'starter_wipe_day', 
  ARRAY['manual_seed', 'youtube', 'rust', 'starter_wipe_day'], 
  'starter_wipe_day', 
  NULL, 
  'wipe_day', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=XofIBwLGjlY","source_categories":[{"key":"starter_wipe_day","label":"Starter / Wipe Day","order":5}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'Y3tZm0_AfJM', 
  'The NEW Rust SOLO Wipe Day Meta', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/Y3tZm0_AfJM/hqdefault.jpg', 
  'rust starter base wipe day build', 
  'starter_wipe_day', 
  ARRAY['manual_seed', 'youtube', 'rust', 'starter_wipe_day'], 
  'starter_wipe_day', 
  NULL, 
  'wipe_day', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=Y3tZm0_AfJM","source_categories":[{"key":"starter_wipe_day","label":"Starter / Wipe Day","order":6}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'f5aIja1kYnI', 
  'i lived in a tiny rock for a wipe', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/f5aIja1kYnI/hqdefault.jpg', 
  'rust starter base wipe day build', 
  'starter_wipe_day', 
  ARRAY['manual_seed', 'youtube', 'rust', 'starter_wipe_day'], 
  'starter_wipe_day', 
  NULL, 
  'wipe_day', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=f5aIja1kYnI","source_categories":[{"key":"starter_wipe_day","label":"Starter / Wipe Day","order":8}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'ieZUOlAL4AI', 
  'I Played 100% of a Solo Wipe', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/ieZUOlAL4AI/hqdefault.jpg', 
  'rust starter base wipe day build', 
  'starter_wipe_day', 
  ARRAY['manual_seed', 'youtube', 'rust', 'starter_wipe_day'], 
  'starter_wipe_day', 
  NULL, 
  'wipe_day', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=ieZUOlAL4AI","source_categories":[{"key":"starter_wipe_day","label":"Starter / Wipe Day","order":9}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'SXAvSlo7h70', 
  'The EASIEST Bunker Base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/SXAvSlo7h70/hqdefault.jpg', 
  'rust starter base wipe day build', 
  'starter_wipe_day', 
  ARRAY['manual_seed', 'youtube', 'rust', 'starter_wipe_day', 'bunker', 'cheap'], 
  'starter_wipe_day', 
  NULL, 
  'wipe_day', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=SXAvSlo7h70","source_categories":[{"key":"starter_wipe_day","label":"Starter / Wipe Day","order":10},{"key":"bunker","label":"Bunker","order":20},{"key":"cheap","label":"Cheap","order":15}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'toNl-INZdkc', 
  'How I Solo Wipeday in 2026', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/toNl-INZdkc/hqdefault.jpg', 
  'rust starter base wipe day build', 
  'starter_wipe_day', 
  ARRAY['manual_seed', 'youtube', 'rust', 'starter_wipe_day', 'journey_wipe'], 
  'starter_wipe_day', 
  NULL, 
  'wipe_day', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=toNl-INZdkc","source_categories":[{"key":"starter_wipe_day","label":"Starter / Wipe Day","order":11},{"key":"journey_wipe","label":"Allgemein (Journey / Movie / Wipe)","order":11}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'NqaO-wMEwSk', 
  'How to Have a Perfect Start', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/NqaO-wMEwSk/hqdefault.jpg', 
  'rust starter base wipe day build', 
  'starter_wipe_day', 
  ARRAY['manual_seed', 'youtube', 'rust', 'starter_wipe_day'], 
  'starter_wipe_day', 
  NULL, 
  'wipe_day', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=NqaO-wMEwSk","source_categories":[{"key":"starter_wipe_day","label":"Starter / Wipe Day","order":12}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'd3-8Mvhuykg', 
  'I Built the ONLY Starter Base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/d3-8Mvhuykg/hqdefault.jpg', 
  'rust starter base wipe day build', 
  'starter_wipe_day', 
  ARRAY['manual_seed', 'youtube', 'rust', 'starter_wipe_day'], 
  'starter_wipe_day', 
  NULL, 
  'wipe_day', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=d3-8Mvhuykg","source_categories":[{"key":"starter_wipe_day","label":"Starter / Wipe Day","order":13}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '11UwsgWHLvo', 
  'The Fastest Wipe day Progression', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/11UwsgWHLvo/hqdefault.jpg', 
  'rust starter base wipe day build', 
  'starter_wipe_day', 
  ARRAY['manual_seed', 'youtube', 'rust', 'starter_wipe_day'], 
  'starter_wipe_day', 
  NULL, 
  'wipe_day', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=11UwsgWHLvo","source_categories":[{"key":"starter_wipe_day","label":"Starter / Wipe Day","order":14}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'wrbYY6TrEP4', 
  'Most Simple 4x4 Base Design', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/wrbYY6TrEP4/hqdefault.jpg', 
  'rust starter base wipe day build', 
  'starter_wipe_day', 
  ARRAY['manual_seed', 'youtube', 'rust', 'starter_wipe_day'], 
  'starter_wipe_day', 
  NULL, 
  'wipe_day', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=wrbYY6TrEP4","source_categories":[{"key":"starter_wipe_day","label":"Starter / Wipe Day","order":15}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'tBv5SHmbX8I', 
  '*NEW* BUNKER META 2025', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/tBv5SHmbX8I/hqdefault.jpg', 
  'rust starter base wipe day build', 
  'starter_wipe_day', 
  ARRAY['manual_seed', 'youtube', 'rust', 'starter_wipe_day', 'bunker', 'tricks', 'farming', 'rust2_news'], 
  'starter_wipe_day', 
  NULL, 
  'wipe_day', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=tBv5SHmbX8I","source_categories":[{"key":"starter_wipe_day","label":"Starter / Wipe Day","order":16},{"key":"bunker","label":"Bunker","order":3},{"key":"tricks","label":"Tricks","order":11},{"key":"farming","label":"Farming","order":22},{"key":"rust2_news","label":"Rust 2 – Release Date / News","order":9}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'K_1JsdUvmtw', 
  'CHEAP SOLO STARTER BASE', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/K_1JsdUvmtw/hqdefault.jpg', 
  'rust starter base wipe day build', 
  'starter_wipe_day', 
  ARRAY['manual_seed', 'youtube', 'rust', 'starter_wipe_day'], 
  'starter_wipe_day', 
  NULL, 
  'wipe_day', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=K_1JsdUvmtw","source_categories":[{"key":"starter_wipe_day","label":"Starter / Wipe Day","order":17}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'zXl4ZrM8Yq4', 
  'How a solo builder with 12,487h', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/zXl4ZrM8Yq4/hqdefault.jpg', 
  'rust starter base wipe day build', 
  'starter_wipe_day', 
  ARRAY['manual_seed', 'youtube', 'rust', 'starter_wipe_day', 'journey_wipe'], 
  'starter_wipe_day', 
  NULL, 
  'wipe_day', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=zXl4ZrM8Yq4","source_categories":[{"key":"starter_wipe_day","label":"Starter / Wipe Day","order":19},{"key":"journey_wipe","label":"Allgemein (Journey / Movie / Wipe)","order":22}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'z5SKkOXL_ms', 
  'Der Arbeiter – Basis für den Start', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/z5SKkOXL_ms/hqdefault.jpg', 
  'rust starter base wipe day build', 
  'starter_wipe_day', 
  ARRAY['manual_seed', 'youtube', 'rust', 'starter_wipe_day', 'near_monument'], 
  'starter_wipe_day', 
  NULL, 
  'wipe_day', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=z5SKkOXL_ms","source_categories":[{"key":"starter_wipe_day","label":"Starter / Wipe Day","order":20},{"key":"near_monument","label":"Near Monument","order":8}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'CFKo6ZW2Y98', 
  'When a Clan Tries to Raid a Solo', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/CFKo6ZW2Y98/hqdefault.jpg', 
  'rust starter base wipe day build', 
  'starter_wipe_day', 
  ARRAY['manual_seed', 'youtube', 'rust', 'starter_wipe_day', 'funny_troll', 'crazy'], 
  'starter_wipe_day', 
  NULL, 
  'wipe_day', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=CFKo6ZW2Y98","source_categories":[{"key":"starter_wipe_day","label":"Starter / Wipe Day","order":21},{"key":"funny_troll","label":"Funny / Troll","order":15},{"key":"crazy","label":"Crazy","order":5}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'vzPkNywQ-AQ', 
  'FEROS – New Meta Solo-Duo', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/vzPkNywQ-AQ/hqdefault.jpg', 
  'rust starter base wipe day build', 
  'starter_wipe_day', 
  ARRAY['manual_seed', 'youtube', 'rust', 'starter_wipe_day', 'bunker', 'widegap'], 
  'starter_wipe_day', 
  NULL, 
  'wipe_day', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=vzPkNywQ-AQ","source_categories":[{"key":"starter_wipe_day","label":"Starter / Wipe Day","order":22},{"key":"bunker","label":"Bunker","order":21},{"key":"widegap","label":"Widegap","order":15}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'MzFxlaSN24s', 
  'THE PERFECT 2025 BUNKER BASE', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/MzFxlaSN24s/hqdefault.jpg', 
  'rust bunker base build', 
  'bunker', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bunker'], 
  'bunker', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=MzFxlaSN24s","source_categories":[{"key":"bunker","label":"Bunker","order":1}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'iMaVMdbnFSo', 
  'The BEST Solo/Duo Bunker Base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/iMaVMdbnFSo/hqdefault.jpg', 
  'rust bunker base build', 
  'bunker', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bunker'], 
  'bunker', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=iMaVMdbnFSo","source_categories":[{"key":"bunker","label":"Bunker","order":2}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'CSF2zd9-4zg', 
  'Perfect DUO Bunker', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/CSF2zd9-4zg/hqdefault.jpg', 
  'rust bunker base build', 
  'bunker', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bunker'], 
  'bunker', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=CSF2zd9-4zg","source_categories":[{"key":"bunker","label":"Bunker","order":4}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'O8ucH2EjG34', 
  'Mein PERFEKTES Solo/Duo-Bunker', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/O8ucH2EjG34/hqdefault.jpg', 
  'rust bunker base build', 
  'bunker', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bunker'], 
  'bunker', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=O8ucH2EjG34","source_categories":[{"key":"bunker","label":"Bunker","order":5}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'uYwWslfHiLo', 
  'Rust 2x1 Bunker Base Design', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/uYwWslfHiLo/hqdefault.jpg', 
  'rust bunker base build', 
  'bunker', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bunker'], 
  'bunker', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=uYwWslfHiLo","source_categories":[{"key":"bunker","label":"Bunker","order":6}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '4FoiWxPZecg', 
  'AETHER – Neue Meta-Basis', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/4FoiWxPZecg/hqdefault.jpg', 
  'rust bunker base build', 
  'bunker', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bunker', 'beautiful', 'crazy'], 
  'bunker', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=4FoiWxPZecg","source_categories":[{"key":"bunker","label":"Bunker","order":8},{"key":"beautiful","label":"Beautiful","order":13},{"key":"crazy","label":"Crazy","order":16}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'D8DxYWiOInY', 
  'Rust SOLO BUNKER Base Design', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/D8DxYWiOInY/hqdefault.jpg', 
  'rust bunker base build', 
  'bunker', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bunker'], 
  'bunker', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=D8DxYWiOInY","source_categories":[{"key":"bunker","label":"Bunker","order":10}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'oL-zn3tA4UQ', 
  'Die EINFACHSTE Solo/Duo-Bunkerbasis', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/oL-zn3tA4UQ/hqdefault.jpg', 
  'rust bunker base build', 
  'bunker', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bunker'], 
  'bunker', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=oL-zn3tA4UQ","source_categories":[{"key":"bunker","label":"Bunker","order":12}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'ylKOw0gdc2Q', 
  '(NEW) My Perfect Solo BUNKER', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/ylKOw0gdc2Q/hqdefault.jpg', 
  'rust bunker base build', 
  'bunker', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bunker'], 
  'bunker', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=ylKOw0gdc2Q","source_categories":[{"key":"bunker","label":"Bunker","order":13}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'dbCQXJGxGGA', 
  'Perfect Solo BUNKER', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/dbCQXJGxGGA/hqdefault.jpg', 
  'rust bunker base build', 
  'bunker', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bunker'], 
  'bunker', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=dbCQXJGxGGA","source_categories":[{"key":"bunker","label":"Bunker","order":16}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'evmskKgVgCc', 
  'Der Diamond V2 – Perfekte Solo', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/evmskKgVgCc/hqdefault.jpg', 
  'rust bunker base build', 
  'bunker', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bunker'], 
  'bunker', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=evmskKgVgCc","source_categories":[{"key":"bunker","label":"Bunker","order":17}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'ZvOg3ElaCRE', 
  'Einfaches, verstecktes Bunker', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/ZvOg3ElaCRE/hqdefault.jpg', 
  'rust bunker base build', 
  'bunker', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bunker'], 
  'bunker', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=ZvOg3ElaCRE","source_categories":[{"key":"bunker","label":"Bunker","order":18}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'yYidfrakPcA', 
  'CROWN – Die perfekte Bunkerbasis', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/yYidfrakPcA/hqdefault.jpg', 
  'rust bunker base build', 
  'bunker', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bunker'], 
  'bunker', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=yYidfrakPcA","source_categories":[{"key":"bunker","label":"Bunker","order":19}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '6R3EZ3aEzFs', 
  'This 200 IQ Trap Base was Forgotten', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/6R3EZ3aEzFs/hqdefault.jpg', 
  'rust trap base build', 
  'trap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trap'], 
  'trap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=6R3EZ3aEzFs","source_categories":[{"key":"trap","label":"Trap","order":1}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'x_mRA24YpNQ', 
  'Ich habe eine 100% automatische Falle', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/x_mRA24YpNQ/hqdefault.jpg', 
  'rust trap base build', 
  'trap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trap'], 
  'trap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=x_mRA24YpNQ","source_categories":[{"key":"trap","label":"Trap","order":2}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'iNgbz38-zjM', 
  'I Built the Smartest Trap', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/iNgbz38-zjM/hqdefault.jpg', 
  'rust trap base build', 
  'trap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trap'], 
  'trap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=iNgbz38-zjM","source_categories":[{"key":"trap","label":"Trap","order":3}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'oep6Mw8lakA', 
  'Ich habe die Stolperdraht-Falle', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/oep6Mw8lakA/hqdefault.jpg', 
  'rust trap base build', 
  'trap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trap'], 
  'trap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=oep6Mw8lakA","source_categories":[{"key":"trap","label":"Trap","order":4}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'tWY4QzJ_wn0', 
  'Kann diese Fallenbasis überleben', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/tWY4QzJ_wn0/hqdefault.jpg', 
  'rust trap base build', 
  'trap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trap', 'funny_troll'], 
  'trap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=tWY4QzJ_wn0","source_categories":[{"key":"trap","label":"Trap","order":5},{"key":"funny_troll","label":"Funny / Troll","order":13}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '87JewNRuKMs', 
  'Die böseste Basis, die ich baute', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/87JewNRuKMs/hqdefault.jpg', 
  'rust trap base build', 
  'trap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trap'], 
  'trap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=87JewNRuKMs","source_categories":[{"key":"trap","label":"Trap","order":6}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'SzL6YhcdPyk', 
  'Ich habe jede Fallen-Basis getestet', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/SzL6YhcdPyk/hqdefault.jpg', 
  'rust trap base build', 
  'trap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trap'], 
  'trap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=SzL6YhcdPyk","source_categories":[{"key":"trap","label":"Trap","order":7}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'forz0Er3BY4', 
  'Rust Trap Base 2026! Fast Build', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/forz0Er3BY4/hqdefault.jpg', 
  'rust trap base build', 
  'trap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trap'], 
  'trap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=forz0Er3BY4","source_categories":[{"key":"trap","label":"Trap","order":8}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'XE-fSGo4SCk', 
  'I Built the HOTTEST Trap Base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/XE-fSGo4SCk/hqdefault.jpg', 
  'rust trap base build', 
  'trap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trap'], 
  'trap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=XE-fSGo4SCk","source_categories":[{"key":"trap","label":"Trap","order":9}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'FFyqbw0ORS8', 
  'Ich lebte unter einer Falle', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/FFyqbw0ORS8/hqdefault.jpg', 
  'rust trap base build', 
  'trap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trap'], 
  'trap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=FFyqbw0ORS8","source_categories":[{"key":"trap","label":"Trap","order":10}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'yeOfpXobTT0', 
  'Diese Fallenbasis frisst Spieler', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/yeOfpXobTT0/hqdefault.jpg', 
  'rust trap base build', 
  'trap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trap'], 
  'trap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=yeOfpXobTT0","source_categories":[{"key":"trap","label":"Trap","order":11}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'KNxTE5EST6k', 
  'I Built a Fake Casino Trap Base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/KNxTE5EST6k/hqdefault.jpg', 
  'rust trap base build', 
  'trap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trap'], 
  'trap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=KNxTE5EST6k","source_categories":[{"key":"trap","label":"Trap","order":12}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'UiBGlkbP3v0', 
  'NEU* Günstigste Fallenbasis', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/UiBGlkbP3v0/hqdefault.jpg', 
  'rust trap base build', 
  'trap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trap'], 
  'trap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=UiBGlkbP3v0","source_categories":[{"key":"trap","label":"Trap","order":13}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'zqZ-j0Ml6ng', 
  'Ich habe eine Fallenbasis mit ...', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/zqZ-j0Ml6ng/hqdefault.jpg', 
  'rust trap base build', 
  'trap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trap'], 
  'trap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=zqZ-j0Ml6ng","source_categories":[{"key":"trap","label":"Trap","order":14}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'hxfczSNvnuw', 
  'Living in a Trap Base for an Ep.', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/hxfczSNvnuw/hqdefault.jpg', 
  'rust trap base build', 
  'trap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trap'], 
  'trap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=hxfczSNvnuw","source_categories":[{"key":"trap","label":"Trap","order":15}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'eFPq0XyT1y8', 
  'Ich habe eine Fallen-Basis gebaut', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/eFPq0XyT1y8/hqdefault.jpg', 
  'rust trap base build', 
  'trap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trap'], 
  'trap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=eFPq0XyT1y8","source_categories":[{"key":"trap","label":"Trap","order":16}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'U1o7iG7GoHU', 
  'Ich habe ihn tagelang gefangen', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/U1o7iG7GoHU/hqdefault.jpg', 
  'rust trap base build', 
  'trap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trap'], 
  'trap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=U1o7iG7GoHU","source_categories":[{"key":"trap","label":"Trap","order":17}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'YMg8RQEq32Q', 
  'Meine beste Fallenbasis', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/YMg8RQEq32Q/hqdefault.jpg', 
  'rust trap base build', 
  'trap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trap'], 
  'trap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=YMg8RQEq32Q","source_categories":[{"key":"trap","label":"Trap","order":18}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '-YxVpEinbnw', 
  'Ich habe die giftigste Strahlungsfalle', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/-YxVpEinbnw/hqdefault.jpg', 
  'rust trap base build', 
  'trap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trap'], 
  'trap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=-YxVpEinbnw","source_categories":[{"key":"trap","label":"Trap","order":19}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'nOE-gIjsOew', 
  'Ich habe eine Dschungelfallenbasis', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/nOE-gIjsOew/hqdefault.jpg', 
  'rust trap base build', 
  'trap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trap'], 
  'trap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=nOE-gIjsOew","source_categories":[{"key":"trap","label":"Trap","order":20}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'XCWWbEKEn9g', 
  'Ich habe Spieler gefangen', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/XCWWbEKEn9g/hqdefault.jpg', 
  'rust trap base build', 
  'trap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trap', 'funny_troll'], 
  'trap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=XCWWbEKEn9g","source_categories":[{"key":"trap","label":"Trap","order":21},{"key":"funny_troll","label":"Funny / Troll","order":16}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'dtyhnka692k', 
  'Ich habe so getan als wäre meine', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/dtyhnka692k/hqdefault.jpg', 
  'rust trap base build', 
  'trap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'trap'], 
  'trap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=dtyhnka692k","source_categories":[{"key":"trap","label":"Trap","order":22}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'RzIqhFGkg-E', 
  'How To Make An Airlock In Rust', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/RzIqhFGkg-E/hqdefault.jpg', 
  'rust air base build', 
  'air_airlock', 
  ARRAY['manual_seed', 'youtube', 'rust', 'air_airlock'], 
  'air_airlock', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=RzIqhFGkg-E","source_categories":[{"key":"air_airlock","label":"Air / Airlock","order":1}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'dnLtIk53XcQ', 
  'Rust Beginner Tips #1 | Airlock', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/dnLtIk53XcQ/hqdefault.jpg', 
  'rust air base build', 
  'air_airlock', 
  ARRAY['manual_seed', 'youtube', 'rust', 'air_airlock'], 
  'air_airlock', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=dnLtIk53XcQ","source_categories":[{"key":"air_airlock","label":"Air / Airlock","order":2}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'eTFNo52vo5k', 
  'Blooprint''s GREATEST 2x2 Expansion', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/eTFNo52vo5k/hqdefault.jpg', 
  'rust air base build', 
  'air_airlock', 
  ARRAY['manual_seed', 'youtube', 'rust', 'air_airlock'], 
  'air_airlock', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=eTFNo52vo5k","source_categories":[{"key":"air_airlock","label":"Air / Airlock","order":3}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'gQNMWlbNZxE', 
  'How to Add 7 Airlocks', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/gQNMWlbNZxE/hqdefault.jpg', 
  'rust air base build', 
  'air_airlock', 
  ARRAY['manual_seed', 'youtube', 'rust', 'air_airlock'], 
  'air_airlock', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=gQNMWlbNZxE","source_categories":[{"key":"air_airlock","label":"Air / Airlock","order":4}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '2G8cxtiTBHY', 
  'So erstellen Sie die PERFEKTE Basis', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/2G8cxtiTBHY/hqdefault.jpg', 
  'rust air base build', 
  'air_airlock', 
  ARRAY['manual_seed', 'youtube', 'rust', 'air_airlock', 'cheap', 'beautiful', 'tricks'], 
  'air_airlock', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=2G8cxtiTBHY","source_categories":[{"key":"air_airlock","label":"Air / Airlock","order":5},{"key":"cheap","label":"Cheap","order":9},{"key":"beautiful","label":"Beautiful","order":4},{"key":"tricks","label":"Tricks","order":8}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'qyjYQu6CR-w', 
  'Rust airlock garage base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/qyjYQu6CR-w/hqdefault.jpg', 
  'rust air base build', 
  'air_airlock', 
  ARRAY['manual_seed', 'youtube', 'rust', 'air_airlock'], 
  'air_airlock', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=qyjYQu6CR-w","source_categories":[{"key":"air_airlock","label":"Air / Airlock","order":6}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'I295pX94sas', 
  '''The Perfect 2x2 Expansion''', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/I295pX94sas/hqdefault.jpg', 
  'rust air base build', 
  'air_airlock', 
  ARRAY['manual_seed', 'youtube', 'rust', 'air_airlock'], 
  'air_airlock', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=I295pX94sas","source_categories":[{"key":"air_airlock","label":"Air / Airlock","order":7}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'g2jH425aMGA', 
  'Quick Tips #2: Strongest Airlock', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/g2jH425aMGA/hqdefault.jpg', 
  'rust air base build', 
  'air_airlock', 
  ARRAY['manual_seed', 'youtube', 'rust', 'air_airlock'], 
  'air_airlock', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=g2jH425aMGA","source_categories":[{"key":"air_airlock","label":"Air / Airlock","order":8}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '0eJPdTzcRIM', 
  '*NEW* POSTY 2x2 OP Base Design', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/0eJPdTzcRIM/hqdefault.jpg', 
  'rust air base build', 
  'air_airlock', 
  ARRAY['manual_seed', 'youtube', 'rust', 'air_airlock'], 
  'air_airlock', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=0eJPdTzcRIM","source_categories":[{"key":"air_airlock","label":"Air / Airlock","order":10}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'ctifzgyAxnU', 
  'The Icer – New Meta 2x2 Snowball', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/ctifzgyAxnU/hqdefault.jpg', 
  'rust air base build', 
  'air_airlock', 
  ARRAY['manual_seed', 'youtube', 'rust', 'air_airlock'], 
  'air_airlock', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=ctifzgyAxnU","source_categories":[{"key":"air_airlock","label":"Air / Airlock","order":11}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'eB2NxFOBH6A', 
  'PERFECT 2x2 Expansion (Solo/Duo)', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/eB2NxFOBH6A/hqdefault.jpg', 
  'rust air base build', 
  'air_airlock', 
  ARRAY['manual_seed', 'youtube', 'rust', 'air_airlock'], 
  'air_airlock', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=eB2NxFOBH6A","source_categories":[{"key":"air_airlock","label":"Air / Airlock","order":12}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'yHfqT92YDJk', 
  'Rust – Perfect Circle Base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/yHfqT92YDJk/hqdefault.jpg', 
  'rust air base build', 
  'air_airlock', 
  ARRAY['manual_seed', 'youtube', 'rust', 'air_airlock', 'widegap'], 
  'air_airlock', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=yHfqT92YDJk","source_categories":[{"key":"air_airlock","label":"Air / Airlock","order":13},{"key":"widegap","label":"Widegap","order":19}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'eSVqOSHszxI', 
  'RUST Base Design – solo/duo', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/eSVqOSHszxI/hqdefault.jpg', 
  'rust air base build', 
  'air_airlock', 
  ARRAY['manual_seed', 'youtube', 'rust', 'air_airlock'], 
  'air_airlock', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=eSVqOSHszxI","source_categories":[{"key":"air_airlock","label":"Air / Airlock","order":15}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'uNiUKGsOysA', 
  'i found new way to make boats', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/uNiUKGsOysA/hqdefault.jpg', 
  'rust air base build', 
  'air_airlock', 
  ARRAY['manual_seed', 'youtube', 'rust', 'air_airlock'], 
  'air_airlock', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=uNiUKGsOysA","source_categories":[{"key":"air_airlock","label":"Air / Airlock","order":18}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'LxTcfHjrzTc', 
  'The Dugout – New Meta 2x1', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/LxTcfHjrzTc/hqdefault.jpg', 
  'rust air base build', 
  'air_airlock', 
  ARRAY['manual_seed', 'youtube', 'rust', 'air_airlock'], 
  'air_airlock', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=LxTcfHjrzTc","source_categories":[{"key":"air_airlock","label":"Air / Airlock","order":19}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'EXtWi3Es62Y', 
  'RUST: Base inside Airlock', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/EXtWi3Es62Y/hqdefault.jpg', 
  'rust air base build', 
  'air_airlock', 
  ARRAY['manual_seed', 'youtube', 'rust', 'air_airlock'], 
  'air_airlock', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=EXtWi3Es62Y","source_categories":[{"key":"air_airlock","label":"Air / Airlock","order":20}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'AkZ3c9N24nQ', 
  'Blooprint''s PERFECT 2x2 Expansion', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/AkZ3c9N24nQ/hqdefault.jpg', 
  'rust air base build', 
  'air_airlock', 
  ARRAY['manual_seed', 'youtube', 'rust', 'air_airlock'], 
  'air_airlock', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=AkZ3c9N24nQ","source_categories":[{"key":"air_airlock","label":"Air / Airlock","order":21}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'i9V7Y-m1fRI', 
  'So erstellen Sie eine Airlock', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/i9V7Y-m1fRI/hqdefault.jpg', 
  'rust air base build', 
  'air_airlock', 
  ARRAY['manual_seed', 'youtube', 'rust', 'air_airlock'], 
  'air_airlock', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=i9V7Y-m1fRI","source_categories":[{"key":"air_airlock","label":"Air / Airlock","order":22}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'ZqK2gTdJL9Q', 
  'What Are The Best Monuments', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/ZqK2gTdJL9Q/hqdefault.jpg', 
  'rust monument base build near monument', 
  'near_monument', 
  ARRAY['manual_seed', 'youtube', 'rust', 'near_monument'], 
  'near_monument', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=ZqK2gTdJL9Q","source_categories":[{"key":"near_monument","label":"Near Monument","order":1}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'tSxJaTeTXnc', 
  'How to Pick the Best Spot to Base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/tSxJaTeTXnc/hqdefault.jpg', 
  'rust monument base build near monument', 
  'near_monument', 
  ARRAY['manual_seed', 'youtube', 'rust', 'near_monument'], 
  'near_monument', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=tSxJaTeTXnc","source_categories":[{"key":"near_monument","label":"Near Monument","order":2}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'aI3uceNGhyo', 
  'The Solo Strategy Explained', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/aI3uceNGhyo/hqdefault.jpg', 
  'rust monument base build near monument', 
  'near_monument', 
  ARRAY['manual_seed', 'youtube', 'rust', 'near_monument'], 
  'near_monument', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=aI3uceNGhyo","source_categories":[{"key":"near_monument","label":"Near Monument","order":3}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'fV4al79unUg', 
  'Vermeide Überfälle! – Die besten Spots', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/fV4al79unUg/hqdefault.jpg', 
  'rust monument base build near monument', 
  'near_monument', 
  ARRAY['manual_seed', 'youtube', 'rust', 'near_monument'], 
  'near_monument', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=fV4al79unUg","source_categories":[{"key":"near_monument","label":"Near Monument","order":4}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'BW08byqUZaE', 
  'Das Leben im Himmel ist kaputt', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/BW08byqUZaE/hqdefault.jpg', 
  'rust monument base build near monument', 
  'near_monument', 
  ARRAY['manual_seed', 'youtube', 'rust', 'near_monument'], 
  'near_monument', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=BW08byqUZaE","source_categories":[{"key":"near_monument","label":"Near Monument","order":5}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'aO1Br2ysi5U', 
  'Ultimate Loot Guide – How & Where', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/aO1Br2ysi5U/hqdefault.jpg', 
  'rust monument base build near monument', 
  'near_monument', 
  ARRAY['manual_seed', 'youtube', 'rust', 'near_monument'], 
  'near_monument', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=aO1Br2ysi5U","source_categories":[{"key":"near_monument","label":"Near Monument","order":6}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'AGtTjNOAE0s', 
  'Leitfaden zur Startsite', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/AGtTjNOAE0s/hqdefault.jpg', 
  'rust monument base build near monument', 
  'near_monument', 
  ARRAY['manual_seed', 'youtube', 'rust', 'near_monument'], 
  'near_monument', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=AGtTjNOAE0s","source_categories":[{"key":"near_monument","label":"Near Monument","order":7}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'JeZNxXn6KQg', 
  'Arctic Base Monument & Schneemobil', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/JeZNxXn6KQg/hqdefault.jpg', 
  'rust monument base build near monument', 
  'near_monument', 
  ARRAY['manual_seed', 'youtube', 'rust', 'near_monument'], 
  'near_monument', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=JeZNxXn6KQg","source_categories":[{"key":"near_monument","label":"Near Monument","order":10}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'fnFglcHjaTo', 
  'Die 10 BESTEN Bauplätze', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/fnFglcHjaTo/hqdefault.jpg', 
  'rust monument base build near monument', 
  'near_monument', 
  ARRAY['manual_seed', 'youtube', 'rust', 'near_monument'], 
  'near_monument', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=fnFglcHjaTo","source_categories":[{"key":"near_monument","label":"Near Monument","order":11}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'CBZ16qttIO4', 
  'Verlassene Militärbasis', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/CBZ16qttIO4/hqdefault.jpg', 
  'rust monument base build near monument', 
  'near_monument', 
  ARRAY['manual_seed', 'youtube', 'rust', 'near_monument'], 
  'near_monument', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=CBZ16qttIO4","source_categories":[{"key":"near_monument","label":"Near Monument","order":12}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'geW88NvTzPI', 
  'Leitfaden zu allen Fundorten', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/geW88NvTzPI/hqdefault.jpg', 
  'rust monument base build near monument', 
  'near_monument', 
  ARRAY['manual_seed', 'youtube', 'rust', 'near_monument', 'green_card', 'blue_card'], 
  'near_monument', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=geW88NvTzPI","source_categories":[{"key":"near_monument","label":"Near Monument","order":14},{"key":"green_card","label":"Green Card","order":4},{"key":"blue_card","label":"Blue Card","order":2}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'crT8P_Lqnsk', 
  'I Turned a Monument into My Base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/crT8P_Lqnsk/hqdefault.jpg', 
  'rust monument base build near monument', 
  'near_monument', 
  ARRAY['manual_seed', 'youtube', 'rust', 'near_monument'], 
  'near_monument', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=crT8P_Lqnsk","source_categories":[{"key":"near_monument","label":"Near Monument","order":15}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'f_KpVp6yJ_0', 
  'Top 5 Monuments to NOT Base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/f_KpVp6yJ_0/hqdefault.jpg', 
  'rust monument base build near monument', 
  'near_monument', 
  ARRAY['manual_seed', 'youtube', 'rust', 'near_monument'], 
  'near_monument', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=f_KpVp6yJ_0","source_categories":[{"key":"near_monument","label":"Near Monument","order":16}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'hRhsUvmWIhE', 
  'Top 5 Monuments to Base Near', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/hRhsUvmWIhE/hqdefault.jpg', 
  'rust monument base build near monument', 
  'near_monument', 
  ARRAY['manual_seed', 'youtube', 'rust', 'near_monument'], 
  'near_monument', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=hRhsUvmWIhE","source_categories":[{"key":"near_monument","label":"Near Monument","order":17}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'TgstcUVcS3o', 
  'I Lived in the Most OP Monument', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/TgstcUVcS3o/hqdefault.jpg', 
  'rust monument base build near monument', 
  'near_monument', 
  ARRAY['manual_seed', 'youtube', 'rust', 'near_monument'], 
  'near_monument', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=TgstcUVcS3o","source_categories":[{"key":"near_monument","label":"Near Monument","order":18}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '9JB-eJ1rds8', 
  'The Unraidable Base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/9JB-eJ1rds8/hqdefault.jpg', 
  'rust unraidable base build high defense', 
  'unraidable', 
  ARRAY['manual_seed', 'youtube', 'rust', 'unraidable', 'beautiful'], 
  'unraidable', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=9JB-eJ1rds8","source_categories":[{"key":"unraidable","label":"Unraidable","order":1},{"key":"beautiful","label":"Beautiful","order":22}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'Z2lmQsP8GGI', 
  'Leben in einer uneinnehmbaren Basis', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/Z2lmQsP8GGI/hqdefault.jpg', 
  'rust unraidable base build high defense', 
  'unraidable', 
  ARRAY['manual_seed', 'youtube', 'rust', 'unraidable', 'crazy'], 
  'unraidable', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=Z2lmQsP8GGI","source_categories":[{"key":"unraidable","label":"Unraidable","order":2},{"key":"crazy","label":"Crazy","order":2}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'MqhR7qFbQHw', 
  'I Survived an ENTIRE MONTH', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/MqhR7qFbQHw/hqdefault.jpg', 
  'rust unraidable base build high defense', 
  'unraidable', 
  ARRAY['manual_seed', 'youtube', 'rust', 'unraidable'], 
  'unraidable', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=MqhR7qFbQHw","source_categories":[{"key":"unraidable","label":"Unraidable","order":3}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'rdd3V7-HIzQ', 
  'Statistically Unraidable Base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/rdd3V7-HIzQ/hqdefault.jpg', 
  'rust unraidable base build high defense', 
  'unraidable', 
  ARRAY['manual_seed', 'youtube', 'rust', 'unraidable'], 
  'unraidable', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=rdd3V7-HIzQ","source_categories":[{"key":"unraidable","label":"Unraidable","order":4}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'V4q6Ka2tGb0', 
  'Ich lebte in einer uneinnehmbaren', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/V4q6Ka2tGb0/hqdefault.jpg', 
  'rust unraidable base build high defense', 
  'unraidable', 
  ARRAY['manual_seed', 'youtube', 'rust', 'unraidable'], 
  'unraidable', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=V4q6Ka2tGb0","source_categories":[{"key":"unraidable","label":"Unraidable","order":5}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'bIBsyy-sIHw', 
  'I Found the FATAL FLAW', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/bIBsyy-sIHw/hqdefault.jpg', 
  'rust unraidable base build high defense', 
  'unraidable', 
  ARRAY['manual_seed', 'youtube', 'rust', 'unraidable'], 
  'unraidable', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=bIBsyy-sIHw","source_categories":[{"key":"unraidable","label":"Unraidable","order":6}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'YzIZIfVd85k', 
  '100 Stunden in einem ...', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/YzIZIfVd85k/hqdefault.jpg', 
  'rust unraidable base build high defense', 
  'unraidable', 
  ARRAY['manual_seed', 'youtube', 'rust', 'unraidable'], 
  'unraidable', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=YzIZIfVd85k","source_categories":[{"key":"unraidable","label":"Unraidable","order":7}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '1MeFsFjov_8', 
  'Living in a Mathematically Unraidable', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/1MeFsFjov_8/hqdefault.jpg', 
  'rust unraidable base build high defense', 
  'unraidable', 
  ARRAY['manual_seed', 'youtube', 'rust', 'unraidable'], 
  'unraidable', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=1MeFsFjov_8","source_categories":[{"key":"unraidable","label":"Unraidable","order":8}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'mj1fwfelHr0', 
  'Rusts sicherste Basis', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/mj1fwfelHr0/hqdefault.jpg', 
  'rust unraidable base build high defense', 
  'unraidable', 
  ARRAY['manual_seed', 'youtube', 'rust', 'unraidable', 'crazy'], 
  'unraidable', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=mj1fwfelHr0","source_categories":[{"key":"unraidable","label":"Unraidable","order":9},{"key":"crazy","label":"Crazy","order":1}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'hfurNxLL9Jc', 
  'Psychologically Unraidable', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/hfurNxLL9Jc/hqdefault.jpg', 
  'rust unraidable base build high defense', 
  'unraidable', 
  ARRAY['manual_seed', 'youtube', 'rust', 'unraidable'], 
  'unraidable', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=hfurNxLL9Jc","source_categories":[{"key":"unraidable","label":"Unraidable","order":10}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'Nc4kbsWKOL4', 
  'Wir haben eine UNRAIDBARE BURG', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/Nc4kbsWKOL4/hqdefault.jpg', 
  'rust unraidable base build high defense', 
  'unraidable', 
  ARRAY['manual_seed', 'youtube', 'rust', 'unraidable'], 
  'unraidable', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=Nc4kbsWKOL4","source_categories":[{"key":"unraidable","label":"Unraidable","order":11}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'EWdwS-Tm3I8', 
  'So überlebt man Offline-Raids', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/EWdwS-Tm3I8/hqdefault.jpg', 
  'rust unraidable base build high defense', 
  'unraidable', 
  ARRAY['manual_seed', 'youtube', 'rust', 'unraidable'], 
  'unraidable', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=EWdwS-Tm3I8","source_categories":[{"key":"unraidable","label":"Unraidable","order":12}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '2rJFM4EoHlM', 
  'Der psychologisch unüberwindliche', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/2rJFM4EoHlM/hqdefault.jpg', 
  'rust unraidable base build high defense', 
  'unraidable', 
  ARRAY['manual_seed', 'youtube', 'rust', 'unraidable'], 
  'unraidable', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=2rJFM4EoHlM","source_categories":[{"key":"unraidable","label":"Unraidable","order":13}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '_dPQAm8buAY', 
  'The Psychologically Unraidable', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/_dPQAm8buAY/hqdefault.jpg', 
  'rust unraidable base build high defense', 
  'unraidable', 
  ARRAY['manual_seed', 'youtube', 'rust', 'unraidable'], 
  'unraidable', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=_dPQAm8buAY","source_categories":[{"key":"unraidable","label":"Unraidable","order":14}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'XSd0KSXuVbg', 
  'I Lived in a Secret Bridge Base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/XSd0KSXuVbg/hqdefault.jpg', 
  'rust unraidable base build high defense', 
  'unraidable', 
  ARRAY['manual_seed', 'youtube', 'rust', 'unraidable', 'crazy'], 
  'unraidable', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=XSd0KSXuVbg","source_categories":[{"key":"unraidable","label":"Unraidable","order":15},{"key":"crazy","label":"Crazy","order":7}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'ZVTBQJBHApw', 
  '7 Tage in einem unzugänglichen', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/ZVTBQJBHApw/hqdefault.jpg', 
  'rust unraidable base build high defense', 
  'unraidable', 
  ARRAY['manual_seed', 'youtube', 'rust', 'unraidable'], 
  'unraidable', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=ZVTBQJBHApw","source_categories":[{"key":"unraidable","label":"Unraidable","order":16}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'iRdyZ-ZW92g', 
  'Unzerstörbare Höhle', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/iRdyZ-ZW92g/hqdefault.jpg', 
  'rust unraidable base build high defense', 
  'unraidable', 
  ARRAY['manual_seed', 'youtube', 'rust', 'unraidable'], 
  'unraidable', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=iRdyZ-ZW92g","source_categories":[{"key":"unraidable","label":"Unraidable","order":17}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'PSq-i-Fms4U', 
  'This Base Is HATED by Clans', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/PSq-i-Fms4U/hqdefault.jpg', 
  'rust unraidable base build high defense', 
  'unraidable', 
  ARRAY['manual_seed', 'youtube', 'rust', 'unraidable', 'big_clan'], 
  'unraidable', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=PSq-i-Fms4U","source_categories":[{"key":"unraidable","label":"Unraidable","order":18},{"key":"big_clan","label":"Big Clan","order":8}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'C-QkLytXb0M', 
  'I made my Base Unraidable', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/C-QkLytXb0M/hqdefault.jpg', 
  'rust unraidable base build high defense', 
  'unraidable', 
  ARRAY['manual_seed', 'youtube', 'rust', 'unraidable'], 
  'unraidable', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=C-QkLytXb0M","source_categories":[{"key":"unraidable","label":"Unraidable","order":19}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'NabgHp8tTUQ', 
  'This BANNED Technique', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/NabgHp8tTUQ/hqdefault.jpg', 
  'rust unraidable base build high defense', 
  'unraidable', 
  ARRAY['manual_seed', 'youtube', 'rust', 'unraidable'], 
  'unraidable', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=NabgHp8tTUQ","source_categories":[{"key":"unraidable","label":"Unraidable","order":20}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'fg8KUrrwpxQ', 
  'Mathematisch unangreifbar', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/fg8KUrrwpxQ/hqdefault.jpg', 
  'rust unraidable base build high defense', 
  'unraidable', 
  ARRAY['manual_seed', 'youtube', 'rust', 'unraidable', 'crazy'], 
  'unraidable', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=fg8KUrrwpxQ","source_categories":[{"key":"unraidable","label":"Unraidable","order":21},{"key":"crazy","label":"Crazy","order":11}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'zsmjuVYTJPk', 
  'The 360° – Solo – 2xBunker', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/zsmjuVYTJPk/hqdefault.jpg', 
  'rust unraidable base build high defense', 
  'unraidable', 
  ARRAY['manual_seed', 'youtube', 'rust', 'unraidable', 'cheap', 'big_clan', 'crazy'], 
  'unraidable', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=zsmjuVYTJPk","source_categories":[{"key":"unraidable","label":"Unraidable","order":22},{"key":"cheap","label":"Cheap","order":16},{"key":"big_clan","label":"Big Clan","order":15},{"key":"crazy","label":"Crazy","order":14}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'U-bPImC-eeY', 
  'How To Build a Cheap SOLO Bunker', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/U-bPImC-eeY/hqdefault.jpg', 
  'rust cheap base build low cost', 
  'cheap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cheap'], 
  'cheap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=U-bPImC-eeY","source_categories":[{"key":"cheap","label":"Cheap","order":1}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'lCQ_7YOp-a4', 
  'The 4 Hour Fortress • No BPs', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/lCQ_7YOp-a4/hqdefault.jpg', 
  'rust cheap base build low cost', 
  'cheap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cheap'], 
  'cheap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=lCQ_7YOp-a4","source_categories":[{"key":"cheap","label":"Cheap","order":3}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'fi9RappcNwQ', 
  'The DUNE – Starkes und günstig', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/fi9RappcNwQ/hqdefault.jpg', 
  'rust cheap base build low cost', 
  'cheap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cheap'], 
  'cheap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=fi9RappcNwQ","source_categories":[{"key":"cheap","label":"Cheap","order":6}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'hTlNDt36g6s', 
  'Die EINZIGE Starterbasis', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/hTlNDt36g6s/hqdefault.jpg', 
  'rust cheap base build low cost', 
  'cheap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cheap'], 
  'cheap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=hTlNDt36g6s","source_categories":[{"key":"cheap","label":"Cheap","order":7}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '4JednjXHKTU', 
  'Mini-Basis mit Bunker', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/4JednjXHKTU/hqdefault.jpg', 
  'rust cheap base build low cost', 
  'cheap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cheap'], 
  'cheap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=4JednjXHKTU","source_categories":[{"key":"cheap","label":"Cheap","order":8}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'BnV9EGdGRAs', 
  'The MIRAGE Mini – Very Cheap', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/BnV9EGdGRAs/hqdefault.jpg', 
  'rust cheap base build low cost', 
  'cheap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cheap'], 
  'cheap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=BnV9EGdGRAs","source_categories":[{"key":"cheap","label":"Cheap","order":10}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'KOXU_EEX8uI', 
  'THE AURA – Die ULTIMATIVE Clan', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/KOXU_EEX8uI/hqdefault.jpg', 
  'rust cheap base build low cost', 
  'cheap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cheap', 'big_clan', 'widegap', 'crazy'], 
  'cheap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=KOXU_EEX8uI","source_categories":[{"key":"cheap","label":"Cheap","order":21},{"key":"big_clan","label":"Big Clan","order":4},{"key":"widegap","label":"Widegap","order":16},{"key":"crazy","label":"Crazy","order":17}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'NeadmMkIq88', 
  'The Sawyer – Cheap 4x4', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/NeadmMkIq88/hqdefault.jpg', 
  'rust cheap base build low cost', 
  'cheap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cheap', 'big_clan', 'widegap', 'crazy'], 
  'cheap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=NeadmMkIq88","source_categories":[{"key":"cheap","label":"Cheap","order":22},{"key":"big_clan","label":"Big Clan","order":14},{"key":"widegap","label":"Widegap","order":17},{"key":"crazy","label":"Crazy","order":20}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'SOOeiEAKj0I', 
  'The Clan Base That Defines the Meta', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/SOOeiEAKj0I/hqdefault.jpg', 
  'rust clan base build large group', 
  'big_clan', 
  ARRAY['manual_seed', 'youtube', 'rust', 'big_clan'], 
  'big_clan', 
  'clan', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=SOOeiEAKj0I","source_categories":[{"key":"big_clan","label":"Big Clan","order":1}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'UYecaTFSEAg', 
  'EVEREST V3 – Best Offline Clan', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/UYecaTFSEAg/hqdefault.jpg', 
  'rust clan base build large group', 
  'big_clan', 
  ARRAY['manual_seed', 'youtube', 'rust', 'big_clan'], 
  'big_clan', 
  'clan', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=UYecaTFSEAg","source_categories":[{"key":"big_clan","label":"Big Clan","order":2}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'XU8vcN4JxO0', 
  'MARGHERITA • Offener Kern', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/XU8vcN4JxO0/hqdefault.jpg', 
  'rust clan base build large group', 
  'big_clan', 
  ARRAY['manual_seed', 'youtube', 'rust', 'big_clan'], 
  'big_clan', 
  'clan', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=XU8vcN4JxO0","source_categories":[{"key":"big_clan","label":"Big Clan","order":3}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'HNsUJO5kz0M', 
  'EMBER – Offline Clan Beast', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/HNsUJO5kz0M/hqdefault.jpg', 
  'rust clan base build large group', 
  'big_clan', 
  ARRAY['manual_seed', 'youtube', 'rust', 'big_clan'], 
  'big_clan', 
  'clan', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=HNsUJO5kz0M","source_categories":[{"key":"big_clan","label":"Big Clan","order":5}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'e-M6PXQxGsY', 
  'The Omron – Meta Snowball 4x', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/e-M6PXQxGsY/hqdefault.jpg', 
  'rust clan base build large group', 
  'big_clan', 
  ARRAY['manual_seed', 'youtube', 'rust', 'big_clan'], 
  'big_clan', 
  'clan', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=e-M6PXQxGsY","source_categories":[{"key":"big_clan","label":"Big Clan","order":6}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'csrnQMKXSEM', 
  'The INFERNO – Meta Circle', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/csrnQMKXSEM/hqdefault.jpg', 
  'rust clan base build large group', 
  'big_clan', 
  ARRAY['manual_seed', 'youtube', 'rust', 'big_clan'], 
  'big_clan', 
  'clan', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=csrnQMKXSEM","source_categories":[{"key":"big_clan","label":"Big Clan","order":7}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '29QJ4v3cCCc', 
  'NEW ''''META 2x2''''', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/29QJ4v3cCCc/hqdefault.jpg', 
  'rust clan base build large group', 
  'big_clan', 
  ARRAY['manual_seed', 'youtube', 'rust', 'big_clan'], 
  'big_clan', 
  'clan', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=29QJ4v3cCCc","source_categories":[{"key":"big_clan","label":"Big Clan","order":9}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'oNmteHHliAA', 
  '(NEW) UPDATED 2x2', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/oNmteHHliAA/hqdefault.jpg', 
  'rust clan base build large group', 
  'big_clan', 
  ARRAY['manual_seed', 'youtube', 'rust', 'big_clan'], 
  'big_clan', 
  'clan', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=oNmteHHliAA","source_categories":[{"key":"big_clan","label":"Big Clan","order":10}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'OyCpdT_fd8c', 
  'NEW UPDATED 2x2', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/OyCpdT_fd8c/hqdefault.jpg', 
  'rust clan base build large group', 
  'big_clan', 
  ARRAY['manual_seed', 'youtube', 'rust', 'big_clan'], 
  'big_clan', 
  'clan', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=OyCpdT_fd8c","source_categories":[{"key":"big_clan","label":"Big Clan","order":11}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'Hh-0Iy1_YxQ', 
  'THE ICEBERG V2 – Best 3x3 Clan', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/Hh-0Iy1_YxQ/hqdefault.jpg', 
  'rust clan base build large group', 
  'big_clan', 
  ARRAY['manual_seed', 'youtube', 'rust', 'big_clan', 'widegap'], 
  'big_clan', 
  'clan', 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=Hh-0Iy1_YxQ","source_categories":[{"key":"big_clan","label":"Big Clan","order":13},{"key":"widegap","label":"Widegap","order":18}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'BH27o9ObOfw', 
  'Top 50 FUNNIEST Rust Moments', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/BH27o9ObOfw/hqdefault.jpg', 
  'rust funny base build troll base', 
  'funny_troll', 
  ARRAY['manual_seed', 'youtube', 'rust', 'funny_troll'], 
  'funny_troll', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=BH27o9ObOfw","source_categories":[{"key":"funny_troll","label":"Funny / Troll","order":1}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'WzZ7Sfgk1ek', 
  'Trolling Angry Rust Clans', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/WzZ7Sfgk1ek/hqdefault.jpg', 
  'rust funny base build troll base', 
  'funny_troll', 
  ARRAY['manual_seed', 'youtube', 'rust', 'funny_troll'], 
  'funny_troll', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=WzZ7Sfgk1ek","source_categories":[{"key":"funny_troll","label":"Funny / Troll","order":2}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'uN6LoE9Tjro', 
  'Trolling PARANOID Streamer', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/uN6LoE9Tjro/hqdefault.jpg', 
  'rust funny base build troll base', 
  'funny_troll', 
  ARRAY['manual_seed', 'youtube', 'rust', 'funny_troll'], 
  'funny_troll', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=uN6LoE9Tjro","source_categories":[{"key":"funny_troll","label":"Funny / Troll","order":3}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'NKaE7C4xUUo', 
  'Funny Moments Trolling Players', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/NKaE7C4xUUo/hqdefault.jpg', 
  'rust funny base build troll base', 
  'funny_troll', 
  ARRAY['manual_seed', 'youtube', 'rust', 'funny_troll'], 
  'funny_troll', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=NKaE7C4xUUo","source_categories":[{"key":"funny_troll","label":"Funny / Troll","order":4}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'Kpbw6PdBdeo', 
  'Rust-Admin trollt den Server', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/Kpbw6PdBdeo/hqdefault.jpg', 
  'rust funny base build troll base', 
  'funny_troll', 
  ARRAY['manual_seed', 'youtube', 'rust', 'funny_troll'], 
  'funny_troll', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=Kpbw6PdBdeo","source_categories":[{"key":"funny_troll","label":"Funny / Troll","order":5}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'thU7MY6rSWE', 
  'Rust-Admin-Trolling 20xx', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/thU7MY6rSWE/hqdefault.jpg', 
  'rust funny base build troll base', 
  'funny_troll', 
  ARRAY['manual_seed', 'youtube', 'rust', 'funny_troll'], 
  'funny_troll', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=thU7MY6rSWE","source_categories":[{"key":"funny_troll","label":"Funny / Troll","order":6}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'lz6H89LeYJs', 
  'Top 20 Funniest Rust Moments', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/lz6H89LeYJs/hqdefault.jpg', 
  'rust funny base build troll base', 
  'funny_troll', 
  ARRAY['manual_seed', 'youtube', 'rust', 'funny_troll'], 
  'funny_troll', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=lz6H89LeYJs","source_categories":[{"key":"funny_troll","label":"Funny / Troll","order":7}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'uTpMWHUHKY0', 
  'Rust Admin Destroys Cheaters #', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/uTpMWHUHKY0/hqdefault.jpg', 
  'rust funny base build troll base', 
  'funny_troll', 
  ARRAY['manual_seed', 'youtube', 'rust', 'funny_troll', 'cheater_reports'], 
  'funny_troll', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=uTpMWHUHKY0","source_categories":[{"key":"funny_troll","label":"Funny / Troll","order":8},{"key":"cheater_reports","label":"Hacks (Cheater exposed / bans)","order":1}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'tHAvhA_I8rE', 
  'Raiding the SALTIEST Toxic', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/tHAvhA_I8rE/hqdefault.jpg', 
  'rust funny base build troll base', 
  'funny_troll', 
  ARRAY['manual_seed', 'youtube', 'rust', 'funny_troll'], 
  'funny_troll', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=tHAvhA_I8rE","source_categories":[{"key":"funny_troll","label":"Funny / Troll","order":9}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'za6LFWYUiRw', 
  'Toxic Kid starts Crying', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/za6LFWYUiRw/hqdefault.jpg', 
  'rust funny base build troll base', 
  'funny_troll', 
  ARRAY['manual_seed', 'youtube', 'rust', 'funny_troll'], 
  'funny_troll', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=za6LFWYUiRw","source_categories":[{"key":"funny_troll","label":"Funny / Troll","order":10}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'FJOAAkNJbZo', 
  'Ich habe sie an der Tür gefoppt', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/FJOAAkNJbZo/hqdefault.jpg', 
  'rust funny base build troll base', 
  'funny_troll', 
  ARRAY['manual_seed', 'youtube', 'rust', 'funny_troll'], 
  'funny_troll', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=FJOAAkNJbZo","source_categories":[{"key":"funny_troll","label":"Funny / Troll","order":11}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'QkWBcI5eaTA', 
  'Trolling eines giftigen Streamers', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/QkWBcI5eaTA/hqdefault.jpg', 
  'rust funny base build troll base', 
  'funny_troll', 
  ARRAY['manual_seed', 'youtube', 'rust', 'funny_troll'], 
  'funny_troll', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=QkWBcI5eaTA","source_categories":[{"key":"funny_troll","label":"Funny / Troll","order":12}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '9wPI1OqasN8', 
  'Leben in den Basen der Spieler', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/9wPI1OqasN8/hqdefault.jpg', 
  'rust funny base build troll base', 
  'funny_troll', 
  ARRAY['manual_seed', 'youtube', 'rust', 'funny_troll'], 
  'funny_troll', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=9wPI1OqasN8","source_categories":[{"key":"funny_troll","label":"Funny / Troll","order":14}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'Ersdwfht8ds', 
  'BEST Trolling in Rust – Funny', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/Ersdwfht8ds/hqdefault.jpg', 
  'rust funny base build troll base', 
  'funny_troll', 
  ARRAY['manual_seed', 'youtube', 'rust', 'funny_troll'], 
  'funny_troll', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=Ersdwfht8ds","source_categories":[{"key":"funny_troll","label":"Funny / Troll","order":17}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '3Aiw_WlzwJo', 
  'TC Trolling Toxic Players', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/3Aiw_WlzwJo/hqdefault.jpg', 
  'rust funny base build troll base', 
  'funny_troll', 
  ARRAY['manual_seed', 'youtube', 'rust', 'funny_troll'], 
  'funny_troll', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=3Aiw_WlzwJo","source_categories":[{"key":"funny_troll","label":"Funny / Troll","order":18}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'pXg6szR1-as', 
  'They raided my shack so I zerged', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/pXg6szR1-as/hqdefault.jpg', 
  'rust funny base build troll base', 
  'funny_troll', 
  ARRAY['manual_seed', 'youtube', 'rust', 'funny_troll'], 
  'funny_troll', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=pXg6szR1-as","source_categories":[{"key":"funny_troll","label":"Funny / Troll","order":19}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '8Dacu25J1Zw', 
  'I Made This Streamer Shake', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/8Dacu25J1Zw/hqdefault.jpg', 
  'rust funny base build troll base', 
  'funny_troll', 
  ARRAY['manual_seed', 'youtube', 'rust', 'funny_troll'], 
  'funny_troll', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=8Dacu25J1Zw","source_categories":[{"key":"funny_troll","label":"Funny / Troll","order":20}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '-EYjDYUY_Pc', 
  'Trying to troll in Rust (Funny)', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/-EYjDYUY_Pc/hqdefault.jpg', 
  'rust funny base build troll base', 
  'funny_troll', 
  ARRAY['manual_seed', 'youtube', 'rust', 'funny_troll'], 
  'funny_troll', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=-EYjDYUY_Pc","source_categories":[{"key":"funny_troll","label":"Funny / Troll","order":21}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '7vcaNAKWFwg', 
  'Toxic Clan VS The Great Wall', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/7vcaNAKWFwg/hqdefault.jpg', 
  'rust funny base build troll base', 
  'funny_troll', 
  ARRAY['manual_seed', 'youtube', 'rust', 'funny_troll'], 
  'funny_troll', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=7vcaNAKWFwg","source_categories":[{"key":"funny_troll","label":"Funny / Troll","order":22}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'pEKyK4xHZdU', 
  'THE MOST OVERPOWERED CAVE BASE', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/pEKyK4xHZdU/hqdefault.jpg', 
  'rust cave base build', 
  'cave', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cave'], 
  'cave', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=pEKyK4xHZdU","source_categories":[{"key":"cave","label":"Cave","order":1}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'LG1mjKwPLzg', 
  'I Built a broken underground base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/LG1mjKwPLzg/hqdefault.jpg', 
  'rust cave base build', 
  'cave', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cave'], 
  'cave', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=LG1mjKwPLzg","source_categories":[{"key":"cave","label":"Cave","order":2}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '9XX5il3Us-k', 
  'Cave Base Tutorial (70 Rockets)', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/9XX5il3Us-k/hqdefault.jpg', 
  'rust cave base build', 
  'cave', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cave'], 
  'cave', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=9XX5il3Us-k","source_categories":[{"key":"cave","label":"Cave","order":3}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'tiCpirwH_eA', 
  'TUNNEL – Cosy 4x Bunker Cave', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/tiCpirwH_eA/hqdefault.jpg', 
  'rust cave base build', 
  'cave', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cave'], 
  'cave', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=tiCpirwH_eA","source_categories":[{"key":"cave","label":"Cave","order":4}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'JXYIa91VWKI', 
  'I Built a SECRET SOLO Cave Empire', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/JXYIa91VWKI/hqdefault.jpg', 
  'rust cave base build', 
  'cave', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cave'], 
  'cave', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=JXYIa91VWKI","source_categories":[{"key":"cave","label":"Cave","order":5}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'lYNYxlDgtPU', 
  'I Survived 100 Hours as a cave', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/lYNYxlDgtPU/hqdefault.jpg', 
  'rust cave base build', 
  'cave', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cave'], 
  'cave', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=lYNYxlDgtPU","source_categories":[{"key":"cave","label":"Cave","order":6}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'ArZLyDMFhFU', 
  'ARMAGEDDON – 105 Raketen', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/ArZLyDMFhFU/hqdefault.jpg', 
  'rust cave base build', 
  'cave', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cave'], 
  'cave', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=ArZLyDMFhFU","source_categories":[{"key":"cave","label":"Cave","order":7}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '9yNFI8_1Wd4', 
  'Cave Base Tips And Tricks', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/9yNFI8_1Wd4/hqdefault.jpg', 
  'rust cave base build', 
  'cave', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cave'], 
  'cave', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=9yNFI8_1Wd4","source_categories":[{"key":"cave","label":"Cave","order":8}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'o3HNlNRKr64', 
  'I Spent 7 Days in a High Tech', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/o3HNlNRKr64/hqdefault.jpg', 
  'rust cave base build', 
  'cave', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cave'], 
  'cave', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=o3HNlNRKr64","source_categories":[{"key":"cave","label":"Cave","order":9}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'BOClbPLk0mw', 
  'Cave Base – Penta Bunker', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/BOClbPLk0mw/hqdefault.jpg', 
  'rust cave base build', 
  'cave', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cave'], 
  'cave', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=BOClbPLk0mw","source_categories":[{"key":"cave","label":"Cave","order":10}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '2UY6WCDj5oI', 
  'i built an illegal cave base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/2UY6WCDj5oI/hqdefault.jpg', 
  'rust cave base build', 
  'cave', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cave'], 
  'cave', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=2UY6WCDj5oI","source_categories":[{"key":"cave","label":"Cave","order":11}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'gaN93A1wt-w', 
  'Unraidable TRIPLE Cave', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/gaN93A1wt-w/hqdefault.jpg', 
  'rust cave base build', 
  'cave', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cave'], 
  'cave', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=gaN93A1wt-w","source_categories":[{"key":"cave","label":"Cave","order":12}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'FuNkP7HrkcQ', 
  'I Built a Secret Underground', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/FuNkP7HrkcQ/hqdefault.jpg', 
  'rust cave base build', 
  'cave', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cave'], 
  'cave', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=FuNkP7HrkcQ","source_categories":[{"key":"cave","label":"Cave","order":13}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'P5oZVC0iClM', 
  'How to Build a Cave Base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/P5oZVC0iClM/hqdefault.jpg', 
  'rust cave base build', 
  'cave', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cave'], 
  'cave', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=P5oZVC0iClM","source_categories":[{"key":"cave","label":"Cave","order":14}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'ftJbNWOYPM4', 
  'Versteckte Höhlenbasis', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/ftJbNWOYPM4/hqdefault.jpg', 
  'rust cave base build', 
  'cave', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cave'], 
  'cave', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=ftJbNWOYPM4","source_categories":[{"key":"cave","label":"Cave","order":15}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'KixcXpmfZSE', 
  'I Lived In A Unique Cave Base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/KixcXpmfZSE/hqdefault.jpg', 
  'rust cave base build', 
  'cave', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cave'], 
  'cave', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=KixcXpmfZSE","source_categories":[{"key":"cave","label":"Cave","order":16}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'JdbA4hn98pw', 
  'I Built an Underground Fortress', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/JdbA4hn98pw/hqdefault.jpg', 
  'rust cave base build', 
  'cave', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cave'], 
  'cave', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=JdbA4hn98pw","source_categories":[{"key":"cave","label":"Cave","order":17}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'zR2LjWDzluc', 
  'My Unraidable Cave Base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/zR2LjWDzluc/hqdefault.jpg', 
  'rust cave base build', 
  'cave', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cave'], 
  'cave', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=zR2LjWDzluc","source_categories":[{"key":"cave","label":"Cave","order":18}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'OgqSabD0T3Y', 
  'i lived in a cave fortress', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/OgqSabD0T3Y/hqdefault.jpg', 
  'rust cave base build', 
  'cave', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cave'], 
  'cave', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=OgqSabD0T3Y","source_categories":[{"key":"cave","label":"Cave","order":19}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'GsmTM6ljsWE', 
  'i built a solo cave fortress', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/GsmTM6ljsWE/hqdefault.jpg', 
  'rust cave base build', 
  'cave', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cave'], 
  'cave', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=GsmTM6ljsWE","source_categories":[{"key":"cave","label":"Cave","order":20}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'kgWXBmhiEIo', 
  'Vanilla Rust Höhle', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/kgWXBmhiEIo/hqdefault.jpg', 
  'rust cave base build', 
  'cave', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cave'], 
  'cave', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=kgWXBmhiEIo","source_categories":[{"key":"cave","label":"Cave","order":21}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'vC3bI2CvUxQ', 
  'Die beste Bunkerhöhlenbasis', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/vC3bI2CvUxQ/hqdefault.jpg', 
  'rust cave base build', 
  'cave', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cave'], 
  'cave', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=vC3bI2CvUxQ","source_categories":[{"key":"cave","label":"Cave","order":22}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'SL3gGMrg-AY', 
  'Wie man eine Wasserbasis baut', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/SL3gGMrg-AY/hqdefault.jpg', 
  'rust ocean base water base build', 
  'ocean_water', 
  ARRAY['manual_seed', 'youtube', 'rust', 'ocean_water'], 
  'ocean_water', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=SL3gGMrg-AY","source_categories":[{"key":"ocean_water","label":"Ocean / Water","order":1}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'mxxt-JPcAoc', 
  'I Built a SOLO Underwater Fortress', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/mxxt-JPcAoc/hqdefault.jpg', 
  'rust ocean base water base build', 
  'ocean_water', 
  ARRAY['manual_seed', 'youtube', 'rust', 'ocean_water'], 
  'ocean_water', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=mxxt-JPcAoc","source_categories":[{"key":"ocean_water","label":"Ocean / Water","order":2}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '0fDGywH7_Fo', 
  'UNRAIDABLE Water Base 2025', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/0fDGywH7_Fo/hqdefault.jpg', 
  'rust ocean base water base build', 
  'ocean_water', 
  ARRAY['manual_seed', 'youtube', 'rust', 'ocean_water'], 
  'ocean_water', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=0fDGywH7_Fo","source_categories":[{"key":"ocean_water","label":"Ocean / Water","order":3}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'yMvTv3oigR8', 
  'I Built an Entirely Submerged', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/yMvTv3oigR8/hqdefault.jpg', 
  'rust ocean base water base build', 
  'ocean_water', 
  ARRAY['manual_seed', 'youtube', 'rust', 'ocean_water'], 
  'ocean_water', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=yMvTv3oigR8","source_categories":[{"key":"ocean_water","label":"Ocean / Water","order":4}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '6szDIX2JCME', 
  'I Lived in a Secret Underwater', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/6szDIX2JCME/hqdefault.jpg', 
  'rust ocean base water base build', 
  'ocean_water', 
  ARRAY['manual_seed', 'youtube', 'rust', 'ocean_water'], 
  'ocean_water', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=6szDIX2JCME","source_categories":[{"key":"ocean_water","label":"Ocean / Water","order":5}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'd6Tb1NtsoX8', 
  'Rust The Sea Bunker (Doom)', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/d6Tb1NtsoX8/hqdefault.jpg', 
  'rust ocean base water base build', 
  'ocean_water', 
  ARRAY['manual_seed', 'youtube', 'rust', 'ocean_water'], 
  'ocean_water', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=d6Tb1NtsoX8","source_categories":[{"key":"ocean_water","label":"Ocean / Water","order":6}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'JmwsHCT0HUw', 
  'Why the Water Entrance is Meta', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/JmwsHCT0HUw/hqdefault.jpg', 
  'rust ocean base water base build', 
  'ocean_water', 
  ARRAY['manual_seed', 'youtube', 'rust', 'ocean_water'], 
  'ocean_water', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=JmwsHCT0HUw","source_categories":[{"key":"ocean_water","label":"Ocean / Water","order":7}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'nds8ikiQDNg', 
  'I Built a water base with a hidden', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/nds8ikiQDNg/hqdefault.jpg', 
  'rust ocean base water base build', 
  'ocean_water', 
  ARRAY['manual_seed', 'youtube', 'rust', 'ocean_water'], 
  'ocean_water', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=nds8ikiQDNg","source_categories":[{"key":"ocean_water","label":"Ocean / Water","order":8}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '8eLR48_yQHk', 
  'I Built a Safe Haven in the Ocean', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/8eLR48_yQHk/hqdefault.jpg', 
  'rust ocean base water base build', 
  'ocean_water', 
  ARRAY['manual_seed', 'youtube', 'rust', 'ocean_water'], 
  'ocean_water', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=8eLR48_yQHk","source_categories":[{"key":"ocean_water","label":"Ocean / Water","order":9}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'rBsjnucePnk', 
  'Discovering The Greatest Water', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/rBsjnucePnk/hqdefault.jpg', 
  'rust ocean base water base build', 
  'ocean_water', 
  ARRAY['manual_seed', 'youtube', 'rust', 'ocean_water'], 
  'ocean_water', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=rBsjnucePnk","source_categories":[{"key":"ocean_water","label":"Ocean / Water","order":10}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'z8Aue9oxyB8', 
  'I Built a Ocean Bunker', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/z8Aue9oxyB8/hqdefault.jpg', 
  'rust ocean base water base build', 
  'ocean_water', 
  ARRAY['manual_seed', 'youtube', 'rust', 'ocean_water'], 
  'ocean_water', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=z8Aue9oxyB8","source_categories":[{"key":"ocean_water","label":"Ocean / Water","order":11}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'sU00zh8Ktl0', 
  'I lived underwater for a wipe', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/sU00zh8Ktl0/hqdefault.jpg', 
  'rust ocean base water base build', 
  'ocean_water', 
  ARRAY['manual_seed', 'youtube', 'rust', 'ocean_water'], 
  'ocean_water', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=sU00zh8Ktl0","source_categories":[{"key":"ocean_water","label":"Ocean / Water","order":12}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'XSq9lC08fEI', 
  'We BUILT the GREATEST Ocean Base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/XSq9lC08fEI/hqdefault.jpg', 
  'rust ocean base water base build', 
  'ocean_water', 
  ARRAY['manual_seed', 'youtube', 'rust', 'ocean_water'], 
  'ocean_water', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=XSq9lC08fEI","source_categories":[{"key":"ocean_water","label":"Ocean / Water","order":13}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'lO4L4atn-uM', 
  'The Sea Bunker With Doom', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/lO4L4atn-uM/hqdefault.jpg', 
  'rust ocean base water base build', 
  'ocean_water', 
  ARRAY['manual_seed', 'youtube', 'rust', 'ocean_water'], 
  'ocean_water', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=lO4L4atn-uM","source_categories":[{"key":"ocean_water","label":"Ocean / Water","order":14}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'f299-Qkxzsk', 
  'This Ocean Base LET US Control', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/f299-Qkxzsk/hqdefault.jpg', 
  'rust ocean base water base build', 
  'ocean_water', 
  ARRAY['manual_seed', 'youtube', 'rust', 'ocean_water'], 
  'ocean_water', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=f299-Qkxzsk","source_categories":[{"key":"ocean_water","label":"Ocean / Water","order":15}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'ttSL_FHvlfw', 
  'Ich habe einen Ozeanbunker', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/ttSL_FHvlfw/hqdefault.jpg', 
  'rust ocean base water base build', 
  'ocean_water', 
  ARRAY['manual_seed', 'youtube', 'rust', 'ocean_water'], 
  'ocean_water', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=ttSL_FHvlfw","source_categories":[{"key":"ocean_water","label":"Ocean / Water","order":16}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'PEYXms-V_t4', 
  'MOANA | Best 2x1 Deep Sea', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/PEYXms-V_t4/hqdefault.jpg', 
  'rust ocean base water base build', 
  'ocean_water', 
  ARRAY['manual_seed', 'youtube', 'rust', 'ocean_water'], 
  'ocean_water', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=PEYXms-V_t4","source_categories":[{"key":"ocean_water","label":"Ocean / Water","order":17}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'jGgGQF0tS-s', 
  'KAI | Solo/Duo Water Bunker', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/jGgGQF0tS-s/hqdefault.jpg', 
  'rust ocean base water base build', 
  'ocean_water', 
  ARRAY['manual_seed', 'youtube', 'rust', 'ocean_water'], 
  'ocean_water', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=jGgGQF0tS-s","source_categories":[{"key":"ocean_water","label":"Ocean / Water","order":18}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'GooWaOvdbVA', 
  'Dieses Update hat Farming verändert', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/GooWaOvdbVA/hqdefault.jpg', 
  'rust ocean base water base build', 
  'ocean_water', 
  ARRAY['manual_seed', 'youtube', 'rust', 'ocean_water'], 
  'ocean_water', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=GooWaOvdbVA","source_categories":[{"key":"ocean_water","label":"Ocean / Water","order":19}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'kOGoOhpb0SM', 
  'Wie ich eine Ozeanbasis baute', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/kOGoOhpb0SM/hqdefault.jpg', 
  'rust ocean base water base build', 
  'ocean_water', 
  ARRAY['manual_seed', 'youtube', 'rust', 'ocean_water'], 
  'ocean_water', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=kOGoOhpb0SM","source_categories":[{"key":"ocean_water","label":"Ocean / Water","order":20}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'l_YRyfX_9vI', 
  'Easy Saltwater/Ocean Farm', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/l_YRyfX_9vI/hqdefault.jpg', 
  'rust ocean base water base build', 
  'ocean_water', 
  ARRAY['manual_seed', 'youtube', 'rust', 'ocean_water'], 
  'ocean_water', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=l_YRyfX_9vI","source_categories":[{"key":"ocean_water","label":"Ocean / Water","order":21}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '_vmsgqwjx6U', 
  'How to build Wide gaps in 33s', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/_vmsgqwjx6U/hqdefault.jpg', 
  'rust widegap base build', 
  'widegap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'widegap'], 
  'widegap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=_vmsgqwjx6U","source_categories":[{"key":"widegap","label":"Widegap","order":1}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'dZWSZSgKXnE', 
  'It''s 2026 And You STILL Can''t Widegap', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/dZWSZSgKXnE/hqdefault.jpg', 
  'rust widegap base build', 
  'widegap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'widegap'], 
  'widegap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=dZWSZSgKXnE","source_categories":[{"key":"widegap","label":"Widegap","order":2}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'fxQHWx-LCkQ', 
  'Widegaps Tutorial (5 examples)', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/fxQHWx-LCkQ/hqdefault.jpg', 
  'rust widegap base build', 
  'widegap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'widegap'], 
  'widegap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=fxQHWx-LCkQ","source_categories":[{"key":"widegap","label":"Widegap","order":3}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '0XKMQsC-fNc', 
  'THE HEMP 5x5 | Inner Peekdown', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/0XKMQsC-fNc/hqdefault.jpg', 
  'rust widegap base build', 
  'widegap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'widegap'], 
  'widegap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=0XKMQsC-fNc","source_categories":[{"key":"widegap","label":"Widegap","order":4}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '1UoV2VuQfB4', 
  'Better Widegaps & Free Roof Peek', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/1UoV2VuQfB4/hqdefault.jpg', 
  'rust widegap base build', 
  'widegap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'widegap'], 
  'widegap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=1UoV2VuQfB4","source_categories":[{"key":"widegap","label":"Widegap","order":5}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'gR384OIaKm8', 
  'THE FAVELLA – Best 4-6 Man', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/gR384OIaKm8/hqdefault.jpg', 
  'rust widegap base build', 
  'widegap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'widegap'], 
  'widegap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=gR384OIaKm8","source_categories":[{"key":"widegap","label":"Widegap","order":6}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'xDq_i43oWEg', 
  'Superv Circle base | Open Core', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/xDq_i43oWEg/hqdefault.jpg', 
  'rust widegap base build', 
  'widegap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'widegap'], 
  'widegap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=xDq_i43oWEg","source_categories":[{"key":"widegap","label":"Widegap","order":7}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'ysPIwitr2IA', 
  'THE TORT 4x4 Tutorial – Clan', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/ysPIwitr2IA/hqdefault.jpg', 
  'rust widegap base build', 
  'widegap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'widegap'], 
  'widegap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=ysPIwitr2IA","source_categories":[{"key":"widegap","label":"Widegap","order":8}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'icPNuo3dUwU', 
  'The Lockbox – Group Base | Open', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/icPNuo3dUwU/hqdefault.jpg', 
  'rust widegap base build', 
  'widegap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'widegap'], 
  'widegap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=icPNuo3dUwU","source_categories":[{"key":"widegap","label":"Widegap","order":9}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'rnx7-ipCKGY', 
  'Ultimative Weitwinkelerweiterung', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/rnx7-ipCKGY/hqdefault.jpg', 
  'rust widegap base build', 
  'widegap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'widegap'], 
  'widegap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=rnx7-ipCKGY","source_categories":[{"key":"widegap","label":"Widegap","order":10}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'BUWjogmDxTQ', 
  'EVERFROST – Simple Quad Honeycomb', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/BUWjogmDxTQ/hqdefault.jpg', 
  'rust widegap base build', 
  'widegap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'widegap'], 
  'widegap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=BUWjogmDxTQ","source_categories":[{"key":"widegap","label":"Widegap","order":11}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'zvfkwsiRl8U', 
  'The Conquest – 4-6 Man Base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/zvfkwsiRl8U/hqdefault.jpg', 
  'rust widegap base build', 
  'widegap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'widegap'], 
  'widegap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=zvfkwsiRl8U","source_categories":[{"key":"widegap","label":"Widegap","order":12}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'N4Xqg1Oc_ZA', 
  'Das WIDE-GAP Meta', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/N4Xqg1Oc_ZA/hqdefault.jpg', 
  'rust widegap base build', 
  'widegap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'widegap'], 
  'widegap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=N4Xqg1Oc_ZA","source_categories":[{"key":"widegap","label":"Widegap","order":13}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '8dp_dUMK2MQ', 
  'THE RED ROOM | 2x2 Quad+ Widegap', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/8dp_dUMK2MQ/hqdefault.jpg', 
  'rust widegap base build', 
  'widegap', 
  ARRAY['manual_seed', 'youtube', 'rust', 'widegap'], 
  'widegap', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=8dp_dUMK2MQ","source_categories":[{"key":"widegap","label":"Widegap","order":14}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'e_VhhQcwfxg', 
  'RUST RP BASE: The Festive Cabin', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/e_VhhQcwfxg/hqdefault.jpg', 
  'rust beautiful base build', 
  'beautiful', 
  ARRAY['manual_seed', 'youtube', 'rust', 'beautiful'], 
  'beautiful', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=e_VhhQcwfxg","source_categories":[{"key":"beautiful","label":"Beautiful","order":1}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '3bzdxkWHp1A', 
  '*NEW* Perfect Base Concept', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/3bzdxkWHp1A/hqdefault.jpg', 
  'rust beautiful base build', 
  'beautiful', 
  ARRAY['manual_seed', 'youtube', 'rust', 'beautiful'], 
  'beautiful', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=3bzdxkWHp1A","source_categories":[{"key":"beautiful","label":"Beautiful","order":2}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'CVwyDcq9WmE', 
  'Die robuste Hütte', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/CVwyDcq9WmE/hqdefault.jpg', 
  'rust beautiful base build', 
  'beautiful', 
  ARRAY['manual_seed', 'youtube', 'rust', 'beautiful'], 
  'beautiful', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=CVwyDcq9WmE","source_categories":[{"key":"beautiful","label":"Beautiful","order":5}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'ltqKpq8H3IA', 
  'Wie man eine Solo-Basis baut', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/ltqKpq8H3IA/hqdefault.jpg', 
  'rust beautiful base build', 
  'beautiful', 
  ARRAY['manual_seed', 'youtube', 'rust', 'beautiful'], 
  'beautiful', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=ltqKpq8H3IA","source_categories":[{"key":"beautiful","label":"Beautiful","order":7}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'JggvkwHVc9A', 
  'Narrated Tours Of My TOP 10', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/JggvkwHVc9A/hqdefault.jpg', 
  'rust beautiful base build', 
  'beautiful', 
  ARRAY['manual_seed', 'youtube', 'rust', 'beautiful'], 
  'beautiful', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=JggvkwHVc9A","source_categories":[{"key":"beautiful","label":"Beautiful","order":8}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'S_CFXbUXuWs', 
  'KRAKEN – Robust und gemütlich', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/S_CFXbUXuWs/hqdefault.jpg', 
  'rust beautiful base build', 
  'beautiful', 
  ARRAY['manual_seed', 'youtube', 'rust', 'beautiful'], 
  'beautiful', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=S_CFXbUXuWs","source_categories":[{"key":"beautiful","label":"Beautiful","order":11}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'IDdD7k39wAQ', 
  '097 – Das ULTIMATIVE Solo/Duo', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/IDdD7k39wAQ/hqdefault.jpg', 
  'rust beautiful base build', 
  'beautiful', 
  ARRAY['manual_seed', 'youtube', 'rust', 'beautiful'], 
  'beautiful', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=IDdD7k39wAQ","source_categories":[{"key":"beautiful","label":"Beautiful","order":12}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'YqWfwUR2kkY', 
  'The PERFECT Base Design', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/YqWfwUR2kkY/hqdefault.jpg', 
  'rust beautiful base build', 
  'beautiful', 
  ARRAY['manual_seed', 'youtube', 'rust', 'beautiful'], 
  'beautiful', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=YqWfwUR2kkY","source_categories":[{"key":"beautiful","label":"Beautiful","order":16}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '4YciMkQ1ZLc', 
  'PERFECT 4x4 Base Design', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/4YciMkQ1ZLc/hqdefault.jpg', 
  'rust beautiful base build', 
  'beautiful', 
  ARRAY['manual_seed', 'youtube', 'rust', 'beautiful'], 
  'beautiful', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=4YciMkQ1ZLc","source_categories":[{"key":"beautiful","label":"Beautiful","order":17}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'LJMlwWIjHUg', 
  'The PERFECT 4-8 Man Circle', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/LJMlwWIjHUg/hqdefault.jpg', 
  'rust beautiful base build', 
  'beautiful', 
  ARRAY['manual_seed', 'youtube', 'rust', 'beautiful'], 
  'beautiful', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=LJMlwWIjHUg","source_categories":[{"key":"beautiful","label":"Beautiful","order":18}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'zxAV18kdZjs', 
  'NYXAR – Solo/Duo 7 Bunker', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/zxAV18kdZjs/hqdefault.jpg', 
  'rust beautiful base build', 
  'beautiful', 
  ARRAY['manual_seed', 'youtube', 'rust', 'beautiful', 'crazy'], 
  'beautiful', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=zxAV18kdZjs","source_categories":[{"key":"beautiful","label":"Beautiful","order":19},{"key":"crazy","label":"Crazy","order":18}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '_qB2OzdV2Qw', 
  '(NEW) Perfect Design 2.0', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/_qB2OzdV2Qw/hqdefault.jpg', 
  'rust beautiful base build', 
  'beautiful', 
  ARRAY['manual_seed', 'youtube', 'rust', 'beautiful'], 
  'beautiful', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=_qB2OzdV2Qw","source_categories":[{"key":"beautiful","label":"Beautiful","order":20}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'E91nUACSl3I', 
  'The STRONGEST Base Design', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/E91nUACSl3I/hqdefault.jpg', 
  'rust beautiful base build', 
  'beautiful', 
  ARRAY['manual_seed', 'youtube', 'rust', 'beautiful'], 
  'beautiful', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=E91nUACSl3I","source_categories":[{"key":"beautiful","label":"Beautiful","order":21}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'PvmriKScDag', 
  'I Built the SMARTEST base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/PvmriKScDag/hqdefault.jpg', 
  'rust crazy base build', 
  'crazy', 
  ARRAY['manual_seed', 'youtube', 'rust', 'crazy'], 
  'crazy', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=PvmriKScDag","source_categories":[{"key":"crazy","label":"Crazy","order":3}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'sBE2mHFP6uM', 
  'Wie ein 50.000-Stunden-Trio', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/sBE2mHFP6uM/hqdefault.jpg', 
  'rust crazy base build', 
  'crazy', 
  ARRAY['manual_seed', 'youtube', 'rust', 'crazy'], 
  'crazy', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=sBE2mHFP6uM","source_categories":[{"key":"crazy","label":"Crazy","order":4}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'uDu0-SAlpto', 
  'I Built Rust''s safest base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/uDu0-SAlpto/hqdefault.jpg', 
  'rust crazy base build', 
  'crazy', 
  ARRAY['manual_seed', 'youtube', 'rust', 'crazy'], 
  'crazy', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=uDu0-SAlpto","source_categories":[{"key":"crazy","label":"Crazy","order":6}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'PYikOcU8S_Q', 
  'I Built the most High IQ solo', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/PYikOcU8S_Q/hqdefault.jpg', 
  'rust crazy base build', 
  'crazy', 
  ARRAY['manual_seed', 'youtube', 'rust', 'crazy'], 
  'crazy', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=PYikOcU8S_Q","source_categories":[{"key":"crazy","label":"Crazy","order":8}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'qofgCkHTYKo', 
  'Craziest Ocean Base 200 IQ', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/qofgCkHTYKo/hqdefault.jpg', 
  'rust crazy base build', 
  'crazy', 
  ARRAY['manual_seed', 'youtube', 'rust', 'crazy'], 
  'crazy', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=qofgCkHTYKo","source_categories":[{"key":"crazy","label":"Crazy","order":9}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'WiCoDOUOouo', 
  'How I Made a BASE for the Craziest', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/WiCoDOUOouo/hqdefault.jpg', 
  'rust crazy base build', 
  'crazy', 
  ARRAY['manual_seed', 'youtube', 'rust', 'crazy'], 
  'crazy', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=WiCoDOUOouo","source_categories":[{"key":"crazy","label":"Crazy","order":12}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'RvyXbRdtRNw', 
  'Am besten versteckte Basis', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/RvyXbRdtRNw/hqdefault.jpg', 
  'rust crazy base build', 
  'crazy', 
  ARRAY['manual_seed', 'youtube', 'rust', 'crazy'], 
  'crazy', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=RvyXbRdtRNw","source_categories":[{"key":"crazy","label":"Crazy","order":13}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '-fWngVZYACU', 
  'I Built the perfect rock base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/-fWngVZYACU/hqdefault.jpg', 
  'rust crazy base build', 
  'crazy', 
  ARRAY['manual_seed', 'youtube', 'rust', 'crazy'], 
  'crazy', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=-fWngVZYACU","source_categories":[{"key":"crazy","label":"Crazy","order":19}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'FD8bQWCvII8', 
  'Ich werde zum Sklaven', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/FD8bQWCvII8/hqdefault.jpg', 
  'rust crazy base build', 
  'crazy', 
  ARRAY['manual_seed', 'youtube', 'rust', 'crazy'], 
  'crazy', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=FD8bQWCvII8","source_categories":[{"key":"crazy","label":"Crazy","order":21}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '4pdcGKuHUSw', 
  'Rust Admin Destroys Cheaters #', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/4pdcGKuHUSw/hqdefault.jpg', 
  'rust cheater exposed admin ban', 
  'cheater_reports', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cheater_reports'], 
  'cheater_reports', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=4pdcGKuHUSw","source_categories":[{"key":"cheater_reports","label":"Hacks (Cheater exposed / bans)","order":2}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'qKErQIf5nN4', 
  'Ich interviewe die größten Cheater', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/qKErQIf5nN4/hqdefault.jpg', 
  'rust cheater exposed admin ban', 
  'cheater_reports', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cheater_reports'], 
  'cheater_reports', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=qKErQIf5nN4","source_categories":[{"key":"cheater_reports","label":"Hacks (Cheater exposed / bans)","order":3}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'bOjTipz-K5Y', 
  'Catching the World''s Most Obvious', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/bOjTipz-K5Y/hqdefault.jpg', 
  'rust cheater exposed admin ban', 
  'cheater_reports', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cheater_reports'], 
  'cheater_reports', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=bOjTipz-K5Y","source_categories":[{"key":"cheater_reports","label":"Hacks (Cheater exposed / bans)","order":4}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'N8v3kBMERMo', 
  'Rust-Admin zerstört Cheater #6', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/N8v3kBMERMo/hqdefault.jpg', 
  'rust cheater exposed admin ban', 
  'cheater_reports', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cheater_reports'], 
  'cheater_reports', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=N8v3kBMERMo","source_categories":[{"key":"cheater_reports","label":"Hacks (Cheater exposed / bans)","order":5}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'Ewbac7lNngM', 
  'Die erbärmlichsten Cheater erwischt', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/Ewbac7lNngM/hqdefault.jpg', 
  'rust cheater exposed admin ban', 
  'cheater_reports', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cheater_reports'], 
  'cheater_reports', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=Ewbac7lNngM","source_categories":[{"key":"cheater_reports","label":"Hacks (Cheater exposed / bans)","order":6}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'N_vbvbNKfiU', 
  'Catching players Rage Hacking', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/N_vbvbNKfiU/hqdefault.jpg', 
  'rust cheater exposed admin ban', 
  'cheater_reports', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cheater_reports'], 
  'cheater_reports', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=N_vbvbNKfiU","source_categories":[{"key":"cheater_reports","label":"Hacks (Cheater exposed / bans)","order":7}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'JN2kCS6GSpE', 
  'Rust Streaming Cheater Exposed', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/JN2kCS6GSpE/hqdefault.jpg', 
  'rust cheater exposed admin ban', 
  'cheater_reports', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cheater_reports'], 
  'cheater_reports', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=JN2kCS6GSpE","source_categories":[{"key":"cheater_reports","label":"Hacks (Cheater exposed / bans)","order":8}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'FVG9drOMcVU', 
  'Stream Sniping Streamers', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/FVG9drOMcVU/hqdefault.jpg', 
  'rust cheater exposed admin ban', 
  'cheater_reports', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cheater_reports'], 
  'cheater_reports', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=FVG9drOMcVU","source_categories":[{"key":"cheater_reports","label":"Hacks (Cheater exposed / bans)","order":9}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'kOUavC21BH8', 
  'Rust – Hackers Caught!', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/kOUavC21BH8/hqdefault.jpg', 
  'rust cheater exposed admin ban', 
  'cheater_reports', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cheater_reports'], 
  'cheater_reports', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=kOUavC21BH8","source_categories":[{"key":"cheater_reports","label":"Hacks (Cheater exposed / bans)","order":10}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'H_DwbZB4sKI', 
  'Der Cheat, der Rust tötet', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/H_DwbZB4sKI/hqdefault.jpg', 
  'rust cheater exposed admin ban', 
  'cheater_reports', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cheater_reports'], 
  'cheater_reports', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=H_DwbZB4sKI","source_categories":[{"key":"cheater_reports","label":"Hacks (Cheater exposed / bans)","order":11}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'RQSf1Hhnkww', 
  'Rust Admin Destroys Cheaters #', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/RQSf1Hhnkww/hqdefault.jpg', 
  'rust cheater exposed admin ban', 
  'cheater_reports', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cheater_reports'], 
  'cheater_reports', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=RQSf1Hhnkww","source_categories":[{"key":"cheater_reports","label":"Hacks (Cheater exposed / bans)","order":12}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'SIyJB7H4ntI', 
  '20 Traps That CAUGHT Millions', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/SIyJB7H4ntI/hqdefault.jpg', 
  'rust cheater exposed admin ban', 
  'cheater_reports', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cheater_reports'], 
  'cheater_reports', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=SIyJB7H4ntI","source_categories":[{"key":"cheater_reports","label":"Hacks (Cheater exposed / bans)","order":13}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'ItoGzEiR6eA', 
  'How Many Cheaters Can i Catch', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/ItoGzEiR6eA/hqdefault.jpg', 
  'rust cheater exposed admin ban', 
  'cheater_reports', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cheater_reports'], 
  'cheater_reports', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=ItoGzEiR6eA","source_categories":[{"key":"cheater_reports","label":"Hacks (Cheater exposed / bans)","order":14}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'HHPf_oyRfsM', 
  'Ich habe einen Hacker erwischt', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/HHPf_oyRfsM/hqdefault.jpg', 
  'rust cheater exposed admin ban', 
  'cheater_reports', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cheater_reports'], 
  'cheater_reports', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=HHPf_oyRfsM","source_categories":[{"key":"cheater_reports","label":"Hacks (Cheater exposed / bans)","order":15}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'pwshoizXEhs', 
  'Catching the Dumbest Hackers', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/pwshoizXEhs/hqdefault.jpg', 
  'rust cheater exposed admin ban', 
  'cheater_reports', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cheater_reports'], 
  'cheater_reports', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=pwshoizXEhs","source_categories":[{"key":"cheater_reports","label":"Hacks (Cheater exposed / bans)","order":16}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'BnnZn2er4iU', 
  'Betrüger mit 4.xxx Std. erwischt', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/BnnZn2er4iU/hqdefault.jpg', 
  'rust cheater exposed admin ban', 
  'cheater_reports', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cheater_reports'], 
  'cheater_reports', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=BnnZn2er4iU","source_categories":[{"key":"cheater_reports","label":"Hacks (Cheater exposed / bans)","order":17}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'UbqQSLtttok', 
  'Why Is Everyone Cheating', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/UbqQSLtttok/hqdefault.jpg', 
  'rust cheater exposed admin ban', 
  'cheater_reports', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cheater_reports'], 
  'cheater_reports', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=UbqQSLtttok","source_categories":[{"key":"cheater_reports","label":"Hacks (Cheater exposed / bans)","order":18}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'I7aaoZA2628', 
  'This Hacker is Caught then Exposed', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/I7aaoZA2628/hqdefault.jpg', 
  'rust cheater exposed admin ban', 
  'cheater_reports', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cheater_reports'], 
  'cheater_reports', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=I7aaoZA2628","source_categories":[{"key":"cheater_reports","label":"Hacks (Cheater exposed / bans)","order":19}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'rqHXH2eeIcU', 
  'Exposing a 4,721 Hour Cheater', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/rqHXH2eeIcU/hqdefault.jpg', 
  'rust cheater exposed admin ban', 
  'cheater_reports', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cheater_reports'], 
  'cheater_reports', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=rqHXH2eeIcU","source_categories":[{"key":"cheater_reports","label":"Hacks (Cheater exposed / bans)","order":20}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'RotHShdxYzE', 
  'i played Rust with a hacker', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/RotHShdxYzE/hqdefault.jpg', 
  'rust cheater exposed admin ban', 
  'cheater_reports', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cheater_reports'], 
  'cheater_reports', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=RotHShdxYzE","source_categories":[{"key":"cheater_reports","label":"Hacks (Cheater exposed / bans)","order":21}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'vaGXv88URVU', 
  'Caught all hackers Doomsday', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/vaGXv88URVU/hqdefault.jpg', 
  'rust cheater exposed admin ban', 
  'cheater_reports', 
  ARRAY['manual_seed', 'youtube', 'rust', 'cheater_reports'], 
  'cheater_reports', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=vaGXv88URVU","source_categories":[{"key":"cheater_reports","label":"Hacks (Cheater exposed / bans)","order":22}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'kr0spV5-NRI', 
  'How to 100% Progress in Rust', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/kr0spV5-NRI/hqdefault.jpg', 
  'rust tips for beginners', 
  'tips', 
  ARRAY['manual_seed', 'youtube', 'rust', 'tips', 'tricks'], 
  'tips', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=kr0spV5-NRI","source_categories":[{"key":"tips","label":"Tips","order":1},{"key":"tricks","label":"Tricks","order":12}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'L1tw1MKqpAc', 
  'Über 100 Rust-Tipps & Tricks', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/L1tw1MKqpAc/hqdefault.jpg', 
  'rust tips for beginners', 
  'tips', 
  ARRAY['manual_seed', 'youtube', 'rust', 'tips', 'tricks'], 
  'tips', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=L1tw1MKqpAc","source_categories":[{"key":"tips","label":"Tips","order":2},{"key":"tricks","label":"Tricks","order":16}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '8n2tptpwQuw', 
  '101 Rust-Tipps, die JEDER Spieler', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/8n2tptpwQuw/hqdefault.jpg', 
  'rust tips for beginners', 
  'tips', 
  ARRAY['manual_seed', 'youtube', 'rust', 'tips'], 
  'tips', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=8n2tptpwQuw","source_categories":[{"key":"tips","label":"Tips","order":3}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'gPa_ZK8JBtw', 
  'Der ultimative Rust-Anfängerleitf.', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/gPa_ZK8JBtw/hqdefault.jpg', 
  'rust tips for beginners', 
  'tips', 
  ARRAY['manual_seed', 'youtube', 'rust', 'tips'], 
  'tips', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=gPa_ZK8JBtw","source_categories":[{"key":"tips","label":"Tips","order":4}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'BCXK-s_sGdU', 
  '100 Erweiterte Tipps', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/BCXK-s_sGdU/hqdefault.jpg', 
  'rust tips for beginners', 
  'tips', 
  ARRAY['manual_seed', 'youtube', 'rust', 'tips', 'tricks'], 
  'tips', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=BCXK-s_sGdU","source_categories":[{"key":"tips","label":"Tips","order":5},{"key":"tricks","label":"Tricks","order":2}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'Wc0ZJo06oAw', 
  'Der ultimative Rust-Anfängerleitf.', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/Wc0ZJo06oAw/hqdefault.jpg', 
  'rust tips for beginners', 
  'tips', 
  ARRAY['manual_seed', 'youtube', 'rust', 'tips'], 
  'tips', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=Wc0ZJo06oAw","source_categories":[{"key":"tips","label":"Tips","order":6}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'RZ1KcBNJzl8', 
  'Über 25 Strategien', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/RZ1KcBNJzl8/hqdefault.jpg', 
  'rust tips for beginners', 
  'tips', 
  ARRAY['manual_seed', 'youtube', 'rust', 'tips', 'tricks'], 
  'tips', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=RZ1KcBNJzl8","source_categories":[{"key":"tips","label":"Tips","order":7},{"key":"tricks","label":"Tricks","order":3}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'ENMi9FVyowI', 
  'Wie man 2025 mit Rust beginnt', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/ENMi9FVyowI/hqdefault.jpg', 
  'rust tips for beginners', 
  'tips', 
  ARRAY['manual_seed', 'youtube', 'rust', 'tips'], 
  'tips', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=ENMi9FVyowI","source_categories":[{"key":"tips","label":"Tips","order":8}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'HtKxMNTOlB4', 
  '20 Rust-Tipps, die ich gerne wusste', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/HtKxMNTOlB4/hqdefault.jpg', 
  'rust tips for beginners', 
  'tips', 
  ARRAY['manual_seed', 'youtube', 'rust', 'tips', 'tricks'], 
  'tips', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=HtKxMNTOlB4","source_categories":[{"key":"tips","label":"Tips","order":9},{"key":"tricks","label":"Tricks","order":18}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'IHP8illM2b4', 
  '20 wichtige Rust-Tipps', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/IHP8illM2b4/hqdefault.jpg', 
  'rust tips for beginners', 
  'tips', 
  ARRAY['manual_seed', 'youtube', 'rust', 'tips'], 
  'tips', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=IHP8illM2b4","source_categories":[{"key":"tips","label":"Tips","order":10}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'NOPWInYpMH4', 
  'Über 20 unverzichtbare Tipps', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/NOPWInYpMH4/hqdefault.jpg', 
  'rust tips for beginners', 
  'tips', 
  ARRAY['manual_seed', 'youtube', 'rust', 'tips', 'tricks'], 
  'tips', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=NOPWInYpMH4","source_categories":[{"key":"tips","label":"Tips","order":11},{"key":"tricks","label":"Tricks","order":19}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'xsq2htu3gy0', 
  '50+ Tips Most Players Miss', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/xsq2htu3gy0/hqdefault.jpg', 
  'rust tips for beginners', 
  'tips', 
  ARRAY['manual_seed', 'youtube', 'rust', 'tips', 'tricks'], 
  'tips', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=xsq2htu3gy0","source_categories":[{"key":"tips","label":"Tips","order":12},{"key":"tricks","label":"Tricks","order":9}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'veGr_qgz3Mk', 
  'Der BESTE Rust Anfänger Guide', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/veGr_qgz3Mk/hqdefault.jpg', 
  'rust tips for beginners', 
  'tips', 
  ARRAY['manual_seed', 'youtube', 'rust', 'tips'], 
  'tips', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=veGr_qgz3Mk","source_categories":[{"key":"tips","label":"Tips","order":13}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'xmfY_V5OA2Y', 
  'Ein vollständiger Leitfaden', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/xmfY_V5OA2Y/hqdefault.jpg', 
  'rust tips for beginners', 
  'tips', 
  ARRAY['manual_seed', 'youtube', 'rust', 'tips'], 
  'tips', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=xmfY_V5OA2Y","source_categories":[{"key":"tips","label":"Tips","order":14}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'Y7d4PMNtxrY', 
  '25 Dinge für jeden Solo', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/Y7d4PMNtxrY/hqdefault.jpg', 
  'rust tips for beginners', 
  'tips', 
  ARRAY['manual_seed', 'youtube', 'rust', 'tips'], 
  'tips', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=Y7d4PMNtxrY","source_categories":[{"key":"tips","label":"Tips","order":15}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '5zEu00BTF_M', 
  'This is How I Solo in 2025', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/5zEu00BTF_M/hqdefault.jpg', 
  'rust tips for beginners', 
  'tips', 
  ARRAY['manual_seed', 'youtube', 'rust', 'tips'], 
  'tips', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=5zEu00BTF_M","source_categories":[{"key":"tips","label":"Tips","order":16}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'Fp2wt5p9_JI', 
  '101 Tipps & Tricks', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/Fp2wt5p9_JI/hqdefault.jpg', 
  'rust tips for beginners', 
  'tips', 
  ARRAY['manual_seed', 'youtube', 'rust', 'tips'], 
  'tips', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=Fp2wt5p9_JI","source_categories":[{"key":"tips","label":"Tips","order":17}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'GMwVPoINdFs', 
  'rust 400fps boost in 31s', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/GMwVPoINdFs/hqdefault.jpg', 
  'rust tips for beginners', 
  'tips', 
  ARRAY['manual_seed', 'youtube', 'rust', 'tips', 'farming'], 
  'tips', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=GMwVPoINdFs","source_categories":[{"key":"tips","label":"Tips","order":19},{"key":"farming","label":"Farming","order":17}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'OgR-ccQhhjU', 
  'The 5 Levels of Solo Rust', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/OgR-ccQhhjU/hqdefault.jpg', 
  'rust tips for beginners', 
  'tips', 
  ARRAY['manual_seed', 'youtube', 'rust', 'tips'], 
  'tips', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=OgR-ccQhhjU","source_categories":[{"key":"tips","label":"Tips","order":20}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'yoCCqn-0uPk', 
  'So bauen Sie 2025 besser', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/yoCCqn-0uPk/hqdefault.jpg', 
  'rust advanced tricks base building', 
  'tricks', 
  ARRAY['manual_seed', 'youtube', 'rust', 'tricks'], 
  'tricks', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=yoCCqn-0uPk","source_categories":[{"key":"tricks","label":"Tricks","order":1}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '2ttzT9QxizI', 
  '101 fortgeschrittene Basis-Tricks', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/2ttzT9QxizI/hqdefault.jpg', 
  'rust advanced tricks base building', 
  'tricks', 
  ARRAY['manual_seed', 'youtube', 'rust', 'tricks'], 
  'tricks', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=2ttzT9QxizI","source_categories":[{"key":"tricks","label":"Tricks","order":4}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '-peI7I0vnqQ', 
  '42 fortgeschrittene Tipps', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/-peI7I0vnqQ/hqdefault.jpg', 
  'rust advanced tricks base building', 
  'tricks', 
  ARRAY['manual_seed', 'youtube', 'rust', 'tricks'], 
  'tricks', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=-peI7I0vnqQ","source_categories":[{"key":"tricks","label":"Tricks","order":5}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'WNF9HIe_ZBA', 
  '25 Erweiterte Bau-Tipps', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/WNF9HIe_ZBA/hqdefault.jpg', 
  'rust advanced tricks base building', 
  'tricks', 
  ARRAY['manual_seed', 'youtube', 'rust', 'tricks'], 
  'tricks', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=WNF9HIe_ZBA","source_categories":[{"key":"tricks","label":"Tricks","order":6}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'M1aSJT5vOTQ', 
  'ADVANCED Base Design Tips', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/M1aSJT5vOTQ/hqdefault.jpg', 
  'rust advanced tricks base building', 
  'tricks', 
  ARRAY['manual_seed', 'youtube', 'rust', 'tricks'], 
  'tricks', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=M1aSJT5vOTQ","source_categories":[{"key":"tricks","label":"Tricks","order":7}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'eimNyx9wWBs', 
  '20+ Must Know Base Building', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/eimNyx9wWBs/hqdefault.jpg', 
  'rust advanced tricks base building', 
  'tricks', 
  ARRAY['manual_seed', 'youtube', 'rust', 'tricks'], 
  'tricks', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=eimNyx9wWBs","source_categories":[{"key":"tricks","label":"Tricks","order":10}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'T_kaQc4E76E', 
  'Amazing Building Tips And Tricks', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/T_kaQc4E76E/hqdefault.jpg', 
  'rust advanced tricks base building', 
  'tricks', 
  ARRAY['manual_seed', 'youtube', 'rust', 'tricks'], 
  'tricks', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=T_kaQc4E76E","source_categories":[{"key":"tricks","label":"Tricks","order":13}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'yvZ-B6v7ato', 
  'Sie verwenden den falschen Foundation', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/yvZ-B6v7ato/hqdefault.jpg', 
  'rust advanced tricks base building', 
  'tricks', 
  ARRAY['manual_seed', 'youtube', 'rust', 'tricks'], 
  'tricks', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=yvZ-B6v7ato","source_categories":[{"key":"tricks","label":"Tricks","order":14}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'tjdleNN3tkM', 
  'Ultimativer Leitfaden Base', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/tjdleNN3tkM/hqdefault.jpg', 
  'rust advanced tricks base building', 
  'tricks', 
  ARRAY['manual_seed', 'youtube', 'rust', 'tricks'], 
  'tricks', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=tjdleNN3tkM","source_categories":[{"key":"tricks","label":"Tricks","order":15}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'o4nX3zlqySQ', 
  'Kurzer Leitfaden für die grüne Karte', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/o4nX3zlqySQ/hqdefault.jpg', 
  'rust green card guide puzzle', 
  'green_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'green_card', 'blue_card'], 
  'green_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=o4nX3zlqySQ","source_categories":[{"key":"green_card","label":"Green Card","order":1},{"key":"blue_card","label":"Blue Card","order":6}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'KIW4HFCP-0E', 
  'Every Green Keycard Location', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/KIW4HFCP-0E/hqdefault.jpg', 
  'rust green card guide puzzle', 
  'green_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'green_card'], 
  'green_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=KIW4HFCP-0E","source_categories":[{"key":"green_card","label":"Green Card","order":2}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'mn6ypbkuNhQ', 
  'Alle Fundorte der Schlüsselkarten', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/mn6ypbkuNhQ/hqdefault.jpg', 
  'rust green card guide puzzle', 
  'green_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'green_card', 'blue_card', 'red_card'], 
  'green_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=mn6ypbkuNhQ","source_categories":[{"key":"green_card","label":"Green Card","order":3},{"key":"blue_card","label":"Blue Card","order":4},{"key":"red_card","label":"Red Card","order":3}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '4SwomyjvyyY', 
  'Junkyard Monument Guide', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/4SwomyjvyyY/hqdefault.jpg', 
  'rust green card guide puzzle', 
  'green_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'green_card'], 
  'green_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=4SwomyjvyyY","source_categories":[{"key":"green_card","label":"Green Card","order":5}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '_AQZ-4b7kxk', 
  'How to Get Green Cards', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/_AQZ-4b7kxk/hqdefault.jpg', 
  'rust green card guide puzzle', 
  'green_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'green_card'], 
  'green_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=_AQZ-4b7kxk","source_categories":[{"key":"green_card","label":"Green Card","order":6}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'Se77Bsld9PA', 
  'Monument Puzzles – Airfield', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/Se77Bsld9PA/hqdefault.jpg', 
  'rust green card guide puzzle', 
  'green_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'green_card', 'blue_card'], 
  'green_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=Se77Bsld9PA","source_categories":[{"key":"green_card","label":"Green Card","order":7},{"key":"blue_card","label":"Blue Card","order":11}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'Rey8Ad_nt3Y', 
  'Launch Site Keycard Puzzle', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/Rey8Ad_nt3Y/hqdefault.jpg', 
  'rust green card guide puzzle', 
  'green_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'green_card', 'blue_card', 'red_card'], 
  'green_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=Rey8Ad_nt3Y","source_categories":[{"key":"green_card","label":"Green Card","order":8},{"key":"blue_card","label":"Blue Card","order":14},{"key":"red_card","label":"Red Card","order":12}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'jZeh4NVhfoM', 
  'Full Green Card Guide', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/jZeh4NVhfoM/hqdefault.jpg', 
  'rust green card guide puzzle', 
  'green_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'green_card'], 
  'green_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=jZeh4NVhfoM","source_categories":[{"key":"green_card","label":"Green Card","order":9}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'lBYv31yB7yo', 
  'Everything to Know About Dome', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/lBYv31yB7yo/hqdefault.jpg', 
  'rust green card guide puzzle', 
  'green_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'green_card'], 
  'green_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=lBYv31yB7yo","source_categories":[{"key":"green_card","label":"Green Card","order":10}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'NxTJpZuDYQg', 
  'Lighthouse How to Get', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/NxTJpZuDYQg/hqdefault.jpg', 
  'rust green card guide puzzle', 
  'green_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'green_card'], 
  'green_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=NxTJpZuDYQg","source_categories":[{"key":"green_card","label":"Green Card","order":11}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '_VkIBpD47dw', 
  'Jeder Standort eines Blueprints', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/_VkIBpD47dw/hqdefault.jpg', 
  'rust green card guide puzzle', 
  'green_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'green_card'], 
  'green_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=_VkIBpD47dw","source_categories":[{"key":"green_card","label":"Green Card","order":12}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '2P4ffv89zUU', 
  'Everything to Know About Radtown', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/2P4ffv89zUU/hqdefault.jpg', 
  'rust green card guide puzzle', 
  'green_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'green_card'], 
  'green_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=2P4ffv89zUU","source_categories":[{"key":"green_card","label":"Green Card","order":13}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'mLIPKRaWcLs', 
  'The ULTIMATE Harbour Keycard', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/mLIPKRaWcLs/hqdefault.jpg', 
  'rust green card guide puzzle', 
  'green_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'green_card'], 
  'green_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=mLIPKRaWcLs","source_categories":[{"key":"green_card","label":"Green Card","order":14}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'VM31ke46f_0', 
  'PC & Konsole: Alle Rätsel', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/VM31ke46f_0/hqdefault.jpg', 
  'rust green card guide puzzle', 
  'green_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'green_card'], 
  'green_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=VM31ke46f_0","source_categories":[{"key":"green_card","label":"Green Card","order":15}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '8ZVhgmCwO7U', 
  'Rust Solo Survival Guide EP', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/8ZVhgmCwO7U/hqdefault.jpg', 
  'rust green card guide puzzle', 
  'green_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'green_card'], 
  'green_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=8ZVhgmCwO7U","source_categories":[{"key":"green_card","label":"Green Card","order":16}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'btpeaLGEVe8', 
  'How to get Key Cards (G/B/R)', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/btpeaLGEVe8/hqdefault.jpg', 
  'rust green card guide puzzle', 
  'green_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'green_card', 'blue_card'], 
  'green_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=btpeaLGEVe8","source_categories":[{"key":"green_card","label":"Green Card","order":17},{"key":"blue_card","label":"Blue Card","order":19}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'Uq0sZWbh314', 
  'Gas Station How to Get', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/Uq0sZWbh314/hqdefault.jpg', 
  'rust green card guide puzzle', 
  'green_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'green_card'], 
  'green_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=Uq0sZWbh314","source_categories":[{"key":"green_card","label":"Green Card","order":18}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '7ikJ3ADV-qE', 
  'How To Get Green Card', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/7ikJ3ADV-qE/hqdefault.jpg', 
  'rust green card guide puzzle', 
  'green_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'green_card'], 
  'green_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=7ikJ3ADV-qE","source_categories":[{"key":"green_card","label":"Green Card","order":19}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'nM-ktHFaDjs', 
  'Every Way to Get a Blue Keycard', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/nM-ktHFaDjs/hqdefault.jpg', 
  'rust blue card guide puzzle', 
  'blue_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'blue_card'], 
  'blue_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=nM-ktHFaDjs","source_categories":[{"key":"blue_card","label":"Blue Card","order":1}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'zwren1h2KiQ', 
  'Airfield Blue Card Puzzle', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/zwren1h2KiQ/hqdefault.jpg', 
  'rust blue card guide puzzle', 
  'blue_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'blue_card'], 
  'blue_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=zwren1h2KiQ","source_categories":[{"key":"blue_card","label":"Blue Card","order":3}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'StzPqP_5csQ', 
  'PC & Console: All Blue Keycard', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/StzPqP_5csQ/hqdefault.jpg', 
  'rust blue card guide puzzle', 
  'blue_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'blue_card'], 
  'blue_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=StzPqP_5csQ","source_categories":[{"key":"blue_card","label":"Blue Card","order":5}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'IAcleSkW_J4', 
  'Arctic Research Base Blue Card', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/IAcleSkW_J4/hqdefault.jpg', 
  'rust blue card guide puzzle', 
  'blue_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'blue_card'], 
  'blue_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=IAcleSkW_J4","source_categories":[{"key":"blue_card","label":"Blue Card","order":7}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '_TJdj6p2J0o', 
  'All Blue Keycard Locations', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/_TJdj6p2J0o/hqdefault.jpg', 
  'rust blue card guide puzzle', 
  'blue_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'blue_card'], 
  'blue_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=_TJdj6p2J0o","source_categories":[{"key":"blue_card","label":"Blue Card","order":8}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'RjuJEM20Xww', 
  'How To Do Harbor for Blue Card', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/RjuJEM20Xww/hqdefault.jpg', 
  'rust blue card guide puzzle', 
  'blue_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'blue_card'], 
  'blue_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=RjuJEM20Xww","source_categories":[{"key":"blue_card","label":"Blue Card","order":9}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'u-6l_626F-k', 
  'Complete Launch Site Red Card', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/u-6l_626F-k/hqdefault.jpg', 
  'rust blue card guide puzzle', 
  'blue_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'blue_card', 'red_card'], 
  'blue_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=u-6l_626F-k","source_categories":[{"key":"blue_card","label":"Blue Card","order":10},{"key":"red_card","label":"Red Card","order":11}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'N9hmKh9eGd8', 
  'Solo Survival Guide: Get Blue', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/N9hmKh9eGd8/hqdefault.jpg', 
  'rust blue card guide puzzle', 
  'blue_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'blue_card'], 
  'blue_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=N9hmKh9eGd8","source_categories":[{"key":"blue_card","label":"Blue Card","order":12}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'a_jobWd6QB4', 
  'How to Do the Airfield Blue Card', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/a_jobWd6QB4/hqdefault.jpg', 
  'rust blue card guide puzzle', 
  'blue_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'blue_card'], 
  'blue_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=a_jobWd6QB4","source_categories":[{"key":"blue_card","label":"Blue Card","order":13}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'Q8sDqo5Om7Q', 
  'Trainyard Blue Card Puzzle', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/Q8sDqo5Om7Q/hqdefault.jpg', 
  'rust blue card guide puzzle', 
  'blue_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'blue_card'], 
  'blue_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=Q8sDqo5Om7Q","source_categories":[{"key":"blue_card","label":"Blue Card","order":15}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '_Ws8O3FBiSQ', 
  'Blue Card Monument Tutorial', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/_Ws8O3FBiSQ/hqdefault.jpg', 
  'rust blue card guide puzzle', 
  'blue_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'blue_card'], 
  'blue_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=_Ws8O3FBiSQ","source_categories":[{"key":"blue_card","label":"Blue Card","order":16}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'eHqEnfsUDdA', 
  'Arctic Base Blue Card Puzzle', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/eHqEnfsUDdA/hqdefault.jpg', 
  'rust blue card guide puzzle', 
  'blue_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'blue_card'], 
  'blue_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=eHqEnfsUDdA","source_categories":[{"key":"blue_card","label":"Blue Card","order":17}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'Qa7o0MKg9tM', 
  'Full Blue Card Guide', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/Qa7o0MKg9tM/hqdefault.jpg', 
  'rust blue card guide puzzle', 
  'blue_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'blue_card'], 
  'blue_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=Qa7o0MKg9tM","source_categories":[{"key":"blue_card","label":"Blue Card","order":18}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'wwaRs6C38YI', 
  'Rote Karte – Leitfaden', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/wwaRs6C38YI/hqdefault.jpg', 
  'rust blue card guide puzzle', 
  'blue_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'blue_card', 'red_card'], 
  'blue_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=wwaRs6C38YI","source_categories":[{"key":"blue_card","label":"Blue Card","order":20},{"key":"red_card","label":"Red Card","order":8}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'vocOYgg9rko', 
  'Satelliten-Karte', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/vocOYgg9rko/hqdefault.jpg', 
  'rust blue card guide puzzle', 
  'blue_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'blue_card'], 
  'blue_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=vocOYgg9rko","source_categories":[{"key":"blue_card","label":"Blue Card","order":21}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'wgX-PAr69xQ', 
  'Red Card – Power Plant', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/wgX-PAr69xQ/hqdefault.jpg', 
  'rust blue card guide puzzle', 
  'blue_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'blue_card'], 
  'blue_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=wgX-PAr69xQ","source_categories":[{"key":"blue_card","label":"Blue Card","order":22}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'YemfKc11V1o', 
  'Every Red Keycard Location', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/YemfKc11V1o/hqdefault.jpg', 
  'rust red card guide puzzle', 
  'red_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'red_card'], 
  'red_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=YemfKc11V1o","source_categories":[{"key":"red_card","label":"Red Card","order":1}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'uSoGfcTm7tQ', 
  'how to get FREE red card', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/uSoGfcTm7tQ/hqdefault.jpg', 
  'rust red card guide puzzle', 
  'red_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'red_card'], 
  'red_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=uSoGfcTm7tQ","source_categories":[{"key":"red_card","label":"Red Card","order":2}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'gs38o-h1go0', 
  'All Red Keycard Locations', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/gs38o-h1go0/hqdefault.jpg', 
  'rust red card guide puzzle', 
  'red_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'red_card'], 
  'red_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=gs38o-h1go0","source_categories":[{"key":"red_card","label":"Red Card","order":4}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'YFCFr2oKCUk', 
  'Launch Site Red Card Puzzle', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/YFCFr2oKCUk/hqdefault.jpg', 
  'rust red card guide puzzle', 
  'red_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'red_card'], 
  'red_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=YFCFr2oKCUk","source_categories":[{"key":"red_card","label":"Red Card","order":5}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'Ax2pL0N7Xww', 
  'Military Tunnels Red Card', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/Ax2pL0N7Xww/hqdefault.jpg', 
  'rust red card guide puzzle', 
  'red_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'red_card'], 
  'red_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=Ax2pL0N7Xww","source_categories":[{"key":"red_card","label":"Red Card","order":6}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '7r_hCAsKmkU', 
  'All Red Key Card Monuments', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/7r_hCAsKmkU/hqdefault.jpg', 
  'rust red card guide puzzle', 
  'red_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'red_card'], 
  'red_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=7r_hCAsKmkU","source_categories":[{"key":"red_card","label":"Red Card","order":7}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'P-Yke_KAwS0', 
  'How To Do Water Treatment Puzzle', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/P-Yke_KAwS0/hqdefault.jpg', 
  'rust red card guide puzzle', 
  'red_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'red_card'], 
  'red_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=P-Yke_KAwS0","source_categories":[{"key":"red_card","label":"Red Card","order":9}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'NJL6BcBdymA', 
  'How to Get Red Cards', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/NJL6BcBdymA/hqdefault.jpg', 
  'rust red card guide puzzle', 
  'red_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'red_card'], 
  'red_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=NJL6BcBdymA","source_categories":[{"key":"red_card","label":"Red Card","order":10}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'Inn345Rwd8I', 
  'Ultimativer Leitfaden Karten', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/Inn345Rwd8I/hqdefault.jpg', 
  'rust red card guide puzzle', 
  'red_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'red_card'], 
  'red_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=Inn345Rwd8I","source_categories":[{"key":"red_card","label":"Red Card","order":13}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'vVLL4n1L7zg', 
  'Launch Site Rote Schlüsselkarte', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/vVLL4n1L7zg/hqdefault.jpg', 
  'rust red card guide puzzle', 
  'red_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'red_card'], 
  'red_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=vVLL4n1L7zg","source_categories":[{"key":"red_card","label":"Red Card","order":14}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'nAS1vE8EKCE', 
  'That''s Gotta Be A Red Card', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/nAS1vE8EKCE/hqdefault.jpg', 
  'rust red card guide puzzle', 
  'red_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'red_card'], 
  'red_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=nAS1vE8EKCE","source_categories":[{"key":"red_card","label":"Red Card","order":15}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'EQ55byoq0gE', 
  'Airfield Puzzle – Red Keycard', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/EQ55byoq0gE/hqdefault.jpg', 
  'rust red card guide puzzle', 
  'red_card', 
  ARRAY['manual_seed', 'youtube', 'rust', 'red_card'], 
  'red_card', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=EQ55byoq0gE","source_categories":[{"key":"red_card","label":"Red Card","order":16}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'OaB2UmARfMY', 
  'A Solo''s Journey III', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/OaB2UmARfMY/hqdefault.jpg', 
  'rust solo journey wipe movie', 
  'journey_wipe', 
  ARRAY['manual_seed', 'youtube', 'rust', 'journey_wipe'], 
  'journey_wipe', 
  NULL, 
  'wipe', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=OaB2UmARfMY","source_categories":[{"key":"journey_wipe","label":"Allgemein (Journey / Movie / Wipe)","order":1}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'd7A0zAbOEGg', 
  'A Solo''s 200 Hour Journey', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/d7A0zAbOEGg/hqdefault.jpg', 
  'rust solo journey wipe movie', 
  'journey_wipe', 
  ARRAY['manual_seed', 'youtube', 'rust', 'journey_wipe'], 
  'journey_wipe', 
  NULL, 
  'wipe', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=d7A0zAbOEGg","source_categories":[{"key":"journey_wipe","label":"Allgemein (Journey / Movie / Wipe)","order":2}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'v5IBfDJ1QOs', 
  'Die unerzählte Reise eines Solo', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/v5IBfDJ1QOs/hqdefault.jpg', 
  'rust solo journey wipe movie', 
  'journey_wipe', 
  ARRAY['manual_seed', 'youtube', 'rust', 'journey_wipe'], 
  'journey_wipe', 
  NULL, 
  'wipe', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=v5IBfDJ1QOs","source_categories":[{"key":"journey_wipe","label":"Allgemein (Journey / Movie / Wipe)","order":3}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'Mvwa3-TRWmY', 
  'So spielt ein 10.000-Stunden-Solo', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/Mvwa3-TRWmY/hqdefault.jpg', 
  'rust solo journey wipe movie', 
  'journey_wipe', 
  ARRAY['manual_seed', 'youtube', 'rust', 'journey_wipe'], 
  'journey_wipe', 
  NULL, 
  'wipe', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=Mvwa3-TRWmY","source_categories":[{"key":"journey_wipe","label":"Allgemein (Journey / Movie / Wipe)","order":4}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'XXieRJ3Urkg', 
  'Mein fehlerfreiester Wipe', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/XXieRJ3Urkg/hqdefault.jpg', 
  'rust solo journey wipe movie', 
  'journey_wipe', 
  ARRAY['manual_seed', 'youtube', 'rust', 'journey_wipe'], 
  'journey_wipe', 
  NULL, 
  'wipe', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=XXieRJ3Urkg","source_categories":[{"key":"journey_wipe","label":"Allgemein (Journey / Movie / Wipe)","order":6}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'AssWbNykGto', 
  'My GREATEST Solo Island Wipeday', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/AssWbNykGto/hqdefault.jpg', 
  'rust solo journey wipe movie', 
  'journey_wipe', 
  ARRAY['manual_seed', 'youtube', 'rust', 'journey_wipe'], 
  'journey_wipe', 
  NULL, 
  'wipe', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=AssWbNykGto","source_categories":[{"key":"journey_wipe","label":"Allgemein (Journey / Movie / Wipe)","order":7}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'QB9lzogkH3Y', 
  'When Two Farmers Play Official', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/QB9lzogkH3Y/hqdefault.jpg', 
  'rust solo journey wipe movie', 
  'journey_wipe', 
  ARRAY['manual_seed', 'youtube', 'rust', 'journey_wipe'], 
  'journey_wipe', 
  NULL, 
  'wipe', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=QB9lzogkH3Y","source_categories":[{"key":"journey_wipe","label":"Allgemein (Journey / Movie / Wipe)","order":8}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'W6ukaeJR_Xw', 
  'Der Wipe meines Lebens', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/W6ukaeJR_Xw/hqdefault.jpg', 
  'rust solo journey wipe movie', 
  'journey_wipe', 
  ARRAY['manual_seed', 'youtube', 'rust', 'journey_wipe'], 
  'journey_wipe', 
  NULL, 
  'wipe', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=W6ukaeJR_Xw","source_categories":[{"key":"journey_wipe","label":"Allgemein (Journey / Movie / Wipe)","order":9}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'VCkd5L8HUo8', 
  'I played Solo Wipeday for 24h', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/VCkd5L8HUo8/hqdefault.jpg', 
  'rust solo journey wipe movie', 
  'journey_wipe', 
  ARRAY['manual_seed', 'youtube', 'rust', 'journey_wipe'], 
  'journey_wipe', 
  NULL, 
  'wipe', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=VCkd5L8HUo8","source_categories":[{"key":"journey_wipe","label":"Allgemein (Journey / Movie / Wipe)","order":10}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'LLJtKP9Xw_E', 
  'A Solo''s Journey to the Top', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/LLJtKP9Xw_E/hqdefault.jpg', 
  'rust solo journey wipe movie', 
  'journey_wipe', 
  ARRAY['manual_seed', 'youtube', 'rust', 'journey_wipe'], 
  'journey_wipe', 
  NULL, 
  'wipe', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=LLJtKP9Xw_E","source_categories":[{"key":"journey_wipe","label":"Allgemein (Journey / Movie / Wipe)","order":12}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'DuvWw8awbrM', 
  'Solos Force Wipe God Rock', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/DuvWw8awbrM/hqdefault.jpg', 
  'rust solo journey wipe movie', 
  'journey_wipe', 
  ARRAY['manual_seed', 'youtube', 'rust', 'journey_wipe'], 
  'journey_wipe', 
  NULL, 
  'wipe', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=DuvWw8awbrM","source_categories":[{"key":"journey_wipe","label":"Allgemein (Journey / Movie / Wipe)","order":13}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '6xqSfyplgRw', 
  '100,000 Hours VS Wipe Day', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/6xqSfyplgRw/hqdefault.jpg', 
  'rust solo journey wipe movie', 
  'journey_wipe', 
  ARRAY['manual_seed', 'youtube', 'rust', 'journey_wipe'], 
  'journey_wipe', 
  NULL, 
  'wipe', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=6xqSfyplgRw","source_categories":[{"key":"journey_wipe","label":"Allgemein (Journey / Movie / Wipe)","order":14}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'N7K_ecsYqdE', 
  'My Greatest Force Wipe', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/N7K_ecsYqdE/hqdefault.jpg', 
  'rust solo journey wipe movie', 
  'journey_wipe', 
  ARRAY['manual_seed', 'youtube', 'rust', 'journey_wipe'], 
  'journey_wipe', 
  NULL, 
  'wipe', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=N7K_ecsYqdE","source_categories":[{"key":"journey_wipe","label":"Allgemein (Journey / Movie / Wipe)","order":15}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'q3LXoZhiZqQ', 
  'Wie ein 100.000-Stunden-...', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/q3LXoZhiZqQ/hqdefault.jpg', 
  'rust solo journey wipe movie', 
  'journey_wipe', 
  ARRAY['manual_seed', 'youtube', 'rust', 'journey_wipe'], 
  'journey_wipe', 
  NULL, 
  'wipe', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=q3LXoZhiZqQ","source_categories":[{"key":"journey_wipe","label":"Allgemein (Journey / Movie / Wipe)","order":16}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'h_paX0IlAEk', 
  'How a 40,000 Hour Trio', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/h_paX0IlAEk/hqdefault.jpg', 
  'rust solo journey wipe movie', 
  'journey_wipe', 
  ARRAY['manual_seed', 'youtube', 'rust', 'journey_wipe'], 
  'journey_wipe', 
  NULL, 
  'wipe', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=h_paX0IlAEk","source_categories":[{"key":"journey_wipe","label":"Allgemein (Journey / Movie / Wipe)","order":17}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'ZhC1ZyLar5o', 
  'Solo Wipe Day on New Apartments', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/ZhC1ZyLar5o/hqdefault.jpg', 
  'rust solo journey wipe movie', 
  'journey_wipe', 
  ARRAY['manual_seed', 'youtube', 'rust', 'journey_wipe'], 
  'journey_wipe', 
  NULL, 
  'wipe', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=ZhC1ZyLar5o","source_categories":[{"key":"journey_wipe","label":"Allgemein (Journey / Movie / Wipe)","order":18}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '-vOyvqogFA8', 
  'Wir wurden am Wischtag zur Beute', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/-vOyvqogFA8/hqdefault.jpg', 
  'rust solo journey wipe movie', 
  'journey_wipe', 
  ARRAY['manual_seed', 'youtube', 'rust', 'journey_wipe'], 
  'journey_wipe', 
  NULL, 
  'wipe', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=-vOyvqogFA8","source_categories":[{"key":"journey_wipe","label":"Allgemein (Journey / Movie / Wipe)","order":19}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'JBe18NNWnhM', 
  'The Fastest Solo Speedruns', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/JBe18NNWnhM/hqdefault.jpg', 
  'rust solo journey wipe movie', 
  'journey_wipe', 
  ARRAY['manual_seed', 'youtube', 'rust', 'journey_wipe'], 
  'journey_wipe', 
  NULL, 
  'wipe', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=JBe18NNWnhM","source_categories":[{"key":"journey_wipe","label":"Allgemein (Journey / Movie / Wipe)","order":20}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '8YQRpg68NzE', 
  'My Best Trio Force Wipe', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/8YQRpg68NzE/hqdefault.jpg', 
  'rust solo journey wipe movie', 
  'journey_wipe', 
  ARRAY['manual_seed', 'youtube', 'rust', 'journey_wipe'], 
  'journey_wipe', 
  NULL, 
  'wipe', 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=8YQRpg68NzE","source_categories":[{"key":"journey_wipe","label":"Allgemein (Journey / Movie / Wipe)","order":21}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'EeLINRhtBG0', 
  'Farming 3.0 – Ultimativer Leitfaden', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/EeLINRhtBG0/hqdefault.jpg', 
  'rust farming guide clone berry tea', 
  'farming', 
  ARRAY['manual_seed', 'youtube', 'rust', 'farming'], 
  'farming', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=EeLINRhtBG0","source_categories":[{"key":"farming","label":"Farming","order":1}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'p3OdpHJNIl4', 
  'Farming & Genetics Guide', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/p3OdpHJNIl4/hqdefault.jpg', 
  'rust farming guide clone berry tea', 
  'farming', 
  ARRAY['manual_seed', 'youtube', 'rust', 'farming'], 
  'farming', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=p3OdpHJNIl4","source_categories":[{"key":"farming","label":"Farming","order":2}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '5byLsUwm6kI', 
  'Intro to Tea Farming', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/5byLsUwm6kI/hqdefault.jpg', 
  'rust farming guide clone berry tea', 
  'farming', 
  ARRAY['manual_seed', 'youtube', 'rust', 'farming'], 
  'farming', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=5byLsUwm6kI","source_categories":[{"key":"farming","label":"Farming","order":3}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'uRtzUj2uzcs', 
  'The EASIEST Way for Solos to Get', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/uRtzUj2uzcs/hqdefault.jpg', 
  'rust farming guide clone berry tea', 
  'farming', 
  ARRAY['manual_seed', 'youtube', 'rust', 'farming'], 
  'farming', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=uRtzUj2uzcs","source_categories":[{"key":"farming","label":"Farming","order":4}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'mgTUFN7XjY8', 
  'Fortgeschrittener Leitfaden', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/mgTUFN7XjY8/hqdefault.jpg', 
  'rust farming guide clone berry tea', 
  'farming', 
  ARRAY['manual_seed', 'youtube', 'rust', 'farming'], 
  'farming', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=mgTUFN7XjY8","source_categories":[{"key":"farming","label":"Farming","order":5}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'eavfD_HCHu4', 
  '10 Farming-Tipps – Guide', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/eavfD_HCHu4/hqdefault.jpg', 
  'rust farming guide clone berry tea', 
  'farming', 
  ARRAY['manual_seed', 'youtube', 'rust', 'farming'], 
  'farming', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=eavfD_HCHu4","source_categories":[{"key":"farming","label":"Farming","order":6}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'm9y6ACVQR-M', 
  'Crossbreed a God Clone (lazy)', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/m9y6ACVQR-M/hqdefault.jpg', 
  'rust farming guide clone berry tea', 
  'farming', 
  ARRAY['manual_seed', 'youtube', 'rust', 'farming'], 
  'farming', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=m9y6ACVQR-M","source_categories":[{"key":"farming","label":"Farming","order":7}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'QuHwEEiSnUE', 
  'Ich habe einem PVP-Profi', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/QuHwEEiSnUE/hqdefault.jpg', 
  'rust farming guide clone berry tea', 
  'farming', 
  ARRAY['manual_seed', 'youtube', 'rust', 'farming'], 
  'farming', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=QuHwEEiSnUE","source_categories":[{"key":"farming","label":"Farming","order":8}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'O5bmJK5wphk', 
  'Farming-Guide: So erreichst du', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/O5bmJK5wphk/hqdefault.jpg', 
  'rust farming guide clone berry tea', 
  'farming', 
  ARRAY['manual_seed', 'youtube', 'rust', 'farming'], 
  'farming', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=O5bmJK5wphk","source_categories":[{"key":"farming","label":"Farming","order":9}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '7s-RaVquK_I', 
  'Knotenpunkte-Leitfaden', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/7s-RaVquK_I/hqdefault.jpg', 
  'rust farming guide clone berry tea', 
  'farming', 
  ARRAY['manual_seed', 'youtube', 'rust', 'farming'], 
  'farming', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=7s-RaVquK_I","source_categories":[{"key":"farming","label":"Farming","order":10}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'Q_5GK7LV5oo', 
  'Veteran''s Ultimate Beginner', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/Q_5GK7LV5oo/hqdefault.jpg', 
  'rust farming guide clone berry tea', 
  'farming', 
  ARRAY['manual_seed', 'youtube', 'rust', 'farming'], 
  'farming', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=Q_5GK7LV5oo","source_categories":[{"key":"farming","label":"Farming","order":11}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'rrRDpnieufw', 
  'How To Farm The New Broken', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/rrRDpnieufw/hqdefault.jpg', 
  'rust farming guide clone berry tea', 
  'farming', 
  ARRAY['manual_seed', 'youtube', 'rust', 'farming'], 
  'farming', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=rrRDpnieufw","source_categories":[{"key":"farming","label":"Farming","order":12}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'aj9pMpehhEI', 
  'Best Ways to Farm Scrap', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/aj9pMpehhEI/hqdefault.jpg', 
  'rust farming guide clone berry tea', 
  'farming', 
  ARRAY['manual_seed', 'youtube', 'rust', 'farming'], 
  'farming', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=aj9pMpehhEI","source_categories":[{"key":"farming","label":"Farming","order":13}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '4ElucWHyfbM', 
  'How to get perfect clones', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/4ElucWHyfbM/hqdefault.jpg', 
  'rust farming guide clone berry tea', 
  'farming', 
  ARRAY['manual_seed', 'youtube', 'rust', 'farming'], 
  'farming', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=4ElucWHyfbM","source_categories":[{"key":"farming","label":"Farming","order":14}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'quk7pgh8-WE', 
  'Rust Farming Update!', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/quk7pgh8-WE/hqdefault.jpg', 
  'rust farming guide clone berry tea', 
  'farming', 
  ARRAY['manual_seed', 'youtube', 'rust', 'farming'], 
  'farming', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=quk7pgh8-WE","source_categories":[{"key":"farming","label":"Farming","order":15}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'INvqPFsvD0E', 
  'Farming Complete Guide', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/INvqPFsvD0E/hqdefault.jpg', 
  'rust farming guide clone berry tea', 
  'farming', 
  ARRAY['manual_seed', 'youtube', 'rust', 'farming'], 
  'farming', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=INvqPFsvD0E","source_categories":[{"key":"farming","label":"Farming","order":16}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'vPVyWbT4hh0', 
  'Kurzanleitung – 9000 Schrott', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/vPVyWbT4hh0/hqdefault.jpg', 
  'rust farming guide clone berry tea', 
  'farming', 
  ARRAY['manual_seed', 'youtube', 'rust', 'farming'], 
  'farming', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=vPVyWbT4hh0","source_categories":[{"key":"farming","label":"Farming","order":18}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '2JO8g8lvYU8', 
  'How i Built a Tea Farm', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/2JO8g8lvYU8/hqdefault.jpg', 
  'rust farming guide clone berry tea', 
  'farming', 
  ARRAY['manual_seed', 'youtube', 'rust', 'farming'], 
  'farming', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=2JO8g8lvYU8","source_categories":[{"key":"farming","label":"Farming","order":19}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'BT31_nCkGbY', 
  'This Update Changed Farming', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/BT31_nCkGbY/hqdefault.jpg', 
  'rust farming guide clone berry tea', 
  'farming', 
  ARRAY['manual_seed', 'youtube', 'rust', 'farming'], 
  'farming', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=BT31_nCkGbY","source_categories":[{"key":"farming","label":"Farming","order":21}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'PeKjjY0nxvA', 
  'So lässt sich das Rad austricksen', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/PeKjjY0nxvA/hqdefault.jpg', 
  'rust bandit camp casino gambling guide', 
  'bandit_camp_casino', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bandit_camp_casino'], 
  'bandit_camp_casino', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=PeKjjY0nxvA","source_categories":[{"key":"bandit_camp_casino","label":"Gambling / Bandit Camp Casino","order":1}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'IP_JtslXipY', 
  'Bandit Camp Guide | Tutorial', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/IP_JtslXipY/hqdefault.jpg', 
  'rust bandit camp casino gambling guide', 
  'bandit_camp_casino', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bandit_camp_casino'], 
  'bandit_camp_casino', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=IP_JtslXipY","source_categories":[{"key":"bandit_camp_casino","label":"Gambling / Bandit Camp Casino","order":2}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'zpLDzsCzxAQ', 
  'Rust Gamblers Don''t Know this', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/zpLDzsCzxAQ/hqdefault.jpg', 
  'rust bandit camp casino gambling guide', 
  'bandit_camp_casino', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bandit_camp_casino'], 
  'bandit_camp_casino', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=zpLDzsCzxAQ","source_categories":[{"key":"bandit_camp_casino","label":"Gambling / Bandit Camp Casino","order":3}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'o5M5DOG733Y', 
  'bandit.camp BEST STRATEGY', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/o5M5DOG733Y/hqdefault.jpg', 
  'rust bandit camp casino gambling guide', 
  'bandit_camp_casino', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bandit_camp_casino'], 
  'bandit_camp_casino', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=o5M5DOG733Y","source_categories":[{"key":"bandit_camp_casino","label":"Gambling / Bandit Camp Casino","order":4}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'BQD_28bbY30', 
  'how i turned 0 scrap into 5000', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/BQD_28bbY30/hqdefault.jpg', 
  'rust bandit camp casino gambling guide', 
  'bandit_camp_casino', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bandit_camp_casino'], 
  'bandit_camp_casino', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=BQD_28bbY30","source_categories":[{"key":"bandit_camp_casino","label":"Gambling / Bandit Camp Casino","order":5}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '2kyv2IFJeCs', 
  'I Turned $13 Into $6,000', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/2kyv2IFJeCs/hqdefault.jpg', 
  'rust bandit camp casino gambling guide', 
  'bandit_camp_casino', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bandit_camp_casino'], 
  'bandit_camp_casino', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=2kyv2IFJeCs","source_categories":[{"key":"bandit_camp_casino","label":"Gambling / Bandit Camp Casino","order":6}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'bJAi_jqS5Vs', 
  'How to Become a BlackJack Pro', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/bJAi_jqS5Vs/hqdefault.jpg', 
  'rust bandit camp casino gambling guide', 
  'bandit_camp_casino', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bandit_camp_casino'], 
  'bandit_camp_casino', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=bJAi_jqS5Vs","source_categories":[{"key":"bandit_camp_casino","label":"Gambling / Bandit Camp Casino","order":7}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '2OejLTtPrY4', 
  'The Best Gambling Strategy', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/2OejLTtPrY4/hqdefault.jpg', 
  'rust bandit camp casino gambling guide', 
  'bandit_camp_casino', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bandit_camp_casino'], 
  'bandit_camp_casino', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=2OejLTtPrY4","source_categories":[{"key":"bandit_camp_casino","label":"Gambling / Bandit Camp Casino","order":8}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'syv4K_XcZLY', 
  'Bandit Camp Master Tour Guide', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/syv4K_XcZLY/hqdefault.jpg', 
  'rust bandit camp casino gambling guide', 
  'bandit_camp_casino', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bandit_camp_casino'], 
  'bandit_camp_casino', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=syv4K_XcZLY","source_categories":[{"key":"bandit_camp_casino","label":"Gambling / Bandit Camp Casino","order":9}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'gNehvxf013k', 
  'How to Win at Roulette', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/gNehvxf013k/hqdefault.jpg', 
  'rust bandit camp casino gambling guide', 
  'bandit_camp_casino', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bandit_camp_casino'], 
  'bandit_camp_casino', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=gNehvxf013k","source_categories":[{"key":"bandit_camp_casino","label":"Gambling / Bandit Camp Casino","order":10}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'jM-W-T8Juqk', 
  'Betting on bandit.camp', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/jM-W-T8Juqk/hqdefault.jpg', 
  'rust bandit camp casino gambling guide', 
  'bandit_camp_casino', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bandit_camp_casino'], 
  'bandit_camp_casino', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=jM-W-T8Juqk","source_categories":[{"key":"bandit_camp_casino","label":"Gambling / Bandit Camp Casino","order":11}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'Gs7gyNqSy7k', 
  'From Profit To Nothing', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/Gs7gyNqSy7k/hqdefault.jpg', 
  'rust bandit camp casino gambling guide', 
  'bandit_camp_casino', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bandit_camp_casino'], 
  'bandit_camp_casino', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=Gs7gyNqSy7k","source_categories":[{"key":"bandit_camp_casino","label":"Gambling / Bandit Camp Casino","order":12}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'V1eZeIiQQOw', 
  'Ich habe KI zur Unterstützung', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/V1eZeIiQQOw/hqdefault.jpg', 
  'rust bandit camp casino gambling guide', 
  'bandit_camp_casino', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bandit_camp_casino'], 
  'bandit_camp_casino', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=V1eZeIiQQOw","source_categories":[{"key":"bandit_camp_casino","label":"Gambling / Bandit Camp Casino","order":13}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'Uher-UDCiew', 
  'i WON 450$ FOR FREE', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/Uher-UDCiew/hqdefault.jpg', 
  'rust bandit camp casino gambling guide', 
  'bandit_camp_casino', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bandit_camp_casino'], 
  'bandit_camp_casino', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=Uher-UDCiew","source_categories":[{"key":"bandit_camp_casino","label":"Gambling / Bandit Camp Casino","order":14}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'k4adL2sji-M', 
  'How easy is snowball', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/k4adL2sji-M/hqdefault.jpg', 
  'rust bandit camp casino gambling guide', 
  'bandit_camp_casino', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bandit_camp_casino'], 
  'bandit_camp_casino', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=k4adL2sji-M","source_categories":[{"key":"bandit_camp_casino","label":"Gambling / Bandit Camp Casino","order":15}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'vh6A1qss_70', 
  'Gambling But Only 3 Way', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/vh6A1qss_70/hqdefault.jpg', 
  'rust bandit camp casino gambling guide', 
  'bandit_camp_casino', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bandit_camp_casino'], 
  'bandit_camp_casino', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=vh6A1qss_70","source_categories":[{"key":"bandit_camp_casino","label":"Gambling / Bandit Camp Casino","order":16}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'GDJOkSYgbeI', 
  'This Strategy Made Me Rich', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/GDJOkSYgbeI/hqdefault.jpg', 
  'rust bandit camp casino gambling guide', 
  'bandit_camp_casino', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bandit_camp_casino'], 
  'bandit_camp_casino', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=GDJOkSYgbeI","source_categories":[{"key":"bandit_camp_casino","label":"Gambling / Bandit Camp Casino","order":17}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'FrRu9y1LIxI', 
  'bandit.camp Infinite Gambling', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/FrRu9y1LIxI/hqdefault.jpg', 
  'rust bandit camp casino gambling guide', 
  'bandit_camp_casino', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bandit_camp_casino'], 
  'bandit_camp_casino', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=FrRu9y1LIxI","source_categories":[{"key":"bandit_camp_casino","label":"Gambling / Bandit Camp Casino","order":18}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'bfirnah1RuE', 
  'Our Most Insane Session', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/bfirnah1RuE/hqdefault.jpg', 
  'rust bandit camp casino gambling guide', 
  'bandit_camp_casino', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bandit_camp_casino'], 
  'bandit_camp_casino', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=bfirnah1RuE","source_categories":[{"key":"bandit_camp_casino","label":"Gambling / Bandit Camp Casino","order":19}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'cSFhfAYXlME', 
  '285x Max Win 2x Mines', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/cSFhfAYXlME/hqdefault.jpg', 
  'rust bandit camp casino gambling guide', 
  'bandit_camp_casino', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bandit_camp_casino'], 
  'bandit_camp_casino', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=cSFhfAYXlME","source_categories":[{"key":"bandit_camp_casino","label":"Gambling / Bandit Camp Casino","order":20}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '0RNRqX4fZMY', 
  'Depositing My Rust Inventory', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/0RNRqX4fZMY/hqdefault.jpg', 
  'rust bandit camp casino gambling guide', 
  'bandit_camp_casino', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bandit_camp_casino'], 
  'bandit_camp_casino', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=0RNRqX4fZMY","source_categories":[{"key":"bandit_camp_casino","label":"Gambling / Bandit Camp Casino","order":21}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'blhAR9mNhNU', 
  'The Best Case On Bandit', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/blhAR9mNhNU/hqdefault.jpg', 
  'rust bandit camp casino gambling guide', 
  'bandit_camp_casino', 
  ARRAY['manual_seed', 'youtube', 'rust', 'bandit_camp_casino'], 
  'bandit_camp_casino', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=blhAR9mNhNU","source_categories":[{"key":"bandit_camp_casino","label":"Gambling / Bandit Camp Casino","order":22}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '-YhCvGVop1Q', 
  'Rust: First Day Trailer', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/-YhCvGVop1Q/hqdefault.jpg', 
  'rust 2 first scene reveal release', 
  'rust2_reveal', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_reveal'], 
  'rust2_reveal', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=-YhCvGVop1Q","source_categories":[{"key":"rust2_reveal","label":"Rust 2 – First Scene / Reveal","order":1}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'D6c3JgpXY7A', 
  'Rust Console Edition (New Gen)', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/D6c3JgpXY7A/hqdefault.jpg', 
  'rust 2 first scene reveal release', 
  'rust2_reveal', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_reveal'], 
  'rust2_reveal', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=D6c3JgpXY7A","source_categories":[{"key":"rust2_reveal","label":"Rust 2 – First Scene / Reveal","order":2}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '7ss9EB9Vk6c', 
  'I Played A Full Day Of Rust 2!', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/7ss9EB9Vk6c/hqdefault.jpg', 
  'rust 2 first scene reveal release', 
  'rust2_reveal', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_reveal'], 
  'rust2_reveal', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=7ss9EB9Vk6c","source_categories":[{"key":"rust2_reveal","label":"Rust 2 – First Scene / Reveal","order":3}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '_D9HEFkHCdo', 
  'Rust – Built Different | Launch', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/_D9HEFkHCdo/hqdefault.jpg', 
  'rust 2 first scene reveal release', 
  'rust2_reveal', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_reveal', 'rust2_news'], 
  'rust2_reveal', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=_D9HEFkHCdo","source_categories":[{"key":"rust2_reveal","label":"Rust 2 – First Scene / Reveal","order":4},{"key":"rust2_news","label":"Rust 2 – Release Date / News","order":11}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '4tgSz6WvMSw', 
  'NEW Rust DLC first look!', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/4tgSz6WvMSw/hqdefault.jpg', 
  'rust 2 first scene reveal release', 
  'rust2_reveal', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_reveal'], 
  'rust2_reveal', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=4tgSz6WvMSw","source_categories":[{"key":"rust2_reveal","label":"Rust 2 – First Scene / Reveal","order":5}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'sszSmyhioxg', 
  'Rust 2025: Mid-Year Recap & Sneak', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/sszSmyhioxg/hqdefault.jpg', 
  'rust 2 first scene reveal release', 
  'rust2_reveal', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_reveal'], 
  'rust2_reveal', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=sszSmyhioxg","source_categories":[{"key":"rust2_reveal","label":"Rust 2 – First Scene / Reveal","order":6}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'LGcECozNXEw', 
  'Rust – Official Trailer', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/LGcECozNXEw/hqdefault.jpg', 
  'rust 2 first scene reveal release', 
  'rust2_reveal', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_reveal'], 
  'rust2_reveal', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=LGcECozNXEw","source_categories":[{"key":"rust2_reveal","label":"Rust 2 – First Scene / Reveal","order":7}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'Wdx1yJTtDsE', 
  'Most Accurate Rust Trailer', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/Wdx1yJTtDsE/hqdefault.jpg', 
  'rust 2 first scene reveal release', 
  'rust2_reveal', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_reveal'], 
  'rust2_reveal', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=Wdx1yJTtDsE","source_categories":[{"key":"rust2_reveal","label":"Rust 2 – First Scene / Reveal","order":8}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'mugDsdBIyfY', 
  'Rust HDRP backport branch!', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/mugDsdBIyfY/hqdefault.jpg', 
  'rust 2 first scene reveal release', 
  'rust2_reveal', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_reveal'], 
  'rust2_reveal', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=mugDsdBIyfY","source_categories":[{"key":"rust2_reveal","label":"Rust 2 – First Scene / Reveal","order":9}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '4mlChi_Qrs8', 
  'Rust Farming 2.0 – First Look', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/4mlChi_Qrs8/hqdefault.jpg', 
  'rust 2 first scene reveal release', 
  'rust2_reveal', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_reveal'], 
  'rust2_reveal', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=4mlChi_Qrs8","source_categories":[{"key":"rust2_reveal","label":"Rust 2 – First Scene / Reveal","order":10}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'H1np4wbvB28', 
  'The Veteran Lost His ...', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/H1np4wbvB28/hqdefault.jpg', 
  'rust 2 first scene reveal release', 
  'rust2_reveal', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_reveal'], 
  'rust2_reveal', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=H1np4wbvB28","source_categories":[{"key":"rust2_reveal","label":"Rust 2 – First Scene / Reveal","order":11}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'uOUMmtBHWO0', 
  'First Look at Rust in Season 2', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/uOUMmtBHWO0/hqdefault.jpg', 
  'rust 2 first scene reveal release', 
  'rust2_reveal', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_reveal'], 
  'rust2_reveal', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=uOUMmtBHWO0","source_categories":[{"key":"rust2_reveal","label":"Rust 2 – First Scene / Reveal","order":12}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '8VuwacDQrZ4', 
  'Rust Console: Welt 2.0', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/8VuwacDQrZ4/hqdefault.jpg', 
  'rust 2 first scene reveal release', 
  'rust2_reveal', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_reveal'], 
  'rust2_reveal', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=8VuwacDQrZ4","source_categories":[{"key":"rust2_reveal","label":"Rust 2 – First Scene / Reveal","order":13}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'xuftkDxjGT4', 
  'Arc Raiders Reveal Trailer', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/xuftkDxjGT4/hqdefault.jpg', 
  'rust 2 first scene reveal release', 
  'rust2_reveal', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_reveal'], 
  'rust2_reveal', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=xuftkDxjGT4","source_categories":[{"key":"rust2_reveal","label":"Rust 2 – First Scene / Reveal","order":14}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'qVYe0pT6wJc', 
  'Rust – Naval Update', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/qVYe0pT6wJc/hqdefault.jpg', 
  'rust 2 first scene reveal release', 
  'rust2_reveal', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_reveal'], 
  'rust2_reveal', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=qVYe0pT6wJc","source_categories":[{"key":"rust2_reveal","label":"Rust 2 – First Scene / Reveal","order":15}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '6dnEhvbipxk', 
  'I played the new generation', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/6dnEhvbipxk/hqdefault.jpg', 
  'rust 2 first scene reveal release', 
  'rust2_reveal', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_reveal'], 
  'rust2_reveal', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=6dnEhvbipxk","source_categories":[{"key":"rust2_reveal","label":"Rust 2 – First Scene / Reveal","order":16}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '9YIBVTu3-uE', 
  'Rust What''s Coming | First Look', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/9YIBVTu3-uE/hqdefault.jpg', 
  'rust 2 first scene reveal release', 
  'rust2_reveal', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_reveal'], 
  'rust2_reveal', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=9YIBVTu3-uE","source_categories":[{"key":"rust2_reveal","label":"Rust 2 – First Scene / Reveal","order":17}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'OkSAVcCRImg', 
  'Rust 2 kommt… oder doch nicht?', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/OkSAVcCRImg/hqdefault.jpg', 
  'rust 2 release date news', 
  'rust2_news', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_news'], 
  'rust2_news', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=OkSAVcCRImg","source_categories":[{"key":"rust2_news","label":"Rust 2 – Release Date / News","order":1}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '8SdKDZFYDF4', 
  'Wird es ein Rust 2 geben?', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/8SdKDZFYDF4/hqdefault.jpg', 
  'rust 2 release date news', 
  'rust2_news', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_news'], 
  'rust2_news', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=8SdKDZFYDF4","source_categories":[{"key":"rust2_news","label":"Rust 2 – Release Date / News","order":2}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'AErFKeIgvIs', 
  'Rust 2 Might Be Real But...', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/AErFKeIgvIs/hqdefault.jpg', 
  'rust 2 release date news', 
  'rust2_news', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_news'], 
  'rust2_news', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=AErFKeIgvIs","source_categories":[{"key":"rust2_news","label":"Rust 2 – Release Date / News","order":3}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'DCUjb7UAeng', 
  'The Truth about Rust 2', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/DCUjb7UAeng/hqdefault.jpg', 
  'rust 2 release date news', 
  'rust2_news', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_news'], 
  'rust2_news', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=DCUjb7UAeng","source_categories":[{"key":"rust2_news","label":"Rust 2 – Release Date / News","order":4}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'Q9BpyXSjrac', 
  'Rust – Common Ground | Launch', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/Q9BpyXSjrac/hqdefault.jpg', 
  'rust 2 release date news', 
  'rust2_news', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_news'], 
  'rust2_news', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=Q9BpyXSjrac","source_categories":[{"key":"rust2_news","label":"Rust 2 – Release Date / News","order":5}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'De24eslAJdU', 
  'Rust 2 Big News', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/De24eslAJdU/hqdefault.jpg', 
  'rust 2 release date news', 
  'rust2_news', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_news'], 
  'rust2_news', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=De24eslAJdU","source_categories":[{"key":"rust2_news","label":"Rust 2 – Release Date / News","order":6}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'WdFej0IMC8s', 
  'Rust Update-Stream – 2. Juli', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/WdFej0IMC8s/hqdefault.jpg', 
  'rust 2 release date news', 
  'rust2_news', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_news'], 
  'rust2_news', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=WdFej0IMC8s","source_categories":[{"key":"rust2_news","label":"Rust 2 – Release Date / News","order":7}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'E5Dhnj4RC0o', 
  'American Rust S2: Release [TV-Serie]', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/E5Dhnj4RC0o/hqdefault.jpg', 
  'rust 2 release date news', 
  'rust2_news', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_news'], 
  'rust2_news', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=E5Dhnj4RC0o","source_categories":[{"key":"rust2_news","label":"Rust 2 – Release Date / News","order":8}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '60HygIwbjI8', 
  'Rust 2 Leak – ein riesiges Warnsignal', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/60HygIwbjI8/hqdefault.jpg', 
  'rust 2 release date news', 
  'rust2_news', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_news'], 
  'rust2_news', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=60HygIwbjI8","source_categories":[{"key":"rust2_news","label":"Rust 2 – Release Date / News","order":10}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'ZfyhllJJr5Q', 
  'RUST 2 – Preserve the Legacy', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/ZfyhllJJr5Q/hqdefault.jpg', 
  'rust 2 release date news', 
  'rust2_news', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_news'], 
  'rust2_news', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=ZfyhllJJr5Q","source_categories":[{"key":"rust2_news","label":"Rust 2 – Release Date / News","order":12}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'JzoCmb3VkCk', 
  'RUST#2 | Well... he had it coming', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/JzoCmb3VkCk/hqdefault.jpg', 
  'rust 2 release date news', 
  'rust2_news', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_news'], 
  'rust2_news', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=JzoCmb3VkCk","source_categories":[{"key":"rust2_news","label":"Rust 2 – Release Date / News","order":13}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '5rXCwsV_3bc', 
  'Günstigeres Apartment-Raiding', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/5rXCwsV_3bc/hqdefault.jpg', 
  'rust 2 release date news', 
  'rust2_news', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_news'], 
  'rust2_news', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=5rXCwsV_3bc","source_categories":[{"key":"rust2_news","label":"Rust 2 – Release Date / News","order":14}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'zsXzva_pAzE', 
  'Rust 2: Coming in 2024...', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/zsXzva_pAzE/hqdefault.jpg', 
  'rust 2 release date news', 
  'rust2_news', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_news'], 
  'rust2_news', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=zsXzva_pAzE","source_categories":[{"key":"rust2_news","label":"Rust 2 – Release Date / News","order":15}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'akCc3xZgkk0', 
  'American Rust S2: Trailer [TV-Serie]', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/akCc3xZgkk0/hqdefault.jpg', 
  'rust 2 release date news', 
  'rust2_news', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_news'], 
  'rust2_news', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=akCc3xZgkk0","source_categories":[{"key":"rust2_news","label":"Rust 2 – Release Date / News","order":16}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'yJYATC5VYBY', 
  'What happened to the Naval Update', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/yJYATC5VYBY/hqdefault.jpg', 
  'rust 2 release date news', 
  'rust2_news', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_news'], 
  'rust2_news', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=yJYATC5VYBY","source_categories":[{"key":"rust2_news","label":"Rust 2 – Release Date / News","order":17}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'rZPNuIrHNwE', 
  'Unity''s Controversial Move', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/rZPNuIrHNwE/hqdefault.jpg', 
  'rust 2 release date news', 
  'rust2_news', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_news'], 
  'rust2_news', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=rZPNuIrHNwE","source_categories":[{"key":"rust2_news","label":"Rust 2 – Release Date / News","order":18}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'FZNgHztjZvY', 
  'Rust Store Investing Predictions', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/FZNgHztjZvY/hqdefault.jpg', 
  'rust 2 release date news', 
  'rust2_news', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_news'], 
  'rust2_news', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=FZNgHztjZvY","source_categories":[{"key":"rust2_news","label":"Rust 2 – Release Date / News","order":19}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);

INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  'sdyMuQzp5gM', 
  'They''re Making Rust 2', 
  'Seeded from curated Markdown YouTube library.', 
  'https://i.ytimg.com/vi/sdyMuQzp5gM/hqdefault.jpg', 
  'rust 2 release date news', 
  'rust2_news', 
  ARRAY['manual_seed', 'youtube', 'rust', 'rust2_news'], 
  'rust2_news', 
  NULL, 
  NULL, 
  '{"seed_source":"docs/seeds/rust_youtube_links.md","youtube_url":"https://www.youtube.com/watch?v=sdyMuQzp5gM","source_categories":[{"key":"rust2_news","label":"Rust 2 – Release Date / News","order":20}]}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);
