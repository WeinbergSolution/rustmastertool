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
  /** URL to open the full interactive map on rustmaps.com */
  rustmapsViewerUrl?: string;
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
    mapSourceBadge = 'Map preview';
  } else if (thumbnailUrl) {
    mapSourceBadge = 'Map thumbnail preview';
  }

  // Prefer an explicit RustMaps viewer URL if the data source already carries
  // one; otherwise construct the canonical seed+size viewer URL. When neither is
  // available the URL stays undefined and the UI shows a disabled link.
  const explicitViewerUrl = [
    server.rustmaps_map_url,
    server.rustmapsUrl,
    server.url,
    server.mapImageUrl,
  ].find((u): u is string => typeof u === 'string' && u.includes('rustmaps.com/map'));

  let rustmapsViewerUrl: string | undefined = explicitViewerUrl;
  if (!rustmapsViewerUrl && worldSize && seed) {
    rustmapsViewerUrl = `https://rustmaps.com/map/${worldSize}_${seed}`;
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
    rustmapsViewerUrl,
    monumentNames,
    classifiedMonuments,
    coordinateMode,
    markers: [],
    availableLayers,
    disabledFutureLayers
  };
}
