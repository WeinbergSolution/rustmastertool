const fs = require('fs');

const mapPath = process.argv[2] || 'D:\\RustMasterToolMapGen\\output\\proceduralmap.4750.1321.286.map';
const buffer = fs.readFileSync(mapPath);

const idx = buffer.indexOf(Buffer.from("height"));
console.log(`[Height Debug] Found 'height' at ${idx}`);

if (idx !== -1) {
    // Print 32 bytes before and 32 bytes after
    const start = Math.max(0, idx - 32);
    const end = Math.min(buffer.length, idx + 32);
    const slice = buffer.slice(start, end);
    console.log(slice.toString('hex').match(/.{1,2}/g).join(' '));
    console.log(slice.toString('ascii').replace(/[^\x20-\x7E]/g, '.'));
}
