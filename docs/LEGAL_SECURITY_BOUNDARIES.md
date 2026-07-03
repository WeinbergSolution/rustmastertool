# Legal & Security Boundaries

Diese Datei definiert harte Grenzen, die vor jeder Codezeile gelten.

## Anti-Cheat
- Kein Prozesszugriff auf Rust.
- Kein Memory Reading / Writing.
- Kein Code-Injection oder Overlays.
- Alle Daten basieren auf offiziellen APIs oder lokalen statischen Dateien (`.map`), ohne den Client zur Laufzeit zu modifizieren.

## Datenschutz
- Keine serverweite/globale Dossier-Bildung über fremde Spieler (`player_profiles` gestrichen).
- Nutzernotizen (`team_notes`) verfallen automatisch (Auto-Expiry) und sind nicht teamübergreifend durchsuchbar.
- PII (SteamID) nur wo zwingend für Login/Pairing nötig.

## Terms of Service
- BattleMetrics: Keine Nutzung ohne Klärung der kommerziellen Erlaubnis. Keine öffentlichen SEO-Seiten ohne Erlaubnis.
- RustMaps: Caching und Re-Hosting von Bildern nur, wenn vertraglich erlaubt. Attribution ist Pflicht.
- Rust+ Companion: Zugriff erfolgt im Namen und mit Zustimmung des Users (sein Token).
