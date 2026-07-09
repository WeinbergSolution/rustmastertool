# Resource Density Visual Renderer Probe

This probe takes the output from the `ResourceDensityModelProbe` (C5-A) and renders visual Heatmap PNG previews using SixLabors.ImageSharp.

## Input
`experiments/resource-density-model-v1-probe/output/density-matrix-128.json`

## Output
Small 512x512 `.png` files showing estimated resource potential for:
- Generic Nodes
- Stone
- Sulfur
- Metal Ore
