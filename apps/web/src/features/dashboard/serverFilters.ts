import type { BattleMetricsServerSummary } from '../../lib/api/battlemetrics';

import { normalizeMonumentName, normalizeMonumentNames } from './monumentFilters';

export interface ServerFilters {
  hideEmpty: boolean;
  hideFull: boolean;
  hasQueue: boolean;
  hasMapThumbnail: boolean;
  monuments: string[];
  minPlayers: number | null;
  country: string | null;
  secure: boolean;
  mode: 'vanilla' | 'pve' | 'roleplay' | 'creative' | 'softcore' | 'hardcore' | null;
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
  return false;
}

export function applyClientFilters(
  servers: BattleMetricsServerSummary[],
  filters: ServerFilters
): BattleMetricsServerSummary[] {
  return servers.filter(s => {
    if (filters.hideEmpty && s.players === 0) return false;
    if (filters.hideFull && s.players >= s.maxPlayers) return false;
    if (filters.hasQueue && (!s.queue || s.queue === 0)) return false;
    if (filters.hasMapThumbnail && !s.mapThumbnailUrl) return false;
    
    if (filters.minPlayers !== null && s.players < filters.minPlayers) return false;
    if (filters.country !== null && s.country !== filters.country) return false;
    if (filters.secure && s.secure !== true) return false;
    if (filters.mode !== null && !matchesMode(s, filters.mode)) return false;
    
    if (filters.monuments && filters.monuments.length > 0) {
      const safeMonuments = normalizeMonumentNames(s.monumentNames);
      if (safeMonuments.length === 0) return false;
      const normalizedServerMonuments = new Set(
        safeMonuments.map(m => normalizeMonumentName(m)).filter(Boolean)
      );
      // AND logic: Server must contain ALL selected monuments
      for (const selected of filters.monuments) {
        if (!normalizedServerMonuments.has(selected)) return false;
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
