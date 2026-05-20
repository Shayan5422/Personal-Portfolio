"use client"

import { useRef } from "react"
import type { MobileInput } from "./MinecraftWorld"

type Props = {
  inputRef: React.MutableRefObject<MobileInput>
  active: boolean
}

export default function MobileControls({ inputRef, active }: Props) {
  const joystickRef = useRef<HTMLDivElement | null>(null)
  const stickRef = useRef<HTMLDivElement | null>(null)
  const pointerIdRef = useRef<number | null>(null)
  const centerRef = useRef({ x: 0, y: 0 })
  const radiusRef = useRef(40)

  function setStick(dx: number, dy: number) {
    const stick = stickRef.current
    if (!stick) return

    const radius = radiusRef.current
    const mag = Math.hypot(dx, dy)
    const ratio = mag > radius ? radius / mag : 1
    const tx = dx * ratio
    const ty = dy * ratio

    stick.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`
    inputRef.current.moveX = Math.max(-1, Math.min(1, tx / radius))
    inputRef.current.moveY = Math.max(-1, Math.min(1, ty / radius))
  }

  function resetStick() {
    const stick = stickRef.current
    if (stick) {
      stick.style.transform = "translate(-50%, -50%)"
    }
    inputRef.current.moveX = 0
    inputRef.current.moveY = 0
  }

  function onJoystickPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (pointerIdRef.current !== null) return

    const joystick = joystickRef.current
    if (!joystick) return

    const rect = joystick.getBoundingClientRect()
    pointerIdRef.current = e.pointerId
    centerRef.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }
    radiusRef.current = Math.max(28, Math.min(rect.width, rect.height) * 0.34)
    joystick.setPointerCapture(e.pointerId)
    setStick(e.clientX - centerRef.current.x, e.clientY - centerRef.current.y)
    e.preventDefault()
  }

  function onJoystickPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (pointerIdRef.current !== e.pointerId) return

    setStick(e.clientX - centerRef.current.x, e.clientY - centerRef.current.y)
    e.preventDefault()
  }

  function onJoystickPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (pointerIdRef.current !== e.pointerId) return

    pointerIdRef.current = null
    if (joystickRef.current?.hasPointerCapture(e.pointerId)) {
      joystickRef.current.releasePointerCapture(e.pointerId)
    }
    resetStick()
    e.preventDefault()
  }

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

  function captureControlPointer(e: React.PointerEvent<HTMLElement>) {
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function releaseControlPointer(e: React.PointerEvent<HTMLElement>) {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }

  if (!active) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-30 select-none touch-none md:hidden">
      {/* Joystick (left) */}
      <div
        ref={joystickRef}
        aria-label="movement joystick"
        className="pointer-events-auto absolute bottom-[calc(env(safe-area-inset-bottom)_+_5rem)] left-4 h-28 w-28 touch-none rounded-full border-2 border-white/40 bg-black/30 backdrop-blur sm:h-32 sm:w-32"
        onPointerDown={onJoystickPointerDown}
        onPointerMove={onJoystickPointerMove}
        onPointerUp={onJoystickPointerUp}
        onPointerCancel={onJoystickPointerUp}
      >
        <div
          ref={stickRef}
          className="absolute left-1/2 top-1/2 h-12 w-12 rounded-full border-2 border-white/70 bg-white/30 sm:h-14 sm:w-14"
          style={{ transform: "translate(-50%, -50%)" }}
        />
      </div>

      {/* Right-side action buttons */}
      <div className="pointer-events-auto absolute bottom-[calc(env(safe-area-inset-bottom)_+_5rem)] right-4 grid touch-none grid-cols-3 gap-2">
        <button
          aria-label="look up"
          className="mc-button col-start-2 h-12 w-12 touch-none font-mono text-xl"
          onPointerDown={(e) => {
            e.preventDefault()
            captureControlPointer(e)
            pressLook(0, -1.6)
          }}
          onPointerUp={(e) => {
            e.preventDefault()
            releaseControlPointer(e)
            releaseLook()
          }}
          onPointerCancel={(e) => {
            e.preventDefault()
            releaseControlPointer(e)
            releaseLook()
          }}
        >
          ↑
        </button>
        <button
          aria-label="look left"
          className="mc-button col-start-1 row-start-2 h-12 w-12 touch-none font-mono text-xl"
          onPointerDown={(e) => {
            e.preventDefault()
            captureControlPointer(e)
            pressLook(-1.8, 0)
          }}
          onPointerUp={(e) => {
            e.preventDefault()
            releaseControlPointer(e)
            releaseLook()
          }}
          onPointerCancel={(e) => {
            e.preventDefault()
            releaseControlPointer(e)
            releaseLook()
          }}
        >
          ←
        </button>
        <button
          aria-label="jump / break"
          className="mc-button col-start-2 row-start-2 h-12 w-12 touch-none font-mono text-xs"
          onPointerDown={(e) => {
            e.preventDefault()
            captureControlPointer(e)
            startBreak()
          }}
          onPointerUp={(e) => {
            e.preventDefault()
            releaseControlPointer(e)
            stopBreak()
          }}
          onPointerCancel={(e) => {
            e.preventDefault()
            releaseControlPointer(e)
            stopBreak()
          }}
        >
          MINE
        </button>
        <button
          aria-label="look right"
          className="mc-button col-start-3 row-start-2 h-12 w-12 touch-none font-mono text-xl"
          onPointerDown={(e) => {
            e.preventDefault()
            captureControlPointer(e)
            pressLook(1.8, 0)
          }}
          onPointerUp={(e) => {
            e.preventDefault()
            releaseControlPointer(e)
            releaseLook()
          }}
          onPointerCancel={(e) => {
            e.preventDefault()
            releaseControlPointer(e)
            releaseLook()
          }}
        >
          →
        </button>
        <button
          aria-label="look down"
          className="mc-button col-start-2 row-start-3 h-12 w-12 touch-none font-mono text-xl"
          onPointerDown={(e) => {
            e.preventDefault()
            captureControlPointer(e)
            pressLook(0, 1.6)
          }}
          onPointerUp={(e) => {
            e.preventDefault()
            releaseControlPointer(e)
            releaseLook()
          }}
          onPointerCancel={(e) => {
            e.preventDefault()
            releaseControlPointer(e)
            releaseLook()
          }}
        >
          ↓
        </button>
        <button
          aria-label="jump"
          className="mc-button col-start-3 row-start-3 h-12 w-12 touch-none font-mono text-[10px]"
          onPointerDown={(e) => {
            e.preventDefault()
            captureControlPointer(e)
            jump()
          }}
          onPointerUp={(e) => {
            e.preventDefault()
            releaseControlPointer(e)
          }}
          onPointerCancel={(e) => {
            e.preventDefault()
            releaseControlPointer(e)
          }}
        >
          JUMP
        </button>
      </div>
    </div>
  )
}
