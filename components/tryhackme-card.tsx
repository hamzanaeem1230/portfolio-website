'use client'

import { Reveal } from '@/components/animations'
import { SectionHeading } from '@/components/section-heading'
import { ExternalLink, Flag, Shield, Target, Trophy, Zap } from 'lucide-react'
import { motion } from 'motion/react'

const badges = [
  { name: 'Introduction to Cybersecurity', color: 'from-blue-500/20 to-blue-600/10', border: 'border-blue-500/30', text: 'text-blue-400' },
  { name: 'Pre-Security', color: 'from-cyan-500/20 to-cyan-600/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
  { name: 'Blue Team', color: 'from-primary/20 to-primary/10', border: 'border-primary/30', text: 'text-primary' },
  { name: 'Linux Fundamentals', color: 'from-secondary/20 to-secondary/10', border: 'border-secondary/30', text: 'text-secondary' },
]

const paths = [
  { name: 'SOC Level 1', progress: 28, color: 'bg-primary' },
  { name: 'Pre-Security', progress: 65, color: 'bg-secondary' },
  { name: 'Blue Team', progress: 40, color: 'bg-blue-400' },
]

const stats = [
  { label: 'Rooms Completed', value: '32', icon: Flag },
  { label: 'Badges', value: '8', icon: Trophy },
  { label: 'Current Streak', value: '12d', icon: Zap },
  { label: 'Rank', value: 'Hacker', icon: Target },
]

export function TryHackMeCard() {
  return (
    <section id="tryhackme" className="relative px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="TryHackMe"
          title="Practicing defense in the lab"
          description="Hands-on cybersecurity training through guided rooms, learning paths, and real-world simulations."
        />

        <Reveal className="mt-12">
          <div className="overflow-hidden rounded-3xl border border-border glow-border">
            {/* Header */}
            <div className="relative border-b border-border bg-gradient-to-r from-primary/10 via-card to-secondary/10 p-6 sm:p-8">
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-5">
                  {/* Avatar placeholder */}
                  <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 ring-2 ring-primary/30">
                    <Shield className="h-8 w-8 text-primary" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold">hamzanaeem123098785</h3>
                      <span className="rounded-full bg-secondary/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-secondary">
                        Hacker
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      Focused on Blue Team · SOC · Defensive Security
                    </p>
                  </div>
                </div>
                <a
                  href="https://tryhackme.com/p/hamzanaeem123098785"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
                >
                  View Profile
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-border/60 bg-background/30 p-4 backdrop-blur-sm"
                  >
                    <stat.icon className="h-4 w-4 text-secondary" />
                    <div className="mt-2 text-2xl font-semibold tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Paths */}
            <div className="grid gap-0 sm:grid-cols-2">
              <div className="border-r border-border p-6 sm:p-8">
                <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Active Learning Paths
                </h4>
                <div className="space-y-5">
                  {paths.map((path) => (
                    <div key={path.name}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-medium">{path.name}</span>
                        <span className="text-muted-foreground">{path.progress}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted/40">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${path.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                          className={`h-full rounded-full ${path.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  * Progress is approximate. Connect a live API to display real data.
                </p>
              </div>

              {/* Badges */}
              <div className="p-6 sm:p-8">
                <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Earned Badges
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {badges.map((badge) => (
                    <div
                      key={badge.name}
                      className={`rounded-xl border ${badge.border} bg-gradient-to-br ${badge.color} p-3 transition-all duration-200 hover:-translate-y-0.5`}
                    >
                      <Trophy className={`h-4 w-4 ${badge.text}`} />
                      <p className={`mt-2 text-xs font-medium leading-tight ${badge.text}`}>
                        {badge.name}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  * Badges are representative. Configure the TryHackMe username to pull live data.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
