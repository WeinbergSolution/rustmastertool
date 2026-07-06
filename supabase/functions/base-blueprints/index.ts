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
      const rows = body.rows || [];
      if (!Array.isArray(rows)) throw new Error('Invalid rows parameter');

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
