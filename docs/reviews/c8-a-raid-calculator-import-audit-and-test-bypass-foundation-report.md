# C8-A + C8-B0 — Raid Calculator Import Audit & Test Bypass Foundation Report

**Executive Verdict**: GO

## Status & Tracking
- **Branch**: `experiment/landing-pricing-auth-foundation`
- **Commit Hash**: `[pending]` (Wird beim finalen Commit eingefügt)

## 1. Raid Calculator Audit (rust_raid_calculator.html)
- **Extrahiert / Verstanden**:
  - **Targets**: 12 Basis-Strukturen (Türen, Wände, Fenster, TC, Turret), kategorisiert inkl. HP.
  - **Tools/Explosives**: 15 Typen unterteilt in Explosives (C4, Raketen, Satchel, etc.), Fire (Molotov, Feuerpfeile) und Melee (Jackhammer, Schwerter).
  - **Costs / Logic**: Jeder Target-Typ hat fixe Kosten pro Tool (z.B. Stone Wall = 2 C4, 4 Rockets oder 10 Satchels). Zudem gibt es eine "Combo"-Option (z.B. 1 C4 + 2 Rockets).
  - **Ressourcen**: 14 Basis-Rohstoffe (Sulfur, Charcoal, Metal, etc.). Die Crafting-Costs für die Tools sind hinterlegt.
  - **Akkumulation**: Das Script berechnet, welche Tools wie oft benötigt werden, und schlüsselt diese komplett in die zugrundeliegenden Rohstoffe (z.B. Sulfur, Charcoal) auf.
- **Verworfen**: Das Gemini-AI-Prompting und der Chat-basierte Scanner (da nicht gefragt / für die Basis-UI überflüssig). Das Inline-Styling wurde komplett neu in RustMasterTool's CSS-Design-System überführt.

## 2. Test-Bypass (1337)
- **Funktionsweise**: 
  - Im `BetaAccessGate` gibt es nun einen "DEV ONLY: Test Bypass" Bereich (nur sichtbar für unangemeldete User).
  - Nach Eingabe von `1337` und Klick auf "Activate Dev Bypass" wird `dev_bypass=true` in den `localStorage` geschrieben.
  - Danach (und bei künftigen Reloads) rendert das Gate sofort die `<AppShell>`, komplett ohne Supabase-Session.

## 3. Raid Calculator UI Foundation
- **Integrierte Teile**:
  - Die Datenstrukturen wurden portiert in `raidCalculatorData.ts`.
  - Eine React-Komponente `RaidCalculator.tsx` wurde gebaut.
  - Auswahl der Ziele (Targets), dynamischer "Raid Plan" (Warenkorb) und die Anzeige der "Explosives Required (Combo)" sowie die akkumulierten "Resource Costs" wurden integriert.
- **Wo erreichbar**: In der App über die Sidebar (sofern aktiviert) oder über die Dev-Umgebung via ViewState `raid_calculator`.

## 4. Monitor Overlay Foundation
- **Umsetzung**: `RaidCalculatorWorkbenchFrame.tsx` und die zugehörige `.css`-Datei wurden angelegt. Sie betten den eigentlichen Calculator in einen stark abgedunkelten "Bezel" ein (simuliert einen Monitorrahmen) inklusive sanfter Scanlines und CRT-Curvature-Effekt (Box-Shadows). 

## 5. Datenarchitektur Rust Item Wiki
- **Empfehlung**: Eine neue Typ-Basis `itemWikiTypes.ts` wurde im Ordner `features/learn/item-wiki` erstellt. Sie plant Felder für Basis-Daten (Name, Icon, Category), In-Game Stats (HP, Decay), Beschaffung (Craftable, Scrap Cost, Workbench) und Raid-Widerstand.

## Was bewusst noch NICHT gebaut wurde
- Keine AI-Integration / Scanner.
- Keine massenhafte Datenbefüllung aller ~500 Rust Items.
- Kein Video-Background / 3D-Monitor-Rendering. Das aktuelle Overlay ist reines CSS.
