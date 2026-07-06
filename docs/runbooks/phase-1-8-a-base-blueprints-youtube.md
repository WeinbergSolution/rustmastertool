# Runbook: Base Blueprints YouTube Data

## Übersicht
Das Feature "Base Blueprints" fragt über eine Supabase Edge Function (`base-blueprints`) gezielt Rust Base-Videos über die YouTube Data API v3 ab. Damit der Key geschützt bleibt, geschieht dies rein serverseitig. 

## Erforderliche Secrets
- `YOUTUBE_API_KEY`: Der offizielle YouTube Data API Key (Google Cloud Console).

## Secrets Setzen
```bash
npx supabase secrets set YOUTUBE_API_KEY="AIzaSy..."
```

## Lokales Testen (Dev Server)
Um die Edge Function lokal zu testen:
```bash
npx supabase functions serve base-blueprints --env-file .env.local
```
Die `.env.local` muss hierfür den `YOUTUBE_API_KEY` beinhalten.

## Manueller Test (cURL auf Staging)
Einen Suchaufruf über die API simulieren:

```bash
curl -X POST https://[PROJECT_REF].supabase.co/functions/v1/base-blueprints \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer [SUPABASE_ANON_KEY]" \
  -d '{"action": "search", "q": "Rust bunker base build", "maxResults": 5}'
```

Erwarteter Response:
Ein JSON-Objekt mit einem `items` Array, das Metadaten zu den ersten 5 gefundenen Videos ausgibt.

## Hinweise
Da das Abfragen von YouTube Quota kostet, ist das Limit (`maxResults`) auf maximal 24 gecappt. Später wird die Edge Function Ergebnisse in die DB synchronisieren, sodass nicht jeder Client-Request die YouTube-API trifft.
