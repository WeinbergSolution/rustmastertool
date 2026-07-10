# C7-R — Live Companion Audit: Desktop Map & Rust+ Integration

## 1. Ausgangslage & Konkurrenzanalyse
Desktop- und Web-Lösungen wie **Rust On Top** oder **MapMonster** bieten den Spielern die Möglichkeit, eine interaktive "Live Map" auf einem zweiten Monitor am PC zu nutzen. Diese Tools vermeiden es, dass der Spieler ständig auf sein Handy schauen muss (wofür die offizielle Rust+ App gedacht ist). 

**Wie machen das die Konkurrenten?**
Die Konkurrenz nutzt fast ausschließlich das offiziell von Facepunch entwickelte, aber nicht öffentlich dokumentierte **Rust+ Companion API-Protokoll**. Sie betreiben im Hintergrund Wrapper-Bibliotheken (z. B. `rustplus.js` für Node.js oder `rustplus.py` für Python). Diese Bibliotheken verbinden sich per WebSocket direkt mit dem Game-Server und emulieren im Grunde das Verhalten der offiziellen Smartphone-App auf dem Desktop. 
Dazu ist es zwingend erforderlich, dass der Nutzer seinen Steam-Account mit dem Tool "paired" (Rust+ Pairing Flow), um an die `Steam ID` und den `Player Token` zu gelangen.

## 2. Datenstrom & Rust+ API Protokoll
Über die etablierten Rust+ Bibliotheken können folgende Datenströme via WebSocket (Protobuf) abgegriffen werden:
- **Map Markers (`getMapMarkers`)**: Liefert IDs für bestimmte Events.
  - `ID 4`: CH47 Chinook
  - `ID 5`: Cargo Ship
  - `ID 6`: Locked Crate
  - `ID 8`: Patrol Helicopter
  - `ID 3`: Vending Machines / Shops
  - `ID 9`: Player Death / Explosionen (teils dynamisch)
- **Team Info (`getTeamInfo`)**: Liefert eine Liste aller Teammitglieder (inkl. einem selbst), deren Map-Koordinaten (X, Y), Online-Status und gesetzte Map-Notes (Team Marker).
- **Smart Devices**: Smart Switches, Smart Alarms (für Notifications), CCTV Kameras.

## 3. Bestehende Assets
Pascal hat bereits einen **Raid Calculator** entwickelt, der als Vorlage existiert. Dieser wird im Hintergrund gehalten und später in die neue RustMasterTool UI umgezogen, einem Redesign unterzogen und in das "Learn/App"-Ecosystem integriert (z.B. inklusive Aufbau einer Rust Icon Library).

## 4. Machbarkeitsmatrix & Feature-Priorisierung

| Prio | Feature | Datenquelle | Ohne Pairing? | Mit Companion Pairing? | Mit Server Plugin (uMod)? | Risiko / Anmerkung | Nächster Schritt |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | Eigene Position | `getTeamInfo` | ❌ Nein | ✅ Ja (via Team Info) | ✅ Ja | Offiziell gewollt (Rust+). | Pairing Flow via Chrome Extension / Auth Proxy prüfen. |
| **2** | Teammate Position | `getTeamInfo` | ❌ Nein | ✅ Ja | ✅ Ja | Wie bei 1, liefert `x` und `y` Koordinaten. | Implementierung `getTeamInfo` Polling / Socket. |
| **3** | Distanz zum Buddy | Lokale Berechnung | ❌ Nein | ✅ Ja | ✅ Ja | Reine Mathematik aus X/Y Koordinaten. | UI-Komponente bauen (siehe Landing Page Mockup). |
| **4** | Team Marker | `getTeamInfo` | ❌ Nein | ✅ Ja | ✅ Ja | Enthalten als `Map Notes` in Team API. | UI-Overlay auf Map. |
| **5** | Cargo Ship | `getMapMarkers` | ❌ Nein | ✅ Ja (Typ 5) | ✅ Ja | Sehr zuverlässig via Rust+. | Marker-Typen auswerten. |
| **6** | Patrol Heli | `getMapMarkers` | ❌ Nein | ✅ Ja (Typ 8) | ✅ Ja | Sehr zuverlässig via Rust+. | Marker-Typen auswerten. |
| **7** | CH47/Chinook | `getMapMarkers` | ❌ Nein | ✅ Ja (Typ 4) | ✅ Ja | Sehr zuverlässig via Rust+. | Marker-Typen auswerten. |
| **8** | Locked Crate | `getMapMarkers` | ❌ Nein | ✅ Ja (Typ 6) | ✅ Ja | Sehr zuverlässig via Rust+. | Marker-Typen auswerten. |
| **9** | Vending Machines | `getMapMarkers` | ❌ Nein | ✅ Ja (Typ 3) | ✅ Ja | Liefert Shop-Namen und Inhalt. | Hover-Popups für Map UI bauen. |
| **10** | Notifications | FCM / Smart Alarm | ❌ Nein | ✅ Ja | ✅ Ja | Push-Notifications (FCM) erfordern tiefere API-Kenntnis. | Smart Alarm Event Listener prüfen. |
| **11** | Bradley APC | Server Plugin | ❌ Nein | ❌ Nein* | ✅ Ja | *Bradley erzeugt standardmäßig KEINEN Map Marker im Vanilla Rust+. | Wenn Vanilla: Nur via Explosion/Crate ableitbar. |
| **12** | Airdrop (Standard) | Server Plugin | ❌ Nein | ❌ Nein* | ✅ Ja | *Vanilla Airdrop (nicht vom Event) hat keinen festen Marker. | Falls Modded Server: Plugin nutzen. |

## 5. Was geht gar nicht legitim?
Die folgenden Dinge sind ohne Memory-Reading / Cheat-Software **nicht** möglich und dürfen für eine legitime SaaS-App wie RustMasterTool unter keinen Umständen angeboten werden:
- Live-Positionen von Spielern außerhalb des eigenen Teams (ESP).
- Erkennen von vergrabenen Stashes.
- Einsehen von Kisteninhalten in feindlichen Basen.
- Warnung vor unsichtbaren Feinden im Umkreis.

## 6. Zusammenfassung & Architektur-Empfehlung
Um Features wie Rust On Top oder MapMonster anbieten zu können, **muss** ein Rust+ Companion API Gateway implementiert werden.
Da direkte WebSocket-Verbindungen zu Facepunch-Servern aus dem Web-Browser heraus wegen CORS / WSS-Sicherheitsrichtlinien oft geblockt werden, benötigt RustMasterTool einen **Backend-Companion-Service (z.B. in Node.js mit `rustplus.js` oder C# mit `RustPlusApi`)**. 
Dieser Service hält die WebSocket-Verbindung für den angemeldeten User und streamt die relevanten Events (Positions, Markers) an das Web-Frontend (Map UI) durch.

**Nächster Schritt:**
Aufbau eines Proof of Concept (PoC) Backend-Sockets, der sich mit einem Test-Token anmeldet und einmalig `getMapMarkers` und `getTeamInfo` abruft.
