# No-API Map Source Strategy Audit

**Projekt:** RustMasterTool · **Datum:** 2026-07-08 · **Kontext:** RustMaps-Provider-Integration wird geparkt (kein API-Key).
**Scope:** reine Research/Doku — kein Code, kein Deploy, kein Merge.

## 1. Warum der RustMaps Provider blockiert ist
Der offizielle Weg (Phase 2.4-B1) war: Frontend → Supabase Edge Function → **RustMaps Public API v4** (`X-API-Key`) → DB-Cache → Viewer. Dieser Weg **benötigt zwingend einen RustMaps-API-Key**. Owner-Entscheidung (2026-07-08): **Wir bekommen keinen RustMaps-API-Key.** Ohne Key:
- `GET/POST /v4/maps*` liefern `401/403` → keine generierten Bilder, keine Monument-Koordinaten, keine Biome-DTOs über die API.
- Die gebaute Edge Function bleibt bewusst im Zustand `provider_not_configured` (kein Crash, kein Leak) — sie ist aber ohne Key funktionslos.

## 2. Warum der Provider-Branch nicht gemerged wird
- Der Kern-Nutzen (echte generierte Karte + Koordinaten) ist **ohne Key nicht lieferbar**. Ein Merge würde totes/inaktives Feature-Verhalten nach main bringen (CTA „Generate full map…", die immer `provider_not_configured`/`unavailable` zeigt) — irreführend für User.
- Die **Migration** (`rustmaps_map_cache`) und **Edge Function** würden eine Deploy-Erwartung erzeugen, die wir nicht erfüllen. Nicht deployter Function-Code auf main = Drift zwischen Repo und Infra.
- Fazit: **kein Merge**. Branch bleibt als geparkte Foundation stehen (`58e32d0`).

## 3. Geparkte Arbeit (bleibt erhalten, inaktiv im Branch)
Falls sich der Zugang später ändert, ist folgendes wiederverwendbar:
- `supabase/migrations/20260708190000_rustmaps_provider_cache.sql` — Cache-Tabelle + RLS (read-only public, Writes nur Service Role).
- `supabase/functions/rustmaps-provider/index.ts` — vollständiger get_or_create/poll-Flow, gehärtete CORS, `provider_not_configured`-Fallback.
- `apps/web/src/features/map/rustmapsProviderClient.ts` — typed Client, defensive States.
- `ServerMapViewer` Provider-States/Polling/Biome-Tiles-UI (CTA aktuell auf Preview zurückstellbar).
Diese Teile brauchen zur Aktivierung nur: API-Key + `db push` + `functions deploy`. **Bis dahin nicht nach main.**

## 4. Risiken eines Deploys OHNE API-Key
- **Nutzer-Irreführung:** aktive „Generate"-CTA, die nie eine Karte liefert (`provider_not_configured`), wirkt wie ein Bug.
- **Support-/Vertrauensschaden:** wiederholte „failed/unavailable"-Zustände ohne echte Ursache im Produkt.
- **Infra-Drift:** Function/Tabelle deployt, aber ohne Funktion → Wartungslast, verwaiste Ressourcen.
- **Kein Sicherheitsrisiko durch den Code selbst** (kein Key, kein Leak) — aber Produkt-/UX-Risiko. → Deshalb: nicht aktivieren.

## 5. Alternativen ohne RustMaps-API-Key

### A) Current Production Path — Map Viewer Preview Foundation (EMPFOHLEN, bereits live)
- Der bereits auf main gemergte **Map Viewer Preview** (Thumbnail + ehrliche Copy, interne CTA statt externem Link) **bleibt** der Produktionsweg.
- Aktion: **CTA ehrlich halten** — solange kein Provider aktiv ist, sollte die „Generate full map"-CTA **nicht** als aktiver Button erscheinen, sondern als disabled Preview-Hinweis (wie vor B1). Das ist eine kleine, separate UI-Entscheidung, **nicht** Teil dieses Doku-Audits.
- Kein neuer externer Call, keine Kosten, keine ToS-Risiken.

### B) BattleMetrics / bereits vorhandene Felder (KOSTENLOS, schon integriert)
Wir haben **ohne** RustMaps-API bereits erstaunlich viel — via BattleMetrics-`details.rust_maps` (frei Haus) und der Tabelle `server_map_identity`:
| Datenpunkt | Quelle | Status |
|---|---|---|
| `seed` | `rust_world_seed` / `server_map_identity.seed` | ✅ vorhanden |
| `world_size` | `rust_world_size` / `.world_size` | ✅ vorhanden |
| Map-Typ / Custom-Flag | `map` / `.map_type`, `.is_custom_map` | ✅ vorhanden |
| **Thumbnail** | `rust_maps.thumbnailUrl` / `.rustmaps_thumbnail_url` | ✅ (bei vielen Servern) |
| RustMaps-Viewer-URL | `rust_maps.url` / `.rustmaps_map_url` | 🟡 vorhanden, aber teils 404 → nicht als Produkt-Link |
| **Monument-Namen** | `rust_maps.monuments` / `.monument_names` | ✅ (Namen, KEINE Koordinaten) |
| Monument-Counts | `.monument_counts` | 🟡 teils |
| **Biome-%** | `rust_maps.biomePercentages` / `.biome_percentages` | 🟡 teils |
| Wipe-Zeitpunkte | `rust_last_wipe` etc. / `.wipe_detected_at` | ✅ vorhanden |
**Kernbefund:** Thumbnails, Seed/Size, Monument-**Namen**, Biome-% und Wipe bekommen wir **ohne** RustMaps-Key. Der Key war nur für **generiertes Vollbild + Monument-Koordinaten** nötig. → Map Intel (Monument-Klassifikation) und die Preview funktionieren unabhängig vom Provider.

### C) Cache-/Enrichment ohne RustMaps-API (kleiner, sinnvoller Ausbau)
- **Sauberer speichern:** `server_map_identity` hält schon Thumbnail/Seed/Size/Monument-Namen/Biome pro `(provider_server_id, wipe_detected_at)`. Das ist bereits eine Wipe-Historisierung.
- **Möglich ohne neuen externen Call:**
  - Thumbnails optional in **eigenen Storage** spiegeln (Rechte prüfen; BattleMetrics/RustMaps-Bild-Hotlink-Lizenz klären, bevor als Produktasset gecached).
  - Map-Preview **pro Server/Wipe** persistieren (haben wir strukturell schon).
  - Monument-Namen → über den bestehenden `classifyMonument` in Map-Intel-Kategorien anreichern (bereits live).
- **Nicht nötig:** eine zweite Tabelle nur für Thumbnails — `server_map_identity` reicht. `rustmaps_map_cache` bleibt geparkt.

### D) Eigene Map-Generierung (langfristig, hoher Aufwand — nur Research)
Zu prüfende Ansätze, falls je „echte Vollkarte intern" ohne RustMaps gewünscht:
- **Rust Dedicated Server + eigener Renderer:** Seed+Size lokal generieren, Karte rendern. Aufwand hoch (Unity/C#-Pipeline, Rust-Updates brechen ständig), CPU/Storage-intensiv, Hosting nötig.
- **Open-Source `.map`-Parser:** `.map`-Datei (aus `rust_world_levelurl`) parsen → Monuments/Heightmap/Prefabs. Für **Custom Maps/Uploads** sinnvoll; Format ändert sich mit Rust-Versionen (Wartungsrisiko).
- **Community-Renderer/Bibliotheken:** existieren teils, aber Lizenz/Wartung/Genauigkeit unklar.
- **Risiken/Unbekannte:** Legalität der Map-Assets, Rust-Versions-Drift, Rechenkosten (Map-Gen dauert Sekunden–Minuten/Karte), Storage für Bilder, kein Support. → **Eigenes Produktprojekt**, nicht kurzfristig.

**Empfohlene Reihenfolge:** A (halten) → B (bereits genutzt) → C (kleiner Enrichment-Ausbau bei Bedarf) → D (nur, wenn strategisch gewollt, als eigene Phase).

## 6. Was ausdrücklich NICHT gemacht wird
- **Keine internen RustMaps-Endpunkte** (`/internal/v1/*`) — undokumentiert, Bearer-Token, ToS-/Rechtsrisiko.
- **Keine Browser-Authorization/Bearer-Tokens/Cookies/User-Sessions** durchreichen oder speichern.
- **Kein Scraping** von rustmaps.com.
- **Keine Fake-Karte, keine Fake-Marker, keine Fake-Koordinaten/-Heatmaps.**
- **Kein externer rustmaps.com-Redirect** im Produktflow (bereits entfernt).

## 7. Empfehlung
1. Provider-Branch **parken**, **nicht mergen** (dokumentiert).
2. **Preview-Foundation bleibt** der Produktionsweg; CTA ehrlich (disabled) halten — als separate kleine UI-Aufgabe, falls die aktive CTA schon auf main sichtbar wäre (aktuell nur auf dem Provider-Branch).
3. Weiter voll auf **BattleMetrics-Daten + Map Intel** setzen (Thumbnails, Seed/Size, Monument-Namen, Biome) — alles ohne Key.
4. „Echte Vollkarte" nur wieder aufgreifen, wenn (a) doch ein RustMaps-Key kommt oder (b) eine eigene Generierung (D) bewusst als Projekt gestartet wird.
