import type { Watchlist, WatchlistItem, NormalizedServer } from './types';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { MOCK_SERVERS } from '../../data/fixtures/servers';

export interface WatchlistRepository {
  getUserWatchlists(userId: string): Promise<Watchlist[]>;
  getWatchlistItems(watchlistId: string): Promise<WatchlistItem[]>;

  getWatchedServerIds(): string[];
  setWatchedServerIds(ids: string[]): void;
  addServer(serverId: string): string[];
  removeServer(serverId: string): string[];
  toggleServer(serverId: string): string[];
  isWatched(serverId: string): boolean;
}

const WATCHLIST_STORAGE_KEY = 'rm_fixture_watchlist';

class FixtureWatchlistRepository implements WatchlistRepository {
  async getUserWatchlists(userId: string): Promise<Watchlist[]> {
    return [
      {
        id: 'fixture-watchlist-1',
        userId,
        name: 'My Favorite Servers',
        isDefault: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ];
  }

  async getWatchlistItems(watchlistId: string): Promise<WatchlistItem[]> {
    const watchedIds = this.getWatchedServerIds();
    return MOCK_SERVERS
      .filter((server: any) => watchedIds.includes(server.id))
      .map((server: any, index: number) => ({
        id: `fixture-item-${index}`,
        watchlistId,
        providerServerId: server.id,
        addedAt: new Date().toISOString(),
        server: server as unknown as NormalizedServer
      }));
  }

  getWatchedServerIds(): string[] {
    try {
      if (typeof window === 'undefined') return [];
      
      const saved = window.localStorage.getItem(WATCHLIST_STORAGE_KEY);
      if (!saved) return [];
      
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];
      
      return parsed.filter((value): value is string => typeof value === 'string');
    } catch {
      return [];
    }
  }

  setWatchedServerIds(ids: string[]): void {
    try {
      if (typeof window !== 'undefined') {
        // deduplicate
        const uniqueIds = Array.from(new Set(ids));
        window.localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(uniqueIds));
      }
    } catch {
      // Local fixture persistence is optional. Ignore storage failures.
    }
  }

  addServer(serverId: string): string[] {
    const current = this.getWatchedServerIds();
    if (!current.includes(serverId)) {
      const updated = [...current, serverId];
      this.setWatchedServerIds(updated);
      return updated;
    }
    return current;
  }

  removeServer(serverId: string): string[] {
    const current = this.getWatchedServerIds();
    const updated = current.filter(id => id !== serverId);
    this.setWatchedServerIds(updated);
    return updated;
  }

  toggleServer(serverId: string): string[] {
    const current = this.getWatchedServerIds();
    if (current.includes(serverId)) {
      return this.removeServer(serverId);
    }
    return this.addServer(serverId);
  }

  isWatched(serverId: string): boolean {
    return this.getWatchedServerIds().includes(serverId);
  }
}

class SupabaseWatchlistRepository implements WatchlistRepository {
  async getUserWatchlists(_userId: string): Promise<Watchlist[]> {
    if (!isSupabaseConfigured() || !supabase) {
      console.warn('Supabase client not configured. Returning empty watchlists.');
      return [];
    }
    console.warn('Supabase mode active but live queries are currently gated. Returning empty.');
    return [];
  }

  async getWatchlistItems(_watchlistId: string): Promise<WatchlistItem[]> {
    if (!isSupabaseConfigured() || !supabase) {
      console.warn('Supabase client not configured. Returning empty watchlist items.');
      return [];
    }
    console.warn('Supabase mode active but live queries are currently gated. Returning empty.');
    return [];
  }

  getWatchedServerIds(): string[] {
    return [];
  }

  setWatchedServerIds(_ids: string[]): void {
    // No-op for now
  }

  addServer(_serverId: string): string[] {
    return [];
  }

  removeServer(_serverId: string): string[] {
    return [];
  }

  toggleServer(_serverId: string): string[] {
    return [];
  }

  isWatched(_serverId: string): boolean {
    return false;
  }
}

const dataMode = import.meta.env.VITE_DATA_MODE || 'fixture';

export const watchlistRepository: WatchlistRepository = 
  dataMode === 'supabase' ? new SupabaseWatchlistRepository() : new FixtureWatchlistRepository();
