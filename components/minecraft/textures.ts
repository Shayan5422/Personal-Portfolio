import * as THREE from "three"
import type { BlockKind } from "./data"

type Painter = (ctx: CanvasRenderingContext2D) => void

const SIZE = 16

function makeCanvasTexture(paint: Painter): THREE.CanvasTexture {
  const canvas = document.createElement("canvas")
  canvas.width = SIZE
  canvas.height = SIZE
  const ctx = canvas.getContext("2d")!
  paint(ctx)
  const tex = new THREE.CanvasTexture(canvas)
  tex.magFilter = THREE.NearestFilter
  tex.minFilter = THREE.NearestFilter
  tex.generateMipmaps = false
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

const RNG = (seed: number) => {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 0xffffffff
  }
}

function paintNoise(
  ctx: CanvasRenderingContext2D,
  colors: string[],
  seed: number,
) {
  const r = RNG(seed)
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      ctx.fillStyle = colors[Math.floor(r() * colors.length)]
      ctx.fillRect(x, y, 1, 1)
    }
  }
}

const grassTop: Painter = (ctx) =>
  paintNoise(
    ctx,
    ["#5cab3a", "#4f9a32", "#6cbf3e", "#3f8a28", "#67b73c"],
    1,
  )

const grassSide: Painter = (ctx) => {
  paintNoise(
    ctx,
    ["#8a6a3b", "#7a5a2e", "#9c7842", "#6f5328", "#8c6e3a"],
    2,
  )
  const r = RNG(3)
  for (let x = 0; x < SIZE; x++) {
    const grassHeight = 3 + Math.floor(r() * 3)
    for (let y = 0; y < grassHeight; y++) {
      const cols = ["#5cab3a", "#4f9a32", "#6cbf3e", "#3f8a28"]
      ctx.fillStyle = cols[Math.floor(r() * cols.length)]
      ctx.fillRect(x, y, 1, 1)
    }
  }
}

const dirt: Painter = (ctx) =>
  paintNoise(
    ctx,
    ["#8a6a3b", "#7a5a2e", "#9c7842", "#6f5328", "#8c6e3a", "#6b4f2a"],
    4,
  )

const stone: Painter = (ctx) =>
  paintNoise(
    ctx,
    ["#7a7a7a", "#6e6e6e", "#888888", "#666666", "#828282"],
    5,
  )

const sand: Painter = (ctx) =>
  paintNoise(
    ctx,
    ["#e6d28b", "#dcc678", "#efde9b", "#d4bb6c", "#e3cf83"],
    6,
  )

const logSide: Painter = (ctx) => {
  paintNoise(ctx, ["#5e3f1f", "#4f3418", "#6a4825"], 7)
  ctx.fillStyle = "#3a2410"
  for (let y = 0; y < SIZE; y++) {
    if (y % 3 === 0) ctx.fillRect(0, y, SIZE, 1)
  }
}

const logTop: Painter = (ctx) => {
  ctx.fillStyle = "#a07a3e"
  ctx.fillRect(0, 0, SIZE, SIZE)
  ctx.fillStyle = "#7a5a2a"
  ctx.fillRect(2, 2, SIZE - 4, SIZE - 4)
  ctx.fillStyle = "#a07a3e"
  ctx.fillRect(4, 4, SIZE - 8, SIZE - 8)
  ctx.fillStyle = "#5e3f1f"
  ctx.fillRect(6, 6, SIZE - 12, SIZE - 12)
  ctx.fillStyle = "#3a2410"
  ctx.fillRect(7, 7, 2, 2)
}

const leaves: Painter = (ctx) => {
  paintNoise(
    ctx,
    [
      "#2f6a23",
      "#3e8a2d",
      "#256019",
      "#458c30",
      "#1d4f12",
      "#3a7e28",
    ],
    8,
  )
  // a few dark gaps
  const r = RNG(9)
  for (let i = 0; i < 8; i++) {
    const x = Math.floor(r() * SIZE)
    const y = Math.floor(r() * SIZE)
    ctx.fillStyle = "rgba(0,0,0,0.25)"
    ctx.fillRect(x, y, 1, 1)
  }
}

