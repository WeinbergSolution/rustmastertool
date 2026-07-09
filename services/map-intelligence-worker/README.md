# Map Intelligence Worker

Asynchronous worker skeleton that decodes Rust `.map` files, calculates Resource Density (v0.2), and generates product-ready visual Overlays/Overviews.

## Execution
```bash
dotnet run -- \
  --map-path "D:\RustMasterToolMapGen\output\proceduralmap.4750.1321.286.map" \
  --seed 1321 \
  --world-size 4750 \
  --save-version 286 \
  --out "output"
```
