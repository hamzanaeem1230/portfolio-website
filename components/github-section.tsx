'use client'

import { useMemo } from 'react'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/animations'
import { SectionHeading } from '@/components/section-heading'
import { TiltCard } from '@/components/tilt-card'
import { GithubIcon } from '@/components/brand-icons'
import { GitFork, Star, GitBranch, GitCommitHorizontal, ExternalLink } from 'lucide-react'

const repos = [
  {
    name: 'network-labs',
    description: 'Cisco Packet Tracer topologies and reproducible lab configs for VLANs, routing, and enterprise network design.',
    language: 'Config',
    color: '#3b82f6',
    stars: 12,
    forks: 3,
    updated: '2 weeks ago',
  },
  {
    name: 'python-security-scripts',
    description: 'Small Python utilities for scanning, automation, and defensive security tasks — continuously expanding.',
    language: 'Python',
    color: '#06b6d4',
    stars: 18,
    forks: 4,
    updated: '1 week ago',
  },
  {
    name: 'sql-practice',
    description: 'Hands-on SQL exercises mapped to real detection and analysis use cases. Queries, joins, and data reasoning.',
    language: 'SQL',
    color: '#60a5fa',
    stars: 7,
    forks: 1,
    updated: '3 weeks ago',
  },
  {
    name: 'tryhackme-notes',
    description: 'Structured notes and writeups from TryHackMe rooms — Blue Team path, SOC analyst prep, and more.',
    language: 'Markdown',
    color: '#22d3ee',
    stars: 24,
    forks: 6,
    updated: '5 days ago',
  },
]

const stats = [
  { label: 'Repositories', value: '16', icon: GitBranch },
  { label: 'Total Stars', value: '61', icon: Star },
  { label: 'Forks', value: '14', icon: GitFork },
  { label: 'Contributions', value: '480+', icon: GitCommitHorizontal },
]

function Heatmap() {
  const cells = useMemo(() => {
    const out: number[] = []
    let seed = 7
    for (let i = 0; i < 7 * 26; i++) {
      seed = (seed * 9301 + 49297) % 233280
      const r = seed / 233280
      out.push(r > 0.62 ? Math.ceil(r * 4) : 0)
    }
    return out
  }, [])

  const levelClass = (l: number) => {
    switch (l) {
      case 0:
        return 'bg-muted/40'
      case 1:
        return 'bg-primary/20'
      case 2:
        return 'bg-primary/40'
      case 3:
        return 'bg-primary/65'
      default:
        return 'bg-secondary'
    }
  }

  return (
    <div className="overflow-x-auto pb-1">
      <div className="grid grid-flow-col grid-rows-7 gap-1 min-w-max">
        {cells.map((lvl, i) => (
          <div
            key={i}
            title={`Activity level ${lvl}`}
            aria-label={`Activity level ${lvl} of 4`}
            className={`h-3 w-3 rounded-[3px] transition-colors duration-150 hover:scale-125 ${levelClass(lvl)}`}
          />
        ))}
      </div>
    </div>
  )
}

export function GithubSection() {
  return (
    <section id="github" className="relative px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Open Source"
          title="Building in public"
          description="A snapshot of my GitHub — labs, tooling, and writeups I maintain while I learn. Code is proof of work."
        />

        {/* Stats row */}
        <StaggerGroup className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label} className="h-full">
              <div className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-card/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/12 text-secondary ring-1 ring-secondary/25 transition-transform duration-300 group-hover:scale-110">
                  <s.icon className="h-4.5 w-4.5" />
                </span>
                <div>
                  <div className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {s.value}
                  </div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Contribution heatmap */}
        <Reveal className="mt-4">
          <div className="rounded-2xl border border-border bg-card/50 p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Contribution activity</span>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Approximate representation — last 6 months
                </p>
              </div>
              <a
                href="https://github.com/hamzanaeem1230"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                View on GitHub
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <Heatmap />
            <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-muted-foreground">
              <span>Less</span>
              {['bg-muted/40', 'bg-primary/20', 'bg-primary/40', 'bg-primary/65', 'bg-secondary'].map((c) => (
                <span key={c} className={`h-3 w-3 rounded-[3px] ${c}`} />
              ))}
              <span>More</span>
            </div>
          </div>
        </Reveal>

        {/* Repo cards */}
        <StaggerGroup className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {repos.map((repo) => (
            <StaggerItem key={repo.name} className="h-full">
              <TiltCard className="h-full p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <GithubIcon className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`https://github.com/hamzanaeem1230/${repo.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm font-medium hover:text-primary transition-colors"
                    >
                      {repo.name}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="h-3.5 w-3.5" />
                      {repo.forks}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {repo.description}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: repo.color }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {repo.language}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Updated {repo.updated}
                  </span>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* View profile CTA */}
        <Reveal className="mt-8 flex justify-center">
          <a
            href="https://github.com/hamzanaeem1230"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border border-border glass px-6 py-3 text-sm font-medium transition-all duration-200 hover:border-primary/40 hover:text-primary hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.4)]"
          >
            <GithubIcon className="h-4 w-4" />
            View full profile on GitHub
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
