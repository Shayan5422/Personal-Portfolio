"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"
import { getCrackTextures, getTextures } from "./textures"
import {
  SECTION_BLOCKS,
  type BlockKind,
  type SectionBlock,
  type SectionId,
} from "./data"

const BLOCK_SIZE = 1
const WORLD_RADIUS = 28
const SKY_COLOR = 0x8ecbff

type TerrainBlock = {
  x: number
  y: number
  z: number
  kind: BlockKind
}

function buildTerrain(): TerrainBlock[] {
  const blocks: TerrainBlock[] = []
  const sectionPositions = new Set(
    SECTION_BLOCKS.map((b) => `${b.position[0]}|${b.position[2]}`),
  )
  const rng = (x: number, z: number) => {
    // small hash
    const h = Math.sin(x * 12.9898 + z * 78.233) * 43758.5453
    return h - Math.floor(h)
  }

  // ground + small hills
  for (let x = -WORLD_RADIUS; x <= WORLD_RADIUS; x++) {
    for (let z = -WORLD_RADIUS; z <= WORLD_RADIUS; z++) {
      // pseudo height: gentle rolling hills near edges
      const dist = Math.sqrt(x * x + z * z)
      let h = 0
      if (dist > 18) {
        h = Math.floor(rng(x, z) * 3 + (dist - 18) * 0.3)
      } else if (dist > 12) {
        h = Math.floor(rng(x, z) * 2)
      }

      // stone below
      for (let y = -2; y < 0; y++) {
        blocks.push({ x, y, z, kind: "stone" })
      }
      // dirt + grass on top
      for (let y = 0; y <= h; y++) {
        const top = y === h
        blocks.push({ x, y, z, kind: top ? "grass" : "dirt" })
      }
    }
  }

  // path of light stone bricks (planks) leading outward
  const pathSpots: Array<[number, number]> = []
  // central square 5x5
  for (let x = -2; x <= 2; x++) {
    for (let z = -2; z <= 2; z++) pathSpots.push([x, z])
  }
  // arms toward each section
  for (const sb of SECTION_BLOCKS) {
    const [sx, , sz] = sb.position
    const steps = Math.max(Math.abs(sx), Math.abs(sz))
    for (let i = 0; i <= steps; i++) {
      const t = i / steps
      const px = Math.round(sx * t)
      const pz = Math.round(sz * t)
      pathSpots.push([px, pz])
    }
  }
  for (const [px, pz] of pathSpots) {
    // replace topmost grass with plank
    // remove any existing top block at this x,z first
    for (let i = blocks.length - 1; i >= 0; i--) {
      const b = blocks[i]
      if (b.x === px && b.z === pz && b.y === 0 && b.kind === "grass") {
        blocks[i] = { ...b, kind: "plank" }
        break
      }
    }
  }

  // trees scattered
  const treeSpots: Array<[number, number]> = []
  const candidates: Array<[number, number]> = []
  for (let x = -WORLD_RADIUS + 2; x <= WORLD_RADIUS - 2; x += 1) {
    for (let z = -WORLD_RADIUS + 2; z <= WORLD_RADIUS - 2; z += 1) {
      const d = Math.sqrt(x * x + z * z)
      if (d < 6) continue // keep center clear
      if (d > WORLD_RADIUS - 4) continue
      // don't place on section block coords or path
      if (sectionPositions.has(`${x}|${z}`)) continue
      if (Math.abs(x) <= 2 && Math.abs(z) <= 2) continue
      candidates.push([x, z])
    }
  }
  // pick ~14 trees pseudo-randomly
  const treeCount = 18
  for (let i = 0; i < treeCount; i++) {
    const r = rng(i + 91, i * 7)
    const idx = Math.floor(r * candidates.length)
    const pick = candidates[idx]
    if (!pick) continue
    treeSpots.push(pick)
    candidates.splice(idx, 1)
  }
  for (const [tx, tz] of treeSpots) {
    // determine ground height at tx,tz
    let ground = 0
    for (const b of blocks) {
      if (b.x === tx && b.z === tz && b.y >= ground && b.kind === "grass") {
        ground = b.y
      }
    }
    const trunkH = 4 + Math.floor(rng(tx + 1, tz - 1) * 2)
    for (let y = ground + 1; y <= ground + trunkH; y++) {
      blocks.push({ x: tx, y, z: tz, kind: "log" })
    }
    const top = ground + trunkH
    for (let lx = -2; lx <= 2; lx++) {
      for (let lz = -2; lz <= 2; lz++) {
        for (let ly = 0; ly <= 2; ly++) {
          if (Math.abs(lx) === 2 && Math.abs(lz) === 2 && ly !== 1) continue
          if (lx === 0 && lz === 0 && ly === 0) continue
          if (Math.abs(lx) === 2 && Math.abs(lz) === 2 && Math.random() > 0.6)
            continue
          blocks.push({
            x: tx + lx,
            y: top + ly,
            z: tz + lz,
            kind: "leaves",
          })
        }
      }
    }
    // top leaf cap
    blocks.push({ x: tx, y: top + 3, z: tz, kind: "leaves" })
  }

  // a sand patch / pond
  for (let x = -3; x <= -1; x++) {
    for (let z = 14; z <= 17; z++) {
      blocks.push({ x, y: 0, z, kind: "sand" })
    }
  }
  for (let x = -2; x <= -1; x++) {
    for (let z = 15; z <= 16; z++) {
      blocks.push({ x, y: 0, z, kind: "water" })
    }
  }

  // pedestals for section blocks — wipe any terrain that happens to
  // have generated at the section's column at or above y=0 (hills near
  // the edge of the world can otherwise spawn a grass block right on
  // top of the pedestal and z-fight with the section block).
  for (const sb of SECTION_BLOCKS) {
    const [sx, , sz] = sb.position
    for (let i = blocks.length - 1; i >= 0; i--) {
      const b = blocks[i]
      if (b.x === sx && b.z === sz && b.y >= 0) {
        blocks.splice(i, 1)
      }
    }
    blocks.push({ x: sx, y: 0, z: sz, kind: "plank" })
  }

  return blocks
}

