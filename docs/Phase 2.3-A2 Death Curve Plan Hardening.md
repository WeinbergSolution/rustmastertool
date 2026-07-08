# Phase 2.3-A2: Death Curve Plan Hardening

Dieses Dokument definiert die gehärtete Architektur, das Datenmodell und die Crawling-Strategie, um für das RustMasterTool Vorhersagen über die Serverpopulation ("Death Curve") und die allgemeine Servergesundheit ("Wipe Health") zu treffen.

## A. Ist-Zustand vs. Prediction Monitoring

### 1. Global Discovery (Ist-Zustand)
Die aktuelle Global Discovery Strategie dient der **Breitenerfassung** (Keyset-Pagination). 
* **Zweck:** Finden neuer Server, Aktualisieren von Map-Daten, IPs, Regionen und Seeds.
* **Erfolg:** Der globale Crawler läuft stabil und liest tiefe Seiten (aktuell Seite 3/4) ein.

### 2. Prediction Monitoring (Ziel-Zustand)
Für echte Analytics (Death Curve / Wipe Health) benötigen wir **engmaschige Snapshots** für die relevantesten Server (ca. alle 15 Minuten).
* **Proof of Concept: BattleMetrics Bulk Fetch:** 
  Tests (`filter[ids]`, `ids=`, `filter[serverIds]`) haben bewiesen, dass BattleMetrics **keinen Bulk-Fetch für eine spezifische Liste von Server-IDs** (REST conform) am `servers` Endpoint erlaubt (Error: "must NOT have additional properties").
* **Neue Strategie (Top-N Sweeping statt ID-Batching):** 
  Wir bauen keine Funktion, die 500 einzelne Request pro Stunde abfeuert (Rate-Limit-Gefahr!). Stattdessen nutzen wir die Effizienz der API: Da Top/Hot-Server durch eine hohe Spielerzahl definiert sind, fetchen wir einfach alle 15 Minuten die Top 5 Seiten (500 Server) via `sort=-players`. Das kostet exakt **5 API Requests pro 15 Minuten** (20 Req/Stunde) und deckt 95% der Tier-1 und Tier-2 Server automatisch ab. Nur explizite Watchlist-Server außerhalb der Top 500 werden gezielt einzeln geladen.

---

## B. Monitoring Target Strategy & Datenmodell (Gehärtet)

Um diese Strategie zu stützen, benötigen wir folgende neue Tabellen (teilweise in Phase 2.3-B migriert):

### 1. `server_monitoring_targets`
Steuert die Wichtigkeit und das Fallback-Targeting (falls ein Server aus den Top 500 fällt).
* `id` (UUID, PK)
* `provider_server_id` (FK)
* `reason_codes` (jsonb, NOT NULL, default '[]' - Erlaubt Kombinationen aus `watchlist`, `active_server`, `fresh_wipe`)
* `priority_score` (int)
* `priority_tier` (int: 1-4)
* `check_interval_minutes` (int)
* `last_checked_at` (timestamptz)
* `next_check_at` (timestamptz)
* `active` (boolean)
* `fail_count` (int)
* `last_error` (text)

**Indexe:**
* `idx_smt_active_next_check` auf `(active, next_check_at)`
* `server_monitoring_targets_provider_server_id_key` UNIQUE auf `(provider_server_id)`

### 2. `server_population_rollups_hourly`
Verdichtet die Snapshots, um langfristige Analysen (Death Curve über 4 Wochen) performant abzufragen.
* `provider_server_id` (FK, PK)
* `hour_bucket` (timestamptz, PK)
* `avg_players`, `max_players`, `min_players` (int)
* `samples_count`, `queue_max` (int)
* `first_players`, `last_players` (int - nützlich für Slope-Berechnungen in der Stunde)
* `created_at`, `updated_at` (timestamptz)

**Indexe:**
* Composite PK `(provider_server_id, hour_bucket)` dient als Hauptindex.
* Optional: `idx_rollups_hour_desc` auf `(provider_server_id, hour_bucket DESC)`

