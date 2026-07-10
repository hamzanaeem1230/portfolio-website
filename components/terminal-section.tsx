'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Reveal } from '@/components/animations'
import { SectionHeading } from '@/components/section-heading'
import { Circle } from 'lucide-react'

type Line = {
  type: 'command' | 'output' | 'blank'
  content: string
  color?: string
}

const sequence: Array<{ command: string; output: Line[] }> = [
  {
    command: 'whoami',
    output: [
      { type: 'output', content: 'hamza-naeem', color: 'text-cyan-400' },
    ],
  },
  {
    command: 'cat about.txt',
    output: [
      {
        type: 'output',
        content:
          'Name     : Hamza Naeem',
        color: 'text-foreground/80',
      },
      {
        type: 'output',
        content: 'Role     : BS IT Student | Cybersecurity Aspirant',
        color: 'text-foreground/80',
      },
      {
        type: 'output',
        content: 'Location : Pakistan',
        color: 'text-foreground/80',
      },
      {
        type: 'output',
        content: 'Focus    : Blue Team · SOC · AI Security',
        color: 'text-foreground/80',
      },
      { type: 'blank', content: '' },
      {
        type: 'output',
        content:
          '"I enjoy understanding how systems work, defending digital',
        color: 'text-muted-foreground',
      },
      {
        type: 'output',
        content: ' infrastructure, and exploring AI security frontiers."',
        color: 'text-muted-foreground',
      },
    ],
  },
  {
    command: 'ls skills/',
    output: [
      {
        type: 'output',
        content:
          'networking/   linux/        windows/      cisco-ios/',
        color: 'text-blue-400',
      },
      {
        type: 'output',
        content:
          'python/       sql/          wireshark/    nmap/',
        color: 'text-blue-400',
      },
      {
        type: 'output',
        content:
          'burpsuite/    blue-team/    soc/          ai-security/',
        color: 'text-blue-400',
      },
    ],
  },
  {
    command: 'show certifications',
    output: [
      {
        type: 'output',
        content: '[ COMPLETED ] Cisco Introduction to Cybersecurity',
        color: 'text-cyan-400',
      },
      {
        type: 'output',
        content: '[ LEARNING  ] TryHackMe — Blue Team Path',
        color: 'text-blue-400',
      },
      {
        type: 'output',
        content: '[ LEARNING  ] CCNA — NetworkChuck',
        color: 'text-blue-400',
      },
    ],
  },
  {
    command: 'show projects',
    output: [
      {
        type: 'output',
        content: '→ Enterprise Network Design (Cisco Packet Tracer)',
        color: 'text-foreground/80',
      },
      {
        type: 'output',
        content: '→ VLAN Segmentation & Security Configuration',
        color: 'text-foreground/80',
      },
      {
        type: 'output',
        content: '→ Python Security Automation Scripts',
        color: 'text-foreground/80',
      },
      {
        type: 'output',
        content: '→ SQL Foundations for Detection Engineering',
        color: 'text-foreground/80',
      },
      {
        type: 'output',
        content: '→ AI Advertisement Generation Exploration',
        color: 'text-foreground/80',
      },
    ],
  },
  {
    command: 'cat career-goals.txt',
    output: [
      {
        type: 'output',
        content: 'SHORT TERM  : Land a Junior SOC Analyst role',
        color: 'text-cyan-400',
      },
      {
        type: 'output',
        content: 'MID TERM    : Specialize in Detection Engineering',
        color: 'text-cyan-400',
      },
      {
        type: 'output',
        content: 'LONG TERM   : Lead AI Security research & practice',
        color: 'text-cyan-400',
      },
      { type: 'blank', content: '' },
      {
        type: 'output',
        content: 'Continuous learning is not optional — it\'s the job.',
        color: 'text-muted-foreground',
      },
    ],
  },
]

const TYPING_SPEED = 42
const OUTPUT_DELAY = 180
const BETWEEN_DELAY = 900

