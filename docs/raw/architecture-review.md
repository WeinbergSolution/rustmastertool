# RustMasterTool – Architektur-Review (Red-Team-Prüfung)

**Prüfgegenstand:** „RustMasterTool – Vollständige Produkt- und Architekturplanung" v1.0 (1117 Zeilen, 31 Abschnitte)
**Rolle:** Principal Software Architect / Security Reviewer / Red-Team Engineer
**Methodik:** Prüfung gegen den vorliegenden Plan, keine Neu-Erfindung. Externe API-Fakten werden nicht behauptet; wo mein Wissen unsicher oder potenziell veraltet ist, steht **[Prüfpunkt]**. Verweise wie „(→ 10.2)" beziehen sich auf Abschnitte des Plans.

---

# A. Executive Verdict

**Ist der Plan grundsätzlich umsetzbar?**
Ja. Der Plan ist überdurchschnittlich reif: Säulen-Isolation, zentraler Poller, Circuit Breaker je Quelle, ehrliche Prüfpunkt-Kennzeichnung, harte Anti-Cheat-Grenzen (13.3) und ein realistisches Bild des Rust+-Risikos. Das ist kein Wunschdenken-Dokument, sondern eine belastbare Arbeitsgrundlage. **Aber:** Er ist für das angenommene Team (2–3 Senior-Devs, → 26) in der vorgesehenen Sequenz zu breit geschnitten, enthält zwei strukturelle Lücken, die der Plan selbst nicht sieht, und mindestens eine interne Inkonsistenz im Phasenplan.

**Größtes Risiko?**
Nicht das abstrakte „Rust+ kann brechen" – das adressiert der Plan gut. Das größte *ungelöste* Risiko ist konkreter und zweigeteilt:

1. **Die Pairing-Architekturfrage (→ 10.2, Punkt 1) ist offen und determiniert das halbe Produkt.** Der Plan lässt offen, ob die Companion-/Push-Registrierung serverseitig „für den Nutzer" möglich ist oder lokal beim Nutzer stattfinden muss. Nach Stand der Community-Tooling-Praxis erfordert die Registrierung einen interaktiven Login des Spielers (die verbreiteten Referenzimplementierungen führen diesen Schritt lokal und interaktiv aus) **[Prüfpunkt: aktueller Stand]**. Falls das zutrifft, funktioniert „Pairing rein im Web-Dashboard" nicht wie in 12.2 (Flow 3) skizziert – und der im Plan als „robusterer Fallback" genannte Desktop-lokale Weg kollidiert mit dem Phasenplan: **Desktop ist Phase 10, Pairing ist Phase 8.** Der Fallback existiert zum Zeitpunkt, an dem er gebraucht wird, noch nicht.
2. **Das Distinct-Server-Problem beim Polling.** Der zentrale Poller (7.1) entkoppelt korrekt die Nutzerzahl von der BM-Last *für denselben Server*. Er entkoppelt aber nicht die Anzahl *unterschiedlicher* Server: 50.000 Free-Nutzer mit je 1 Watchlist-Server können 20.000+ verschiedene Warm-Server erzeugen, die bei 2–5-min-Intervallen jedes plausible API-Kontingent sprengen. Der Plan kennt Nutzer-Limits (Watchlist-Slots), aber **kein globales Polling-Budget mit Degradationsstrategie**. Das ist eine Kosten-/Terms-Bombe mit Zündung genau dann, wenn das Produkt erfolgreich wird.

