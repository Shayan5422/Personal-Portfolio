"use client"

import { motion } from "framer-motion"
import { Code, Server, BrainCircuit } from "lucide-react"

export default function SkillsSection() {
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

  return (
    <section id="skills" className="py-20 px-4 bg-gray-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.05),transparent_70%)]"></div>
      <div className="container mx-auto max-w-5xl z-10 relative">
        <div className="flex flex-col items-center mb-16">
          <div className="inline-block bg-green-500/10 px-4 py-1 rounded-full mb-4">
            <h2 className="text-green-400 font-mono text-sm tracking-wider">SKILLS</h2>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            <span className="text-green-400">&lt;</span> Technical Expertise{" "}
            <span className="text-green-400">/&gt;</span>
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-cyan-400"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 border border-green-500/20 hover:border-green-500/50 p-6 rounded-lg transition-all"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mr-4">
                  {category.icon}
                </div>
                <h4 className="text-xl font-bold">{category.title}</h4>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="font-mono text-sm">{skill.name}</span>
                      <span className="text-green-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-cyan-400 h-2 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-gray-900/50 border border-green-500/20 p-8 rounded-lg">
          <h4 className="text-2xl font-bold mb-6 text-center">Additional Expertise</h4>

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
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 border border-green-500/10 px-4 py-3 rounded-lg text-center hover:border-green-500/30 hover:bg-gray-800/80 transition-all"
              >
                <span className="text-sm font-mono">{skill}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
