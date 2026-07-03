# RustMasterTool - Project Charter

## Zweck
RustMasterTool ist eine eigenständig entwickelte Companion-Plattform für das Survival-Spiel Rust. Phase 0 dient der Konsolidierung, Validierung kritischer Annahmen (durch PoCs) und der rechtlichen Absicherung, bevor produktiver Code geschrieben wird.

## Arbeitsmodus (Phase 0)
- Kein produktiver Feature-Code außerhalb von `/experiments`.
- Keine echten API-Keys im Code oder Repository.
- Keine produktiven Integrationen (BattleMetrics, RustMaps, Rust+, Billing).
- Keine SEO-Serverseiten (Sperre bis schriftliche Freigabe).
- Keine öffentliche Branding-Vorbereitung bis Markenprüfung ("Rust" im Namen) abgeschlossen ist.
- Alle Architekturänderungen erfordern ein ADR.
- Unsichere Fragen sind als **[Prüfpunkt]** markiert.

## Projektregeln
- **Kein Cheat, kein Memory Reading, keine Injection.**
- **Kein Prozesszugriff auf Rust.**
- **Kein Anti-Cheat-Risiko.**
- Keine kopierten Assets, Texte, Designs oder Namen von Konkurrenzprodukten.
- "RustMasterTool" bleibt interner Arbeitsname.
