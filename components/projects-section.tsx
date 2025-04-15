"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github, Brain, Database, Server, Globe, Eye, Scan } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all")

  const projects = [
    {
      title: "Mac Control MCP Server",
      description:
        "A Model Context Protocol (MCP) server that allows controlling macOS through an AI interface. It provides tools for executing AppleScript, controlling mouse and keyboard, and retrieving system information.",
      image: "/placeholder.svg?height=300&width=500",
      icon: <Server className="h-16 w-16 text-green-400" />,
      tags: ["JavaScript", "Node.js", "AI", "macOS", "Automation"],
      category: "ai",
      links: {
        github: "https://github.com/Shayan5422/MCP_MAC_USE",
        live: "#",
      },
    },
    {
      title: "Gemini Translator",
      description:
        "A Chrome extension that uses Google's Gemini AI to translate text between different languages. It provides a simple interface for quick translations with support for multiple languages including English, Persian, Arabic, French, Spanish, and German.",
      image: "/placeholder.svg?height=300&width=500",
      icon: <Globe className="h-16 w-16 text-green-400" />,
      tags: ["JavaScript", "Chrome Extension", "Gemini AI", "Translation"],
      category: "ai",
      links: {
        github: "https://github.com/Shayan5422/Gemini-Translator",
        live: "#",
      },
    },
    {
      title: "Visual RAG",
      description:
        "A Retrieval-Augmented Generation system with visual capabilities, enhancing AI responses by retrieving relevant visual information from a knowledge base to provide more accurate and contextual answers.",
      image: "/placeholder.svg?height=300&width=500",
      icon: <Eye className="h-16 w-16 text-green-400" />,
      tags: ["Python", "Computer Vision", "RAG", "AI", "Deep Learning"],
      category: "ai",
      links: {
        github: "https://github.com/Shayan5422/Visual-RAG",
        live: "#",
      },
    },
    {
      title: "Text to SQL Converter",
      description:
        "An AI-powered tool that converts natural language queries into SQL statements, making database interactions more accessible to non-technical users through intuitive language processing.",
      image: "/placeholder.svg?height=300&width=500",
      icon: <Database className="h-16 w-16 text-green-400" />,
      tags: ["Python", "NLP", "SQL", "Database", "AI"],
      category: "data",
      links: {
        github: "https://github.com/Shayan5422/Text_to_SQL",
        live: "#",
      },
    },
    {
      title: "Eye Movement Tracking",
      description:
        "A computer vision project for tracking and analyzing eye movements, with potential applications in accessibility, user experience research, and medical diagnostics.",
      image: "/placeholder.svg?height=300&width=500",
      icon: <Scan className="h-16 w-16 text-green-400" />,
      tags: ["Python", "Computer Vision", "OpenCV", "Machine Learning"],
      category: "ai",
      links: {
        github: "https://github.com/Shayan5422/Eye-Movement",
        live: "#",
      },
    },
  ]

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter)

  return (
    <section id="projects" className="py-20 px-4 bg-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.05),transparent_70%)]"></div>
      <div className="container mx-auto max-w-5xl z-10 relative">
        <div className="flex flex-col items-center mb-16">
          <div className="inline-block bg-green-500/10 px-4 py-1 rounded-full mb-4">
            <h2 className="text-green-400 font-mono text-sm tracking-wider">PROJECTS</h2>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            <span className="text-green-400">&lt;</span> Featured Work <span className="text-green-400">/&gt;</span>
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-cyan-400"></div>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-900/50 p-1 rounded-lg border border-green-500/20">
            {[
              { id: "all", label: "All", icon: null },
              { id: "ai", label: "AI & ML", icon: <Brain className="h-4 w-4 mr-1" /> },
              { id: "web", label: "Web Dev", icon: <Server className="h-4 w-4 mr-1" /> },
              { id: "data", label: "Data Science", icon: <Database className="h-4 w-4 mr-1" /> },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-md flex items-center text-sm ${
                  activeFilter === filter.id ? "bg-green-500/20 text-green-400" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {filter.icon}
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-900/50 border-green-500/20 hover:border-green-500/50 overflow-hidden transition-all group">
                <div className="relative overflow-hidden bg-gray-900/30 h-48 flex items-center justify-center">
                  {project.icon}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                    <div className="flex gap-2">
                      <a
                        href={project.links.github}
                        className="w-10 h-10 rounded-full bg-gray-900/80 flex items-center justify-center text-green-400 hover:bg-green-400 hover:text-gray-900 transition-colors"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                      <a
                        href={project.links.live}
                        className="w-10 h-10 rounded-full bg-gray-900/80 flex items-center justify-center text-green-400 hover:bg-green-400 hover:text-gray-900 transition-colors"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold mb-2 text-green-400">{project.title}</h4>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
