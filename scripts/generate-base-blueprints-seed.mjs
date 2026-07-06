import fs from 'fs';
import path from 'path';

// Category Key Mapping as defined by the user
const categoryMap = {
  'Solo': 'solo',
  'Duo': 'duo',
  'Trio': 'trio',
  'Starter / Wipe Day': 'starter_wipe_day',
  'Bunker': 'bunker',
  'Trap': 'trap',
  'Air / Airlock': 'air_airlock',
  'Near Monument': 'near_monument',
  'Unraidable': 'unraidable',
  'Cheap': 'cheap',
  'Big Clan': 'big_clan',
  'Funny / Troll': 'funny_troll',
  'Cave': 'cave',
  'Ocean / Water': 'ocean_water',
  'Widegap': 'widegap',
  'Beautiful': 'beautiful',
  'Crazy': 'crazy',
  'Hacks (Cheater exposed / bans)': 'cheater_reports',
  'Tips': 'tips',
  'Tricks': 'tricks',
  'Green Card': 'green_card',
  'Blue Card': 'blue_card',
  'Red Card': 'red_card',
  'Allgemein (Journey / Movie / Wipe)': 'journey_wipe',
  'Farming': 'farming',
  'Gambling / Bandit Camp Casino': 'bandit_camp_casino',
  'Rust 2 – First Scene / Reveal': 'rust2_reveal',
  'Rust 2 – Release Date / News': 'rust2_news'
};

const getDefaultSearchQuery = (key) => {
  if (key === 'solo') return 'rust solo base build';
  if (key === 'duo') return 'rust duo base build';
  if (key === 'trio') return 'rust trio base build';
  if (key === 'starter_wipe_day') return 'rust starter base wipe day build';
  if (key === 'bunker') return 'rust bunker base build';
  if (key === 'trap') return 'rust trap base build';
  if (key === 'air_airlock') return 'rust air base build';
  if (key === 'near_monument') return 'rust monument base build near monument';
  if (key === 'unraidable') return 'rust unraidable base build high defense';
  if (key === 'cheap') return 'rust cheap base build low cost';
  if (key === 'big_clan') return 'rust clan base build large group';
  if (key === 'funny_troll') return 'rust funny base build troll base';
  if (key === 'cave') return 'rust cave base build';
  if (key === 'ocean_water') return 'rust ocean base water base build';
  if (key === 'widegap') return 'rust widegap base build';
  if (key === 'beautiful') return 'rust beautiful base build';
  if (key === 'crazy') return 'rust crazy base build';
  if (key === 'cheater_reports') return 'rust cheater exposed admin ban';
  if (key === 'tips') return 'rust tips for beginners';
  if (key === 'tricks') return 'rust advanced tricks base building';
  if (key === 'green_card') return 'rust green card guide puzzle';
  if (key === 'blue_card') return 'rust blue card guide puzzle';
  if (key === 'red_card') return 'rust red card guide puzzle';
  if (key === 'journey_wipe') return 'rust solo journey wipe movie';
  if (key === 'farming') return 'rust farming guide clone berry tea';
  if (key === 'bandit_camp_casino') return 'rust bandit camp casino gambling guide';
  if (key === 'rust2_reveal') return 'rust 2 first scene reveal release';
  if (key === 'rust2_news') return 'rust 2 release date news';
  return 'rust base build';
};

const getGroupSize = (key) => {
  if (['solo', 'duo', 'trio'].includes(key)) return key;
  if (key === 'big_clan') return 'clan';
  return null;
};

const getWipeStage = (key) => {
  if (key === 'starter_wipe_day') return 'wipe_day';
  if (key === 'journey_wipe') return 'wipe';
  return null;
};

function extractVideoId(url) {
  let match = url.match(/(?:v=|youtu\.be\/)([^&]+)/);
  return match ? match[1] : null;
}

const inputPath = path.resolve('docs/seeds/rust_youtube_links.md');
const content = fs.readFileSync(inputPath, 'utf-8');

const lines = content.split('\n');

