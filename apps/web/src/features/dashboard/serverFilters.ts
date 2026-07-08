import type { BattleMetricsServerSummary } from '../../lib/api/battlemetrics';

import { classifyMonuments } from '../learn/map-intel/monumentClassification';

export interface ServerFilters {
  hideEmpty: boolean;
  hideFull: boolean;
  hasQueue: boolean;
  hasMapThumbnail: boolean;
  monuments: string[];
  minPlayers: number | null;
  country: string | null;
  secure: boolean;
  mode: 'vanilla' | 'pve' | 'roleplay' | 'creative' | 'softcore' | 'hardcore' | 'combat' | null;
  
  // NEW FILTERS
  maxWipeAgeHours: number | null;
  wipeTiming: 'thursday' | 'weekend' | 'today' | null;
  rankRange: 'top100' | 'top500' | 'top1000' | null;
  region: 'EU' | 'NA' | 'SA' | 'AS' | 'OCE' | 'AF' | null;
  minMapSize: number | null;
  maxMapSize: number | null;
  mapType: 'procedural' | 'custom' | 'barren' | null;
  lootMultiplier: '1x' | '2x' | '3x' | '5x' | '10x' | '10x+' | null;
  teamLimit: 'solo' | 'duo' | 'trio' | 'quad' | null;
  hasRaidWindows: boolean;
  hasScheduledRestart: boolean;
}

export const defaultFilters: ServerFilters = {
  hideEmpty: false,
  hideFull: false,
  hasQueue: false,
  hasMapThumbnail: false,
  monuments: [],
  minPlayers: null,
  country: null,
  secure: false,
  mode: null,
  maxWipeAgeHours: null,
  wipeTiming: null,
  rankRange: null,
  region: null,
  minMapSize: null,
  maxMapSize: null,
  mapType: null,
  lootMultiplier: null,
  teamLimit: null,
  hasRaidWindows: false,
  hasScheduledRestart: false,
};

const REGION_MAP: Record<string, 'EU' | 'NA' | 'SA' | 'AS' | 'OCE' | 'AF'> = {
  // EU
  'DE': 'EU', 'FR': 'EU', 'GB': 'EU', 'NL': 'EU', 'RU': 'EU', 'SE': 'EU', 'NO': 'EU', 'FI': 'EU', 'DK': 'EU', 'PL': 'EU', 'IT': 'EU', 'ES': 'EU', 'PT': 'EU', 'UA': 'EU', 'CH': 'EU', 'AT': 'EU', 'BE': 'EU', 'CZ': 'EU', 'IE': 'EU', 'TR': 'EU',
  // NA
  'US': 'NA', 'CA': 'NA', 'MX': 'NA',
  // SA
  'BR': 'SA', 'AR': 'SA', 'CL': 'SA', 'CO': 'SA', 'PE': 'SA',
  // AS
  'CN': 'AS', 'JP': 'AS', 'KR': 'AS', 'IN': 'AS', 'SG': 'AS', 'MY': 'AS', 'TH': 'AS', 'VN': 'AS', 'ID': 'AS', 'HK': 'AS', 'TW': 'AS',
  // OCE
  'AU': 'OCE', 'NZ': 'OCE',
  // AF
  'ZA': 'AF', 'EG': 'AF', 'MA': 'AF', 'NG': 'AF', 'KE': 'AF'
};

