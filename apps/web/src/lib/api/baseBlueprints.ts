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

  const { data, error } = await supabase.functions.invoke('base-blueprints', {
    method: 'POST',
    body: {
      action: 'search',
      q: query,
      maxResults
    }
  });

  if (error) {
    console.error('Error fetching base blueprints:', error);
    return [];
  }

  return data?.items || [];
}
