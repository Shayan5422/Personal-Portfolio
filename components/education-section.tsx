"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { GraduationCap, Calendar, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import GlitchText from "./glitch-text"

export default function EducationSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })

  const education = [
    {
      degree: "Master's in AI Management in Healthcare",
      institution: "École Centrale de Lille",
      location: "Lille, France",
      year: "2023 - Present",
      description: [
        "Training healthcare professionals in AI adoption and implementation for innovative projects",
        "Transforming healthcare professions through AI application",
        "Mastering economic, organizational, and regulatory challenges of AI in healthcare",
      ],
    },
    {
      degree: "Bachelor's in Nutrition and Food Sciences",
      institution: "Université des sciences médicales de Jondishapur",
      location: "Ahvaz",
      year: "2015",
      description: ["Promoting health through specialized advice to help people achieve their wellness goals"],
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="education" className="py-20 px-4 bg-black relative" ref={sectionRef}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.05),transparent_70%)]"></div>

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
            <h2 className="text-green-400 font-mono text-sm tracking-wider">EDUCATION</h2>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            <span className="text-green-400">&lt;</span> <GlitchText text="Academic Background" />{" "}
            <span className="text-green-400">/&gt;</span>
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-cyan-400"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {education.map((edu, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="bg-gray-900/50 border-green-500/20 hover:border-green-500/50 transition-all h-full hover-glow cyber-corners">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mr-4 pulse">
                      <GraduationCap className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold neon-text">{edu.degree}</h4>
                      <p className="text-green-400">{edu.institution}</p>
                    </div>
                  </div>

                  <div className="flex items-center mb-2 text-gray-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{edu.year}</span>
                  </div>

                  <div className="flex items-center mb-4 text-gray-400">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{edu.location}</span>
                  </div>

                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    {edu.description.map((item, i) => (
                      <li key={i} className="relative pl-2">
                        <span className="relative z-10">{item}</span>
                        {/* Highlight effect on hover */}
                        <motion.span
                          className="absolute inset-0 bg-green-500/10 rounded-md -z-10"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                          style={{ originX: 0 }}
                        />
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <h4 className="text-2xl font-bold mb-6 text-center neon-text">Inventions & Patents</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Card className="bg-gray-900/50 border-green-500/20 hover:border-green-500/50 transition-all animated-border cyber-corners">
                <CardContent className="p-6">
                  <h5 className="text-lg font-bold mb-2 neon-text">
                    <GlitchText text="Physical Disability Restoration System" delay={100} />
                  </h5>
                  <p className="text-gray-400 mb-2">Reference Number: 103741</p>
                  <div className="w-full h-1 bg-gradient-to-r from-green-400 to-transparent mb-4"></div>
                  <p className="text-gray-300">
                    Innovative system designed to assist in the rehabilitation and restoration of physical abilities for
                    individuals with disabilities.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Card className="bg-gray-900/50 border-green-500/20 hover:border-green-500/50 transition-all animated-border cyber-corners">
                <CardContent className="p-6">
                  <h5 className="text-lg font-bold mb-2 neon-text">
                    <GlitchText text="Food Consumable Preparation Device (NG Tube)" delay={200} />
                  </h5>
                  <p className="text-gray-400 mb-2">Reference Number: 104483</p>
                  <div className="w-full h-1 bg-gradient-to-r from-green-400 to-transparent mb-4"></div>
                  <p className="text-gray-300">
                    Device for the preparation and adjustment of food consumables, specifically designed for nasogastric
                    (NG) tube feeding applications.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
