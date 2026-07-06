# Phase 1.9-B: Server Pulse Cron Activation + Crawl Rotation + Early Prediction Foundation

Ziel dieser Phase ist es, den Server Pulse Crawler so zu erweitern, dass er rotierend über die BattleMetrics-Seiten iteriert, anstatt immer nur Seite 1 abzufragen. Zudem wird die UI um ein "Early Prediction"-Modell erweitert, und die Cron-Jobs werden für die sichere Aktivierung per Vault vorbereitet.

## 1. Pre-Activation Audit (Teil A)
- Die aktuelle Edge Function `server-pulse-ingest` fragt **immer nur Seite 1** ab. Wenn wir den Cron jetzt aktivieren würden, würden wir minütlich dieselben 25 Server überschreiben.
- Eine Crawl Rotation (Paginierung) ist zwingend erforderlich, bevor Cron aktiviert wird!
- Die Tabellen `server_pulse_scheduler_state` und `server_pulse_ingest_runs` besitzen noch keine Spalten für `current_page` oder Cursor-Status.

## 2. Proposed Changes

### Database Migration (Teil B & C)
Wir erstellen eine neue Migration `20260706084500_server_pulse_rotation.sql`:
- **`server_pulse_scheduler_state`**:
  - `current_page integer not null default 1`
  - `max_page_window integer not null default 20`
  - `next_cursor text` (Für die BattleMetrics-API Pagination)
  - `last_page_processed integer`
- **`server_pulse_ingest_runs`**:
  - `start_page integer`
  - `end_page integer`

### Edge Function: `server-pulse-ingest` (Teil B & C)
- **State lesen**: Die Function liest den aktuellen `next_cursor` und `current_page` aus der DB.
- **BM API**: Wenn ein `next_cursor` existiert, wird dieser für die API-Anfrage genutzt.
- **State aktualisieren**: Nach dem Crawlen wird `current_page` erhöht. Übersteigt `current_page` den Wert von `max_page_window`, wird der State zurückgesetzt (`current_page = 1`, `next_cursor = null`), sodass der Crawler wieder bei den populärsten Servern startet.
- **Logging**: Der Run speichert nun auch `start_page` und `end_page` ab.

### Frontend: Early Prediction Foundation (Teil D)
#### `ServerDetailPanel.tsx`
Einbindung einer neuen Status-Logik basierend auf der Historie (`populationHistory`):
- **`first_seen`** (1 Snapshot): "First observation collected."
- **`collecting`** (2-3 Snapshots): "Trend collecting."
- **`early_trend`** (>3 Snapshots über mind. 2 Stunden): Einfache Auswertung (population_up, stable, down). Zeigt eine klare Copy an ("Early signal, improves with more snapshots.").
- Es werden zudem "First Seen", "Last Observed" und "Snapshot Count" im UI hinzugefügt.

#### `ServerPulseView.tsx`
- Anzeige der `categories coverage` (Current Page / Max Page Window pro Kategorie).
- Anzeige des Scheduler-Status (nächster Run, Intervall) aus der `server_pulse_scheduler_state`-Tabelle.

### Cron Aktivierung & Vault Runbook (Teil E)
Da `SERVER_PULSE_INGEST_SECRET` sicher bleiben muss, bereite ich ein SQL-Skript für den Owner vor, welches in Supabase ausgeführt wird. Es nutzt `vault.secrets` und `net.http_post`, um die Edge Function sicher als Cronjob zu triggern (05, 25 und 45 Minuten je Kategorie). 

> [!WARNING]  
> **Remote Gates:** Ich werde strikt bei den definierten Owner Gates anhalten! Zuerst bereite ich die Migration vor und frage nach Freigabe. Erst danach deploye ich die Edge Function und frage erneut nach Freigabe. Der Cron wird erst ganz am Schluss aktiviert.

## 3. User Review Required
Bist du mit dem Plan für die Migration (Nutzung von `next_cursor` für BattleMetrics) und dem Ablauf der Remote Gates einverstanden? 
Wenn ja, bitte Plan freigeben, damit ich in die Umsetzung (Gate 1 - DB Push) starten kann.
