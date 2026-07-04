import type { Watchlist, WatchlistItem, NormalizedServer } from './types';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { MOCK_SERVERS } from '../../data/fixtures/servers';

export interface WatchlistRepository {
  getUserWatchlists(userId: string): Promise<Watchlist[]>;
  getWatchlistItems(watchlistId: string): Promise<WatchlistItem[]>;

  getWatchedServerIds(): Promise<string[]>;
  setWatchedServerIds(ids: string[]): Promise<void>;
  addServer(serverId: string): Promise<string[]>;
  removeServer(serverId: string): Promise<string[]>;
  toggleServer(serverId: string): Promise<string[]>;
  isWatched(serverId: string): Promise<boolean>;
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
    const watchedIds = await this.getWatchedServerIds();
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

  async getWatchedServerIds(): Promise<string[]> {
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

  async setWatchedServerIds(ids: string[]): Promise<void> {
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

  async addServer(serverId: string): Promise<string[]> {
    const current = await this.getWatchedServerIds();
    if (!current.includes(serverId)) {
      const updated = [...current, serverId];
      await this.setWatchedServerIds(updated);
      return updated;
    }
    return current;
  }

  async removeServer(serverId: string): Promise<string[]> {
    const current = await this.getWatchedServerIds();
    const updated = current.filter(id => id !== serverId);
    await this.setWatchedServerIds(updated);
    return updated;
  }

  async toggleServer(serverId: string): Promise<string[]> {
    const current = await this.getWatchedServerIds();
    if (current.includes(serverId)) {
      return this.removeServer(serverId);
    }
    return this.addServer(serverId);
  }

  async isWatched(serverId: string): Promise<boolean> {
    const current = await this.getWatchedServerIds();
    return current.includes(serverId);
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

  async getWatchedServerIds(): Promise<string[]> {
    return [];
  }

  async setWatchedServerIds(_ids: string[]): Promise<void> {
    // No-op for now
  }

  async addServer(_serverId: string): Promise<string[]> {
    return [];
  }

  async removeServer(_serverId: string): Promise<string[]> {
    return [];
  }

  async toggleServer(_serverId: string): Promise<string[]> {
    return [];
  }

  async isWatched(_serverId: string): Promise<boolean> {
    return false;
  }
}

const dataMode = import.meta.env.VITE_DATA_MODE || 'fixture';

export const watchlistRepository: WatchlistRepository = 
  dataMode === 'supabase' ? new SupabaseWatchlistRepository() : new FixtureWatchlistRepository();
