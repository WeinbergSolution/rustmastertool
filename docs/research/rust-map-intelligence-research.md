# Rust Map Intelligence – Research & Architektur (Phase 2.0-A)

**Projekt:** RustMasterTool · **Sprint:** PHASE 2.0-A-RESEARCH · **Datum:** 2026-07-06
**Status:** Research abgeschlossen, Implementierung wartet auf Owner-Freigabe (Branch `feature/phase-2-0-a-map-intelligence-foundation` noch nicht angelegt)
**Scope-Guards eingehalten:** keine Secrets gelesen, kein DB-Push, kein Deploy, kein Cron-Change, kein Merge.

---

## 1. Executive Summary

**Die zentrale Produktfrage – „Wie kommen wir für einen beliebigen Rust-Server zuverlässig an die Karte?" – ist beantwortbar, und zwar günstiger als erwartet:**

1. **BattleMetrics liefert bereits fast alles.** Die öffentliche BattleMetrics-API (`/servers`, die wir für Server Pulse ohnehin abfragen) enthält für Rust-Server `rust_world_seed`, `rust_world_size`, Wipe-Zeitpunkte (`rust_last_wipe`, `rust_next_wipe`, `rust_wipes[]`) **und bei vielen Servern ein eingebettetes `rust_maps`-Objekt** – eine offizielle RustMaps-Integration mit `thumbnailUrl`, RustMaps-Map-URL, Monument-Namen/-Counts, Biome-Prozenten, Insel-/Fluss-Zahlen. *Live am 2026-07-06 verifiziert.*
2. **Für Monument-Koordinaten (Filter & Buildspot-Scoring) brauchen wir die RustMaps-API.** Deren `MapAPIDTO` liefert `monuments[] { type, coordinates{x,y}, nameOverride }` plus Bild-URLs in mehreren Auflösungen. Lookup per `GET /v4/maps/{size}/{seed}`, Generierung per `POST /v4/maps` mit Status-Polling. Auth: `X-API-Key`-Header. *Live via Swagger verifiziert.*
3. **Custom-Map-Erkennung: der `map`-Level-Name ist das Primärsignal – NICHT `rust_world_levelurl`.** Wichtige Live-Korrektur: `levelurl` ist heute Standard-Distribution für *beide* Typen (offizielle Facepunch-Procedural-Server liefern Maps via `files.facepunch.com`-CDN aus; Customs via `maps.rustmaps.com` u. a.). Custom = Level-Name ≠ "Procedural Map"/"Barren"; Identität dann = Level-URL/Hash statt Seed. RustMaps bietet dafür `GET /v4/maps/url`. Seed+Size darf bei Custom Maps **nie** als Identität verwendet werden (Dummy-Seeds wie 1337 live belegt).
4. **Empfohlene Architektur (Option D, Hybrid):** BattleMetrics-Rohdaten (haben wir schon) → `server_map_identity` extrahieren → Cache-first-Resolver: erst eingebettetes `rust_maps`-Objekt nutzen (kostenlos, 0 zusätzliche Calls), nur bei Bedarf RustMaps-API für Koordinaten/Vollbild → alles in eigenen Tabellen cachen → Preview in Server Detail.

**Minimal Viable Path:** Wir können eine Map-Preview-Card (Thumbnail + Monument-Chips + Seed/Size-Label) für einen Großteil der Server **ohne einen einzigen RustMaps-API-Call** ausliefern, weil die Daten im BattleMetrics-Payload stecken, den unser Ingest bereits anfasst.

---

## 2. Data Source Matrix

