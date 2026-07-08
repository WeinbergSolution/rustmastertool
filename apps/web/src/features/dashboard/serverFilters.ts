import type { BattleMetricsServerSummary } from '../../lib/api/battlemetrics';

import { normalizeMonumentName } from './monumentFilters';

export interface ServerFilters {
  hideEmpty: boolean;
  hideFull: boolean;
  hasQueue: boolean;
  hasMapThumbnail: boolean;
  monuments: string[];
}

export const defaultFilters: ServerFilters = {
  hideEmpty: false,
  hideFull: false,
  hasQueue: false,
  hasMapThumbnail: false,
  monuments: [],
};

export function applyClientFilters(
  servers: BattleMetricsServerSummary[],
  filters: ServerFilters
): BattleMetricsServerSummary[] {
  return servers.filter(s => {
    if (filters.hideEmpty && s.players === 0) return false;
    if (filters.hideFull && s.players >= s.maxPlayers) return false;
    if (filters.hasQueue && (!s.queue || s.queue === 0)) return false;
    if (filters.hasMapThumbnail && !s.mapThumbnailUrl) return false;
    
    if (filters.monuments && filters.monuments.length > 0) {
      if (!s.monumentNames || s.monumentNames.length === 0) return false;
      const normalizedServerMonuments = new Set(
        s.monumentNames.map(m => normalizeMonumentName(m)).filter(Boolean)
      );
      // AND logic: Server must contain ALL selected monuments
      for (const selected of filters.monuments) {
        if (!normalizedServerMonuments.has(selected)) return false;
      }
    }
    
    return true;
  });
}
