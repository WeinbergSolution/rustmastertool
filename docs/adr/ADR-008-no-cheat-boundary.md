# ADR 008: No Cheat Boundary

**Status:** Accepted

## Entscheidung
Features, die Memory-Reading, Prozess-Injections oder EAC-Umgehungen erfordern, sind strikt verboten. Das Projekt liest nur öffentliche APIs und lokale persistierte Speicherdateien (`.map`).
