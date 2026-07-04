# Phase 1.0 Supabase RLS Smoke

Dieser Ordner enthält die Smoke-Tests zur Verifizierung der Row-Level Security (RLS) Regeln für die Supabase Core-Tabellen des RustMasterTool Projekts.

## Zweck von Phase 1.0
Wir überprüfen, ob unsere initial entworfenen Tabellen (Phase 0.6) und RLS-Policies die Daten wie vorgesehen schützen. Dies stellt sicher, dass kein Cross-User Data Leakage möglich ist.

## Voraussetzungen
- Supabase CLI installiert
- Docker (laufend)
- `psql` im System-PATH verfügbar

## Lokale Ausführung
Führe im Projekt-Root aus:
```bash
npm run db:verify:local
```

Dieser Runner führt folgende Schritte aus:
1. `supabase start`
2. `supabase db reset` (wendet Migrationen lokal an)
3. Führt das Smoke SQL (`phase-1-0-rls-smoke.sql`) über `psql` gegen die lokale DB (127.0.0.1:54322) aus.

## Safety & Guardrails
- **Local Only**: Keine Verbindung zu einer Remote-Umgebung. Führe bare psql niemals gegen eine echte DB aus!
- **Kein supabase link**: Projekt wird nicht an die Cloud gebunden.
- **Kein supabase db push**: Es werden keine Daten in die Cloud gepusht.
- **Keine .env.local**: Secrets oder Remote-URLs werden niemals gelesen.
- `migrations_gated` wird bewusst *nicht* angewendet (es enthält Live-Tabellen, die erst später relevant werden).

## Fallback
Wenn die Supabase CLI, Docker oder `psql` auf dem ausführenden System nicht verfügbar sind, wird der Test sicher abgebrochen (Übersprungen). Der Status in diesem Fall ist **YELLOW** (vorbereitet, aber nicht lokal geprüft). Die SQL-Datei bleibt als Review-Deliverable bestehen.
