"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Mail, Phone, MapPin, Linkedin, Github } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" })
    // Show success message
    alert("Thank you for your message! I'll get back to you soon.")
  }

  return (
    <section id="contact" className="py-20 px-4 bg-gray-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.05),transparent_70%)]"></div>
      <div className="container mx-auto max-w-5xl z-10 relative">
        <div className="flex flex-col items-center mb-16">
          <div className="inline-block bg-green-500/10 px-4 py-1 rounded-full mb-4">
            <h2 className="text-green-400 font-mono text-sm tracking-wider">CONTACT</h2>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            <span className="text-green-400">&lt;</span> Get In Touch <span className="text-green-400">/&gt;</span>
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-cyan-400"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <h4 className="text-2xl font-bold mb-4">Let's Connect</h4>
              <p className="text-gray-400 mb-8">
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
                Feel free to reach out using the form or through my contact information.
              </p>

              <div className="space-y-4">
                <Card className="bg-gray-900/50 border-green-500/20">
                  <CardContent className="p-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mr-4">
                      <Mail className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="font-medium">shayan.hashemi.etu@univ-lille.fr</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-green-500/20">
                  <CardContent className="p-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mr-4">
                      <Phone className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Phone</p>
                      <p className="font-medium">+33 755 963 630</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-green-500/20">
                  <CardContent className="p-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mr-4">
                      <MapPin className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Location</p>
                      <p className="font-medium">Lille, 59160, France</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-4 mt-8">
                <a
                  href="https://www.linkedin.com/in/shayan-hashemi-53080..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gray-900/50 border border-green-500/20 flex items-center justify-center text-green-400 hover:bg-green-400 hover:text-gray-900 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/Shayan5422"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gray-900/50 border border-green-500/20 flex items-center justify-center text-green-400 hover:bg-green-400 hover:text-gray-900 transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-900/50 border-green-500/20">
              <CardContent className="p-6">
                <h4 className="text-2xl font-bold mb-6">Send Me a Message</h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="bg-gray-800/50 border-green-500/20 focus:border-green-400 focus:ring-green-400/20"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Your Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="bg-gray-800/50 border-green-500/20 focus:border-green-400 focus:ring-green-400/20"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry"
                      className="bg-gray-800/50 border-green-500/20 focus:border-green-400 focus:ring-green-400/20"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hello, I'd like to talk about..."
                      className="bg-gray-800/50 border-green-500/20 focus:border-green-400 focus:ring-green-400/20 min-h-[150px]"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-black font-mono">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
