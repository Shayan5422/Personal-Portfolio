"use client"

import { SECTION_BLOCKS, type SectionId } from "./data"

type Props = {
  discovered: Set<SectionId>
  active: boolean
}

export default function HUD({ discovered, active }: Props) {
  return (
    <>
      {/* Crosshair */}
      {active && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-6 w-6">
            <div className="absolute left-1/2 top-0 h-6 w-0.5 -translate-x-1/2 bg-white mix-blend-difference" />
            <div className="absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 bg-white mix-blend-difference" />
          </div>
        </div>
      )}

      {/* Hotbar */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2">
        <div className="mc-hotbar flex gap-[3px] p-1">
          {SECTION_BLOCKS.map((b) => {
            const isDiscovered = discovered.has(b.id)
            return (
              <div
                key={b.id}
                className={`mc-slot flex h-12 w-12 items-center justify-center ${
                  isDiscovered ? "mc-slot--found" : ""
                }`}
                title={b.label}
              >
                <div className="mc-block-icon" data-kind={b.kind} />
              </div>
            )
          })}
        </div>
        <div className="mt-1 text-center font-mono text-[11px] text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.9)]">
          {discovered.size}/{SECTION_BLOCKS.length} blocks discovered
        </div>
      </div>
    </>
  )
}
