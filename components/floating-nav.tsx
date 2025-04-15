"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, User, Briefcase, GraduationCap, Code, Mail, Menu, X } from "lucide-react"
import Link from "next/link"

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("home")
  const [isVisible, setIsVisible] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show floating nav after scrolling down a bit
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      // Determine active section
      const sections = ["home", "about", "experience", "education", "skills", "projects", "contact"]

      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 200) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { id: "home", icon: <Home className="h-5 w-5" />, label: "Home" },
    { id: "about", icon: <User className="h-5 w-5" />, label: "About" },
    { id: "experience", icon: <Briefcase className="h-5 w-5" />, label: "Experience" },
    { id: "education", icon: <GraduationCap className="h-5 w-5" />, label: "Education" },
    { id: "projects", icon: <Code className="h-5 w-5" />, label: "Projects" },
    { id: "contact", icon: <Mail className="h-5 w-5" />, label: "Contact" },
  ]

  return (
    <>
      {/* Mobile Menu Button (visible on small screens) */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="bg-gray-900/80 backdrop-blur-md border border-green-500/20 rounded-full p-3 text-green-400"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md md:hidden flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-xl font-mono text-gray-300 hover:text-green-400 transition-colors"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Floating Nav */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 50,
          pointerEvents: isVisible ? "auto" : "none",
        }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 hidden md:block"
      >
        <div className="bg-gray-900/80 backdrop-blur-md border border-green-500/20 rounded-full px-2 py-2 flex items-center shadow-lg shadow-green-500/10">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className={`relative px-3 py-2 rounded-full transition-all duration-300 ${
                activeSection === item.id ? "text-green-400" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute inset-0 bg-green-500/10 rounded-full"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{item.icon}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </>
  )
}
