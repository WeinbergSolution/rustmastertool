// Central, crash-free monument classification for Map Intel.
//
// Given a raw monument string (as delivered in `details.rust_maps.monuments`),
// classifyMonument() ALWAYS returns a MonumentClassification — never null, never
// throws. Unknown strings fall back to a safe `unknown` result so the UI can
// render them neutrally instead of crashing.
//
// Import direction: this module imports the leaf module mapIntelData (types +
// MAP_MONUMENTS) only. mapIntelData imports nothing here, so there is no cycle.
import { MAP_MONUMENTS } from './mapIntelData';
import type { MonumentCategoryId, MonumentConfidence } from './mapIntelData';

export type { MonumentCategoryId, MonumentConfidence } from './mapIntelData';

export interface MonumentClassification {
  rawName: string;
  normalizedName: string;
  canonicalId: string | null;
  category: MonumentCategoryId;
  variant: string | null;
  confidence: MonumentConfidence;
  isClassicMonument: boolean;
  isFilterable: boolean;
  isHeatmapRelevant: boolean;
  hasMapIntelEntry: boolean;
  needsOwnerReview: boolean;
  reason: string;
}

// Canonical IDs that have a curated Map Intel library entry.
const KNOWN_MAP_INTEL_IDS = new Set<string>(MAP_MONUMENTS.map((m) => m.id));

export function getKnownMapIntelCanonicalIds(): Set<string> {
  return new Set(KNOWN_MAP_INTEL_IDS);
}

interface CanonicalMeta {
  category: MonumentCategoryId;
  isClassicMonument: boolean;
  isFilterable: boolean;
  isHeatmapRelevant: boolean;
  confidence: MonumentConfidence;
  needsOwnerReview: boolean;
}

// Per-canonical metadata. Flags follow the Map Intel coverage audit:
// - terrain / rock_formation / infrastructure are NOT filterable (routing/base
//   relevance only) but ARE heatmap relevant.
// - offshore monuments are not heatmap relevant (no land base spot).
const M = (
  category: MonumentCategoryId,
  isClassicMonument: boolean,
  isFilterable: boolean,
  isHeatmapRelevant: boolean,
  confidence: MonumentConfidence = 'verified',
  needsOwnerReview = false,
): CanonicalMeta => ({ category, isClassicMonument, isFilterable, isHeatmapRelevant, confidence, needsOwnerReview });

const CANONICAL_META: Record<string, CanonicalMeta> = {
  // Safe zones
  outpost: M('safe_zone', true, true, true),
  bandit_camp: M('safe_zone', true, true, true),
  fishing_village: M('safe_zone', true, true, true),
  apartments_complex: M('safe_zone', true, true, true),
  // Tier 1
  gas_station: M('tier_1', true, true, true),
  supermarket: M('tier_1', true, true, true),
  lighthouse: M('tier_1', true, true, true),
  warehouse: M('tier_1', true, true, true, 'likely', true),
  jungle_ruins: M('tier_1', true, true, true),
  // Tier 2
  dome: M('tier_2', true, true, true),
  water_treatment: M('tier_2', true, true, true),
  airfield: M('tier_2', true, true, true),
  harbor_large: M('tier_2', true, true, true),
  harbor_small: M('tier_2', true, true, true),
  ferry_terminal: M('tier_2', true, true, true),
  junkyard: M('tier_2', true, true, true),
  satellite_dish: M('tier_2', true, true, true),
  sewer_branch: M('tier_2', true, true, true),
  radtown: M('tier_2', true, true, true),
  jungle_ziggurat: M('tier_2', true, true, true),
  // Tier 3
  launch_site: M('tier_3', true, true, true),
  military_tunnels: M('tier_3', true, true, true),
  power_plant: M('tier_3', true, true, true),
  train_yard: M('tier_3', true, true, true),
  excavator: M('tier_3', true, true, true),
  missile_silo: M('tier_3', true, true, true),
  arctic_base: M('tier_3', true, true, true),
  military_base: M('tier_3', true, true, true, 'likely', true),
  // Offshore (not heatmap relevant)
  large_oil_rig: M('offshore', true, true, false),
  small_oil_rig: M('offshore', true, true, false),
  underwater_labs: M('offshore', true, true, false),
  // Quarries
  sulfur_quarry: M('quarry', true, true, true),
  stone_quarry: M('quarry', true, true, true),
  hqm_quarry: M('quarry', true, true, true),
  // Roadside
  ranch: M('roadside', true, true, true),
  large_barn: M('roadside', true, true, true),
  water_well: M('roadside', true, true, true),
  // Non-classic categories (not filterable, heatmap relevant)
  cave: M('cave', false, true, true),
  rock_formation: M('rock_formation', false, false, true),
  power_substation: M('infrastructure', false, false, true),
  tunnel_entrance: M('infrastructure', false, false, true),
  powerline: M('infrastructure', false, false, true),
  lake: M('terrain', false, false, true),
  oasis: M('terrain', false, false, true),
  ice_lake: M('terrain', false, false, true),
  iceberg: M('terrain', false, false, true),
};

