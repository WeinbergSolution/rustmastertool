# Current Sprint (Phase 1.1)

**Phase:** Supabase Remote/Staging Migration Execution & Verification (Phase 1.1-B)

## Was geändert wurde
- [x] Phase 0.4-C: BattleMetrics API Contract Audit
- [x] Phase 0.5: Frontend Shell + Dashboard mit Fixture Data
- [x] Phase 0.6: Supabase Product Foundation + Watchlist Persistence
- [x] Phase 0.7: Watchlist UI Integration + Server Detail Flow
- [x] Phase 0.8: Repository-backed Watchlist + Server Explorer Foundation
- [x] Phase 0.8.1: Data-Layer Completion & Repo Hygiene
- [x] Phase 0.9: Auth Boundary + Async Repository Preparation
- [x] Phase 1.0: Supabase Local RLS Smoke (GREEN-B)
- [x] Phase 1.1-A: Remote/Staging Migration Runbook
- [x] Phase 1.1-B: Remote/Staging Migration Execution
  - .gitignore für Supabase-Metadaten gehärtet.
  - Remote db push erfolgreich durch Owner ausgeführt.
- [x] Phase 1.1-B-FIX: Restrict alert_events Client Grants
  - Fix-Migration erstellt und remote erfolgreich angewendet.
- [x] Phase 1.1-B-FIX-2: Restrict Provider Table Client Write Grants
  - Fix-2-Migration erstellt und remote erfolgreich angewendet.
- [x] Phase 1.1-B-FIX-3: Restrict anon access on user-owned tables
  - Remote Smoke Test offenbarte, dass `anon` SELECT-Rechte auf user-owned Tabellen hatte.
  - Fix-3-Migration erstellt (REVOKE ALL für `anon` auf profiles, watchlists, alert rules/events).
  - Remote Smoke SQL Assertions detailliert.

## Was nicht gemacht wurde
- Phase 1.1-B ist nach Remote Push **noch nicht GREEN** (wartet auf Fix-3-Bestätigung).
- Fix-3-Migration wurde noch nicht angewendet (Stop-and-Confirm anstehend).
- Keine Auth implementiert.
- Keine Live-Provider-Daten geladen oder gespeichert.
- Kein UI-Polishing.
- Keine Secrets/Keys gespeichert.

## Aktueller Fokus (Phase 1.1-B-FIX-3)
Warten auf Owner-Bestätigung für den Fix der `anon` User-Owned Grants.

## Nächster sicherer Schritt
Owner muss exakt bestätigen: `CONFIRM USER OWNED GRANT FIX TO fcmjevwfuwzqtpozwigf STAGING`
