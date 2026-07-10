'use client'

import { useState } from 'react'
import { StaggerGroup, StaggerItem } from '@/components/animations'
import { SectionHeading } from '@/components/section-heading'
import {
  Bug,
  Cpu,
  Database,
  Network,
  Radar,
  ScanSearch,
  Server,
  Shield,
  ShieldCheck,
  Siren,
  SquareTerminal,
  Terminal,
  Waypoints,
  Bot,
  Cloud,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'

type Skill = {
  name: string
  icon: LucideIcon
  category: string
  level: number // 1-5
}

const skills: Skill[] = [
  { name: 'Networking', icon: Network, category: 'Infrastructure', level: 4 },
  { name: 'Linux', icon: Terminal, category: 'Systems', level: 3 },
  { name: 'Windows', icon: SquareTerminal, category: 'Systems', level: 3 },
  { name: 'Cisco Networking', icon: Server, category: 'Infrastructure', level: 4 },
  { name: 'Packet Tracer', icon: Waypoints, category: 'Infrastructure', level: 4 },
  { name: 'Python', icon: Cpu, category: 'Programming', level: 3 },
  { name: 'SQL', icon: Database, category: 'Programming', level: 3 },
  { name: 'Wireshark', icon: Radar, category: 'Analysis', level: 3 },
  { name: 'Nmap', icon: ScanSearch, category: 'Analysis', level: 3 },
  { name: 'Burp Suite', icon: Bug, category: 'Analysis', level: 2 },
  { name: 'Cybersecurity Fundamentals', icon: ShieldCheck, category: 'Security', level: 4 },
  { name: 'Threat Detection', icon: Siren, category: 'Security', level: 3 },
  { name: 'Blue Team', icon: Shield, category: 'Security', level: 3 },
  { name: 'AI Security', icon: Bot, category: 'Emerging', level: 2 },
  { name: 'Cloud Security', icon: Cloud, category: 'Emerging', level: 2 },
  { name: 'SOC Operations', icon: Radar, category: 'Security', level: 2 },
]

const categories = ['All', 'Infrastructure', 'Systems', 'Programming', 'Analysis', 'Security', 'Emerging']

function SkillLevel({ level }: { level: number }) {
  return (
    <div className="mt-3 flex items-center gap-1" aria-label={`Skill level ${level} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'h-1 flex-1 rounded-full transition-colors',
            i < level ? 'bg-primary' : 'bg-muted/60',
          )}
        />
      ))}
    </div>
  )
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory)

  return (
    <section id="skills" className="relative px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Skills"
          title="Tools &amp; disciplines I work with"
          description="A blend of networking fundamentals, defensive security tooling, and hands-on programming — expanding into AI security and cloud."
        />

        {/* Category filter tabs */}
        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                activeCategory === cat
                  ? 'bg-primary text-white shadow-[0_0_20px_-6px_rgba(59,130,246,0.7)]'
                  : 'border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground',
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card/70">
                  <div
                    aria-hidden="true"
                    className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/8 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/25 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110 group-hover:text-secondary">
                    <skill.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-sm font-semibold leading-snug">
                    {skill.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {skill.category}
                  </p>
                  <SkillLevel level={skill.level} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