| Quelle | seed | size | level/map name | map image | monuments (Namen) | monuments (Koordinaten) | biomes/roads/rivers | wipe ts | custom-map-Erkennung | API-Key | Kosten/Limit |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **BattleMetrics `/servers`** | ✅ `rust_world_seed` | ✅ `rust_world_size` | ✅ `map` | 🟡 via eingebettetem `rust_maps.thumbnailUrl` (nicht immer) | 🟡 via `rust_maps.monuments/monumentCounts` | ❌ | 🟡 `rust_maps.biomePercentages`, `rivers`, `islands` (nur Aggregat) | ✅ `rust_last_wipe`, `rust_next_wipe`, `rust_wipes[]` | ✅ `map`-Name, `rust_world_levelurl` | ✅ (Bearer, haben wir) | Bestehende Limits unseres Pulse-Ingest |
| **RustMaps API v4** | ✅ | ✅ | ✅ `type`, `isCustomMap` | ✅ `imageUrl`, `rawImageUrl`, `imageIconUrl`, `thumbnailUrl` | ✅ | ✅ `monuments[].coordinates{x,y}` | ✅ `biomePercentages`, `rivers`, `lakes`, `mountains`, `islands`, `canyons`, `oases`, `buildableRocks`, `landPercentageOfMap` | ❌ | ✅ `isCustomMap`, Lookup per URL | ✅ `X-API-Key` | Free Tier mit Limits; kommerzielle Nutzung klären (siehe Risiken) |
| **Rust Server Query (A2S/Steam)** | ✅ (in Tags/Rules) | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | 🟡 aus Tags ableitbar | 🟡 `levelurl` in Rules | ❌ | Selbst hosten; BattleMetrics macht das bereits für uns |
| **Just-Wiped** | ✅ (Anzeige) | ✅ | ✅ | ✅ (eigener CDN-Cache) | 🟡 | ❌ öffentlich | ❌ öffentlich | ✅ | ✅ (Platzhalterbild) | keine öffentliche API | Kein sauberer Integrationsweg (Scraping = ToS-Risiko) |
| **Rust:IO / playrust.io** | – | – | – | – | – | – | – | – | – | – | Historisch relevant, Projekt de facto tot; nicht einplanen |

Legende: ✅ vorhanden · 🟡 teilweise/bedingt · ❌ nicht vorhanden

---

## 3. BattleMetrics Findings (live verifiziert, 2026-07-06)

Abfrage: `GET https://api.battlemetrics.com/servers?filter[game]=rust&page[size]=2` (öffentlich, ohne Key testbar).

**Relevante Felder in `attributes` / `attributes.details`:**

| Feld | Beispielwert | Bedeutung für uns |
|---|---|---|
| `ip`, `port`, `portQuery` | `64.40.9.156 / 28017 / 28015` | Server-Identität, Join-Link |
| `details.map` | `"Procedural Map"` oder Custom-Name (`"Custom Map"`, `"RR\|Bedwars\|..."`) | **Primärsignal Custom-Map-Erkennung** |
| `details.rust_world_seed` | `1337` | Seed – **Achtung:** bei Custom Maps oft Dummy |
| `details.rust_world_size` | `6000` | Worldsize |
| `details.rust_world_levelurl` | `https://maps.rustmaps.com/286/…/hellis-v134.map` oder `https://files.facepunch.com/rust/maps/…` | **Korrektur (live verifiziert):** heute Standard-Map-Distribution für Procedural *und* Custom. Kein Custom-Indikator! Bei Customs (Level-Name ≠ Procedural) dient die URL als **Identitätsanker** |
| `details.rust_maps` | eingebettetes Objekt (s. u.) | RustMaps-Integration frei Haus |
| `details.rust_last_wipe`, `rust_next_wipe`, `rust_wipes[]` | ISO-Timestamps | Wipe-Erkennung → Map-Neuzuordnung triggern |
| `details.rust_last_seed_change` | ISO-Timestamp | Signal „Map-Identität hat gewechselt" |
| `details.rust_type`, `rust_gamemode`, `rust_modded` | `modded` / `rust` | Kontext, Filterung |
| `details.rust_hash` | `a557d4df` | Server-Build-Hash (nicht Map-Hash) |

**Das eingebettete `rust_maps`-Objekt** (bei Server 2 der Stichprobe vorhanden, bei Server 1 nicht):

```json
"rust_maps": {
  "seed": 1337, "size": 6000,
  "url": "https://rustmaps.com/map/ed0cb49d…",
  "thumbnailUrl": "https://content.rustmaps.com/maps/286/…/thumbnail.webp",
  "mapUrl": "https://maps.rustmaps.com/286/…/hellis-v134.map",
  "monumentCount": 51, "barren": false,
  "biomePercentages": {"s":28.2,"d":20.9,"f":39.0,"t":10.7,"j":1.1},
  "islands": 5, "mountains": 0, "iceLakes": 1, "rivers": 0,
  "monumentCounts": {"Large Oilrig":1,"Airfield":1,"Gas Station":1, "…":0},
  "monuments": ["Large Oilrig","Ferry Terminal","Airfield","…"],
  "updatedAt": "2026-07-06T09:16:10Z"
}
```

**Quantitative Stichprobe (n = 500, Top-Rang, Cursor-Pagination, live 2026-07-06):**

