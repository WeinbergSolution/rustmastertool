import { NormalizedServerSnapshot } from './types';

export function normalizeServerSnapshot(rawData: any): NormalizedServerSnapshot {
  const attrs = rawData?.data?.attributes || {};
  const details = attrs.details || {};
  
  return {
    source: 'battlemetrics',
    battlemetricsServerId: rawData?.data?.id || 'unknown',
    name: attrs.name || 'Unknown Server',
    status: attrs.status || 'unknown',
    players: attrs.players || 0,
    maxPlayers: attrs.maxPlayers || 0,
    queue: details.rust_queued_players,
    rank: attrs.rank,
    country: attrs.country,
    address: attrs.ip,
    port: attrs.port,
    queryPort: attrs.portQuery,
    mapName: details.map,
    rustWorldSeed: details.rust_world_seed,
    rustWorldSize: details.rust_world_size,
    rustLastWipe: details.rust_last_wipe,
    rustLastSeedChange: details.rust_last_seed_change,
    rustBorn: details.rust_born,
    rustEntityCount: details.rust_ent_cnt_i,
    rustFps: details.rust_fps,
    rustFpsAvg: details.rust_fps_avg,
    updatedAt: attrs.updatedAt || new Date().toISOString(),
    rawDetailsKeys: Object.keys(details)
  };
}