const plank: Painter = (ctx) => {
  ctx.fillStyle = "#b1813f"
  ctx.fillRect(0, 0, SIZE, SIZE)
  ctx.fillStyle = "#8a5f25"
  for (let y = 0; y < SIZE; y += 4) {
    ctx.fillRect(0, y, SIZE, 1)
  }
  const r = RNG(10)
  for (let i = 0; i < 30; i++) {
    ctx.fillStyle = r() > 0.5 ? "#c79453" : "#996c2c"
    ctx.fillRect(Math.floor(r() * SIZE), Math.floor(r() * SIZE), 1, 1)
  }
}

const water: Painter = (ctx) => {
  paintNoise(
    ctx,
    ["#2266c8", "#3a7cd6", "#1e5cb5", "#4a8de0", "#2870c8"],
    11,
  )
}

const diamond: Painter = (ctx) => {
  paintNoise(ctx, ["#9be7e7", "#6dd5d5", "#bcf2f2"], 12)
  ctx.fillStyle = "#3aa7a7"
  ctx.fillRect(2, 2, 12, 12)
  ctx.fillStyle = "#7be0e0"
  ctx.fillRect(4, 4, 8, 8)
  ctx.fillStyle = "#c5f5f5"
  ctx.fillRect(6, 6, 2, 2)
  ctx.fillStyle = "#c5f5f5"
  ctx.fillRect(10, 6, 2, 2)
  ctx.fillStyle = "#3aa7a7"
  ctx.fillRect(7, 9, 4, 1)
}

const gold: Painter = (ctx) => {
  paintNoise(ctx, ["#f5d34a", "#dcbb33", "#ffe27a"], 13)
  ctx.fillStyle = "#a87a14"
  ctx.fillRect(2, 2, 12, 12)
  ctx.fillStyle = "#f5d34a"
  ctx.fillRect(4, 4, 8, 8)
  ctx.fillStyle = "#fff1a8"
  ctx.fillRect(5, 5, 2, 2)
  ctx.fillStyle = "#a87a14"
  ctx.fillRect(7, 9, 4, 1)
}

const iron: Painter = (ctx) => {
  paintNoise(ctx, ["#dcdcdc", "#b8b8b8", "#eaeaea", "#a0a0a0"], 14)
  ctx.fillStyle = "#7a7a7a"
  ctx.fillRect(2, 2, 12, 12)
  ctx.fillStyle = "#cfcfcf"
  ctx.fillRect(4, 4, 8, 8)
  ctx.fillStyle = "#f5f5f5"
  ctx.fillRect(5, 5, 2, 2)
}

const emerald: Painter = (ctx) => {
  paintNoise(ctx, ["#4be07b", "#36b864", "#80f0a4"], 15)
  ctx.fillStyle = "#1d6f37"
  ctx.fillRect(2, 2, 12, 12)
  ctx.fillStyle = "#4be07b"
  ctx.fillRect(4, 4, 8, 8)
  ctx.fillStyle = "#a8f4c1"
  ctx.fillRect(6, 6, 2, 2)
}

const bookshelf: Painter = (ctx) => {
  // wood frame
  ctx.fillStyle = "#7a5524"
  ctx.fillRect(0, 0, SIZE, SIZE)
  ctx.fillStyle = "#a07a3e"
  ctx.fillRect(0, 0, SIZE, 2)
  ctx.fillRect(0, SIZE - 2, SIZE, 2)
  // books
  const colors = [
    "#d23a3a",
    "#3a6dd2",
    "#3ad24f",
    "#d2a83a",
    "#a83ad2",
    "#d23a8a",
    "#3ad2c4",
  ]
  const r = RNG(16)
  let x = 1
  while (x < SIZE - 1) {
    const w = 1 + Math.floor(r() * 2)
    ctx.fillStyle = colors[Math.floor(r() * colors.length)]
    ctx.fillRect(x, 3, w, SIZE - 6)
    ctx.fillStyle = "rgba(0,0,0,0.25)"
    ctx.fillRect(x + w, 3, 1, SIZE - 6)
    x += w + 1
  }
}

const beacon: Painter = (ctx) => {
  paintNoise(ctx, ["#a5f0ff", "#7fdcff", "#c6f6ff", "#5cc4e8"], 17)
  ctx.fillStyle = "#2f7a99"
  ctx.fillRect(2, 2, 12, 12)
  ctx.fillStyle = "#5fc4e8"
  ctx.fillRect(4, 4, 8, 8)
  ctx.fillStyle = "#ffffff"
  ctx.fillRect(6, 6, 4, 4)
  ctx.fillStyle = "#a5f0ff"
  ctx.fillRect(7, 7, 2, 2)
}

