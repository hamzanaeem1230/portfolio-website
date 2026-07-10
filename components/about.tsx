'use client'

import { Reveal, StaggerGroup, StaggerItem } from '@/components/animations'
import { SectionHeading } from '@/components/section-heading'
import { ProfileImage } from '@/components/profile-image'
import { Brain, GraduationCap, ShieldHalf, Target, Lightbulb, Code2 } from 'lucide-react'

const highlights = [
  {
    icon: GraduationCap,
    title: 'Education',
    text: 'BS Information Technology, 5th Semester at the University of the Punjab — building a rigorous technical foundation.',
  },
  {
    icon: ShieldHalf,
    title: 'Defensive Security',
    text: 'Focused on Blue Team operations, networking fundamentals, threat detection, and Security Operations.',
  },
  {
    icon: Brain,
    title: 'AI Security',
    text: 'Exploring the frontier of AI Security — prompt injection, LLM safety, adversarial inputs, and secure AI deployment.',
  },
  {
    icon: Target,
    title: 'Career Goal',
    text: 'Become a SOC Analyst and specialize in AI Security research and practice at a world-class organization.',
  },
  {
    icon: Lightbulb,
    title: 'Problem Solver',
    text: 'I approach every challenge with curiosity — breaking down systems, identifying weaknesses, and building resilient solutions.',
  },
  {
    icon: Code2,
    title: 'Builder',
    text: 'From Cisco labs to Python scripts — I believe in learning by doing, not just reading about it.',
  },
]

export function About() {
  return (
    <section id="about" className="relative px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About"
          title={<span className="text-balance">Curious by nature, defensive by discipline.</span>}
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          {/* Left — profile photo + bio text */}
          <Reveal className="space-y-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            <ProfileImage size="lg" className="mx-auto mb-2 lg:mx-0" />
            <p>
              I am a{' '}
              <span className="font-medium text-foreground">
                BS Information Technology student
              </span>{' '}
              at the University of the Punjab with a genuine passion for
              cybersecurity, networking, and the intersection of AI and security.
            </p>
            <p>
              My approach to learning is hands-on and relentless. Whether it is
              configuring enterprise networks in Cisco Packet Tracer, writing
              Python security utilities, or studying how LLMs can be exploited
              — I pursue understanding at the implementation level, not just
              the conceptual.
            </p>
            <p>
              My goal is to become a{' '}
              <span className="font-medium text-foreground">
                Security Operations Center (SOC) Analyst
              </span>
              , then grow into Detection Engineering and{' '}
              <span className="font-medium text-foreground">
                AI Security
              </span>{' '}
              — one of the most critical and underexplored fields in technology today.
            </p>

            {/* Divider quote */}
            <blockquote className="mt-6 border-l-2 border-primary/50 pl-5 text-base italic text-muted-foreground">
              &ldquo;Continuous learning is not optional in security — it&apos;s the
              job.&rdquo;
            </blockquote>
          </Reveal>

          {/* Right — highlight cards */}
          <StaggerGroup className="grid gap-3 sm:grid-cols-2">
            {highlights.map((item) => (
              <StaggerItem key={item.title}>
                <div className="group h-full rounded-2xl border border-border bg-card/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card/70">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/25 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110 group-hover:text-secondary">
                    <item.icon className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="mt-3.5 text-sm font-semibold">{item.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  )
}
