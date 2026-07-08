# Map Intel Monument Masterplan

**Projekt:** RustMasterTool · **Typ:** Research + Bauplan (research-only) · **Datum:** 2026-07-08
**Status:** ENTWURF zur Owner-Freigabe. **Nicht committet, kein Branch, kein Code geändert, keine Bilder heruntergeladen.**
**Scope-Guards eingehalten:** keine Secrets, kein DB-Push, kein Deploy, kein Cron-Change, kein Merge, kein Bild-Hotlink als Produktasset.

> Zweck: Aus dem bestehenden `mapIntelData.ts` (aktuell **8** Monumente) eine **vollständige** Monument-Enzyklopädie machen, die **jeden** Namen abdeckt, der im Server-Detail unter „+ N more" aus `details.rust_maps.monuments` auftauchen kann — damit jeder Chip später in Map Intel aufschlagen kann. Dieses Dokument ist der Bauplan dafür; es enthält bewusst noch keinen Produktionscode.

---

## 0. Ausgangslage im Code (verankert)

| Baustein | Datei | Zustand |
|---|---|---|
| Monument-Chips im Server-Detail | `apps/web/src/features/dashboard/ServerDetailPanel.tsx:287–300` | Rendert `details.rust_maps.monuments` (String-Array) als Chips, „+N more"-Toggle. **Keine** Verlinkung zu Map Intel. |
| Map-Intel-Bibliothek | `apps/web/src/features/learn/map-intel/mapIntelData.ts` | Reiches Schema, aber nur **8** Einträge. |
| Map-Intel-View | `apps/web/src/features/learn/map-intel/MapIntelView.tsx` | Grid + Kategorie-Chips + Detail-Modal. Bild = lucide-Placeholder. |
| Filter-Normalisierung | `apps/web/src/features/dashboard/monumentFilters.ts` | ~22 `MonumentInfo` mit `aliases[]` + `normalizeMonumentName()`. |
| Map-Identität (Daten) | `mapIdentityEnrichment.ts` + Tabelle `server_map_identity.monument_names` | Monumentnamen kommen aus BattleMetrics-`rust_maps`, kein RustMaps-Call nötig. |
| Vorarbeit | `docs/research/rust-map-intelligence-research.md` (Phase 2.0-A) | Datenquellen-Matrix, RustMaps-API, Custom-Map-Erkennung. |

**Kernentscheidung, die dieser Plan trifft:** Map Intel bleibt eine **statische, kuratierte Wissensbibliothek** (kein Live-API-Call pro Monument). Der Bezug zu einem konkreten Server läuft ausschließlich über **Name-Matching** (`normalizeMonumentName`) zwischen den Server-Chips und den Bibliothekseinträgen. Das ist kostenlos, offline-fähig und ToS-sicher.

---

## 1. Vollständige Monument-Liste (Master-Katalog)

Legende — **Loot** 0–5 · **Rad** none/low/med/high/extreme · **Card** –/G(reen)/B(lue)/R(ed)/Fuse · **Rec**ycler ✔/✗ · **NPC** none/scientists/heavy/Bradley · **PvP** low/med/high/none · **Filter** = für Monument-Filter geeignet · **Heat** = später für Base-Spot-/Heatmap-Rating relevant.

> ⚠️ Spielstands-Hinweis: Rust ändert Monumente laufend (Wipes, Updates). Werte unten = Stand ~2025/26 aus den zitierten Quellen + Domänenwissen. Alle mit ⚠️ markierten Felder in Abschnitt 7 gegenprüfen, bevor sie als „Fakt" ins Produkt gehen.

### 1a. Safe Zones (soziale Zonen, kein Kampf)

| # | Canonical | Kat | Loot | Rad | Card | Rec | Werkbank/Refin./Repair | NPC | PvP | Filter | Heat |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Outpost | safe_zone | – | none | – | ✔ | WB1, Research, Repair, Refinery, Vending | none (Turrets) | none | ✔ | ✔ |
| 2 | Bandit Camp | safe_zone | – | none | – | ✔ | WB1, Repair, Refinery, Casino, Vending, Heli-Kauf | none (Turrets) | none | ✔ | ✔ |
| 3 | Fishing Village (Small) | safe_zone | 1 | none | – | ✔(klein) | Repair, Vending, Boot-Kauf | none (Turrets) | none | ✔ | ✔ |
| 4 | Large Fishing Village | safe_zone | 1 | none | – | ✔ | Repair, Vending, Boot-/Sub-Kauf | none (Turrets) | none | ✔ | ✔ |

### 1b. Tier 1 / Kleine Monumente (Einstieg, Green/kein Card)

| # | Canonical | Kat | Loot | Rad | Card | Rec | Extra | NPC | PvP | Filter | Heat |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 5 | Oxum's Gas Station | tier_1 | 1 | none | G (spawnt) | ✔ | – | none | low | ✔ | ✔ |
| 6 | Abandoned Supermarket | tier_1 | 1 | none | G (spawnt) | ✔ | – | none | med | ✔ | ✔ |
| 7 | Mining Outpost | tier_1 | 1 | none | – | ✔ | Ofen, WB nein | none | low | ✔ | ✔ |
| 8 | Lighthouse | tier_1 | 2 | low | – | ✔ | – | none | high (Sniper) | ✔ | ✔ |
| 9 | Abandoned Cabins | tier_1 | 1 | none | G (Chance) | ✗ | – | none | low | ⚠️ | – |
| 10 | Warehouse ⚠️ | tier_1 | 1 | none | – | ⚠️ | ⚠️ ggf. deprecated/umbenannt | none | low | ⚠️ | ⚠️ |

### 1c. Roadside-Monumente (2023+ „Roadside" Update, neutral)

| # | Canonical | Kat | Loot | Rad | Card | Rec | Extra | NPC | PvP | Filter | Heat |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 11 | Ranch | roadside | 1 | none | – | ⚠️ | Hitching/Boxen | none | med (Freshie-Spawn) | ✔ | ✔ |
| 12 | Large Barn | roadside | 1 | none | – | ⚠️ | Boxen | none | med | ✔ | ✔ |
| 13 | Water Well | roadside | 0–1 | none | – | ✔ | Wasser (Pumpe) | none | low | ✔ | – |
| 14 | Transmission/Substation | roadside | 0 | none | – | ✗ | Strom-Fuse-Kontext | none | low | ⚠️ | – |
| 15 | Bus Stop / Roadside junk | roadside | 0–1 | none | – | ✗ | Barrels | none | low | – | – |