export function TerminalSection() {
  const [lines, setLines] = useState<Line[]>([])
  const [currentTyped, setCurrentTyped] = useState('')
  const [phase, setPhase] = useState<'typing' | 'output' | 'wait'>('typing')
  const [seqIndex, setSeqIndex] = useState(0)
  const [outputIndex, setOutputIndex] = useState(0)
  const terminalBodyRef = useRef<HTMLDivElement>(null)

  // Scroll ONLY the terminal's internal scrollable div — never the page
  useEffect(() => {
    const body = terminalBodyRef.current
    if (!body) return
    body.scrollTop = body.scrollHeight
  }, [lines, currentTyped])

  useEffect(() => {
    const step = sequence[seqIndex]
    if (!step) return

    if (phase === 'typing') {
      if (currentTyped.length < step.command.length) {
        const t = setTimeout(() => {
          setCurrentTyped(step.command.slice(0, currentTyped.length + 1))
        }, TYPING_SPEED)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => {
          setLines((prev) => [
            ...prev,
            { type: 'command', content: step.command },
          ])
          setCurrentTyped('')
          setPhase('output')
          setOutputIndex(0)
        }, OUTPUT_DELAY)
        return () => clearTimeout(t)
      }
    }

    if (phase === 'output') {
      if (outputIndex < step.output.length) {
        const t = setTimeout(() => {
          setLines((prev) => [...prev, step.output[outputIndex]])
          setOutputIndex((i) => i + 1)
        }, OUTPUT_DELAY)
        return () => clearTimeout(t)
      } else {
        setPhase('wait')
      }
    }

    if (phase === 'wait') {
      const nextIndex = (seqIndex + 1) % sequence.length
      const t = setTimeout(() => {
        if (nextIndex === 0) {
          setLines([])
        } else {
          setLines((prev) => [...prev, { type: 'blank', content: '' }])
        }
        setSeqIndex(nextIndex)
        setPhase('typing')
      }, BETWEEN_DELAY)
      return () => clearTimeout(t)
    }
  }, [phase, currentTyped, seqIndex, outputIndex])

  return (
    <section id="terminal" className="relative px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Terminal"
          title="Read the source"
          description="An interactive look at who I am — as if you ran the commands yourself."
        />

        <Reveal className="mt-12">
          <div className="overflow-hidden rounded-2xl border border-border glow-border">
            {/* Title bar */}
            <div className="flex items-center gap-3 border-b border-border bg-card/80 px-5 py-3.5">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="flex-1 text-center font-mono text-xs text-muted-foreground">
                hamza@portfolio:~$
              </span>
              <div className="flex items-center gap-1.5">
                <Circle className="h-2.5 w-2.5 fill-secondary text-secondary" />
                <span className="font-mono text-[10px] text-secondary">
                  LIVE
                </span>
              </div>
            </div>

            {/* Terminal body */}
            <div ref={terminalBodyRef} className="h-[400px] overflow-y-auto bg-background/90 p-5 font-mono text-sm leading-relaxed backdrop-blur-sm lg:h-[460px]">
              <AnimatePresence initial={false}>
                {lines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {line.type === 'command' && (
                      <p className="text-foreground">
                        <span className="text-secondary">hamza</span>
                        <span className="text-muted-foreground">@portfolio</span>
                        <span className="text-foreground">:</span>
                        <span className="text-primary">~$</span>
                        <span className="ml-2">{line.content}</span>
                      </p>
                    )}
                    {line.type === 'output' && (
                      <p className={line.color ?? 'text-muted-foreground'}>
                        {line.content}
                      </p>
                    )}
                    {line.type === 'blank' && <p>&nbsp;</p>}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Currently typing line */}
              {phase === 'typing' && (
                <p className="text-foreground">
                  <span className="text-secondary">hamza</span>
                  <span className="text-muted-foreground">@portfolio</span>
                  <span className="text-foreground">:</span>
                  <span className="text-primary">~$</span>
                  <span className="ml-2">{currentTyped}</span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.7, repeat: Infinity }}
                    className="ml-px inline-block h-[1em] w-[2px] translate-y-[2px] bg-secondary"
                  />
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
