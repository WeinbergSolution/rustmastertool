# Current Sprint (Phase 1.3)

**Phase:** Phase 1.3-A Real BattleMetrics Server Explorer (GREEN)

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
  - Supabase Edge Function `battlemetrics` als Proxy implementiert.
  - Live Provider Suche im Frontend Dashboard integriert.
  - ServerDetailPanel auf Live-Daten (BattleMetrics) umgestellt.
  - Keine Secrets (Tokens) im Frontend exponiert.

## Was nicht gemacht wurde
- **Steam OpenID ist noch nicht implementiert** (kein Backend Callback, kein echter Steam Login).
- SupabaseWatchlistRepository bleibt inaktiv, da Cloud-Persistenz Auth voraussetzt.
- Auth UI bleibt disabled, bis Steam Auth Phase umgesetzt wird.

## Aktueller Fokus
Owner Gate: Runbook `phase-1-3-a-battlemetrics-edge-function.md` durchführen, um Edge Function auf Staging zu deployen. Danach Merge nach `main`.

## Nächster sicherer Schritt
Nach Deployment und Smoke-Test auf Staging: Merge nach main. Danach Phase 1.4 oder direkt Steam Auth ADR/Spike für echte Steam Authentication anvisieren.
