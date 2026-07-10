import { MAP_MONUMENTS } from './mapIntelData';
import { DEEP_MONUMENT_DATA } from './mapIntelDeepData';
import type { MapMonument } from './mapIntelData';
import type { DeepMonumentData } from './mapIntelDeepData';

export interface MapIntelLookupResult {
  id: string;
  base?: MapMonument;
  deep?: DeepMonumentData;
  name: string;
  categoryId: string;
}

export function findMapIntelEntryByCanonicalId(canonicalId: string): MapIntelLookupResult | undefined {
  if (!canonicalId) return undefined;
  
  // Normalize
  const normalizedId = canonicalId.trim().toLowerCase();
  
  // Base entry
  const baseEntry = MAP_MONUMENTS.find(m => m.id === normalizedId);
  
  // Deep entry
  const deepEntry = DEEP_MONUMENT_DATA[normalizedId];
  
  // If neither exists, we don't have map intel for it
  if (!baseEntry && !deepEntry) {
    return undefined;
  }
  
  // Alias mapping
  const aliases: Record<string, string> = {
    'military_base': 'abandoned_military_base'
  };
  
  const mappedId = aliases[normalizedId] || normalizedId;
  const mappedBaseEntry = MAP_MONUMENTS.find(m => m.id === mappedId) || baseEntry;
  const mappedDeepEntry = DEEP_MONUMENT_DATA[mappedId] || deepEntry;
  
  return {
    id: mappedId,
    base: mappedBaseEntry,
    deep: mappedDeepEntry,
    name: mappedBaseEntry?.name || mappedDeepEntry?.name || mappedId,
    categoryId: mappedBaseEntry?.categoryId || 'unknown'
  };
}
