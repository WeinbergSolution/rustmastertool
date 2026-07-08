import type { BattleMetricsServerSummary } from '../../lib/api/battlemetrics';

export interface ServerFilters {
  hideEmpty: boolean;
  hideFull: boolean;
  hasQueue: boolean;
  hasMapThumbnail: boolean;
}

export const defaultFilters: ServerFilters = {
  hideEmpty: false,
  hideFull: false,
  hasQueue: false,
  hasMapThumbnail: false,
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
    return true;
  });
}
