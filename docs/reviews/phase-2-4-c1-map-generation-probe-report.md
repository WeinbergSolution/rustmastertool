# Phase 2.4-C1 Map Generation Probe Report

## Overview
This report documents the results of the isolated "No-App-Probe" for generating a Rust map via a headless Rust Dedicated Server inside a Docker container.

### Probe Details
- **Seed:** 1321
- **World Size:** 4750
- **Level:** Procedural Map
- **Execution Environment:** Docker (Ubuntu 22.04 base image)
- **Container Strategy:** Native installation via SteamCMD inside the container with a volume mount to host for persistent storage.
- **Third-Party Images:** No unverified third-party Docker images were used. A raw `Dockerfile` was authored to download SteamCMD directly.

## Execution Results

- **Status:** **FAILURE**
- **.map File Generated:** No
- **Duration:** 2m 17s (Stopped prematurely during SteamCMD preallocation)
- **Reason for Failure:** The SteamCMD download process failed with `Error! App '258550' state is 0x202 after update job.`. State `0x202` indicates insufficient disk space.
- **Root Cause:** A check of the host filesystem (`Get-Volume -DriveLetter C`) revealed exactly **1.3 GB of remaining disk space**. The Rust Dedicated Server requires approximately **6 GB** of free space to preallocate and download the game files.

### CPU/RAM Observations
Due to the early failure during the preallocation phase, the map generator itself was never launched. CPU/RAM footprint was negligible (only the SteamCMD download agent was active).

## Files Created/Modified
The following isolated infrastructure files were created under `experiments/map-generation-probe/`:
- `README.md`
- `.gitignore` (excludes `server/`, `steamcmd/`, and `output/` contents)
- `docker/Dockerfile` (Ubuntu SteamCMD base)
- `docker/entrypoint.sh` (SteamCMD executor and map generator runner)
- `scripts/run-probe.ps1` (Automated wrapper script)
- `output/.gitkeep`

## Conclusion

**NO-GO** für Phase 2.4-C2 Parser Probe.

Die `.map`-Datei konnte **nicht** erzeugt werden, da dem Host-System der nötige Festplattenspeicherplatz (ca. 6 GB für den Rust Server) fehlt. Solange nicht mindestens 10-15 GB Speicherplatz auf dem Laufwerk freigemacht werden, kann weder der Rust Server lokal in Docker installiert noch die Map generiert werden. Die Infrastruktur (Scripts, Dockerfile) ist funktionsfähig, bricht aber aufgrund physischer Limits ab.

---
**Git Status:**
```text
## experiment/map-generation-probe
?? experiments/map-generation-probe/
```
