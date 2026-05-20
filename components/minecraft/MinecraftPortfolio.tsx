"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import HUD from "./HUD"
import InfoPanel from "./InfoPanel"
import MobileControls from "./MobileControls"
import TitleScreen from "./TitleScreen"
import GameOverScreen from "./GameOverScreen"
import { SECTION_BLOCKS, type SectionId } from "./data"
import type { MobileInput } from "./MinecraftWorld"

const MinecraftWorld = dynamic(() => import("./MinecraftWorld"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-[#8ecbff]">
      <div className="font-mono text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.9)]">
        Generating world...
      </div>
    </div>
  ),
})

export default function MinecraftPortfolio() {
  const [started, setStarted] = useState(false)
  const [paused, setPaused] = useState(false)
  const [openSection, setOpenSection] = useState<SectionId | null>(null)
  const [discovered, setDiscovered] = useState<Set<SectionId>>(new Set())
  const [gameOver, setGameOver] = useState(false)
  const [respawnTick, setRespawnTick] = useState(0)

  const mobileInputRef = useRef<MobileInput>({
    moveX: 0,
    moveY: 0,
    lookX: 0,
    lookY: 0,
    jump: false,
    breaking: false,
  })

  // We use refs for the latest state so the callbacks passed into the
  // world can remain referentially stable. This is critical — otherwise
  // toggling `openSection` would recreate the callbacks, rerun the
  // world's useEffect, and tear down/rebuild the whole scene
  // (resetting the player's position).
  const stateRef = useRef({
    openSection: null as SectionId | null,
    gameOver: false,
  })
  useEffect(() => {
    stateRef.current.openSection = openSection
  }, [openSection])
  useEffect(() => {
    stateRef.current.gameOver = gameOver
  }, [gameOver])

  const onSectionBreak = useCallback((id: SectionId) => {
    setDiscovered((prev) => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
    setOpenSection(id)
  }, [])

  const onPause = useCallback(() => {
    if (stateRef.current.openSection) return
    if (stateRef.current.gameOver) return
    setPaused(true)
  }, [])

  const onFall = useCallback(() => {
    setGameOver(true)
  }, [])

  const respawn = useCallback(() => {
    setGameOver(false)
    setRespawnTick((t) => t + 1)
  }, [])

  const active = started && !paused && !openSection && !gameOver

  const allDone =
    discovered.size === SECTION_BLOCKS.length && discovered.size > 0

  useEffect(() => {
    function blockContext(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (target?.tagName === "CANVAS") e.preventDefault()
    }
    window.addEventListener("contextmenu", blockContext)
    return () => window.removeEventListener("contextmenu", blockContext)
  }, [])

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#8ecbff]">
      <MinecraftWorld
        active={active}
        paused={paused || !!openSection || !started || gameOver}
        onSectionBreak={onSectionBreak}
        onPause={onPause}
        onFall={onFall}
        respawnTick={respawnTick}
        mobileInputRef={mobileInputRef}
      />

      <HUD discovered={discovered} active={active} />

      <MobileControls inputRef={mobileInputRef} active={active} />

      {active && (
        <div className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2">
          <div className="mc-tag px-3 py-1 text-center font-mono text-[11px] text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.9)]">
            Hold left-click on a glowing block to mine it · Esc to pause
          </div>
        </div>
      )}

      {allDone && active && (
        <div className="pointer-events-none absolute right-4 top-4 max-w-xs">
          <div className="mc-panel px-4 py-3 text-right font-mono text-xs text-amber-300 drop-shadow-[2px_2px_0_rgba(0,0,0,0.9)]">
            All blocks mined — thanks for exploring!
          </div>
        </div>
      )}

      {gameOver && <GameOverScreen onRespawn={respawn} />}

      {(!started || paused) && !openSection && !gameOver && (
        <TitleScreen
          variant={started ? "paused" : "intro"}
          onStart={() => {
            setStarted(true)
            setPaused(false)
          }}
        />
      )}

      <InfoPanel
        sectionId={openSection}
        onClose={() => setOpenSection(null)}
      />
    </div>
  )
}