function matchesMode(s: BattleMetricsServerSummary, mode: string): boolean {
  const nameLow = s.name.toLowerCase();
  const tags = s.tags ? s.tags.map(t => t.toLowerCase()) : [];
  
  if (mode === 'pve') {
    return s.pve === true || nameLow.includes('pve') || tags.includes('pve');
  }
  if (mode === 'vanilla') {
    return nameLow.includes('vanilla') || tags.includes('vanilla');
  }
  if (mode === 'roleplay') {
    return nameLow.includes('roleplay') || nameLow.includes(' rp ') || tags.includes('roleplay');
  }
  if (mode === 'creative') {
    return nameLow.includes('creative') || tags.includes('creative') || tags.includes('build');
  }
  if (mode === 'softcore') {
    return nameLow.includes('softcore') || tags.includes('softcore');
  }
  if (mode === 'hardcore') {
    return nameLow.includes('hardcore') || tags.includes('hardcore');
  }
  if (mode === 'combat') {
    return nameLow.includes('aim') || nameLow.includes('train') || nameLow.includes('battlefield') || nameLow.includes('arena') || nameLow.includes('ukn') || tags.some(t => ['aim', 'train', 'battlefield', 'arena', 'ukn'].includes(t));
  }
  return false;
}

export function detectTeamLimit(text: string): number | 'unknown' {
  let maxSize = -1;
  if (/\b(clan|no limit|nolimit|main)\b/i.test(text)) return 'unknown'; // don't try to guess max size for these
  
  if (/\b(quad|4 man|4man)\b/i.test(text)) maxSize = Math.max(maxSize, 4);
  if (/\btrio\b/i.test(text) || /\b3 man\b/i.test(text) || /\b3man\b/i.test(text)) maxSize = Math.max(maxSize, 3);
  if (/\bduo\b/i.test(text) || /\b2 man\b/i.test(text) || /\b2man\b/i.test(text)) maxSize = Math.max(maxSize, 2);
  if (/\bsolo\b/i.test(text) || /\b1 man\b/i.test(text) || /\b1man\b/i.test(text)) maxSize = Math.max(maxSize, 1);
  
  if (maxSize === -1) return 'unknown';
  return maxSize;
}

