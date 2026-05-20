"use client"

type Props = {
  onRespawn: () => void
}

export default function GameOverScreen({ onRespawn }: Props) {
  return (
    <div className="pointer-events-auto absolute inset-0 z-50 flex items-center justify-center bg-red-950/60 backdrop-blur-sm">
      <div className="mc-panel w-full max-w-md p-8 text-center">
        <h1 className="font-mono text-4xl font-bold tracking-widest text-red-400 drop-shadow-[3px_3px_0_rgba(0,0,0,0.95)] md:text-5xl">
          GAME OVER
        </h1>
        <p className="mt-2 font-mono text-sm tracking-wider text-white/85 drop-shadow-[2px_2px_0_rgba(0,0,0,0.9)]">
          You fell into the void.
        </p>

        <button
          type="button"
          onClick={onRespawn}
          className="mc-button mt-6 px-8 py-3 font-mono text-lg"
        >
          ↻ Respawn
        </button>
      </div>
    </div>
  )
}
