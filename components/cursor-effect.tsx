"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    const mouseEnter = () => setIsVisible(true)
    const mouseLeave = () => setIsVisible(false)

    window.addEventListener("mousemove", mouseMove)
    document.addEventListener("mouseenter", mouseEnter)
    document.addEventListener("mouseleave", mouseLeave)

    // Add event listeners for interactive elements
    const handleLinkHover = () => setCursorVariant("link")
    const handleLinkLeave = () => setCursorVariant("default")

    const links = document.querySelectorAll("a, button")
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkHover)
      link.addEventListener("mouseleave", handleLinkLeave)
    })

    return () => {
      window.removeEventListener("mousemove", mouseMove)
      document.removeEventListener("mouseenter", mouseEnter)
      document.removeEventListener("mouseleave", mouseLeave)

      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHover)
        link.removeEventListener("mouseleave", handleLinkLeave)
      })
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(16, 185, 129, 0)",
      border: "2px solid rgba(16, 185, 129, 0.5)",
    },
    link: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      border: "2px solid rgba(16, 185, 129, 0.8)",
    },
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            className="cursor-dot fixed top-0 left-0 rounded-full pointer-events-none z-[100] hidden md:block"
            variants={variants}
            animate={cursorVariant}
            transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
          />
          <motion.div
            className="cursor-ring fixed top-0 left-0 rounded-full pointer-events-none z-[99] hidden md:block"
            animate={{
              x: mousePosition.x - 4,
              y: mousePosition.y - 4,
              height: 8,
              width: 8,
              backgroundColor: "rgba(16, 185, 129, 0.8)",
            }}
            transition={{ type: "spring", stiffness: 1000, damping: 35, mass: 0.1 }}
          />
        </>
      )}
    </AnimatePresence>
  )
}