| Metrik | Wert | Interpretation |
|---|---|---|
| `rust_world_seed` vorhanden | 495/500 (99 %) | Seed/Size sind de-facto Standardfelder |
| **eingebettetes `rust_maps`-Objekt** | **489/500 (97,8 %)** | Stufe 0 (kostenlose Preview-Daten) trägt fast überall |
| Level-Name = "Procedural Map" | 75/500 (15 %) | Top-Server sind mehrheitlich Custom/Minigame – Long-Tail dürfte proceduraler sein (OQ-1) |
| … davon mit `rust_maps` | 75/75 (100 %) | Procedural wird von der Integration voll abgedeckt |
| … davon mit `levelurl` | 74/75 | **`levelurl` ist KEIN Custom-Indikator** (CDN-Distribution) |
| Nicht-Procedural mit `rust_maps` | 414/425 (97,4 %) | Auch Customs meist direkt auflösbar |
| Top-`levelurl`-Domains | `maps.rustmaps.com` (303), `files.facepunch.com` (52), `cdn.rustamaps.com` (36), `cdn.magicmaps.ru` (25) | Domain-Muster als Sekundärsignal nutzbar |

**Gegenprobe offizielle Server:** Facepunch-Server (`[EU] Facepunch 1` u. a.) melden `map="Procedural Map"`, echten Seed (z. B. `1515711352/4500`), `levelurl` auf `files.facepunch.com` **und** ein `rust_maps`-Objekt, dessen Seed exakt matcht ⇒ Level-URL ist dort reine Download-Optimierung.

**Weitere Erkenntnisse:**
- **Beweis für die Custom-Map-Falle:** Custom-Server melden Dummy-Seeds (`1337/6000` mehrfach beobachtet). Seed+Size allein würde verschiedene Karten auf dieselbe Identität mappen.
- Wipe-Daten (`rust_wipes[]`, `rust_next_wipe`) sind reichhaltig genug, um Map-Neuauflösung ereignisgesteuert statt per Poll zu machen.
- Stichproben-Bias beachten: Top-Rang ≠ unsere getrackte Servermenge; OQ-1 (Messung auf eigenen Ingest-Daten) bleibt sinnvoll, die Provider-seitige Quote ist aber exzellent.

---

## 4. Rust Procedural Maps – Konzept

- Rust generiert „Procedural Map"-Welten **deterministisch** aus `seed` + `worldsize` + **Generator-Version des Game-Builds**. Gleicher Seed+Size auf gleicher Rust-Version ⇒ identische Karte inkl. Monument-Placement, Straßen, Flüssen, Biomen, Caves, Oil-Rig-Positionen (Rigs/Harbors/Fishing Villages liegen ozeanseitig, Placement folgt dem gleichen Determinismus).
- **Versionsabhängigkeit ist real:** Facepunch ändert den Generator in manchen Monats-Updates; danach erzeugt derselbe Seed eine andere Karte. RustMaps bildet das über `saveVersion` im `MapAPIDTO` ab (in der Live-Stichprobe war Version `286` Teil der Content-Pfade). ⇒ Unser Cache-Schlüssel muss `(map_type, seed, size, generation_version)` sein, nicht nur `(seed, size)`.
- `world.configstring` / `world.configfile` (Server-Convars) können die prozedurale Generierung zusätzlich verändern (z. B. Monument-Auswahl). Server, die das nutzen, erzeugen Karten, die vom „reinen" Seed+Size-Ergebnis abweichen, **ohne** als Custom Map zu firmieren. Das ist ein Rest-Risiko-Fall → `confidence`-Feld im Datenmodell (s. § 7) und visueller Abgleich via Thumbnail.
- Sondertyp **Barren** (abgespeckte Procedural Map) und **HapisIsland**-Altkarten: über `map`/`level_name` unterscheidbar; RustMaps kennzeichnet `barren` im eingebetteten Objekt.

**Konsequenz:** „seed+size reicht" ist als Faustregel für Vanilla-Procedural korrekt, aber wir behandeln es als *Hypothese pro Server* mit Confidence, nicht als Axiom.

---

## 5. Custom Maps

**Erkennungssignale (in Priorität – korrigiert nach Live-Verifikation):**
1. `details.map` ≠ `"Procedural Map"` (und ≠ Barren/Hapis) ⇒ Custom oder Minigame. **Primärsignal.**
2. `rust_maps.isCustomMap` (RustMaps-Antwort) bzw. Erfolg des URL-Lookups ⇒ autoritative Bestätigung.
3. `levelurl`-Domain als Sekundärsignal: `files.facepunch.com` ⇒ Procedural-CDN; `maps.rustmaps.com`/`cdn.rustamaps.com`/`cdn.magicmaps.ru` ⇒ überwiegend Custom-Hosting. **Nie allein entscheidend.**
4. Heuristik: verdächtige Dummy-Seeds (1337, 1, 12345) + Widerspruch zwischen `monumentCounts` und typischer Procedural-Zusammensetzung – nur als Confidence-Malus, nie allein.

