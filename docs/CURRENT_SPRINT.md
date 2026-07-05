# Current Sprint (Phase 1.2)

**Phase:** Steam-first Auth Boundary (Phase 1.2-A Cleanup)

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
- [x] Phase 1.2-A: Auth Foundation + Profile Trigger (Korrigiert auf Steam-first & Cleanup)
  - AuthUI zeigt als Haupt-Option "Sign in with Steam" an (derzeit disabled).
  - Produktziel ist **Steam Authentication**. Email Magic Link ist **NICHT** Produkt-Auth.
  - Dev Magic Link ist nur Test-Scaffolding und per Default aus (`VITE_ENABLE_DEV_MAGIC_LINK=false`).
  - Neue Supabase Migration (`20260705200000_profile_auto_create.sql`) beibehalten als generischer Trigger für `public.profiles`.
  - Repo-Hygiene: Versehentlich committete Review-Dumps aus `docs/` entfernt und `.gitignore` gehärtet.

## Was nicht gemacht wurde
- **Steam OpenID ist noch nicht implementiert** (kein Backend Callback, kein echter Steam Login).
- Profile Trigger Migration bleibt **YELLOW/pending remote**.
- **Kein Remote Push wurde ausgeführt**.
- SupabaseWatchlistRepository bleibt inaktiv.
- Fixture Mode bleibt default.

## Aktueller Fokus
Steam Auth ADR/Spike ist der nächste Architektur-Schritt.

## Nächster sicherer Schritt
Architektur-Planung für Steam OpenID. Keine Remote Pushes zulässig.
