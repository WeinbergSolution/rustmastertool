# Current Sprint (Phase 1.2)

**Phase:** Supabase Auth Foundation + Profile Trigger (Phase 1.2-A)

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
- [x] Phase 1.2-A: Auth Foundation + Profile Trigger
  - Magic Link OTP Authentication im Frontend (`useAuth` Hook, `AuthUI`).
  - Neue Supabase Migration (`20260705200000_profile_auto_create.sql`) erstellt, die nach `auth.users` Registrierung automatisch einen Record in `public.profiles` generiert.
  - Remote RLS Smoke Test um Check für den Auto-Profile-Trigger erweitert.

## Was nicht gemacht wurde
- Phase 1.2-A Remote-Migration (Profile Trigger) ist **noch nicht angewendet** (Wartet auf Owner Confirm).
- Cloud Watchlist Persistence (SupabaseWatchlistRepository) bleibt inaktiv (wird in 1.2-B umgesetzt).
- Live-Provider-Daten und UI-Polishing sind nicht umgesetzt.

## Aktueller Fokus
Warten auf Owner-Bestätigung für die Ausführung des `db push` der Profile-Trigger-Migration.

## Nächster sicherer Schritt
Owner muss exakt bestätigen: `CONFIRM AUTH FOUNDATION MIGRATION TO fcmjevwfuwzqtpozwigf STAGING`
