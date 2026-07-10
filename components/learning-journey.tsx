'use client'

import { Reveal } from '@/components/animations'
import { SectionHeading } from '@/components/section-heading'
import { motion } from 'motion/react'
import {
  Bot,
  Flag,
  GraduationCap,
  Network,
  Rocket,
  Server,
  ShieldCheck,
  SquareTerminal,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Step = {
  title: string
  detail: string
  icon: LucideIcon
  future?: boolean
}

const steps: Step[] = [
  {
    title: 'Started BS IT',
    detail: 'Began my degree at University of the Punjab.',
    icon: GraduationCap,
  },
  {
    title: 'Networking',
    detail: 'Learned core networking concepts and protocols.',
    icon: Network,
  },
  {
    title: 'Cisco',
    detail: 'Hands-on labs with Cisco tools and Packet Tracer.',
    icon: Server,
  },
  {
    title: 'Cybersecurity',
    detail: 'Dived into defensive security fundamentals.',
    icon: ShieldCheck,
  },
  {
    title: 'Python',
    detail: 'Built scripts and automation for security tasks.',
    icon: SquareTerminal,
  },
  {
    title: 'TryHackMe',
    detail: 'Practical hands-on rooms and blue team paths.',
    icon: Flag,
  },
  {
    title: 'AI Security',
    detail: 'Exploring LLM safety and prompt injection.',
    icon: Bot,
  },
  {
    title: 'Future SOC Analyst',
    detail: 'Working toward a Security Operations career.',
    icon: Rocket,
    future: true,
  },
]

export function LearningJourney() {
  return (
    <section id="journey" className="relative px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Learning Journey"
          title="From curiosity to a career path"
          description="Every step has been hands-on — building fundamentals, then layering security and AI on top."
        />

        <div className="relative mt-14 pl-2">
          {/* vertical line */}
          <div
            aria-hidden="true"
            className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-secondary/40 to-transparent"
          />

          <ol className="space-y-8">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.05}>
                <li className="relative flex gap-5">
                  <span
                    className={
                      step.future
                        ? 'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-dashed border-secondary/60 bg-background text-secondary'
                        : 'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary ring-1 ring-primary/30'
                    }
                  >
                    {step.future && (
                      <motion.span
                        className="absolute inset-0 rounded-full border border-secondary/40"
                        animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    <step.icon className="h-4.5 w-4.5" />
                  </span>
                  <div className="flex-1 rounded-2xl border border-border bg-card/40 p-4 transition-colors duration-300 hover:border-primary/30">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold">{step.title}</h3>
                      {step.future && (
                        <span className="rounded-full bg-secondary/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-secondary">
                          Goal
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.detail}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
