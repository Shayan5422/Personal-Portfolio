"use client"

type Props = {
  variant: "intro" | "paused"
  onStart: () => void
}

export default function TitleScreen({ variant, onStart }: Props) {
  return (
    <div className="pointer-events-auto absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="mc-panel w-full max-w-xl p-8 text-center">
        <h1 className="font-mono text-3xl font-bold tracking-wider text-amber-300 drop-shadow-[3px_3px_0_rgba(0,0,0,0.95)] md:text-5xl">
          SHAYAN HASHEMI
        </h1>
        <p className="mt-2 font-mono text-sm tracking-widest text-emerald-300 drop-shadow-[2px_2px_0_rgba(0,0,0,0.9)] md:text-base">
          A Voxel Portfolio
        </p>

        <div className="mt-6 space-y-3 text-left font-mono text-xs text-white/85 md:text-sm">
          <p className="text-center text-white">
            {variant === "intro"
              ? "Walk around. Hold left-click on a glowing block to mine it. Each block reveals a part of my CV."
              : "Game paused. Click below to continue exploring."}
          </p>
          <div className="mc-inner-panel space-y-1 p-3">
            <Row label="Move" keys="W A S D / ↑ ↓ ← →" />
            <Row label="Look" keys="Mouse (click canvas to lock)" />
            <Row label="Jump" keys="Space" />
            <Row label="Sprint" keys="Shift" />
            <Row label="Mine block" keys="Hold Left-Click" />
            <Row label="Pause" keys="Esc" />
            <Row label="Mobile" keys="Joystick + Arrows + MINE" />
          </div>
        </div>

        <button
          type="button"
          onClick={onStart}
          className="mc-button mt-6 px-8 py-3 font-mono text-lg"
        >
          {variant === "intro" ? "▶ Start Game" : "▶ Resume"}
        </button>
      </div>
    </div>
  )
}

function Row({ label, keys }: { label: string; keys: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-emerald-300">{label}</span>
      <span className="text-white/85">{keys}</span>
    </div>
  )
}
