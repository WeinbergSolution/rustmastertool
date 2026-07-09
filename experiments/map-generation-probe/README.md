# Rust Map Generation Probe (Phase 2.4-C1)

## Purpose
This experiment proves that we can run the Rust Dedicated Server headless locally via Docker to generate a `.map` file for a given seed and world size without running a full game server instance.

## Execution
The execution is containerized. It uses a minimal Ubuntu image, installs SteamCMD and the Rust Dedicated Server (App 258550) on an external volume, and then runs the server in batch mode.

### Prerequisites
- Docker Engine must be running.
- PowerShell 5+.

### Run the Probe
```powershell
.\scripts\run-probe.ps1 -Seed 1321 -Size 4750
```

### Artifacts
- Downloaded server files are cached in `server/`.
- The successfully generated `.map` file is copied to `output/`.

## Architecture Note
This probe avoids downloading a pre-packaged 3rd party Rust Server image to maintain transparency. We define the raw dependencies and execution chain explicitly in `docker/Dockerfile` and `docker/entrypoint.sh`.
