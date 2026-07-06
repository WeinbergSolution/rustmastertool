import { serve } from "https://deno.land/std@0.177.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const { action, query, serverId, pageSize, rust_type, sort, nextUrl } = body
    
    // Normalize token usage
    const token = Deno.env.get("BATTLEMETRICS_TOKEN")
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    }
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    } else {
      console.log("token not configured; using public BattleMetrics access")
    }

    const abortController = new AbortController()
    const timeoutId = setTimeout(() => abortController.abort(), 10000)

    let url = ''

    if (action === 'search') {
      if (nextUrl && nextUrl.startsWith('https://api.battlemetrics.com/servers')) {
        url = nextUrl;
      } else {
        const size = pageSize ? parseInt(pageSize) : 25;
        const params = new URLSearchParams();
        params.append('filter[game]', 'rust');
        params.append('page[size]', (size > 100 ? 100 : size).toString());
        
        if (query) {
          params.append('filter[search]', query.slice(0, 100));
        }
        if (rust_type && ['official', 'community', 'modded'].includes(rust_type.toLowerCase())) {
          params.append('filter[rust_type]', rust_type.toLowerCase());
        }
        if (sort) {
          params.append('sort', sort);
        }
        url = `https://api.battlemetrics.com/servers?${params.toString()}`;
      }
    } else if (action === 'details' && serverId) {
      const safeId = encodeURIComponent(serverId)
      url = `https://api.battlemetrics.com/servers/${safeId}`
    } else {
      return new Response(JSON.stringify({ error: 'Invalid action or missing parameters' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const response = await fetch(url, {
      method: 'GET',
      headers,
      signal: abortController.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`BattleMetrics API Error: ${response.status} ${response.statusText}`, errorText)
      return new Response(JSON.stringify({ error: `BattleMetrics API Error: ${response.status}` }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const data = await response.json()

    // If it's a details request and we have a valid server response, upsert it to provider_servers
    if (action === 'details' && data?.data?.type === 'server') {
      const server = data.data;
      const attrs = server.attributes;
      
      const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
      
      if (supabaseUrl && supabaseServiceKey) {
        // Dynamically import createClient to avoid heavy cold start if not needed for search
        const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2.39.0');
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
          auth: { persistSession: false, autoRefreshToken: false }
        });
        
        try {
          const { data: upsertedData, error } = await supabaseAdmin.from('provider_servers').upsert({
            provider_type: 'battlemetrics',
            provider_id: server.id,
            name: attrs.name || 'Unknown',
            address: attrs.ip,
            port: attrs.port,
            status: attrs.status === 'online' ? 'online' : 'offline',
            players: attrs.players || 0,
            max_players: attrs.maxPlayers || 0,
            country: attrs.country,
            map_name: attrs.details?.map || '',
            fps: attrs.details?.fps,
            entity_count: attrs.details?.rust_ent_cnt_i,
            updated_at: new Date().toISOString()
          }, { onConflict: 'provider_type,provider_id' })
          .select('id')
          .single();
          
          if (error) {
            console.error('Failed to upsert provider_server', error);
          } else if (upsertedData) {
            // Append the internal UUID to the response so the frontend knows the active_server_id
            data.data.internal_uuid = upsertedData.id;
          }
        } catch (dbError) {
          console.error('DB Upsert Error', dbError);
        }
      }
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Edge Function Error:', error)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