> ⚠️ **Frühere Annahme verworfen:** „`rust_world_levelurl` vorhanden ⇒ Custom" ist **falsch**. 74 von 75 Procedural-Servern der Stichprobe (inkl. offizieller Facepunch-Server) haben eine Level-URL – sie ist heute Standard-Map-Distribution.

**Warum seed+size bei Custom Maps nicht reicht:** Die Karte kommt aus einer Datei; `seed/size` in den Server-Rules sind Restwerte/Defaults ohne Bezug zur tatsächlichen Welt (live belegt, s. § 3). Identität einer Custom Map ist die **Level-URL bzw. der Datei-Hash**, nicht der Seed.

**Datenbedarf für Custom Maps:** `custom_map_url` (Level-URL), optional Datei-Hash aus der URL/Datei; Auflösung über `GET /v4/maps/url` (RustMaps) → liefert, sofern RustMaps die Map kennt (bei über RustMaps gehosteten Customs wie in der Stichprobe: ja), dasselbe `MapAPIDTO` inkl. Bild + Monument-Koordinaten. Nicht auflösbare Customs ⇒ UI-Fallback „Custom map detected" ohne Preview (kein Client-Cache-Gefrickel, keine Grauzonen).

---

## 6. RustMaps API v4 (live via öffentliches Swagger verifiziert)

Basis: `https://api.rustmaps.com`, OpenAPI: `/swagger/v4-public/swagger.json`, Auth: **`X-API-Key` Header**.

| Endpoint | Zweck | Relevanz |
|---|---|---|
| `GET /v4/maps/{size}/{seed}` | Lookup per Seed+Size | Kernpfad Procedural |
| `GET /v4/maps/{mapId}` | Lookup per RustMaps-ID | Re-Fetch aus Cache-Referenz |
| `GET /v4/maps/url` | **Lookup per Map-Download-URL** | Kernpfad Custom Maps |
| `POST /v4/maps` `{size, seed, staging}` | Generierungs-Request | Wenn Map noch nicht existiert |
| Status via `MapStatusDTO {mapId, queuePosition, state, currentStep}` | **Polling-Modell** | Async-Handling im Resolver |
| `GET /v4/maps/limits` | aktuelle Gen-Limits | Rate-Limit-Steuerung |
| `POST /v4/maps/search`, `GET /v4/maps/filter/{id}` | Map-Suche nach Kriterien | Später: „finde Server mit Wunschkarte" (nettes Zukunfts-Feature) |
| `/v4/maps/custom*` | eigene Custom-Gen-Configs | **subscription-required**, nicht für 2.0-A |

**`MapAPIDTO` (Antwort-Schema):** `id, type, seed, size, saveVersion, url, rawImageUrl, imageUrl, imageIconUrl, thumbnailUrl, isStaging, isCustomMap, canDownload, downloadUrl, totalMonuments, monuments[], landPercentageOfMap, biomePercentages, islands, mountains, iceLakes, rivers, lakes, canyons, oases, buildableRocks, estimatedDeletionDate`
**`MonumentAPIDTO`:** `type, coordinates{x,y}, nameOverride` ⇒ **Monument-Koordinaten verfügbar** (Grundlage für Filter, Distanzen, Buildspot-Scoring).

**Was das Schema *nicht* liefert:** Straßen-/Fluss-**Geometrie** und Biome-**Polygone** (nur Aggregatzahlen). Für Phase 2.0-A/B reicht das (Bild + Monument-Marker). Straßen-/Biome-Vektoren wären erst für fortgeschrittenes Scoring nötig → Option C (eigener `.map`-Parser über `downloadUrl`, `canDownload` beachten) als spätere Ausbaustufe.

**Beachtenswert:** `estimatedDeletionDate` ⇒ RustMaps garantiert keine unbegrenzte Bild-Verfügbarkeit ⇒ **wir müssen Bilder selbst cachen** (Supabase Storage), nicht dauerhaft hotlinken.

**Pricing / Quoten (live von rustmaps.com/pricing, 2026-07-06, inkl. 19 % MwSt.):**

