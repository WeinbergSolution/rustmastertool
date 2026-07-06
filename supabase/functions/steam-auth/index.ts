import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';

function getDynamicAllowedOrigins(): string[] {
  const envOrigin = Deno.env.get('ALLOWED_ORIGIN') || '';
  const envOriginsList = Deno.env.get('ALLOWED_ORIGINS') || '';
  
  const defaults = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000'
  ];
  
  const fromEnv = [
    envOrigin,
    ...envOriginsList.split(',')
  ].map(o => o.trim()).filter(Boolean);
  
  return [...defaults, ...fromEnv];
}

function normalizeOrigin(urlStr: string): string | null {
  try {
    const url = new URL(urlStr);
    return url.origin; // returns protocol://host:port without trailing slashes or paths
  } catch (e) {
    // If it's just 'http://localhost:5173' it parses fine
    return null;
  }
}

function isValidOrigin(originStr: string | null): boolean {
  if (!originStr) return false;
  const normalizedInput = normalizeOrigin(originStr);
  if (!normalizedInput) return false;

  const allowed = getDynamicAllowedOrigins();
  return allowed.some(allowedStr => {
    const normAllowed = normalizeOrigin(allowedStr);
    return normAllowed === normalizedInput;
  });
}

function getCorsHeaders(req: Request) {
  const requestOrigin = req.headers.get('origin');
  const allowedOrigin = requestOrigin && isValidOrigin(requestOrigin) ? requestOrigin : '';
  
  // If not allowed, we don't set a wildcard anymore to prevent open redirect/CORS issues.
  // Actually, for preflight we can return the exact origin if valid, otherwise empty.
  return {
    'Access-Control-Allow-Origin': allowedOrigin || 'null',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get('action');

    if (action === 'login') {
      const clientOrigin = url.searchParams.get('origin') || req.headers.get('referer') || '';
      const cleanOrigin = clientOrigin.replace(/\/$/, ''); // strip trailing slash

      if (!isValidOrigin(cleanOrigin)) {
        return new Response('Invalid origin', { status: 403, headers: corsHeaders });
      }

      // Build the callback URL for this edge function
      // Supabase Edge Functions terminate SSL at the gateway and strip /functions/v1 from req.url
      // We must reconstruct the public URL using SUPABASE_URL if available
      const supabaseUrl = Deno.env.get('SUPABASE_URL');
      const requestUrl = new URL(req.url);
      
      const functionBaseUrl = supabaseUrl 
        ? `${supabaseUrl}/functions/v1/steam-auth` 
        : `${requestUrl.origin}/functions/v1/steam-auth`; // fallback for local dev if SUPABASE_URL isn't set perfectly
        
      const callbackUrl = new URL(functionBaseUrl);
      
      callbackUrl.searchParams.set('action', 'callback');
      callbackUrl.searchParams.set('client_origin', cleanOrigin);
      
      const returnTo = callbackUrl.toString();
      // Realm should be the project root
      const realm = supabaseUrl || requestUrl.origin;

      const steamOpenIdUrl = new URL('https://steamcommunity.com/openid/login');
      steamOpenIdUrl.searchParams.set('openid.ns', 'http://specs.openid.net/auth/2.0');
      steamOpenIdUrl.searchParams.set('openid.mode', 'checkid_setup');
      steamOpenIdUrl.searchParams.set('openid.return_to', returnTo);
      steamOpenIdUrl.searchParams.set('openid.realm', realm);
      steamOpenIdUrl.searchParams.set('openid.identity', 'http://specs.openid.net/auth/2.0/identifier_select');
      steamOpenIdUrl.searchParams.set('openid.claimed_id', 'http://specs.openid.net/auth/2.0/identifier_select');

      return Response.redirect(steamOpenIdUrl.toString(), 302);
    }

    if (action === 'callback') {
      const clientOrigin = url.searchParams.get('client_origin') || '';
      if (!isValidOrigin(clientOrigin)) {
        return new Response('Invalid client origin in callback', { status: 403, headers: corsHeaders });
      }

      // Verify the OpenID payload with Steam
      const steamParams = new URLSearchParams();
      for (const [key, value] of url.searchParams.entries()) {
        if (key.startsWith('openid.')) {
          steamParams.set(key, value);
        }
      }
      steamParams.set('openid.mode', 'check_authentication');

      const verifyRes = await fetch('https://steamcommunity.com/openid/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: steamParams.toString(),
      });

      const verifyText = await verifyRes.text();
      if (!verifyText.includes('is_valid:true')) {
        console.error('Steam authentication failed', verifyText);
        return Response.redirect(`${clientOrigin}/?error=steam_auth_failed`, 302);
      }

      const claimedId = url.searchParams.get('openid.claimed_id');
      const steamId64Match = claimedId?.match(/\/id\/(\d+)$/);
      if (!steamId64Match) {
        return Response.redirect(`${clientOrigin}/?error=invalid_steam_id`, 302);
      }
      const steamId = steamId64Match[1];

      // Optional: Get Player Summaries for Persona Name and Avatar
      let personaName: string | null = null;
      let avatarUrl: string | null = null;
      const steamApiKey = Deno.env.get('STEAM_API_KEY');
      if (steamApiKey) {
        try {
          const profileRes = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${steamApiKey}&steamids=${steamId}`);
          if (profileRes.ok) {
            const profileData = await profileRes.json();
            const player = profileData.response?.players?.[0];
            if (player) {
              personaName = player.personaname;
              avatarUrl = player.avatarfull;
            }
          }
        } catch (e) {
          console.error('Failed to fetch Steam profile', e);
        }
      }

      // Initialize Supabase Admin Client
      const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
      const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        }
      });

      // Find or create user
      const email = `${steamId}@steam.rustmastertool.local`;
      let userId: string;

      const { data: searchData, error: searchError } = await supabaseAdmin.auth.admin.listUsers();
      let user = searchData?.users?.find(u => u.email === email);

      if (!user) {
        const { data: createData, error: createError } = await supabaseAdmin.auth.admin.createUser({
          email,
          email_confirm: true,
          user_metadata: {
            steam_id: steamId,
            persona: personaName,
            avatar: avatarUrl
          }
        });
        if (createError) {
          console.error('Failed to create user', createError);
          return Response.redirect(`${clientOrigin}/?error=user_creation_failed`, 302);
        }
        user = createData.user;
      }

      // Upsert into profiles (as service_role to bypass authenticated restrictions)
      if (user) {
         await supabaseAdmin.from('profiles').upsert({
           id: user.id,
           username: personaName || steamId,
           avatar_url: avatarUrl,
           steam_id: steamId,
           steam_persona_name: personaName,
           last_steam_sync_at: new Date().toISOString()
         });
      }

      // Generate Magic Link OTP
      const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
        type: 'magiclink',
        email
      });

      if (linkError || !linkData?.properties?.action_link) {
        console.error('Failed to generate magic link', linkError);
        return Response.redirect(`${clientOrigin}/?error=session_generation_failed`, 302);
      }

      // Extract token_hash from action_link
      // action_link format: https://[project].supabase.co/auth/v1/verify?token=...&type=magiclink
      // Supabase normally puts `token_hash` in the link. 
      // If generateLink returns `token` (PKCE) or `token_hash`, we extract it.
      const actionLinkUrl = new URL(linkData.properties.action_link);
      const token = actionLinkUrl.searchParams.get('token');
      const tokenHash = actionLinkUrl.searchParams.get('token_hash') || token; // Fallback to token if token_hash isn't used directly

      if (!tokenHash) {
        console.error('No token found in action link', linkData.properties.action_link);
        return Response.redirect(`${clientOrigin}/?error=invalid_action_link`, 302);
      }

      // Redirect back to frontend
      const frontendCallbackUrl = new URL('/auth/steam/callback', clientOrigin);
      frontendCallbackUrl.searchParams.set('token_hash', tokenHash);
      
      return Response.redirect(frontendCallbackUrl.toString(), 302);
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400, headers: corsHeaders });
  } catch (error) {
    console.error('Edge Function Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers: corsHeaders });
  }
});
