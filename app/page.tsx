import { Terminal } from "lucide-react"
import Link from "next/link"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ExperienceSection from "@/components/experience-section"
import EducationSection from "@/components/education-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-gray-100">
      <div className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-green-500/20">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Terminal className="h-6 w-6 text-green-400" />
            <span className="font-mono text-xl font-bold text-green-400">shayan@hashemi:~$</span>
          </div>
          <div className="hidden md:flex gap-6">
            {["about", "experience", "education", "skills", "projects", "contact"].map((item) => (
              <Link
                key={item}
                href={`#${item}`}
                className="font-mono text-sm uppercase tracking-wider hover:text-green-400 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="md:hidden">
            <button className="text-green-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </div>

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
