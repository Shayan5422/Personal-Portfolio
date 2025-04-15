"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Terminal, User, Code, Brain, Server } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GlitchText from "./glitch-text"
import CyberButton from "./cyber-button"

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("profile")
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const cardInfo = [
    {
      icon: <Brain className="h-8 w-8 text-green-400" />,
      title: "AI Engineer",
      description: "Specializing in machine learning, deep learning, and AI solutions for healthcare",
    },
    {
      icon: <Code className="h-8 w-8 text-green-400" />,
      title: "Full-Stack Developer",
      description: "Building web applications with Python, JavaScript, Angular, and Flask",
    },
    {
      icon: <Server className="h-8 w-8 text-green-400" />,
      title: "Data Scientist",
      description: "Analyzing and visualizing data to extract meaningful insights",
    },
  ]

  return (
    <section id="about" className="py-20 px-4 bg-black relative" ref={sectionRef}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.05),transparent_70%)]"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-green-500/5 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-green-500/5 to-transparent"></div>

      <div className="container mx-auto max-w-5xl z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-12"
        >
          <div className="inline-block bg-green-500/10 px-4 py-1 rounded-full mb-4">
            <h2 className="text-green-400 font-mono text-sm tracking-wider">ABOUT ME</h2>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            <span className="text-green-400">&lt;</span> <GlitchText text="Who Am I" />{" "}
            <span className="text-green-400">/&gt;</span>
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-cyan-400"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {cardInfo.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative"
            >
              <Card className="bg-gray-900/50 border-green-500/20 hover:border-green-500/50 transition-all hover-glow h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4 relative">
                      {item.icon}

                      {/* Animated ring when hovered */}
                      {hoveredCard === index && (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1.2, opacity: 1 }}
                          exit={{ scale: 1.5, opacity: 0 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                          className="absolute inset-0 rounded-full border border-green-400"
                        ></motion.div>
                      )}
                    </div>
                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-green-400"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-green-400"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-green-400"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-green-400"></div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative"
        >
          {/* Decorative elements */}
          <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-40 bg-green-500/20"></div>
          <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-2 h-40 bg-green-500/20"></div>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-900/50 border border-green-500/20">
              <TabsTrigger
                value="profile"
                className="data-[state=active]:bg-green-500/10 data-[state=active]:text-green-400"
              >
                <User className="h-4 w-4 mr-2" /> Profile
              </TabsTrigger>
              <TabsTrigger
                value="skills"
                className="data-[state=active]:bg-green-500/10 data-[state=active]:text-green-400"
              >
                <Code className="h-4 w-4 mr-2" /> Technical
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="data-[state=active]:bg-green-500/10 data-[state=active]:text-green-400"
              >
                <Terminal className="h-4 w-4 mr-2" /> Background
              </TabsTrigger>
            </TabsList>

            <div className="relative border border-green-500/20 bg-gray-900/50 rounded-b-md overflow-hidden">
              {/* Animated border */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-400 to-transparent animate-[scan_2s_ease-in-out_infinite]"></div>
              <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-400 to-transparent animate-[scan_2s_ease-in-out_infinite_reverse]"></div>

              <AnimatePresence mode="wait">
                <TabsContent value="profile" className="p-6 m-0">
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <p className="text-gray-300">
                      Currently working as an AI Engineer at Alasuite, I specialize in developing AI solutions for
                      healthcare. My expertise lies in machine learning, data science, and full-stack development.
                    </p>
                    <p className="text-gray-300">
                      I'm passionate about leveraging AI to transform healthcare and improve patient outcomes. My
                      background in nutrition and food sciences gives me a unique perspective on health-related AI
                      applications.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-gray-400 mb-1">Name:</p>
                        <p className="font-medium">Shayan Hashemi</p>
                      </div>
                      <div>
                        <p className="text-gray-400 mb-1">Location:</p>
                        <p className="font-medium">Lille, France</p>
                      </div>
                      <div>
                        <p className="text-gray-400 mb-1">Email:</p>
                        <p className="font-medium">shayan.hashemi.etu@univ-lille.fr</p>
                      </div>
                      <div>
                        <p className="text-gray-400 mb-1">Phone:</p>
                        <p className="font-medium">+33 755 963 630</p>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
                <TabsContent value="skills" className="p-6 m-0">
                  <motion.div
                    key="skills"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <p className="text-gray-300">
                      My technical expertise spans multiple domains including AI, machine learning, data science, and
                      full-stack development.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div>
                        <h4 className="text-green-400 font-mono mb-2">Programming Languages</h4>
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                          <li>Python</li>
                          <li>JavaScript</li>
                          <li>Java</li>
                          <li>SQL</li>
                          <li>SPARQL</li>
                          <li>HTML/CSS</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-green-400 font-mono mb-2">Frameworks & Tools</h4>
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                          <li>Flask</li>
                          <li>Angular</li>
                          <li>Docker</li>
                          <li>Git</li>
                          <li>MongoDB</li>
                          <li>Keycloak</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
                <TabsContent value="education" className="p-6 m-0">
                  <motion.div
                    key="education"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <p className="text-gray-300">
                      I'm currently pursuing a Master's degree in AI Management in Healthcare at École Centrale de
                      Lille, building on my foundation in Nutrition and Food Sciences.
                    </p>
                    <div className="space-y-4 mt-4">
                      <div className="border-l-2 border-green-400 pl-4">
                        <h4 className="font-bold">École Centrale de Lille</h4>
                        <p className="text-green-400">Master's in AI Management in Healthcare</p>
                        <p className="text-gray-400">2023 - Present</p>
                      </div>
                      <div className="border-l-2 border-green-400 pl-4">
                        <h4 className="font-bold">Université des sciences médicales de Jondishapur</h4>
                        <p className="text-green-400">Bachelor's in Nutrition and Food Sciences</p>
                        <p className="text-gray-400">2015</p>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </div>
          </Tabs>

          <div className="mt-8 flex justify-center">
            <CyberButton onClick={() => {
              const link = document.createElement('a');
              link.href = '/Newwithlink.pdf';
              link.download = 'Newwithlink.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}>Download Full CV</CyberButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
