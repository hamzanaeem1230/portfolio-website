import { SiteBackground } from "@/components/site-background"
import { ScrollProgress } from "@/components/scroll-progress"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Certifications } from "@/components/certifications"
import { TerminalSection } from "@/components/terminal-section"
import { CurrentLearning } from "@/components/current-learning"
import { TryHackMeCard } from "@/components/tryhackme-card"
import { GithubSection } from "@/components/github-section"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { AIAssistant } from "@/components/ai-assistant"
import { FloatingParticlesBackground } from "@/components/floating-particles-background"

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <SiteBackground />
      <FloatingParticlesBackground />
      <Navbar />
      <main id="main-content" className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <TerminalSection />
        <CurrentLearning />
        <TryHackMeCard />
        <GithubSection />
        <Contact />
      </main>
      <Footer />
      <AIAssistant />
    </>
  )
}
