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

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase configuration missing');
    }
    const supabase = createClient(supabaseUrl, supabaseKey);

    if (action === 'search') {
      const query = body.q || url.searchParams.get('q') || 'rust starter base';
      const maxResults = Math.min(parseInt(body.maxResults || url.searchParams.get('maxResults') || '12'), 24);
      
      const { data: searchResults, error: searchError } = await supabase
        .from('base_blueprints')
        .select('*')
        .or(`title.ilike.%${query}%,category.ilike.%${query}%`)
        .limit(maxResults);
        
      if (searchError) {
        throw new Error(`DB Error: ${searchError.message}`);
      }

      const results = (searchResults || []).map((item: any) => ({
        id: item.youtube_video_id,
        title: item.title,
        channelTitle: item.channel_title,
        channelId: item.channel_id,
        description: item.description,
        thumbnailUrl: item.thumbnail_url,
        publishedAt: item.published_at,
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
          { key: 'trap', title: 'Trap Bases', query: 'rust trap base build', maxResults: 12 }
        ];
      }

      // Fetch all cached items
      const { data: dbItems, error: dbError } = await supabase
        .from('base_blueprints')
        .select('*');

      if (dbError) {
        return new Response(JSON.stringify({ error: 'DB_ERROR', message: dbError.message }), { status: 500, headers: corsHeaders });
      }

      const processedRows = rows.map((row: any) => {
        const rowKey = row.key;
        const maxRes = Math.min(parseInt(row.maxResults || '12'), 20);
        
        const cachedForCategory = (dbItems || [])
          .filter((i: any) => i.category === rowKey || (i.tags && Array.isArray(i.tags) && i.tags.includes(rowKey)))
          .sort((a: any, b: any) => (a.category === rowKey ? -1 : 1))
          .slice(0, maxRes)
          .map((i: any) => ({
            id: i.youtube_video_id,
            title: i.title,
            channelTitle: i.channel_title,
            channelId: i.channel_id,
            description: i.description,
            thumbnailUrl: i.thumbnail_url,
            publishedAt: i.published_at,
          }));

        return {
          ...row,
          source: 'cache',
          items: cachedForCategory
        };
      });

      return new Response(
        JSON.stringify({ rows: processedRows }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    if (action === 'refresh') {
      const apiKey = Deno.env.get('YOUTUBE_API_KEY');
      if (!apiKey) {
        return new Response(
          JSON.stringify({ error: 'YOUTUBE_API_KEY_MISSING', message: 'YouTube integration is not configured.' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      let rowsToRefresh = body.rows;
      if (!rowsToRefresh || !Array.isArray(rowsToRefresh) || rowsToRefresh.length === 0) {
        return new Response(JSON.stringify({ error: 'BAD_REQUEST', message: 'No rows provided to refresh' }), { status: 400, headers: corsHeaders });
      }
      
      const maxRows = body.maxRows ? parseInt(body.maxRows) : rowsToRefresh.length;
      rowsToRefresh = rowsToRefresh.slice(0, maxRows);

      const processedRows: any[] = [];
      const chunkSize = 3;
      
      for (let i = 0; i < rowsToRefresh.length; i += chunkSize) {
        const chunk = rowsToRefresh.slice(i, i + chunkSize);
        const chunkPromises = chunk.map(async (row: any) => {
          try {
            const query = row.query || 'rust base build';
            const maxResults = Math.min(parseInt(row.maxResults || '12'), 12);
            const res = await fetch(`${YOUTUBE_API_URL}/search?part=snippet&type=video&q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${apiKey}`);
            
            if (!res.ok) {
              const code = res.status === 429 ? 'YOUTUBE_RATE_LIMITED' : 'YOUTUBE_API_ERROR';
              return { ...row, error: { code, status: res.status, message: `API returned ${res.status}` }, items: [], source: 'youtube' };
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
              raw_youtube: item
            })).filter((item: any) => item.id);
            
            // Upsert to DB
            const upserts = items.map((item: any) => ({
              youtube_video_id: item.id,
              title: item.title,
              channel_title: item.channelTitle,
              channel_id: item.channelId,
              description: item.description,
              thumbnail_url: item.thumbnailUrl,
              published_at: item.publishedAt,
              raw_youtube: item.raw_youtube,
              category: row.key,
              default_search_query: row.query,
              source: 'youtube',
              last_synced_at: new Date().toISOString()
            }));

            if (upserts.length > 0) {
              const { error: upsertError } = await supabase
                .from('base_blueprints')
                .upsert(upserts, { onConflict: 'youtube_video_id' });
              
              if (upsertError) {
                console.error('DB Upsert Error:', upsertError);
                return { ...row, error: { code: 'DB_UPSERT_ERROR', status: 500, message: upsertError.message }, items: [], source: 'youtube' };
              }
            }
            
            const cleanItems = items.map((i: any) => {
              const { raw_youtube, ...rest } = i;
              return rest;
            });

            return { ...row, items: cleanItems, source: 'youtube' };
          } catch (e: any) {
            return { ...row, error: { code: 'NETWORK_ERROR', status: 0, message: e.message }, items: [], source: 'youtube' };
          }
        });

        const chunkResults = await Promise.allSettled(chunkPromises);
        chunkResults.forEach((result, idx) => {
          if (result.status === 'fulfilled') {
            processedRows.push(result.value);
          } else {
            processedRows.push({ 
              ...chunk[idx], 
              error: { code: 'UNKNOWN_ERROR', status: 500, message: result.reason?.message || 'Unknown error' }, 
              items: [], 
              source: 'youtube' 
            });
          }
        });

        if (i + chunkSize < rowsToRefresh.length) {
          await new Promise(resolve => setTimeout(resolve, 400));
        }
      }

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
