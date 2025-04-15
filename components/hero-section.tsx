"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowDown, Terminal, Code, BrainCircuit } from "lucide-react"
import GlitchText from "./glitch-text"
import CyberButton from "./cyber-button"

export default function HeroSection() {
  const [text, setText] = useState("")
  const fullText = "AI Engineer & Healthcare Innovator"
  const [showCursor, setShowCursor] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeIcon, setActiveIcon] = useState(0)
  const icons = [
    <Terminal key={0} className="h-8 w-8" />,
    <Code key={1} className="h-8 w-8" />,
    <BrainCircuit key={2} className="h-8 w-8" />,
  ]

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

  useEffect(() => {
    const iconInterval = setInterval(() => {
      setActiveIcon((prev) => (prev + 1) % icons.length)
    }, 2000)
    return () => clearInterval(iconInterval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      const section = canvas.parentElement
      if (section) {
        canvas.width = section.clientWidth
        canvas.height = section.clientHeight
      }
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Create grid
    const gridSize = 30
    const cols = Math.floor(canvas.width / gridSize)
    const rows = Math.floor(canvas.height / gridSize)

    let animationFrameId: number

    const drawGrid = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Calculate the center of influence (mouse position)
      const centerX = mousePosition.x
      const centerY = mousePosition.y

      // Draw grid
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * gridSize
          const y = j * gridSize

          // Calculate distance from mouse
          const dx = x - centerX
          const dy = y - centerY
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 300

          if (distance < maxDistance) {
            // Calculate point displacement based on mouse position
            const angle = Math.atan2(dy, dx)
            const displacement = (1 - distance / maxDistance) * 15

            const newX = x + Math.cos(angle) * displacement
            const newY = y + Math.sin(angle) * displacement

            // Draw point
            ctx.fillStyle = `rgba(16, 185, 129, ${0.2 + (1 - distance / maxDistance) * 0.8})`
            ctx.beginPath()
            ctx.arc(newX, newY, 1 + (1 - distance / maxDistance) * 2, 0, Math.PI * 2)
            ctx.fill()
          } else {
            // Draw regular grid point
            ctx.fillStyle = "rgba(16, 185, 129, 0.2)"
            ctx.beginPath()
            ctx.arc(x, y, 1, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      animationFrameId = requestAnimationFrame(drawGrid)
    }

    drawGrid()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [mousePosition])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-green-500/20"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              width: 0,
              height: 0,
              opacity: 0,
            }}
            animate={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              opacity: 0.3,
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: Math.random() * 10 + 10,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 text-center max-w-3xl"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <div className="relative">
            <h1 className="text-5xl md:text-7xl font-bold relative inline-block">
              <GlitchText
                text="SHAYAN HASHEMI"
                className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500"
              />
            </h1>
            <div className="absolute -inset-1 bg-green-500/20 blur-xl opacity-30 rounded-lg -z-10"></div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="h-12 mb-8">
          <h2 className="text-xl md:text-2xl font-mono flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIcon}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mr-3 text-green-400"
              >
                {icons[activeIcon]}
              </motion.div>
            </AnimatePresence>
            {text}
            {showCursor && <span className="text-green-400 ml-1">|</span>}
          </h2>
        </motion.div>

        <motion.div variants={itemVariants} className="text-gray-400 mb-10 max-w-2xl mx-auto relative">
          <p className="relative z-10">
            Specializing in AI for healthcare, machine learning, and full-stack development. Currently working as an AI
            Engineer at Alasuite while pursuing a Master's in AI Management in Healthcare.
          </p>

          {/* Decorative elements */}
          <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-10 bg-green-500/20"></div>
          <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-2 h-10 bg-green-500/20"></div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <CyberButton>View Resume</CyberButton>

          <CyberButton variant="outline">Contact Me</CyberButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 animate-bounce"
      >
        <ArrowDown className="h-6 w-6 text-green-400" />
      </motion.div>
    </section>
  )
}
