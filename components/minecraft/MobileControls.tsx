"use client"

import { useEffect, useRef } from "react"
import type { MobileInput } from "./MinecraftWorld"

type Props = {
  inputRef: React.MutableRefObject<MobileInput>
  active: boolean
}

export default function MobileControls({ inputRef, active }: Props) {
  const joystickRef = useRef<HTMLDivElement | null>(null)
  const stickRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const joystick = joystickRef.current
    const stick = stickRef.current
    if (!joystick || !stick) return

    let joyId = -1
    let cx = 0
    let cy = 0
    const radius = 48

    function setStick(dx: number, dy: number) {
      const mag = Math.hypot(dx, dy)
      const ratio = mag > radius ? radius / mag : 1
      const tx = dx * ratio
      const ty = dy * ratio
      stick!.style.transform = `translate(${tx}px, ${ty}px)`
      inputRef.current.moveX = Math.max(-1, Math.min(1, dx / radius))
      inputRef.current.moveY = Math.max(-1, Math.min(1, dy / radius))
    }

    function reset() {
      stick!.style.transform = "translate(0,0)"
      inputRef.current.moveX = 0
      inputRef.current.moveY = 0
    }

    function onStart(e: TouchEvent) {
      for (const t of Array.from(e.changedTouches)) {
        const r = joystick!.getBoundingClientRect()
        if (
          t.clientX >= r.left &&
          t.clientX <= r.right &&
          t.clientY >= r.top &&
          t.clientY <= r.bottom
        ) {
          joyId = t.identifier
          cx = r.left + r.width / 2
          cy = r.top + r.height / 2
          setStick(t.clientX - cx, t.clientY - cy)
          e.preventDefault()
          break
        }
      }
    }
    function onMove(e: TouchEvent) {
      if (joyId === -1) return
      for (const t of Array.from(e.changedTouches)) {
        if (t.identifier === joyId) {
          setStick(t.clientX - cx, t.clientY - cy)
          e.preventDefault()
        }
      }
    }
    function onEnd(e: TouchEvent) {
      for (const t of Array.from(e.changedTouches)) {
        if (t.identifier === joyId) {
          joyId = -1
          reset()
        }
      }
    }
    joystick.addEventListener("touchstart", onStart, { passive: false })
    window.addEventListener("touchmove", onMove, { passive: false })
    window.addEventListener("touchend", onEnd)
    window.addEventListener("touchcancel", onEnd)
    return () => {
      joystick.removeEventListener("touchstart", onStart)
      window.removeEventListener("touchmove", onMove)
      window.removeEventListener("touchend", onEnd)
      window.removeEventListener("touchcancel", onEnd)
    }
  }, [inputRef])

  function pressLook(dx: number, dy: number) {
    inputRef.current.lookX = dx
    inputRef.current.lookY = dy
  }
  function releaseLook() {
    inputRef.current.lookX = 0
    inputRef.current.lookY = 0
  }

  function startBreak() {
    inputRef.current.breaking = true
  }
  function stopBreak() {
    inputRef.current.breaking = false
  }

  function jump() {
    inputRef.current.jump = true
    setTimeout(() => {
      inputRef.current.jump = false
    }, 120)
  }

  if (!active) return null

  return (
    <div className="pointer-events-none absolute inset-0 select-none md:hidden">
      {/* Joystick (left) */}
      <div
        ref={joystickRef}
        className="pointer-events-auto absolute bottom-24 left-4 h-32 w-32 rounded-full border-2 border-white/40 bg-black/30 backdrop-blur"
      >
        <div
          ref={stickRef}
          className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/70 bg-white/30 transition-transform"
        />
      </div>

      {/* Right-side action buttons */}
      <div className="pointer-events-auto absolute bottom-24 right-4 grid grid-cols-3 gap-2">
        <button
          aria-label="look up"
          className="mc-button col-start-2 h-12 w-12 font-mono text-xl"
          onTouchStart={(e) => {
            e.preventDefault()
            pressLook(0, -1.6)
          }}
          onTouchEnd={(e) => {
            e.preventDefault()
            releaseLook()
          }}
        >
          ↑
        </button>
        <button
          aria-label="look left"
          className="mc-button col-start-1 row-start-2 h-12 w-12 font-mono text-xl"
          onTouchStart={(e) => {
            e.preventDefault()
            pressLook(-1.8, 0)
          }}
          onTouchEnd={(e) => {
            e.preventDefault()
            releaseLook()
          }}
        >
          ←
        </button>
        <button
          aria-label="jump / break"
          className="mc-button col-start-2 row-start-2 h-12 w-12 font-mono text-xs"
          onTouchStart={(e) => {
            e.preventDefault()
            startBreak()
          }}
          onTouchEnd={(e) => {
            e.preventDefault()
            stopBreak()
          }}
        >
          MINE
        </button>
        <button
          aria-label="look right"
          className="mc-button col-start-3 row-start-2 h-12 w-12 font-mono text-xl"
          onTouchStart={(e) => {
            e.preventDefault()
            pressLook(1.8, 0)
          }}
          onTouchEnd={(e) => {
            e.preventDefault()
            releaseLook()
          }}
        >
          →
        </button>
        <button
          aria-label="look down"
          className="mc-button col-start-2 row-start-3 h-12 w-12 font-mono text-xl"
          onTouchStart={(e) => {
            e.preventDefault()
            pressLook(0, 1.6)
          }}
          onTouchEnd={(e) => {
            e.preventDefault()
            releaseLook()
          }}
        >
          ↓
        </button>
        <button
          aria-label="jump"
          className="mc-button col-start-3 row-start-3 h-12 w-12 font-mono text-[10px]"
          onTouchStart={(e) => {
            e.preventDefault()
            jump()
          }}
        >
          JUMP
        </button>
      </div>
    </div>
  )
}
