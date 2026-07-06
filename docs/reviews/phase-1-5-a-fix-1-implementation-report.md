# Phase 1.5-A-FIX-1 Implementation Report

## Repository-Status
- **Branch:** `feature/phase-1-5-a-ux-three-layer`
- **Commit Hash:** `be6d743` (fix: refresh watchlist summary after mutations)

## Geänderte Dateien
- `apps/web/src/features/dashboard/Dashboard.tsx`
- `apps/web/src/features/dashboard/ServersExplorer.tsx`
- `apps/web/src/features/dashboard/Watchlist.tsx`

## Problem-Analyse: Ursache des Refresh-Bugs
Die Komponenten `Dashboard` (Watchlist Summary), `ServersExplorer` und `Watchlist` (Watchlist View) lasen beim erstmaligen Laden der Komponente (Component Mount) den Zustand aus der Datenbank bzw. dem `localStorage`. Ein Klick auf "Add to Watchlist" aktualisierte jedoch nur den isolierten internen State der auslösenden Komponente (z. B. `ServersExplorer`) und den `localStorage` – benachrichtigte aber nicht parallel laufende Komponenten, dass sich die Datenstruktur geändert hat. Ein Browser Refresh war nötig, um den Mount-Zyklus erneut auszulösen.

## Lösungsansatz & State Management
Die Frontend-State-Verwaltung wurde über eine standardmäßige Event-Driven Architektur optimiert:
1. **Event Dispatching:** Jedes Mal, wenn ein Server lokal (über `localStorage`) zur Watchlist hinzugefügt oder entfernt wird (sowohl aus `ServersExplorer` als auch `Watchlist`), wird nun ein `window.dispatchEvent(new Event('watchlistUpdated'))` gefeuert.
2. **Event Listeners (Summary & Views):** `Dashboard`, `ServersExplorer` und `Watchlist` hängen sich im `useEffect` an dieses Custom Event. Sobald das Event geworfen wird, laden sie sofort synchron ihren State aus dem `localStorage` neu, ohne dass ein Page Refresh ausgelöst wird.
3. **Rollback-Schutz:** Wenn die darauffolgende asynchrone Datenbank-Aktualisierung (`cloudRepo`) über Supabase fehlschlägt, rollt das Frontend die lokale Liste auf den vorherigen Stand zurück, wirft erneut das Update-Event aus (um alle Views zu korrigieren) und gibt dem Nutzer über einen `alert` Feedback. Dadurch wird ein permanent falsch-optimistischer Zustand ("Fake-Erfolg") verhindert.

## Bestätigte Funktionalitäten
- **Watchlist Summary (`Dashboard`):** Aktualisiert sich in Echtzeit, sobald ein Server in einem anderen Panel geadded/removed wird.
- **Watchlist View (`Watchlist`):** Gleicht sich ebenfalls in Echtzeit ab.
- **Server Detail / Cards:** Funktionieren weiterhin einwandfrei, zeigen den korrekten "Watched"-Status der Server.
- **Auth Boundary:** Die Auth Boundary bleibt strikt. Nach Logout wird die Watchlist gelöscht; nach Login lädt die user-scoped DB-Watchlist. Ausgeloggte User können weiterhin nicht auf private Routen zugreifen. Lokale Datenleaks finden nicht statt.

## CI/CD Checks
- **Typecheck:** GREEN (`npm run typecheck:web` ohne Fehler).
- **Build:** GREEN (`npm run build:web` erfolgreich abgeschlossen).
- **Secret Check:** GREEN. Keine Spuren von `VITE_STEAM_API_KEY`, `VITE_BATTLEMETRICS_TOKEN`, `SUPABASE_SERVICE_ROLE_KEY`, `service_role` oder `sb_secret_` im Frontend-Code gefunden. Der String `@steam.rustmastertool.local` wurde in `AuthUI.tsx` identifiziert, dient dort aber *ausschließlich* als logische Überprüfung, um zu **verhindern**, dass diese interne E-Mail-Adresse in UI-Komponenten gerendert wird.

## Owner Test Instructions
1. Wechsle im aktiven Command Center (Dashboard) oder Watchlist View tab.
2. Füge testweise über den "Servers Explorer" Server zur Watchlist hinzu oder entferne sie.
3. Kontrolliere, dass sich die Watchlist Summary im Dashboard sofort aktualisiert, ohne dass ein Seiten-Reload notwendig ist.
4. Öffne im Browser die Entwicklertools, simuliere eine Offline-Umgebung, versuche etwas hinzuzufügen und beachte den "Rollback", der den Fake-State korrigiert.