// Explicit overrides for names that must NOT be matched by the generic alias
// table (e.g. "radtown" must never fold into supermarket/gas station).
const REVIEW_OVERRIDES: Record<string, string> = {
  radtown: 'radtown',
  'apartments complex': 'apartments_complex',
  'apartment complex': 'apartments_complex',
  ruin: 'jungle_ruins',
  ziggurat: 'jungle_ziggurat',
  warehouse: 'warehouse',
  'military base': 'military_base',
};

// Classical monument aliases. Matched exact-first, then longest-alias-first via
// substring, so "large harbor" wins over a bare "harbor" and "large oilrig"
// over "oilrig".
const CLASSIC_ALIASES: Record<string, string[]> = {
  outpost: ['outpost', 'compound'],
  bandit_camp: ['bandit camp', 'bandit town'],
  fishing_village: ['large fishing village', 'small fishing village', 'fishing village'],
  gas_station: ["oxum's gas station", 'oxums gas station', 'gas station', 'oxum'],
  supermarket: ['abandoned supermarket', 'supermarket'],
  lighthouse: ['lighthouse'],
  dome: ['sphere tank', 'the dome', 'dome'],
  water_treatment: ['water treatment plant', 'water treatment'],
  airfield: ['airfield'],
  harbor_large: ['large harbor'],
  harbor_small: ['small harbor'],
  ferry_terminal: ['ferry terminal'],
  junkyard: ['junkyard'],
  satellite_dish: ['satellite dish'],
  sewer_branch: ['sewer branch'],
  launch_site: ['launch site'],
  military_tunnels: ['military tunnels', 'military tunnel'],
  power_plant: ['powerplant', 'power plant'],
  train_yard: ['trainyard', 'train yard'],
  excavator: ['giant excavator pit', 'giant excavator', 'excavator'],
  missile_silo: ['nuclear missile silo', 'missile silo'],
  arctic_base: ['arctic research base', 'arctic base'],
  large_oil_rig: ['large oilrig', 'large oil rig'],
  small_oil_rig: ['small oilrig', 'small oil rig'],
  underwater_labs: ['underwater labs', 'underwater lab'],
  sulfur_quarry: ['sulfur quarry'],
  stone_quarry: ['stone quarry'],
  hqm_quarry: ['hqm quarry'],
  ranch: ['ranch'],
  large_barn: ['large barn'],
  water_well: ['water well'],
};

// Flattened alias list sorted longest-first for the substring pass.
const FLAT_ALIASES: Array<{ canonicalId: string; alias: string }> = Object.entries(CLASSIC_ALIASES)
  .flatMap(([canonicalId, aliases]) => aliases.map((alias) => ({ canonicalId, alias })))
  .sort((a, b) => b.alias.length - a.alias.length);