export function applyClientFilters(
  servers: BattleMetricsServerSummary[],
  filters: ServerFilters
): BattleMetricsServerSummary[] {
  const now = Date.now();
  const today = new Date().toDateString();

  return servers.filter(s => {
    if (filters.hideEmpty && s.players === 0) return false;
    if (filters.hideFull && s.players >= s.maxPlayers) return false;
    if (filters.hasQueue && (!s.queue || s.queue === 0)) return false;
    if (filters.hasMapThumbnail && !s.mapThumbnailUrl) return false;
    
    if (filters.minPlayers !== null && s.players < filters.minPlayers) return false;
    if (filters.country !== null && s.country !== filters.country) return false;
    if (filters.secure && s.secure !== true) return false;
    if (filters.mode !== null && !matchesMode(s, filters.mode)) return false;

    // NEW FILTERS - EXACT
    if (filters.maxWipeAgeHours !== null) {
      if (!s.lastWipe) return false;
      const wipeDate = new Date(s.lastWipe);
      const wipeAgeMs = now - wipeDate.getTime();
      if (Number.isNaN(wipeAgeMs)) return false;
      const wipeAgeHours = wipeAgeMs / (1000 * 60 * 60);
      if (wipeAgeHours > filters.maxWipeAgeHours) return false;
    }

    if (filters.rankRange !== null) {
      if (!s.rank) return false;
      if (filters.rankRange === 'top100' && s.rank > 100) return false;
      if (filters.rankRange === 'top500' && s.rank > 500) return false;
      if (filters.rankRange === 'top1000' && s.rank > 1000) return false;
    }

    const mapSize = s.mapIdentitySize || s.mapSize;
    if (filters.minMapSize !== null && (!mapSize || mapSize < filters.minMapSize)) return false;
    if (filters.maxMapSize !== null && (!mapSize || mapSize > filters.maxMapSize)) return false;

    if (filters.mapType !== null) {
      const type = s.mapType || (s.isCustomMap || s.map?.toLowerCase() === 'custom map' ? 'custom' : s.map?.toLowerCase() === 'barren' ? 'barren' : 'procedural');
      if (type !== filters.mapType) return false;
    }

    // NEW FILTERS - DERIVED
    if (filters.region !== null) {
      if (!s.country || REGION_MAP[s.country.toUpperCase()] !== filters.region) return false;
    }

    if (filters.wipeTiming !== null) {
      if (!s.lastWipe) return false;
      const wipeDate = new Date(s.lastWipe);
      if (filters.wipeTiming === 'today' && wipeDate.toDateString() !== today) return false;
      const day = wipeDate.getDay(); // 0 = Sun, 4 = Thu, 5 = Fri, 6 = Sat
      if (filters.wipeTiming === 'thursday' && day !== 4) return false;
      if (filters.wipeTiming === 'weekend' && ![5, 6, 0].includes(day)) return false;
    }

    // NEW FILTERS - HEURISTIC
    const nameLow = s.name.toLowerCase();
    const tagsStr = (s.tags || []).join(' ').toLowerCase();
    const searchableText = `${nameLow} ${tagsStr}`;

    if (filters.lootMultiplier !== null) {
      if (filters.lootMultiplier === '1x') {
        const has1x = /\b(1x|x1|vanilla)\b/.test(searchableText);
        const hasOther = /\b(2x|x2|3x|x3|5x|x5|10x|x10|10x\+|100x|1000x|10000x|100x\+|millionx)\b/.test(searchableText);
        if (!has1x || hasOther) return false;
      } else if (filters.lootMultiplier === '10x+') {
        if (!/\b(100x|1000x|10000x|10x\+|100x\+|millionx)\b/.test(searchableText)) return false;
      } else {
        const mult = filters.lootMultiplier.replace('x', '');
        const regex = new RegExp(`\\b(${mult}x|x${mult})\\b`);
        if (!regex.test(searchableText)) return false;
      }
    }

    if (filters.teamLimit !== null) {
      const detected = detectTeamLimit(searchableText);
      if (detected === 'unknown') return false;
      if (filters.teamLimit === 'solo' && detected !== 1) return false;
      if (filters.teamLimit === 'duo' && detected > 2) return false;
      if (filters.teamLimit === 'trio' && detected > 3) return false;
      if (filters.teamLimit === 'quad' && detected > 4) return false;
    }

    if (filters.hasRaidWindows) {
      if (!/\b(raid window|weekend raid|offline protection|orp|no offline)\b/.test(searchableText)) return false;
    }

    if (filters.hasScheduledRestart) {
      if (!/\b(daily restart|restart \d|reboot)\b/.test(searchableText)) return false;
    }
    
    if (filters.monuments && filters.monuments.length > 0) {
      // Only match on safe, filterable canonical IDs (never on raw or on
      // terrain/rock/infrastructure classifications).
      const serverCanonical = new Set(
        classifyMonuments(s.monumentNames)
          .filter(c => c.isFilterable && c.canonicalId)
          .map(c => c.canonicalId as string)
      );
      if (serverCanonical.size === 0) return false;
      // AND logic: Server must contain ALL selected monuments
      for (const selected of filters.monuments) {
        if (!serverCanonical.has(selected)) return false;
      }
    }
    
    return true;
  });
}

export type SortOption = 'players_desc' | 'players_asc' | 'fill_desc' | 'rank_asc' | 'queue_desc' | 'updated_desc';

export function applySort(servers: BattleMetricsServerSummary[], sortBy: SortOption): BattleMetricsServerSummary[] {
  return [...servers].sort((a, b) => {
    switch (sortBy) {
      case 'players_desc': return b.players - a.players;
      case 'players_asc': return a.players - b.players;
      case 'fill_desc': {
        const fillA = a.maxPlayers > 0 ? a.players / a.maxPlayers : 0;
        const fillB = b.maxPlayers > 0 ? b.players / b.maxPlayers : 0;
        return fillB - fillA;
      }
      case 'rank_asc': return (a.rank || 999999) - (b.rank || 999999);
      case 'queue_desc': return (b.queue || 0) - (a.queue || 0);
      case 'updated_desc': return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      default: return 0;
    }
  });
}