| Tier | Preis/Monat | Map-Generierungen | Parallel | Relevantes |
|---|---|---|---|---|
| **Free** | 0 € | 250/Monat | 3 | Procedural-Gen, Galerie, Suche – reicht für MVP-Betrieb mit Cache-first |
| Supporter | 2,37 € | 500/Monat | 5 | + Server-Pages |
| Premium | 9,51 € | 800/Monat | 7 | + **Custom-Map-Generator**, höhere Priorität |
| Organization 1/2 | 17,84 € / 23,79 € | 1000 / 1750 | 7 / 10 | Team-Management, höchste Priorität |

Einordnung: Da Lookups auf bereits generierte Maps (`GET /{size}/{seed}`, `GET /maps/url`) den Generierungs-Quoten kaum zusetzen und unsere Architektur Cache-first ist, ist selbst der Free-Tier für die Startphase plausibel; Premium (~10 €/Monat) ist der Sicherheitsgurt für Wipe-Days. **Weiterhin offen (OQ-2-Rest):** kommerzielle Nutzungslizenz, Caching-Erlaubnis der Bilder, Attribution-Pflicht – ToS lesen + schriftlich bestätigen lassen. Bis dahin: konservatives Verhalten (Cache-first, niedrige Call-Frequenz, Attribution „Map data by RustMaps.com" einplanen).

---

## 7. Just-Wiped / RustOnTop-Verhalten (Hypothese, teils live belegt)

Live-Beobachtung (Netzwerk/HTML, nur öffentliche Endpunkte, kein Bypass):
- Just-Wiped rendert Listenkarten mit Bildern von **eigenem CDN**: `https://cdn.just-wiped.net/maps/{id}/{hash}.jpg` ⇒ sie **cachen/generieren selbst** und hotlinken nicht.
- Platzhalterbilder `map_listing_image_custom_map-….jpg` und `map_listing_image_in_progress-….jpg` ⇒ exakt unser Ziel-Flow: Custom-Fallback + „Generierung läuft"-Zustand mit späterem Nachladen.
- „Map Gallery: 431.476 Maps" ⇒ massiver eigener Bestand; Seed/Size beziehen sie mutmaßlich aus Server-Query/BattleMetrics-äquivalenten Quellen (nicht von außen einsehbar, als Hypothese markiert).

**Übernahme für uns:** Cache-first mit eigenem Storage, drei UI-Zustände (resolved / in-progress / custom-unresolvable) – bewährtes Muster im Markt. **Keine** Just-Wiped-Integration (keine öffentliche API, Scraping = ToS-Risiko, kein Mehrwert ggü. BattleMetrics+RustMaps).

---

## 8. Vorgeschlagenes Datenmodell (Supabase / Postgres)

> Nur Entwurf – kein Push. Namen an bestehende Konventionen (`provider_servers`, `server_population_snapshots`) angelehnt.

```sql
-- Identität: Was wissen wir über die Map DIESES Servers?
create table server_map_identity (
  id uuid primary key default gen_random_uuid(),
  provider_server_id uuid references provider_servers(id),
  battlemetrics_server_id text,
  server_ip inet,
  server_port int,
  map_type text,                 -- 'procedural' | 'barren' | 'custom' | 'unknown'
  level_name text,               -- details.map
  seed bigint,
  world_size int,
  map_hash text,                 -- optional: Hash aus levelurl/Datei (Custom-Identität)
  wipe_detected_at timestamptz,  -- rust_last_wipe zum Zeitpunkt der Extraktion
  source text,                   -- 'battlemetrics_details' | 'battlemetrics_rust_maps' | 'manual'
  confidence numeric(3,2),       -- 0..1, s. Confidence-Regeln unten
  is_custom_map boolean default false,
  custom_map_url text,           -- rust_world_levelurl
  raw_source jsonb,              -- Roh-Details für Audit/Re-Resolve
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create unique index on server_map_identity(provider_server_id, wipe_detected_at);

-- Kanonische Map (server-unabhängig, dedupliziert über alle Server!)
create table rust_maps (
  id uuid primary key default gen_random_uuid(),
  map_type text not null,
  seed bigint,
  world_size int,
  generation_version text,       -- RustMaps saveVersion; Teil des Identitätsschlüssels!
  provider text not null default 'rustmaps',
  provider_map_id text,          -- RustMaps map id
  image_url text,                -- unser Storage-Pfad (nicht der Provider-Hotlink!)
  thumbnail_url text,
  tile_url_pattern text,         -- später für Zoom-Canvas
  metadata jsonb,                -- biomePercentages, rivers, islands, landPercentage, …
  generated_at timestamptz,
  expires_at timestamptz,        -- vor estimatedDeletionDate re-cachen
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (map_type, seed, world_size, generation_version, provider)
);

create table rust_map_monuments (
  id uuid primary key default gen_random_uuid(),
  rust_map_id uuid references rust_maps(id) on delete cascade,
  monument_key text not null,    -- normalisiert: 'large_oilrig'
  monument_name text,            -- Anzeige inkl. nameOverride
  monument_type text,            -- Kategorie: tier1/tier2/tier3/safezone/utility
  x numeric, y numeric, z numeric,
  grid_label text,               -- 'K14' – aus x/y + world_size ableitbar
  radius numeric,
  metadata jsonb
);
create index on rust_map_monuments(rust_map_id, monument_key);

-- n:1-Zuordnung Server → kanonische Map (viele Server teilen denselben Seed!)
create table server_map_assignments (
  provider_server_id uuid references provider_servers(id),
  rust_map_id uuid references rust_maps(id),
  confidence numeric(3,2),
  assigned_source text,          -- 'embedded_rust_maps' | 'rustmaps_seed_lookup' | 'rustmaps_url_lookup'
  assigned_at timestamptz default now(),
  primary key (provider_server_id, rust_map_id)
);

-- Phase 2.0-C (nur Skizze):
create table build_spot_candidates (
  id uuid primary key default gen_random_uuid(),
  rust_map_id uuid references rust_maps(id),
  x numeric, y numeric,
  score numeric,
  nearby_monuments jsonb,        -- [{key, distance}]
  risk_factors jsonb,            -- [{factor, weight}]
  water_distance numeric,
  road_distance numeric,         -- erst mit Straßen-Geometrie (Option C) präzise
  monument_distances jsonb,
  biome text,
  notes text
);
```

**Confidence-Regeln (Vorschlag):**
- `1.00` eingebettetes `rust_maps`-Objekt vorhanden (Provider hat Map bestätigt)
- `0.90` Procedural + Seed/Size vorhanden + RustMaps-Lookup erfolgreich
- `0.70` Procedural + Seed/Size vorhanden, Lookup ausstehend
- `0.40` Custom mit `levelurl`, URL-Lookup fehlgeschlagen
- `0.20` Widersprüche (Dummy-Seed, level_name unklar) → UI zeigt „Map data unavailable yet"

---

## 9. Edge-Function-Architektur (Entwurf, kein Deploy)

```
┌────────────┐   klick    ┌──────────────────────┐  cache miss  ┌────────────────┐
│  Frontend   │──────────▶│ server-map-resolve   │─────────────▶│ rust-map-cache │──▶ RustMaps API
│ ServerDetail│◀──────────│ (identity + preview) │◀─────────────│ (seed/size/url)│◀── (X-API-Key,
└────────────┘  preview   └──────────────────────┘   map row    └────────────────┘    nur serverseitig)
                                   │ liest                              │ schreibt Bild
                                   ▼                                    ▼
                     server_map_identity / assignments          Supabase Storage
```

**`server-map-resolve`**
Input: `provider_server_id` (oder `battlemetrics_server_id`).
Ablauf: (1) `server_map_identity` lesen; fehlt sie → aus bereits gespeicherten BattleMetrics-Rohdaten extrahieren (kein neuer BM-Call nötig, unser Pulse-Ingest hat die Details). (2) Assignment vorhanden → `rust_maps`-Row + Monumente zurück. (3) Kein Assignment → `rust-map-cache` invoken. (4) Antwortet immer mit einem der vier UI-Zustände (resolved / resolving / custom-unresolved / unavailable).

**`rust-map-cache`**
Input: `{map_type, seed, world_size}` **oder** `{custom_map_url}`.
Ablauf: (1) Unique-Lookup in `rust_maps`. (2) Miss → RustMaps `GET /{size}/{seed}` bzw. `GET /maps/url`. (3) 404 bei Procedural → `POST /v4/maps` + Status-Polling (Job merken, nicht blockieren; Frontend pollt unsere Function, nie den Provider). (4) Erfolg → Bild+Thumbnail nach Supabase Storage kopieren, `rust_maps` + `rust_map_monuments` schreiben, `expires_at` < `estimatedDeletionDate` setzen.

**`buildspot-score`** (Phase 2.0-C, nur Signatur): Input `rust_map_id` + Filtergewichte; Output Kandidaten. Erste Version rein monument-distanz-basiert (Koordinaten haben wir), Straßen/Biome-Geometrie später via Option C.

**Regeln (verbindlich):** Cache-first; Provider-Calls **nur** serverseitig; `RUSTMAPS_API_KEY` ausschließlich als Edge-Function-Secret (nie im Client, nie im Repo); Rate-Limit-Budget zentral in `rust-map-cache` (Semaphore/Queue über `scheduler_state`-Muster wiederverwendbar, **ohne** den bestehenden Cron anzufassen); ein fehlgeschlagener Resolve wird mit Backoff gemerkt (kein Retry-Sturm bei Page-Reloads).

---

## 10. UI-Zielbild

**Server Detail – Map Preview Card (oben):**
- Resolved: Badge `Procedural Map · 4500 · Seed 1847620394`, Thumbnail, Monument-Chips (dedupliziert, sortiert nach Tier), „View full map".
- Nicht resolved: Button **„Resolve Map"** → ruft `server-map-resolve`, zeigt Spinner-Zustand „Generating map preview… (queue position n)".
- Custom Map: Hinweis **„Custom map detected. Seed/size may not be enough."** + falls URL-Lookup erfolgreich trotzdem Preview.
- Keine Daten: **„Map data unavailable yet."** (Confidence < 0.4)

**Map View (2.0-B):**
- Bild-Canvas (erst statisches `imageUrl`, `tile_url_pattern` als spätere Zoom-Option)
- Monument-Marker aus `rust_map_monuments` (x/y → Pixel: lineare Transformation über `world_size`)
- Filter-Sidebar: Wunsch-Monumente (multi), max. Distanz, near road*, near water, avoid high-tier, avoid spawn beach, Biome-Präferenz (*road/biome erst mit Geometrie-Daten präzise → bis dahin ausblenden oder als „beta")
- Candidate-Overlay (2.0-C)

---

## 11. Risiken

| Risiko | Schwere | Mitigation |
|---|---|---|
| RustMaps-ToS/kommerzielle Nutzung ungeklärt | **Hoch** | Vor Launch schriftlich klären (OQ-2); bis dahin Cache-first + Attribution; Fallback: nur BM-embedded-Daten zeigen (rechtlich unkritisch, kommen über BM-API) |
| Provider-Bilder verfallen (`estimatedDeletionDate`) | Mittel | Eigener Storage-Cache, `expires_at`-Re-Fetch |
| Generator-Versionswechsel invalidiert Cache | Mittel | `generation_version` im Unique-Key; nach Facepunch-Force-Wipe Re-Resolve-Welle einplanen |
| Custom Maps ohne RustMaps-Hosting nicht auflösbar | Niedrig | Ehrlicher UI-Fallback; keine Grauzonen-Quellen |
| `rust_maps`-Embedded-Feld nicht bei allen Servern | Niedrig | Quote messen (OQ-1); Seed-Lookup als Fallback |
| Rate-Limit-Überschreitung bei Wipe-Days (viele Resolves gleichzeitig) | Mittel | Queue + `GET /v4/maps/limits` respektieren; Resolve on-demand statt Massen-Backfill |
| `world.configstring`-Server weichen vom Seed-Ergebnis ab | Niedrig | Confidence-Modell, Thumbnail sichtbar → User erkennt Diskrepanz |

---

## 12. Offene Fragen

- **OQ-1 (teilbeantwortet):** Provider-seitig liegt die Quote des eingebetteten `rust_maps`-Objekts bei **97,8 %** (n=500, Top-Rang). Offen bleibt die Quote auf **unserer** getrackten Servermenge (Long-Tail!) → Mess-Query auf vorhandene `raw`-Daten des Pulse-Ingest (read-only, kein Schema-Change) als erster Implementierungsschritt.
- **OQ-2 (teilbeantwortet):** Generierungs-Quoten liegen öffentlich vor (Free: 250/Monat, 3 parallel … Org2: 1750/Monat, 10 parallel, s. § 6). **Offen:** kommerzielle Nutzungslizenz, Bild-Caching-Erlaubnis, Attribution-Pflicht, Read-Lookup-Rate-Limits → ToS lesen + schriftlich via Kontakt/Discord bestätigen.
- **OQ-3:** Speichern wir BM-Details heute vollständig genug (enthält unser `raw` die `details`-Sektion)? Falls nein: Ingest minimal erweitern (eigener Sprint, nicht 2.0-A).
- **OQ-4:** Grid-Label-Konvention (K14) – eigene Ableitung aus x/y/world_size implementieren oder aus Provider-Metadaten? (Eigene Ableitung ist trivial und provider-unabhängig → empfohlen.)
- **OQ-5:** Brauchen wir `tile_url_pattern` wirklich in 2.0-B oder reicht statisches Bild + CSS-Zoom bis 2.0-C?

---

## 13. Implementation Recommendation

**Optionenvergleich:**
- **A** (BM → RustMaps API → Cache Preview+Monumente): voll featurefähig, ein Provider-Abhängigkeitspunkt, API-Key + ToS-Klärung nötig.
- **B** (BM → nur Public-URL/Bild-Lookup, Preview only): schnell, aber keine Koordinaten → kein Filter/Scoring; Hotlink-Risiko.
- **C** (eigener Parser/Generator): maximale Unabhängigkeit, hoher Aufwand, erst sinnvoll wenn Produkt validiert.
- **D (Hybrid) – EMPFOHLEN:** Embedded-`rust_maps`-Daten aus BattleMetrics als kostenlose Stufe 0, RustMaps-API als Stufe 1 für Koordinaten/Vollbild, Option C als spätere Stufe 2 für Straßen-/Biome-Geometrie.

**Konkreter Phasenplan:**

**Phase 2.0-A (dieser Branch, nach Freigabe):**
1. Read-only-Analyse OQ-1/OQ-3 auf bestehenden Ingest-Daten.
2. Migrations-Entwurf für `server_map_identity`, `rust_maps`, `rust_map_monuments`, `server_map_assignments` (Review, dann Push).
3. Extraktor: BM-`details` → `server_map_identity` (inkl. Custom-Erkennung + Confidence), als Teil des bestehenden Ingest-Flows **ohne** Cron-Änderung (reine Verarbeitungsergänzung) oder als separate on-demand Function – Entscheidung im Review.
4. `rust-map-cache` + `server-map-resolve` (Secrets: `RUSTMAPS_API_KEY` via Supabase Secrets, erst nach OQ-2).
5. Server-Detail Map Preview Card mit den vier Zuständen.

**Phase 2.0-B:** Map View (Bild + Monument-Marker + Basis-Filter über Monument-Distanzen).
**Phase 2.0-C:** `buildspot-score` v1 (monument-distanzbasiert), danach optional Option C (Map-File-Parsing) für Straßen/Biome/Risk Zones und Heatmaps.

---

## 14. Abschlussbericht (Kurzfassung für Owner)

- **Geprüfte Quellen:** BattleMetrics-API (live, Beispiel-Payload analysiert), RustMaps-API v4 (live via öffentliches Swagger inkl. Schemas), Just-Wiped (live, Netzwerk-/Asset-Verhalten), Rust:IO (verworfen, inaktiv), Rust-Server-Query (konzeptionell, durch BM abgedeckt).
- **Liefert BattleMetrics seed/size?** Ja (99 % der Top-500) – plus Wipes, Level-Name, `levelurl` und in **97,8 %** ein komplettes eingebettetes RustMaps-Objekt (n=500, live gemessen).
- **Ist die RustMaps-API geeignet?** Ja – Seed/Size- und URL-Lookup, Generation+Polling, Bilder in mehreren Auflösungen, **Monument-Koordinaten**. API-Key nötig (`X-API-Key`); Quoten öffentlich (Free 250 Gen/Monat … Org2 1750).
- **Monumentdaten verfügbar?** Namen/Counts schon via BM-Embedded; Koordinaten via RustMaps.
- **Custom Maps:** erkennbar am **Level-Namen** (nicht an `levelurl` – die ist heute Standard-CDN-Distribution, auch bei offiziellen Facepunch-Servern!); Identität = URL/Hash statt Seed; Auflösung via `GET /v4/maps/url`; ehrlicher UI-Fallback wenn nicht auflösbar.
- **Just-Wiped-Verhalten nachvollziehbar?** Ja – eigener CDN-Cache + In-Progress-/Custom-Platzhalter; bestätigt unsere Cache-first-Architektur; keine Integrationsquelle.
- **Empfehlung:** Option D (Hybrid), Phasenplan oben. **Blocker vor Produktivsetzung:** OQ-2 (RustMaps-Lizenz) klären, OQ-1/OQ-3 messen.
- **Nicht angefasst (wie gefordert):** Secrets, Supabase-DB, Functions, Cron, Base Blueprints, main.