### 3. `server_health_scores_latest`
Speichert ausschließlich die *aktuellste* Prognose pro Server, um UPDATE-Kosten minimal zu halten und Query-Performance für Server-Karten zu maximieren. (History-Tabelle ist für späteres ML geplant, aktuell nicht nötig).
* `provider_server_id` (FK, PK)
* `calculated_at` (timestamptz)
* `death_risk_score` (int: 0-100)
* `health_label` (text - via Application Logic validiert, kein hartes Enum für leichtere Iteration)
* `confidence` (numeric)
* `reason_summary` (text)
* `reason_factors` (jsonb - Detailwerte für Frontend-Explainers)

**Indexe:**
* PK `(provider_server_id)`
* `idx_health_scores_risk` auf `(death_risk_score DESC)`
* `idx_health_scores_label` auf `(health_label)`
* `idx_health_scores_calc` auf `(calculated_at)`

### 4. `server_wipe_events` (In Phase 2.3-B inkludiert)
Wipe Events sind zentral für die Death Curve, da das `wipe_age` der stärkste Indikator für Dropoffs ist.
* `id` (UUID, PK)
* `provider_server_id` (FK)
* `detected_wipe_at` (timestamptz)
* `source` (text)
* `previous_seed`, `new_seed` (int)
* `previous_world_size`, `new_world_size` (int)
* `previous_level_name`, `new_level_name` (text)
* `confidence` (numeric)
* `created_at` (timestamptz)

**Indexe:**
* `idx_wipe_events_server_date` auf `(provider_server_id, detected_wipe_at DESC)`

---

## C. Retention Strategy & Optimierung

Wir bereiten Retention vor, führen sie aber erst ein, sobald der Rollup-Job stabil läuft.
* **Tabelle `server_population_snapshots`:** 
  Um Raw-Snapshots später (z.B. nach 14 Tagen) löschen zu können, benötigen wir einen Index. Der bestehende Index `idx_snapshots_server_observed` auf `(provider_server_id, observed_at DESC)` ist gut für Queries, aber ein reiner Index auf `(observed_at)` beschleunigt Delete-Jobs (Retention).
* **Geplante Retention:**
  * Raw Snapshots: 14-30 Tage
  * Hourly Rollups: 6-12 Monate
  * Daily Rollups (später): Unbegrenzt

---

## D. UI-Zielbild

* **Server Card Mobile:** Minimalistisch. Ein kleines Health-Badge (z.B. grüner Punkt für Healthy, rot für Fading) und eine 24h Mini-Sparkline.
* **Server Detail:** Großer Chart der Population History inklusive projizierter Death Curve. Anzeige des Wipe-Timelines und der Prediction-Begründung (z.B. "Server verliert aktuell 15% Spieler pro Stunde").
* **Dashboard:** Eigene Kategorien wie "Trending Servers" (Booming) oder "Fresh Wipe Watch".

---

## E. Korrigierter Phasenplan

* **Phase 2.3-A:** Plan & Data Model
* **Phase 2.3-A2:** Plan Hardening + BattleMetrics Bulk Proof *(Abgeschlossen)*
* **Phase 2.3-B:** Datenbank-Migration (`monitoring_targets`, `wipe_events`, `health_scores_latest`, `hourly_rollups`) inklusive Indexe.
* **Phase 2.3-C:** Target Selection Job (Befüllt `monitoring_targets` aus Watchlist, Active etc.)
* **Phase 2.3-D:** Hot Monitoring Edge Function (Implementiert die Top-N Sweeping Strategie + Individual Fallbacks)
* **Phase 2.3-E:** Rollup Job (Verdichtet Snapshots + startet die Retention Engine)
* **Phase 2.3-F:** First Health Score Heuristic (Death Curve Scoring)
* **Phase 2.3-G:** Server Card Mobile Redesign mit Health Badge
* **Phase 2.3-H:** Server Detail Analytics View

> [!IMPORTANT]  
> **Status: Gate Ready**  
> Die Architektur ist validiert und gehärtet. Der Natural Global Cron Check war erfolgreich (Seite 3 wurde eingelesen).  
> **Nächster Schritt:** Freigabe von Phase 2.3-B (DB Migration).