**Größte Stärke?**
Die Isolations-Architektur: jede externe Quelle als eigenes Package mit Circuit Breaker und Feature-Flag (6, „Architektur-Konsequenz"), Rust+ als eigenständiger, produktweit abschaltbarer Service (14.2, 29), und ein Produkt, das ohne die riskanteste Säule weiter trägt. Dazu die Prüfpunkt-Disziplin: Der Plan behauptet keine externen API-Fakten, sondern definiert, was verifiziert werden muss – genau richtig.

**Wichtigste Änderung vor Start?**
Drei Dinge, in dieser Reihenfolge: (1) Die Pairing-Frage im PoC in beiden Varianten beantworten und daraus eine ADR machen, *bevor* der Phasenplan als verbindlich gilt – sie kann die Reihenfolge Desktop/Web umdrehen. (2) Globales Polling-Budget als First-Class-Konzept einziehen (→ C.1). (3) Den Paid Launch von Phase 15 deutlich nach vorn ziehen und im Gegenzug die Billing-Vollausbaustufe aus Phase 2 nach hinten schieben (→ C.3): Im aktuellen Plan wird ~12 Monate Software gebaut, bevor der erste Euro fließt, während die Stripe-Integration ab Monat 2 ungenutzt gewartet wird.

---

# B. Blocker vor erster Codezeile

Zwingend zu klären, bevor produktiver Code (außerhalb von Wegwerf-PoCs in `/experiments`) entsteht:

1. **Rust+-Pairing-Architektur:** PoC beider Varianten (serverseitige Registrierung vs. lokaler Helper) mit klarem Ergebnis. Das Ergebnis bestimmt UX (12.2), Phasenreihenfolge (8 vs. 10) und ob eine Minimal-Desktop-Komponente vorgezogen werden muss. **[Prüfpunkt]**
2. **BattleMetrics-Terms und -Preis für kommerzielle Nutzung** (Matrix #1): schriftliche Bestätigung des Use-Cases anfragen, konkretes Preisangebot einholen, dokumentierte Rate-Limits notieren. Ohne Antwort ist die P0-Kernsäule ökonomisch unkalkuliert. **[Prüfpunkt]**
3. **Zusatzfrage an BattleMetrics, die im Plan fehlt:** Sind **öffentliche, SEO-indexierte Server-Detailseiten** (12.1, 12.4 „Server-Detailseiten sind organischer Traffic-Magnet") mit den Terms vereinbar? Das ist faktisch Re-Publikation von BM-Daten im Web – ein anderer Fall als „Analysen im eingeloggten Produkt". Der Plan behandelt beides als eins. **[Prüfpunkt]**
4. **RustMaps:** Anfrage zu kommerzieller Nutzung, Bild-Caching/Re-Hosting und Attribution schriftlich stellen (Matrix #2). Mindestens die Anfrage muss raus sein; die Antwort kann parallel zur Foundation kommen, weil die Fallback-Kette (8.4) existiert. **[Prüfpunkt]**
5. **`.map`-Verfügbarkeitsfrage:** PoC-Antwort, ob prozedurale Maps clientseitig als Datei persistiert werden (9.2). Fällt die Antwort „nein" aus, gilt die Differenzierungs-These des Produkts (Executive Summary: Parser als „technisches Alleinstellungsmerkmal") **nur für Custom Maps** – das ist eine Strategie-Korrektur, keine Fußnote, und muss vor Investment in Phase 11/12 explizit entschieden werden. **[Prüfpunkt]**
6. **Markenrecherche „Rust" im Namen** (Matrix #7) *vor* Domain-, Logo- und öffentlichem Repo-Namen. Der Plan sagt das selbst (31) – als Blocker formalisieren: Arbeitstitel intern ok, nichts Öffentliches vor dem Anwaltsergebnis.
7. **`docs/boundaries.md`** (13.3) committen – der Plan fordert es „vor jeder Codezeile" (30); hier bestätigt: ja, Blocker, weil es Code-Review-Maßstab ab PR #1 ist.
8. **Hosting-/DB-Realität klären:** Der Stack fordert PostgreSQL + TimescaleDB *managed* und nennt Hetzner als Hosting-Favorit (15). Nach meinem Stand bietet Hetzner kein Managed Postgres/Redis an, und Neon unterstützt die TimescaleDB-Extension nicht **[Prüfpunkt: beide Angebote aktuell verifizieren]**. Damit ist „Hetzner + managed Timescale" in sich widersprüchlich. Entscheidung nötig: Timescale Cloud (EU-Region, Kosten prüfen) vs. Self-Hosted-PG auf Hetzner (Ops-Last für 2–3 Devs!) vs. Verzicht auf Timescale zugunsten nativer PG-Partitionierung + eigener Aggregation (→ F.5).
9. **Globales Polling-Budget-Design** (→ C.1) als ADR – vor dem Poller-Code, weil es dessen Kernschleife bestimmt.
10. **Kostenmodell v1:** eine Seite mit den drei variablen Posten (BM-Plan, RustMaps-Tier, Infrastruktur) und daraus abgeleiteter Preisuntergrenze. Die Preisannahmen in 23.1 hängen in der Luft, solange die Einkaufsseite unbekannt ist. Ohne erfundene Zahlen – nur die eingeholten Angebote eintragen.

**Kein Blocker (bewusst):** AGB/Widerruf/Impressum (Matrix #11) – Pflicht erst zum Paid Launch; Anwalts-Erstgespräch sollte trotzdem früh stattfinden, weil es Blocker 6 mit erledigt.

---

# C. Muss geändert werden

**C.1 – Globales Polling-Budget als Architekturbestandteil (→ 7.4).**
Die Klassen Hot/Warm/Cold steuern Priorität, aber nicht die Gesamtmenge. Ergänzen: (a) ein globaler Budget-Controller, der die verfügbare Request-Rate auf Klassen verteilt und **Intervalle dynamisch streckt**, wenn die Zahl beobachteter Server wächst (Warm dann z. B. 5→15 min statt 429-Kaskade); (b) ein Plan-Limit nicht nur pro Nutzer, sondern eine **globale Obergrenze aktiv gepollter Distinct-Server je Ausbaustufe** mit definierter Degradation („Daten von HH:MM" existiert in 7.7 bereits – daran andocken); (c) eine Metrik „Distinct Server je Klasse" im Monitoring (29) mit Alarm. Ohne das skaliert der Kostentreiber linear mit dem Erfolg des Free-Tiers.

**C.2 – Phasen-Inkonsistenz Pairing/Desktop auflösen (→ 26, Phase 8 vs. 10).**
Wenn der PoC ergibt, dass die Registrierung lokal beim Nutzer stattfinden muss, braucht Phase 8 einen ausführbaren lokalen Bestandteil. Optionen: (a) ein minimaler, signierter **Pairing-Helper** (CLI oder Mini-Tauri, nur Registrierung + Token-Übergabe an den eigenen Account) als Teil von Phase 8; (b) Desktop-Slim vor Phase 8 ziehen; (c) falls serverseitig doch sauber möglich: dokumentieren und den „Desktop-Fallback"-Satz streichen. Eine der drei Varianten muss im Phasenplan stehen – aktuell verweist Phase 8 auf einen Fallback, den es erst zwei Phasen später gibt.

**C.3 – Monetarisierungs-Sequenz umbauen (→ 26, Phasen 2 und 15).**
Zwei Probleme: Erstens liegt der Paid Launch nach Parser (11), Advanced Map Intelligence (12), Smart Devices (13) und Clan-Ausbau (14) – das sind vier große Phasen (2× XL, 1× M, 1× L) *vor* dem ersten Umsatz, obwohl die Zahlungsbereitschafts-Treiber laut eigener Zielgruppenanalyse (3.2) die Live-Alerts und Team-Features sind, die nach Phase 9 existieren. Zweitens baut Phase 2 die volle Stripe-Integration ~12 Monate vor ihrem Einsatz – toter Code mit Wartungslast und veraltenden Annahmen. Änderung: **Phase 2 auf Auth + Teams v0 + Entitlement-Gerüst reduzieren** (Flags/Guards ohne Zahlungsanbindung, Overrides per Admin); **Stripe-Integration als eigene Phase direkt vor den Paid Launch** ziehen; **Paid Launch nach Phase 9/10** ansetzen (Server-Intelligence + Alerts + Live-Säule = verkaufbares Produkt), Phasen 11–14 werden umsatzfinanzierter Ausbau. Das reduziert auch das Risiko, 12 Monate Runway ohne Marktsignal zu verbrennen.

**C.4 – `map_prefabs` nicht relational speichern (→ 16).**
Eine 4500er-Map enthält Größenordnung zehntausende Prefab-Instanzen; bei tausenden Maps landet man bei Milliarden Zeilen ohne relationalen Abfragenutzen – der Plan ahnt es („ggf. partitioniert (groß!)"). Konsequenter: Prefab-Rohdaten gehören ausschließlich ins ParsedMap-Artefakt (R2, 9.12); relational bleiben nur `monuments` und ggf. eine kleine kuratierte Menge analyse-relevanter Prefab-Kategorien als vorberechnete Layer. Tabelle streichen oder auf „abgeleitete Auszüge" umdefinieren.

**C.5 – Fehlende Tabellen ergänzen (→ 16).**
Im Modell fehlen Entitäten, die der Plan an anderer Stelle voraussetzt: **`watchlists`/`watchlist_entries`** (Phase 3 nennt „watchlist" als Datenmodell, Abschnitt 16 führt sie nicht); **`team_invites`** (API 17 hat `POST /teams/:id/invites` und `/invites/:code/accept`); **`push_subscriptions`** (Web-Push/VAPID in 19.1 braucht Endpoint-Speicherung); **`notification_deliveries`** als eigene Tabelle statt nur `alert_events.deliveries` JSONB – der im Plan versprochene Support-Flow „Warum kam nichts an?" (19.3) braucht kanalspezifische Abfragen über viele Events hinweg, das ist in JSONB-Spalten mühsam und index-feindlich; **`map_records.generator_version`/`rust_version`** als Spalte – der Plan erkennt in 8.3 selbst, dass Seed+Size ohne Versionskennung nicht eindeutig ist **[Prüfpunkt: was RustMaps liefert]**, das Datenmodell bildet es aber nicht ab. Außerdem: `alert_events.dedup_key` braucht einen **Unique-Index**, sonst ist die Idempotenz-Zusage (19.3) nicht durchgesetzt.

**C.6 – Event-Transport vereinheitlichen (→ 14.1, 18.2, 19.1).**
Der Plan mischt drei Mechanismen: „Events (Redis Streams/BullMQ)" im Diagramm, Redis Pub/Sub im Gateway, BullMQ-Queues in der Zustellung. Das sind drei verschiedene Zustellsemantiken (at-least-once persistent / fire-and-forget / Job-Queue). Es fehlt eine verbindliche Festlegung: **welcher Bus ist die Wahrheit für Domain-Events, welche Semantik gilt (Ordering? Replay? Consumer Groups?), und wo sind Pub/Sub bzw. BullMQ nur nachgelagerte Zustellmechanik.** Vorschlag als Entscheidungsgrundlage: Redis Streams mit Consumer Groups als Event-Rückgrat (Alert Engine, Wipe-Detector), Pub/Sub nur für WS-Fanout (verlustbehaftet ok, Resync existiert), BullMQ nur für Zustell-Jobs. Ohne diese ADR baut jeder Worker seine eigene Semantik.

**C.7 – SEO-Strategie unter Terms-Vorbehalt stellen (→ 12.4).**
Öffentliche Server-Detailseiten als „organischer Traffic-Magnet" sind ein Wachstumspfeiler des Plans, stehen aber in Spannung zu 7.4 („niemals gegen ein selbstgebautes Vollreplikat" – genau das entsteht faktisch durch öffentlich gecachte Detailseiten) und zur eigenen Terms-Einschätzung in 6 („Weiterverkauf von Rohdaten vermutlich untersagt"). Bis zur BM-Antwort (→ B.3) darf die Marketing-/SEO-Planung nicht auf diesem Kanal aufbauen; im Plan als bedingtes Feature kennzeichnen.

**C.8 – Smart-Device-Token-Affinität klären (→ 10.3, 22).**
Das „eine Verbindung pro Team"-Modell (Leader-Election über verfügbare Tokens) ist für lesende Team-Daten schlüssig. Für **Geräteaktionen** ist ungeklärt, ob ein beliebiger Team-Token ein Gerät schalten darf, das ein anderes Mitglied gepairt hat, oder ob Entity-Zugriff am pairenden Token hängt **[Prüfpunkt: Protokollverhalten]**. Falls Letzteres: Der Connector braucht Token-Routing pro Gerät (Aktion über den Socket des pairenden Nutzers, ggf. On-Demand-Verbindung), und `smart_devices` braucht eine `paired_by_connection`-Beziehung mit Failover-Verhalten. Das ändert Datenmodell und Connector-Design – muss in den Rust+-PoC (→ G.1).

---

# D. Sollte geändert werden

**D.1 – Realtime-Gateway zunächst in den API-Prozess integrieren (→ 14.2).**
Für 2–3 Devs ist jedes zusätzliche Deployable teuer. Die Begründung „WS von API-Deploys entkoppeln" ist valide, aber ein Beta-Problem, kein Start-Problem. Als Modul mit sauberer Schnittstelle starten (Topics/ACL-Design aus 18 beibehalten), Abspaltung als vorbereiteter Schritt dokumentieren. Der Plan predigt selbst „kein Microservice-Zoo" (14.2) – hier konsequent sein.

**D.2 – `player_profiles` streichen oder auf „Self-Claim" reduzieren (→ 16, 21).**
Die Tabelle ist bewusst minimal, aber jede zentrale SteamID-Tabelle mit Fremd-Bezug ist DSGVO-Angriffsfläche und lädt zu schleichender Erweiterung ein. Für v1 reicht: SteamID am `users`-Datensatz (Self-Claim beim Login) + `team_notes` mit freiem `subject_ref`. Eine Fremdspieler-Entität erst einführen, wenn ein konkretes Feature sie zwingend braucht – dann mit DPIA-Kurzprüfung.

**D.3 – `team_notes` mit Schutzmechanik versehen (→ 21).**
Notizen über Dritte („Nemesis") sind personenbezogene Daten Dritter, auch wenn nutzergeneriert. Ergänzen: Auto-Expiry (z. B. Ende des Wipes / 90 Tage), harte Zeichen-/Strukturgrenzen, Melde-/Entfernungsprozess (Betroffenenrechte!), Klausel in den Nutzungsbedingungen, keine Suche über Teams hinweg (steht sinngemäß da – als technische Invariante festschreiben: kein Index über `team_id`-Grenzen).

**D.4 – Leader-Election-Konsens und Consent explizit machen (→ 10.3).**
(a) Technisch: Die Election braucht ein Koordinationsprimitive (Redis-Lock/Lease mit TTL) – benennen, sonst baut es jemand mit In-Memory-State und bricht das Konsistenz-Hashing-Failover. (b) Produktseitig: Es muss transparent sein, *wessen* Token gerade die Team-Daten liefert (dessen Verbindung trägt das Risiko einer Server-seitigen Auffälligkeit), inkl. Opt-out „mein Token nie für Team-Feed nutzen".

**D.5 – „EAC-safe by design"-Claim entschärfen (→ 13.3).**
Als interne Leitplanke exzellent. Als Marketing-Aussage doppelt riskant: fremde Marke im Claim und ein implizites Garantieversprechen gegenüber einem Anti-Cheat-System, dessen Entscheidungen man nicht kontrolliert. Formulierung in Richtung „berührt das Spiel nicht: kein Overlay, keine Injection, kein Prozesszugriff" – beschreibend statt zertifizierend. Der geplante Review der EAC-/Facepunch-Richtlinien **[Prüfpunkt]** bleibt richtig.

**D.6 – Monitoring anfangs managed (→ 15, 29).**
Selbstbetriebenes Prometheus/Grafana/Loki ist ein eigenes Produkt im Keller. Für die Teamgröße: managed Variante (der Plan nennt Better Stack; Grafana Cloud o. ä. gleichwertig) bis mindestens Paid Launch; Eigenbetrieb nur, wenn Kosten es später erzwingen. Sentry bleibt gesetzt.

**D.7 – Wipe-Donnerstag als formalen Betriebsmodus definieren (→ 10.6, 29).**
Bausteine existieren verstreut (globaler Wipe-Modus Backoff ×5, Load-Profile, On-Call-Besetzung). Zusammenziehen zu einem dokumentierten Modus mit: zeitgesteuertem Pre-Scaling (Worker/Connector), veränderten Queue-Prioritäten, RustMaps-Lookup-Drosselung (Burst von tausenden neuen Maps in einer Stunde – 8.3 nennt die Spitze, aber keinen Burst-Begrenzer), und einem Dashboard „Wipe-Modus aktiv".

**D.8 – Alert-Latenz-SLOs an Quellintervalle koppeln (→ 19, 26 Phase 7).**
„P95 Trigger→Discord < 10 s" ist gut, aber für BM-basierte Trigger ist die Ende-zu-Ende-Latenz durch das Poll-Intervall dominiert (bis zu 60 s Hot / Minuten Warm). Im UI und in den SLOs zwischen „Erkennung→Zustellung" und „Ereignis→Zustellung" unterscheiden, sonst produziert das Versprechen Support-Tickets.

**D.9 – Auth-Empfehlung aktualisieren (→ 15).**
„Lucia-artig" als Muster ist ok, aber Lucia selbst wurde nach meinem Stand als Projekt eingestellt/in eine Lernressource umgewandelt **[Prüfpunkt]** – als Bibliotheksempfehlung streichen, damit niemand darauf aufbaut. Die eigentliche Entscheidung (Eigenbau vs. Auth.js vs. Managed) fehlt ohnehin als ADR (→ F.6).

**D.10 – DSGVO-Löschung vs. Backups konkretisieren (→ 24).**
„30-Tage-Purge inkl. Backups-Policy" ist als Wort da, aber PITR-Backups lassen sich nicht selektiv purgen. Standardlösung dokumentieren: Löschregister + erneute Löschung nach jedem Restore (Restore-Runbook-Schritt), Backup-Retention ≤ Löschfrist-Zusage. Kleiner Texteingriff, großer Audit-Unterschied.

**D.11 – i18n-Start auf EN fokussieren (→ 12.4).**
i18n-*Infrastruktur* ab Tag 1: ja. Zwei gepflegte Sprachen (EN/DE) ab v1: Übersetzungs- und Test-Overhead in jeder UI-Iteration. EN-only bis Beta, DE als erster Zusatz danach.

**D.12 – `device_actions` vs. `audit_logs` konsolidieren (→ 16).**
Zwei Audit-Mechanismen mit überlappendem Zweck. Entweder `device_actions` als spezialisierte Sicht auf `audit_logs` definieren oder klar abgrenzen (operative Historie vs. Sicherheits-Audit) – sonst divergieren sie und keiner ist vollständig.

---

# E. Kann später

Im Plan korrekt verortet, aber zu früh detailliert – gedankliche und dokumentarische Energie, die vor Phase 10 niemand braucht:

1. **Public API / `api_keys`** (17, 16): richtig als „später" markiert; die Tabelle kann aus Migration 0001 raus.
2. **Lifetime-Plan-Mechanik** (23.1): Entscheidung und Kleingedrucktes erst mit echten Unit Economics nach Beta.
3. **Kamera-Zugriff P3** (5.3), **RCON/Owner-Modul** (Matrix #12): korrekt geparkt – so lassen.
4. **WASM-Browser-Preview des Parsers** (9): nettes Drittziel; Rust-Crate-Design dafür offenhalten reicht, kein Build-Target vor Phase 12.
5. **Base-Spot-Rating-Gewichtungen und Feedback-Loop** (20.2/20.3): Detailtiefe jetzt unnötig; die ehrliche „geschätzt"-Label-Regel (9.8) ist der einzige Teil, der früh bindend sein muss.
6. **HTTP-Interactions-Migration des Bots** (11.1): als Option notiert – reicht.
7. **Mehrsprachigkeits-Rollout RU/FR/PT-BR** (2): reine Vision, keine Planungsdetails nötig.
8. **K3s/Autoscaling-Details** (29, Phase 16): „K3s erst bei Bedarf" ist richtig; Terraform/K8s-Manifeste aus dem Foundation-Scope streichen, docker-compose + einfache VMs tragen bis weit nach Launch.

---

# F. Fehlende Entscheidungen

ADR-würdige Lücken – der Plan listet in 30 zehn ADRs, folgende fehlen darin oder sind unentschieden:

| # | Fehlende Entscheidung | Warum sie früh fällig ist |
|---|---|---|
| F.1 | **Pairing-Variante** (serverseitig vs. lokaler Helper vs. Desktop-Slim) | Determiniert UX, Phasenfolge, Sicherheitsmodell der Push-Credentials (→ A, C.2) |
| F.2 | **NestJS vs. Fastify-pur** | Im Plan explizit offen (15); vor `apps/api`-Skeleton nötig, prägt jede Zeile Backend |
| F.3 | **WS-Implementierung** | „uWebSockets.js/Socket.IO" (15) sind zwei sehr verschiedene Welten (Protokoll, Fallbacks, Cluster-Verhalten); eine wählen |
| F.4 | **Event-Bus-Semantik** | Streams vs. Pub/Sub vs. BullMQ, Delivery-Garantien, Replay (→ C.6) |
| F.5 | **DB-Betriebsmodell** | Timescale Cloud vs. Self-Host vs. natives PG-Partitioning ohne Timescale-Extension; hängt an Hosting-Wahl (→ B.8). Die Fallback-Frage „geht das Datenmodell auch ohne Timescale?" ist unbeantwortet – Continuous Aggregates (7.5) sind sonst Handarbeit |
| F.6 | **Auth: Build vs. Buy** | Eigene Session-Verwaltung + OAuth + Passkeys + Device-Flow ist ernsthafte Sicherheitsarbeit; bewusst entscheiden, nicht per Default in den Eigenbau rutschen |
| F.7 | **Multi-Tenancy-Muster** | `owner_type/owner_id`-Polymorphie zieht sich durch viele Tabellen (subscriptions, alerts, feature_flags…) – ohne FK-Integrität. Entscheidung: Polymorphie akzeptieren (mit Check-Constraints) vs. getrennte Spalten (`user_id`/`team_id`, XOR-Constraint). Betrifft jede Berechtigungsprüfung |
| F.8 | **Event-Schema-Versionierung** | Domain-Events sind das Rückgrat (Alert Engine, Realtime, Bot); versionierte Contracts in `packages/shared` mit Kompatibilitätsregel fehlen |
| F.9 | **Degradationsstufen je Säule aus Nutzersicht** | „Circuit Breaker öffnet" ist Technik; was sieht der Nutzer konkret (Banner? Feature ausgegraut? Statuspage-Verweis)? Eine kleine Degradations-Matrix je Quelle fehlt |
| F.10 | **Kostenbudget & Preisuntergrenze** | Ohne BM-/RustMaps-Angebote sind die 23.1-Preise Annahmen ohne Boden (→ B.10) |
| F.11 | **Namensentscheidungs-Deadline** | „vor Branding klären" (31) braucht ein Datum und einen Ausweichnamen-Prozess, sonst zementiert der Arbeitstitel sich selbst |
| F.12 | **Scope-Governance** | 18 Phasen, mehrere XL, 2–3 Devs: Es fehlt eine explizite Regel, was passiert, wenn Phasen überziehen (was fliegt zuerst?). Ohne diese Entscheidung entscheidet der Zufall |

---

# G. Kritische PoCs

Die vier PoCs aus Abschnitt 30 sind richtig gewählt, aber die DoDs prüfen die eigentlichen Killer-Fragen nicht scharf genug. Verschärfte Fassung (Reihenfolge = Priorität):

| PoC | Kernfrage | Definition of Done |
|---|---|---|
| **G.1 Rust+ Pairing & Betrieb** | Ist serverseitige Registrierung machbar? Wie verhält sich das Team-/Device-Modell? | (a) Pairing-Payload über **beide** Varianten versucht: serverseitige Registrierung und lokaler interaktiver Flow – Ergebnis je Variante dokumentiert (geht / geht nicht / geht mit Einschränkung X); (b) 24 h stabile Socket-Verbindung inkl. eines Server-Neustarts (Reconnect + Resubscribe nachgewiesen); (c) Cargo-Spawn per Marker-Diff erkannt; (d) **Team-Test mit 2 Accounts:** getTeamInfo liefert beide, Leader-Failover nach Unpair des ersten Tokens funktioniert; (e) **Device-Test:** Smart Switch mit Account A gepairt, Schaltversuch über Token von Account B → Verhalten dokumentiert (beantwortet C.8); (f) Verhalten des Tokens nach Map-Wipe dokumentiert |
| **G.2 `.map`-Format** | Existiert die Datei für prozedurale Maps? Stimmen Formatannahmen? | (a) Custom Map: Datei lokalisiert, LZ4→Protobuf dekodiert, Prefab-/Path-Zählung plausibel, Monumente als JSON + primitives PNG-Render, Koordinaten gegen In-Game-Grid kalibriert (Stichprobe ≥ 5 Monumente); (b) **eindeutige Ja/Nein-Antwort** zur Persistenz prozeduraler Maps mit Nachweis (Verzeichnis-Beobachtung während Join auf prozeduralen Server); (c) Parse-Zeit und Peak-RAM einer 4500er-Datei gemessen (Referenz für das 3-s-Budget aus 9.12); (d) bei „Nein" zu (b): einseitige Strategie-Notiz, was das für Phasen 11/12 und das Marketing-Narrativ bedeutet |
| **G.3 BattleMetrics-Poller** | Tragen Limits und Terms das Poller-Design? | (a) 50 Server, 24 h Snapshots in Timescale (bzw. PG-Fallback, falls F.5 offen); (b) dokumentierte Rate-Limits aus Doku + empirischem Verhalten notiert (ohne Limits zu provozieren); (c) ein realer Wipe korrekt erkannt (Donnerstag abwarten); (d) Terms-Anfrage zu kommerzieller Nutzung **und** öffentlichen Detailseiten (B.3) versendet; (e) Hochrechnung: maximale Distinct-Server je Intervallklasse innerhalb des dokumentierten Limits (Input für C.1) |
| **G.4 Alert-Faden Ende-zu-Ende** | Trägt die Pipeline-Idee? | Fake-Event → Regel-Match → Discord-Embed in Test-Guild, P95 < 10 s über 100 Wiederholungen, **0 Duplikate bei absichtlichem Worker-Kill mitten in der Zustellung** (Dedup-Key-Beweis) |
| **G.5 RustMaps-Lookup** | Funktioniert der asynchrone Generierungs-Flow? | Seed+Size eines frisch gewipten Servers → Map-Metadaten + Monument-Liste liegen normalisiert in der DB; Async-/Polling-Verhalten der API dokumentiert **[Prüfpunkt: Flow]**; Attribution-Anforderungen aus der Antwort auf B.4 notiert |

G.1 und G.2 sind **entscheidungsblockierend** (C.2 bzw. Strategie-These), G.3–G.5 sind **kalibrierend**. Alle fünf gehören in `/experiments` mit Wegwerf-Charakter, wie in 30 vorgesehen.

---

# H. Empfohlene korrigierte Reihenfolge (Woche 1–4)

**Woche 1 – Killer-Fragen zuerst**
- G.1 (Pairing, beide Varianten) und G.2 (.map inkl. Prozedural-Frage) parallel starten; eigener Testserver mit Custom Map + Rust+ aktiv.
- B.2/B.3-Anfrage an BattleMetrics und B.4-Anfrage an RustMaps schriftlich raus (Antwortzeiten sind der Long Pole – früh senden).
- Markenrecherche beauftragen (B.6); Anwalts-Erstgespräch terminieren.
- `docs/boundaries.md` + `docs/legal/checklist.md` committen; ADR-Entwürfe für F.1–F.7 anlegen (Entwurf, noch nicht entschieden).

**Woche 2 – PoCs abschließen, Entscheidungen fällen**
- G.1: 24-h-Soak, Team-Failover-Test, Device-Affinitätstest abschließen.
- G.3 starten (läuft dann in Woche 3 weiter, um einen Wipe-Donnerstag mitzunehmen).
- **Entscheidungs-Meeting Ende Woche 2:** F.1 (Pairing-Variante → Konsequenz für Phasenplan festhalten), F.2 (NestJS/Fastify), F.3 (WS-Lib), F.4 (Event-Bus), F.5 (DB-Betrieb – abhängig von Timescale-Verfügbarkeitscheck aus B.8), F.6 (Auth). Ergebnis als ADR-001…010 fixieren.
- Kostenmodell v1 mit den bis dahin vorliegenden Angeboten (B.10).

**Woche 3 – Schlankes Fundament**
- Monorepo-Skelett (Turborepo + pnpm + Cargo), CI (Lint/Typecheck/Test/Build), `infra/docker-compose.dev.yml` (PG[+Timescale je nach F.5], Redis, MinIO).
- `packages/shared` (Grid-/Koordinaten-Utils mit Tests – erster echter Code, wie in 30 geplant) und `packages/database` v0 – **nur** die Tabellen für die Server-Säule inkl. der C.5-Ergänzung `watchlists`; kein `api_keys`, kein `player_profiles`, kein `map_prefabs`.
- **Nur Staging-Environment**; Prod-Deploy-Pfad, Grafana-Dashboards und IaC aus Phase 1 auf „vor Beta" verschieben (Abspecken von Phase 1 gegenüber Plan).
- G.3 weiterlaufen lassen (50 → 500 Server), G.5 durchführen sobald RustMaps-Key vorliegt.

**Woche 4 – Ein vertikaler Durchstich statt Breite**
- Poller → Snapshot → Wipe-Detector v0 → Alert-Regel → Discord-Embed in Test-Guild (< 10 s) als durchgehender Faden im echten Repo (Übernahme der PoC-Erkenntnisse, kein PoC-Code).
- Minimal-API (Health, Server-Detail, History) + eine einzige Web-Seite (Server-Detail mit Pop-Chart) darauf.
- G.4-Kriterien gegen diesen Durchstich abnehmen (inkl. Worker-Kill-Test).
- **Review-Gate Ende Woche 4:** Risikomatrix (25) mit allen PoC-/Terms-Ergebnissen aktualisieren; Phasenplan gemäß C.2/C.3 umsortieren; Go/No-Go je Datenquelle dokumentieren (entspricht dem DoD von Phase 0, jetzt mit belastbarer Grundlage).

Damit ist nach vier Wochen belegt oder widerlegt, was der Plan heute nur annimmt – ohne dass in Foundation-Breite investiert wurde, die bei negativem PoC-Ausgang umsonst wäre.

---

# I. Finaler Startbeschluss

## **Go mit Auflagen.**

Der Plan ist als Fundament tragfähig; die Isolations-Architektur, die Quellen-Disziplin und die Anti-Cheat-Grenzen sind seine substanziellen Stärken. Ein uneingeschränktes Go verbietet sich, weil zwei entscheidungsblockierende Fragen offen sind (Pairing-Architektur, Prozedural-Map-Verfügbarkeit), eine ökonomische Lücke besteht (globales Polling-Budget) und der Phasenplan eine interne Inkonsistenz (Desktop-Fallback vor Desktop-Existenz) sowie eine strategisch zu späte Monetarisierung enthält.

**Auflagen (bindend):**
1. Kein produktiver Code außerhalb `/experiments`, bevor die Blocker B.1–B.10 abgearbeitet oder terminiert sind; G.1 und G.2 müssen mit dokumentiertem Ergebnis abgeschlossen sein, bevor der Phasenplan verbindlich wird.
2. Änderungen C.1 (Polling-Budget), C.2 (Pairing/Desktop-Sequenz) und C.3 (Monetarisierungs-Sequenz) werden vor Phase 1 in den Plan eingearbeitet; C.4–C.8 spätestens vor der jeweils betroffenen Phase.
3. Die fehlenden Entscheidungen F.1–F.7 werden als ADRs im Kickoff fixiert (Woche-2-Meeting, → H); F.8–F.12 vor Phase 3.
4. Kein öffentliches Branding (Domain, Logo, öffentliches Repo, Social-Handles) unter dem Namen „RustMasterTool" vor Abschluss der Markenprüfung (Matrix #7).
5. Der SEO-Kanal öffentlicher Server-Detailseiten bleibt gesperrt, bis die BM-Terms-Frage (B.3) schriftlich beantwortet ist.

**No-Go-Trigger (vorab definiert, damit später nicht verhandelt wird):** BattleMetrics verweigert die kommerzielle Nutzung oder bepreist sie prohibitiv → Server-Säule neu bewerten, Projektstopp-Option. Beide Pairing-Varianten scheitern im PoC → Live-Säule streichen und Produktthese neu prüfen. Beides ist nach heutigem Kenntnisstand unwahrscheinlich, aber genau dafür ist Phase 0 da.

---

*Ende des Reviews. Erstellt gegen Planversion 1.0; bei Planänderungen Abschnittsverweise prüfen.*
