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


export async function saveBlueprint(youtubeVideoId: string, notes?: string): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) throw new Error('Not logged in');
    
    // Get DB UUID for the youtube video
    const { data: bp, error: fetchErr } = await supabase
      .from('base_blueprints')
      .select('id')
      .eq('youtube_video_id', youtubeVideoId)
      .single();
      
    if (fetchErr || !bp) throw new Error('Blueprint not found in DB');
    
    const { error } = await supabase
      .from('user_saved_blueprints')
      .upsert({ 
        user_id: session.user.id, 
        blueprint_id: bp.id,
        notes: notes || null
      }, { onConflict: 'user_id,blueprint_id' });
      
    if (error) throw error;
    return true;
  } catch (e) {
    console.error('Error saving blueprint:', e);
    return false;
  }
}

export async function unsaveBlueprint(youtubeVideoId: string): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) throw new Error('Not logged in');
    
    const { data: bp, error: fetchErr } = await supabase
      .from('base_blueprints')
      .select('id')
      .eq('youtube_video_id', youtubeVideoId)
      .single();
      
    if (fetchErr || !bp) return true; // already gone
    
    const { error } = await supabase
      .from('user_saved_blueprints')
      .delete()
      .eq('user_id', session.user.id)
      .eq('blueprint_id', bp.id);
      
    if (error) throw error;
    return true;
  } catch (e) {
    console.error('Error unsaving blueprint:', e);
    return false;
  }
}

export async function getSavedBlueprintIds(): Promise<string[]> {
  if (!supabase) return [];
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return [];
    
    const { data, error } = await supabase
      .from('user_saved_blueprints')
      .select('base_blueprints(youtube_video_id)')
      .eq('user_id', session.user.id);
      
    if (error) throw error;
    return (data || []).map(d => (d.base_blueprints as any).youtube_video_id).filter(Boolean);
  } catch (e) {
    console.error('Error getting saved blueprint IDs:', e);
    return [];
  }
}

export async function getSavedBlueprintsFull(): Promise<YouTubeVideoSnippet[]> {
  if (!supabase) return [];
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return [];
    
    const { data, error } = await supabase
      .from('user_saved_blueprints')
      .select('base_blueprints(*)')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    return (data || []).map(d => {
      const item = d.base_blueprints as any;
      if (!item) return null;
      return {
        id: item.youtube_video_id,
        title: item.title,
        channelTitle: item.channel_title,
        channelId: item.channel_id,
        description: item.description,
        thumbnailUrl: item.thumbnail_url,
        publishedAt: item.published_at,
      };
    }).filter(Boolean) as YouTubeVideoSnippet[];
  } catch (e) {
    console.error('Error getting saved blueprints full:', e);
    return [];
  }
}

