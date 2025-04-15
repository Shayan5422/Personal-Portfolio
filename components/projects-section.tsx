"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, Brain, Database, Server, Globe, Eye, Scan } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import GlitchText from "./glitch-text"

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })

  const projects = [
    {
      title: "Mac Control MCP Server",
      description:
        "A Model Context Protocol (MCP) server that allows controlling macOS through an AI interface. It provides tools for executing AppleScript, controlling mouse and keyboard, and retrieving system information.",
      icon: <Server className="h-16 w-16 text-green-400" />,
      tags: ["JavaScript", "Node.js", "AI", "macOS", "Automation"],
      category: "ai",
      links: {
        github: "https://github.com/Shayan5422/MCP_MAC_USE",
        live: "https://www.linkedin.com/posts/shayan-hashemi-5308081b1_macos-aiinnovation-customdevelopment-activity-7317220263010471937-MrTA?utm_source=share&utm_medium=member_desktop&rcm=ACoAADFraPQBLoxdHsfQpTxjdQ403u9R40EJ3II",
      },
    },
    {
      title: "Gemini Translator",
      description:
        "A Chrome extension that uses Google's Gemini AI to translate text between different languages. It provides a simple interface for quick translations with support for multiple languages including English, Persian, Arabic, French, Spanish, and German.",
      icon: <Globe className="h-16 w-16 text-green-400" />,
      tags: ["JavaScript", "Chrome Extension", "Gemini AI", "Translation"],
      category: "ai",
      links: {
        github: "https://github.com/Shayan5422/Gemini-Translator",
        live: "https://chromewebstore.google.com/detail/gemini-translator/mgckajgaoebghjjlmlbnifapbbmgljdk?utm_source=ext_app_menu",
      },
    },
    {
      title: "Visual RAG",
      description:
        "A Retrieval-Augmented Generation system with visual capabilities, enhancing AI responses by retrieving relevant visual information from a knowledge base to provide more accurate and contextual answers.",
      icon: <Eye className="h-16 w-16 text-green-400" />,
      tags: ["Python", "Computer Vision", "RAG", "AI", "Deep Learning"],
      category: "ai",
      links: {
        github: "https://github.com/Shayan5422/Visual-RAG",
        live: "https://www.linkedin.com/posts/shayan-hashemi-5308081b1_ai-machinelearning-computervision-activity-7302765015449624576-htrR?utm_source=share&utm_medium=member_desktop&rcm=ACoAADFraPQBLoxdHsfQpTxjdQ403u9R40EJ3II",
      },
    },
    {
      title: "Text to SQL Converter",
      description:
        "An AI-powered tool that converts natural language queries into SQL statements, making database interactions more accessible to non-technical users through intuitive language processing.",
      icon: <Database className="h-16 w-16 text-green-400" />,
      tags: ["Python", "NLP", "SQL", "Database", "AI"],
      category: "data",
      links: {
        github: "https://github.com/Shayan5422/Text_to_SQL",
        live: "https://www.linkedin.com/posts/shayan-hashemi-5308081b1_i-am-pleased-to-announce-the-completion-of-activity-7284937484336070657-_QrB?utm_source=share&utm_medium=member_desktop&rcm=ACoAADFraPQBLoxdHsfQpTxjdQ403u9R40EJ3II",
      },
    },
    {
      title: "CV Maker",
      description:
        "An AI-powered website that helps you design resumes and write cover letters.",
      icon: <Globe className="h-16 w-16 text-green-400" />,
      tags: ["Python", "AI", "NLP", "Angular", "Web Development"],
      category: "web",
      links: {
        github: "https://github.com/Shayan5422/CV_maker",
        live: "https://cv-creative.vercel.app/",
      },
    },
    {
      title: "Eye Movement Tracking",
      description:
        "A computer vision project for tracking and analyzing eye movements, with potential applications in accessibility, user experience research, and medical diagnostics.",
      icon: <Scan className="h-16 w-16 text-green-400" />,
      tags: ["Python", "Computer Vision", "OpenCV", "Machine Learning"],
      category: "ai",
      links: {
        github: "https://github.com/Shayan5422/Eye-Movement",
        live: "https://www.linkedin.com/posts/shayan-hashemi-5308081b1_introducing-my-new-project-eye-and-eyebrow-activity-7260799949385166848-Q5Ur?utm_source=share&utm_medium=member_desktop&rcm=ACoAADFraPQBLoxdHsfQpTxjdQ403u9R40EJ3II",
      },
    },
  ]

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="projects" className="py-20 px-4 bg-black relative" ref={sectionRef}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.05),transparent_70%)]"></div>

      {/* Digital noise overlay */}
      <div className="absolute inset-0 digital-noise"></div>

      <div className="container mx-auto max-w-5xl z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-16"
        >
          <div className="inline-block bg-green-500/10 px-4 py-1 rounded-full mb-4">
            <h2 className="text-green-400 font-mono text-sm tracking-wider">PROJECTS</h2>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            <span className="text-green-400">&lt;</span> <GlitchText text="Featured Work" />{" "}
            <span className="text-green-400">/&gt;</span>
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-cyan-400"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-gray-900/50 p-1 rounded-lg border border-green-500/20 animated-border">
            {[
              { id: "all", label: "All", icon: null },
              { id: "ai", label: "AI & ML", icon: <Brain className="h-4 w-4 mr-1" /> },
              { id: "web", label: "Web Dev", icon: <Server className="h-4 w-4 mr-1" /> },
              { id: "data", label: "Data Science", icon: <Database className="h-4 w-4 mr-1" /> },
            ].map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-md flex items-center text-sm transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "bg-green-500/20 text-green-400"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                }`}
              >
                {filter.icon}
                {filter.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="h-full"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <Card className="bg-gray-900/50 border-green-500/20 hover:border-green-500/50 overflow-hidden transition-all group h-full hover-glow cyber-corners">
                <div className="relative overflow-hidden bg-gray-900/30 h-48 flex items-center justify-center group-hover:animated-gradient">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    whileHover={{ scale: 1, opacity: 1, rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {project.icon}
                  </motion.div>

                  {/* Animated overlay effect */}
                  <AnimatePresence>
                    {hoveredProject === index && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-between p-4"
                      >
                        <div className="flex gap-2">
                          <motion.a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 rounded-full bg-gray-900/80 flex items-center justify-center text-green-400 hover:bg-green-400 hover:text-gray-900 transition-colors"
                          >
                            <Github className="h-5 w-5" />
                          </motion.a>
                          <motion.a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 rounded-full bg-gray-900/80 flex items-center justify-center text-green-400 hover:bg-green-400 hover:text-gray-900 transition-colors"
                          >
                            <ExternalLink className="h-5 w-5" />
                          </motion.a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold mb-2 text-green-400 neon-text">
                    <GlitchText text={project.title} delay={index * 300} />
                  </h4>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