type Props = {
  active: boolean
  paused: boolean
  onSectionBreak: (id: SectionId) => void
  onPause: () => void
  onFall: () => void
  respawnTick: number
  mobileInputRef: React.MutableRefObject<MobileInput>
}

const SPAWN: [number, number, number] = [0, 2.6, 4]
const FALL_THRESHOLD = -10
const PLAYER_RADIUS = 0.3
const EYE_HEIGHT = 1.6
const HEAD_OFFSET = 0.2

export type MobileInput = {
  moveX: number // -1..1 strafe
  moveY: number // -1..1 forward/back
  lookX: number // delta yaw (radians per frame influence)
  lookY: number // delta pitch
  jump: boolean
  breaking: boolean
}

export default function MinecraftWorld({
  active,
  paused,
  onSectionBreak,
  onPause,
  onFall,
  respawnTick,
  mobileInputRef,
}: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const [targetLabel, setTargetLabel] = useState<string | null>(null)

  // Sync the latest props into refs so the animation loop reads
  // fresh values without forcing the heavy world-setup effect to re-run.
  const pausedRef = useRef(paused)
  const activeRef = useRef(active)
  const onSectionBreakRef = useRef(onSectionBreak)
  const onPauseRef = useRef(onPause)
  const onFallRef = useRef(onFall)
  useEffect(() => {
    pausedRef.current = paused
  }, [paused])
  useEffect(() => {
    activeRef.current = active
  }, [active])
  useEffect(() => {
    onSectionBreakRef.current = onSectionBreak
  }, [onSectionBreak])
  useEffect(() => {
    onPauseRef.current = onPause
  }, [onPause])
  useEffect(() => {
    onFallRef.current = onFall
  }, [onFall])

  // A small ticking ref used to signal the world to teleport the player
  // back to spawn (incremented from the parent on respawn).
  const respawnTickRef = useRef(respawnTick)
  const respawnHandlerRef = useRef<() => void>(() => {})
  useEffect(() => {
    if (respawnTick !== respawnTickRef.current) {
      respawnTickRef.current = respawnTick
      respawnHandlerRef.current()
    }
  }, [respawnTick])

  const terrain = useMemo(() => buildTerrain(), [])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(SKY_COLOR)
    scene.fog = new THREE.Fog(SKY_COLOR, 30, 80)

    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      300,
    )
    // spawn position - center, slightly elevated
    camera.position.set(0, 2.6, 4)
    // yaw/pitch system separate from camera quaternion
    const yawObj = new THREE.Object3D()
    const pitchObj = new THREE.Object3D()
    yawObj.add(pitchObj)
    pitchObj.add(camera)
    yawObj.position.copy(camera.position)
    camera.position.set(0, 0, 0)
    scene.add(yawObj)

    const renderer = new THREE.WebGLRenderer({ antialias: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)

    // Lights
    const hemi = new THREE.HemisphereLight(0xfff8e0, 0x4a6a2a, 0.85)
    scene.add(hemi)
    const sun = new THREE.DirectionalLight(0xfff1c0, 1.0)
    sun.position.set(40, 60, 20)
    scene.add(sun)

    // Build geometry / materials
    const textures = getTextures()

    function makeBlockMaterials(kind: BlockKind): THREE.Material[] {
      const set = textures[kind]
      const makeMat = (tex: THREE.Texture) => {
        const opts: THREE.MeshLambertMaterialParameters = {
          map: tex,
          transparent: !!set.transparent,
          alphaTest: set.transparent ? 0.5 : 0,
        }
        if (set.emissive !== undefined) {
          opts.emissive = new THREE.Color(set.emissive)
          opts.emissiveMap = tex
        }
        return new THREE.MeshLambertMaterial(opts)
      }
      // order: +x, -x, +y, -y, +z, -z
      return [
        makeMat(set.side),
        makeMat(set.side),
        makeMat(set.top),
        makeMat(set.bottom),
        makeMat(set.side),
        makeMat(set.side),
      ]
    }

    const geometry = new THREE.BoxGeometry(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)

    // group terrain by kind and use InstancedMesh per kind for perf
    const byKind = new Map<BlockKind, TerrainBlock[]>()
    for (const b of terrain) {
      let arr = byKind.get(b.kind)
      if (!arr) {
        arr = []
        byKind.set(b.kind, arr)
      }
      arr.push(b)
    }
    const instancedMeshes: THREE.InstancedMesh[] = []
    const dummy = new THREE.Object3D()
    for (const [kind, list] of byKind) {
      const mats = makeBlockMaterials(kind)
      const mesh = new THREE.InstancedMesh(geometry, mats, list.length)
      mesh.name = `terrain:${kind}`
      for (let i = 0; i < list.length; i++) {
        const b = list[i]
        dummy.position.set(b.x, b.y + 0.5, b.z)
        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)
      }
      mesh.instanceMatrix.needsUpdate = true
      scene.add(mesh)
      instancedMeshes.push(mesh)
    }

    // Section blocks (individual meshes so we can manage break progress)
    type SectionMesh = {
      block: SectionBlock
      mesh: THREE.Mesh
      progress: number // 0..1
    }
    const sectionMeshes: SectionMesh[] = []
    for (const sb of SECTION_BLOCKS) {
      const mats = makeBlockMaterials(sb.kind)
      const mesh = new THREE.Mesh(geometry, mats)
      mesh.position.set(
        sb.position[0],
        sb.position[1] + 0.5,
        sb.position[2],
      )
      mesh.userData.sectionId = sb.id
      mesh.userData.label = sb.label
      mesh.name = `section:${sb.id}`
      scene.add(mesh)
      sectionMeshes.push({ block: sb, mesh, progress: 0 })
    }

    // Floating labels above section blocks (sprites)
    function makeLabelSprite(text: string): THREE.Sprite {
      const canvas = document.createElement("canvas")
      canvas.width = 256
      canvas.height = 64
      const ctx = canvas.getContext("2d")!
      ctx.fillStyle = "rgba(0,0,0,0.7)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = "rgba(255,255,255,0.4)"
      ctx.lineWidth = 2
      ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2)
      ctx.font = "bold 28px monospace"
      ctx.fillStyle = "#ffffff"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(text, canvas.width / 2, canvas.height / 2)
      const tex = new THREE.CanvasTexture(canvas)
      tex.magFilter = THREE.NearestFilter
      tex.minFilter = THREE.LinearFilter
      const mat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        depthTest: false,
      })
      const sprite = new THREE.Sprite(mat)
      sprite.scale.set(2.2, 0.55, 1)
      return sprite
    }
    for (const sm of sectionMeshes) {
      const sprite = makeLabelSprite(sm.block.label)
      sprite.position.set(
        sm.block.position[0],
        sm.block.position[1] + 1.7,
        sm.block.position[2],
      )
      sprite.renderOrder = 999
      scene.add(sprite)
    }

    // Cracking overlay mesh (slightly larger transparent box at target)
    const crackTextures = getCrackTextures()
    const crackMaterials = crackTextures.map(
      (t) =>
        new THREE.MeshBasicMaterial({
          map: t,
          transparent: true,
          depthWrite: false,
          polygonOffset: true,
          polygonOffsetFactor: -1,
        }),
    )
    const crackGeom = new THREE.BoxGeometry(
      BLOCK_SIZE * 1.001,
      BLOCK_SIZE * 1.001,
      BLOCK_SIZE * 1.001,
    )
    const crackMesh = new THREE.Mesh(crackGeom, crackMaterials[0])
    crackMesh.visible = false
    scene.add(crackMesh)

    // Selection outline
    const outlineGeom = new THREE.BoxGeometry(
      BLOCK_SIZE * 1.005,
      BLOCK_SIZE * 1.005,
      BLOCK_SIZE * 1.005,
    )
    const outlineMesh = new THREE.LineSegments(
      new THREE.EdgesGeometry(outlineGeom),
      new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.5 }),
    )
    outlineMesh.visible = false
    scene.add(outlineMesh)

    // Clouds — flat planes drifting
    const cloudGroup = new THREE.Group()
    scene.add(cloudGroup)
    const cloudMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    })
    for (let i = 0; i < 14; i++) {
      const w = 4 + Math.random() * 6
      const d = 3 + Math.random() * 5
      const geom = new THREE.BoxGeometry(w, 0.6, d)
      const cloud = new THREE.Mesh(geom, cloudMat)
      cloud.position.set(
        (Math.random() - 0.5) * 80,
        20 + Math.random() * 6,
        (Math.random() - 0.5) * 80,
      )
      cloudGroup.add(cloud)
    }

    // -------- Controls --------
    let yaw = 0
    let pitch = 0
    const keys: Record<string, boolean> = {}
    let velocityY = 0
    let onGround = true

    // pointer-lock based mouse look
    const canvas = renderer.domElement
    function requestLock() {
      if (document.pointerLockElement !== canvas) {
        canvas.requestPointerLock?.()
      }
    }
    function onClick() {
      if (pausedRef.current) return
      if (!activeRef.current) return
      requestLock()
    }
    canvas.addEventListener("click", onClick)

    function onMouseMove(e: MouseEvent) {
      if (document.pointerLockElement !== canvas) return
      const sens = 0.0025
      yaw -= e.movementX * sens
      pitch -= e.movementY * sens
      const limit = Math.PI / 2 - 0.05
      pitch = Math.max(-limit, Math.min(limit, pitch))
    }
    document.addEventListener("mousemove", onMouseMove)

    function onKeyDown(e: KeyboardEvent) {
      if (e.code === "Escape") {
        if (document.pointerLockElement === canvas) {
          document.exitPointerLock?.()
        }
        onPauseRef.current()
        return
      }
      keys[e.code] = true
    }
    function onKeyUp(e: KeyboardEvent) {
      keys[e.code] = false
    }
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("keyup", onKeyUp)

    let mouseDown = false
    function onMouseDown(e: MouseEvent) {
      if (e.button === 0) mouseDown = true
    }
    function onMouseUp(e: MouseEvent) {
      if (e.button === 0) mouseDown = false
    }
    canvas.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mouseup", onMouseUp)

    // resize
    function onResize() {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener("resize", onResize)

    // Collision: top-block-height map. heightMap.get(`${x}|${z}`) gives
    // the highest occupied integer y at that column. Columns absent
    // from the map are void (player falls forever in those columns).
    const heightMap = new Map<string, number>()
    const minYMap = new Map<string, number>()
    for (const b of terrain) {
      if (b.kind === "water" || b.kind === "leaves") continue
      const key = `${b.x}|${b.z}`
      const h = heightMap.get(key)
      if (h === undefined || b.y > h) heightMap.set(key, b.y)
      const mn = minYMap.get(key)
      if (mn === undefined || b.y < mn) minYMap.set(key, b.y)
    }
    for (const sm of sectionMeshes) {
      const [sx, sy, sz] = sm.block.position
      const key = `${sx}|${sz}`
      const h = heightMap.get(key)
      if (h === undefined || sy > h) heightMap.set(key, sy)
    }

    function topAt(x: number, z: number): number | null {
      const cx = Math.round(x)
      const cz = Math.round(z)
      const h = heightMap.get(`${cx}|${cz}`)
      return h === undefined ? null : h + 1
    }

    function highestFloorUnder(x: number, z: number): number | null {
      // Use the AABB footprint, not just the player's centre, so the
      // player can stand on the edge of a block.
      let best: number | null = null
      const minX = Math.floor(x - PLAYER_RADIUS + 0.5)
      const maxX = Math.floor(x + PLAYER_RADIUS + 0.5)
      const minZ = Math.floor(z - PLAYER_RADIUS + 0.5)
      const maxZ = Math.floor(z + PLAYER_RADIUS + 0.5)
      for (let cx = minX; cx <= maxX; cx++) {
        for (let cz = minZ; cz <= maxZ; cz++) {
          const h = heightMap.get(`${cx}|${cz}`)
          if (h !== undefined) {
            const top = h + 1
            if (best === null || top > best) best = top
          }
        }
      }
      return best
    }

    function solidAt(cx: number, cy: number, cz: number): boolean {
      const top = heightMap.get(`${cx}|${cz}`)
      if (top === undefined) return false
      const bottom = minYMap.get(`${cx}|${cz}`) ?? -3
      return cy <= top && cy >= bottom
    }

    function collidesAt(px: number, py: number, pz: number): boolean {
      const feet = py - EYE_HEIGHT + 0.01
      const head = py + HEAD_OFFSET - 0.01
      const minCX = Math.floor(px - PLAYER_RADIUS + 0.5)
      const maxCX = Math.floor(px + PLAYER_RADIUS + 0.5)
      const minCZ = Math.floor(pz - PLAYER_RADIUS + 0.5)
      const maxCZ = Math.floor(pz + PLAYER_RADIUS + 0.5)
      const minCY = Math.floor(feet + 0.5)
      const maxCY = Math.floor(head + 0.5)
      for (let cx = minCX; cx <= maxCX; cx++) {
        for (let cz = minCZ; cz <= maxCZ; cz++) {
          for (let cy = minCY; cy <= maxCY; cy++) {
            if (solidAt(cx, cy, cz)) return true
          }
        }
      }
      return false
    }

    // Raycaster setup
    const raycaster = new THREE.Raycaster()
    const center = new THREE.Vector2(0, 0)
    raycaster.far = 6

    // Spawn / respawn handler — registered into a ref so the
    // parent can trigger it without rebuilding the scene.
    function spawnPlayer() {
      yaw = 0
      pitch = 0
      velocityY = 0
      onGround = true
      yawObj.position.set(SPAWN[0], SPAWN[1], SPAWN[2])
      yawObj.rotation.y = 0
      pitchObj.rotation.x = 0
    }
    respawnHandlerRef.current = spawnPlayer

    // -------- Animation loop --------
    let lastTime = performance.now()
    let raf = 0
    let fallReported = false
    function loop() {
      raf = requestAnimationFrame(loop)
      const now = performance.now()
      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now

      cloudGroup.position.x = (cloudGroup.position.x + dt * 0.6) % 1000

      if (!pausedRef.current && activeRef.current) {
        // ----- Look (mouse already updates yaw/pitch directly; touch
        // input also pushed into yaw/pitch via mob.lookX/lookY).
        const mob = mobileInputRef.current
        if (mob.lookX || mob.lookY) {
          yaw -= mob.lookX * dt
          pitch -= mob.lookY * dt
          const limit = Math.PI / 2 - 0.05
          pitch = Math.max(-limit, Math.min(limit, pitch))
        }
        yawObj.rotation.y = yaw
        pitchObj.rotation.x = pitch

        // ----- Wanted horizontal movement (player-local axes)
        const speed = (keys["ShiftLeft"] || keys["ShiftRight"] ? 7 : 4.5) * dt
        let mx = 0
        let mz = 0
        if (keys["KeyW"] || keys["ArrowUp"]) mz -= 1
        if (keys["KeyS"] || keys["ArrowDown"]) mz += 1
        if (keys["KeyA"] || keys["ArrowLeft"]) mx -= 1
        if (keys["KeyD"] || keys["ArrowRight"]) mx += 1
        mx += mob.moveX
        mz += mob.moveY
        const mag = Math.hypot(mx, mz)
        if (mag > 1) {
          mx /= mag
          mz /= mag
        }
        // Rotate the local (mx, mz) vector by yaw around Y.
        // World x = cos(yaw)*mx + sin(yaw)*mz
        // World z = -sin(yaw)*mx + cos(yaw)*mz
        const sin = Math.sin(yaw)
        const cos = Math.cos(yaw)
        const dx = (cos * mx + sin * mz) * speed
        const dz = (-sin * mx + cos * mz) * speed

        // ----- Axis-separated horizontal collision: try X first, then Z,
        // so the player slides along walls instead of teleporting onto
        // or through them.
        const py = yawObj.position.y
        if (dx !== 0) {
          const nx = yawObj.position.x + dx
          if (!collidesAt(nx, py, yawObj.position.z)) {
            yawObj.position.x = nx
          }
        }
        if (dz !== 0) {
          const nz = yawObj.position.z + dz
          if (!collidesAt(yawObj.position.x, py, nz)) {
            yawObj.position.z = nz
          }
        }

        // ----- Vertical physics (gravity, jump, landing)
        const wantJump = keys["Space"] || mob.jump
        if (wantJump && onGround) {
          velocityY = 8
          onGround = false
        }
        velocityY -= 22 * dt
        let newY = yawObj.position.y + velocityY * dt
        const floor = highestFloorUnder(
          yawObj.position.x,
          yawObj.position.z,
        )
        const feet = newY - EYE_HEIGHT
        if (floor !== null && feet < floor && velocityY <= 0) {
          newY = floor + EYE_HEIGHT
          velocityY = 0
          onGround = true
        } else {
          onGround = false
        }
        // Head-bump: if jumping up into a ceiling, stop ascent.
        if (
          velocityY > 0 &&
          collidesAt(yawObj.position.x, newY, yawObj.position.z)
        ) {
          newY = yawObj.position.y
          velocityY = 0
        }
        yawObj.position.y = newY

        // ----- Fall detection
        if (newY < FALL_THRESHOLD && !fallReported) {
          fallReported = true
          if (document.pointerLockElement === canvas) {
            document.exitPointerLock?.()
          }
          onFallRef.current()
        }
        // Reset the fall flag once the player has been respawned
        // above the threshold (spawnPlayer puts them at SPAWN[1]).
        if (newY >= SPAWN[1] - 0.1) fallReported = false

        // Raycast from camera
        raycaster.setFromCamera(center, camera)
        let hovered: SectionMesh | null = null
        for (const sm of sectionMeshes) {
          const hits = raycaster.intersectObject(sm.mesh, false)
          if (hits.length) {
            hovered = sm
            break
          }
        }
        if (hovered) {
          outlineMesh.position.copy(hovered.mesh.position)
          outlineMesh.visible = true
          setTargetLabel(hovered.block.label)
          const isBreaking = mouseDown || mob.breaking
          if (isBreaking) {
            hovered.progress += dt / (hovered.block.hp / 22)
            if (hovered.progress >= 1) {
              hovered.progress = 0
              // remove visual block (sink into ground and fade)
              const m = hovered.mesh
              const start = m.position.y
              const targetYAnim = start - 1.2
              const startTime = performance.now()
              const dur = 350
              const fadeMats = m.material as THREE.Material[]
              for (const fm of fadeMats) {
                if (fm instanceof THREE.MeshLambertMaterial) {
                  fm.transparent = true
                }
              }
              function fadeStep() {
                const t = Math.min(1, (performance.now() - startTime) / dur)
                m.position.y = start + (targetYAnim - start) * t
                m.scale.setScalar(1 - t * 0.6)
                for (const fm of fadeMats) {
                  if ("opacity" in fm) {
                    ;(fm as THREE.MeshLambertMaterial).opacity = 1 - t
                  }
                }
                if (t < 1) requestAnimationFrame(fadeStep)
                else {
                  m.visible = false
                }
              }
              fadeStep()
              crackMesh.visible = false
              onSectionBreakRef.current(hovered.block.id)
              mouseDown = false
            } else {
              crackMesh.visible = true
              crackMesh.position.copy(hovered.mesh.position)
              const stage = Math.min(
                7,
                Math.floor(hovered.progress * 8),
              )
              crackMesh.material = crackMaterials[stage]
            }
          } else {
            crackMesh.visible = false
            // reset progress on hovered if not breaking
            if (hovered.progress > 0) hovered.progress = 0
          }
        } else {
          crackMesh.visible = false
          outlineMesh.visible = false
          setTargetLabel(null)
        }
      }

      renderer.render(scene, camera)
    }
    loop()

    // pointer-lock change → pause when user releases
    function onLockChange() {
      if (document.pointerLockElement !== canvas && activeRef.current) {
        // don't auto-pause; let parent decide via Escape
      }
    }
    document.addEventListener("pointerlockchange", onLockChange)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("keyup", onKeyUp)
      window.removeEventListener("mouseup", onMouseUp)
      canvas.removeEventListener("click", onClick)
      canvas.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("pointerlockchange", onLockChange)
      if (document.pointerLockElement === canvas) {
        document.exitPointerLock?.()
      }
      renderer.dispose()
      geometry.dispose()
      crackGeom.dispose()
      outlineGeom.dispose()
      for (const m of crackMaterials) m.dispose()
      for (const tex of crackTextures) tex.dispose()
      try {
        if (canvas.parentNode === mount) {
          mount.removeChild(canvas)
        }
      } catch {}
    }
    // We intentionally exclude the callback props — they're routed
    // through refs so that updates to them (e.g. when `openSection`
    // changes) don't tear down and rebuild the whole world.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terrain, mobileInputRef])

  return (
    <div
      ref={mountRef}
      className="absolute inset-0"
      style={{ touchAction: "none" }}
    >
      {targetLabel && (
        <div className="pointer-events-none absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 text-white text-sm font-mono drop-shadow-[2px_2px_0_rgba(0,0,0,0.9)]">
          {targetLabel}
        </div>
      )}
    </div>
  )
}
