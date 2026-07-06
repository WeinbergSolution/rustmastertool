# Runbook: Server Pulse Ingestion

## Zweck
Dieses Runbook beschreibt, wie die `server-pulse-ingest` Edge Function ausgeführt wird, um historische Population-Snapshots von Rust Servern in unsere Datenbank zu überführen. Diese Daten bilden das Fundament für "Server Pulse" (Population Retention Intelligence).

## Erforderliche Secrets
Folgende Secrets müssen in der Umgebung der Edge Function konfiguriert sein (niemals im Frontend oder Code speichern):
- `SERVER_PULSE_INGEST_SECRET`: Ein sicheres Passwort, das der Caller im Header mitschicken muss.
- `BATTLEMETRICS_TOKEN`: Das API Token für BattleMetrics (serverseitig).
- `SUPABASE_SERVICE_ROLE_KEY`: Automatisch von Supabase Edge Functions bereitgestellt.
- `SUPABASE_URL`: Automatisch von Supabase Edge Functions bereitgestellt.

## Manuelle Ingestion Beispiele

Die Ingestion kann via `curl` manuell getriggert werden. 

### Dry-Run (Ohne DB Writes)
Testen, wie viele Server gefunden werden, ohne sie in die DB zu schreiben:
```bash
curl -X POST https://[PROJECT_REF].supabase.co/functions/v1/server-pulse-ingest \
  -H "server-pulse-ingest-secret: [DEIN_SECRET]" \
  -H "Content-Type: application/json" \
  -d '{"category":"official", "maxPages":1, "dryRun": true}'
```

### Official Servers
```bash
curl -X POST https://[PROJECT_REF].supabase.co/functions/v1/server-pulse-ingest \
  -H "server-pulse-ingest-secret: [DEIN_SECRET]" \
  -H "Content-Type: application/json" \
  -d '{"category":"official", "maxPages":5}'
```

### Community Servers
```bash
curl -X POST https://[PROJECT_REF].supabase.co/functions/v1/server-pulse-ingest \
  -H "server-pulse-ingest-secret: [DEIN_SECRET]" \
  -H "Content-Type: application/json" \
  -d '{"category":"community", "maxPages":5}'
```

### Modded Servers
```bash
curl -X POST https://[PROJECT_REF].supabase.co/functions/v1/server-pulse-ingest \
  -H "server-pulse-ingest-secret: [DEIN_SECRET]" \
  -H "Content-Type: application/json" \
  -d '{"category":"modded", "maxPages":5}'
```

## Scheduling Konzept (Später)
Später können wir Supabase pg_cron oder eine externe CI/CD (GitHub Actions) nutzen, um diesen Endpoint automatisch alle X Stunden/Minuten aufzurufen. 

## Rate-Limit Hinweis
BattleMetrics hat Rate Limits. Daher ist die Function hart auf maximal 5 Seiten (a 100 Server = 500 Server) pro Durchlauf limitiert, um nicht unabsichtlich gebannt zu werden. Ein aggressives Crawling ist aktuell untersagt.