const bookshelfSideTop: Painter = (ctx) => {
  paintNoise(ctx, ["#7a5524", "#624315", "#8d6630"], 18)
  ctx.fillStyle = "#3a2410"
  for (let y = 0; y < SIZE; y += 5) ctx.fillRect(0, y, SIZE, 1)
}

export type BlockTextureSet = {
  top: THREE.Texture
  bottom: THREE.Texture
  side: THREE.Texture
  transparent?: boolean
  emissive?: number
}

let cached: Partial<Record<BlockKind, BlockTextureSet>> | null = null

export function getTextures(): Record<BlockKind, BlockTextureSet> {
  if (cached && Object.keys(cached).length) {
    return cached as Record<BlockKind, BlockTextureSet>
  }
  const grassTopT = makeCanvasTexture(grassTop)
  const grassSideT = makeCanvasTexture(grassSide)
  const dirtT = makeCanvasTexture(dirt)
  const stoneT = makeCanvasTexture(stone)
  const sandT = makeCanvasTexture(sand)
  const logSideT = makeCanvasTexture(logSide)
  const logTopT = makeCanvasTexture(logTop)
  const leavesT = makeCanvasTexture(leaves)
  const plankT = makeCanvasTexture(plank)
  const waterT = makeCanvasTexture(water)
  const diamondT = makeCanvasTexture(diamond)
  const goldT = makeCanvasTexture(gold)
  const ironT = makeCanvasTexture(iron)
  const emeraldT = makeCanvasTexture(emerald)
  const bookshelfT = makeCanvasTexture(bookshelf)
  const bookshelfTopT = makeCanvasTexture(bookshelfSideTop)
  const beaconT = makeCanvasTexture(beacon)

  cached = {
    grass: { top: grassTopT, bottom: dirtT, side: grassSideT },
    dirt: { top: dirtT, bottom: dirtT, side: dirtT },
    stone: { top: stoneT, bottom: stoneT, side: stoneT },
    sand: { top: sandT, bottom: sandT, side: sandT },
    log: { top: logTopT, bottom: logTopT, side: logSideT },
    leaves: { top: leavesT, bottom: leavesT, side: leavesT, transparent: true },
    plank: { top: plankT, bottom: plankT, side: plankT },
    water: { top: waterT, bottom: waterT, side: waterT, transparent: true },
    diamond: { top: diamondT, bottom: diamondT, side: diamondT, emissive: 0x1f6f6f },
    gold: { top: goldT, bottom: goldT, side: goldT, emissive: 0x3a2c08 },
    iron: { top: ironT, bottom: ironT, side: ironT },
    emerald: { top: emeraldT, bottom: emeraldT, side: emeraldT, emissive: 0x1a5a2c },
    bookshelf: { top: bookshelfTopT, bottom: bookshelfTopT, side: bookshelfT },
    beacon: { top: beaconT, bottom: beaconT, side: beaconT, emissive: 0x2a8aaa },
  }
  return cached as Record<BlockKind, BlockTextureSet>
}

// Cracking overlay textures (8 stages)
export function getCrackTextures(): THREE.Texture[] {
  const result: THREE.Texture[] = []
  for (let stage = 0; stage < 8; stage++) {
    const tex = makeCanvasTexture((ctx) => {
      ctx.clearRect(0, 0, SIZE, SIZE)
      const r = RNG(20 + stage)
      const density = (stage + 1) * 6
      ctx.fillStyle = "rgba(0,0,0,0.85)"
      for (let i = 0; i < density; i++) {
        const x = Math.floor(r() * SIZE)
        const y = Math.floor(r() * SIZE)
        ctx.fillRect(x, y, 1, 1)
      }
      ctx.strokeStyle = "rgba(0,0,0,0.8)"
      ctx.lineWidth = 1
      const lines = Math.min(stage + 1, 6)
      for (let i = 0; i < lines; i++) {
        ctx.beginPath()
        const x1 = Math.floor(r() * SIZE)
        const y1 = Math.floor(r() * SIZE)
        const x2 = x1 + Math.floor((r() - 0.5) * 10)
        const y2 = y1 + Math.floor((r() - 0.5) * 10)
        ctx.moveTo(x1 + 0.5, y1 + 0.5)
        ctx.lineTo(x2 + 0.5, y2 + 0.5)
        ctx.stroke()
      }
    })
    tex.colorSpace = THREE.LinearSRGBColorSpace
    result.push(tex)
  }
  return result
}
