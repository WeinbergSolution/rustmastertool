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
