"use client"

import { useEffect } from "react"
import { SECTION_DATA, type SectionId } from "./data"

type Props = {
  sectionId: SectionId | null
  onClose: () => void
}

export default function InfoPanel({ sectionId, onClose }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.code === "Escape" || e.code === "KeyE") onClose()
    }
    if (sectionId) window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [sectionId, onClose])

  if (!sectionId) return null
  const data = SECTION_DATA[sectionId]

  return (
    <div className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden
      />
      <div className="mc-panel relative max-h-[88vh] w-full max-w-3xl overflow-hidden">
        {/* Title bar */}
        <div className="mc-titlebar flex items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="mc-block-icon" data-kind={sectionId} />
            <div>
              <h2 className="font-mono text-lg font-bold tracking-wide text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.9)]">
                {data.title}
              </h2>
              <p className="font-mono text-xs text-white/70">{data.subtitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mc-button px-3 py-1 font-mono text-sm"
          >
            ✕ Close
          </button>
        </div>

        <div className="custom-scroll max-h-[70vh] space-y-4 overflow-y-auto p-5">
          {data.intro && (
            <p className="font-mono text-sm leading-relaxed text-white/90">
              {data.intro}
            </p>
          )}

          {data.blocks && (
            <div className="space-y-3">
              {data.blocks.map((b, i) => (
                <div key={i} className="mc-inner-panel p-4">
                  <h3 className="font-mono text-base font-bold text-amber-300 drop-shadow-[2px_2px_0_rgba(0,0,0,0.9)]">
                    {b.heading}
                  </h3>
                  {b.meta && (
                    <p className="mt-1 font-mono text-xs text-emerald-300">
                      {b.meta}
                    </p>
                  )}
                  {b.body && (
                    <p className="mt-2 font-mono text-sm leading-relaxed text-white/90">
                      {b.body}
                    </p>
                  )}
                  {b.bullets && (
                    <ul className="mt-2 list-inside space-y-1 font-mono text-sm text-white/85">
                      {b.bullets.map((bul, j) => (
                        <li key={j} className="flex gap-2">
                          <span className="text-emerald-300">▸</span>
                          <span>{bul}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {data.skills && (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {data.skills.map((cat) => (
                <div key={cat.group} className="mc-inner-panel p-4">
                  <h3 className="mb-3 font-mono text-sm font-bold text-amber-300 drop-shadow-[2px_2px_0_rgba(0,0,0,0.9)]">
                    {cat.group}
                  </h3>
                  <div className="space-y-2">
                    {cat.items.map((s) => (
                      <div key={s.name}>
                        <div className="flex justify-between font-mono text-xs text-white/90">
                          <span>{s.name}</span>
                          <span className="text-emerald-300">{s.level}%</span>
                        </div>
                        <div className="mt-1 h-2 w-full overflow-hidden bg-black/40">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-amber-400"
                            style={{ width: `${s.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {data.extras && (
            <div className="mc-inner-panel p-4">
              <h3 className="mb-2 font-mono text-sm font-bold text-amber-300 drop-shadow-[2px_2px_0_rgba(0,0,0,0.9)]">
                Additional Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.extras.map((x) => (
                  <span
                    key={x}
                    className="mc-tag font-mono text-xs text-white/90"
                  >
                    {x}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.projects && (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {data.projects.map((p) => (
                <div key={p.title} className="mc-inner-panel p-4">
                  <h3 className="font-mono text-sm font-bold text-amber-300 drop-shadow-[2px_2px_0_rgba(0,0,0,0.9)]">
                    {p.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs leading-relaxed text-white/85">
                    {p.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="mc-tag font-mono text-[10px] text-emerald-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-2">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mc-button px-3 py-1 font-mono text-xs"
                      >
                        Code
                      </a>
                    )}
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mc-button px-3 py-1 font-mono text-xs"
                      >
                        Live
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {data.contacts && (
            <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
              {data.contacts.map((c) => (
                <div key={c.label} className="mc-inner-panel p-3">
                  <p className="font-mono text-xs text-white/60">{c.label}</p>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="font-mono text-sm text-amber-300 hover:text-amber-200"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <p className="font-mono text-sm text-white">{c.value}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {data.links && (
            <div className="flex flex-wrap gap-2">
              {data.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target={
                    l.href.startsWith("http") || l.href.endsWith(".pdf")
                      ? "_blank"
                      : undefined
                  }
                  rel="noopener noreferrer"
                  className="mc-button px-4 py-2 font-mono text-sm"
                >
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="mc-titlebar px-4 py-2 text-center font-mono text-xs text-white/70">
          Press <span className="text-amber-300">E</span> or{" "}
          <span className="text-amber-300">ESC</span> to close
        </div>
      </div>
    </div>
  )
}
