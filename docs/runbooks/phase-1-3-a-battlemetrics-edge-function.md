# Phase 1.3-A: BattleMetrics Edge Function Runbook

This runbook describes how to test, configure, and deploy the BattleMetrics proxy Edge Function for RustMasterTool.

## 1. Local Serve & Testing

To test the edge function locally, run:
```bash
npx supabase functions serve battlemetrics --no-verify-jwt
```
*Note: `--no-verify-jwt` allows public/unauthenticated access for now. Once we have full Auth, we will enforce JWT validation if required, or keep it open for public server browsing.*

## 2. Set Supabase Secret (Remote)

To configure the real BattleMetrics API Token for the remote environment:
```bash
npx supabase secrets set BATTLEMETRICS_TOKEN="your_real_token_here" --project-ref fcmjevwfuwzqtpozwigf
```
**IMPORTANT: Never commit or post your real token.** 

## 3. Remote Deploy

**OWNER GATE:** Ensure the code has been reviewed and approved before executing this.

To deploy the edge function to Staging (Project Ref: `fcmjevwfuwzqtpozwigf`):
```bash
npx supabase functions deploy battlemetrics --project-ref fcmjevwfuwzqtpozwigf --no-verify-jwt
```

## 4. Smoke Test

You can smoke-test the live deployed function using `curl` or by using the real RustMasterTool web interface.

**cURL Example (Search):**
```bash
curl -X POST https://fcmjevwfuwzqtpozwigf.supabase.co/functions/v1/battlemetrics \
  -H "Content-Type: application/json" \
  -d '{"action": "search", "query": "rust"}'
```

**cURL Example (Details):**
```bash
curl -X POST https://fcmjevwfuwzqtpozwigf.supabase.co/functions/v1/battlemetrics \
  -H "Content-Type: application/json" \
  -d '{"action": "details", "serverId": "12345"}'
```
