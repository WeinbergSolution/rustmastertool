export type MapLayerId = 
  | 'map_image'
  | 'monument_list'
  | 'monument_markers'
  | 'heatmap_population_future'
  | 'heatmap_death_curve_future'
  | 'build_spots_future'
  | 'routes_future';

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
  },
  monument_markers: {
    id: 'monument_markers',
    label: 'Monument Markers',
    description: 'Exact monument positions on map (Coming later)',
    isActive: false,
    isFuture: true,
    requiresCoordinates: true,
  },
  heatmap_population_future: {
    id: 'heatmap_population_future',
    label: 'Population Heatmap',
    description: 'Live population density heatmap (Coming later)',
    isActive: false,
    isFuture: true,
    requiresCoordinates: true,
  },
  heatmap_death_curve_future: {
    id: 'heatmap_death_curve_future',
    label: 'PvP Death Heatmap',
    description: 'Death density and PvP risk zones (Coming later)',
    isActive: false,
    isFuture: true,
    requiresCoordinates: true,
  },
  build_spots_future: {
    id: 'build_spots_future',
    label: 'Base Build Spots',
    description: 'AI rated best building spots (Coming later)',
    isActive: false,
    isFuture: true,
    requiresCoordinates: true,
  },
  routes_future: {
    id: 'routes_future',
    label: 'Loot Routes',
    description: 'Optimal loot and farm routes (Coming later)',
    isActive: false,
    isFuture: true,
    requiresCoordinates: true,
  }
};
