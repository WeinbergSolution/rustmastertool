import { supabase } from '../../lib/supabaseClient';
import type { BattleMetricsServerSummary } from '../../lib/api/battlemetrics';
import { normalizeMonumentNames } from './monumentFilters';

export async function enrichServerSummariesWithMapIdentity(
  servers: BattleMetricsServerSummary[]
): Promise<BattleMetricsServerSummary[]> {
  if (!supabase || servers.length === 0) return servers;

  const serverIds = servers.map(s => s.id);
  
  try {
    const { data, error } = await supabase
      .from('server_map_identity')
      .select('battlemetrics_server_id, rustmaps_thumbnail_url, rustmaps_map_url, seed, world_size, map_type, is_custom_map, monument_names, created_at')
      .in('battlemetrics_server_id', serverIds)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch map identities:', error);
      return servers; // Fail gracefully, return original servers
    }

    if (!data || data.length === 0) {
      return servers;
    }

    // Since we ordered by created_at desc, the first one we find for an ID is the latest
    const identityMap = new Map<string, any>();
    for (const row of data) {
      if (row.battlemetrics_server_id && !identityMap.has(row.battlemetrics_server_id)) {
        identityMap.set(row.battlemetrics_server_id, row);
      }
    }

    return servers.map(server => {
      const identity = identityMap.get(server.id);
      if (!identity) return server;

      return {
        ...server,
        mapThumbnailUrl: identity.rustmaps_thumbnail_url,
        mapImageUrl: identity.rustmaps_map_url,
        mapIdentitySeed: identity.seed,
        mapIdentitySize: identity.world_size,
        mapType: identity.map_type,
        isCustomMap: identity.is_custom_map,
        monumentNames: normalizeMonumentNames(identity.monument_names),
      };
    });
  } catch (err) {
    console.error('Error during map enrichment:', err);
    return servers;
  }
}
