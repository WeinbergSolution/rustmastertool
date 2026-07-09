export type MapLayerId = 
  | 'map_image'
  | 'monument_list';

export interface MapLayerConfig {
  id: MapLayerId;
  label: string;
  description: string;
  isActive: boolean;
  isFuture: boolean;
  requiresCoordinates: boolean;
}

export const MAP_LAYERS: Record<MapLayerId, MapLayerConfig> = {
  map_image: {
    id: 'map_image',
    label: 'Map Preview',
    description: 'Map preview thumbnail from RustMaps',
    isActive: true,
    isFuture: false,
    requiresCoordinates: false,
  },
  monument_list: {
    id: 'monument_list',
    label: 'Monument List',
    description: 'List of all known monuments on this map',
    isActive: true,
    isFuture: false,
    requiresCoordinates: false,
  }
};
