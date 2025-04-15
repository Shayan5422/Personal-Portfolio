"use client"

import { useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const [text, setText] = useState("")
  const fullText = "AI Engineer & Healthcare Innovator"
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (text.length < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1))
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [text])

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1),transparent_70%)]"></div>
      <div className="z-10 text-center max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500">
          SHAYAN HASHEMI
        </h1>
        <div className="h-12 mb-8">
          <h2 className="text-xl md:text-2xl font-mono">
            {text}
            {showCursor && <span className="text-green-400">|</span>}
          </h2>
        </div>
        <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
          Specializing in AI for healthcare, machine learning, and full-stack development. Currently working as an AI
          Engineer at Alasuite while pursuing a Master's in AI Management in Healthcare.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-green-500 hover:bg-green-600 text-black font-mono">View Resume</Button>
          <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10 font-mono">
            Contact Me
          </Button>
        </div>
      </div>
      <div className="absolute bottom-10 animate-bounce">
        <ArrowDown className="h-6 w-6 text-green-400" />
      </div>

      {/* Matrix-like background effect */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="matrix-code">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="code-column" style={{ animationDelay: `${Math.random() * 5}s` }}>
              {Array.from({ length: 30 }).map((_, j) => (
                <span key={j} style={{ animationDelay: `${Math.random() * 5}s` }}>
                  {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
