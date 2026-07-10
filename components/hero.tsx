'use client'

import dynamic from 'next/dynamic'
import { MagneticButton } from '@/components/magnetic-button'
import { motion } from 'motion/react'
import { ArrowRight, Download, Mail, MapPin, Sparkles, Shield } from 'lucide-react'
import { useEffect, useState } from 'react'
import { personal } from '@/lib/config/personal'

const Globe3D = dynamic(
  () => import('@/components/globe-3d').then((m) => m.Globe3D),
  { ssr: false, loading: () => <div className="h-full w-full" /> },
)

const roles = [
  'Cybersecurity Student',
  'SOC Analyst Aspirant',
  'Blue Team Enthusiast',
  'AI Security Explorer',
]

function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            deleting
              ? current.slice(0, prev.length - 1)
              : current.slice(0, prev.length + 1),
          )
        },
        deleting ? 40 : 80,
      )
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, index, words])

  return text
}

const statItems = [
  { label: 'Repositories', value: '16+' },
  { label: 'Projects', value: '6' },
  { label: 'Certifications', value: '3' },
]

export function Hero() {
  const typed = useTypewriter(roles)

  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center px-4 pt-28 pb-16 sm:px-6"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border glass px-3 py-1.5 text-xs text-muted-foreground"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-secondary animate-ping" />
            <Sparkles className="h-3.5 w-3.5 text-secondary" />
            Securing today&apos;s systems. Exploring tomorrow&apos;s AI.
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className="text-gradient">Hamza</span>
            <br />
            <span className="text-gradient">Naeem</span>
          </motion.h1>

          {/* Role typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-5 flex items-center gap-2.5 text-xl font-medium text-foreground/90 sm:text-2xl"
          >
            <span className="h-6 w-1.5 rounded-full bg-gradient-to-b from-primary to-secondary" aria-hidden="true" />
            <span aria-live="polite" className="font-mono">
              {typed}
              <motion.span
                aria-hidden="true"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.75, repeat: Infinity }}
                className="ml-0.5 inline-block h-6 w-[3px] translate-y-1 rounded-full bg-secondary"
              />
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Passionate Cybersecurity student focused on Blue Team Operations,
            SOC Analysis, Network Security, and AI Security. Continuously
            building practical skills through hands-on labs, real-world
            projects, and security research.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="#projects" variant="primary">
              Explore Projects
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href="#contact" variant="secondary">
              <Mail className="h-4 w-4" />
              Contact Me
            </MagneticButton>
            <MagneticButton href={personal.resume} variant="secondary" download={personal.resumeFilename} ariaLabel="Download resume PDF">
              <Download className="h-4 w-4" />
              Resume
            </MagneticButton>
          </motion.div>

          {/* Meta info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.52 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-primary" />
              Pakistan
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-border sm:inline-block" />
            <span>BS IT · 5th Semester</span>
            <span className="hidden h-1 w-1 rounded-full bg-border sm:inline-block" />
            <span>University of the Punjab</span>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-10 flex items-center gap-6"
          >
            {statItems.map((s, i) => (
              <div key={s.label} className="flex items-center gap-5">
                <div>
                  <div className="text-2xl font-semibold tracking-tight text-foreground">
                    {s.value}
                  </div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
                {i < statItems.length - 1 && (
                  <div className="h-8 w-px bg-border" />
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — 3D Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(16px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative mx-auto h-[420px] w-full max-w-[480px] lg:h-[520px]"
        >
          {/* Glow ring */}
          <div className="absolute inset-0 -z-10 rounded-full bg-primary/10 blur-[80px]" />
          {/* Globe */}
          <Globe3D />

          {/* Floating status chip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-2xl border border-border glass px-4 py-3 whitespace-nowrap"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/25">
              <Shield className="h-4 w-4 text-primary" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">Currently focused on</p>
              <p className="text-sm font-medium">SOC Operations &amp; AI Security</p>
            </div>
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-secondary" />
            </span>
          </motion.div>

          {/* Globe label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute top-4 right-4 rounded-full border border-border/60 glass px-3 py-1.5 text-[10px] uppercase tracking-widest text-muted-foreground"
          >
            Global Cyber Defense
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground sm:flex"
      >
        <span className="text-[11px] uppercase tracking-[0.2em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-border p-1">
          <motion.span
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="h-1.5 w-1.5 rounded-full bg-primary"
          />
        </span>
      </motion.a>
    </section>
  )
}
