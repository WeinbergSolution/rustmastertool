import type { Watchlist, WatchlistItem, NormalizedServer } from './types';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { MOCK_SERVERS } from '../../data/fixtures/servers';

export interface WatchlistRepository {
  getUserWatchlists(userId: string): Promise<Watchlist[]>;
  getWatchlistItems(watchlistId: string): Promise<WatchlistItem[]>;
}

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
    // Return all mock servers as part of the fixture watchlist
    return MOCK_SERVERS.map((server: any, index: number) => ({
      id: `fixture-item-${index}`,
      watchlistId,
      providerServerId: server.id,
      addedAt: new Date().toISOString(),
      server: server as unknown as NormalizedServer
    }));
  }
}

class SupabaseWatchlistRepository implements WatchlistRepository {
  async getUserWatchlists(_userId: string): Promise<Watchlist[]> {
    if (!isSupabaseConfigured() || !supabase) {
      console.warn('Supabase client not configured. Returning empty watchlists.');
      return [];
    }
    // Auth will be added in Phase 0.7/1.0
    // const { data, error } = await supabase.from('user_watchlists').select('*').eq('user_id', _userId);
    console.warn('Supabase mode active but live queries are currently gated. Returning empty.');
    return [];
  }

  async getWatchlistItems(_watchlistId: string): Promise<WatchlistItem[]> {
    if (!isSupabaseConfigured() || !supabase) {
      console.warn('Supabase client not configured. Returning empty watchlist items.');
      return [];
    }
    // const { data, error } = await supabase.from('watchlist_items').select('*, server:provider_servers(*)').eq('watchlist_id', watchlistId);
    console.warn('Supabase mode active but live queries are currently gated. Returning empty.');
    return [];
  }
}

const dataMode = import.meta.env.VITE_DATA_MODE || 'fixture';

export const watchlistRepository: WatchlistRepository = 
  dataMode === 'supabase' ? new SupabaseWatchlistRepository() : new FixtureWatchlistRepository();
