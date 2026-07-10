'use client'

import { StaggerGroup, StaggerItem } from '@/components/animations'
import { GithubIcon } from '@/components/brand-icons'
import { SectionHeading } from '@/components/section-heading'
import { TiltCard } from '@/components/tilt-card'
import { ExternalLink, Layers } from 'lucide-react'
import Image from 'next/image'

type Project = {
  title: string
  image: string
  overview: string
  technologies: string[]
  challenges: string
  solution: string
  github: string
  demo?: string
  featured?: boolean
}

const projects: Project[] = [
  {
    title: 'Enterprise Network — Cisco Packet Tracer',
    image: '/images/project-network.png',
    overview:
      'Designed and simulated a multi-department enterprise network with routing, switching, and secure inter-VLAN communication using Cisco IOS.',
    technologies: ['Cisco IOS', 'Packet Tracer', 'OSPF', 'Switching', 'Routing'],
    challenges:
      'Balancing scalable IP addressing with secure segmentation while keeping the topology maintainable and well-documented.',
    solution:
      'Implemented hierarchical network design with layered security policies and documented every design decision.',
    github: 'https://github.com/hamzanaeem1230',
    featured: true,
  },
  {
    title: 'VLAN Segmentation & Security',
    image: '/images/project-vlan.png',
    overview:
      'Implemented VLAN segmentation to isolate traffic, improve network performance, and significantly reduce the attack surface.',
    technologies: ['VLAN', 'Trunking', 'Cisco IOS', '802.1Q', 'Security'],
    challenges:
      'Configuring trunk links and inter-VLAN routing without introducing broadcast storms or security misconfigurations.',
    solution:
      'Used 802.1Q trunking with careful native VLAN hardening and verified isolation with packet captures.',
    github: 'https://github.com/hamzanaeem1230',
    featured: true,
  },
  {
    title: 'Python Security Scripts',
    image: '/images/project-python.png',
    overview:
      'A growing collection of Python utilities for network scanning, automation, and small defensive security tasks.',
    technologies: ['Python', 'Scapy', 'Automation', 'Networking', 'Scripting'],
    challenges:
      'Writing clean, reusable scripts while safely handling network input, edge cases, and potential misuse.',
    solution:
      'Applied modular architecture with input validation and clear documentation for each utility.',
    github: 'https://github.com/hamzanaeem1230',
  },
  {
    title: 'SQL for Detection Engineering',
    image: '/images/project-sql.png',
    overview:
      'Hands-on SQL exercises focused on complex queries, joins, and data reasoning — foundational for log analysis and threat detection.',
    technologies: ['SQL', 'PostgreSQL', 'Queries', 'Joins', 'Data Analysis'],
    challenges:
      'Translating real security questions into efficient queries and reasoning about relational data structures.',
    solution:
      'Built a personal exercise library mapping each query type to a real-world detection use case.',
    github: 'https://github.com/hamzanaeem1230',
  },
  {
    title: 'Portfolio Website',
    image: '/images/project-portfolio.png',
    overview:
      'This portfolio — a premium, animated, fully responsive cybersecurity personal brand built with modern web tooling and Three.js.',
    technologies: ['Next.js 16', 'TypeScript', 'Tailwind', 'Framer Motion', 'Three.js'],
    challenges:
      'Crafting a luxurious, performant experience with interactive 3D and smooth motion while remaining accessible.',
    solution:
      'Used dynamic imports for the 3D globe, optimized animation performance, and followed semantic HTML standards.',
    github: 'https://github.com/hamzanaeem1230',
    demo: '#home',
    featured: true,
  },
  {
    title: 'AI Advertisement Generation',
    image: '/images/project-ai.png',
    overview:
      'Explored AI tooling and prompt engineering to generate high-quality creative advertisement concepts — an early step into applied AI.',
    technologies: ['AI Prompting', 'Generative AI', 'Creative', 'Automation'],
    challenges:
      'Learning to steer AI outputs toward consistent, brand-aligned, high-quality creative results.',
    solution:
      'Developed structured prompt templates and iterative refinement workflows for reproducible outputs.',
    github: 'https://github.com/hamzanaeem1230',
  },
]

export function Projects() {
  return (
    <section id="projects" className="relative px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Projects"
          title="Things I&apos;ve built &amp; explored"
          description="Hands-on work across networking, defensive security, programming, and AI — where learning turns into practice."
        />

        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <StaggerItem key={project.title} className="h-full">
              <TiltCard className="flex h-full flex-col overflow-hidden">
                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full border border-secondary/40 bg-secondary/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-secondary backdrop-blur-sm">
                    <Layers className="h-3 w-3" />
                    Featured
                  </div>
                )}

                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl">
                  <Image
                    src={project.image || '/placeholder.svg'}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {project.overview}
                  </p>

                  {/* Tech badges */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border bg-muted/30 px-2.5 py-0.5 text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Challenge / Solution */}
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-border/60 bg-background/40 p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                        Challenge
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                        {project.challenges}
                      </p>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-background/40 p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-secondary">
                        Solution
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto flex items-center gap-3 pt-6">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <GithubIcon className="h-4 w-4" />
                      GitHub
                    </a>
                    {project.demo ? (
                      <a
                        href={project.demo}
                        className="inline-flex items-center gap-2 rounded-full bg-primary/12 px-4 py-2 text-sm font-medium text-primary ring-1 ring-primary/25 transition-all duration-200 hover:bg-primary/20"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                    ) : (
                      <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground/40">
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </span>
                    )}
                  </div>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
