import type { Watchlist, WatchlistItem, NormalizedServer } from './types';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { MOCK_SERVERS } from '../../data/fixtures/servers';

export interface WatchlistRepository {
  getUserWatchlists(userId: string): Promise<Watchlist[]>;
  getWatchlistItems(watchlistId: string): Promise<WatchlistItem[]>;

  getWatchedServerIds(): Promise<string[]>;
  setWatchedServerIds(ids: string[]): Promise<void>;
  addServer(serverId: string, internalUuid?: string): Promise<string[]>;
  removeServer(serverId: string, internalUuid?: string): Promise<string[]>;
  toggleServer(serverId: string, internalUuid?: string): Promise<string[]>;
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

  async addServer(serverId: string, _internalUuid?: string): Promise<string[]> {
    const current = await this.getWatchedServerIds();
    if (!current.includes(serverId)) {
      const updated = [...current, serverId];
      await this.setWatchedServerIds(updated);
      return updated;
    }
    return current;
  }

  async removeServer(serverId: string, _internalUuid?: string): Promise<string[]> {
    const current = await this.getWatchedServerIds();
    const updated = current.filter(id => id !== serverId);
    await this.setWatchedServerIds(updated);
    return updated;
  }

  async toggleServer(serverId: string, internalUuid?: string): Promise<string[]> {
    const current = await this.getWatchedServerIds();
    if (current.includes(serverId)) {
      return this.removeServer(serverId, internalUuid);
    }
    return this.addServer(serverId, internalUuid);
  }

  async isWatched(serverId: string): Promise<boolean> {
    const current = await this.getWatchedServerIds();
    return current.includes(serverId);
  }
}

class SupabaseWatchlistRepository implements WatchlistRepository {
  async getUserWatchlists(userId: string): Promise<Watchlist[]> {
    if (!isSupabaseConfigured() || !supabase) return [];
    
    // Ensure default watchlist exists (done via migration or manual insert)
    const { data, error } = await supabase.from('user_watchlists').select('*').eq('user_id', userId).order('created_at', { ascending: true });
    if (error) {
      console.error('Failed to get watchlists', error);
      return [];
    }
    
    if (data && data.length === 0) {
       // Create default
       const { data: newData, error: createError } = await supabase.from('user_watchlists').insert({
         user_id: userId,
         name: 'My Watchlist',
         is_default: true
       }).select().single();
       if (!createError && newData) {
         return [newData];
       }
    }
    return data || [];
  }

  async getWatchlistItems(watchlistId: string): Promise<WatchlistItem[]> {
    if (!isSupabaseConfigured() || !supabase) return [];
    
    const { data, error } = await supabase.from('watchlist_items').select('*, provider_servers(*)').eq('watchlist_id', watchlistId);
    if (error) {
       console.error('Failed to fetch watchlist items', error);
       return [];
    }
    return data || [];
  }

  async getWatchedServerIds(): Promise<string[]> {
    if (!isSupabaseConfigured() || !supabase) return [];
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return [];
    
    const watchlists = await this.getUserWatchlists(session.user.id);
    if (watchlists.length === 0) return [];
    
    const items = await this.getWatchlistItems(watchlists[0].id);
    // Returning BattleMetrics IDs for UI state compatibility
    return items.map(item => (item as any).provider_servers?.provider_id).filter(Boolean);
  }

  async setWatchedServerIds(_ids: string[]): Promise<void> {
    // Cannot do this easily because we need internal UUIDs. Handled via add/remove individually.
  }

  async addServer(_serverId: string, internalUuid?: string): Promise<string[]> {
    if (!isSupabaseConfigured() || !supabase || !internalUuid) return [];
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return [];

    const watchlists = await this.getUserWatchlists(session.user.id);
    if (watchlists.length === 0) return [];

    const { error } = await supabase.from('watchlist_items').insert({
      watchlist_id: watchlists[0].id,
      provider_server_id: internalUuid
    });
    if (error) console.error('Failed to add to watchlist', error);

    return this.getWatchedServerIds();
  }

  async removeServer(_serverId: string, internalUuid?: string): Promise<string[]> {
    if (!isSupabaseConfigured() || !supabase || !internalUuid) return [];
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return [];

    const watchlists = await this.getUserWatchlists(session.user.id);
    if (watchlists.length === 0) return [];

    const { error } = await supabase.from('watchlist_items').delete()
      .eq('watchlist_id', watchlists[0].id)
      .eq('provider_server_id', internalUuid);
    
    if (error) console.error('Failed to remove from watchlist', error);

    return this.getWatchedServerIds();
  }

  async toggleServer(serverId: string, internalUuid?: string): Promise<string[]> {
    if (!internalUuid) {
      console.warn('Cannot sync watchlist to cloud without internal UUID.');
      return [];
    }
    
    const current = await this.getWatchedServerIds();
    if (current.includes(serverId)) {
      return this.removeServer(serverId, internalUuid);
    }
    return this.addServer(serverId, internalUuid);
  }

  async isWatched(serverId: string): Promise<boolean> {
    const current = await this.getWatchedServerIds();
    return current.includes(serverId);
  }
}

const dataMode = import.meta.env.VITE_DATA_MODE || 'fixture';

export const watchlistRepository: WatchlistRepository = 
  dataMode === 'supabase' ? new SupabaseWatchlistRepository() : new FixtureWatchlistRepository();
