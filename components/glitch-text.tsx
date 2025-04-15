"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface GlitchTextProps {
  text: string
  className?: string
  delay?: number
}

export default function GlitchText({ text, className = "", delay = 0 }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 200)
      }, 3000)
      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [delay])

  const generateGlitchText = () => {
    if (!isGlitching) return text

    // Create glitched version of the text
    return text
      .split("")
      .map((char) => {
        if (Math.random() > 0.7) {
          const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/\\~`"
          return glitchChars[Math.floor(Math.random() * glitchChars.length)]
        }
        return char
      })
      .join("")
  }

  return (
    <motion.span
      className={`relative inline-block ${className} ${isGlitching ? "text-red-500" : ""}`}
      animate={
        isGlitching
          ? {
              x: [0, -2, 2, -2, 0],
              y: [0, 1, -1, 1, 0],
              transition: { duration: 0.2 },
            }
          : {}
      }
    >
      {generateGlitchText()}
      {isGlitching && (
        <>
          <span
            className="absolute top-0 left-0 w-full h-full bg-green-500/20 mix-blend-screen"
            style={{ clipPath: "polygon(0 15%, 100% 15%, 100% 30%, 0 30%)" }}
          ></span>
          <span
            className="absolute top-0 left-0 w-full h-full bg-red-500/20 mix-blend-screen"
            style={{ clipPath: "polygon(0 65%, 100% 65%, 100% 80%, 0 80%)" }}
          ></span>
        </>
      )}
    </motion.span>
  )
}
