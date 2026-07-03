export interface NormalizedServerSnapshot {
  source: 'battlemetrics';
  battlemetricsServerId: string;
  name: string;
  status: string;
  players: number;
  maxPlayers: number;
  queue?: number;
  rank?: number;
  country?: string;
  address?: string;
  port?: number;
  queryPort?: number;
  mapName?: string;
  rustWorldSeed?: number;
  rustWorldSize?: number;
  rustLastWipe?: string;
  rustLastSeedChange?: string;
  rustBorn?: string;
  rustEntityCount?: number;
  rustFps?: number;
  rustFpsAvg?: number;
  updatedAt: string;
  rawDetailsKeys: string[];
}

export interface WipeDetectionResult {
  wipeDetected: boolean;
  confidence: 'low' | 'medium' | 'high';
  kind: 'map' | 'full' | 'unknown';
  reasons: string[];
}
