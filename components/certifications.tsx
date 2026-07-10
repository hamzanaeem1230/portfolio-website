'use client'

import { StaggerGroup, StaggerItem } from '@/components/animations'
import { SectionHeading } from '@/components/section-heading'
import { Award, BadgeCheck, BookOpen, CheckCircle, Clock, Plus } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion } from 'motion/react'

type Cert = {
  title: string
  issuer: string
  status: 'Completed' | 'In Progress'
  icon: LucideIcon
  description: string
  skills: string[]
  year?: string
}

const certs: Cert[] = [
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    status: 'Completed',
    icon: Award,
    description:
      'Comprehensive introduction to cybersecurity concepts, threats, and defensive practices. Covered network security fundamentals and best practices.',
    skills: ['Network Security', 'Threat Awareness', 'Cryptography Basics', 'Security Policies'],
    year: '2024',
  },
  {
    title: 'TryHackMe Learning Path',
    issuer: 'TryHackMe',
    status: 'In Progress',
    icon: BadgeCheck,
    description:
      'Hands-on cybersecurity learning through guided rooms. Currently progressing through the Blue Team and SOC Level 1 paths.',
    skills: ['SOC Operations', 'Log Analysis', 'Incident Response', 'Threat Hunting'],
  },
  {
    title: 'CCNA Learning Journey',
    issuer: 'NetworkChuck (YouTube)',
    status: 'In Progress',
    icon: BookOpen,
    description:
      'Self-directed CCNA preparation through NetworkChuck\'s acclaimed course series. Building deep networking fundamentals.',
    skills: ['Routing & Switching', 'OSPF', 'VLANs', 'Network Troubleshooting'],
  },
]

export function Certifications() {
  return (
    <section id="certifications" className="relative px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Certifications"
          title="Learning, credentialed"
          description="Structured programs and platforms building my defensive security and networking foundation — with more ahead."
        />

        <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-3">
          {certs.map((cert, index) => (
            <StaggerItem key={cert.title} className="h-full">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card/70">
                {/* Top accent bar */}
                <div
                  className={`h-1 w-full transition-all duration-300 ${
                    cert.status === 'Completed'
                      ? 'bg-gradient-to-r from-secondary to-secondary/50'
                      : 'bg-gradient-to-r from-primary to-primary/50'
                  }`}
                />

                <div className="flex flex-1 flex-col p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-110 ${
                        cert.status === 'Completed'
                          ? 'bg-secondary/12 text-secondary ring-secondary/25'
                          : 'bg-primary/12 text-primary ring-primary/25'
                      }`}
                    >
                      <cert.icon className="h-5.5 w-5.5" />
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                        cert.status === 'Completed'
                          ? 'bg-secondary/15 text-secondary'
                          : 'bg-primary/15 text-primary'
                      }`}
                    >
                      {cert.status === 'Completed' ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <Clock className="h-3 w-3" />
                      )}
                      {cert.status}
                    </span>
                  </div>

                  {/* Title & issuer */}
                  <h3 className="mt-4 text-base font-semibold leading-snug">
                    {cert.title}
                  </h3>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    {cert.year && (
                      <span className="text-xs text-muted-foreground">{cert.year}</span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                    {cert.description}
                  </p>

                  {/* Skills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-border/60 bg-muted/30 px-2.5 py-0.5 text-[10px] text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Add more placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-5 flex items-center justify-center"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-dashed border-border px-6 py-4 text-sm text-muted-foreground">
            <Plus className="h-4 w-4" />
            <span>More certifications ahead — CompTIA Security+, eJPT, and beyond</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
