# Vercel Production Deployment Runbook

**Project ID:** prj_oJaSYqEAs878vazKkCRguu08ftPO
**Production Domain:** rustmastertool-web.vercel.app

## 1. Environment Variables in Vercel
In order for the Vercel production build to connect to the Supabase database instead of falling back to local mock fixtures, the following Environment Variables MUST be configured in your Vercel Project Settings (Settings > Environment Variables):

| Variable Name | Value / Source | Environments |
| --- | --- | --- |
| `VITE_DATA_MODE` | `supabase` | Production, Preview, Development |
| `VITE_SUPABASE_URL` | E.g. `https://fcmjevwfuwzqtpozwigf.supabase.co` | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase `anon` public key | Production, Preview, Development |

**CRITICAL SECURITY WARNING:**
- NEVER set `SUPABASE_SERVICE_ROLE_KEY` in Vercel.
- NEVER set `SERVER_PULSE_INGEST_SECRET` in Vercel.
- NEVER set `YOUTUBE_API_KEY` in Vercel.
- NEVER set `RUSTMAPS_API_KEY` anywhere (we do not use the API).

## 2. Supabase Configuration (Auth & Edge Functions)
To allow Steam authentication to work from the Vercel production domain, you must configure Supabase:

### A. Edge Function Secrets
The `steam-auth` edge function uses CORS and Origin validation. You must add the Vercel domain to the edge function secrets.
1. Go to Supabase Dashboard > Project Settings > Edge Functions.
2. Add a new secret:
   - **Name:** `ALLOWED_ORIGIN`
   - **Value:** `https://rustmastertool-web.vercel.app`

### B. Auth Redirect URLs (Optional but recommended)
1. Go to Supabase Dashboard > Authentication > URL Configuration.
2. Under "Site URL", ensure it points to `https://rustmastertool-web.vercel.app`.
3. Under "Redirect URLs", add `https://rustmastertool-web.vercel.app/**`.

## 3. Vercel Build Settings
Ensure your Vercel build settings are correct for a Vite Monorepo:
- **Framework Preset:** Vite
- **Root Directory:** `apps/web`
- **Build Command:** `npm run build` (or `vite build`)
- **Output Directory:** `dist`
- **Install Command:** `npm install` (executed from the repo root if it's a standard workspace)

## 4. Debug Checklist
If data is still not loading after setting the variables:
- **Check Vercel Logs:** Ensure the build didn't fail and variables were available during build/runtime.
- **Check Browser Console:** Look for CORS errors. If you see CORS errors on `steam-auth`, `ALLOWED_ORIGIN` is missing in Supabase Edge Secrets.
- **Check Network Tab:** Verify that the API requests are going to `https://fcmjevwfuwzqtpozwigf.supabase.co/...` and not `localhost`.
