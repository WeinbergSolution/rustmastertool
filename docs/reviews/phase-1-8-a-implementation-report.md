# Phase 1.8-A Implementation Report: Base Blueprints YouTube Foundation

## Zielsetzung
Verwandlung der "Base Blueprints"-Roadmap-Ansicht in ein echtes Pre-Game-Feature. Benutzer können nach Rust Base Builds (Solo, Duo, Bunker, etc.) suchen und sich relevante YouTube-Videos direkt in der App anschauen.

## Was implementiert wurde
1. **Datenbank-Schema (`20260706040901_base_blueprints_youtube.sql`)**:
   - `base_blueprints`: Zentrale Tabelle für die Caching-Strategie von YouTube Metadaten (Titel, Description, Thumbnail etc.). Momentan wird die Tabelle in der Edge Function noch nicht zwangsweise befüllt (erst im nächsten Schritt geplant), aber die Basis ist gelegt.
   - `user_saved_blueprints`: Ermöglicht künftig registrierten Usern, Builds als Lesezeichen zu speichern.
2. **Edge Function (`base-blueprints`)**:
   - Fragt die offizielle YouTube Data API (`search.list`) serverseitig ab.
   - Filtert und normalisiert die Ergebnisse für die Frontend-Konsumierung.
   - Respektiert Sicherheitsrichtlinien (API-Key wird via `Deno.env.get` bezogen, keine Keys im Frontend, keine Rohergebnisse ins Frontend gereicht).
3. **Frontend API (`baseBlueprints.ts`)**:
   - Kapselt die `supabase.functions.invoke`-Logik via POST (inklusive JSON Body Payload statt URL Params) ab.
4. **UI Integration (`BaseBlueprintsView.tsx`)**:
   - Löst den Platzhalter in der App ab.
   - Bietet Preset-Buttons (Starter, Solo, Duo, Bunker, Cave etc.) und ein Suchfeld.
   - Karten im Netflix-Stil (Gaming-UI) präsentieren Thumbnail, Titel, Kanal und Datum.
   - Eingebetteter YouTube-Player im Modal für ununterbrochene App-Erfahrung. Link zu YouTube wird als Alternative ("Open on YouTube") angeboten.

## Was noch fehlt (Roadmap Intelligence Features)
- Build cost, Upkeep, Raid cost/resistance, Difficulty-Scoring etc. (Daten kommen später)
- Server-seitiges Speichern / Cachen der Video-Ergebnisse in `base_blueprints`.
- "Save Blueprint"-Flow im Frontend für authentifizierte Nutzer ausprogrammieren (das DB-Modell dafür existiert bereits).

## Remote Gates Status
Alle lokalen Checks (Typecheck, Build, Secret-Check) sind GREEN.
Die Änderungen müssen nun noch mit Owner-Zustimmung auf Staging deployed werden.
