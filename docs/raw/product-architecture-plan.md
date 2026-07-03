# RustMasterTool – Vollständige Produkt- und Architekturplanung

**Version:** 1.0 (Planungsdokument)
**Status:** Entwurf zur Team-Review
**Zielgruppe des Dokuments:** Senior Developer / kleines Entwicklerteam, das direkt mit der Umsetzung beginnen soll

> **Lesehinweis:** Alles, was extern verifiziert werden muss, ist als **[Prüfpunkt]** markiert. Alles, was auf plausiblen, aber nicht garantierten Annahmen beruht, als **[Annahme]**. API-Details externer Anbieter sind bewusst als zu verifizierende Punkte formuliert, nicht als Fakten – Rate Limits, Terms und Endpunkt-Details ändern sich und müssen zu Projektstart gegen die offizielle Dokumentation geprüft werden.

---

## Inhaltsverzeichnis

1. Executive Summary
2. Produktvision
3. Zielgruppen
4. Kernnutzen / Value Proposition
5. Feature-Landkarte
6. Datenquellen-Analyse
7. BattleMetrics Integration
8. RustMaps Integration
9. Eigener Rust `.map` Parser
10. Rust+ Companion Integration
11. Discord Bot Architektur
12. Web Dashboard Architektur
13. Desktop App Architektur
14. Systemarchitektur
15. Empfohlener Tech Stack
16. Datenbankmodell
17. API Design
18. Realtime Design
19. Alert Engine
20. Map Intelligence
21. Threat / Death Intelligence
22. Smart Devices
23. Billing und Lizenzsystem
24. Datenschutz und Security
25. Rechtliche Risikomatrix
26. Entwicklungsphasen
27. Repository-Struktur
28. Testing-Strategie
29. Deployment & Betrieb
30. Konkrete erste Umsetzungsschritte
31. Schlussbemerkung & offene Entscheidungen

---

# 1. Executive Summary

**RustMasterTool** ist eine eigenständig entwickelte Companion-Plattform für das Survival-Spiel Rust (Facepunch Studios), bestehend aus vier Produktsäulen:

1. **Server Intelligence** – Suche, Beobachtung, Historisierung und Analyse von Rust-Servern auf Basis der BattleMetrics-API (Population, Queue, Wipes, Seed/Size, Performance-Indikatoren).
2. **Map Intelligence** – Map-Vorschau und Monument-Daten über RustMaps sowie – als technisches Alleinstellungsmerkmal – ein **eigener Parser für lokale Rust `.map`-Dateien**, der Monumente, Straßen, Schienen, Flüsse, Biome, Topologie und Prefabs extrahiert und daraus Analysen wie Base-Spot-Bewertungen, Routen und Heatmaps ableitet.
3. **Live Companion** – Anbindung an das offizielle Rust+ Companion-Protokoll (Pairing, Live-Map, Teampositionen, Vending Machines, Events wie Cargo/Heli/Locked Crate, Smart Devices, Teamchat) mit Weiterleitung in Discord, Web und Desktop.
4. **Distribution über drei Oberflächen** – Web-Dashboard (Verwaltung, Analyse, Billing), Discord Bot (Alerts, Kommandos, Team-Workflows) und Windows-Desktop-App (Second-Screen-HUD, lokaler Map-Parser, Live-Ansicht).

**Warum es wertvoll ist:** Rust-Spieler treffen vor und während eines Wipes viele Entscheidungen unter Zeitdruck: Welcher Server? Welche Map? Wo bauen? Wann spawnt Cargo? Wo gibt es das Item im Shop? Heute sind diese Informationen über mehrere Tools, Webseiten und die offizielle Rust+ App verstreut, die jeweils nur einen Ausschnitt liefern. RustMasterTool bündelt diese Datenquellen zu einem Workflow – vom Server-Scouting über die Map-Analyse bis zum laufenden Wipe mit Live-Alerts – und macht sie team- und Discord-fähig.

**Für wen:** Solo-Spieler, kleine Gruppen (Duo/Trio/Squad), große Clans, Discord-Communities, Content Creator sowie Server Owner/Admins, die ihre Community mit Live-Daten und Bots versorgen wollen.

**Abgrenzung zu bestehenden Tools (z. B. RustOnTop):** RustMasterTool ist **kein Klon**. Es teilt die Produktkategorie „Rust Companion Tool", wird aber mit eigener UI/UX, eigenen Texten, eigenem Naming, eigenen Assets und eigener technischer Architektur entwickelt. Die Differenzierung liegt in:

- **Tiefe der Map Intelligence** durch den eigenen `.map`-Parser (nicht nur Map-Bild anzeigen, sondern strukturelle Analyse: Routen, Topologie, Base-Spot-Rating, Heatmaps).
- **Team-/Clan-First-Design**: Seats, Rollen, geteilte Alerts, geteilte Server-Watchlists, Discord-native Workflows.
- **Historisierung**: Wipe-Archiv und Population-Historie als eigene Datenbasis, die mit der Zeit an Wert gewinnt und nicht trivial kopierbar ist.
- **Offenheit über drei Oberflächen** mit konsistentem Datenmodell (Web, Discord, Desktop greifen auf dieselbe API zu).

**Kompromisslose Leitplanken:** Kein Cheat, kein Memory-Reading, keine Injection, keine Interaktion mit dem Spielprozess, keine Umgehung von Anti-Cheat, keine Nutzung nicht-öffentlicher Spielerdaten. Ausschließlich öffentliche APIs, das offizielle Rust+ Protokoll mit Zustimmung des Nutzers und lokal auf der Festplatte liegende Dateien (rein lesend).

---

# 2. Produktvision

**Leitsatz:** *„Das Betriebssystem für deinen Rust-Wipe – von der Serverwahl bis zum letzten Raid, für dich und dein Team.“*

### Vision nach 6 Monaten (Public Beta → Paid Launch)

- Vollständige Server Intelligence: Suche, Favoriten, Population-Charts, Wipe-Erkennung, Wipe-Archiv, Wipe-Reminder.
- Map Intelligence v1: RustMaps-Integration (Map-Bild, Monumente, Seed/Size-Lookup) + erste Version des eigenen Parsers (Monumente, Roads/Rails/Rivers, 2D-Rendering).
- Discord Bot mit den Kern-Commands (`/server`, `/wipe`, `/map`, `/pop`, `/alerts`, `/bind`) und Alert-Zustellung.
- Rust+ Pairing mit Live-Team-Status, Live-Map-Markern, Event-Alerts (Cargo, Heli, Locked Crate), Vending-Suche.
- Web-Dashboard mit Account, Teams, Billing (Stripe), Alert-Konfiguration.
- Zahlende Kunden auf Free/Pro/Squad-Plänen; Discord Bot Premium als Add-on.

### Vision nach 12 Monaten (Full Product)

- Desktop-App (Windows) mit Second-Screen-HUD: Live-Map, Team, Events, Shop-Suche, lokalem Map-Parsing beim Map-Download.
- Advanced Map Intelligence: Base-Spot-Rating, Heatmaps, Routen-Analyse (Keycard-Runs), Wipe-Start-Empfehlungen.
- Smart-Device-Steuerung (Switches, Alarme, Storage Monitore) über Web, Discord und Desktop mit Rollen und Audit-Log.
- Clan-Funktionen: Seats, Rollen, geteilte Konfigurationen, Multi-Server-Watchlists, Clan-Dashboards.
- Server-Owner-Modul v1: eigener Server im Tool „verifizieren", Community-Widgets, Wipe-Ankündigungen an Discord.
- Stabiler Betrieb: Monitoring, SLOs, Statuspage, Self-Service-Support, sauberes Abuse-Handling.

### Vision nach 24 Monaten (Plattform)

- **Datengetriebene Alleinstellung:** 18+ Monate eigene Historie über tausende Server (Wipe-Muster, Population-Zyklen, Server-Zuverlässigkeit) → „Welcher Server passt zu mir?"-Empfehlungen, die kein neues Tool nachbauen kann.
- **Server-Owner-Suite:** Analytics für die eigene Community, Discord-Integrationen, Wipe-Automatisierungs-Hilfen (nur ankündigend/informierend, keine Servermanipulation), ggf. RCON-basierte Owner-Features **[Prüfpunkt: rechtlich/technisch sauber abgrenzen, eigene Phase]**.
- **Public API** für Drittentwickler (mit API-Keys, Limits, Billing) – RustMasterTool als Daten- und Alert-Backbone der Rust-Community.
- Mobile Begleit-Ansicht (PWA zuerst, native optional).
- Mehrsprachigkeit (EN zuerst, DE, RU, FR, PT-BR – gemessen an der Rust-Spielerschaft).

**Nicht-Ziele (dauerhaft):** ESP/Radar auf Basis nicht-legitimer Daten, Spielprozess-Interaktion, Aufkauf/Weiterverkauf von Spieler-Tracking-Daten, „Stat-Stalking" einzelner Spieler ohne legitime Datenbasis.

---

# 3. Zielgruppen

### 3.1 Solo-Spieler
- **Situation:** Wenig Zeit, spielt oft auf Low-Pop- oder Solo/Duo/Trio-Servern, Wipe-Tag ist kritisch.
- **Bedürfnisse:** Schnell einen passenden Server finden (Pop-Verlauf, Wipe-Zeitpunkt, Region, Ping-Nähe), Map vorab prüfen (anfängerfreundliche Spots, Nähe zu Outpost), Wipe-Reminder, einfache Rust+-Alerts (Raid-Alarm, wenn offline).
- **Zahlungsbereitschaft:** Niedrig bis mittel → Free-Tier muss echten Nutzen liefern; Pro Solo günstig halten.
- **Erfolgsmetrik:** Zeit von „Ich will spielen" bis „Ich stehe auf dem richtigen Server mit Plan" < 5 Minuten.

### 3.2 Duo/Trio/Squads (2–8 Spieler)
- **Situation:** Kern-Zielgruppe. Koordinieren sich über Discord, spielen mehrere Wipes pro Monat, teilen sich Aufgaben (Farmen, Bauen, PvP).
- **Bedürfnisse:** Gemeinsame Server-Watchlist, geteilte Map-Ansicht mit Team-Positionen, Event-Alerts in den Team-Discord-Channel, Vending-Suche („Wer verkauft Pipes?"), Smart Alarms → Discord, Wipe-Planung („Wo bauen wir?").
- **Zahlungsbereitschaft:** Mittel bis hoch, wenn der Preis pro Kopf gering wirkt → Squad-Plan mit Seats.
- **Erfolgsmetrik:** Anteil der Squads, die den Bot in ihrem Discord installiert lassen und > 3 Wipes aktiv bleiben.

### 3.3 Große Clans (10–100+ Mitglieder)
- **Bedürfnisse:** Rollen/Berechtigungen (wer darf Alerts konfigurieren, wer darf Smart Devices schalten), Multi-Server-Betrieb (Main + Battlefield + Aim-Server), mehrere Teams/„Rosters", Audit-Logs, Onboarding neuer Member über Discord, Zapfstellen-/Shop-Marktübersicht auf dem Server.
- **Zahlungsbereitschaft:** Hoch, aber preissensibel pro Seat; Entscheidungsträger ist der Clan-Lead.
- **Besonderheit:** Clans sind Multiplikatoren (ein Clan bringt 20+ Nutzer), aber auch Support-intensiv.

### 3.4 Server Owner
- **Bedürfnisse:** Eigenen Server prominent und korrekt dargestellt sehen, Population-Analytics, Wipe-Ankündigungen automatisiert in den Community-Discord, Widgets/Embeds für die eigene Website, ggf. verifizierte Owner-Badge. Später: tiefere Integration über eigene API-Keys **[Prüfpunkt: BattleMetrics-Owner-Scopes und RCON-Thematik in eigener Rechtsprüfung]**.
- **Zahlungsbereitschaft:** Hoch (Server-Hosting kostet ohnehin Geld, Marketing-Nutzen ist direkt messbar).
- **Risiko:** Erwartungshaltung Richtung Admin-Tools (Bans, RCON) – bewusst spät und sauber abgegrenzt einführen.

### 3.5 Discord Communities
- **Bedürfnisse:** Ein Bot, der den Community-Server aufwertet: Server-Status-Channel, Wipe-Countdowns, Event-Feeds, `/pop` für alle. Konfiguration durch Admins, Nutzung durch alle Mitglieder.
- **Monetarisierung:** Bot-Premium pro Guild (nicht pro Nutzer) – klassisches Discord-Bot-Modell.

