const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const lz4 = require('lz4js');

const defaultMapPath = 'D:\\RustMasterToolMapGen\\output\\proceduralmap.4750.1321.286.map';
const mapPath = process.argv[2] || defaultMapPath;

function toHexDump(buffer, length = 256) {
    const len = Math.min(buffer.length, length);
    let hexDump = '';
    for (let i = 0; i < len; i += 16) {
        const slice = buffer.slice(i, i + 16);
        const hex = slice.toString('hex').match(/.{1,2}/g)?.join(' ') || '';
        const ascii = slice.toString('ascii').replace(/[^\x20-\x7E]/g, '.');
        hexDump += `${i.toString(16).padStart(8, '0')}  ${hex.padEnd(48, ' ')}  |${ascii}|\n`;
    }
    return hexDump;
}

function computeSHA256(buffer) {
    return crypto.createHash('sha256').update(buffer).digest('hex').toUpperCase();
}

async function run() {
    console.log(`[Parser Probe] Starting analysis on: ${mapPath}`);
    
    if (!fs.existsSync(mapPath)) {
        console.error(`[Error] File not found: ${mapPath}`);
        process.exit(1);
    }

    const fileBuffer = fs.readFileSync(mapPath);
    console.log(`[Recon] File Size: ${fileBuffer.length} bytes (${(fileBuffer.length / 1024 / 1024).toFixed(2)} MB)`);
    console.log(`[Recon] SHA256:    ${computeSHA256(fileBuffer)}`);

    console.log('\n[Recon] Hexdump of first 256 bytes:');
    console.log(toHexDump(fileBuffer, 256));

    console.log('\n[Decode] Attempting LZ4 decompression...');
    let decompressed = null;
    try {
        decompressed = lz4.decompress(fileBuffer.slice(4));
        console.log(`[Decode] Success! Decompressed size: ${decompressed.length} bytes`);
    } catch (e) {
        console.error(`[Decode] lz4js.decompress failed: ${e.message}`);
    }

    let bufferToAnalyze = decompressed ? Buffer.from(decompressed) : fileBuffer;

    if (!decompressed) {
        console.log('\n[Verdict] Could not decompress LZ4 payload. Analyzing raw file buffer instead (might be uncompressed or using different LZ4 framing).');
    }

    console.log('\n[Level B] Searching for known Rust Map structures (ASCII strings)...');
    
    // Convert to ascii, though binary can have weird matches, it's fast enough for a probe.
    // For large files, doing a full toString('ascii') might take memory, but 45MB is fine for V8.
    const asString = bufferToAnalyze.toString('ascii');
    
    const possibleLayers = ['terrain', 'height', 'topology', 'water', 'ground', 'splat', 'biome', 'alpha', 'prefabs', 'paths'];
    console.log('[Level B] Looking for map layers / keywords:');
    const foundLayers = [];
    possibleLayers.forEach(layer => {
        const index = asString.indexOf(layer);
        if (index !== -1) {
            console.log(`  - Found keyword: "${layer}" at offset ${index}`);
            foundLayers.push(layer);
        }
    });

    const numPrefabsMatch = asString.match(/prefab/gi);
    console.log(`[Level B] Word 'prefab' found ${numPrefabsMatch ? numPrefabsMatch.length : 0} times.`);

    const numPathsMatch = asString.match(/path/gi);
    console.log(`[Level B] Word 'path' found ${numPathsMatch ? numPathsMatch.length : 0} times.`);
    
    const monumentMatch = asString.match(/monument/gi);
    console.log(`[Level B] Word 'monument' found ${monumentMatch ? monumentMatch.length : 0} times.`);

    const summary = {
        status: "SUCCESS",
        level: decompressed ? "C" : "B", // If we could decompress we might call it C, else B
        file: mapPath,
        originalSize: fileBuffer.length,
        decompressedSize: decompressed ? decompressed.length : null,
        foundLayers: foundLayers,
        prefabMentions: numPrefabsMatch ? numPrefabsMatch.length : 0,
        pathMentions: numPathsMatch ? numPathsMatch.length : 0,
        monumentMentions: monumentMatch ? monumentMatch.length : 0
    };

    const outPath = path.join(__dirname, '../output/parser-summary.json');
    fs.writeFileSync(outPath, JSON.stringify(summary, null, 2));
    console.log(`\n[Output] Wrote small summary to ${outPath}`);
}

run().catch(console.error);