### 1d. Tier 2 / Mittlere Monumente (Blue/Fuse, moderate Rad)

| # | Canonical | Kat | Loot | Rad | Card | Rec | Extra | NPC | PvP | Filter | Heat |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 16 | The Dome | tier_2 | 3 | low–med | – | ✔(⚠️) | Refinery, Diesel, Magnetkran | none | med | ✔ | ✔ |
| 17 | Water Treatment Plant | tier_2 | 4 | med | B→R (Fuse) | ✔ | Refinery, WB | scientists | med | ✔ | ✔ |
| 18 | Sewer Branch | tier_2 | 3 | low–med | G/B | ✔ | – | scientists | low | ✔ | ✔ |
| 19 | Satellite Dish | tier_2 | 2 | low | B (Fuse) | ✔ | – | scientists | low | ✔ | ✔ |
| 20 | Harbor (Large / „Harbor 1") | tier_2 | 3 | low | G→B | ✔ | Refinery, Crane, Boot | scientists | med | ✔ | ✔ |
| 21 | Harbor (Small / „Harbor 2") | tier_2 | 2 | low | G→B | ✔ | Crane, Boot | scientists | med | ✔ | ✔ |
| 22 | Junkyard | tier_2 | 2 | none | – | ✔ | Magnetkran, Car-Crusher, Diesel | none | low | ✔ | ✔ |
| 23 | Ferry Terminal | tier_2 | 2–3 | low | G/B | ✔ | Boot, Cargo-Kontext | scientists | low | ✔ | ✔ |
| 24 | Airfield | tier_2 | 3 | med | G/B | ✔✔(2) | – | scientists | high | ✔ | ✔ |

### 1e. Tier 3 / Große Monumente (Red/hohe Rad, Endgame)

| # | Canonical | Kat | Loot | Rad | Card | Rec | Extra | NPC | PvP | Filter | Heat |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 25 | Launch Site | tier_3 | 5 | extreme | G+R | ✔ | Bradley-APC, Elite-Room, Chinook | Bradley + scientists | high | ✔ | ✔ |
| 26 | Military Tunnels | tier_3 | 5 | high | R | ✔ | Aggro-Scientists, Fuse | heavy scientists | high | ✔ | ✔ |
| 27 | Power Plant | tier_3 | 4 | high | R | ✔ | Fuse, vertikal | scientists | high | ✔ | ✔ |
| 28 | Train Yard | tier_3 | 4 | med–high | B→R | ✔ | Refinery, Diesel, Waggons | scientists | med | ✔ | ✔ |
| 29 | Giant Excavator Pit | tier_3 | 3 | low | – | ✔ | Excavator-Event, Diesel | wenige/keine | low–med | ✔ | ✔ |
| 30 | Arctic Research Base | tier_3 | 3 | low–med | G/Card | ✔ | Snowmobile, Fuse | scientists | med | ✔ | ✔ |
| 31 | Abandoned Military Base (Desert) | tier_3 | 3–4 | med | Card | ✔ | Bradley (⚠️), Fuse | scientists | med | ✔ | ✔ |
| 32 | Missile Silo (Nuclear) | tier_3 | 4 | med–high | Card/Fuse | ✔ | großer Underground-Komplex | scientists | med | ✔ | ✔ |

### 1f. Offshore / Wasser

| # | Canonical | Kat | Loot | Rad | Card | Rec | Extra | NPC | PvP | Filter | Heat |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 33 | Large Oil Rig | offshore | 5 | none→high (nach Crate) | R (Crate) | ✔ | Locked-Crate-Event, Heli-Pad | heavy scientists | high | ✔ | – |
| 34 | Small Oil Rig | offshore | 4 | none→high | R (Crate) | ✔ | Locked-Crate-Event | scientists | med | ✔ | – |
| 35 | Underwater Labs | offshore | 3–4 | none | Card (intern) | ✔ | Sub nötig, prozeduraler Innenbau | scientists | med | ✔ | – |
| 36 | Cargo Ship (Event) | event | 4 | none | – (Hack) | ✔ | dynamisch, fährt Route | scientists | high | – | – |
| 37 | Ice Lakes / Frozen Lake | terrain | 0–1 | none | – | ✗ | Loot-Crates auf Eis (⚠️) | none | low | ⚠️ | ⚠️ |

### 1g. Caves & Tunnels (Underground)

| # | Canonical | Kat | Loot | Rad | Card | Rec | Extra | NPC | PvP | Filter | Heat |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 38 | Cave (Small) | cave | 1 | none | – | ✗ | Basisbau-Spot | none | low | ✔ | ✔ |
| 39 | Cave (Medium) | cave | 1–2 | none | – | ✗ | Basisbau-Spot | none | low | ✔ | ✔ |
| 40 | Cave (Large) | cave | 2 | low | – | ✗ | mehrere Ausgänge | none | med | ✔ | ✔ |
| 41 | Sewer Cave ⚠️ | cave | 1 | low | – | ✗ | ⚠️ | none | low | ⚠️ | ⚠️ |
| 42 | Train Tunnels (Underground Rail) | tunnel | 2 | low | – | ✗(⚠️) | Workcarts, Underground-Dwellings, U-Bahn-Stationen, Loot-Rooms | tunnel dwellers (NPC) | med | ✔ | ✔ |

### 1h. Quarries / Ressourcen-Monumente

| # | Canonical | Kat | Loot | Rad | Card | Rec | Extra | NPC | PvP | Filter | Heat |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 43 | Sulfur Quarry | quarry | 0 (Ore) | none | – | ✗ | statischer Quarry, Diesel-Betrieb | none | low | ✔ | ✔ |
| 44 | Stone Quarry | quarry | 0 (Ore) | none | – | ✗ | statischer Quarry | none | low | ✔ | ✔ |
| 45 | HQM Quarry | quarry | 0 (Ore) | none | – | ✗ | statischer Quarry | none | low | ✔ | ✔ |

### 1i. Terrain-/Topologie-Features (KEINE Monumente — Sonderbehandlung, s. §7)

Aus RustMaps-Topologie-Zählern, nicht aus `monuments[]`: **Lake / Lakes**, **Oasis / Oases**, **Mountains**, **Islands**, **Rivers**, **Canyons**, **Icebergs**, **Buildable Rocks**, **Swamp**. Der Owner nennt „Lake" und „Oasis" ausdrücklich — sie gehören ins Map Intel, aber als **eigene Kategorie „Terrain / Biome-Feature"** mit anderem Schema (kein Loot/Keycard, dafür Base-/Farm-/Route-Relevanz). „**Lager**" (dt.) → mit hoher Wahrscheinlichkeit „**Warehouse/Depot**" oder Sammelbegriff „Camp" → in §7 als Unsicherheit markiert, vorläufig auf `warehouse` gemappt.

**Dynamische Events** (keine festen Monumente, evtl. eigene Sektion „Events"): Cargo Ship, Attack/Patrol Helicopter, Chinook (CH47), Airdrop, Travelling Vendor.

**Gesamt statische Monumente im Katalog:** ~45 (ohne Terrain-Features & Events). Das deckt praktisch alle `rust_maps.monuments`-Strings ab.

---

## 2. Normalisierungs-/Alias-Liste für die Filter

Erweiterung von `monumentFilters.ts`. Ziel: **jeder** reale String aus `details.rust_maps.monuments` (menschenlesbar, z. B. „Launch Site", „Harbor", „Giant Excavator Pit") **und** — falls wir je die RustMaps-v4-API nutzen — deren `type`/`nameOverride`-Slug (⚠️ Enum in §7 zu verifizieren) trifft eine Canonical-ID.

```txt
outpost            ← outpost, compound, scientist outpost
bandit_camp        ← bandit camp, bandit town, bandit_town
fishing_village    ← fishing village, small fishing village, fishing_village_a/b/c
large_fishing_village ← large fishing village, large_fishing_village
gas_station        ← oxum's gas station, gas station, gas_station
supermarket        ← abandoned supermarket, supermarket
mining_outpost     ← mining outpost, mining_outpost, warehouse (⚠️ prüfen)
lighthouse         ← lighthouse, lighthouse_a
abandoned_cabins   ← abandoned cabins, cabins
ranch              ← ranch, stables (⚠️ Stables vs Ranch klären)
large_barn         ← large barn, barn
water_well         ← water well, waterwell, water_well_a..e
dome               ← the dome, dome, sphere tank, sphere_tank
water_treatment    ← water treatment, water treatment plant, water_treatment_plant
sewer_branch       ← sewer branch, sewer_branch
satellite_dish     ← satellite dish, satellite_dish
harbor             ← harbor, large harbor, harbor_1, harbour  (⚠️ Groß/Klein trennen? s. §7)
harbor_small       ← small harbor, harbor_2
junkyard           ← junkyard, junk yard
ferry_terminal     ← ferry terminal, ferryterminal, ferry_terminal
airfield           ← airfield, airfield_1
launch_site        ← launch site, launch_site
military_tunnels   ← military tunnels, military tunnel, military_tunnels
power_plant        ← power plant, powerplant, power_plant
train_yard         ← train yard, trainyard, train_yard
excavator          ← giant excavator, giant excavator pit, excavator
arctic_base        ← arctic research base, arctic base, arctic_research_base
abandoned_military_base ← abandoned military base, desert military base, military_base
missile_silo       ← missile silo, nuclear missile silo, missile_silo, silo
large_oil_rig      ← large oil rig, oil rig large, large_oilrig, oilrig_1 (⚠️)
small_oil_rig      ← small oil rig, oil rig, oilrig, oilrig_2 (⚠️)
underwater_labs    ← underwater labs, underwater lab, underwater_lab
cargo_ship         ← cargo ship, cargoship  (Event)
cave_small         ← cave small, cave_small
cave_medium        ← cave medium, cave_medium
cave_large         ← cave large, cave_large
train_tunnel       ← train tunnel, train tunnels, tunnel, train_tunnel, underground
sulfur_quarry      ← sulfur quarry, mining_quarry_c
stone_quarry       ← stone quarry, mining_quarry_a
hqm_quarry         ← hqm quarry, mining_quarry_b
# Terrain (eigene Kategorie):
lake               ← lake, lakes
oasis              ← oasis, oases
swamp              ← swamp
iceberg            ← iceberg, icebergs, ice lake, ice_lake
```

**Wichtig:** `normalizeMonumentName()` nutzt `includes()`-Substring-Matching → Reihenfolge/Spezifität beachten (z. B. „large oil rig" **vor** „oil rig" prüfen; „large fishing village" **vor** „fishing village"). Empfehlung im Bau: von spezifisch → generisch sortieren oder auf exakteren Match-Algorithmus (longest-alias-first) umstellen.

---

## 3. Vorschlag TypeScript-Datenmodell

Erweiterung des bestehenden `MapMonument` (rückwärtskompatibel — bestehende 8 Einträge bleiben gültig, neue Felder optional/mit Defaults):

```ts
export type MonumentCategoryId =
  | 'safe_zone' | 'tier_1' | 'tier_2' | 'tier_3'
  | 'offshore' | 'cave' | 'tunnel' | 'quarry'
  | 'roadside' | 'event' | 'terrain';

export type Keycard = 'green' | 'blue' | 'red';
export type RadiationLevel = 'none' | 'low' | 'medium' | 'high' | 'extreme';
export type RiskLevel = 'none' | 'low' | 'medium' | 'high' | 'extreme';
export type Confidence = 'verified' | 'likely' | 'uncertain'; // Quellenlage pro Eintrag

export interface MapMonument {
  id: string;
  name: string;                 // Canonical Display Name
  aliases: string[];            // muss zu monumentFilters passen (Single Source of Truth, s. §7)
  categoryId: MonumentCategoryId;

  // Narrativ
  explanation: string;
  advantages: string[];
  disadvantages: string[];
  beginnerTip: string;          // vormals quickTip
  baseRouteRelevance: string;   // Base-/Roam-/Route-Kontext

  // Strukturierte Enums (filter-/badge-fähig)
  risk: RiskLevel;
  lootValue: 0 | 1 | 2 | 3 | 4 | 5;
  lootTypes: string[];          // z. B. ['Military Crate','Elite Crate','Barrels','Components']
  radiation: RadiationLevel;
  radiationNote?: string;
  keycardsRequired: Keycard[];
  fuseRequired: boolean;
  hasRecycler: boolean;
  facilities: Array<'workbench' | 'refinery' | 'repair' | 'research' | 'vending' | 'oven' | 'crane'>;
  npcs: 'none' | 'scientists' | 'heavy_scientists' | 'bradley' | 'tunnel_dwellers';
  pvpRisk: RiskLevel;

  // Produkt-Flags
  isFilterable: boolean;        // taucht als Monument-Filter auf
  isHeatmapRelevant: boolean;   // später Base-Spot-/Heatmap-Scoring

  // Medien & Qualität
  imageUrl?: string;            // s. §8 (vorerst leer → Placeholder)
  sources: string[];            // Quellen-URLs pro Eintrag
  confidence: Confidence;       // Ehrlichkeits-Flag
  lastReviewed: string;         // ISO-Datum
}
```

**Migrationshinweis:** `quickTip` → `beginnerTip` umbenennen (oder beide führen), `lootRelevance` (string) bleibt optional zusätzlich zu `lootValue`+`lootTypes`. Kategorien-Enum ersetzt die 5 Roh-Strings; `MONUMENT_CATEGORIES` entsprechend erweitern.

---

## 4. Kategorienstruktur (Map-Intel-UI)

Vorschlag für die Filter-Chips in `MapIntelView` (ersetzt die aktuellen 5):

1. **Safe Zones** — Outpost, Bandit Camp, Fishing Villages
2. **Tier 1 · Einstieg** — Gas Station, Supermarket, Mining Outpost, Lighthouse, Cabins
3. **Tier 2 · Mid-Game** — Dome, Water Treatment, Sewer Branch, Satellite Dish, Harbors, Junkyard, Ferry Terminal, Airfield
4. **Tier 3 · Endgame** — Launch Site, Military Tunnels, Power Plant, Train Yard, Excavator, Arctic Base, Desert Base, Missile Silo
5. **Offshore / Wasser** — Large/Small Oil Rig, Underwater Labs, Cargo Ship
6. **Caves & Tunnels** — Cave S/M/L, Train Tunnels
7. **Quarries** — Sulfur / Stone / HQM
8. **Roadside** — Ranch, Large Barn, Water Well, Substations
9. **Terrain-Features** — Lake, Oasis, Swamp, Icebergs *(anderes Schema)*
10. **Events** *(optional)* — Cargo, Heli, Chinook, Airdrop

Zusätzlich sinnvoll: **Sekundär-Facetten** als Toggles statt Kategorien — „hat Recycler", „kein Keycard", „radiationsfrei", „Anfänger-freundlich". Diese mappen 1:1 auf die neuen Enum-Felder und sind später auch die Basis für die **Monument-Filter in der Serversuche**.

---

## 5. Priorisierung — welche 20 zuerst tief ausarbeiten

Kriterium: (a) Häufigkeit auf Standard-Procedural-Maps, (b) Progressions-/Loot-Bedeutung, (c) wie oft sie als Chip im Server-Detail erscheinen. Die ersten 8 sind schon angelegt (nur Schema-Upgrade + Review nötig).

**Welle 1 (bereits vorhanden — nur erweitern/verifizieren):**
1. Outpost · 2. Bandit Camp · 3. Oxum's Gas Station · 4. Abandoned Supermarket · 5. The Dome · 6. Water Treatment Plant · 7. Launch Site · 8. Large Oil Rig

**Welle 2 (neu, höchste Priorität):**
9. Airfield · 10. Military Tunnels · 11. Power Plant · 12. Train Yard · 13. Small Oil Rig · 14. Harbor (Large) · 15. Satellite Dish · 16. Sewer Branch · 17. Giant Excavator Pit · 18. Junkyard · 19. Fishing Village · 20. Underwater Labs

**Welle 3 (danach):** Ferry Terminal, Arctic Research Base, Abandoned Military Base, Missile Silo, Mining Outpost, Lighthouse, Harbor (Small), Ranch/Large Barn, Caves (S/M/L), Train Tunnels, Quarries (Sulfur/Stone/HQM), Terrain-Features, Events.

---

## 6. Quellenliste

- Rust Wiki – The Map (kanonische Monument-Namen nach Typ): https://wiki.facepunch.com/rust/map
- Rust Monument Viewer / RustMaps (3D, Loot, Respawn): https://rustmaps.com/monuments
- RustMaps (Map-Hub, Monumente, prozedurale Maps): https://rustmaps.com/
- Tradeit – All Rust Monuments Tier List (Tier/Rad/Card/Recycler/NPC): https://tradeit.gg/blog/all-rust-monuments-tier-list/
- Tradeit – Rust Recycler Locations: https://tradeit.gg/blog/rust-recycler-locations/
- BisectHosting – Rust Recycler Guide (Recycler + Werkbank-Kombis): https://www.bisecthosting.com/blog/rust-recycler-guide-locations-recycle-chart-scrap
- Skins.cash – Rust Recycler Locations (Harbor u. a.): https://skins.cash/blog/rust-harbor-recycler/
- GamesRadar – Rust Map Guide (Monument-Übersicht): https://www.gamesradar.com/rust-map/
- RustMods – Ultimate Map Guide (Loot-Spots): https://rustmods.com/rust-map-guide/
- Steam Community – Component Recycler + Radiation Map 2025: https://steamcommunity.com/sharedfiles/filedetails/?id=3106820592
- Radtown (Rework): Rust Wiki/RustHelp https://rusthelp.com/monument/radtown · CorrosionHour https://www.corrosionhour.com/rust-radtown-monument-guide/ · Sportskeeda World 2.0 Patchnotes https://www.sportskeeda.com/mmo/rust-world-update-2-0-patch-notes-new-radtown-monument-revamped-rock-formations
- Apartment Complex: Steam-Guide https://steamcommunity.com/sharedfiles/filedetails/?id=3756683310 · Rustafied „Common Ground Update" https://www.rustafied.com/updates/2026/7/2/common-ground-update
- Jungle Ziggurat / Jungle Ruins: CorrosionHour https://www.corrosionhour.com/rust-jungle-ziggurat-monument-guide/ · RustExplore https://rustexplore.com/world/monuments/ziggurat
- Interne Vorarbeit: `docs/research/rust-map-intelligence-research.md` (Phase 2.0-A), `docs/adr/ADR-012-map-prefabs-storage.md`, `experiments/rustmaps-lookup-poc/`

**Noch NICHT eingeholt (empfohlen für Bauphase):** rustlabs.com pro Monument (exakte Crate-Counts/Respawn), corrosionhour Einzel-Monument-Guides (aktuelle URL, alte 404), offizielle Rust-Devblogs für jüngste Monument-Änderungen (Ranch/Barn/Missile Silo/Desert Base).

---

## 7. Offene Unsicherheiten (klar markiert — vor Produktivsetzung prüfen)

1. **RustMaps-`type`-Enum vs. Anzeige-Namen.** Die Server-Chips kommen als **menschenlesbare Namen** aus `details.rust_maps.monuments`. Ob/mit welchen Slugs die RustMaps-**v4-API** (`monuments[].type`) benennt, ist **nicht** an Live-Payload verifiziert. → Vor Alias-Finalisierung ein echtes `rust_maps.monuments`-Sample aus unserer `server_map_identity`-Tabelle ziehen und die tatsächlichen Strings zählen (kostenlos, read-only). **Das ist der wichtigste offene Punkt** — er entscheidet die Alias-Liste.
2. **„Lager" (Owner-Begriff).** Deutsch für Lager/Depot/Camp. Vorläufig auf `warehouse`/Depot gemappt. → Owner-Rückfrage: welches Monument konkret gemeint ist. Ggf. ist „Warehouse" heute nicht mehr eigenständig (Teil von Harbor?) → Punkt 3.
3. **„Warehouse" Existenz/Status.** Unsicher, ob „Warehouse" aktuell ein eigenständiges Monument ist oder umbenannt/entfernt. ⚠️
4. **Harbor Groß/Klein.** RustMaps kennt oft `harbor_1`/`harbor_2`. Unklar, ob wir sie trennen (zwei Einträge) oder zusammenfassen. Empfehlung: trennen, weil Loot/Größe differiert.
5. **Oil-Rig Keycard.** Tradeit schreibt „Red card required" — real ist der **Zugang** kartenfrei (Boot), die **Locked Crate** ist ein Timer-/Karten-Event. ⚠️ Formulierung im Text sauber trennen (Zugang ≠ Crate).
6. **Bradley an Desert/Abandoned Military Base.** Ob dort (zusätzlich zu Launch) ein Bradley patrouilliert, je nach Version unterschiedlich. ⚠️
7. **Ranch / Large Barn / Stables Recycler & Naming.** „Stables" (alt) vs. „Ranch" (neu) — Alias-Kollision, Recycler-Präsenz unklar. ⚠️
8. **Caves Recycler/Loot & „Sewer Cave".** Cave-Loot gering und versionsabhängig; „Sewer Cave" als eigenes Monument unsicher. ⚠️
9. **Train Tunnels Recycler & NPC.** Underground-Rail hat Loot-Rooms, Tunnel-Dweller-NPCs und teils Underground-Stationen mit Recycler — Umfang versionsabhängig. ⚠️
10. **Terrain-Features (Lake/Oasis/Swamp).** Kommen NICHT aus `monuments[]`, sondern aus RustMaps-Topologie-Countern (`lakes`, `oases`…). Sie brauchen ein **eigenes Schema** und eine **eigene Datenquelle** — nicht mit dem Name-Matching der Monument-Chips vermischen.
11. **Dome Recycler.** Quellen widersprüchlich (eine sagt „Recycler", eine „nein, nur Refinery"). ⚠️
12. **Tier-Werte sind kuratierte Meinung.** Loot-Zahlen/Tier-Rankings variieren je Guide/Wipe. Als „Richtwert" labeln, nicht als harte Wahrheit. `confidence`-Feld nutzen.

---

## 8. Bildstrategie (keine Bilder kopiert — nur legale Pfade dokumentiert)

**Grundsatz:** Keine Wiki-/RustMaps-Bilder als Produktasset hotlinken oder herunterladen, bevor die Lizenz geklärt ist (bereits in Phase-2.0-A-Research als Risiko vermerkt).

| Option | Quelle | Rechtelage | Empfehlung |
|---|---|---|---|
| **A. Generierte Platzhalter** | eigen (SVG/CSS) | unkritisch | **Sofort.** Deterministische, kategorie-gefärbte Kachel mit Monument-Name + Tier-Icon (baut auf dem heutigen lucide-`Map`-Placeholder auf). Keine externe Abhängigkeit. |
| **B. Eigene In-Game-Screenshots** | Owner erstellt | Rust-Fan-Content i. d. R. toleriert; als eigenes Asset sicherer | **Mittelfristig.** Eigenes `map-intel/assets/`-System, WebP, einheitlicher Look. Klarste Rechtelage. |
| **C. RustMaps-API-Bilder** | rustmaps.com | Map-Bilder, **kommerziell zu klären** | Nur nach expliziter Lizenz-/ToS-Freigabe (liefert Map-Ansicht, nicht Monument-Art). |
| **D. Facepunch/Wiki-Art** | wiki.facepunch.com | Facepunch-Brand-Assets | Nur nach Prüfung der Nutzungsbedingungen; nicht als Default. |
| **E. Community/Creator-Art** | diverse | einzeln zu lizenzieren | Nur mit schriftlicher Erlaubnis. |

**Konkreter Pfad-Vorschlag (für später, wenn Assets existieren):**
`apps/web/src/features/learn/map-intel/assets/<monument-id>.webp`, referenziert via `imageUrl`; Fallback bleibt Placeholder wenn Datei fehlt. **Jetzt:** `imageUrl` leer lassen → Placeholder rendert.

---

## 9. Empfohlene Umsetzungs-Reihenfolge (wenn Owner Bau freigibt — separater Auftrag)

1. **Read-only Datencheck:** echte `monument_names`-Strings aus `server_map_identity` ziehen → Alias-Liste gegen Realität härten (löst Unsicherheit #1).
2. **Schema-Upgrade** `mapIntelData.ts` (neue Felder, Kategorien-Enum), 8 Bestandseinträge migrieren.
3. **Welle 2** (12 Monumente) mit voller Recherche + `sources`/`confidence` je Eintrag.
4. **MapIntelView**: neue Kategorien + Sekundär-Facetten + generierte Platzhalter (Option A).
5. **Verlinkung Server-Detail → Map Intel:** Chips klickbar machen (`normalizeMonumentName` → Monument-Detail).
6. **Welle 3** + Terrain-Feature-Sektion (eigenes Schema).
7. Optional: Monument-Filter in Serversuche auf die Enum-Felder stützen (Ehrlichkeits-Matrix beachten — client-seitig auf geladenen Ergebnissen).

**Nicht Teil dieses Auftrags:** jeglicher Code, DB-Zugriff, Deploy, Bild-Download. Dieses Dokument ist reine Research + Plan.

---

## 10. API-Coverage-Audit — echtes Server-Sample (2026-07-08)

**Quelle:** Vom Owner geliefertes reales `details.rust_maps.monuments`-Sample eines Live-Servers (58 rawStrings). Als Produkt-Sample zu behandeln — **es löst mehrere Unsicherheiten aus §7 und weitet den Scope**.

**Sofort-Erkenntnisse:**
- RustMaps packt **Terrain-Features (Lake, Oasis, Ice Lake, Iceberg), Caves (mit Schwierigkeits-Varianten), Rock-Formations („God Rock" etc.) und Infrastruktur (Tunnel Entrance, Power Substation, Powerline)** in denselben `monuments[]`-String-Array wie klassische Loot-Monumente. → Der Klassifikator muss **alle** Typen erkennen, nicht nur Monumente.
- **Harbor-Split bestätigt** (getrennte Strings „Large Harbor" / „Small Harbor") → Unsicherheit §7 #4 **gelöst: splitten**.
- **„Sphere Tank" = The Dome** (Prefab-Name) → §2-Alias bestätigt.
- **`hasMapIntelEntry`-Abdeckung im Sample: 7 / 58** (Outpost, Sphere Tank→dome, Water Treatment, Supermarket, Gas Station, Launch Site, Large Oilrig). Riesige Lücke → Ausbau nötig.
- 4 echte **Unknown/Review-Kandidaten**: Apartments Complex, Ruin, Ziggurat, Radtown (+ „Warehouse", „Military Base" mit `likely`).

### 10a. Vollständige Audit-Tabelle (alle 58 rawNames, 1:1 gegen das Sample)

Spalten (alle geforderten enthalten): **raw** = rawName · **norm** = normalizedName · **canonicalId** = suggestedCanonicalId · **cat** = category · **var** = variant · **conf** = confidence · **Cl** = isClassicMonument · **Fi** = isFilterable · **He** = isHeatmapRelevant · **In** = hasMapIntelEntry · **Rv** = needsOwnerReview · **reason**. Bool: Y/N/? .

| # | raw | norm | canonicalId | cat | var | conf | Cl | Fi | He | In | Rv | reason |
|--|--|--|--|--|--|--|--|--|--|--|--|--|
| 1 | Lake | lake | lake | terrain | – | verified | N | N | Y | N | N | RustMaps-Topologie-Feature; Build-/Farm-Relevanz, kein Loot |
| 2 | Oasis | oasis | oasis | terrain | – | verified | N | N | Y | N | N | Terrain-Feature (Wüste); Farm/Build-Spot |
| 3 | Large Harbor | large harbor | harbor_large | tier_2 | – | verified | Y | Y | Y | N | N | Harbor groß; Split bestätigt |
| 4 | Ferry Terminal | ferry terminal | ferry_terminal | tier_2 | – | verified | Y | Y | Y | N | N | Küsten-Monument, Cargo-Kontext |
| 5 | Small Harbor | small harbor | harbor_small | tier_2 | – | verified | Y | Y | Y | N | N | Harbor klein; Split bestätigt |
| 6 | Fishing Village | fishing village | fishing_village | safe_zone | – | verified | Y | Y | Y | N | N | Safe Zone; „Large Fishing Village" wäre eigener String |
| 7 | Military Base | military base | abandoned_military_base | tier_3 | – | likely | Y | Y | Y | N | Y | = Abandoned/Desert Military Base; gegen Custom prüfen |
| 8 | Arctic Research Base | arctic research base | arctic_base | tier_3 | – | verified | Y | Y | Y | N | N | Schnee-Monument |
| 9 | Airfield | airfield | airfield | tier_2 | – | verified | Y | Y | Y | N | N | Klassisch |
| 10 | Sphere Tank | sphere tank | dome | tier_2 | – | verified | Y | Y | Y | **Y** | N | Prefab-Name für The Dome |
| 11 | Trainyard | trainyard | train_yard | tier_3 | – | verified | Y | Y | Y | N | N | Klassisch |
| 12 | Junkyard | junkyard | junkyard | tier_2 | – | verified | Y | Y | Y | N | N | Klassisch |
| 13 | Apartments Complex | apartments complex | apartments_complex | safe_zone | – | verified | Y | Y | Y | N | N | Neues Safe-Zone-City-Block-Monument: Mieträume, Shops, Elevator, Zugstation, Turrets; sozialer Hub, kein klassisches Loot |
| 14 | Excavator | excavator | excavator | tier_3 | – | verified | Y | Y | Y | N | N | = Giant Excavator Pit (Id `excavator` = Bestandscode) |
| 15 | Nuclear Missile Silo | nuclear missile silo | missile_silo | tier_3 | – | verified | Y | Y | Y | N | N | Klassisch |
| 16 | Launch Site | launch site | launch_site | tier_3 | – | verified | Y | Y | Y | **Y** | N | Klassisch |
| 17 | Powerplant | powerplant | power_plant | tier_3 | – | verified | Y | Y | Y | N | N | Klassisch |
| 18 | Satellite Dish | satellite dish | satellite_dish | tier_2 | – | verified | Y | Y | Y | N | N | Klassisch |
| 19 | Military Tunnels | military tunnels | military_tunnels | tier_3 | – | verified | Y | Y | Y | N | N | Klassisch |
| 20 | Outpost | outpost | outpost | safe_zone | – | verified | Y | Y | Y | **Y** | N | Safe Zone |
| 21 | Water Treatment | water treatment | water_treatment | tier_2 | – | verified | Y | Y | Y | **Y** | N | Id `water_treatment` = Bestandscode |
| 22 | Ranch | ranch | ranch | roadside | – | verified | Y | Y | Y | N | N | Roadside; Owner zählt es zu Monumenten |
| 23 | Hqm Quarry | hqm quarry | hqm_quarry | quarry | – | verified | Y | Y | Y | N | N | Statischer Quarry |
| 24 | Large Barn | large barn | large_barn | roadside | – | verified | Y | Y | Y | N | N | Roadside |
| 25 | Sulfur Quarry | sulfur quarry | sulfur_quarry | quarry | – | verified | Y | Y | Y | N | N | Statischer Quarry |
| 26 | Sewer Branch | sewer branch | sewer_branch | tier_2 | – | verified | Y | Y | Y | N | N | Klassisch |
| 27 | Stone Quarry | stone quarry | stone_quarry | quarry | – | verified | Y | Y | Y | N | N | Statischer Quarry |
| 28 | Tunnel Entrance | tunnel entrance | tunnel_entrance | infrastructure | – | verified | N | N | Y | N | N | Einstieg Train-Tunnel-Netz; Routing/Heatmap |
| 29 | Water Well | water well | water_well | roadside | – | verified | Y | Y | Y | N | N | Roadside; Wasser |
| 30 | Ruin | ruin | jungle_ruins | tier_1 | – | verified | Y | Y | Y | N | N | Jungle Ruins (Jungle-Update 2025-05-02); kleines Monument, ~3 Boxen, Military-Chest möglich, Substation-artige Parkour |
| 31 | Ziggurat | ziggurat | jungle_ziggurat | tier_2 | – | verified | Y | Y | Y | N | N | Jungle Ziggurat (Jungle-Update 2025-05-02); Pyramide im Jungle-Biome, teils ruiniert |
| 32 | Ice Lake | ice lake | ice_lake | terrain | – | verified | N | N | Y | N | N | Gefrorener See (Schnee-Biome) |
| 33 | Supermarket | supermarket | supermarket | tier_1 | – | verified | Y | Y | Y | **Y** | N | Klassisch |
| 34 | Gas Station | gas station | gas_station | tier_1 | – | verified | Y | Y | Y | **Y** | N | = Oxum's Gas Station |
| 35 | Radtown | radtown | radtown | tier_2 | – | verified | Y | Y | Y | N | N | Radtown-Rework (World-2-Update, Okt 2024): Recycler, Default/Military/Elite-Crates, Radioactive Water, KEIN NPC/KEIN Karten-Puzzle; low difficulty |
| 36 | Warehouse | warehouse | warehouse | tier_1 | – | likely | Y | Y | Y | N | **Y** | Eigenständiges Monument vs. Prefab/API-Name prüfen |
| 37 | Cave Small Medium | cave small medium | cave | cave | small_medium | verified | N | Y | Y | N | N | Variante erhalten, nicht plattmachen |
| 38 | Cave Medium Easy | cave medium easy | cave | cave | medium_easy | verified | N | Y | Y | N | N | Variante erhalten |
| 39 | Cave Large Hard | cave large hard | cave | cave | large_hard | verified | N | Y | Y | N | N | Variante erhalten |
| 40 | Cave Small Easy | cave small easy | cave | cave | small_easy | verified | N | Y | Y | N | N | Variante erhalten |
| 41 | Cave Large Medium | cave large medium | cave | cave | large_medium | verified | N | Y | Y | N | N | Variante erhalten |
| 42 | Cave Small Hard | cave small hard | cave | cave | small_hard | verified | N | Y | Y | N | N | Variante erhalten |
| 43 | Cave Large Sewers Hard | cave large sewers hard | cave | cave | large_sewers_hard | verified | N | Y | Y | N | N | Sewers-Modifier im Variant halten |
| 44 | Cave Medium Medium | cave medium medium | cave | cave | medium_medium | verified | N | Y | Y | N | N | Variante erhalten |
| 45 | Underwater Lab | underwater lab | underwater_labs | offshore | – | verified | Y | Y | N | N | N | Prozedural; Sub nötig |
| 46 | Small Oilrig | small oilrig | small_oil_rig | offshore | – | verified | Y | Y | N | N | N | Klassisch |
| 47 | Large Oilrig | large oilrig | large_oil_rig | offshore | – | verified | Y | Y | N | **Y** | N | Klassisch |
| 48 | Lighthouse | lighthouse | lighthouse | tier_1 | – | verified | Y | Y | Y | N | N | Küste; Sniper-Spot |
| 49 | Tunnel Entrance Transition | tunnel entrance transition | tunnel_entrance | infrastructure | transition | likely | N | N | Y | N | Y | Variante/Übergangs-Prefab des Tunnel-Entrance |
| 50 | Power Substation Small | power substation small | power_substation | infrastructure | small | verified | N | N | Y | N | N | E-Substation; Komponenten, Routing |
| 51 | Power Substation Big | power substation big | power_substation | infrastructure | big | verified | N | N | Y | N | N | E-Substation groß |
| 52 | Powerline | powerline | powerline | infrastructure | – | verified | N | N | Y | N | N | Stromtrassen-Routen-Feature |
| 53 | Tiny God Rock | tiny god rock | rock_formation | rock_formation | tiny_god | verified | N | N | Y | N | N | Revamped Rock Formation (World-2.0); Buildable Rock, Base-Spot |
| 54 | Anvil Rock | anvil rock | rock_formation | rock_formation | anvil | verified | N | N | Y | N | N | Revamped Rock Formation; Buildable Rock, Base-Spot |
| 55 | Medium God Rock | medium god rock | rock_formation | rock_formation | medium_god | verified | N | N | Y | N | N | Revamped Rock Formation; Buildable Rock |
| 56 | 3 Wall Rock | 3 wall rock | rock_formation | rock_formation | three_wall | verified | N | N | Y | N | N | Revamped Rock Formation; Buildable Rock (3-Wand-Spot) |
| 57 | Large God Rock | large god rock | rock_formation | rock_formation | large_god | verified | N | N | Y | N | N | Revamped Rock Formation; Buildable Rock groß |
| 58 | Iceberg | iceberg | iceberg | terrain | – | verified | N | N | Y | N | N | Ozean-Terrain (Eis) |

### 10b. Coverage-Statistik des Samples

| Kategorie | Anzahl | Filterbar | Heatmap-relevant | Map-Intel-Eintrag vorhanden |
|---|---|---|---|---|
| Klassische Monumente (inkl. Quarry/Roadside/Offshore/Radtown/Jungle/Apartments) | 36 | 36 | 34 | 7 |
| Terrain-Features | 4 | 0 | 4 | 0 |
| Caves (mit Varianten) | 8 | 8 | 8 | 0 |
| Infrastructure/Route | 5 | 0 | 5 | 0 |
| Rock-Formations | 5 | 0 | 5 | 0 |
| Review offen (`likely`) | 2 (Warehouse, Military Base) | 2 | 2 | 0 |
| **Summe** | **58** | — | — | **7 (12 %)** |

→ Nach der Zusatz-Recherche sind **56 / 58** Strings sicher klassifiziert (`verified`), nur **2** bleiben `likely` (Warehouse-Standalone-Status, Military-Base vs. Custom). Aber: **~22 Nicht-Loot-Strings** (Terrain/Cave/Infra/Rock) und ~29 klassische ohne reichen Eintrag müssen Klassifikator + UI **render- und klassifizierbar** machen, auch ohne (noch) reichen Map-Intel-Eintrag.

---

## 11. Erweiterte Normalisierungs-/Klassifikations-Architektur

`normalizeMonumentName()` (reines Substring-`includes`) reicht nicht mehr. Vorschlag: eine **ordered classifier**-Funktion, die **immer** ein Ergebnis liefert (nie `null`, nie Crash) und Varianten erhält.

```ts
export type MonumentCategoryId =
  | 'safe_zone' | 'tier_1' | 'tier_2' | 'tier_3'
  | 'offshore' | 'cave' | 'tunnel' | 'quarry' | 'roadside'
  | 'terrain' | 'rock_formation' | 'infrastructure'
  | 'event' | 'unknown';

export interface MonumentClassification {
  rawName: string;
  normalizedName: string;          // lower/trim
  canonicalId: string | null;      // null bei unknown
  category: MonumentCategoryId;
  variant: string | null;          // caves, substation, rocks, tunnel-transition
  confidence: 'verified' | 'likely' | 'uncertain';
  isClassicMonument: boolean;
  isFilterable: boolean;
  isHeatmapRelevant: boolean;
  hasMapIntelEntry: boolean;       // canonicalId ∈ MAP_MONUMENTS
  needsOwnerReview: boolean;
  reason: string;
}

export function classifyMonument(rawName: string): MonumentClassification;
```

**Match-Reihenfolge (spezifisch → generisch, erster Treffer gewinnt):**

1. **Cave-Pattern** — `/^cave (small|medium|large)( sewers)? (easy|medium|hard)$/` → `category:'cave'`, `canonicalId:'cave'`, `variant = size + (sewers?'_sewers':'') + '_' + difficulty`, `confidence:'verified'`.
2. **Rock-Pattern** — endet auf `rock` → `category:'rock_formation'`, `canonicalId:'rock_formation'`, `variant`: `tiny god→tiny_god`, `anvil→anvil`, `medium god→medium_god`, `large god→large_god`, `3 wall→three_wall`, `confidence:'verified'` (offizielle „Revamped Rock Formations", World-2.0).
3. **Power-Substation** — `/^power substation (small|big)$/` → `infrastructure`, `canonicalId:'power_substation'`, `variant: small|big`.
4. **Tunnel-Entrance** — beginnt mit `tunnel entrance` → `infrastructure`, `canonicalId:'tunnel_entrance'`, `variant:'transition'` falls „transition".
5. **Terrain-Set** — `{lake, oasis, ice lake, iceberg}` (+ `powerline`→infrastructure) → `terrain`/`infrastructure`, `isHeatmapRelevant:true`, `isFilterable:false`.
6. **Alias-Tabelle (klassische Monumente)** — Longest-Alias-First-Lookup (nicht bloßes `includes`!), damit „large harbor" vor „harbor", „large oilrig" vor „oilrig", „large fishing village" vor „fishing village" greift. Liefert `canonicalId` + `category` aus der kuratierten Tabelle.
7. **Unknown-Fallback** — kein Treffer → `category:'unknown'`, `canonicalId:null`, `confidence:'uncertain'`, `needsOwnerReview:true`, `reason:'unmatched raw string'`. UI rendert neutral (s. §11a).

**Explizite Review-Overrides** (nie automatisch mappen): `apartments complex`, `ruin`, `ziggurat`, `radtown`, `warehouse`, `military base` → in einer `REVIEW_OVERRIDES`-Map mit vordefiniertem `confidence`/`reason`, damit sie nicht fälschlich in Schritt 6 an einen falschen Alias andocken (z. B. „radtown" darf **nicht** an supermarket/gas station).

### 11a. Render-Regeln (Akzeptanzkriterium „nichts crasht")

- **bekannt + `hasMapIntelEntry`** → Chip klickbar → Map-Intel-Detail.
- **bekannt, aber (noch) kein reicher Eintrag** (z. B. Trainyard, Cave, Substation) → Chip zeigt Kategorie-Badge + generischer Kategorie-Text („Cave · Large · Sewers · Hard"), kein Crash, „Detail folgt".
- **unknown** → neutraler „Unclassified"-Chip/Karte (grau, kein Link, Tooltip „nicht klassifiziert"). Optional intern geloggt für späteren Review-Sammler.
- **Nie** auf `canonicalId === null` dereferenzieren; `hasMapIntelEntry` immer aus einer Set-Lookup ableiten.

### 11b. Cave-/Rock-Datenmodell-Zusatz

Caves/Rocks brauchen **keinen** 8-Feld-Loot-Eintrag pro Variante. Vorschlag: **ein** Bibliotheks-Eintrag pro `canonicalId` (`cave`, `rock_formation`) mit generischem Text + einer `variants`-Map für kurze Zusatzinfos:

```ts
interface VariantInfo { label: string; note?: string; difficulty?: 'easy'|'medium'|'hard'; }
// cave.variants['large_sewers_hard'] = { label:'Large Sewers (Hard)', difficulty:'hard', note:'…' }
```

So bleibt die Variante erhalten (Akzeptanzkriterium), ohne 8 Cave-Karten pflegen zu müssen.

---

## 12. Aktualisierung offener Punkte (durch das Sample)

| §7-Punkt | Status nach Sample |
|---|---|
| #1 echte Strings ziehen | **teilweise erfüllt** — dieses Sample ist der erste echte Datensatz; weiteres Sampling über mehr Server empfohlen, um Long-Tail (Custom-Maps) zu finden. |
| #4 Harbor Groß/Klein | **gelöst → splitten** (`harbor_large`, `harbor_small`). |
| #2 „Lager" | Owner-Begriff bleibt offen; im Sample kein „Lager", aber „Warehouse" vorhanden → wahrscheinlich gemeint. Weiter `needsOwnerReview`. |
| #3 Warehouse | **bestätigt als realer String** → `confidence: likely`, Review ob eigenständig. |
| **NEU** Radtown | **Gelöst → `verified`.** Radtown-Rework (World-2-Update, Okt 2024): Recycler, Crates, Radioactive Water, kein NPC/Puzzle. `canonicalId: radtown`, category `tier_2`. |
| **NEU** Apartments Complex | **Gelöst → `verified`.** Neues Safe-Zone-City-Block-Monument (Mieträume/Shops/Zug/Turrets). `apartments_complex`, `safe_zone`. |
| **NEU** Ziggurat / Ruin | **Gelöst → `verified`.** = Jungle Ziggurat & Jungle Ruins (Jungle-Update 2025-05-02). `jungle_ziggurat` / `jungle_ruins`. |
| **NEU** Rock-Formations & Substations | Neuer Scope: eigene Kategorien `rock_formation` (offizielle „Revamped Rock Formations", World-2.0) / `infrastructure`, primär **Heatmap-/Base-Spot-relevant**, nicht Loot. |
| **offen** Warehouse / Military Base | Bleiben `likely` → Owner-Review: Warehouse eigenständig? Military Base = Abandoned/Desert vs. Custom? |

**Empfohlener nächster read-only Schritt (separater Auftrag):** `monument_names` über **mehrere** Server aus `server_map_identity` aggregieren und `classifyMonument()` (als reines Analyse-Skript, kein Produktcode) gegenlaufen lassen → Liste aller `unknown`-Strings für gezielten Owner-Review. Damit wird die Alias-Tabelle empirisch statt vermutet.

