# Phase 2.2-A — RustMasterTool Mobile UX & Navigation Redesign Plan

> Design-/Architektur-Sprint. Kein Code, kein Commit, kein Deploy, kein DB-Push, keine Auth-/API-Änderung.
> Dieses Dokument ist die Grundlage für die Implementierungsphasen 2.2-B … 2.2-G.

---

## 1. Executive Summary

### Warum der aktuelle Mobile-Ansatz scheitert
Die App hat **kein Mobile-Konzept** — nur ein Desktop-Layout mit CSS-Patches:
- Es existieren nur `AppShell`, `Sidebar`, `Topbar` (Desktop) und ein globales `index.css`. **Keine** Mobile-Komponenten.
- Die `Sidebar` rendert **~13 Nav-Items in 5 Gruppen** (Command Center / Pre-Game / In-Game / After-Game / Account). Auf einem 390px-Screen ist das eine full-height Wand statt Navigation → „Sidebar frisst den Screen, Content rechts abgeschnitten".
- Viele Items sind `gated/soon/roadmap/partial/alpha` → auf Mobile wirken sie wie **kaputte Buttons**, nicht wie ehrliche Roadmap.
- Feature-Views sind Desktop-Cards/-Grids (`Dashboard`, `ServersExplorer`, `ServerDetailPanel` als Side-Panel, `ServerPulseView`, `BaseBlueprintsView`) → auf Mobile bricht Text hässlich um, Tabellen quetschen, horizontaler Overflow.
- Doppelte Sign-in/Anonymous-CTAs, überladenes Menü, kein Gaming-Feeling.

**Kernproblem:** Navigation und Screens sind für „Maus + 1400px" gebaut. Mobile braucht ein **eigenes Informations- und Navigationsmodell**, keine responsive Sidebar.

### Neue Mobile-UX-Strategie
1. **Mobile-first App-Shell mit Bottom-Tab-Navigation** (5 Tabs) statt Sidebar. Sidebar existiert nur noch ≥ Desktop-Breakpoint.
2. **Radikale IA-Verdichtung:** 13 Items → **5 Primär-Tabs + „More"-Sheet + Account-Sheet**. Gated/Roadmap wird **ehrlich gebündelt**, nie als toter Button in der Primärnavigation.
3. **Content-first Gaming-Look:** OLED-schwarz, Rust/Amber-Akzente, große Touch-Zonen, swipebare Rails, **Bottom-Sheets & Fullscreen-Detail** statt Desktop-Side-Panels.
4. **Kontextuelle statt globaler Features:** Map Intel und Filter Profiles verschwinden aus dem Hauptmenü und leben dort, wo sie hingehören (Server-Detail bzw. Server-Suche).
5. **Neuer „Learn"-Hub** (Netflix-Feel) bündelt Base Blueprints + Rust Tutorial als swipebare Content-Rails.
6. **Kein globaler horizontaler Overflow** als hartes Akzeptanzkriterium.

---

## 2. Mobile Information Architecture

### Primary Navigation — Bottom Tab Bar (max. 5, immer sichtbar)
| Tab | Icon | Zweck | Login nötig? |
|---|---|---|---|
| **Home** | Layout/Grid | Command Center: Steam-/Active-Server-Kontext, schnelle Einstiege, Watchlist-Rail | nein (anonym = Browse-Fokus) |
| **Servers** | Server | Kernfeature: Explorer + Suche + Filter + Detail | nein |
| **Pulse** | LineChart | Server-Pulse-Analytics (Population/Trends) | nein (öffentliche Serverdaten) |
| **Learn** | BookOpen | Content-Hub: Rust Guides/Tutorials + Base Designs (Netflix-Rails) | nein |
| **More** | Menu/Grid | Sheet: Account/MyRust, Watchlist-Shortcut, Roadmap-Features, Settings | teils |

**Begründung der 5 Tabs:** Alle fünf sind für **anonyme wie eingeloggte** Nutzer sofort wertvoll (keine leeren, login-gesperrten Primärtabs). Watchlist ist login-gated → **nicht** in die Bottom-Nav (sonst leerer CTA-Tab für Anonyme), sondern als Home-Rail + Account. Server-Detail/Map ist kein Tab, sondern ein **Sheet/Fullscreen über Servers**.

### Secondary Navigation — „More"-Sheet
Öffnet als Bottom-Sheet (kein Vollbild-Drawer):
- **Account**: MyRust (Profil-Hero), Watchlist, Settings.
- **Coming Soon / Roadmap** (ehrlich, klar als locked): Current Connection / Live Companion, Live Map, Raid Calculator, Session Battle Log, Filter Profiles (falls nicht in Suche), Map Intel (falls als Browse gewünscht).
- **App**: Version, Statusseite, „About".