const videosMap = new Map();
let currentCategoryLabel = null;
let currentCategoryKey = null;
let orderIndex = 0;

for (const line of lines) {
  const catMatch = line.match(/^##\s+(.+?)\s+(?:\(\d+\))?$/);
  if (catMatch) {
    const rawCat = catMatch[1].trim();
    if (categoryMap[rawCat]) {
      currentCategoryLabel = rawCat;
      currentCategoryKey = categoryMap[rawCat];
      orderIndex = 1;
    }
    continue;
  }

  const linkMatch = line.match(/^[\d]+\.\s+\[(.*?)\]\((https?:\/\/[^\s\)]+)\)/);
  if (linkMatch && currentCategoryKey) {
    const title = linkMatch[1];
    const url = linkMatch[2];
    const videoId = extractVideoId(url);
    
    if (!videoId) continue;

    if (!videosMap.has(videoId)) {
      videosMap.set(videoId, {
        youtube_video_id: videoId,
        title: title,
        primary_category: currentCategoryKey,
        tags: new Set(['manual_seed', 'youtube', 'rust', currentCategoryKey]),
        source_categories: [{
          key: currentCategoryKey,
          label: currentCategoryLabel,
          order: orderIndex
        }],
        url: url
      });
    } else {
      const existing = videosMap.get(videoId);
      existing.tags.add(currentCategoryKey);
      existing.source_categories.push({
        key: currentCategoryKey,
        label: currentCategoryLabel,
        order: orderIndex
      });
    }
    orderIndex++;
  }
}

// Generate SQL
let sql = `-- Migration: Seed Base Blueprints with Manual YouTube Links\n`;
sql += `-- Generated from docs/seeds/rust_youtube_links.md\n\n`;

for (const [videoId, data] of videosMap.entries()) {
  const tagsArray = Array.from(data.tags).map(t => `'${t}'`).join(', ');
  const rawYoutube = JSON.stringify({
    seed_source: "docs/seeds/rust_youtube_links.md",
    youtube_url: data.url,
    source_categories: data.source_categories
  });
  
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  const defaultSearchQuery = getDefaultSearchQuery(data.primary_category);
  const groupSize = getGroupSize(data.primary_category);
  const wipeStage = getWipeStage(data.primary_category);

  sql += `
INSERT INTO public.base_blueprints (
  source, youtube_video_id, title, description, thumbnail_url, default_search_query, 
  category, tags, base_type, group_size, wipe_stage, raw_youtube, last_synced_at, created_at, updated_at
) VALUES (
  'youtube_manual_md', 
  '${videoId.replace(/'/g, "''")}', 
  '${data.title.replace(/'/g, "''")}', 
  'Seeded from curated Markdown YouTube library.', 
  '${thumbnailUrl}', 
  '${defaultSearchQuery.replace(/'/g, "''")}', 
  '${data.primary_category}', 
  ARRAY[${tagsArray}], 
  '${data.primary_category}', 
  ${groupSize ? `'${groupSize}'` : 'NULL'}, 
  ${wipeStage ? `'${wipeStage}'` : 'NULL'}, 
  '${rawYoutube.replace(/'/g, "''")}'::jsonb, 
  now(), now(), now()
)
ON CONFLICT (youtube_video_id) DO UPDATE SET 
  title = EXCLUDED.title,
  thumbnail_url = EXCLUDED.thumbnail_url,
  source = EXCLUDED.source,
  last_synced_at = EXCLUDED.last_synced_at,
  updated_at = EXCLUDED.updated_at,
  raw_youtube = EXCLUDED.raw_youtube,
  tags = ARRAY(SELECT DISTINCT unnest(base_blueprints.tags || EXCLUDED.tags)),
  category = COALESCE(base_blueprints.category, EXCLUDED.category);
`;
}

const timestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
const outName = `${timestamp}_seed_base_blueprints_manual_links.sql`;
const outDir = path.resolve('supabase/migrations');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, outName), sql);

console.log(`Successfully generated migration: ${outName}`);
console.log(`Parsed ${videosMap.size} unique videos from Markdown.`);
