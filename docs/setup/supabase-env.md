# Supabase Environment Setup

## Zweck der Datei
Diese Datei dokumentiert das Supabase Environment Setup,
welche Werte lokal in .env.local eingetragen werden und
welche Werte niemals committed werden.

## Welche Werte lokal in .env.local eingetragen werden
- SUPABASE_PROJECT_NAME
- SUPABASE_PROJECT_REF
- SUPABASE_REGION
- SUPABASE_URL
- SUPABASE_ANON_KEY
- SUPABASE_PUBLISHABLE_KEY
- SUPABASE_SERVICE_ROLE_KEY
- SUPABASE_SECRET_KEY
- DATABASE_URL
- DIRECT_URL
- POSTGRES_VERSION
- SUPABASE_PLAN
- SUPABASE_STORAGE_ENABLED
- SUPABASE_REALTIME_ENABLED
- EXT_TIMESCALEDB
- EXT_PG_CRON
- EXT_PG_NET
- EXT_POSTGIS
- EXT_PG_PARTMAN

## Welche Werte niemals committed werden
Die .env.local Datei darf niemals committed werden. Alle echten Keys, URLs, DB-Connection-Strings (mit Passwort) dürfen nicht ins Repository gelangen.

## Unterschied zwischen anon/publishable und service_role/secret
- **anon/publishable key**: Sicher für die Nutzung im Browser (Client-seitig), solange Row Level Security (RLS) Policies korrekt in der Datenbank konfiguriert sind.
- **service_role/secret key**: Hat vollständige Admin-Rechte auf die Datenbank und umgeht RLS. Darf nur serverseitig (Backend/Edge Functions) verwendet werden.

## Unterschied zwischen DATABASE_URL und DIRECT_URL
- **DATABASE_URL**: Wird in der Regel für den App-Laufzeitbetrieb verwendet (häufig über einen Connection Pooler).
- **DIRECT_URL**: Wird für Migrationen oder direkte Schema-Operationen verwendet, bei denen keine Session-Einschränkungen (wie im Pooler) erwünscht sind.

## Hinweis:
Supabase ist aktuell nur vorbereiteter Kandidat für Database/Auth/Storage.
Noch keine finale DB-Entscheidung.
Supabase ersetzt nicht automatisch Rust+ Connector, Worker, Alert Engine oder Realtime Gateway.

## Hinweis:
Service Role / Secret Key nur serverseitig verwenden.

## Hinweis:
Frontend darf niemals Service Role / Secret Key erhalten.

## Hinweis:
echte DB-Connection-Strings enthalten Passwort und dürfen nicht in Reports/Chat/Docs stehen.