### 3.6 Content Creator
- **Bedürfnisse:** Schöne, teilbare Ansichten (Map-Renders, Pop-Charts), OBS-taugliche Overlays (Desktop-App/Browser-Source), schnelle Recherche („Server mit 500 Pop und Wipe in 1h für Stream"), ggf. Creator-Programm (Rabatt gegen Nennung).
- **Nutzen für uns:** Reichweite. Creator-Features sind Marketing-Features.

### 3.7 Admins/Moderatoren (von Community-Discords und Servern)
- **Bedürfnisse:** Kontrolle: Wer darf welche Commands nutzen, in welchen Channels postet der Bot, Rate-Limits gegen Spam, Audit darüber, wer Alerts geändert hat.
- **Design-Konsequenz:** Permissions sind kein Nice-to-have, sondern Kernfunktionalität ab Bot v1.

---

# 4. Kernnutzen / Value Proposition

**Wofür Nutzer tatsächlich zahlen** (geordnet nach erwarteter Zahlungsbereitschaft, abgeleitet aus vergleichbaren Companion-Tool-Märkten – **[Annahme]**, im Beta-Zeitraum mit echten Conversion-Daten validieren):

| Rang | Nutzenversprechen | Warum zahlungsrelevant | Produktsäule |
|---|---|---|---|
| 1 | **Raid-/Alarm-Weiterleitung nach Discord & Push, auch offline** | Verlustaversion: Basis-Verlust ist der größte Schmerz in Rust. „Ich erfahre sofort, wenn es piept" ist ein klarer, emotionaler Nutzen. | Rust+, Alert Engine |
| 2 | **Team-Live-Map & Events im Team-Discord** (Cargo/Heli/Crate-Alerts, Teampositionen) | Koordinationsvorteil im PvP; pro Kopf günstig im Squad-Plan. | Rust+, Discord |
| 3 | **Shop-/Vending-Suche über die ganze Map** („Wer verkauft X, zu welchem Preis?") | Direkter Zeit-/Scrap-Vorteil, täglich nutzbar. | Rust+ |
| 4 | **Wipe-Intelligence**: der richtige Server + Reminder + Map-Vorschau vor allen anderen | Wipe-Start entscheidet den Wipe; „First Hour Advantage". | BattleMetrics, RustMaps, Parser |
| 5 | **Map Intelligence Pro**: Base-Spot-Rating, Routen, Heatmaps | Differenzierend, „Pro-Gamer-Gefühl"; schwer woanders zu bekommen. | Parser, RustMaps |
| 6 | **Clan-Verwaltung**: Seats, Rollen, geteilte Konfiguration, Audit | Organisatorischer Nutzen, B2B-ähnliche Zahlungslogik. | Teams, Billing |
| 7 | **Server-Owner-Analytics & Community-Bot-Premium** | Marketing-ROI für Owner ist direkt messbar. | BattleMetrics, Discord |

**Free-Tier-Logik:** Free liefert echten Alltagsnutzen (Server-Suche, 1 Favorit, Basis-`/pop`, Map-Bild), erzeugt aber natürliche Upgrade-Momente: mehr Favoriten, Alert-Anzahl, Team-Features, Alert-Latenz/Prioritäten, Historientiefe der Charts, Parser-Features.

**Anti-Nutzen (bewusst nicht verkaufen):** Alles, was wie ein unfairer Spielvorteil aus nicht-legitimen Daten wirkt. Das schützt Marke, Accounts der Nutzer und das Verhältnis zu Facepunch.

---

# 5. Feature-Landkarte

Legende Priorität: **P0** = Kern (ohne das kein Launch) · **P1** = Launch-nah · **P2** = Ausbau · **P3** = Später/Plattform

### 5.1 Server Intelligence (BattleMetrics)
| Feature | Beschreibung | Prio |
|---|---|---|
| Server-Suche | Filter: Name, Region, Land, Pop, Max, Modded/Vanilla, Wipe-Zyklus, Rank | P0 |
| Server-Detailseite | Status, Pop/Queue, Rank, Seed/Size, Mapname, Wipe-Zeiten, Beschreibung, Header-Image | P0 |
| Favoriten/Watchlist | Persönlich + Team-Watchlist | P0 |
| Population-Charts | 24h/7d/30d/Wipe-Zyklus; Vergleich mehrerer Server | P0 |
| Wipe-Erkennung & Archiv | Automatische Erkennung (Map-/Seed-Wechsel, Pop-Muster), Historie je Server | P0 |
| Wipe-Reminder | „Server X wiped in 2h" via Discord/Push | P0 |
| Server-Vergleich | Side-by-side (Pop-Kurven, Wipe-Verhalten, Uptime) | P1 |
| Server-Empfehlung | „Server wie dieser", personalisierte Vorschläge aus Historie | P2 |
| Uptime-/FPS-/Entity-Trends | Server-Gesundheit über Zeit | P1 |
| Owner-Verifizierung | Server „claimen" (Nachweisverfahren), Owner-Badge | P2 |

### 5.2 Map Intelligence (RustMaps + eigener Parser)
| Feature | Beschreibung | Prio |
|---|---|---|
| Map-Vorschau | Map-Bild + Monument-Liste zu Seed/Size (RustMaps) | P0 |
| Seed/Size-Lookup | Aus BattleMetrics-Daten automatisch die Map auflösen | P0 |
| Monument-Index | Alle Monumente mit Koordinaten, Grid-Referenz, Kategorien | P0 |
| Interaktive Web-Map | Zoom/Pan, Layer (Monumente, Roads, Rails, Rivers, Grid) | P1 |
| Eigener `.map`-Parser | Lokale Map-Datei → Monumente, Paths, Biome, Topologie, Prefabs | P1 |
| Eigenes Map-Rendering | 2D-Render aus Parser-Daten (Fallback, wenn RustMaps fehlt; Custom Maps) | P1 |
| Base-Spot-Rating | Bewertung von Bauplätzen (siehe Abschnitt 20) | P2 |
| Heatmaps | Ressourcen-/Topologie-/Risiko-Heatmaps | P2 |
| Routen-Analyse | Keycard-Runs, Roadside-Loops, Rail-Netz | P2 |
| Wipe-Start-Empfehlung | „Spawn hier, lauf diese Route" | P2 |
| Custom-Map-Support | Parser-basiert, ohne RustMaps-Abhängigkeit | P2 |

### 5.3 Live Rust+ Companion
| Feature | Beschreibung | Prio |
|---|---|---|
| Pairing-Flow | Server & Smart Devices per Rust+ pairen | P0 (für Live-Säule) |
| Live-Map mit Markern | Spieler (Team), Events, Vending, Shops | P0 |
| Team-Status | Online/Offline, Alive/Dead, Positionen | P0 |
| Event-Tracking | Cargo, Patrol Heli, Chinook, Locked Crate, Oil-Rig-Events | P0 |
| Vending-/Shop-Suche | Itemsuche über alle Vending Machines, Preisvergleich | P0 |
| Teamchat lesen/schreiben | Inkl. Discord-Relay (bidirektional optional) | P1 |
| Smart Switches | Schalten via Web/Discord/Desktop | P1 |
| Smart Alarms | Alarm → Alert Engine → Discord/Push | P0 |
| Storage Monitor | Füllstand/Decay-Infos, TC-Übersicht | P2 |
| Kamera-Zugriff | Rust+-CCTV-Streams, sofern Protokoll es erlaubt **[Prüfpunkt]** | P3 |
| Multi-Server | Mehrere gepairte Server parallel je Nutzer/Team | P1 |

### 5.4 Discord Bot
| Feature | Beschreibung | Prio |
|---|---|---|
| `/server`, `/status`, `/pop` | Server-Infos & Live-Pop | P0 |
| `/wipe` | Nächster/letzter Wipe, Countdown | P0 |
| `/map`, `/monuments` | Map-Bild, Monument-Liste | P0 |
| `/bind` | Guild/Channel mit Server/Team verknüpfen | P0 |
| `/alerts`, `/settings` | Alert- und Guild-Konfiguration | P0 |
| `/team`, `/events`, `/shops` | Rust+-Livedaten im Discord | P1 |
| Alert-Zustellung | Embeds mit Buttons (z. B. „Mute 1h") | P0 |
| Status-Channel | Auto-aktualisierter Channel-Name/Embed („🟢 245/300") | P1 |
| Wipe-Reminder-Feed | Geplante Ankündigungen | P0 |
| Rollen-/Channel-Konfig | Wer darf was, wohin postet der Bot | P0 |
| Smart-Device-Commands | `/switch on|off` mit Rollen-Gate | P2 |
| Premium-Gating | Feature-Flags pro Guild | P1 |

### 5.5 Team/Clan Features
| Feature | Beschreibung | Prio |
|---|---|---|
| Teams & Einladungen | Invite-Links, Discord-basiertes Onboarding | P0 |
| Rollen | Owner/Manager/Member (+Custom später) | P1 |
| Seats & Seat-Verwaltung | Kopplung an Subscription | P1 |
| Geteilte Watchlists/Alerts | Teamweite Konfiguration | P1 |
| Multi-Roster | Mehrere Teams pro Clan, mehrere Server | P2 |
| Audit-Log | Wer hat was geändert/geschaltet | P1 |

### 5.6 Shop/Vending Features
| Feature | Beschreibung | Prio |
|---|---|---|
| Vending-Karte | Alle Automaten mit Sortiment auf der Map | P0 |
| Item-Suche | „Wo gibt es Item X am günstigsten?" | P0 |
| Preis-Historie | Preisverlauf je Item/Server-Wipe | P2 |
| Shop-Alerts | „Alert, wenn Item X irgendwo gelistet wird" | P1 |
| Eigene Shop-Überwachung | „Mein Automat ist leer/ausverkauft" | P2 |

### 5.7 Event Alerts
Cargo spawn/Kurs, Patrol Heli, Chinook, Locked Crate (inkl. Timer), Oil-Rig-Crate, ggf. weitere Marker-Typen aus dem Rust+-Protokoll **[Prüfpunkt: verfügbare Marker-Typen je Spielversion]**. Zustellung: Discord, Web-Push, Desktop-Notification. Prio P0 innerhalb der Rust+-Säule.

### 5.8 Death/Threat Intelligence (nur legitime Daten – siehe Abschnitt 21)
| Feature | Beschreibung | Prio |
|---|---|---|
| Team-Death-Alerts | „X ist gestorben" aus Rust+-Teamdaten | P1 |
| Death-Log je Wipe | Zeitpunkte/Orte (sofern aus Teamdaten ableitbar) | P2 |
| Alarm-Korrelation | Smart-Alarm-Ereignisse + Team-Status → „Raid wahrscheinlich" | P2 |
| Nemesis/Threat-Notizen | Manuelle Team-Notizen zu Gegnern (nutzergenerierte Daten) | P2 |

### 5.9 Smart Device Control
Switches, Alarme, Storage Monitore; Rollen-Gates, Audit-Log, Schalt-Historie, Gruppen („Alle Turret-Switches an"), Zeitpläne (P2). Details in Abschnitt 22.

### 5.10 Base/Decay Tools
| Feature | Beschreibung | Prio |
|---|---|---|
| TC-/Upkeep-Rechner | Materialbedarf, Laufzeit | P1 |
| Decay-Reminder | „Upkeep reicht noch ~8h" (aus Storage Monitor, sonst manuell) | P2 |
| Raid-Kosten-Rechner | Sulfur-Kosten je Wand/Tür-Kombination | P1 |
| Base-Standort-Merkliste | Spots auf der Map markieren/teilen | P1 |

### 5.11 Resource/Monument/Route Analyse
Siehe Abschnitt 20 (Map Intelligence). Prio P2, Beta-Feature-Charakter, stark differenzierend.

### 5.12 Admin/Server Owner Features
| Feature | Beschreibung | Prio |
|---|---|---|
| Server-Claim & Badge | Verifizierter Owner | P2 |
| Community-Widgets | Einbettbare Status-/Map-Widgets | P2 |
| Owner-Analytics | Pop-Muster, Retention-Proxys, Wipe-Vergleich | P2 |
| Wipe-Ankündigungs-Automation | Discord-Posts aus Wipe-Plan | P2 |
| RCON-/Admin-Aktionen | **Bewusst ausgeklammert bis eigene Rechts-/Sicherheitsprüfung** **[Prüfpunkt]** | P3 |

### 5.13 Billing/Account/System Features
Account (E-Mail + Discord-OAuth, optional Steam-Login), Subscription-Verwaltung, Seats, Rechnungen, Feature-Flags, API-Keys (später Public API), Benachrichtigungs-Präferenzen, Datenexport/-löschung (DSGVO), Admin-Panel (Support, Fraud, Feature-Flags, Announcements). Prio P0/P1.

---
# 6. Datenquellen-Analyse

> **Wichtig:** Alle Angaben zu Rate Limits, Auth-Modellen und Terms sind zu Projektstart gegen die jeweils aktuelle offizielle Dokumentation zu verifizieren. Diese Tabelle definiert, *was* geprüft werden muss und *wie* wir es produktseitig nutzen wollen.

| Datenquelle | Welche Daten | Wie beziehen | API/Auth nötig | Rate Limits / Cache-Strategie | Risiken | Rechtliche Hinweise | Produktnutzen | Priorität |
|---|---|---|---|---|---|---|---|---|
| **BattleMetrics** | Serverliste, Status, Pop/Max/Queue, Rank, Land, Name, IP/Port, Rust-Details (Seed, Size, Wipe, Entities, FPS, Mapname, Description, Header-Image), Sessions/Leaderboards je nach Plan | REST-API (JSON:API-Format), Polling + serverseitige Suche | Personal Access Token / API-Key; kommerzielle Nutzung ggf. nur mit bezahltem Plan **[Prüfpunkt: aktuelle Terms + Pricing]** | Dokumentierte Limits pro Endpunkt **[Prüfpunkt]**; Strategie: zentraler Poller (nicht pro Nutzer!), gestaffelte Intervalle (beobachtete Server 60s, Watchlist 2–5min, Long Tail on-demand), Redis-Cache 30–120s, Historie in eigener DB | Limit-Sperren, Preisänderungen, API-Änderungen, Abhängigkeit als Single Source | ToS lesen: Attribution-Pflichten, Weiterverkauf von Rohdaten vermutlich untersagt → wir verkaufen *Analysen/Alerts*, nicht Rohdaten-Dumps; keine Scraping-Umgehung | Kern der Server Intelligence | **P0** |
| **RustMaps** | Map-Bilder, Seed/Size-Lookup, Monument-Liste mit Koordinaten, Map-Metadaten, Deep-Links | REST-API mit API-Key; Map-Generierung ggf. asynchron (Request → Poll bis fertig) **[Prüfpunkt: aktuelle Endpunkte/Flows]** | Ja, API-Key; kommerzielle Tiers **[Prüfpunkt: Pricing & erlaubte Nutzung, insb. Speichern/Cachen der Bilder]** | Kontingente je Tier **[Prüfpunkt]**; Strategie: Map-Metadaten dauerhaft in eigener DB, Bilder in eigenem Object Storage + CDN **nur falls Terms es erlauben**, sonst Hotlink auf RustMaps-CDN mit Attribution | Terms könnten Re-Hosting der Bilder verbieten; Kosten skalieren mit Map-Anzahl | Attribution/Backlink-Pflichten prüfen; keine Umgehung des API-Keys durch Scraping | Map-Vorschau ohne eigenen Parser; schnellster Weg zu Map Intelligence v1 | **P0** |
| **Rust+ Companion (Facepunch)** | Live-Map(-Bild), Map-Marker (Team, Events, Vending inkl. Sortiment/Preise), Team-Info (online/alive/Position), Teamchat, Server-Info (Name, Pop, Seed/Size, Wipe-Zeit), Smart-Device-Status & -Steuerung, Zeit im Spiel | Pairing über offiziellen Companion-Flow (Push-Registrierung + In-Game-Pairing), danach WebSocket direkt zum Spielserver (App-Port) mit Protobuf-Protokoll; Community-Referenzimplementierungen existieren (z. B. rustplus.js) **[Prüfpunkt: aktueller Pairing-Flow, da Facepunch die Registrierung mehrfach geändert hat]** | Kein klassischer API-Key; Player-Token pro Nutzer+Server aus Pairing; Server muss Rust+ aktiviert haben | Server-seitige Limits unbekannt/variabel → defensiv: Polling-Intervalle konfigurierbar, Broadcasts bevorzugen, Backoff bei Fehlern; Verbindungen pro Server bündeln (ein Socket je Server+Token-Kontext, nicht je UI-Client) | **Größtes Risiko im Produkt:** inoffizielle Nutzung des Protokolls; Facepunch kann Protokoll/Registrierung jederzeit ändern; einzelne Server können App-Port deaktivieren | Nutzung erfolgt mit Zustimmung und Credentials des Spielers (sein eigener Token); keine Fremd-Accounts; Facepunch-ToS & Companion-Bedingungen prüfen **[Prüfpunkt]**; Feature-Kommunikation defensiv („inoffizielle Integration") | Gesamte Live-Säule | **P0** (für Live-Säule), Architektur so bauen, dass Ausfall die anderen Säulen nicht bricht |
| **Lokale `.map`-Datei** | Vollständige Map-Struktur: Terrain-Maps (Höhe, Splat, Biome, Topologie, Wasser), Prefabs (IDs, Position/Rotation/Scale), Paths (Roads/Rails/Rivers) | Desktop-App liest Datei **rein lesend** aus dem Spielverzeichnis; Nutzer wählt Ordner/bestätigt Zugriff | Nein (lokale Datei des Nutzers) | Kein Limit; Parse-Ergebnis lokal + optional serverseitig cachen (Hash der Datei als Key) | Formatänderungen durch Rust-Updates; Prefab-ID→Name-Mapping muss gepflegt werden; **[Prüfpunkt: welche Maps liegen tatsächlich als Datei vor – Custom Maps werden heruntergeladen; ob/wo prozedurale Maps als Datei landen, ist zu verifizieren]** | Nur Dateien auf dem Rechner des Nutzers, keine Spielprozess-Interaktion; kein Vertrieb von Facepunch-Assets (wir extrahieren Strukturdaten, keine Texturen/Modelle); EULA von Rust prüfen **[Prüfpunkt]** | Alleinstellung: Custom-Map-Support, Analysen ohne Dritt-API | **P1** |
| **Eigene Datenbank** | Historisierung: Pop-Snapshots, Wipe-Archiv, Preis-Historien, Alert-Events, Nutzer-Notizen | Eigene Worker schreiben kontinuierlich | – | Retention-Policy: Rohsnapshots 90 Tage, Aggregate unbegrenzt (Downsampling) | Speicherkosten; Datenqualität | DSGVO: personenbezogene Daten minimieren; Spieler-Identifier nur wo nötig | Wird mit der Zeit zum Burggraben | **P0** |
| **Discord** | Guild-/Channel-/Rollen-IDs, User-IDs, Interaktionen | Discord-API (Bot + OAuth2) | Bot-Token, OAuth2-App | Discord-Rate-Limits (global + pro Route) → Bibliothek mit eingebautem Limit-Handling, Alert-Queue mit Priorisierung | Verifizierungspflicht ab 100 Guilds, Intents-Genehmigung (insb. Message Content vermeiden → Slash-Commands genügen) | Discord Developer ToS: keine Datenweitergabe, Datenlöschung bei Guild-Kick | Distribution & Alerts | **P0** |
| **Steam Login (OpenID)** | SteamID64, Persona-Name, Avatar | Steam OpenID 2.0 | Steam Web-API-Key für Profildaten | Unkritisch, Login-frequent | Gering | Nur Identifikation; SteamID ist personenbezogen → DSGVO-konform behandeln; keine Verknüpfung mit Fremd-Tracking | Komfort-Login, spätere Owner-Verifikation, Team-Mitglieder-Zuordnung | **P1 (optional)** |
| **Manuelle Server-Konfiguration** | IP/Port, Name, Notizen für Server ohne/mit unvollständigen BM-Daten | Nutzereingabe im Dashboard | – | – | Falscheingaben | – | Fallback, Custom-Server-Support | **P1** |

**Architektur-Konsequenz aus dieser Tabelle:** Jede externe Quelle bekommt ein eigenes, isoliertes Integrations-Package mit eigenem Circuit Breaker, eigenem Cache und eigenem Feature-Flag. Fällt eine Quelle aus (oder ändert Facepunch das Rust+-Protokoll), degradiert das Produkt kontrolliert statt komplett auszufallen.

---

# 7. BattleMetrics Integration

### 7.1 Grundsätze
- **Ein zentraler Poller, kein Fan-out pro Nutzer.** 10.000 Nutzer, die denselben Server beobachten, erzeugen genau *eine* Polling-Serie.
- **JSON:API-Format** (BattleMetrics liefert `data/attributes/relationships`-Strukturen) → eigener typisierter Client im Package `packages/battlemetrics` mit Response-Validierung (zod).
- **Alles historisieren, was billig ist:** Jeder Poll wird als Snapshot gespeichert; Analysen entstehen aus der Historie.

### 7.2 Relevante API-Bereiche **[Prüfpunkt: exakte Pfade/Parameter gegen aktuelle Doku verifizieren]**
| Zweck | Endpunkt (erwartet) | Nutzung |
|---|---|---|
| Server-Suche | `GET /servers?filter[game]=rust&filter[search]=...&filter[countries][]=...&sort=-players` | Suche im Dashboard/Bot; Ergebnisse 60–120s cachen |
| Server-Details | `GET /servers/{id}` | Detailseite + Poller; enthält `attributes.details.rust_*`-Felder (Seed, Worldsize, Wipe, FPS, Entities, Mapname, Description, Header-Image-URL) **[Prüfpunkt: Feldnamen]** |
| Historische Pop-Daten | Server-Relationships bzw. dedizierte History-Endpunkte, teils planabhängig **[Prüfpunkt]** | Backfill beim ersten Beobachten eines Servers, falls verfügbar |
| Spieler-Session-Daten | Vorhanden, aber **bewusst nicht in v1** (Datenschutz-Review nötig, siehe Abschnitt 21/25) | – |

### 7.3 Server-ID-Handling
- Interner `rust_servers`-Datensatz mit eigener UUID; `battlemetrics_id` ist ein *Attribut*, nicht der Primärschlüssel (Server können auch nur manuell oder nur via Rust+ existieren).
- Matching-Logik: BM-Server ↔ Rust+-Server über IP:Port; BM-Server ↔ RustMaps über Seed+Size (+Mapname für Custom Maps).
- Dedupe: gleiche IP:Port = gleicher Server, auch wenn mehrfach hinzugefügt.

### 7.4 Polling-Strategie
| Server-Klasse | Definition | Intervall |
|---|---|---|
| Hot | Aktive Rust+-Session eines Nutzers, laufende Alerts, Status-Channel gebunden | 60 s |
| Warm | In mindestens einer Watchlist | 2–5 min |
| Cold | Bekannt, aber unbeobachtet | On-Demand + 1×/Tag (für Wipe-Archiv-Vollständigkeit populärer Server) |
- Globale Token-Bucket-Steuerung im Worker, die das dokumentierte Rate Limit **[Prüfpunkt]** zu höchstens ~70 % auslastet; Priorisierung Hot > Warm > Cold; adaptives Backoff bei 429.
- Suche läuft immer live gegen BM (mit Kurz-Cache), niemals gegen ein selbstgebautes Vollreplikat (Terms-Risiko + Aufwand).

### 7.5 Caching & Historisierung
- **Redis:** letzter Server-Zustand (TTL 2× Poll-Intervall) → API/Bot lesen nie direkt BM.
- **Postgres/TimescaleDB (`battlemetrics_snapshots`):** ts, server_id, players, max_players, queue, status, rank, fps, entity_count, map_name, seed, size, raw_details (JSONB, nur bei Änderung voll gespeichert – Delta-Kompression).
- **Downsampling:** Continuous Aggregates → 5-min-Buckets (90 Tage roh), 1-h-Buckets (2 Jahre), Tages-Buckets (unbegrenzt).

### 7.6 Wipe-Erkennung
Mehrstufige Heuristik, jede Stufe erhöht die Konfidenz:
1. **Seed/Size/Mapname-Wechsel** zwischen zwei Snapshots → Map-Wipe (hart, hohe Konfidenz).
2. **`rust_last_wipe`-Feld** (sofern vorhanden **[Prüfpunkt]**) → direkte Quelle.
3. **Pop-Muster:** Absturz auf ~0 + Neustart + steiler Anstieg zur typischen Wipe-Zeit (Do 19–21 Uhr bei Facepunch-Zyklus) → unterstützendes Signal.
4. **BP-Wipe vs. Map-Wipe:** Nur Map-Wipe ist hart erkennbar; BP-Wipe aus Servername/Description-Parsing (z. B. „BP Wipe") als *unbestätigt* markieren.
→ Ergebnis in `wipes`-Tabelle (server_id, detected_at, kind: map|full|unknown, confidence, seed_before/after, size). Wipe-*Vorhersage* aus Historie (Regelmäßigkeit) + Description-Parsing („Wipes Mondays 3pm") mit Konfidenzanzeige im UI.

### 7.7 Fehlerfälle
| Fehler | Verhalten |
|---|---|
| 429 Rate Limit | Backoff mit Jitter, Hot-Klasse zuerst bedienen, Alarm an Ops bei anhaltend |
| 5xx / Timeout | Retry (3×, exponentiell), Server-Status „stale" ab 3 Fehlversuchen, UI zeigt „Daten von HH:MM" |
| Server aus BM verschwunden | Soft-Delete-Flag, Watchlist-Hinweis an Nutzer |
| Schema-Drift (Feld fehlt/umbenannt) | zod-Validierung → Warn-Log + Metrik, Feld als null, kein Crash |
| API-Key ungültig/Plan geändert | Circuit Breaker öffnet, Statuspage-Eintrag, Ops-Alarm |

### 7.8 API-Key & Kommerzialisierung
- Key ausschließlich serverseitig (Secrets Manager), niemals im Client/Bot.
- **[Prüfpunkt vor Paid Launch]:** BattleMetrics-Terms zur kommerziellen Nutzung klären; ggf. bezahlten API-Plan abschließen und schriftliche Bestätigung des Use-Cases einholen. Budgetposten einplanen.
- Free vs. Paid intern: Unser Free-Tier limitiert *unsere* Features (Anzahl Watchlist-Server, Chart-Tiefe), nicht die BM-Zugriffe – der zentrale Poller entkoppelt Nutzerzahl von BM-Last.

### 7.9 Datenmodell-Auszug
Siehe Abschnitt 16 (`rust_servers`, `battlemetrics_snapshots`, `wipes`).

---

# 8. RustMaps Integration

### 8.1 Nutzungsmodell
RustMaps liefert die schnelle, schöne Map-Ansicht für prozedurale Maps; der eigene Parser (Abschnitt 9) liefert Tiefe und Custom-Map-Support. Beide speisen dasselbe interne Schema (`map_records`, `monuments`), sodass Web/Bot/Desktop quellenagnostisch rendern.

### 8.2 Kernflüsse **[Prüfpunkt: Endpunkte/Async-Verhalten gegen aktuelle RustMaps-Doku]**
1. **Lookup:** Seed+Size aus BattleMetrics → `GET map by seed/size`. Existiert die Map bei RustMaps noch nicht, Generierung anstoßen (sofern API das anbietet) und per Job pollen, bis fertig; UI zeigt „Map wird generiert".
2. **Antwort verarbeiten:** Map-Metadaten (Bild-URLs in mehreren Auflösungen, Monument-Liste mit Koordinaten, ggf. Biome-Anteile, RustMaps-Link) → normalisieren → `map_records` + `monuments` speichern.
3. **Bilder:** Bevorzugt eigene Kopie in Object Storage + CDN (Auflösungen: thumb/medium/full) — **nur wenn die Terms Re-Hosting erlauben [Prüfpunkt]**; andernfalls Hotlinking auf RustMaps-CDN mit Attribution und eigenem Thumbnail-Proxy nur für Discord-Embeds, falls zulässig.
4. **Attribution:** „Map data by RustMaps.com" + Deep-Link auf jeder Map-Ansicht — vertraglich vermutlich gefordert, auf jeden Fall fair **[Prüfpunkt: genaue Attribution-Vorgaben]**.

### 8.3 Caching & Kosten
- Map-Metadaten sind unveränderlich je (Seed, Size, Rust-Version) → dauerhaft cachen; Key: `seed:size:generatorVersion` **[Prüfpunkt: liefert RustMaps eine Versions-/Staging-Kennung mit?]**.
- API-Kontingent schonen: Lookup nur bei erstem Bedarf; Wipe-Erkennung triggert genau einen Lookup je neuer Map.
- Kostenmodell: RustMaps-Tier so wählen, dass ~2.000–5.000 neue Maps/Monat abgedeckt sind (Facepunch-Wipe-Donnerstag erzeugt Spitzen) **[Annahme, mit echten Zahlen aus Beta kalibrieren]**.

### 8.4 Fallback-Kette für die Map-Ansicht
1. RustMaps-Daten vorhanden → volle Ansicht.
2. RustMaps ausgefallen/Quota erschöpft → letzter gecachter Stand + Hinweis.
3. Keine RustMaps-Daten (Custom Map) → Rust+-`getMap`-Bild (falls gepairt) → eigener Parser-Render (falls Map-Datei vorhanden) → Platzhalter mit Monument-Liste aus Rust+-Markern.

### 8.5 Terms-Risiken (Zusammenfassung, Details in Abschnitt 25)
- Re-Hosting der Bilder, kommerzielle Nutzung, Rate-Limits, Attribution → alles vor Phase 4 schriftlich klären. RustMaps ist ein Community-Anbieter; ein direkter, fairer Kontakt (Partner-/API-Anfrage) ist der empfohlene Weg und vermutlich unkompliziert.

---
# 9. Eigener Rust `.map` Parser

Dies ist das technisch anspruchsvollste und differenzierendste Modul. Es wird bewusst als eigenständiges Package (`packages/map-parser`) mit stabiler Schnittstelle geplant, das in drei Kontexten läuft: Backend-Service, Desktop-App (lokal) und optional WASM (Browser-Preview).

### 9.1 Was ist eine Rust `.map`-Datei?
- Rust (Unity/C#) serialisiert Welten über eine Struktur, die in Facepunchs Code als **WorldSerialization** bekannt ist: ein Container mit Versionsnummer und einer Protobuf-artigen Payload, die **LZ4-komprimiert** gespeichert wird. **[Prüfpunkt: exakter Header-Aufbau (Magic/Version, komprimierte vs. unkomprimierte Länge) und ob LZ4-Block- oder Frame-Format verwendet wird – gegen Community-Referenzen und eigene Sample-Dateien verifizieren.]**
- Die Payload enthält drei relevante Sammlungen **[Annahme auf Basis bekannter Community-Tools, im PoC zu bestätigen]**:
  - **maps**: benannte Byte-Arrays der Terrain-Daten – typische Namen: `terrain`/`height` (Höhenfeld), `splat` (Bodentexturen-Gewichte), `biome` (Arid/Temperate/Tundra/Arctic-Gewichte), `topology` (Bitmasken: Beach, Road, Rail, River, Lake, Cliff, Ocean, Monument, Building-Blocked …), `alpha` (Löcher im Terrain), `water` (Wasserhöhe).
  - **prefabs**: Liste aus `{ id (uint32-Hash), category (string), position (x,y,z), rotation, scale }`. Die `id` ist ein Hash des Prefab-Pfads; die Auflösung Hash → Pfad erfordert ein **Manifest-Mapping** (siehe 9.6).
  - **paths**: benannte Pfade (`Road`, `Rail`, `River`, `Powerline` …) mit Knotenlisten (Weltkoordinaten), Breite, Terrain-Anpassungsparametern.

### 9.2 Wo liegt die Datei lokal? Wie erkennt die Desktop-App sie?
- **Custom Maps** werden beim Server-Join heruntergeladen und im Rust-Installationsverzeichnis abgelegt (typisch `<SteamLibrary>/steamapps/common/Rust/maps/…`, Dateiname enthält oft Map-Name/Hash) **[Prüfpunkt: exakter Pfad und Namensschema in aktueller Rust-Version]**.
- **Prozedurale Maps** generiert der Client aus Seed+Size selbst; ob dabei eine `.map`-Datei persistiert wird, ist **nicht garantiert** → **[Prüfpunkt im PoC – Woche 1]**. Konsequenz für die Planung: Der Parser-Nutzen ist für **Custom Maps gesichert** (dort ist er am wertvollsten, weil RustMaps Custom Maps nicht kennt); für prozedurale Maps sind RustMaps + Rust+ die Primärquellen, der Parser optionaler Bonus.
- **Erkennung durch die Desktop-App:** Steam-Bibliothek über `libraryfolders.vdf` finden → Rust-Ordner lokalisieren → `maps/`-Verzeichnis mit Datei-Watcher (rein lesend) beobachten → neue Datei → Hash bilden → Parser-Job. Nutzer bestätigt den Ordner beim Onboarding explizit (Transparenz, keine stille Dateisystem-Suche).

### 9.3 Dekompression & Deserialisierung
Pipeline:
```
Datei → Header lesen (Version) → LZ4-Dekompression → Protobuf-Decode (WorldSerialization)
      → Validierung → Normalisierung in eigenes internes Schema (ParsedMap)
```
- LZ4: In Rust `lz4_flex` (Block + Frame unterstützt). Beide Varianten im PoC testen.
- Protobuf: Schema aus Community-Referenzen rekonstruieren und als eigene `.proto` pflegen (keine Fremd-Dateien 1:1 kopieren, Struktur ist funktional vorgegeben und nicht schutzfähig, aber sauber selbst dokumentieren). Decoder: `prost`.
- **ParsedMap (internes Schema, versioniert):** `{ meta: {size, seedIfKnown, fileHash, parserVersion}, heightmap, splat, biome, topology, water, prefabs[], paths[], monuments[] (abgeleitet), grid }` → serialisiert als eigenes kompaktes Format (z. B. FlatBuffers oder MessagePack + zstd) für Cache/Übertragung.

### 9.4 Monument-Erkennung
1. Prefab-ID → Pfad via Manifest.
2. Pfad-Filter: Monumente liegen unter erkennbaren Pfadmustern (z. B. `assets/bundled/prefabs/autospawn/monument/...`) **[Prüfpunkt: Musterliste aus Manifest ableiten]**.
3. Eigene kuratierte **Monument-Registry** (Datenbank-Tabelle, kein Hardcode): prefab_path → Anzeigename, Kategorie (Tier1/2/3, Safezone, Harbor, Rig …), Icon, Radius/Bounds, Eigenschaften (Recycler ja/nein, Keycard-Level, CCTV-Codes vorhanden, Tunnel-Anschluss …). Diese Registry ist Handarbeit + Community-Wissen und ein eigenes Datenprodukt.
4. Fallback für unbekannte IDs: Kategorie `unknown_prefab`, Sammel-Reporting → Registry-Pflegeprozess nach jedem Rust-Update.

### 9.5 Roads/Rails/Rivers
- Primär aus `paths` (Knotenlisten → Polylines; Name/Typ unterscheidet Road/Rail/River/Powerline).
- Sekundär/validierend aus der `topology`-Bitmaske (Road-/Rail-/River-Bits) → Rasterlayer für Heatmaps und für Maps, deren Paths-Sektion leer/ungewöhnlich ist (manche Custom Maps).
- Ableitungen: Straßennetz-Graph (Knoten an Kreuzungen/Monument-Anschlüssen) für Routen-Analysen; Ring-Road-Erkennung; Rail-Loop inkl. Tunnel-Eingänge (Prefabs).

### 9.6 Prefab-ID → Name (Manifest-Problem)
- Rust hasht Prefab-Pfade zu uint32-IDs. Das Mapping steht im Spiel-Manifest bzw. lässt sich aus öffentlich bekannten Prefab-Listen der Community aufbauen. **Strategie:** eigenes `prefab_manifest`-Dataset, versioniert je Rust-Release; Quellen: (a) Hash-Funktion nachimplementieren und bekannte Pfadlisten hashen **[Prüfpunkt: Hash-Algorithmus identifizieren]**, (b) Community-Datenquellen mit kompatibler Lizenz. Kein Extrahieren proprietärer Assets – wir speichern nur Pfad-Strings und Hashes.

### 9.7 Koordinaten → 2D-Map
- Weltkoordinaten: Ursprung in der Map-Mitte **[Annahme, im PoC verifizieren]**; `world(x,z)` → `image(u,v)`: `u = (x + size/2) / size * imgW`, `v = (size/2 - z) / size * imgH` (Z-Achse gespiegelt, damit Norden oben).
- **Grid-Referenz** (A1…): Zellgröße 146,3 m (Rust-Konvention **[Prüfpunkt]**), Spalten = Buchstaben von West nach Ost, Zeilen = Zahlen von Nord nach Süd → eigene Utility in `packages/shared`, identisch in Web/Bot/Desktop verwenden, gegen RustMaps-Darstellung kalibrieren.
- Alle Layer (RustMaps-Bild, Parser-Render, Rust+-Marker) werden in *einem* normalisierten Koordinatensystem [0..1]² gehalten; Renderer skaliert.

### 9.8 Heatmaps (Ressourcen/Spawns/Topologie)
- **Direkt aus Daten:** Biome-Layer, Topology-Layer (z. B. „Building Blocked", Cliffs, Swamps), Wassertiefe (water − height).
- **Ressourcen:** Statische Nodes stehen nicht 1:1 in der Map-Datei (Spawns sind regelbasiert zur Laufzeit) → Heatmap als **Modell**: Spawn-Regeln approximieren (Biome × Topologie × Höhe → Node-Dichte-Score) und ehrlich als „geschätzte Dichte" labeln. **[Annahme: Approximation; niemals als exakte Spawn-Punkte verkaufen.]**
- Rendering: Raster-Layer (PNG mit Alpha) serverseitig vorproduziert je Zoomstufe, als Kachel-Layer über die Map gelegt.

### 9.9 Sprachwahl für den Parser
| Kriterium | Rust | Go | C# | Node/TS | Python |
|---|---|---|---|---|---|
| Performance/Memory bei 4k-Rastern | ★★★ | ★★☆ | ★★☆ | ★☆☆ | ★☆☆ |
| LZ4/Protobuf-Ökosystem | ★★★ (`lz4_flex`, `prost`) | ★★★ | ★★★ | ★★☆ | ★★☆ |
| Nähe zum Originalcode (Unity/C#) | ★☆☆ | ★☆☆ | ★★★ | ★☆☆ | ★☆☆ |
| Desktop-Integration (Tauri) | ★★★ (nativ) | ★★☆ (Sidecar) | ★★☆ (Sidecar) | ★★☆ | ★☆☆ |
| WASM-Option (Browser) | ★★★ | ★★☆ | ★☆☆ | – | – |
| Team-Skill-Annahme (TS-lastiges Produkt) | ★★☆ | ★★☆ | ★★☆ | ★★★ | ★★☆ |

**Empfehlung: Rust.** Begründung: (1) Ein Codebase für Backend-Service, Tauri-Desktop (direkt eingebunden, kein Sidecar) und WASM-Preview; (2) beste Performance für Raster-Verarbeitung und Rendering; (3) erstklassige `lz4`/`prost`-Crates; (4) passt kulturell zum Produktnamen 😉. C# ist die legitime Alternative (Strukturen 1:1 nachvollziehbar), verliert aber bei Tauri/WASM. **Für den allerersten Format-PoC ist ein Wegwerf-Skript in Python/TS erlaubt**, um das Format schnell zu verstehen; produktiv wird Rust.

Libraries (Rust): `lz4_flex`, `prost` (+`prost-build`), `serde`, `image` (PNG-Encoding), `tiny-skia` oder eigenes Rasterizing für Renders, `rayon` (Parallelisierung), `wasm-bindgen` (WASM-Build), `napi-rs` optional (Node-Binding für API-Prozess, falls kein eigener Service).

### 9.10 Umgang mit Rust-Updates
- **Parser-Versionierung:** `parserVersion` in jedem Ergebnis; WorldSerialization-`version` der Datei loggen; unbekannte Version → Parser läuft im Tolerant-Modus (unbekannte Felder ignorieren) + Ops-Alarm.
- **Monatlicher Update-Prozess** (Rust patcht am ersten Donnerstag): Sample-Maps neu ziehen → Regression-Suite (9.11) → Manifest-Diff (neue Prefabs?) → Registry pflegen → Release. Ziel-SLA: Parser kompatibel < 72 h nach Rust-Update.
- Forward-Kompatibilität: Protobuf ist additiv-tolerant; harte Brüche (neue Kompression o. ä.) über Feature-Detection am Header abfangen.

### 9.11 Tests mit Beispielmaps
- **Fixture-Bibliothek** in Object Storage (nicht im Git): kleine (1000), mittlere (3500), große (4500+) prozedurale Maps mehrerer Rust-Versionen + 5–10 populäre Custom Maps + absichtlich korrupte Dateien.
- Golden-File-Tests: erwartete Monument-Listen/Path-Zahlen je Fixture; Toleranz-Assertions (Koordinaten ±1 m).
- Property-Tests: Parser darf auf beliebigem Input niemals panicken (Fuzzing mit `cargo-fuzz`).
- Visueller Diff: Parser-Render vs. RustMaps-Bild derselben Seed/Size → struktureller Ähnlichkeits-Score als Regressionstest der Koordinaten-Transformation.

### 9.12 Caching & Performance
- **Key:** SHA-256 der Datei (+ parserVersion). Ergebnis-Artefakte: ParsedMap-Binary, Render-Kacheln, Monument-JSON → Object Storage; Metadaten in `map_records`.
- Desktop parst lokal (Ergebnis sofort nutzbar, offline-fähig) und lädt optional das *Ergebnis* (nie die Map-Datei selbst, Standard: nur mit Zustimmung – Custom-Map-Dateien könnten Rechte Dritter berühren **[Prüfpunkt]**) zum Team-Sharing hoch.
- Performance-Budget: 4500er-Map < 3 s Parse (ohne Render), < 10 s inkl. Basis-Render auf Referenz-Hardware; Speicher < 1,5 GB Peak. Raster-Arbeit mit `rayon` parallelisieren; Height/Splat als flache Arrays, keine naiven 2D-Vecs.
- Backend-Service: Parser hinter Queue (BullMQ) als Job; ein Pod verarbeitet seriell 1–2 Jobs (Speicher!), horizontal skalierbar.

### 9.13 Integration in Web & Desktop
- Einheitliches Ausgabeformat `ParsedMap` → `packages/shared` definiert TS-Typen (aus Rust via `ts-rs` generiert oder JSON-Schema).
- Web: API liefert Monument-JSON + Kachel-URLs; Map-Viewer (Abschnitt 12) rendert Layer.
- Desktop: Parser als Rust-Crate direkt in Tauri; Ergebnis lokal in SQLite-Cache; UI identische Viewer-Komponente (geteiltes Frontend-Package).

---

# 10. Rust+ Companion Integration

### 10.1 Funktionsprinzip (Ist-Stand der bekannten Technik)
Der offizielle Rust+-Client funktioniert zweistufig: (1) **Pairing** über Push-Benachrichtigungen: Der Client registriert sich beim Facepunch-Companion-Dienst und bei einem Push-Kanal (FCM/Expo); drückt der Spieler im Spiel „Pair", sendet der Spielserver über Facepunch eine Push-Nachricht mit den Verbindungsdaten. (2) **Live-Verbindung:** Direkter **WebSocket zum Spielserver** (dedizierter App-Port) mit einem **Protobuf-Protokoll** (Request/Response + Broadcasts). Community-Bibliotheken (rustplus.js, rustplus.py) implementieren beides und sind seit Jahren im breiten Einsatz (z. B. für Discord-Bots). **[Prüfpunkt: Facepunch hat den Registrierungs-/Push-Teil in der Vergangenheit geändert; aktuellen Flow gegen die gepflegten Community-Implementierungen verifizieren. Dies ist Risiko Nr. 1 des Produkts – siehe Abschnitt 25.]**

**Pairing-Payload (erwartete Felder [Annahme]):** Server-IP, App-Port, `playerId` (SteamID), `playerToken` (signierter Token je Spieler+Server), Servername, Beschreibung. Smart-Device-Pairing liefert zusätzlich `entityId` + Typ.

### 10.2 Pairing-Flow im Produkt
1. Nutzer startet Pairing im Dashboard/Desktop → wir erzeugen für den Nutzer eine Companion-Registrierung (Push-Listener in unserem **Rust+ Connector Service**) **[Prüfpunkt: ob Registrierung pro Nutzer serverseitig sauber möglich ist oder der initiale Schritt in der Desktop-App lokal stattfinden muss – beide Varianten planen; Desktop-lokal ist der robustere Fallback]**.
2. UI zeigt: „Öffne Rust → ESC → Rust+ → Pair with Server".
3. Push trifft ein → Payload validieren → `rustplus_connections`-Datensatz anlegen, `playerToken` **sofort verschlüsseln** (siehe 10.7), Klartext nie loggen.
4. Test-Handshake (`getInfo`) → Erfolg dem Nutzer bestätigen; Server automatisch mit BM-Datensatz matchen (IP:Port).
5. Smart Devices: gleicher Flow, Payload enthält `entityId` → Gerät benennen/Team zuordnen.

### 10.3 Verbindungs- und Multiplexing-Architektur (Kernentscheidung)
- **Connection Manager** im Rust+ Connector Service hält **einen WebSocket pro (Server, playerToken)**. Mehrere UI-Clients (Web, Discord, Desktop) desselben Nutzers/Teams teilen sich diese eine Verbindung über unseren internen Event-Bus.
- **Token-Sharing im Team bewusst vermeiden:** Jedes Teammitglied paired selbst (eigener Token). Team-Sicht entsteht serverseitig durch Aggregation der Team-Daten, die *ein* Mitglied liefert (`getTeamInfo` liefert das ganze Team) – d. h. praktisch reicht **eine aktive Verbindung pro Team pro Server** (Leader-Election unter den verfügbaren Tokens; Failover auf anderen Token, wenn einer invalidiert).
- Skalierung: Connections sind stateful → Service-Instanzen mit **Konsistenz-Hashing über server_id** (Verbindung „gehört" einer Instanz); Zustand (Subscriptions, letzte Marker) in Redis, damit Failover eine Verbindung neu aufbauen kann.

### 10.4 Datenabruf & Broadcasts
| Datenart | Mechanik | Intervall/Trigger |
|---|---|---|
| Server-Info (`getInfo`) | Poll | 5 min + on-demand |
| Zeit (`getTime`) | Poll | 5 min (für Tag/Nacht-Anzeige) |
| Map (`getMap`) | Einmal je Wipe (großes Bild) | Bei Verbindung, dann Cache |
| Map-Marker (`getMapMarkers`) | Poll | 15–30 s (Events, Vending, Team) **[Prüfpunkt: was kommt zusätzlich als Broadcast?]** |
| Team (`getTeamInfo` + Broadcasts) | Broadcast bevorzugt, Poll-Fallback | Broadcast sofort / Poll 30 s |
| Teamchat | Broadcast + `sendTeamMessage` | Echtzeit |
| Smart Devices | Broadcast (`EntityChanged`) + `getEntityInfo`, `setEntityValue` | Echtzeit |
- **Event-Ableitung:** Marker-Diffing zwischen Polls → `cargo_spawned`, `cargo_docked` (Nähe Harbor), `heli_spawned/downed`, `crate_dropped`, `crate_unlock_in` (Timer), `vending_item_listed`. Diff-Engine ist Kernstück der Alert-Pipeline.
- Vending: Marker enthalten Sortiment (Item-IDs, Preise, Lagerbestand) **[Prüfpunkt: Feldumfang]** → normalisieren in `vending_machines`/`vending_offers`, Item-IDs über eigene Item-Registry (aus öffentlichen Item-Listen) auflösen.

### 10.5 Teamchat & Discord-Relay
- Lesen: Broadcast → Event-Bus → optionale Weiterleitung in konfigurierten Discord-Channel (Team-Opt-in, klar gekennzeichnet).
- Schreiben: `sendTeamMessage` aus Discord/Web – **standardmäßig deaktiviert**, Opt-in mit Rollen-Gate + Rate-Limit (Spam-Schutz, Impersonations-Transparenz: Prefix wie `[D] Name:`), Audit-Log.

### 10.6 Fehlerfälle, Reconnect, Rate Limits
| Fall | Verhalten |
|---|---|
| Socket-Drop | Exponentielles Reconnect (1s→60s, Jitter), Zustand aus Redis, Resubscribe |
| Token invalid (z. B. Spieler hat im Spiel „unpair" gedrückt, Serverwipe) | Verbindung als `revoked` markieren, Nutzer benachrichtigen („Bitte neu pairen"), Team-Failover auf anderen Token |
| Server offline/Wipe | BM-Status korrelieren; während Wipe-Fenster Reconnect-Sturm vermeiden (globaler Wipe-Modus: Backoff ×5) |
| App-Port zu/Firewall | Nach N Fehlversuchen Verbindung pausieren, UI-Status „Server erreicht Rust+ nicht" |
| Server-seitiges Throttling | Adaptive Poll-Intervalle, Priorität: Smart-Alarm-Broadcasts > Team > Marker > Info |
| Protokolländerung durch Facepunch | Protobuf-tolerant decodieren, Canary-Verbindungen gegen Testserver, Feature-Flag „Rust+ degraded" schaltet Säule produktweit in Wartungsmodus |

### 10.7 Sicherheitsmodell & Token-Verschlüsselung
- `playerToken` = sensibles Credential → **AES-256-GCM**, Data-Key pro Datensatz, Data-Keys per KMS-Master-Key (Envelope Encryption); Entschlüsselung nur im Connector-Service (dediziertes Service-Konto, Least Privilege), niemals in API/Frontend; kein Token in Logs/Traces (Log-Scrubber-Regel + Test).
- Push-Registrierungs-Credentials des Companion-Kanals ebenso verschlüsselt.
- Aktionen mit Spielwirkung (Smart Devices schalten, Chat senden) erfordern authentifizierten Nutzer mit passender Team-Rolle + werden auditiert.

### 10.8 Multi-Server & Grenzen
- Ein Nutzer: n Verbindungen (Plan-Limit: Free 1, Pro 3, Squad/Clan mehr – siehe Abschnitt 23).
- Harte Produktgrenze: Wir zeigen nur, was das Rust+-Protokoll legitim liefert (Team-Positionen ja, Gegner-Positionen nein – außer als offizielle Map-Marker wie Heli/Cargo). Keine „Radar"-Rhetorik im Marketing.

### 10.9 Rechtliche/technische Risiken (Kurzfassung, Matrix in 25)
Inoffizielles Protokoll → Bruch-Risiko; Mitigation: Abstraktionsschicht `packages/rustplus` mit Protokoll-Adaptern, Canary-Monitoring, defensives Marketing, Säulen-Isolation (Produkt funktioniert ohne Rust+ weiter), Community-Watch (Rust-Update-Notes, rustplus.js-Repo beobachten).

---
# 11. Discord Bot Architektur

### 11.1 Grundentscheidungen
- **Slash-Commands only** (keine Message-Content-Intents → keine privilegierte Intent-Genehmigung nötig, bessere Privacy-Position).
- Bot ist **dünner Client der Plattform-API**: keine eigene Geschäftslogik, keine direkten BM/Rust+-Zugriffe; er rendert Embeds und nimmt Interaktionen entgegen. Vorteil: Web/Bot/Desktop bleiben konsistent, Bot-Neustarts sind harmlos.
- Interaktionsmodell: Gateway (WebSocket) in v1; HTTP-Interactions-Endpoint als spätere Option für Serverless-Skalierung.

### 11.2 Command-Set (v1)
| Command | Funktion | Gating |
|---|---|---|
| `/bind server <suche>` / `/bind team` | Guild/Channel ↔ Server/Team verknüpfen | Guild-Admin bzw. konfigurierte Rolle |
| `/server [name]` | Server-Karte (Status, Pop, Wipe, Map-Thumb, Buttons: „Beobachten", „Map") | frei |
| `/status`, `/pop` | Kurzstatus des gebundenen Servers, Pop + 24h-Sparkline | frei |
| `/wipe` | Countdown/letzter Wipe, Wipe-Historie-Button | frei |
| `/map`, `/monuments` | Map-Bild + Link, Monument-Liste (paginierte Embeds) | frei |
| `/team` | Rust+-Team-Status (online/alive, Grid-Positionen) | Team-Mitglied, Premium-Flag je Feature |
| `/events` | Aktive Events (Cargo/Heli/Crate) des gebundenen Servers | Rust+ verbunden |
| `/shops <item>` | Vending-Suche mit Preisen + Grid | Rust+ verbunden, Premium-Tiefe |
| `/alerts` | Alert-Liste/An-Aus/Erstellen (modal-basiert) | Rolle „Alert-Manager" |
| `/settings` | Guild-Konfiguration (Channels, Rollen, Sprache) | Guild-Admin |
| `/switch <gerät> on/off` (P2) | Smart Device schalten | Team-Rolle + Audit |

### 11.3 Guild-Konfigurationsmodell
`discord_guilds` (guild_id, verknüpfte team_id/server_ids, Sprache, Premium-Status) + `discord_channels` (channel_id, Zweck: alerts|status|chat_relay|events, Filter, Format). Rollen-Mapping: Discord-Rollen-IDs → Plattform-Berechtigungen (alert_manager, device_operator, viewer). Konfiguration primär im Web-Dashboard (bessere UX), `/settings` für Schnellzugriff; beide schreiben dieselbe API.

### 11.4 Alert-Zustellung
- Notification Service publiziert `discord_delivery`-Jobs (Queue) → Bot-Worker sendet Embed mit Action-Buttons („Mute 1h", „Details", Deep-Link ins Dashboard).
- **Rate-Limit-Disziplin:** discord.js-internes Limit-Handling + eigene Guild-Level-Drossel (max. X Alerts/Minute/Channel, konfigurierbar; Überschuss wird gebündelt: „5 weitere Events…" – wichtig bei Event-Stürmen am Wipe-Tag).
- Idempotenz: delivery_id verhindert Doppelposts bei Retries.

### 11.5 Sharding & Hosting
- discord.js `ShardingManager`; nötig ab 2.500 Guilds (Discord-Vorgabe), Architektur von Tag 1 sharding-fähig (kein globaler In-Memory-State; alles über API/Redis).
- Ab ~100 Guilds: **Bot-Verifizierung** bei Discord einplanen (Vorlaufzeit, Datenschutz-Angaben nötig).
- Hosting: eigener Container-Service (kein Serverless in v1 wegen Gateway-Verbindung), 2 Instanzen erst nach Sharding-Split sinnvoll (Shard-Zuteilung).

### 11.6 Abuse Prevention & Premium-Gating
- Command-Cooldowns pro User/Guild (Redis); Alert-Anzahl pro Guild plangebunden; Blocklist für missbräuchliche Guilds.
- Premium pro Guild als Entitlement in unserer DB (Kauf via Dashboard, Guild-Verknüpfung durch Admin); Gating im Bot ausschließlich über Feature-Flag-Antworten der API (eine Wahrheit).

### 11.7 Setup-UX (kritisch für Adoption)
Invite-Link mit minimalen Scopes → Bot postet Willkommens-Embed mit „Setup starten"-Button → geführter Flow (Server suchen & binden, Alert-Channel wählen, Testalert senden) in < 2 Minuten. Fehlende Berechtigungen werden konkret benannt („Mir fehlt *Embed Links* in #alerts").

---

# 12. Web Dashboard Architektur

### 12.1 Seitenstruktur
```
/                      Marketing/Landing (öffentlich, SEO)
/servers               Server-Suche (öffentlich mit Login-Nudge)
/servers/[id]          Server-Detail: Status, Charts, Wipes, Map-Tab, Alerts-Tab
/maps/[id]             Map-Viewer (Vollbild-fähig)
/app                   Dashboard-Home: meine Server, aktive Events, Team-Status
/app/watchlist         Favoriten/Watchlists (persönlich + Team)
/app/alerts            Alert-Regeln (Liste, Editor, Verlauf)
/app/team              Teamverwaltung: Mitglieder, Rollen, Einladungen, Seats
/app/rustplus          Pairing-Status, Verbindungen, Smart Devices
/app/discord           Guild-Verknüpfung, Channel-Konfig, Bot-Status
/app/settings          Profil, Benachrichtigungen, Sprache, Datenexport/-löschung
/app/billing           Plan, Seats, Rechnungen (Stripe Customer Portal-Link)
/admin/*               Internes Admin-Panel (getrennte Auth-Policy)
```

### 12.2 Kern-User-Flows
1. **Onboarding:** Sign-up (E-Mail oder Discord-OAuth) → „Was willst du?" (Server finden / Team einrichten / Bot installieren) → geführter erster Erfolg in < 3 Minuten (z. B. Server suchen → beobachten → Wipe-Reminder aktiv).
2. **Server hinzufügen:** Suche (BM) → Karte mit Live-Daten → „Beobachten" → optional „Mit Discord verbinden" (Guild-Auswahl, wenn Bot installiert) → optional „Rust+ pairen".
3. **Rust+ verbinden:** Wizard mit Live-Status („Warte auf Pairing… ✓ Server empfangen → ✓ Verbindung getestet"), Fehlerhilfen (Server hat Rust+ deaktiviert etc.).
4. **Alerts konfigurieren:** Regel-Builder (Trigger → Bedingungen → Kanäle → Quiet Hours) mit Vorlagen („Raid-Alarm-Paket", „Wipe-Paket").
5. **Map anzeigen:** Canvas/WebGL-Viewer (Zoom/Pan, Layer-Toggles: Monumente, Roads/Rails/Rivers, Grid, Heatmaps, Live-Marker bei Rust+), Mess-Tool, Spot-Merkliste, Share-Link.
6. **Billing:** Plan-Auswahl → Stripe Checkout → Rückkehr mit sofortigem Entitlement-Sync; Verwaltung über Stripe Customer Portal.

### 12.3 Free/Pro/Squad-UX
- Limits sichtbar, nie klammheimlich: „2/3 Watchlist-Slots belegt". Gesperrte Features sichtbar mit klarem Upgrade-CTA (kein Dark Pattern, keine Fake-Timer).
- Team-Kontext-Switcher im Header (persönlich ↔ Team X) – alle Seiten sind kontextsensitiv.

### 12.4 Technische Eckpunkte
- Next.js (App Router), TanStack Query für Server-State, WebSocket-Hook für Live-Daten mit Polling-Fallback; Map-Viewer als eigenes Package (`packages/ui`-nah) mit Renderer-Abstraktion (Canvas 2D zuerst, WebGL wenn Heatmap-Layer kommen); i18n von Beginn an (EN/DE), SEO auf öffentlichen Server-/Map-Seiten (Server-Detailseiten sind organischer Traffic-Magnet).

---

# 13. Desktop App Architektur

### 13.1 Tech-Stack-Entscheidung: **Tauri 2** (Rust-Core + Web-Frontend)
| Kriterium | Tauri | Electron | Native (WPF/WinUI) |
|---|---|---|---|
| Bundle-Größe/RAM | ★★★ (~10–20 MB) | ★☆☆ (100 MB+) | ★★★ |
| Frontend-Wiederverwendung (React aus `packages/ui`) | ★★★ | ★★★ | ☆☆☆ |
| Parser-Integration (Rust-Crate direkt) | ★★★ | ★★☆ (NAPI) | ★☆☆ |
| Auto-Update | ★★★ (integriert, signiert) | ★★★ | ★★☆ |
| Team-Effizienz | ★★★ | ★★☆ | ★☆☆ |

→ **Tauri**: Der Map-Parser (Rust) wird direkt eingebunden; UI teilt Komponenten mit dem Web. Electron nur als Fallback, falls Tauri-spezifische Blocker auftreten (WebView2-Kompatibilität auf alten Windows-Versionen prüfen **[Prüfpunkt]**).

### 13.2 Funktionsumfang
- **Login/Lizenz:** OAuth-Flow über Systembrowser (PKCE) → Device-Token; Lizenz-/Entitlement-Check beim Start + periodisch; Offline-Grace 72 h (signiertes, zeitlich begrenztes Entitlement-Token lokal); Feature-Gates identisch zur Web-Logik.
- **Live HUD / Second Screen:** Kompakt-Fenster „Always on top" optional: Live-Map (Rust+), Team-Leiste, Event-Ticker, Shop-Suche, Alarm-Popups mit Sound. Kein Overlay-Injection ins Spiel – nur normales Fenster für Zweitmonitor/Alt-Tab. (Browser-Source-Variante für OBS-Streamer als Bonus.)
- **Map-Datei-Watcher + lokaler Parser:** Wie 9.2/9.12; Ergebnisse in lokalem SQLite-Cache; „Neue Map erkannt → analysieren?"-Prompt (nie stillschweigend hochladen).
- **Notifications:** Windows-Toast + Sound-Profile (Raid-Alarm laut, Events dezent).
- **Auto-Update:** Signierte Releases (Code-Signing-Zertifikat einplanen – Kostenpunkt/SmartScreen-Reputation), Kanäle stable/beta, Delta-Updates.

### 13.3 Harte technische Grenzen (Anti-Cheat-Sicherheit)
Verbindlich dokumentiert in `docs/boundaries.md` und in Code-Reviews durchgesetzt:
1. Kein Lesen/Schreiben von Spielprozess-Speicher, keine Injection, kein Hooking, keine Overlays im Spielfenster (auch keine „harmlosen").
2. Keine Interaktion mit dem Spielprozess (keine Fenster-Handles, keine Input-Simulation ins Spiel).
3. Dateisystemzugriff ausschließlich lesend auf vom Nutzer bestätigte Ordner (Map-Verzeichnis).
4. Netzwerkzugriffe nur: unsere API, Rust+-App-Ports (identisch zur offiziellen App), CDN.
5. Kein Paket-Sniffing des Spieletraffics.
→ Diese Liste ist zugleich Marketing-Aussage („EAC-safe by design – wir fassen das Spiel nicht an") und juristische Schutzlinie. **[Prüfpunkt: EAC-/Facepunch-Richtlinien einmal formell reviewen, um Aussagen abzusichern.]**

---

# 14. Systemarchitektur

### 14.1 Übersicht
```
                                   ┌────────────────────────── CDN (Cloudflare) ───────────────────────────┐
                                   │  Static Assets · Map-Kacheln/Bilder (R2) · Web-App                    │
                                   └───────────────────────────────────────────────────────────────────────┘
   Clients: Web (Next.js) · Desktop (Tauri) · Discord Bot · (später Public API-Clients)
        │                    │                     │
        ▼                    ▼                     ▼
   ┌──────────────────────────────────────────────────────┐        ┌──────────────────────┐
   │              API Gateway / Backend API               │◄──────►│  Realtime Gateway    │
   │  (NestJS: REST + Auth + Entitlements + Admin)        │  Redis │  (WS, Topics, Fanout)│
   └──────┬───────────────┬───────────────┬───────────────┘ Pub/Sub└──────────▲───────────┘
          │               │               │                                    │
          ▼               ▼               ▼                                    │
   ┌────────────┐  ┌────────────┐  ┌────────────┐   Events (Redis Streams/BullMQ)
   │ Postgres + │  │   Redis    │  │  Object    │◄──────────────┬──────────────┴─────────────┐
   │ Timescale  │  │ Cache/Queue│  │ Storage R2 │               │                            │
   └────────────┘  └────────────┘  └────────────┘               │                            │
          ▲               ▲               ▲                     │                            │
   ┌──────┴───────────────┴───────────────┴──────┐   ┌──────────┴─────────┐   ┌──────────────┴───────────┐
   │            Worker-Ebene (BullMQ)            │   │ Rust+ Connector    │   │ Discord Bot Service      │
   │ • BM-Poller  • RustMaps-Jobs  • Wipe-Detect │   │ Service (stateful, │   │ (Shards, dünner Client)  │
   │ • Map-Parser-Service (Rust)  • Aggregation  │   │ WS je Server/Team) │   └──────────────────────────┘
   │ • Alert Engine  • Notification Service      │   └────────────────────┘
   │ • Scheduler (cron: Reminder, Retention)     │
   └─────────────────────────────────────────────┘
   Querschnitt: Billing (Stripe Webhooks) · Auth · Logging/Tracing (OTel) · Metrics (Prometheus/Grafana) · Sentry · Admin-Tools
```

### 14.2 Service-Schnitt & Begründung
| Service | Zustand | Warum eigener Prozess |
|---|---|---|
| Backend API | stateless | Skaliert horizontal, klassisches Request/Response |
| Realtime Gateway | leichtgewichtig stateful (Socket-Registry in Redis) | WS-Verbindungen von API-Deploys entkoppeln |
| Worker | stateless (Jobs) | Lastspitzen (Wipe-Donnerstag!) isolieren, unabhängig skalieren |
| Rust+ Connector | **stateful** | Langlebige Sockets, Konsistenz-Hashing, eigener Deploy-Rhythmus (riskanteste Komponente isolieren) |
| Map Parser | stateless, speicherintensiv | Eigenes Ressourcenprofil (RAM), Queue-getrieben |
| Discord Bot | Gateway-stateful | Discord-Sharding-Modell |
| Billing-Logik | im API-Prozess (Modul) + Webhook-Handler | Kein eigener Service nötig in v1 |
- **Kein Microservice-Zoo:** Start als **Modular Monolith** (API + Worker im selben Repo/Deploy-Artefakt, getrennte Prozesse) + die zwei zwingend eigenständigen Dienste (Rust+ Connector, Discord Bot). Alles Weitere erst bei nachgewiesenem Bedarf abspalten.

### 14.3 Datenflüsse (Beispiele)
- **Pop-Update:** BM-Poller → Snapshot in Timescale + Redis → Event `server.updated` → Realtime Gateway → Web/Desktop; Alert Engine konsumiert dasselbe Event.
- **Cargo-Alert:** Connector Marker-Diff → `rustplus.event.cargo_spawned` → Alert Engine matcht Regeln → Notification Service → Discord-Queue + Web-Push + WS.
- **Map-Analyse:** Wipe erkannt → RustMaps-Job → `map_records` → (optional) Parser-Job → Kacheln nach R2 → `map.ready`-Event.

---

# 15. Empfohlener Tech Stack

| Bereich | Empfehlung | Begründung |
|---|---|---|
| Sprache (Plattform) | **TypeScript** (strict) durchgängig für API, Web, Bot, Worker | Ein Sprach-Ökosystem für 80 % des Produkts; geteilte Typen in `packages/shared`; größter Talentpool |
| Sprache (Parser) | **Rust** | Siehe 9.9: Performance, Tauri-Integration, WASM-Option |
| Frontend | **Next.js 14+ (App Router) + React + Tailwind + shadcn/ui-Basis mit eigenem Theme** | SEO für öffentliche Seiten, RSC für schnelle Detailseiten, eigenes Designsystem (bewusst eigenständige Optik – Abgrenzungspflicht!) |
| State/Data | TanStack Query + Zustand (leicht) | Server-State sauber getrennt von UI-State |
| Backend | **NestJS (auf Fastify-Adapter)** | Struktur/DI/Module für Teamarbeit; Guards/Interceptors für Entitlements; Fastify-Performance. Alternative Fastify-pur, wenn Team NestJS-Overhead scheut – Entscheidung in Phase 1 fixieren |
| ORM | **Drizzle ORM** + SQL-Migrations | Typsicher, nah an SQL (wichtig für Timescale-Features); Prisma-Alternative akzeptabel, aber Timescale/Raw-SQL-Anteil spricht für Drizzle |
| Datenbank | **PostgreSQL 16 + TimescaleDB** | Relationale Kerndaten + erstklassige Zeitreihen (Snapshots, Preise) in einer Technologie; Continuous Aggregates für Charts |
| Cache | **Redis** (Managed) | Cache, Pub/Sub, Rate-Limit-Buckets, Socket-Registry |
| Queue | **BullMQ** (auf Redis) | Ausreichend robust, Delays/Retries/Prioritäten, kein Kafka-Overhead in dieser Größenordnung |
| Realtime | **WebSocket via uWebSockets.js/Socket.IO im eigenen Gateway** + Redis Pub/Sub Fanout | Kontrolle über Topics/Auth; Socket.IO-Fallbacks helfen bei Consumer-Netzen |
| Desktop | **Tauri 2** | Siehe 13.1 |
| Discord | **discord.js v14+** | Reifste Bibliothek, Sharding, Rate-Limit-Handling |
| Rust+ | Eigenes Package `packages/rustplus` (TS), initial angelehnt an bewährte Community-Protokoll-Implementierungen (Lizenz beachten, MIT ist üblich **[Prüfpunkt]**), eigener Code | Kontrolle über Reconnect/Multiplexing; Protokoll-Adapter austauschbar |
| Auth | **Eigene Auth im API (Lucia-artig) oder Auth.js**: E-Mail+Passkey/Magic-Link, Discord-OAuth, Steam-OpenID; Sessions: httpOnly-Cookie (Web) + kurzlebige JWT für Desktop/Bot-Service | Multi-Client (Web/Desktop/Bot) braucht flexible Token-Ausgabe; kein Vendor-Lock bei so zentraler Komponente |
| Billing | **Stripe** (Checkout + Customer Portal + Webhooks, Entitlement-Sync in eigener DB) | Standard, EU-tauglich (SEPA, Steuer via Stripe Tax) |
| Hosting | **Hetzner (EU) mit Docker/K3s oder Fly.io**; DB: managed (z. B. Timescale Cloud/Neon+Ext. prüfen **[Prüfpunkt]**); Storage/CDN: **Cloudflare R2 + CDN** | Kostenkontrolle (Gaming-Publikum = preissensitives Pricing), EU-Datenhaltung (DSGVO), R2 ohne Egress-Kosten für Map-Kacheln |
| Monitoring | **Prometheus + Grafana + Loki** (selbst) oder Better Stack (managed) + **Sentry** + Uptime-Checks + Statuspage | Ops-Kosten klein halten, aber Wipe-Donnerstag sichtbar machen |
| CI/CD | **GitHub Actions** + Turborepo Remote Cache; Deploy via Docker-Images + GitOps-Light (Tags → Environments) | Monorepo-freundlich, günstig |
| Testing | Vitest (Unit), Testcontainers (Integration), Playwright (E2E), cargo test/fuzz (Parser), k6 (Load) | Siehe Abschnitt 28 |

---

# 16. Datenbankmodell

Konventionen: `id` = UUIDv7 (zeitlich sortierbar), `created_at`/`updated_at` überall, Soft-Delete via `deleted_at` wo sinnvoll. FKs mit `ON DELETE`-Strategie je Fall. (Auszug der wichtigen Felder, kein vollständiges DDL.)

| Tabelle | Wichtige Felder | Hinweise |
|---|---|---|
| **users** | email (uniq, nullable bei reinem OAuth), password_hash (nullable), display_name, avatar_url, discord_id (uniq, nullable), steam_id64 (uniq, nullable), locale, notification_prefs JSONB, role (user/staff/admin), email_verified_at, last_login_at | PII-minimal; SteamID nur bei Opt-in-Login |
| **sessions** | user_id FK, token_hash, client (web/desktop/bot), ip_hash, user_agent, expires_at, revoked_at | Tokens nur gehasht speichern |
| **subscriptions** | owner_type (user/team), owner_id, stripe_customer_id, stripe_subscription_id, plan (free/pro/squad/clan/owner/lifetime), status, seats_total, current_period_end, cancel_at, trial_end | Eine aktive Sub je Owner; Entitlements werden hieraus materialisiert |
| **licenses** | user_id FK, subscription_id FK, kind (desktop/api), key_hash, device_fingerprint_hash, last_check_at, revoked_at | Desktop-Lizenzprüfung; Fingerprint nur gehasht |
| **teams** | name, slug, owner_user_id, plan_inherited (bool), settings JSONB, avatar_url | „Team" = Squad oder Clan |
| **team_members** | team_id, user_id, role (owner/manager/member/custom_ref), seat_assigned (bool), invited_by, joined_at | uniq(team_id,user_id) |
| **rust_servers** | name, ip, port, query_port, battlemetrics_id (uniq, nullable), region, country, rank, max_players, is_modded, wipe_schedule JSONB (geparst+manuell), rustplus_port, current_map_record_id FK, status, last_seen_at, header_image_url, description | Zentrale Entität; Quellen-agnostisch |
| **battlemetrics_snapshots** (Hypertable) | ts, server_id, players, max_players, queue, status, fps, entity_count, rank | Timescale; Aggregates: 5m/1h/1d |
| **map_records** | seed (nullable bei Custom), size, map_name, source (rustmaps/parser/rustplus), rustmaps_id, image_urls JSONB, tile_base_url, parsed_artifact_url, parser_version, file_hash (Custom), biome_stats JSONB, monument_count, first_seen_at | uniq(seed,size,source-Priorität) mit Merge-Logik |
| **monuments** | map_record_id, prefab_path, display_name, category, x, y (normiert 0..1), world_x, world_z, grid_ref, attributes JSONB (recycler, keycard_tier, cctv, tunnel) | Aus RustMaps und/oder Parser, dedupliziert |
| **map_prefabs** | map_record_id, prefab_id (uint), prefab_path (nullable bis Manifest-Match), category, world_x/y/z, rot JSONB, scale JSONB | Nur Parser; ggf. partitioniert (groß!) |
| **wipes** | server_id, detected_at, kind (map/full/unknown), confidence, seed_before/after, size_before/after, map_record_id, source (detected/announced/manual) | Wipe-Archiv |
| **rustplus_connections** | user_id, team_id (nullable), server_id, steam_id64, player_token_enc (bytea), push_credentials_enc, status (active/revoked/error), last_ok_at, error_count | Tokens verschlüsselt (Envelope) |
| **smart_devices** | connection_scope (team_id/user_id), server_id, entity_id, kind (switch/alarm/storage), name, room/group, config JSONB (auto_actions), last_state JSONB, paired_by | |
| **device_actions** (Audit-nah) | device_id, actor_user_id, action, source (web/discord/desktop/rule), result, ts | Schalt-Historie |
| **vending_machines** | server_id, map_marker_id, x,y, name, last_seen_at | |
| **vending_offers** | vending_id, item_id, qty, currency_item_id, price, stock, ts (Hypertable für Preis-Historie) | |
| **discord_guilds** | guild_id (uniq), team_id (nullable), owner_discord_id, premium_until, locale, settings JSONB | |
| **discord_channels** | guild_id FK, channel_id, purpose (alerts/status/events/chat_relay), filters JSONB, format JSONB | |
| **alerts** (Regeln) | owner_type/owner_id (user/team/guild), name, trigger_type, conditions JSONB, channels JSONB (discord/webpush/desktop/email), quiet_hours JSONB, cooldown_s, enabled, plan_tier_required | Regelwerk, siehe 19 |
| **alert_events** (Hypertable) | alert_id, ts, trigger_payload JSONB, deliveries JSONB (status je Kanal), dedup_key | Verlauf + Idempotenz |
| **player_profiles** | steam_id64 (uniq), display_name_cached, ownership: user_id (nullable, „das bin ich"-Claim), team_notes ausgelagert | **Bewusst minimal**; keine Fremd-Tracking-Historie (siehe 21/25) |
| **team_notes** | team_id, subject_type (player/spot/general), subject_ref, text, created_by | Nutzergenerierte Threat-/Spot-Notizen |
| **api_keys** | owner_type/owner_id, key_hash, scopes JSONB, rate_tier, last_used_at, revoked_at | Public API (später) |
| **audit_logs** (append-only) | actor_user_id, owner_scope, action, target_type/target_id, meta JSONB, ip_hash, ts | Admin + Team-Audit |
| **feature_flags / entitlements (materialisiert)** | owner_type/owner_id, flag, value, source (plan/override/experiment), expires_at | Eine Lese-Wahrheit für API/Bot/Desktop |

---

# 17. API Design

REST (JSON), versioniert unter `/v1`, OpenAPI-Spec als Vertrag (generierte TS-Clients für Web/Bot/Desktop). GraphQL bewusst nicht in v1 (Overhead > Nutzen bei kontrollierten First-Party-Clients).

**Auth:** `POST /v1/auth/register|login|logout`, `POST /v1/auth/oauth/discord|steam` (+Callback), `POST /v1/auth/token/refresh`, `GET /v1/me`, `POST /v1/auth/desktop/device` (PKCE-Device-Flow).

**Servers:** `GET /v1/servers/search?q=&region=&minPop=…` · `GET /v1/servers/:id` · `GET /v1/servers/:id/history?range=24h|7d|wipe` · `GET /v1/servers/:id/wipes` · `POST /v1/servers` (manuell) · `POST/DELETE /v1/watchlist/:serverId` (`?team=`).

**Maps:** `GET /v1/maps/:id` (Metadaten, Layer-URLs, Monumente) · `GET /v1/maps/lookup?seed=&size=` · `GET /v1/maps/:id/monuments` · `GET /v1/maps/:id/analysis` (Ratings/Heatmap-Layer, Pro) · `POST /v1/maps/parse-result` (Desktop-Upload, signiert).

**Wipes:** `GET /v1/wipes/upcoming?watchlist=1` · `GET /v1/servers/:id/wipes/prediction`.

**Rust+:** `POST /v1/rustplus/pairing/start` → `GET /v1/rustplus/pairing/:sessionId` (Status-Poll/WS) · `GET /v1/rustplus/connections` · `DELETE /v1/rustplus/connections/:id` · `GET /v1/rustplus/servers/:id/team|events|vending` · `GET /v1/rustplus/vending/search?item=` · `POST /v1/rustplus/chat` (Gate) · `GET/POST /v1/devices`, `POST /v1/devices/:id/actions` (on/off), `GET /v1/devices/:id/history`.

**Discord:** `GET /v1/discord/guilds` (wo Nutzer Admin + Bot installiert) · `POST /v1/discord/guilds/:id/bind` · `GET/PUT /v1/discord/guilds/:id/settings|channels` · interne Bot-Endpunkte unter `/internal/bot/*` (mTLS/Service-Token).

**Alerts:** `GET/POST /v1/alerts` · `GET/PUT/DELETE /v1/alerts/:id` · `POST /v1/alerts/:id/test` · `GET /v1/alerts/:id/events` · `POST /v1/alerts/:id/mute?for=1h`.

**Teams:** `GET/POST /v1/teams` · `GET/PUT /v1/teams/:id` · `POST /v1/teams/:id/invites` · `POST /v1/invites/:code/accept` · `PUT/DELETE /v1/teams/:id/members/:userId` (Rolle/Seat) · `GET /v1/teams/:id/audit`.

**Billing:** `GET /v1/billing/plans` · `POST /v1/billing/checkout` (plan, seats) · `POST /v1/billing/portal` · `GET /v1/billing/entitlements` · `POST /v1/webhooks/stripe` (signiert, idempotent).

**Admin (`/v1/admin/*`, Staff-Rollen + 2FA):** users/search, entitlement-overrides, feature-flags, guild-blocklist, poller-status, rustplus-fleet-status, announcements, GDPR-Export/Delete-Trigger.

Querschnitt: Cursor-Pagination, `ETag`/`If-None-Match` auf teuren GETs, Rate-Limits per Token-Bucket (Header `X-RateLimit-*`), Fehlerformat RFC 7807 (`application/problem+json`).

---

# 18. Realtime Design

### 18.1 Topics (WS-Subscriptions, Auth-geprüft je Topic)
```
server:{id}:status          Pop/Queue/Status-Deltas (aus BM-Poller)
server:{id}:events          Rust+-Events (cargo/heli/crate…) – nur mit Berechtigung
team:{id}:presence          Online/Alive/Positionen (throttled)
team:{id}:chat              Teamchat-Relay (Opt-in)
team:{id}:devices           Smart-Device-Statuswechsel
user:{id}:notifications     Persönliche Zustellungen (Alert ausgelöst, Billing)
map:{id}:progress           „Map wird generiert/geparst"-Status
```

### 18.2 Mechanik
- Gateway authentifiziert per kurzlebigem WS-Ticket (von API ausgestellt), prüft Topic-ACL bei Subscribe, hält Registry `topic → sockets` lokal, Fanout via Redis Pub/Sub zwischen Gateway-Instanzen.
- **Delta-first:** Events tragen Deltas + Sequenznummer; Client kann bei Lücke `GET`-Resync fahren (Snapshot-Endpunkt je Topic).
- **Throttling/Debouncing:** Positions-Updates max. 1/2 s je Team-Topic (Server-seitig gebündelt); Pop-Updates max. 1/30 s; Event-Alerts sofort (Prioritätsklasse).
- **Backpressure:** Pro Socket Sende-Queue mit Limit; langsamer Client → Positions-Frames droppen (nur „latest wins"-Klassen), kritische Events niemals droppen, notfalls Socket mit Resync-Hinweis trennen.
- **Offline Handling:** Web/Desktop puffern letzten Snapshot; Reconnect mit `since=seq`; verpasste *Alerts* kommen ohnehin über persistente Kanäle (Discord/Push) – WS ist Komfort, nie einzige Zustellung für Kritisches.
- Rate Limiting eingehend: Subscribe-Anzahl je Verbindung plangebunden; Command-Frames (z. B. Device-Toggle) laufen nicht über WS, sondern REST (Audit + Idempotenz einfacher).

---
# 19. Alert Engine

### 19.1 Architektur
Regelbasierte Engine als eigener Worker-Verbund: **Event-Quellen** (BM-Poller, Wipe-Detector, Rust+-Diff-Engine, Scheduler) publizieren normalisierte Events auf den Bus → **Matcher** lädt aktive Regeln (Redis-Cache, invalidiert bei Regeländerung) und wertet Bedingungen aus → **Dispatcher** erzeugt idempotente Zustell-Jobs je Kanal → **Notification Service** liefert aus (Discord-Queue, Web-Push/VAPID, Desktop-WS+Toast, E-Mail für Digest-Fälle).

**Regelmodell (`alerts.conditions` JSONB):**
```json
{
  "trigger": "server.wipe_upcoming",
  "conditions": { "server_id": "…", "lead_minutes": 120 },
  "channels": [{ "type": "discord", "channel_ref": "…" }, { "type": "webpush" }],
  "cooldown_s": 3600,
  "quiet_hours": { "tz": "Europe/Berlin", "from": "01:00", "to": "07:00", "override_for": ["rustplus.alarm"] },
  "dedup": "server:{server_id}:wipe:{wipe_id}"
}
```

### 19.2 Trigger-Katalog (v1 → v2)
| Trigger | Quelle | Bedingungen (Beispiele) | Prio |
|---|---|---|---|
| `server.wipe_upcoming` | Scheduler + Wipe-Prediction | lead_minutes, nur Watchlist | P0 |
| `server.wiped` | Wipe-Detector | sofort | P0 |
| `server.pop_threshold` | BM-Poller | players ≥/≤ X, „Server voll", „Slots frei" | P0 |
| `server.queue_rising` | BM-Poller | queue ≥ X oder Δqueue/10min ≥ Y | P1 |
| `server.offline/online` | BM-Poller | Statuswechsel, entprellt (2 Polls) | P0 |
| `rustplus.cargo_spawned` / `heli` / `chinook` / `crate_dropped` / `crate_unlocking` | Marker-Diff | Server-gebunden | P0 |
| `rustplus.alarm_triggered` | Smart-Alarm-Broadcast | Gerät/Gruppe; **Quiet-Hours-Override standardmäßig an** | P0 |
| `rustplus.team_member_died` / `_offline` | Team-Diff | Mitglied/alle | P1 |
| `rustplus.vending_item_listed` | Vending-Diff | item_id, max_price, Radius/Grid | P1 |
| `device.storage_low` (Upkeep) | Storage-Monitor | Restlaufzeit < X h | P2 |
| `base.decay_reminder` | Scheduler (manuell konfiguriert) | alle X h ohne Storage-Monitor | P2 |

### 19.3 Qualitäts-Regeln (das, was Alert-Systeme sonst kaputt macht)
- **Dedup-Key pro Ereignisinstanz** (z. B. Cargo-Marker-ID) → nie zweimal derselbe Alarm, auch nach Worker-Restart.
- **Cooldown & Aggregation:** Flackernde Bedingungen (Pop um Schwelle) → Hysterese (±5) + Cooldown; Event-Stürme → Bündel-Embed.
- **Quiet Hours** mit expliziten Overrides (Raid-Alarm darf wecken, Cargo nicht – Nutzerentscheidung).
- **Zustell-Nachweis:** `alert_events.deliveries` je Kanal (queued/sent/failed+reason) → sichtbar im Dashboard („Warum kam nichts an?" → „Bot fehlt Berechtigung in #alerts").
- **Test-Button** je Regel (sendet Fake-Payload durch die echte Pipeline).
- Plan-Gating: Anzahl Regeln, verfügbare Trigger-Typen, minimale Latenzklasse (Free = Standard-Queue, Pro = Prioritäts-Queue).

---

# 20. Map Intelligence

Aufbauend auf `map_records` + `monuments` + Parser-Layern. Alle Scores transparent erklärbar („Warum 82/100?") – Blackbox-Scores zerstören Vertrauen.

### 20.1 Monument-Index
Je Map: Liste aller Monumente mit Kategorie, Grid, Attributen aus der Monument-Registry (Recycler, Keycard-Tier Green/Blue/Red, CCTV, Tunnel-Anschluss, Safezone). Aggregat-Kacheln: „2× Large Harbor, Launch Site, kein Airfield" – wichtiges Server-Auswahlkriterium.

### 20.2 Abgeleitete Analysen
| Analyse | Methode | Datenbasis |
|---|---|---|
| Recycler-Standorte | Registry-Attribut je Monument (+Outpost/Bandit) | Monumente |
| Keycard-Routen | Graph: Monumente nach Tier, kürzeste Road-/Luftlinien-Pfade Green→Blue→Red, geschätzte Laufzeit (Distanz/Speed-Konstante) | Monumente + Road-Graph |
| Nähe Outpost/Bandit | Distanzfeld ab Safezone-Monumenten | Monumente |
| Oil/Cargo-Relevanz | Küstendistanz, Harbor-Positionen, Rig-Distanzen | Monumente + Wasser-Layer |
| Straße/Schiene/Wasser-Zugang | Distanz zu nächster Road/Rail/River/Küste je Rasterzelle | Paths + Topologie |
| Resource-Heatmap | Modellierte Node-Dichte (Biome×Topo×Höhe), „geschätzt"-Label | Parser-Layer |
| PvP-Risiko-Zonen | Heuristik: Nähe zu High-Tier-Monumenten, Chokepoints (Brücken, Rig-Piers), Ring-Road-Hotspots | Monumente + Paths |
| **Base-Spot-Rating** | Raster-Score je Zelle: buildable (Topology-Bits!) × Ressourcen-Nähe × Recycler-Distanz × Risiko-Inversion × Wasser-/Cliff-Schutz; Presets „Solo versteckt", „Squad kompakt", „Clan-Kompound" (Flächenbedarf!) | alle Layer |
| Clan-Tauglichkeit (Map) | Große flache buildable Areale, Monument-Dichte, Rig/Cargo-Zugang | Layer-Aggregat |
| Anfängerfreundlichkeit | Safezone-Nähe, Tier-1-Dichte, geringe Chokepoint-Dichte | Layer-Aggregat |
| Wipe-Start-Empfehlung | „Beach-Spawn-Segmente → beste erste Route zu Ziel-Spot" (Road-Graph + Rating) | alle |

### 20.3 Umsetzungshinweise
- Alles als **vorproduzierte Layer/GeoJSON je map_record** (Worker-Job nach Parse/RustMaps-Import), nichts live im Request rechnen.
- Ratings versionieren (`analysis_version`) → Verbesserungen messbar, Nutzerdiskussionen nachvollziehbar.
- Community-Feedback-Loop: „War dieser Spot gut?" (Daumen) → Trainingssignal für Gewichte (später).
- Ohne Parser (nur RustMaps): Teilmenge verfügbar (Monument-basierte Analysen); Heatmaps/Buildable erst mit Parser-Daten → Feature-Matrix im UI ehrlich anzeigen.

---

# 21. Threat / Death Intelligence (ethisch sauber)

**Grundsatz:** Nur Daten, die (a) der Nutzer über sein eigenes Rust+-Pairing legitim erhält, (b) sein Team betreffen, oder (c) er selbst manuell einträgt. **Kein** serverweites Spieler-Tracking, **kein** Aufbau von Fremdspieler-Dossiers, **keine** Kill-Feeds aus Quellen, auf die der Nutzer kein Recht hat.

| Frage | Antwort |
|---|---|
| Was liefert Rust+? | Team-Status (online/alive/tot, Positionen), Teamchat, offizielle Map-Marker. **Keine Gegner-Positionen, keine Kill-Meldungen mit Killer-Namen** **[Prüfpunkt: exakter Feldumfang von TeamInfo/Broadcasts]** |
| Was liefert Teamchat? | Nur was Menschen schreiben; Spiel-Systemmeldungen erscheinen dort nicht zuverlässig → keine automatische Killer-Extraktion versprechen |
| Was ginge nur mit Serverrechten? | Vollständige Kill-/Combat-Logs (RCON/Server-Console) → **nur** im späteren Server-Owner-Modul, nur für dessen eigenen Server, mit eigener Rechtsprüfung **[Prüfpunkt]** |

**Feature-Ableitung (erlaubt):**
- **Team-Death-Log:** Zeitpunkt + letzte bekannte Position aus Team-Diff („Max ist um 21:14 bei K12 gestorben") + Discord-Report.
- **Alarm-Korrelation:** Smart-Alarm + zeitgleiche Team-Tode → „Raid-Verdacht auf Basis Nord" (rein eigene Daten).
- **Team-History:** Session-Zeiten des eigenen Teams (wer war wann on) für Clan-Organisation.
- **Nemesis/Threat-Notizen:** Manuell gepflegte Team-Notizen zu Gegnern (Name, Basis-Grid, Verhalten) – nutzergeneriert, teamintern, löschbar; **kein globaler, teamübergreifender Spieler-Score.** BattleMetrics-Spieler-Session-Daten bleiben in v1 ungenutzt; jede spätere Nutzung nur nach dedizierter Datenschutz-/Terms-Prüfung (Abschnitt 25).

---

# 22. Smart Devices

| Aspekt | Planung |
|---|---|
| Gerätetypen v1 | Smart Switch (schalten), Smart Alarm (empfangen), Storage Monitor (lesen). Turrets/Lights nur, sofern sie als schaltbare Entities über Switches laufen – direkte Turret-Steuerung nur falls Protokoll-legitim **[Prüfpunkt]** |
| Pairing | Wie 10.2; Gerät gehört einem Scope (User oder Team), benennbar, gruppierbar (Raum/Funktion) |
| Steuerung | Web (Device-Board mit Gruppen), Discord `/switch`, Desktop-HUD; alle über denselben REST-Endpunkt `POST /devices/:id/actions` |
| Permissions | Team-Rollen: `device_operator` nötig; kritische Geräte einzeln auf Rollen einschränkbar; Free/Solo: nur eigene Geräte |
| Audit | Jede Aktion in `device_actions` (wer, was, woher, Ergebnis) + Team-Audit-Feed |
| Sicherheitsrisiken | Fremdschalten nach Team-Kick → bei Team-Austritt Geräte-Zugriff sofort entziehen; Rate-Limit gegen Toggle-Spam (Server-Last!); Bestätigungsdialog für Gruppen-Aktionen; kein öffentlicher Schalt-Endpoint |
| Automationen (P2) | Regeln: „Alarm X → Switch Y an", Zeitpläne, „alle aus bei Team offline" – über Alert Engine als Action-Typ |

---

# 23. Billing und Lizenzsystem

### 23.1 Pläne (Startaufstellung, Preise = **[Annahme]**, vor Launch mit Umfrage/AB-Test validieren)
| Plan | Preis (Monat) | Kern-Limits |
|---|---|---|
| **Free** | 0 € | 1 Watchlist-Server, 2 Alert-Regeln, 24h-Charts, 1 Rust+-Verbindung, Basis-Bot-Commands |
| **Pro Solo** | ~4,99 € | 10 Server, 20 Alerts, volle Historie, 3 Rust+, Map-Analyse Basis, Prioritäts-Alerts |
| **Squad** | ~9,99 € (inkl. 4 Seats, +1,50 €/Seat) | Team-Features, geteilte Alerts/Watchlists, Device-Rollen, Map-Analyse Pro |
| **Clan/Team** | ~24,99 € (inkl. 12 Seats, Staffelpreis) | Multi-Roster, Audit, erweiterte Limits, Priority Support |
| **Server Owner** | ~14,99 € je Server | Claim/Badge, Owner-Analytics, Community-Widgets, Wipe-Automation |
| **Discord Bot Premium** | ~4,99 € je Guild (Add-on, in Squad+ enthalten) | Status-Channel, Event-Feeds, erweiterte `/`-Features |
| **Lifetime** | Optional, limitierte Aktionen (~3× Jahrespreis) | Marketing-Hebel; Vorsicht: dauerhafte API-Kosten → nur für Pro Solo anbieten |
| Trial | 7 Tage Squad-Trial ohne Zahlungsmittel (Abuse-limitiert: 1×/Discord-ID+E-Mail-Domain-Heuristik) | |

### 23.2 Stripe-Integration
Checkout Sessions (Subscriptions, Seats als quantity), Customer Portal (Self-Service), Stripe Tax (EU-USt!), Webhooks (`checkout.completed`, `subscription.updated/deleted`, `invoice.payment_failed`) → idempotenter Sync in `subscriptions` → Materialisierung in `entitlements`. **Grace-Period** bei Zahlungsfehlschlag: 7 Tage Downgrade-Warnung statt Hard-Cut. Dunning via Stripe.

### 23.3 Entitlement-System (eine Wahrheit für alle Clients)
`GET /billing/entitlements` liefert flachen Flag-Satz (`max_watchlist=10`, `alert_priority=high`, `map_analysis=pro`, …). API-Guards prüfen serverseitig **jede** gated Aktion (Client-Gating ist nur UX). Overrides durch Admin (Support-Fälle, Creator-Programm) mit Ablaufdatum.

### 23.4 Desktop-Lizenzprüfung
Login → API stellt signiertes Entitlement-Token (JWT, 72 h) aus → App prüft Signatur offline, erneuert online; Revocation-Liste beim Refresh. Device-Bindung: Fingerprint-Hash, max. N Geräte je Nutzer (Pro: 2, Squad+: 3) — soft enforcement (ältestes Gerät abmelden), kein aggressives DRM.

### 23.5 Abuse/Fraud
Trial-Abuse-Heuristiken (Disposable-Mail-Liste, Discord-Account-Alter), Stripe Radar, Seat-Sharing-Erkennung (gleicher Seat, parallele Sessions aus disjunkten Regionen → Hinweis statt Sofort-Ban), Refund-Policy klar (14 Tage EU-Widerruf beachten, digitale Leistung mit Verzichtsklausel im Checkout **[Prüfpunkt: mit Anwalt formulieren]**), Chargeback-Prozess dokumentiert.

---

# 24. Datenschutz und Security

| Bereich | Maßnahmen |
|---|---|
| Auth | Argon2id-Hashing, Passkeys/Magic-Link bevorzugt vor Passwort, OAuth (Discord/Steam) mit minimalen Scopes, 2FA (TOTP) für Accounts mit Team-Owner-/Admin-Rolle verpflichtend anbietbar |
| Sessions/JWT | Web: httpOnly+Secure+SameSite-Cookies, Rotation; Desktop/Bot: kurzlebige JWT + Refresh mit Bindung an Client-Typ; zentrale Revocation |
| Encryption at Rest | DB-Volumes verschlüsselt; Feld-Ebene (Envelope/AES-256-GCM) für: Rust+-Player-Tokens, Push-Credentials, API-Keys Dritter; KMS-Master-Key, Rotation jährlich + on-demand |
| Secrets | Secrets Manager (kein .env in Prod), CI-Secrets minimal, Zugriff per Service-Identity, Least Privilege je Service (Connector darf entschlüsseln, API nicht) |
| DSGVO | EU-Hosting; AVV mit allen Prozessoren (Stripe, Cloudflare, Discord…); Datenschutzerklärung mit klarer Quellen-Nennung; **Datenexport** (`/settings` → JSON) und **Löschung** (Self-Service, 30-Tage-Purge inkl. Backups-Policy) automatisiert; PII-Minimierung (SteamIDs nur bei Login/Pairing-Bedarf, IP nur gehasht in Logs); Verzeichnis von Verarbeitungstätigkeiten ab Tag 1 pflegen |
| Datenlöschung Kaskaden | User-Delete → Sessions, Tokens, Connections, Notes anonymisieren/löschen; Guild-Kick → Guild-Daten nach 30 Tagen purgen (Discord-ToS) |
| Rate Limits | API global + je Route + je Token; Login-Bruteforce-Schutz; WS-Subscribe-Limits |
| Abuse Detection | Anomalie-Metriken (Alert-Spam, Toggle-Spam, Scraping-Muster auf Public-Seiten), Blocklists, Admin-Tools |
| Audit | `audit_logs` append-only für sicherheitsrelevante Aktionen (Rollen, Geräte, Billing-Overrides, Admin) |
| AppSec | Dependency-Scanning (Renovate + Audit), SAST in CI, Security-Header/CSP im Web, SSRF-Schutz in allen URL-Fetchern (Header-Image-Proxy!), Input-Validierung (zod) an jeder Grenze |
| Backups | Postgres: PITR + tägliche Snapshots, 30 Tage; R2-Artefakte reproduzierbar (Parser) → 7 Tage; Restore-Drill quartalsweise |

---

# 25. Rechtliche Risikomatrix

> Vor Paid Launch: einmalige Prüfung durch Anwalt (IT-/IP-Recht) für die mit ⚖ markierten Punkte. Diese Matrix ist Arbeitsgrundlage, keine Rechtsberatung.

| # | Risiko | Quelle | Wahrsch. | Auswirkung | Gegenmaßnahme | Entscheidung |
|---|---|---|---|---|---|---|
| 1 | Kommerzielle API-Nutzung ohne passenden Plan/Erlaubnis | BattleMetrics ToS | mittel | hoch (Kernquelle) | Terms lesen, bezahlten Plan abschließen, Use-Case schriftlich bestätigen lassen; zentraler Poller minimiert Last ⚖ | **prüfen → dann erlaubt** |
| 2 | Re-Hosting von Map-Bildern untersagt | RustMaps ToS | mittel | mittel | Partner-Kontakt, kommerziellen Tier + schriftliche Freigabe fürs Caching; sonst Hotlinking+Attribution | **prüfen** |
| 3 | Inoffizielle Rust+-Protokollnutzung; Facepunch ändert/blockt | Facepunch | mittel | hoch (Live-Säule) | Nutzer-eigene Tokens, keine Umgehung von Schutzmaßnahmen, defensives Marketing, Säulen-Isolation, Protokoll-Adapter, Community-Monitoring; proaktiver Kontakt zu Facepunch erwägen ⚖ | **prüfen, mit Risiko-Budget erlaubt** |
| 4 | Vorwurf „Cheat-Tool"/EAC-Konflikt | Facepunch/EAC | niedrig (bei Einhaltung 13.3) | sehr hoch (Reputation) | Harte technische Grenzen (13.3), öffentliche Boundaries-Doku, kein Spielprozess-Kontakt | **erlaubt mit Leitplanken** |
| 5 | `.map`-Parsing = unzulässiges Reverse Engineering? | Rust EULA | niedrig–mittel | mittel | Nur lokale Nutzerdateien, Interop-Zweck, keine Asset-Extraktion/-Verbreitung; EULA-Klauseln prüfen ⚖; Custom-Map-Dateien nicht re-hosten (Urheberrecht der Map-Autoren!) | **prüfen** |
| 6 | Klon-Vorwurf durch Wettbewerber (z. B. RustOnTop) | UWG/Urheberrecht | niedrig (bei Prozess) | mittel | Cleanroom-Regeln: keine Text-/Design-/Asset-Übernahme, keine Feature-1:1-Kopie der Präsentation, eigenes Naming/Branding, Design-Doku der Eigenständigkeit; Markenrecherche „RustMasterTool" ⚖ | **erlaubt mit Prozess** |
| 7 | „Rust" im Produktnamen = Markenrisiko | Facepunch-Marke | mittel | mittel | Beschreibende Nutzung prüfen ⚖; Disclaimer „inoffiziell, nicht mit Facepunch verbunden" überall; Ausweich-Branding vorbereiten | **prüfen (vor Branding-Festlegung!)** |
| 8 | Spieler-Tracking/Dossiers = DSGVO-Verstoß | DSGVO | mittel (wenn gebaut) | hoch | Abschnitt 21-Grenzen: kein Fremd-Tracking; BM-Player-Daten ungenutzt lassen; DPIA falls je geändert | **vermeiden (Feature-Verzicht)** |
| 9 | Discord-Datenhandling (Verifizierung, Löschung) | Discord Dev ToS | niedrig | mittel | Slash-only, Datenminimierung, Purge-Prozesse, Verifizierung rechtzeitig | **erlaubt** |
| 10 | Steam-Login-Bedingungen | Valve | niedrig | niedrig | Nur OpenID+Web-API gemäß Terms, Key nicht teilen | **erlaubt** |
| 11 | EU-Verbraucherrecht (Widerruf, Preisangaben, Impressum) | EU/DE-Recht | sicher relevant | mittel | AGB/Widerruf/Impressum/Datenschutz vom Anwalt ⚖; Stripe Tax | **prüfen → Pflicht** |
| 12 | Server-Owner-Funktionen mit RCON = Sicherheits-/Haftungsrisiko | eigenes Feature | – | hoch | Bis zur eigenen Prüfung nicht bauen (P3) | **vermeiden (vorerst)** |

---
# 26. Entwicklungsphasen

Komplexität: S (< 1 Wo Team-Kapazität), M (1–2 Wo), L (2–4 Wo), XL (> 4 Wo) — bezogen auf ein Team von 2–3 Senior-Entwicklern **[Annahme]**. Reihenfolge wie nummeriert; Phasen 3–7 teilweise parallelisierbar (Backend vs. Bot vs. Web).

| Phase | Ziel | Kern-Features/Aufgaben | Datenmodell | Risiken | Tests / Definition of Done | Kompl. |
|---|---|---|---|---|---|---|
| **0 – Research & Legal Verification** | Alle **[Prüfpunkte]** dieses Dokuments schließen | BM/RustMaps/Facepunch/Steam/Discord-Terms prüfen; Rust+-Pairing-PoC (rustplus.js); `.map`-Format-PoC (Datei finden, dekomprimieren, Prefabs zählen); Markenrecherche; Anwalts-Erstgespräch | – | Blocker entdecken (z. B. RustMaps verweigert) → Fallback-Pfade dieses Dokuments greifen | DoD: Risikomatrix aktualisiert, Go/No-Go je Quelle dokumentiert, 2 PoCs lauffähig | M |
| **1 – Foundation Architecture** | Lauffähiges Monorepo-Skelett bis Prod | Turborepo, CI/CD, Docker, Environments (dev/staging/prod), Postgres+Timescale, Redis, R2, OTel/Sentry/Grafana, OpenAPI-Skeleton, `packages/shared` | Basis-Migrations-Setup | Overengineering → strikt Skelett | DoD: „Hello World" aller Apps deployt automatisch nach staging+prod; Dashboards zeigen Metriken | M |
| **2 – Account/Auth/Billing Foundation** | Nutzer können existieren & zahlen | Registrierung/Login, Discord-OAuth, Sessions, Teams v0 (create/invite), Stripe Checkout+Portal+Webhooks, Entitlements, Admin-Panel v0 | users, sessions, teams, team_members, subscriptions, entitlements, audit_logs | Webhook-Idempotenz; Auth-Fehler = Totalschaden | Billing-Testsuite (Stripe-CLI-Fixtures), Auth-E2E; DoD: Test-Abo end-to-end inkl. Downgrade | L |
| **3 – BattleMetrics Server Intelligence** | Server-Säule komplett (Backend) | BM-Client-Package, zentraler Poller mit Klassen, Snapshots, Suche-API, Watchlists, Wipe-Detector v1, Charts-Aggregate | rust_servers, battlemetrics_snapshots, wipes, watchlist | Rate Limits; Schema-Drift | Contract-Tests gegen aufgezeichnete BM-Responses; DoD: 500 Server 7 Tage stabil gepollt, Wipe-Erkennung ≥ 95 % auf Referenzset | L |
| **4 – RustMaps Map Intelligence** | Maps sichtbar | RustMaps-Client, Lookup-Pipeline (Wipe→Map), map_records/monuments, Bild-Handling gemäß Terms, Map-API | map_records, monuments | Terms/Quota | DoD: Jeder neue Wipe eines beobachteten Servers hat < 15 min später Map+Monumente | M |
| **5 – Discord Bot Core** | Distributionskanal live | Bot-App, `/bind /server /status /pop /wipe /map /monuments /settings`, Guild-Konfig, Zustell-Queue | discord_guilds, discord_channels | Discord-Verifizierung (ab 100 Guilds) rechtzeitig | Bot-Integrationstests (Mock-Gateway); DoD: Setup-Flow < 2 min, 20 Test-Guilds stabil | L |
| **6 – Web Dashboard v1** | Self-Service-Produktkern | Landing, Suche, Server-Detail (Charts, Wipes), Watchlist, Team-UI, Billing-UI, Settings | – | Scope-Creep | Playwright-E2E der Kernflows; DoD: Onboarding→beobachteter Server < 3 min ohne Doku | L |
| **7 – Alert Engine v1** | Erste zahlungsrelevante Alerts | Engine (Matcher/Dispatcher), Trigger: wipe_upcoming/wiped/pop/offline, Kanäle Discord+Web-Push, Regel-UI, Verlauf | alerts, alert_events | Zustell-Zuverlässigkeit | Idempotenz-/Last-Tests (Wipe-Sturm simulieren); DoD: P95 Trigger→Discord < 10 s, 0 Dubletten in Chaos-Test | L |
| **8 – Rust+ Pairing & Verbindungen** | Live-Säule Fundament | Connector-Service, Pairing-Flow (inkl. Desktop-lokalem Fallback), Token-Verschlüsselung, getInfo/getMap, Verbindungs-UI, Fleet-Monitoring | rustplus_connections | **Protokoll-Risiko Nr. 1**; Pairing-UX | Canary-Server-Dauertest; DoD: Pairing-Erfolgsquote ≥ 90 % im Beta-Panel, Reconnect-Chaos-Test grün | XL |
| **9 – Live Team/Events/Vending** | Live-Nutzen sichtbar | Marker-Diff-Engine, Team-Presence, Event-Trigger (cargo/heli/crate), Alarm-Trigger, Vending-Suche, `/team /events /shops`, Live-Map im Web | vending_machines, vending_offers, smart_devices (Alarm) | Marker-Semantik je Spielversion | Replay-Tests mit aufgezeichneten Marker-Streams; DoD: Cargo-Alert P95 < 30 s nach Spawn | XL |
| **10 – Desktop App v1** | Second-Screen-Erlebnis | Tauri-Shell, Login/Entitlement-Token, HUD (Live-Map, Team, Ticker, Alarme), Auto-Update, Code-Signing | licenses | WebView2-Kompatibilität; Signing-Reputation | Update-/Offline-Grace-Tests; DoD: Installer < 25 MB, Update ohne Nutzeraktion, HUD 8 h stabil | L |
| **11 – Local Map Parser v1** | Parser produktiv | Rust-Crate (LZ4+Proto+Normalisierung), Monument-Registry v1, Datei-Watcher in Desktop, 2D-Render, optionaler Ergebnis-Upload, Backend-Parser-Service | map_prefabs, prefab_manifest | Formatbrüche; Manifest-Pflege | Fixture-/Fuzz-/Golden-Tests (9.11); DoD: 10 Referenzmaps korrekt (Monument-Recall ≥ 98 %), 4500er < 3 s | XL |
| **12 – Advanced Map Intelligence** | Differenzierung | Layer-Pipeline, Heatmaps, Road-Graph, Keycard-Routen, Base-Spot-Rating v1, Analyse-UI, Custom-Map-Ansicht | analysis-Artefakte an map_records | Score-Qualität/Erwartungen | Visuelle Regression + Nutzerpanel-Feedback; DoD: Rating erklärbar im UI, 3 Presets, Beta-Zufriedenheit ≥ 70 % | XL |
| **13 – Smart Devices** | Steuerung & Automation | Device-Board, `/switch`, Rollen-Gates, Audit, Alarm→Aktion-Regeln | device_actions | Sicherheit (Fremdschalten) | Permission-Matrix-Tests; DoD: Kick entzieht Zugriff < 5 s, jede Aktion auditiert | M |
| **14 – Clan/Team Features Ausbau** | Clans monetarisieren | Rollen v2, Seats-Verwaltung, Multi-Roster, Team-Audit-UI, geteilte Konfigurationen, Onboarding via Discord-Rollen | Rollen-/Seat-Erweiterungen | Komplexität der Berechtigungen | Property-Tests auf Permission-Matrix; DoD: Clan mit 30 Membern ohne Support einrichtbar | L |
| **15 – Paid Launch** | Umsatz | Pricing final, Trials, Lifetime-Aktion, Marketing-Site, Attribution/Referrals, Statuspage, Support-Playbooks, AGB/Widerruf live | – | Zahlungs-/Rechts-Bugs | Vollständige Billing-Regression; DoD: erste 100 zahlende Kunden ohne manuelle Eingriffe | M |
| **16 – Scaling/Monitoring/Admin** | Betriebsreife | Sharding-Readiness Bot, Connector-Fleet-Autoscaling, SLOs+Alerting, Cost-Dashboards, Admin-Tools v2 (Support-Ansichten, Fraud), Load-Tests Wipe-Donnerstag ×5 | – | „Erfolgs-Ausfall" am Wipe-Tag | k6-Lastprofile; DoD: Wipe-Donnerstag-Peak ×5 ohne SLO-Bruch im Staging-Loadtest | L |
| **17 – Full Product Hardening** | Qualität zementieren | Security-Review/Pentest, DSGVO-Audit (Export/Delete-Drill), Restore-Drill, Doku-Vervollständigung, i18n-Ausbau, Public-API-Beta (api_keys) | api_keys | – | Pentest-Findings P1=0; DoD: Runbooks für Top-10-Incidents, Restore < 60 min nachgewiesen | L |

---

# 27. Repository-Struktur (Monorepo, Turborepo + pnpm + Cargo-Workspace)

```
rustmastertool/
├── apps/
│   ├── web/                  # Next.js Dashboard + Marketing
│   ├── api/                  # NestJS Backend (REST, Auth, Billing, Admin) + Worker-Entrypoints
│   ├── realtime/             # WS-Gateway
│   ├── discord-bot/          # discord.js, dünner API-Client
│   ├── rustplus-connector/   # Stateful Rust+-Service
│   └── desktop/              # Tauri (src-tauri Rust + UI aus packages/ui)
├── packages/
│   ├── shared/               # Typen, zod-Schemas, Konstanten, Grid-/Koordinaten-Utils, generierte API-Clients
│   ├── database/             # Drizzle-Schema, Migrations, Seeds, Timescale-Setup
│   ├── battlemetrics/        # BM-Client, Response-Schemas, Poller-Logik, Fixtures
│   ├── rustmaps/             # RustMaps-Client, Normalisierung, Fixtures
│   ├── rustplus/             # Protokoll (Proto-Defs, Pairing, Socket, Diff-Engine)
│   ├── map-parser/           # Rust-Crate (+ napi/wasm-Bindings) – Cargo-Workspace-Mitglied
│   ├── alerts/               # Trigger-Katalog, Matcher, Regel-Schemas
│   ├── ui/                   # Designsystem, Map-Viewer, Charts (Web+Desktop geteilt)
│   └── config/               # ESLint/TS/Tailwind-Presets
├── infra/                    # Docker-Compose (dev), IaC (Terraform), K8s/Fly-Manifeste, Grafana-Dashboards
├── docs/                     # ADRs, boundaries.md, Runbooks, API-Spec, Legal-Checklisten, Monument-Registry-Prozess
├── fixtures/                 # kleine eingecheckte Testdaten (große Maps in R2, via Skript geladen)
├── turbo.json · pnpm-workspace.yaml · Cargo.toml (workspace) · .github/workflows/
```
Regeln: Apps importieren Packages, nie umgekehrt und nie App↔App; jede externe API nur über ihr Package; ADRs (Architecture Decision Records) für jede Kernentscheidung in `docs/adr/`.

---

# 28. Testing-Strategie

| Ebene | Werkzeug | Fokus |
|---|---|---|
| Unit | Vitest / cargo test | Regel-Matcher, Wipe-Heuristik, Grid-/Koordinaten-Utils, Diff-Engine, Entitlement-Guards |
| Integration | Testcontainers (PG+Redis) | Poller→Snapshot→Aggregate, Alert-Pipeline end-to-end (Mock-Quellen), Billing-Webhooks |
| **Contract (extern)** | Aufgezeichnete Responses (Fixtures) + tägliche Live-Smoke-Checks gegen BM/RustMaps in Staging | Schema-Drift früh erkennen; Live-Checks alarmieren, brechen aber nicht den CI-Build |
| Parser | Golden-Files + Property/Fuzz (cargo-fuzz) + visueller Diff vs. RustMaps | Nie panicken; Monument-Recall; Koordinaten-Kalibrierung |
| WebSocket | Client-Simulatoren, Chaos (Drops, Reorder), Replay aufgezeichneter Rust+-Marker-Streams | Reconnect, Dedup, Backpressure |
| Discord | Command-Handler gegen Mock-Interactions; 1 echter Test-Guild-Smoke in Staging | Embeds, Permissions, Rate-Limit-Verhalten |
| Billing | Stripe-CLI-Webhook-Replays, Test-Clocks (Trial-Ablauf, Dunning) | Entitlement-Korrektheit über Lebenszyklus |
| Security | SAST, Dependency-Audit, ZAP-Baseline, gezielte Tests: Token nie in Logs, IDOR auf Team-Ressourcen | |
| Load | k6: Wipe-Donnerstag-Profil (Suche×10, Alerts×20, WS×5), Connector-Fleet mit 1k simulierten Servern | SLO-Nachweis |
| E2E | Playwright: Onboarding, Alert-Anlage, Billing, Pairing-UI (gegen Mock-Connector) | Kernflows je Release |
| **Rust-Update-Regression** | Monatliches Ritual (an Rust-Patchday gekoppelt): neue Sample-Maps ziehen → Parser-Suite → Rust+-Canary prüfen → Manifest-Diff → Report | Institutionalisiert in Runbook |

CI-Gates: Lint+Typecheck+Unit auf jedem PR; Integration auf main; E2E+Load nightly/vor Release. Coverage-Ziel: sinnvolle Pfade statt Prozentfetisch, aber Alert-Engine, Billing und Parser ≥ 90 % Branch.

---

# 29. Deployment & Betrieb

| Thema | Plan |
|---|---|
| Hosting | EU (Hetzner Cloud oder Fly.io); Start: 3 VM-Klassen (api/worker, connector, bot) + Managed PG/Redis; K3s erst bei > 5 Services-Bedarf |
| Container | Ein Docker-Image je App, Multi-Stage-Builds, distroless wo möglich |
| Environments | dev (lokal, docker-compose mit Mock-Quellen), staging (echte APIs mit Test-Keys, Canary-Rust-Server), production |
| CI/CD | GitHub Actions: PR-Checks → main → auto-staging; prod per Tag mit manueller Freigabe; Migrations laufen als Pre-Deploy-Job (expand/contract-Muster, immer rückwärtskompatibel) |
| Backups | PG PITR + Snapshots (30 d), Restore-Drill quartalsweise; R2 Versionierung für kritische Buckets |
| Monitoring | Golden Signals je Service; fachliche Metriken: Poll-Lag, Alert-Latenz P95, Connector-Fleet-Health (aktive/fehlerhafte Verbindungen), Pairing-Erfolgsquote, Stripe-Webhook-Lag |
| Logs/Errors | Strukturierte Logs (Loki), Sentry mit Release-Tracking, PII-Scrubbing (Tokens, IPs) |
| Uptime/Status | Externe Checks (API, Web, WS-Handshake) + öffentliche Statuspage (Vertrauen!) |
| Cost Monitoring | Monatliches Dashboard: BM/RustMaps-API-Kosten, R2/CDN, Compute je Service; Alarm bei +30 % MoM |
| Rollback | Immutable Images + Tag-Rollback < 5 min; DB-Migrations nie destruktiv im selben Release (contract-Phase später); Feature-Flags als First-Line-Rollback (Rust+-Säule global abschaltbar!) |
| Incident-Prozess | Runbooks für: BM-Limit, Rust+-Protokollbruch, Discord-Outage, Stripe-Webhook-Stau, DB-Failover; On-Call light (2 Personen, Wipe-Donnerstag besetzt) |

---

# 30. Konkrete erste Umsetzungsschritte (Woche 1–3)

**Sofort zu klärende Risiken (Reihenfolge = Priorität):**
1. **Rust+-Pairing-PoC** (Tag 1–3): Mit rustplus.js gegen eigenen Testserver pairen, getInfo/getMapMarkers, Marker-Diff prototypen. → Validiert Risiko Nr. 1.
2. **`.map`-PoC** (Tag 2–5): Eigenen Testserver mit Custom Map aufsetzen, Datei lokal finden, LZ4→Proto dekodieren, Prefabs/Paths zählen; klären, ob prozedurale Maps als Datei vorliegen. → Validiert Parser-Säule.
3. **BattleMetrics**: Doku + Terms lesen, Test-Token, Rate-Limits empirisch prüfen, Kontakt für kommerziellen Plan.
4. **RustMaps**: Doku + Terms, API-Key, Frage nach Bild-Caching schriftlich stellen.
5. **Markenrecherche** „RustMasterTool" + Anwalts-Erstgespräch (Terms 1/2/3/5/7/11 der Matrix).

**Architekturentscheidungen zuerst fixieren (als ADR-001…):** Monorepo Turborepo+pnpm+Cargo · TypeScript strict + Rust-Parser · NestJS vs. Fastify (Team-Votum) · Drizzle · PG+Timescale · BullMQ · Tauri · REST+OpenAPI · Entitlement-Modell · Service-Schnitt (14.2).

**Erste Dateien/Artefakte:**
```
1. docs/adr/ADR-001…010 (obige Entscheidungen)
2. docs/boundaries.md (Anti-Cheat-Grenzen aus 13.3 – vor jeder Codezeile!)
3. docs/legal/checklist.md (Prüfpunkte-Register aus diesem Dokument)
4. pnpm-workspace + turbo.json + Cargo-Workspace-Skelett
5. packages/shared (Basis-Typen, Grid-Utils mit Tests – erster echter Code)
6. packages/database (Schema Phase-2-Tabellen + Migration 0001)
7. infra/docker-compose.dev.yml (PG+Timescale, Redis, MinIO als R2-Ersatz)
8. .github/workflows/ci.yml (Lint, Typecheck, Test, Build)
9. apps/api Skeleton (Health, OpenAPI, Auth-Modul-Gerüst)
10. PoC-Ordner /experiments (rustplus-poc, mapparse-poc – bewusst außerhalb der Apps, Wegwerf-Charakter)
```

**Proof-of-Concepts (Definition of Done je PoC):**
| PoC | DoD |
|---|---|
| Rust+ | Pairing-Payload empfangen, 24 h stabile Socket-Verbindung, Cargo-Spawn im Diff erkannt |
| Map-Parser | Eine Custom Map: Monumente mit Koordinaten als JSON + primitives PNG-Render, Koordinaten decken sich mit In-Game-Grid |
| BM-Poller | 50 Server, 24 h Snapshots in Timescale, ein Wipe korrekt erkannt |
| Alert-Faden | Fake-Event → Regel → Discord-Embed in Test-Guild < 10 s |

---

# 31. Schlussbemerkung & offene Entscheidungen

Die drei strategischen Wetten des Produkts, bewusst gemacht und abgesichert:
1. **Rust+-Säule** ist der größte Nutzen und das größte Risiko → deshalb Säulen-Isolation, Protokoll-Adapter und ein Produkt, das auch ohne sie trägt (Server-+Map-Intelligence).
2. **Eigener Parser** ist teuer, aber der Burggraben → deshalb als eigenständiges, mehrfach verwertbares Rust-Package mit institutionalisiertem Update-Ritual.
3. **Historisierte Daten** werden mit jedem Monat wertvoller → deshalb ab Phase 3 alles Billige speichern.

Offene Entscheidungen für den Projekt-Kickoff: endgültiger Produktname nach Markenprüfung (Punkt 7 der Matrix – „Rust" im Namen ist der heikelste Branding-Punkt und sollte **vor** Logo/Domain-Investitionen geklärt sein), NestJS vs. Fastify, Hetzner vs. Fly.io, Preisvalidierung im Beta-Panel.

*Ende des Planungsdokuments.*
