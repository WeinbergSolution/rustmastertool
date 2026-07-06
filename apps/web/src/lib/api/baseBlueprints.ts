import { supabase } from '../supabaseClient';

export interface YouTubeVideoSnippet {
  id: string;
  title: string;
  channelTitle: string;
  channelId: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
}

export async function searchBaseBlueprints(query: string, maxResults: number = 12): Promise<YouTubeVideoSnippet[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase.functions.invoke('base-blueprints', {
      method: 'POST',
      body: {
        action: 'search',
        q: query,
        maxResults
      }
    });

    if (error) {
      if (error.name === 'FunctionsFetchError') {
        throw new Error('NOT_DEPLOYED');
      }
      throw error;
    }

    if (data?.error === 'YOUTUBE_API_KEY_MISSING') {
      throw new Error('YOUTUBE_API_KEY_MISSING');
    }

    return data?.items || [];
  } catch (err: any) {
    if (err.message === 'NOT_DEPLOYED') throw new Error('NOT_DEPLOYED');
    if (err.message === 'YOUTUBE_API_KEY_MISSING') throw new Error('YOUTUBE_API_KEY_MISSING');
    if (err.name === 'FunctionsFetchError') throw new Error('NOT_DEPLOYED');
    console.error('Error fetching base blueprints:', err);
    throw err;
  }
}

export interface DiscoverRowRequest {
  key: string;
  title: string;
  query: string;
  maxResults?: number;
}

export interface DiscoverRowResponse extends DiscoverRowRequest {
  items: YouTubeVideoSnippet[];
  source?: 'cache' | 'youtube' | 'mixed';
  error?: {
    code: string;
    status: number;
    message: string;
  };
}

export async function discoverBaseBlueprints(rows: DiscoverRowRequest[]): Promise<DiscoverRowResponse[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase.functions.invoke('base-blueprints', {
      method: 'POST',
      body: {
        action: 'discover',
        rows
      }
    });

    if (error) {
      if (error.name === 'FunctionsFetchError') {
        throw new Error('NOT_DEPLOYED');
      }
      throw error;
    }

    if (data?.error === 'YOUTUBE_API_KEY_MISSING') {
      throw new Error('YOUTUBE_API_KEY_MISSING');
    }

    return data?.rows || [];
  } catch (err: any) {
    if (err.message === 'NOT_DEPLOYED') throw new Error('NOT_DEPLOYED');
    if (err.name === 'FunctionsFetchError') throw new Error('NOT_DEPLOYED');
    console.error('Error discovering base blueprints:', err);
    throw err;
  }
}

export async function refreshBaseBlueprints(rows: DiscoverRowRequest[], maxRows?: number): Promise<DiscoverRowResponse[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase.functions.invoke('base-blueprints', {
      method: 'POST',
      body: {
        action: 'refresh',
        rows,
        maxRows
      }
    });

    if (error) {
      if (error.name === 'FunctionsFetchError') {
        throw new Error('NOT_DEPLOYED');
      }
      throw error;
    }

    return data?.rows || [];
  } catch (err: any) {
    if (err.message === 'NOT_DEPLOYED') throw new Error('NOT_DEPLOYED');
    if (err.name === 'FunctionsFetchError') throw new Error('NOT_DEPLOYED');
    console.error('Error refreshing base blueprints:', err);
    throw err;
  }
}
