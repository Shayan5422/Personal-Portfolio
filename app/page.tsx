import Link from "next/link"
import { Terminal } from "lucide-react"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ExperienceSection from "@/components/experience-section"
import EducationSection from "@/components/education-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import ParticleBackground from "@/components/particle-background"
import MatrixBackground from "@/components/matrix-background"
import FloatingNav from "@/components/floating-nav"
import CursorEffect from "@/components/cursor-effect"
import GlitchText from "@/components/glitch-text"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-gray-100 overflow-hidden">
      <ParticleBackground />
      <MatrixBackground />
      <CursorEffect />

      <div className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-green-500/20">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Terminal className="h-6 w-6 text-green-400" />
            <span className="font-mono text-xl font-bold text-green-400 glitch-text" data-text="shayan@hashemi:~$">
              shayan@hashemi:~$
            </span>
          </div>
          <div className="hidden md:flex gap-6">
            {["about", "experience", "education", "skills", "projects", "contact"].map((item, index) => (
              <Link
                key={item}
                href={`#${item}`}
                className="font-mono text-sm uppercase tracking-wider hover:text-green-400 transition-colors relative nav-link"
              >
                <GlitchText text={item} delay={index * 500} />
              </Link>
            ))}
          </div>
        </nav>
      </div>

      <FloatingNav />

      <div className="pt-20">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  )
}
