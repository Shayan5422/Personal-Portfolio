"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Briefcase, Calendar } from "lucide-react"
import GlitchText from "./glitch-text"

export default function ExperienceSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })

  const experiences = [
    {
      title: "AI Engineer",
      company: "Alasuite",
      location: "Paris, France",
      period: "September 2023 - Present",
      description: [
        "Expert in data analysis for healthcare AI solutions",
        "Specializing in frugal AI, focused on LLMs and ML/deep learning",
        "Promoting innovation through pragmatic and ethical AI approaches",
        "Developing skills in hardware, servers, and cybersecurity",
      ],
    },
    {
      title: "Data Analysis & Service Composition Intern",
      company: "Laboratoire OpenCems",
      location: "Anglet, France",
      period: "March 2024 - July 2024",
      description: [
        "Designed an innovative web app on OpenCEMS for data analysis",
        "Harmonized services with WoR ontology for better interoperability",
        "Developed intuitive user interfaces for an optimized experience",
      ],
    },
    {
      title: "Academic Project",
      company: "École Centrale de Lille",
      location: "Lille, France",
      period: "September 2023 - March 2024",
      description: ["Improved emergency care efficiency using machine learning algorithms to model patient journeys"],
    },
    {
      title: "IT Administrator & Web Designer",
      company: "Institut de Novin Parsian",
      location: "Ahvaz",
      period: "January 2016 - July 2021",
      description: [
        "Managed information systems and maintained data security",
        "Improved network performance",
        "Designed and implemented the company's website",
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <section id="experience" className="py-20 px-4 bg-gray-950 relative" ref={sectionRef}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.05),transparent_70%)]"></div>
      <div className="container mx-auto max-w-5xl z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-16"
        >
          <div className="inline-block bg-green-500/10 px-4 py-1 rounded-full mb-4">
            <h2 className="text-green-400 font-mono text-sm tracking-wider">EXPERIENCE</h2>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            <span className="text-green-400">&lt;</span> <GlitchText text="Professional Journey" />{" "}
            <span className="text-green-400">/&gt;</span>
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-cyan-400"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-green-500/20 transform md:translate-x-[-0.5px]"></div>

          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className={`flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                <div className="md:w-1/2 p-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20, x: index % 2 === 0 ? -20 : 20 }}
                    animate={
                      isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 20, x: index % 2 === 0 ? -20 : 20 }
                    }
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-gray-900/50 border border-green-500/20 hover:border-green-500/50 p-6 rounded-lg transition-all hover-glow"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mr-4">
                        <Briefcase className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold">{exp.title}</h4>
                        <p className="text-green-400">{exp.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center mb-4 text-gray-400">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{exp.period}</span>
                    </div>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      {exp.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
                <div className="hidden md:block md:w-1/2"></div>

                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                  className="absolute left-0 md:left-1/2 transform md:translate-x-[-50%]"
                  style={{ top: `${index * 12 + 6}rem` }}
                >
                  <div className="w-4 h-4 rounded-full bg-green-400 border-4 border-gray-950"></div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
