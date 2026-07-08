import type { ServerCardData } from '../dashboard/ServerCard';
import type { MapLayerId } from './mapLayerTypes';

export type ParsedServerMapModel = {
  serverId: string;
  serverName: string;
  mapType?: string;
  worldSize?: number;
  seed?: number;
  hasCustomMap?: boolean;
  imageUrl?: string;
  thumbnailUrl?: string;
  mapSourceBadge: string;
  monumentNames: string[];
  classifiedMonuments: Array<{
    rawName: string;
    canonicalId?: string;
    displayName: string;
    categoryId?: string;
    confidence?: string;
  }>;
  coordinateMode: 'none' | 'normalized' | 'world';
  markers: Array<{
    id: string;
    label: string;
    x: number;
    y: number;
    source: 'api' | 'db';
  }>;
  availableLayers: MapLayerId[];
  disabledFutureLayers: MapLayerId[];
};

/**
 * Parses raw ServerCardData into a structured Map Model.
 * In Phase 1, no coordinates are plotted to prevent "fake" map data.
 */
export function parseServerToMapModel(server: ServerCardData): ParsedServerMapModel {
  const isCustomMap = server.isCustomMap || false;
  const mapType = server.mapType || (isCustomMap ? 'Custom' : server.mapName) || 'Unknown';
  const worldSize = server.mapIdentitySize || server.worldSize;
  const seed = server.mapIdentitySeed || server.worldSeed;
  
  const monumentNames = server.monumentNames || [];
  
  // Basic mock classification if no real canonical DB is present yet
  // This will be expanded later
  const classifiedMonuments = monumentNames.map((name: string) => ({
    rawName: name,
    displayName: name.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()),
  }));

  const imageUrl = server.mapImageUrl;
  const thumbnailUrl = server.mapThumbnailUrl;
  
  let mapSourceBadge = 'No map image';
  if (imageUrl) {
    mapSourceBadge = 'RustMaps image';
  } else if (thumbnailUrl) {
    mapSourceBadge = 'Map thumbnail preview';
  }

  // Determine layers based on available data
  const availableLayers: MapLayerId[] = ['map_image', 'monument_list'];
  const disabledFutureLayers: MapLayerId[] = [
    'heatmap_population_future', 
    'heatmap_death_curve_future', 
    'build_spots_future', 
    'routes_future'
  ];
  
  // Coordinate mode is always 'none' in Phase 1 as DB lacks spatial data
  const coordinateMode = 'none';

  return {
    serverId: server.id,
    serverName: server.name,
    mapType,
    worldSize,
    seed,
    hasCustomMap: isCustomMap,
    imageUrl,
    thumbnailUrl,
    mapSourceBadge,
    monumentNames,
    classifiedMonuments,
    coordinateMode,
    markers: [],
    availableLayers,
    disabledFutureLayers
  };
}
