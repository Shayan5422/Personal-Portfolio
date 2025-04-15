"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface CyberButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: "default" | "outline"
}

export default function CyberButton({ children, onClick, className = "", variant = "default" }: CyberButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative">
      {/* Animated background */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute inset-0 bg-green-500/20 blur-lg -z-10"
        />
      )}

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-green-400" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-green-400" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-green-400" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-green-400" />

      <Button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        variant={variant === "outline" ? "outline" : "default"}
        className={`relative overflow-hidden font-mono ${
          variant === "outline"
            ? "border-green-500 text-green-400 hover:bg-green-500/10"
            : "bg-green-500 hover:bg-green-600 text-black"
        } ${className}`}
      >
        <span className="relative z-10 flex items-center justify-center">{children}</span>

        {/* Animated lines */}
        {isHovered && (
          <>
            <motion.span
              initial={{ left: "-100%" }}
              animate={{ left: "100%" }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              className="absolute top-0 h-[1px] w-full bg-green-400/50"
            />
            <motion.span
              initial={{ right: "-100%" }}
              animate={{ right: "100%" }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              className="absolute bottom-0 h-[1px] w-full bg-green-400/50"
            />
          </>
        )}
      </Button>
    </div>
  )
}
