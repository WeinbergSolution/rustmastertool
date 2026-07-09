param (
    [int]$Seed = 1321,
    [int]$Size = 4750,
    [string]$DataRoot = "D:\RustMasterToolMapGen"
)

$ErrorActionPreference = "Stop"

# 1. Create DataRoot Directories First
if (-not (Test-Path $DataRoot)) { New-Item -ItemType Directory -Force -Path $DataRoot | Out-Null }
$Dirs = @("steamcmd", "server", "output", "logs")
foreach ($Dir in $Dirs) {
    $Path = Join-Path $DataRoot $Dir
    if (-not (Test-Path $Path)) { New-Item -ItemType Directory -Force -Path $Path | Out-Null }
}

# 2. Check DataRoot Disk Space
$DriveLetter = $DataRoot.Substring(0, 1)

$Volume = Get-Volume -DriveLetter $DriveLetter -ErrorAction SilentlyContinue
if ($Volume) {
    $FreeGB = $Volume.SizeRemaining / 1GB
    Write-Host "Drive ${DriveLetter}: has $([math]::Round($FreeGB, 2)) GB free."
    if ($FreeGB -lt 20) {
        throw "Drive ${DriveLetter}: has less than 20 GB free space. Aborting."
    }
} else {
    Write-Warning "Could not determine free space for drive ${DriveLetter}:."
}

# 2. Check Docker
Write-Host "Checking Docker..."
docker info 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) {
    throw "Docker is not reachable. Please start Docker Desktop."
}

$Identity = "mapgen-$Seed-$Size"
$ProbeDir = (Resolve-Path "$PSScriptRoot\..").Path

Write-Host "Building Docker image..."
docker build -t rust-map-probe "$ProbeDir\docker"

Write-Host "Starting Rust Map Generation Probe Container (Seed: $Seed, Size: $Size)..."
$StartTime = Get-Date

# Remove old container if exists safely
if (docker ps -a -q -f name=rust_map_gen) {
    docker rm -f rust_map_gen | Out-Null
}

# Convert Windows path for Docker volume
$VolumePath = $DataRoot.Replace("\", "/")
# Run detached
docker run -d --name rust_map_gen -v "${VolumePath}:/data" -e MAP_SEED=$Seed -e MAP_SIZE=$Size rust-map-probe

Write-Host "Waiting for map generation..."
$TimeoutMinutes = 30
$WaitUntil = $StartTime.AddMinutes($TimeoutMinutes)
$FoundMap = $null

while ((Get-Date) -lt $WaitUntil) {
    # The entrypoint script will automatically copy the map to /data/output and exit 0
    $OutputDir = Join-Path $DataRoot "output"
    $Files = Get-ChildItem -Path $OutputDir -Filter "*.map" 2>$null
    if ($Files.Count -gt 0) {
        $FoundMap = $Files[0]
        break
    }
    
    Start-Sleep -Seconds 10
    
    # Check if container is still running
    $StatusStr = $(docker ps -q -f name=rust_map_gen)
    if (-not $StatusStr) {
        Write-Host "Container stopped."
        # If the map is in output, it means it succeeded and exited. Otherwise failure.
        $Files = Get-ChildItem -Path $OutputDir -Filter "*.map" 2>$null
        if ($Files.Count -gt 0) {
            $FoundMap = $Files[0]
        } else {
            Write-Host "=== CONTAINER LOGS ==="
            $errAction = $ErrorActionPreference
            $ErrorActionPreference = "Continue"
            docker logs --tail 50 rust_map_gen
            $ErrorActionPreference = $errAction
            Write-Host "======================"
            Write-Host "FAILURE: Container exited without generating map."
        }
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
    
    $Hash = Get-FileHash -Path $FoundMap.FullName -Algorithm SHA256
    Write-Host "SHA256: $($Hash.Hash)"
} else {
    Write-Host "`n[FAILURE] Map file not found or process timed out."
}

Write-Host "Stopping and cleaning up container..."
docker stop rust_map_gen 2>$null | Out-Null
docker rm rust_map_gen 2>$null | Out-Null

Write-Host "Probe execution finished."
