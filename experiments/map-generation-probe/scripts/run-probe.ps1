param (
    [int]$Seed = 1321,
    [int]$Size = 4750
)

$ErrorActionPreference = "Stop"

$Identity = "mapgen-$Seed-$Size"
$ProbeDir = (Resolve-Path "$PSScriptRoot\..").Path
$ServerDir = "$ProbeDir\server"
$OutputDir = "$ProbeDir\output"

if (-not (Test-Path $ServerDir)) { New-Item -ItemType Directory -Force -Path $ServerDir | Out-Null }

Write-Host "Building Docker image..."
docker build -t rust-map-probe "$ProbeDir\docker"

Write-Host "Starting Rust Map Generation Probe Container (Seed: $Seed, Size: $Size)..."
$StartTime = Get-Date

# Remove old container if exists safely
if (docker ps -a -q -f name=rust_map_gen) {
    docker rm -f rust_map_gen | Out-Null
}

# Convert Windows path for Docker volume
$VolumePath = $ServerDir.Replace("\", "/")
# Run detached
docker run -d --name rust_map_gen -v "${VolumePath}:/server" -e MAP_SEED=$Seed -e MAP_SIZE=$Size rust-map-probe

# The .map file will be at server/server/mapgen-1321-4750/proceduralmap.4750.1321.xxx.map
$MapDir = "$ServerDir\server\$Identity"
$FoundMap = $null

Write-Host "Polling for .map file in $MapDir ..."
$TimeoutMinutes = 30
$WaitUntil = $StartTime.AddMinutes($TimeoutMinutes)

while ((Get-Date) -lt $WaitUntil) {
    if (Test-Path $MapDir) {
        $Files = Get-ChildItem -Path $MapDir -Filter "*.map"
        if ($Files.Count -gt 0) {
            $FoundMap = $Files[0]
            break
        }
    }
    Start-Sleep -Seconds 10
    
    # Check if container is still running
    $StatusStr = $(docker ps -q -f name=rust_map_gen)
    if (-not $StatusStr) {
        Write-Host "Container stopped unexpectedly."
        Write-Host "=== CONTAINER LOGS ==="
        # Remove ErrorActionPreference locally for logs
        $errAction = $ErrorActionPreference
        $ErrorActionPreference = "Continue"
        docker logs --tail 50 rust_map_gen
        $ErrorActionPreference = $errAction
        Write-Host "======================"
        break
    }
}

$EndTime = Get-Date
$Duration = $EndTime - $StartTime

if ($FoundMap) {
    Write-Host "`n[SUCCESS] Map file generated!"
    Write-Host "Path: $($FoundMap.FullName)"
    Write-Host "Size: $([math]::Round($FoundMap.Length / 1MB, 2)) MB"
    Write-Host "Duration: $($Duration.Minutes)m $($Duration.Seconds)s"
    
    # Copy map to output folder
    Copy-Item $FoundMap.FullName -Destination $OutputDir
    Write-Host "Map copied to output folder."
} else {
    Write-Host "`n[FAILURE] Map file not found or process timed out."
    Write-Host "=== CONTAINER LOGS ==="
    docker logs --tail 50 rust_map_gen
    Write-Host "======================"
}

Write-Host "Stopping and cleaning up container..."
docker stop rust_map_gen 2>$null | Out-Null
docker rm rust_map_gen 2>$null | Out-Null

Write-Host "Probe execution finished."
