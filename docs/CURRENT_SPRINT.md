# Current Sprint (Phase 0.4)

**Phase:** Supabase Environment Preparation

## Was geändert wurde
- Gitignore abgesichert.
- Env-Templates (`.env.example`, `.env.local.example`) angelegt.
- Supabase Setup-Doku (`supabase-env.md`, `supabase-project-notes.example.md`) angelegt.
- ADR-005, DECISIONS und OPEN_QUESTIONS aktualisiert.

## Was nicht gemacht wurde
- Keine echten Keys oder Datenbankverbindungen konfiguriert/committed.
- Keine Supabase-Integration oder Migrationen implementiert.
- Keine produktiven Code-Änderungen an Apps.

## Nächster sicherer Schritt
User fills `.env.local` locally when implementation phase requires it.

## Was das nächste Modell NICHT darf
- keine Secrets committen
- keine DB-Verbindung ohne Freigabe testen
- keine Supabase-Migrationen
- keine Auth-Implementierung
- kein Rust+
- kein Batch 2 ohne Freigabe

### PHASE 0.4-C Status Update (API Contract Audit)
- Terms-Mails wurden vorbereitet, aber bewusst nicht versendet.
- Entwicklung wird fortgesetzt.
- Produktive kommerzielle Nutzung bleibt gated.
- BattleMetrics API Contract Audit wurde abgeschlossen.
- Kein Scraping, keine Player-Dossiers, keine RCON/Ban/Admin-Funktionen.
- Keine Public-SEO-Seiten ohne sp�tere Freigabe.
- Keine High-Frequency-Polling-Strategie ohne Rate-Limit-Absicherung.
