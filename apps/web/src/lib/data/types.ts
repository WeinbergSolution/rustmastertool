export interface RustServerDetails {
  rank?: number;
  queue?: number;
  worldSeed?: number;
  worldSize?: number;
  fps?: number;
  fpsAvg?: number;
  entityCount?: number;
  lastWipe?: string;
  mapName?: string;
}

export interface NormalizedServer extends RustServerDetails {
  id: string; // Internal UUID
  providerType: 'battlemetrics' | 'rustmaps';
  providerId: string;
  name: string;
  address: string;
  port: number;
  status: 'online' | 'offline' | 'dead';
  players: number;
  maxPlayers: number;
  country?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Watchlist {
  id: string;
  userId: string;
  name: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WatchlistItem {
  id: string;
  watchlistId: string;
  providerServerId: string;
  addedAt: string;
  // Hydrated relation
  server?: NormalizedServer;
}

export interface AlertRule {
  id: string;
  userId: string;
  providerServerId: string;
  ruleType: 'population_spike' | 'wipe_detected' | 'offline_detected';
  thresholdValue?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AlertEvent {
  id: string;
  alertRuleId: string;
  userId: string;
  status: 'unread' | 'read' | 'archived';
  message: string;
  firedAt: string;
}

export interface ProviderSourceStatus {
  id: string;
  providerType: 'battlemetrics' | 'rustmaps';
  status: 'healthy' | 'degraded' | 'offline' | 'pending';
  lastCheckAt?: string;
  createdAt: string;
  updatedAt: string;
}
