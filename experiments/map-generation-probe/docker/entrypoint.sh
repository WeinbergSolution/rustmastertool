#!/bin/bash
set -e

# /data is mounted from the host (e.g. D:\RustMasterToolMapGen)
mkdir -p /data/server
mkdir -p /data/output
mkdir -p /data/logs

cd /data

echo "================================================="
echo " Installing/Updating Rust Dedicated Server on D:"
echo "================================================="
cd /steamcmd
./steamcmd.sh +force_install_dir /data/server +login anonymous +app_update 258550 validate +quit

echo "================================================="
echo " Starting Rust Dedicated Server for Map Gen"
echo " Seed: $MAP_SEED | Size: $MAP_SIZE"
echo "================================================="
cd /data/server

# Rust Dedicated needs the specific plugin paths
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:`dirname $0`/RustDedicated_Data/Plugins/x86_64

# Run Rust Dedicated with the map output set to identity folder inside /data/server
./RustDedicated -batchmode \
  +server.level "Procedural Map" \
  +server.seed $MAP_SEED \
  +server.worldsize $MAP_SIZE \
  +server.identity "mapgen-${MAP_SEED}-${MAP_SIZE}" \
  -logfile /data/logs/rust_dedicated.log &

# Capture PID to wait on it
RUST_PID=$!

echo "Rust Dedicated Server started with PID $RUST_PID. Waiting for map generation..."

# Wait for process to exit or map file to appear
# Identity path: /data/server/server/mapgen-${MAP_SEED}-${MAP_SIZE}/
MAP_DIR="/data/server/server/mapgen-${MAP_SEED}-${MAP_SIZE}"

while kill -0 $RUST_PID 2>/dev/null; do
    if [ -d "$MAP_DIR" ]; then
        MAP_FILE=$(find "$MAP_DIR" -maxdepth 1 -name "*.map" 2>/dev/null | head -n 1)
        if [ -n "$MAP_FILE" ]; then
            echo "Map file generated: $MAP_FILE"
            # Give it a tiny bit of time to flush to disk
            sleep 5
            echo "Copying map to output directory..."
            cp "$MAP_FILE" /data/output/
            echo "Killing Rust Dedicated Server..."
            kill $RUST_PID || true
            exit 0
        fi
    fi
    sleep 5
done

echo "Rust Dedicated Process exited before map generation was detected."
exit 1
