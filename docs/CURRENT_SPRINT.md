# Current Sprint (Phase 1.2)

**Phase:** Steam-first Auth Boundary (Phase 1.2-A Correction)

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
- [x] Phase 1.2-A: Auth Foundation + Profile Trigger (Korrigiert auf Steam-first)
  - AuthUI zeigt als Haupt-Option "Sign in with Steam" an (derzeit disabled).
  - Email Magic Link wurde als reines Dev-Feature versteckt (`VITE_ENABLE_DEV_MAGIC_LINK`).
  - Neue Supabase Migration (`20260705200000_profile_auto_create.sql`) beibehalten als generischer Trigger für `public.profiles`.
  - Remote RLS Smoke Test enthält Check für den Auto-Profile-Trigger.

## Was nicht gemacht wurde
- **Steam OpenID ist noch nicht implementiert** (kein Backend Callback, kein echter Steam Login).
- Phase 1.2-A Remote-Migration (Profile Trigger) ist **noch nicht angewendet**.
- Cloud Watchlist Persistence (SupabaseWatchlistRepository) bleibt inaktiv.
- Kein Remote Push ausgeführt.

## Aktueller Fokus
Warten auf Architektur-Replan/Review durch Opus/Claude 4.8 für die korrekte Steam Auth + Supabase Identity Architektur.

## Nächster sicherer Schritt
Architektur-Planung für Steam OpenID. Keine Remote Pushes zulässig.
