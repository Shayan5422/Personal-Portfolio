"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Server, BrainCircuit } from "lucide-react"
import GlitchText from "./glitch-text"

export default function SkillsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })

  const technicalSkills = [
    { name: "Python", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "Java", level: 75 },
    { name: "SQL", level: 80 },
    { name: "HTML/CSS", level: 85 },
    { name: "SPARQL", level: 70 },
  ]

  const mlSkills = [
    { name: "Scikit-Learn", level: 90 },
    { name: "TensorFlow", level: 85 },
    { name: "PyTorch", level: 80 },
    { name: "Keras", level: 85 },
    { name: "XGBoost", level: 75 },
    { name: "CNN/RNN", level: 80 },
  ]

  const toolsSkills = [
    { name: "Docker", level: 85 },
    { name: "Git", level: 90 },
    { name: "Flask", level: 85 },
    { name: "Angular", level: 80 },
    { name: "MongoDB", level: 75 },
    { name: "Keycloak", level: 70 },
  ]

  const skillCategories = [
    {
      title: "Programming",
      icon: <Code className="h-6 w-6 text-green-400" />,
      skills: technicalSkills,
    },
    {
      title: "Machine Learning",
      icon: <BrainCircuit className="h-6 w-6 text-green-400" />,
      skills: mlSkills,
    },
    {
      title: "Tools & Frameworks",
      icon: <Server className="h-6 w-6 text-green-400" />,
      skills: toolsSkills,
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

  const barVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: { duration: 1, ease: "easeOut" },
    }),
  }

  return (
    <section id="skills" className="py-20 px-4 bg-gray-950 relative" ref={sectionRef}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.05),transparent_70%)]"></div>

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
            <h2 className="text-green-400 font-mono text-sm tracking-wider">SKILLS</h2>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            <span className="text-green-400">&lt;</span> <GlitchText text="Technical Expertise" />{" "}
            <span className="text-green-400">/&gt;</span>
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-cyan-400"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-900/50 border border-green-500/20 hover:border-green-500/50 p-6 rounded-lg transition-all hover-glow cyber-corners"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mr-4 pulse">
                  {category.icon}
                </div>
                <h4 className="text-xl font-bold neon-text">{category.title}</h4>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="font-mono text-sm">{skill.name}</span>
                      <span className="text-green-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                      <motion.div
                        custom={skill.level}
                        variants={barVariants}
                        className="bg-gradient-to-r from-green-400 to-cyan-400 h-2 rounded-full relative"
                      >
                        {/* Animated particles inside skill bar */}
                        {[...Array(3)].map((_, particleIndex) => (
                          <motion.div
                            key={particleIndex}
                            className="absolute top-0 bottom-0 w-1 bg-white/70 rounded-full"
                            animate={{
                              left: ["0%", "100%"],
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 2,
                              delay: particleIndex * 0.5,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatDelay: 1,
                            }}
                          />
                        ))}
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gray-900/50 border border-green-500/20 p-8 rounded-lg animated-border cyber-corners"
        >
          <h4 className="text-2xl font-bold mb-6 text-center neon-text">Additional Expertise</h4>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "SysML/UML",
              "Data Science",
              "Supervised ML",
              "Unsupervised ML",
              "Data Fusion",
              "Ontology",
              "Fuzzy Logic",
              "Optimization Algorithms",
              "Scheduling",
              "Disease Prediction",
              "Protégé",
              "Weka",
              "Bonita Soft",
              "Postman",
              "Fuseki",
              "Granular Computing",
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(16, 185, 129, 0.2)",
                  boxShadow: "0 0 10px rgba(16, 185, 129, 0.5)",
                }}
                className="bg-gray-800/50 border border-green-500/10 px-4 py-3 rounded-lg text-center transition-all"
              >
                <span className="text-sm font-mono">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
