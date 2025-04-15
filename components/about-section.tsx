"use client"

import { useState } from "react"
import { Terminal, User, Code, Brain, Server } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <section id="about" className="py-20 px-4 bg-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.05),transparent_70%)]"></div>
      <div className="container mx-auto max-w-5xl z-10 relative">
        <div className="flex flex-col items-center mb-12">
          <div className="inline-block bg-green-500/10 px-4 py-1 rounded-full mb-4">
            <h2 className="text-green-400 font-mono text-sm tracking-wider">ABOUT ME</h2>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            <span className="text-green-400">&lt;</span> Who Am I <span className="text-green-400">/&gt;</span>
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-cyan-400"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-gray-900/50 border-green-500/20 hover:border-green-500/50 transition-all">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                  <Brain className="h-8 w-8 text-green-400" />
                </div>
                <h4 className="text-xl font-bold mb-2">AI Engineer</h4>
                <p className="text-gray-400">
                  Specializing in machine learning, deep learning, and AI solutions for healthcare
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-green-500/20 hover:border-green-500/50 transition-all">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                  <Code className="h-8 w-8 text-green-400" />
                </div>
                <h4 className="text-xl font-bold mb-2">Full-Stack Developer</h4>
                <p className="text-gray-400">Building web applications with Python, JavaScript, Angular, and Flask</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-green-500/20 hover:border-green-500/50 transition-all">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                  <Server className="h-8 w-8 text-green-400" />
                </div>
                <h4 className="text-xl font-bold mb-2">Data Scientist</h4>
                <p className="text-gray-400">Analyzing and visualizing data to extract meaningful insights</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="profile" className="w-full">
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
          <TabsContent value="profile" className="border border-green-500/20 bg-gray-900/50 p-6 rounded-b-md">
            <div className="space-y-4">
              <p className="text-gray-300">
                Currently working as an AI Engineer at Alasuite, I specialize in developing AI solutions for healthcare.
                My expertise lies in machine learning, data science, and full-stack development.
              </p>
              <p className="text-gray-300">
                I'm passionate about leveraging AI to transform healthcare and improve patient outcomes. My background
                in nutrition and food sciences gives me a unique perspective on health-related AI applications.
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
            </div>
          </TabsContent>
          <TabsContent value="skills" className="border border-green-500/20 bg-gray-900/50 p-6 rounded-b-md">
            <div className="space-y-4">
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
            </div>
          </TabsContent>
          <TabsContent value="education" className="border border-green-500/20 bg-gray-900/50 p-6 rounded-b-md">
            <div className="space-y-4">
              <p className="text-gray-300">
                I'm currently pursuing a Master's degree in AI Management in Healthcare at École Centrale de Lille,
                building on my foundation in Nutrition and Food Sciences.
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
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