### Hidden / Roadmap / Gated
- **Map Intel** → **kein** Menüpunkt. Kontextuell im Server-Detail (Map-Tab). Optionaler späterer „Maps"-Browse nur, wenn echter Seed-Explorer existiert.
- **Filter Profiles** → **kein** Menüpunkt. Wird „Saved Filters" **innerhalb** der Server-Suche. Hidden bis funktional.
- **Live Map / Raid Calculator / Session Battle Log / Current Connection (Live-Teil)** → Roadmap-Sektion im „More"-Sheet, als `RoadmapLockCard`, nie als Bottom-Tab.
- **Settings** → Account-Sektion; nur echte Settings zeigen, Rest als Roadmap.

---

## 3. Desktop Navigation Cleanup

Die Desktop-Sidebar bleibt, wird aber **entschlackt und einklappbar**:
- **Einklappbar** (Icon-Rail ↔ Full) mit Persistenz — mehr Platz für datenreiche Views.
- **Gated-Bündelung:** Roadmap/gated Items (Live Map, Raid Calculator, Session Battle Log, Filter Profiles, Map Intel) nicht mehr als gleichwertige Zeilen zwischen Live-Features, sondern in eine **eigene, dezent gedimmte „Roadmap"-Gruppe am Ende** — visuell klar sekundär.
- **Kontextuelles rausnehmen:** „Map Intel" und „Filter Profiles" aus der Sidebar entfernen (leben in Server-Detail bzw. Suche).
- **Umbenennen/Gruppieren** analog Mobile (siehe §8): Command Center → Home; „In-Game • Live Companion" behalten; Base Blueprints + Rust Tutorial in eine **„Learn"-Gruppe**.
- **Aktive vs. Roadmap** farblich trennen: Live = volle Akzentfarbe, Roadmap = gedimmt + Lock-Icon (kein Klick-„Nichts").

Zielbild Desktop-Sidebar:
```
◈ Home
PLAY
  Servers        Watchlist        Pulse
LEARN
  Rust Guides    Base Designs
LIVE COMPANION (gated group)
  Active Server  Live Map°  Raid Calc°
ACCOUNT
  MyRust   Settings
ROADMAP° (gedimmt)   Session Log°  Saved Filters°  Map Intel(→Detail)
```

---

## 4. Navigation Recommendation (klare Entscheidung)

**Mobile Bottom Nav (final):** `Home` · `Servers` · `Pulse` · `Learn` · `More`

**More-Sheet Punkte:**
- Account: **MyRust**, **Watchlist**, **Settings**
- Roadmap (locked, ehrlich): **Live Companion / Current Connection**, **Live Map**, **Raid Calculator**, **Session Battle Log**
- (Filter Profiles → in Servers; Map Intel → in Server Detail)

**Account/MyRust:** erreichbar über (a) Top-Bar-Avatar rechts, (b) More-Sheet → Account. MyRust = Gamer-Profil-Hero (Persona/Avatar/SteamID + gated Stats-Slots).

**Roadmap/Gated Umgang:** ausschließlich als `RoadmapLockCard` mit Lock-Icon + ehrlicher Copy („Coming soon" / „Requires Rust+ pairing"). **Nie** in Primär-Tabs, **nie** als klickbarer Button ohne Ziel.

**Entfernt/verschoben/umbenannt (Kurzliste):**
- ENTFERNT aus Hauptnav: Map Intel (→ Server Detail), Filter Profiles (→ Server Suche).
- VERSCHOBEN in „More/Roadmap": Live Map, Raid Calculator, Session Battle Log, Current-Connection-Live-Teil.
- VERSCHOBEN in „Learn": Base Blueprints (→ „Base Designs"), Rust Tutorial (→ „Rust Guides").
- ZUSAMMENGELEGT: Dashboard = „Home" (Command Center); Active Server auf Home statt eigener Menüpunkt.

---

## 5. Screen-by-Screen Mobile UX

### 5.1 Home (Command Center)
- **Ziel:** Sofort-Orientierung „wer bin ich / was ist mein Server / was tun".
- **Sofort sichtbar:** kompakter Identity-Streifen (Avatar/Persona **oder** „Browse as guest — Sign in to save"), **Active-Server-Hero-Card** (echte Live-Daten: Pop/Queue/Wipe-Alter/Region) **oder** CTA „Choose your server", 3 große Einstieg-Cards (Play / Learn / Live°), **Watchlist-Rail** (horizontal, Mini-Server-Cards).
- **In Sheets/Accordions:** Detail je Card via Tap → jeweiliger Screen/Sheet.
- **Desktop→Mobile ersetzt:** Kachel-Grid → vertikaler Scroll mit einer Hero-Card + horizontalen Rails.
- **Interaktion:** Tap Active-Server-Hero → `ServerDetailSheet`; Swipe Watchlist-Rail; Tap Identity → MyRust.

### 5.2 Server Explorer (Servers)
- **Ziel:** Kernfeature — Server finden/filtern/öffnen.
- **Sofort sichtbar:** Sticky Search + **Segment-Tabs** (Official/Community/Modded), **Filter-Chip-Row** (Region, Pop, Wipe-Alter, Size, Tags), Liste von **`ServerCardMobile`**.
- **In Sheets:** „Filters" öffnet **Filter-Bottom-Sheet** (inkl. „Saved Filters" = ex-Filter-Profiles); Sort in kleinem Sheet.
- **Desktop→Mobile ersetzt:** breite Multi-Spalten-Tabelle/Grid → **einspaltige Touch-Cards** mit Kern-Signalen; kein horizontales Scrollen der Datenzeilen.
- **Interaktion:** Tap Card → `ServerDetailSheet` (Fullscreen); Long-press/Swipe → Quick-Actions (Watchlist ★, Set Active); Infinite Scroll (page_size=100 → clientseitig chunked rendern).

### 5.3 Server Detail
- **Ziel:** Alles zu einem Server, mobil erfassbar.
- **Sofort sichtbar (Sheet-Header):** Name + Status-Dot, Pop/Queue, **Wipe-Alter prominent**, Region, Quick-Actions (★ Watchlist, ⚑ Set Active, Share).
- **Als Tabs im Sheet:** `Overview` (Stats) · `Map` (Preview + Intel) · `Pulse` (Trend dieses Servers) · `Info`. Kein Info-Dump; scannbare Stat-Rows.
- **Desktop→Mobile ersetzt:** rechtes `ServerDetailPanel` → **Fullscreen `ServerDetailSheet`** (von unten, mit Grabber, swipe-to-dismiss).
- **Interaktion:** Tab-Swipe; Map-Tap → Fullscreen-Map-Viewer.

### 5.4 Map Preview
- **Ziel:** Map/Seed visuell + Kontext (Monumente, später Heatmap/Buildspots).
- **Sofort sichtbar:** großes Map-Bild in **16:9/quadratischer `MapPreviewMobileCard`** (im Map-Tab), Seed/Size-Chips, Monument-Count.
- **In Sheets/Accordions:** Tap → **Fullscreen-Map** mit Pinch-Zoom/Pan; Monument-Liste als Bottom-Accordion; „Map Intel" (Heatmap/Buildspots) als gated Overlay-Toggle.
- **Desktop→Mobile ersetzt:** kleines eingebettetes Preview → tap-to-fullscreen mit Gesten; kein winziges Bild neben Text.
- **Interaktion:** Pinch/Pan, Overlay-Toggles, Monument-Tap → Info-Chip.

### 5.5 Watchlist
- **Ziel:** Gespeicherte Server schnell prüfen (login-gated).
- **Sofort sichtbar:** eingeloggt → Liste `ServerCardMobile` mit Live-Mini-Status; anonym → **eine** klare CTA „Sign in with Steam to save servers" (nicht doppelt).
- **Interaktion:** Swipe-to-remove, Tap → Detail-Sheet, Pull-to-refresh.
- **Desktop→Mobile ersetzt:** Grid → einspaltige Cards + Swipe-Actions.

### 5.6 Server Pulse
- **Ziel:** Population/Trend-Analytics — datenreich, aber **nicht** wie Admin-Backend.
- **Sofort sichtbar:** oben Selector (Global / mein Active Server / ein gewählter Server), **`PulseMetricCards`** (Big-Number-Readouts: Online now, 24h-Peak, Trend ▲▼), darunter **eine** große Sparkline/Area-Chart (mobile-optimiert, wenige Achsen).
- **In Sheets:** Zeitraum-Auswahl (24h/7d/Wipe) als Segment; Server-Auswahl als Sheet.
- **Desktop→Mobile ersetzt:** dichte Multi-Chart-Dashboards → **1 Chart + Stat-Cards**, vertikal gestapelt. Cron/Admin-Anmutung vermeiden: Sprache „Pulse/Live activity", keine Job-/Backend-Begriffe.
- **Interaktion:** Chart-Scrub (Tap-Hold), Segment-Swipe.

### 5.7 Base Blueprints → „Base Designs" (in Learn)
- **Ziel:** Base-Designs browsen — **Netflix/Streaming-Feeling**.
- **Sofort sichtbar:** horizontale **`BlueprintRailMobile`**-Rails nach Kategorie (z. B. „Solo", „Clan", „Bunker", „Trio"), große Cover-Cards mit Bild + Tags (Cost/Rockets-to-raid/Difficulty).
- **In Sheets/Fullscreen:** Tap Card → Fullscreen-Blueprint-Detail (Bilder, Stats, Steps).
- **Desktop→Mobile ersetzt:** Grid/Table → **swipebare Rails** (Daumen-Navigation).
- **Interaktion:** horizontales Swipe je Rail, vertikales Scroll über Rails, Tap → Detail.

### 5.8 Rust Tutorial / Learn → „Rust Guides" (in Learn)
- **Ziel:** neuer Content-Hub, Einsteiger→Fortgeschritten, gaming-like.
- **Sofort sichtbar:** „Learn"-Tab öffnet Hub mit Rails: **Rust Guides** (Tutorials), **Base Designs** (Blueprints), später **Video Guides** (YouTube-Embeds/Links, kuratiert). Cards mit Thumbnail, Titel, Dauer/Level.
- **In Sheets/Fullscreen:** Guide-Detail als Fullscreen-Reader (Text/Steps/Video).
- **Desktop→Mobile ersetzt:** neue Struktur, keine Desktop-Altlast.
- **Interaktion:** Rail-Swipe, Tap → `LearnCard`-Detail; Kategorien als Chips.

### 5.9 MyRust
- **Ziel:** Gamer-/Rust-Profil, kein Corporate-Profil.
- **Sofort sichtbar:** **Hero-Banner** (großer Avatar, Persona als Handle, SteamID/Link dezent), Live-Identitätsdaten (aus Steam-Login).
- **In Sheets/Accordions:** Stat-Readout-Grid (Playtime, 2-Wochen, Achievements) als **gated „Requires Steam sync"**-Slots + „Hidden by Steam privacy" ehrlich; **keine** Fake-Zahlen.
- **Desktop→Mobile ersetzt:** Profil-Karte → Fullscreen-Hero + Badge-Grid.
- **Interaktion:** Sign out, Tap gated Stat → ehrliche Erklärung.

### 5.10 Settings
- **Ziel:** minimal echt.
- **Sofort sichtbar:** Account (Sign out), Active Server, Theme/Data-Status, App-Version.
- **Rest:** Roadmap-Settings als gedimmte, deaktivierte Rows mit „coming".
- **Desktop→Mobile ersetzt:** Settings-Grid → einfache Listen-Rows/Toggles.

### 5.11 Roadmap / Gated Views (Live Map, Raid Calc, Session Log, Live Companion)
- **Ziel:** ehrlich zeigen, was kommt — kein Fake, kein toter Button.
- **Sofort sichtbar:** `RoadmapLockCard` — Icon, Feature-Name, 1-Satz-Nutzen, Lock-Badge, ggf. „Requires Rust+ pairing". Optional „Notify me"/„Vote" später.
- **Interaktion:** rein informativ; kein Scheinfeature.

---

## 6. Component Strategy

Neue Mobile-Komponenten unter `apps/web/src/components/mobile/` (Desktop bleibt unangetastet):

| Komponente | Zweck |
|---|---|
| `MobileAppShell` | Layout-Root < Breakpoint: Top-Bar + Content + Bottom-Nav; safe-area-insets; verhindert globalen Overflow. |
| `MobileBottomNav` | 5 Tabs, aktiver State, große Touch-Targets (≥48px), Amber-Akzent. |
| `MobileTopBar` | kompakt: Logo/Back links, Kontext-Titel Mitte, Avatar/Actions rechts. |
| `MobileMoreSheet` | Bottom-Sheet für Account + Roadmap. |
| `BottomSheet` | Primitive (Grabber, snap-points, swipe-to-dismiss, scrim). |
| `ServerCardMobile` | einspaltige Touch-Server-Card mit Kern-Signalen + Quick-Actions. |
| `ServerDetailSheet` | Fullscreen-Detail (Tabs Overview/Map/Pulse/Info). |
| `MapPreviewMobileCard` | Map-Preview-Card + Tap-to-Fullscreen-Viewer (Pinch/Pan). |
| `PulseMetricCards` | Big-Number Stat-Cards + eine mobile Chart-Komponente. |
| `BlueprintRailMobile` | horizontale Cover-Rail (Netflix-Feel). |
| `TutorialRail` / `LearnCard` | Learn-Hub-Rails + Guide-Detail-Reader. |
| `RoadmapLockCard` | ehrliche gated/roadmap Darstellung. |

**Shell-Strategie:** `AppShell.tsx` wird **responsive Switch**: ≥ `lg` → bestehendes Sidebar-Layout; < `lg` → `MobileAppShell`. Der bestehende `ViewState`-Router wird für beide genutzt (kein Router-Umbau nötig). Feature-Views erhalten **mobile-spezifische Render-Pfade/Komponenten**, keine gequetschten Desktop-Cards.

---

## 7. Visual Design Direction

- **Farben:** OLED-Schwarz Base (`#0A0A0B`), Panel `#121214`, Border `#1F1F23`; Akzent **Rust/Orange** (bestehendes `--accent-rust`), Sekundär-Amber; Status: online `#3FB950`, warn Amber, danger `#F04438`; Gunmetal/Steel für neutrale Chips.
- **Typography:** Sans für UI, **condensed/mono für Datenreadouts** (Zahlen, Pop, Wipe-Timer). Große, fette Big-Numbers.
- **Spacing:** 4/8px-Grid, großzügige Touch-Paddings, min. 48px Touch-Targets, safe-area-insets (Notch/Home-Indicator).
- **Card shapes:** 12–16px Radius, 1px Border + subtiler innerer Glow/Top-Highlight; „gehärtete", taktische Kanten statt weicher Corporate-Cards.
- **Shadows/glows:** dezente Akzent-Glows nur auf aktiven/primary Elementen (Active Server, Primary-CTA), sonst flach.
- **Button-Hierarchie:** Primary (rust-fill), Secondary (outline/steel), Ghost (text), Disabled/Roadmap (gedimmt + Lock). Nie zwei konkurrierende Primary-CTAs pro View.
- **Icon-Language:** lucide durchgängig; später kuratierte Rust-Item-Icons (Raid Calc) nur mit geklärter Lizenz.
- **Gamer-Feel ohne Kindisch:** Kontrast, Präzision, „Command-Center"-Anmutung; keine Neon-Spielereien, keine verspielten Illustrationen.

---

## 8. UX Copy / Labels

| Aktuell | Empfohlen | Grund |
|---|---|---|
| Map Intel (Menü) | *(kein Menü)* → im Detail: **„Map"** / „Map Analysis" | kontextuell, nicht global |
| Live Map | **„Live Companion Map"** (gated) | grenzt gegen statische Map ab; Rust+-abhängig |
| Base Blueprints | **„Base Designs"** (in Learn) | verständlicher, Content-Charakter |
| Filter Profiles | **„Saved Filters"** (in Servers) | Feature der Suche, kein Menü |
| Rust Tutorial | **„Rust Guides"** / Hub **„Learn"** | eigener Content-Hub |
| Current Connection | **„Active Server"** (live) / **„Live Companion"** (gated) | trennt real vs. gated |
| Server Pulse | **„Pulse"** | knapp, gaming |
| Dashboard | **„Home"** | mobil klarer |

**Microcopy für nicht eingeloggte Nutzer (eine, nicht doppelt):**
- Global/Home: „**Browsing works without Steam.** Sign in to save watchlists, active servers & MyRust."
- Watchlist (leer, anonym): „Sign in with Steam to save servers." (einzelner CTA)
- MyRust (anonym): „Sign in with Steam to see your Rust profile."

---

## 9. Implementation Plan (Phasen)

### Phase 2.2-B — Mobile Shell + Navigation Rebuild
- **Dateien/Komponenten (vermutet):** neu `components/mobile/MobileAppShell.tsx`, `MobileBottomNav.tsx`, `MobileTopBar.tsx`, `MobileMoreSheet.tsx`, `BottomSheet.tsx`; `AppShell.tsx` responsive Switch; `index.css` Mobile-Layer + globaler `overflow-x:hidden`-Guard.
- **Risiko:** mittel — berührt Root-Layout; Gefahr, `ViewState`-Routing/Steam-Callback-Route zu stören.
- **Tests:** kein globaler H-Overflow (390/430); alle 13 Views weiter erreichbar (Tabs+More); Steam-Login/Logout intakt; Desktop-Layout unverändert ≥ lg.
- **Nicht anfassen:** Auth-Logik, Supabase-Queries, `ViewState`-Werte/Namen, Steam-Callback, Cron/Functions.

### Phase 2.2-C — Dashboard + Server Explorer Mobile Redesign
- **Dateien:** `features/dashboard/Dashboard.tsx` (mobile render path / neue `HomeMobile`), `ServersExplorer.tsx`, neu `ServerCardMobile.tsx`, Filter-Bottom-Sheet.
- **Risiko:** mittel — Explorer ist Kernfeature; Suche/Filter/page_size-Verhalten nicht brechen.
- **Tests:** Suche/Filter/Tabs funktionieren mobil; keine Tabellen-Quetschung; Tap→Detail; anonymer Browse ok; Watchlist-Rail nur eingeloggt gefüllt.
- **Nicht anfassen:** Server-Fetch-Logik/page_size, Supabase-Reads, Active-Server-Persistenz.

### Phase 2.2-D — Server Detail + Map Preview Mobile Redesign
- **Dateien:** `ServerDetailPanel.tsx` → mobile `ServerDetailSheet.tsx`, neu `MapPreviewMobileCard.tsx` + Fullscreen-Map-Viewer.
- **Risiko:** mittel — Map-Preview-Pipeline/Bild-URLs vorhanden, nur Darstellung ändern.
- **Tests:** Sheet öffnet/schließt (swipe), Tabs, Map Pinch/Pan, ★/⚑-Actions funktionieren; kein Overflow.
- **Nicht anfassen:** Map-Identity-Pipeline, Bildquellen, Watchlist/Active-Server-API.

### Phase 2.2-E — Base Designs + Rust Guides (Learn) Mobile Experience
- **Dateien:** `BaseBlueprintsView.tsx` → `BlueprintRailMobile`, neu `features/learn/LearnHub.tsx`, `TutorialRail.tsx`, `LearnCard.tsx`.
- **Risiko:** niedrig–mittel — größtenteils neue Content-UI; Rust-Guides-Inhalte kuratieren (kein Fake).
- **Tests:** Rails swipebar, Cover-Cards, Detail-Reader; keine leeren Fake-Rails (nur echte Inhalte/„coming").
- **Nicht anfassen:** evtl. bestehende Blueprint-Datenquelle; keine neuen Secrets.

### Phase 2.2-F — Server Pulse Mobile Analytics Cards
- **Dateien:** `ServerPulseView.tsx` → `PulseMetricCards` + mobile Chart.
- **Risiko:** mittel — Chart-Rendering mobil; Cron/Backend nicht wie Admin wirken lassen.
- **Tests:** Stat-Cards + 1 Chart lesbar auf 390px; Zeitraum/Server-Selector; keine Backend-/Job-Sprache; kein Overflow.
- **Nicht anfassen:** Server-Pulse-Cron, Datenaggregation, DB.

### Phase 2.2-G — Desktop Sidebar Cleanup + Polish
- **Dateien:** `Sidebar.tsx` (einklappbar, Gruppen, Roadmap-Bündel, Rename), `RoadmapView.tsx`/`GatedNotice.tsx` Konsolidierung.
- **Risiko:** niedrig.
- **Tests:** Sidebar collapse/expand persistiert; Live vs. Roadmap klar getrennt; alle Views erreichbar; keine Regression Mobile.
- **Nicht anfassen:** `ViewState`-Keys, Feature-Logik.

---

## 10. Non-Goals
- Kein Auth-Fix / keine Auth-Änderung, kein Steam-Flow-Umbau.
- Kein DB-Fix, kein DB-Push, keine Migration.
- Kein Cron-/Server-Pulse-Backend-Eingriff.
- Kein Supabase-Function-Deploy.
- Kein Map-Parser, keine RustMaps-API-Integration.
- Keine native Mobile-App (reine responsive Web-/PWA-Ebene).
- Keine neuen Secrets, keine API-Logik-Änderung.

---

## 11. Acceptance Criteria
- **Viewports:** sauber auf **390×844**, **430×932**, Tablet, Desktop.
- **Kein globaler horizontaler Overflow** auf irgendeiner Seite (harte Bedingung).
- Alle Kernfeatures mobil bedienbar: Server browsen (anonym), Detail+Map öffnen, Pulse ansehen, Watchlist (eingeloggt), Learn/Base Designs, MyRust.
- Bottom-Nav immer erreichbar; Detail als Sheet/Fullscreen; keine gequetschten Tabellen; keine kaputten Button-Umbrüche.
- Gated/Roadmap ehrlich als locked, nie als toter Button; **eine** Sign-in-CTA, nicht doppelt.
- Sichtbar hochwertig/gaming-like (OLED-dark, Rust/Amber, große Touch-Zonen, Rails/Cards).
- Steam-Login/Logout, Active Server, Watchlist, Server-Fetch unverändert funktional; Desktop-Layout intakt.

---

## 12. Final Recommendation

- **Verwerfen oder refactoren?** Die aktuellen **CSS-Responsive-Patches verwerfen**, die **Feature-/Datenlogik behalten**. Es ist ein **Mobile-Rebuild der Präsentations-/Navigationsschicht**, kein Rewrite der App. Bestehende Views bekommen mobile Render-Pfade/Komponenten; Desktop bleibt.
- **Neuer Branch:** Ja — `feature/phase-2-2-b-mobile-shell-nav` von `main`. Jede Phase (B–G) als eigener, review-barer Branch/PR mit Owner-Smoke; kein Merge ohne Owner-Smoke.
- **Konkrete nächste Phase für Gemini:** **Phase 2.2-B — Mobile Shell + Bottom-Nav** (responsive `AppShell`-Switch, `MobileAppShell`/`MobileBottomNav`/`MobileTopBar`/`MobileMoreSheet`/`BottomSheet`, globaler Overflow-Guard, IA-Verdichtung auf 5 Tabs + More). Das ist das Fundament, auf dem C–F aufsetzen — höchster Hebel, klar abgegrenzt, ohne Auth/DB/Cron-Risiko.

---

## Abschlussbericht

**Wichtigste UX-Entscheidungen:**
1. **Bottom-Tab-Navigation (Home · Servers · Pulse · Learn · More)** ersetzt die Desktop-Sidebar auf Mobile; Sidebar nur noch Desktop (einklappbar, entschlackt).
2. **IA-Verdichtung 13 → 5+More:** gated/roadmap ehrlich gebündelt, nie als toter Primär-Button.
3. **Kontextualisierung:** Map Intel → Server-Detail; Filter Profiles → „Saved Filters" in der Suche (beide raus aus dem Hauptmenü).
4. **Neuer „Learn"-Hub** (Netflix-Rails) bündelt **Base Designs** + **Rust Guides**.
5. **Sheets/Fullscreen statt Side-Panels:** `ServerDetailSheet`, Fullscreen-Map, swipebare Rails; **kein globaler H-Overflow**.
6. **Eine** Sign-in-CTA; anonymer Browse als Erstklasse-Erlebnis.

**Empfohlene neue Mobile-Navigation:** `Home · Servers · Pulse · Learn · More` + More-Sheet (Account/MyRust/Watchlist/Settings + Roadmap-Sektion).

**Entfernt/verschoben/umbenannt:**
- Entfernt aus Hauptnav: **Map Intel** (→ Detail), **Filter Profiles** (→ Suche „Saved Filters").
- Verschoben → More/Roadmap: **Live Map, Raid Calculator, Session Battle Log, Current-Connection-Live**.
- Verschoben → Learn: **Base Blueprints („Base Designs"), Rust Tutorial („Rust Guides")**.
- Umbenannt: Dashboard→**Home**, Server Pulse→**Pulse**, Current Connection→**Active Server/Live Companion**.

**Empfohlene erste Implementierungsphase:** **Phase 2.2-B — Mobile Shell + Bottom-Nav Rebuild** (neuer Branch `feature/phase-2-2-b-mobile-shell-nav`, Owner-Smoke vor Merge).

---

# Addendum — Phase 2.2-B-FIX-1 (Owner-Feedback)

## 1. Bottom-Nav Korrektur: `Pulse` → `Live`
Owner-Feedback: **Pulse ist kein starkes Primär-Feature** — es visualisiert primär das Cron/Analytics-System. Langfristig sollen Pulse-Daten (Mini-Trend, Death/Decay-Kurve, Retention, Wipe-Health) **in Server-Karten und Server-Detail** einfließen, nicht als eigener Haupt-Tab.
- **Neue Bottom-Nav:** `Home · Servers · Live · Learn · More`.
- **Live-Tab** = Live Companion / Active-Server-Tracking-Foundation. Kein Active Server → ehrlicher Empty State „Choose an active server to start live tracking."; Active Server gesetzt → kompakte „tracking prepared"-Foundation (read-only, kein Fake-Live-Feed, keine neue Backend-Logik). Mappt auf den bestehenden `current_connection`-View (mobil = `MobileLive`, Desktop unverändert = RoadmapView).
- **Pulse bleibt erreichbar** über **More → Tools → „Server Pulse"** (sekundär, nicht gated). Perspektivisch zusätzlich kontextuell in Server-Detail/-Karten.
- Keine Cron-/Pulse-Datenlogik geändert — nur Navigation/Priorisierung.

## 2. Home-Hierarchie
- Phase-Cards jetzt **vertikal gestapelt** (full-width), kein horizontales Swipen mehr auf Home → natürliches Runterscrollen, kein abgeschnittener Card-Rand.
- **In-Game-Card** verkauft kein fettes „soon" mehr, sondern führt in die **Live-Track-Foundation** (ehrlicher Empty State). **After-Game** bleibt ehrlich „soon" (RoadmapView).
- Primary-CTA bleibt „Explore Servers"; ein Login-Hinweis; kein doppelter Sign-in-CTA, kein Browse-Anonymously-Button.

## 3. ServerCardMobile — Feedback für Phase 2.2-C (dokumentiert, nicht in 2.2-B implementiert)
Rust-Spieler brauchen einen **Server-Browser-Look**, kein Admin-Monitoring. Redesign-Vorgaben für 2.2-C:
- **Compact Badges statt Buttons:** „Modded" → kleines **„M"-Eck-Badge**; Rank → kleine **„#123"-Zahl in einer Ecke** (kein großer Pill-Button).
- **„Pulse Collecting" entfernen/entdezenten** — keine relevante Spieler-Info auf der Card (höchstens ein winziger Health-Dot).
- **Sofort sichtbar (Priorität):** Servername · Spieler/Max/Queue · **Wipe-Alter / letzter Wipe** · Map-Type/Size/**Seed** (falls vorhanden) · Region · **IP/connect** · **Map-available-Indicator** · später Mini-Trend/Decay-Sparkline.
- **IP** korrekt sichtbar machen; **Seed** überhaupt anzeigen (fehlt aktuell).
- Quick-Actions (★/⚑) **nicht dominant**; sauberes Tap-Target; Card = Rust-Serverbrowser-Ästhetik.
- Neu-Komponente `ServerCardMobile` (+ Mini-Trend/Death-Curve) → **Phase 2.2-C**. Keine Server-Fetch-/Search-Logik in 2.2-B geändert.

## 4. Preview-Auth / ALLOWED_ORIGINS (Konfiguration, kein Code)
**Diagnose:** Der `403 Invalid origin` auf der Feature-Preview ist **kein DB-/Supabase-Client-Problem**. Die App ruft `steam-auth` korrekt auf, aber die **Preview-Origin steht nicht in `ALLOWED_ORIGINS`** der `steam-auth` Edge Function. → **Konfigurations-Fix im Supabase-Dashboard**, keine Codeänderung. (Kein steam-auth-Code angefasst, kein Deploy — Gate eingehalten.)

**Kurzfristige Owner-Action** (Owner kann den Wert nur **ersetzen**, daher der **vollständige** Zielwert; keine Leerzeichen, keine trailing slashes):
```
http://localhost:5173,http://localhost:5174,https://rustmastertool-web.vercel.app,https://rustmastertool-web-git-main-pascals-projects-8f00c30a.vercel.app,https://rustmastertool-web-git-feature-36abe6-pascals-projects-8f00c30a.vercel.app,https://rustmastertool-web-git-feature-12ebca-pascals-projects-8f00c30a.vercel.app
```

**Langfristige Empfehlung (project-scoped, keine offene Wildcard):**
Statt jede neue Vercel-Preview-URL manuell zu pflegen, sollte `steam-auth` Origins gegen ein **projekt-gebundenes Pattern** prüfen — **nicht** `*.vercel.app` (zu offen), sondern exakt auf dieses Vercel-Projekt gescoped:
```
rustmastertool-web-git-*-pascals-projects-8f00c30a.vercel.app
```
Sichere Umsetzung: `ALLOWED_ORIGINS` bleibt exakte Allowlist für stabile Domains (localhost, prod, main); zusätzlich ein **separates, projekt-gebundenes Regex/Suffix-Match** nur für Preview-Branches dieses Projekts (fixes Suffix `-pascals-projects-8f00c30a.vercel.app` + fixer Prefix `rustmastertool-web-git-`, nur der Branch-Slug variiert). So werden neue Feature-Branch-Previews automatisch akzeptiert, ohne fremde `vercel.app`-Domains zu erlauben.
**Wichtig:** Das erfordert eine **Codeänderung in `steam-auth`** → **STOP/Gate**: erst als eigene, reviewbare Phase umsetzen + deployen, **nicht** in 2.2-B. Für jetzt genügt der Dashboard-Wert oben.
