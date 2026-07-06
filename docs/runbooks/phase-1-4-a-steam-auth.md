# Phase 1.4-A Steam Auth Edge Function Runbook

This runbook describes the steps necessary to configure the Supabase project to support Steam Authentication via the `steam-auth` Edge Function.

## 1. Secrets Configuration

The `steam-auth` edge function acts as a secure bridge for OpenID 2.0 and the Supabase Admin API. It requires the `SUPABASE_SERVICE_ROLE_KEY` to mint sessions and write to the profiles table, and optionally the `STEAM_API_KEY` to fetch avatar and persona information.

Run the following command against your remote Supabase project to set these secrets. Replace `your_steam_api_key_here` with your actual Steam Web API key. The `service_role` key is already available in your Supabase project settings.

```bash
npx supabase secrets set SUPABASE_SERVICE_ROLE_KEY="your_service_role_key_here" STEAM_API_KEY="your_steam_api_key_here" --project-ref fcmjevwfuwzqtpozwigf
```

*(Note: the Edge Function also needs `SUPABASE_URL`, but this is usually provided automatically by the Supabase Edge Function environment. If not, set it as well.)*

## 2. Allowed Origins

To prevent Open Redirect attacks, the `steam-auth` Edge Function verifies the client origin.
By default, `http://localhost:5173` and `http://localhost:3000` are allowlisted.
For staging/production, you must add your deployed frontend origin:

```bash
npx supabase secrets set ALLOWED_ORIGIN="https://rustmastertool.vercel.app" --project-ref fcmjevwfuwzqtpozwigf
```

## 3. Deploying Edge Functions

Once secrets are set, deploy the updated edge functions:

```bash
npx supabase functions deploy battlemetrics --project-ref fcmjevwfuwzqtpozwigf
npx supabase functions deploy steam-auth --no-verify-jwt --project-ref fcmjevwfuwzqtpozwigf
```

*(Note: `--no-verify-jwt` is critical for `steam-auth` because the user hits it unauthenticated when initiating the login flow!)*

## 4. Applying the Database Migration

Before deploying the Edge Functions, push the new database migration for the `profiles` table to add Steam Identity and Active Server columns.

```bash
npx supabase db push --dry-run --project-ref fcmjevwfuwzqtpozwigf
# ONLY if the dry run looks correct, proceed with:
npx supabase db push --project-ref fcmjevwfuwzqtpozwigf
```
