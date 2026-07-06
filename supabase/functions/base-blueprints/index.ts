import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.47.14";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const body = req.method === 'POST' ? await req.json().catch(() => ({})) : {};
    const action = body.action || url.searchParams.get('action');

    const apiKey = Deno.env.get('YOUTUBE_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'YOUTUBE_API_KEY_MISSING', message: 'YouTube integration is not configured.' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'search') {
      const query = body.q || url.searchParams.get('q') || 'rust starter base';
      const maxResults = Math.min(parseInt(body.maxResults || url.searchParams.get('maxResults') || '12'), 24);
      
      const res = await fetch(`${YOUTUBE_API_URL}/search?part=snippet&type=video&q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${apiKey}`);
      
      if (!res.ok) {
        throw new Error(`YouTube API returned ${res.status}`);
      }

      const data = await res.json();
      
      const results = data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        channelId: item.snippet.channelId,
        description: item.snippet.description,
        thumbnailUrl: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
        publishedAt: item.snippet.publishedAt,
      }));

      return new Response(
        JSON.stringify({ items: results }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    if (action === 'discover') {
      let rows = body.rows;
      if (!rows || !Array.isArray(rows) || rows.length === 0) {
        rows = [
          { key: 'solo', title: 'Solo Base Builds', query: 'rust solo base build', maxResults: 12 },
          { key: 'duo', title: 'Duo Base Builds', query: 'rust duo base build', maxResults: 12 },
          { key: 'trio', title: 'Trio Base Builds', query: 'rust trio base build', maxResults: 12 },
          { key: 'starter', title: 'Starter / Wipe Day Bases', query: 'rust starter base wipe day build', maxResults: 12 },
          { key: 'bunker', title: 'Bunker Bases', query: 'rust bunker base build', maxResults: 12 },
          { key: 'trap', title: 'Trap Bases', query: 'rust trap base build', maxResults: 12 },
          { key: 'air', title: 'Air Bases', query: 'rust air base build', maxResults: 12 },
          { key: 'monument', title: 'Monument / Near Monument Bases', query: 'rust monument base build near monument', maxResults: 12 },
          { key: 'unraidable', title: 'Unraidable / High Defense Bases', query: 'rust unraidable base build high defense', maxResults: 12 },
          { key: 'cheap', title: 'Cheap / Low Cost Bases', query: 'rust cheap base build low cost', maxResults: 12 },
          { key: 'clan', title: 'Big Clan Bases', query: 'rust clan base build large group', maxResults: 12 },
          { key: 'funny', title: 'Funny / Troll Bases', query: 'rust funny base build troll base', maxResults: 12 },
          { key: 'cave', title: 'Cave Bases', query: 'rust cave base build', maxResults: 12 },
          { key: 'ocean', title: 'Ocean / Water Bases', query: 'rust ocean base water base build', maxResults: 12 },
          { key: 'widegap', title: 'Widegap Bases', query: 'rust widegap base build', maxResults: 12 }
        ];
      }

      const promises = rows.map(async (row: any) => {
        try {
          const query = row.query || 'rust base build';
          const maxResults = Math.min(parseInt(row.maxResults || '8'), 12);
          const res = await fetch(`${YOUTUBE_API_URL}/search?part=snippet&type=video&q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${apiKey}`);
          
          if (!res.ok) {
            return { ...row, error: `API returned ${res.status}`, items: [] };
          }
          const data = await res.json();
          const items = (data.items || []).map((item: any) => ({
            id: item.id?.videoId,
            title: item.snippet?.title,
            channelTitle: item.snippet?.channelTitle,
            channelId: item.snippet?.channelId,
            description: item.snippet?.description,
            thumbnailUrl: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.default?.url,
            publishedAt: item.snippet?.publishedAt,
          })).filter((item: any) => item.id);
          
          return { ...row, items };
        } catch (e: any) {
          return { ...row, error: e.message, items: [] };
        }
      });

      const processedRows = await Promise.all(promises);

      return new Response(
        JSON.stringify({ rows: processedRows }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );

  } catch (error: any) {
    console.error('base-blueprints Error:', error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});
