# Current Sprint (Phase 1.3)

**Phase:** Phase 1.3-A Real BattleMetrics Server Explorer (GREEN - Owner Verification Required)

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
- [x] Phase 1.1-B: Remote/Staging Migration Execution (GREEN)
- [x] Phase 1.2-A: Auth Foundation + Profile Trigger (GREEN)
- [x] Phase 1.3-A: Real BattleMetrics Server Explorer (GREEN)
  - Code ist committed (`30a93dd`) und gepusht von Owner (Git Tracked-Clean bestätigt).
  - Supabase Edge Function `battlemetrics` Proxy-Logik implementiert.
  - Frontend-Integration auf Live-Daten umgestellt, Mock-Server im Explorer entfernt.
  - Secret Check erfolgreich (keine Token/Service_Roles im Frontend oder git trackt).
  - Edge Function Remote Deploy-Status unklar per CLI, aber Owner hat Funktion live verifiziert.
  - **Runtime Fix:** Watchlist-Regression gefixt. Speichert nun echte Live-Server in der lokalen Watchlist und die Topbar zeigt ehrlich den Status "Live Provider Mode" anstelle von Fixture-Warnungen an.

## Was nicht gemacht wurde
- **Steam OpenID ist noch nicht implementiert**.
- SupabaseWatchlistRepository bleibt inaktiv.

## Aktueller Fokus
Owner Gate: Finaler manueller Browser-Test der korrigierten Watchlist-UI.

## Nächster sicherer Schritt
Owner-Bestätigung (Smoke Test). Wenn erfolgreich, Merge nach main. Danach Phase 1.4 oder Steam Auth ADR/Spike.
