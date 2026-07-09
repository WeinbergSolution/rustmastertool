#!/bin/bash
set -e

echo "================================================="
echo " Installing/Updating Rust Dedicated Server"
echo "================================================="
/steamcmd/steamcmd.sh +force_install_dir /server +login anonymous +app_update 258550 validate +quit

echo "================================================="
echo " Starting Rust Dedicated Server for Map Gen"
echo " Seed: $MAP_SEED | Size: $MAP_SIZE"
echo "================================================="
cd /server

# Rust Dedicated usually needs specific paths or runs fine directly
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:`dirname $0`/RustDedicated_Data/Plugins/x86_64

# We pipe to stdout so we can tail logs from the host
./RustDedicated -batchmode \
  +server.level "Procedural Map" \
  +server.seed $MAP_SEED \
  +server.worldsize $MAP_SIZE \
  +server.identity mapgen-${MAP_SEED}-${MAP_SIZE} \
  -logfile /dev/stdout
