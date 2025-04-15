"use client"

import { motion } from "framer-motion"
import { GraduationCap, Calendar, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function EducationSection() {
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

  return (
    <section id="education" className="py-20 px-4 bg-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.05),transparent_70%)]"></div>
      <div className="container mx-auto max-w-5xl z-10 relative">
        <div className="flex flex-col items-center mb-16">
          <div className="inline-block bg-green-500/10 px-4 py-1 rounded-full mb-4">
            <h2 className="text-green-400 font-mono text-sm tracking-wider">EDUCATION</h2>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            <span className="text-green-400">&lt;</span> Academic Background{" "}
            <span className="text-green-400">/&gt;</span>
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-cyan-400"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-900/50 border-green-500/20 hover:border-green-500/50 transition-all h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mr-4">
                      <GraduationCap className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">{edu.degree}</h4>
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
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <h4 className="text-2xl font-bold mb-6 text-center">Inventions & Patents</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gray-900/50 border-green-500/20 hover:border-green-500/50 transition-all">
              <CardContent className="p-6">
                <h5 className="text-lg font-bold mb-2">Physical Disability Restoration System</h5>
                <p className="text-gray-400 mb-2">Reference Number: 103741</p>
                <div className="w-full h-1 bg-gradient-to-r from-green-400 to-transparent mb-4"></div>
                <p className="text-gray-300">
                  Innovative system designed to assist in the rehabilitation and restoration of physical abilities for
                  individuals with disabilities.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-green-500/20 hover:border-green-500/50 transition-all">
              <CardContent className="p-6">
                <h5 className="text-lg font-bold mb-2">Food Consumable Preparation Device (NG Tube)</h5>
                <p className="text-gray-400 mb-2">Reference Number: 104483</p>
                <div className="w-full h-1 bg-gradient-to-r from-green-400 to-transparent mb-4"></div>
                <p className="text-gray-300">
                  Device for the preparation and adjustment of food consumables, specifically designed for nasogastric
                  (NG) tube feeding applications.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
