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
    const { action, query, serverId } = await req.json()
    
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
      const safeQuery = encodeURIComponent(query || '').slice(0, 100) // max 100 chars
      url = `https://api.battlemetrics.com/servers?filter[game]=rust&filter[search]=${safeQuery}&page[size]=15`
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