export function normalizeRawMonumentName(value: string): string {
  return String(value ?? '')
    .toLowerCase()
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function normalizeMonumentNames(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string');
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return [];
    try {
      return normalizeMonumentNames(JSON.parse(trimmed));
    } catch {
      return trimmed
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }
  return [];
}

function build(
  rawName: string,
  normalized: string,
  canonicalId: string,
  variant: string | null,
  reason: string,
  overrides?: { confidence?: MonumentConfidence; needsOwnerReview?: boolean },
): MonumentClassification {
  const meta = CANONICAL_META[canonicalId];
  return {
    rawName,
    normalizedName: normalized,
    canonicalId,
    category: meta.category,
    variant,
    confidence: overrides?.confidence ?? meta.confidence,
    isClassicMonument: meta.isClassicMonument,
    isFilterable: meta.isFilterable,
    isHeatmapRelevant: meta.isHeatmapRelevant,
    hasMapIntelEntry: KNOWN_MAP_INTEL_IDS.has(canonicalId),
    needsOwnerReview: overrides?.needsOwnerReview ?? meta.needsOwnerReview,
    reason,
  };
}

function unknown(rawName: string, normalized: string): MonumentClassification {
  return {
    rawName,
    normalizedName: normalized,
    canonicalId: null,
    category: 'unknown',
    variant: null,
    confidence: 'uncertain',
    isClassicMonument: false,
    isFilterable: false,
    isHeatmapRelevant: false,
    hasMapIntelEntry: false,
    needsOwnerReview: true,
    reason: 'unmatched raw string',
  };
}

const CAVE_RE = /^cave (small|medium|large)( sewers)? (easy|medium|hard)$/;

function rockVariant(normalized: string): string | null {
  if (normalized.includes('3 wall') || normalized.includes('three wall')) return 'three_wall';
  if (normalized.includes('anvil')) return 'anvil';
  if (normalized.includes('tiny')) return 'tiny_god';
  if (normalized.includes('medium')) return 'medium_god';
  if (normalized.includes('large')) return 'large_god';
  return null;
}

export function classifyMonument(rawName: string): MonumentClassification {
  const normalized = normalizeRawMonumentName(rawName);
  if (!normalized) return unknown(rawName, normalized);

  // 1. Caves — keep the size/difficulty variant.
  const caveMatch = CAVE_RE.exec(normalized);
  if (caveMatch) {
    const [, size, sewers, difficulty] = caveMatch;
    const variant = `${size}${sewers ? '_sewers' : ''}_${difficulty}`;
    return build(rawName, normalized, 'cave', variant, `cave variant ${variant}`);
  }
  if (normalized === 'cave' || normalized.startsWith('cave ')) {
    return build(rawName, normalized, 'cave', null, 'generic cave');
  }

  // 2. Rock formations (revamped World 2.0) — buildable, base-spot relevant.
  if (normalized.endsWith('rock')) {
    return build(rawName, normalized, 'rock_formation', rockVariant(normalized), 'rock formation');
  }

  // 3. Power substation (small/big).
  const subMatch = /^power substation (small|big)$/.exec(normalized);
  if (subMatch) {
    return build(rawName, normalized, 'power_substation', subMatch[1], `substation ${subMatch[1]}`);
  }

  // 4. Tunnel entrance (+ transition variant).
  if (normalized.startsWith('tunnel entrance')) {
    const isTransition = normalized.includes('transition');
    return build(
      rawName,
      normalized,
      'tunnel_entrance',
      isTransition ? 'transition' : null,
      isTransition ? 'tunnel entrance transition' : 'tunnel entrance',
      isTransition ? { confidence: 'likely' } : undefined,
    );
  }

  // 5. Terrain + 6. lone infrastructure (powerline).
  const TERRAIN: Record<string, string> = {
    lake: 'lake',
    oasis: 'oasis',
    'ice lake': 'ice_lake',
    iceberg: 'iceberg',
    powerline: 'powerline',
  };
  if (TERRAIN[normalized]) {
    const id = TERRAIN[normalized];
    return build(rawName, normalized, id, null, id === 'powerline' ? 'infrastructure' : 'terrain feature');
  }

  // 7. Review overrides (never fold into a wrong alias).
  const override = REVIEW_OVERRIDES[normalized];
  if (override) {
    return build(rawName, normalized, override, null, `review override → ${override}`);
  }

  // 8. Classical monuments — exact-first, then longest-alias substring.
  for (const { canonicalId, alias } of FLAT_ALIASES) {
    if (normalized === alias) {
      return build(rawName, normalized, canonicalId, null, `exact alias "${alias}"`);
    }
  }
  for (const { canonicalId, alias } of FLAT_ALIASES) {
    if (normalized.includes(alias)) {
      return build(rawName, normalized, canonicalId, null, `alias "${alias}"`);
    }
  }

  // 9. Unknown fallback.
  return unknown(rawName, normalized);
}

export function classifyMonuments(value: unknown): MonumentClassification[] {
  return normalizeMonumentNames(value).map(classifyMonument);
}
