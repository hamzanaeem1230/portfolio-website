'use client'

import { StaggerGroup, StaggerItem } from '@/components/animations'
import { SectionHeading } from '@/components/section-heading'
import {
  Bot,
  Cloud,
  Cpu,
  LockKeyhole,
  Radar,
  ScanSearch,
  Siren,
  Network,
  Shield,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion } from 'motion/react'

type Topic = {
  title: string
  detail: string
  icon: LucideIcon
  priority: 'high' | 'medium' | 'learning'
  progress?: number
}

const topics: Topic[] = [
  {
    title: 'SOC Operations',
    detail: 'Alert triage, SIEM workflows, monitoring, and incident escalation.',
    icon: Radar,
    priority: 'high',
    progress: 35,
  },
  {
    title: 'Threat Hunting',
    detail: 'Proactively searching for adversary activity using behavioral analytics.',
    icon: ScanSearch,
    priority: 'high',
    progress: 25,
  },
  {
    title: 'Detection Engineering',
    detail: 'Writing, tuning, and managing high-fidelity detection rules.',
    icon: Siren,
    priority: 'medium',
    progress: 20,
  },
  {
    title: 'AI Security',
    detail: 'Securing AI systems, data pipelines, and model deployment environments.',
    icon: Cpu,
    priority: 'high',
    progress: 30,
  },
  {
    title: 'Prompt Injection',
    detail: 'Understanding, replicating, and defending against LLM prompt attacks.',
    icon: Bot,
    priority: 'high',
    progress: 40,
  },
  {
    title: 'LLM Security',
    detail: 'Guardrails, red-teaming language models, and safe deployment strategies.',
    icon: LockKeyhole,
    priority: 'medium',
    progress: 25,
  },
  {
    title: 'Cloud Security',
    detail: 'Securing cloud-native infrastructure — IAM, misconfigurations, monitoring.',
    icon: Cloud,
    priority: 'learning',
    progress: 15,
  },
  {
    title: 'Network Defense',
    detail: 'Firewall rules, IDS/IPS, traffic analysis, and perimeter hardening.',
    icon: Network,
    priority: 'medium',
    progress: 45,
  },
  {
    title: 'Blue Team',
    detail: 'Defensive posture, incident response, forensics basics, and log analysis.',
    icon: Shield,
    priority: 'high',
    progress: 50,
  },
]

const priorityConfig = {
  high: {
    label: 'Active',
    badge: 'bg-secondary/15 text-secondary',
    bar: 'bg-secondary',
    border: 'hover:border-secondary/40',
    icon: 'bg-secondary/12 text-secondary ring-secondary/25 group-hover:bg-secondary/20',
  },
  medium: {
    label: 'Building',
    badge: 'bg-primary/15 text-primary',
    bar: 'bg-primary',
    border: 'hover:border-primary/40',
    icon: 'bg-primary/12 text-primary ring-primary/25 group-hover:bg-primary/20',
  },
  learning: {
    label: 'Exploring',
    badge: 'bg-muted text-muted-foreground',
    bar: 'bg-muted-foreground',
    border: 'hover:border-border',
    icon: 'bg-muted/60 text-muted-foreground ring-border group-hover:bg-muted',
  },
}

export function CurrentLearning() {
  return (
    <section className="relative px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Currently Learning"
          title="What I&apos;m focused on right now"
          description="An active roadmap toward SOC operations and modern AI security — progress tracked, skills accumulated."
        />

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => {
            const config = priorityConfig[topic.priority]
            return (
              <StaggerItem key={topic.title} className="h-full">
                <div
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/50 p-5 transition-all duration-300 hover:-translate-y-1 ${config.border}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 transition-all duration-300 group-hover:scale-110 ${config.icon}`}
                    >
                      <topic.icon className="h-5 w-5" />
                    </span>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${config.badge}`}>
                      {config.label}
                    </span>
                  </div>

                  <h3 className="mt-4 text-sm font-semibold">{topic.title}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {topic.detail}
                  </p>

                  {/* Progress bar */}
                  {topic.progress !== undefined && (
                    <div className="mt-4">
                      <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{topic.progress}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-muted/40">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${topic.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                          className={`h-full rounded-full ${config.bar}`}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}
