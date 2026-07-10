'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Send, Sparkles, ChevronDown } from 'lucide-react'
import { ProfileImage } from '@/components/profile-image'
import { SITE_CONFIG } from '@/lib/config'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

// Portfolio knowledge base — dynamically generated from config
function getKnowledgeBase(): Record<string, string> {
  return {
    default: `Hello! I'm ${SITE_CONFIG.name}'s AI portfolio assistant. Ask me anything about his background, skills, projects, or career goals.`,
    who: `${SITE_CONFIG.name} is a ${SITE_CONFIG.degree} student at ${SITE_CONFIG.university} based in ${SITE_CONFIG.location}. ${SITE_CONFIG.longBio}`,
    career: `${SITE_CONFIG.name}'s career goal is to ${SITE_CONFIG.careerGoal}. He is continuously building skills through hands-on labs, practical projects, and security research.`,
    skills: `${SITE_CONFIG.name}'s core skills include: Networking, Linux, Windows, Cisco Networking & Packet Tracer, Python, SQL, Wireshark, Nmap, Burp Suite, Blue Team operations, Threat Detection, and AI Security (prompt injection, LLM safety).`,
    projects:
      "Key projects include: Enterprise Network Design in Cisco Packet Tracer, VLAN Segmentation & Security, Python Security Automation Scripts, SQL Foundations for Detection Engineering, AI Advertisement Generation, and this portfolio website itself.",
    certifications:
      "Certifications: Cisco Introduction to Cybersecurity (Completed) · TryHackMe Learning Path (In Progress) · CCNA via NetworkChuck (In Progress).",
    learning:
      "Currently learning: SOC Operations, Threat Hunting, Detection Engineering, AI Security, Prompt Injection defense, LLM Security, and Cloud Security fundamentals.",
    contact: `You can reach ${SITE_CONFIG.name} at ${SITE_CONFIG.email}, on GitHub, or LinkedIn. He is open to internships, junior security roles, and collaboration.`,
    resume: `${SITE_CONFIG.name}'s resume is available for download. For more details about his background, feel free to reach out directly at ${SITE_CONFIG.email}.`,
    tryhackme: `${SITE_CONFIG.name} actively practices on TryHackMe, focusing on the Blue Team and SOC learning paths to build hands-on defensive security skills.`,
    github: `${SITE_CONFIG.name}'s GitHub includes networking labs, Python security scripts, SQL exercises, and TryHackMe notes. He builds in public as part of continuous learning.`,
    ai: "AI Security is a major interest. Studying prompt injection, LLM safety, adversarial inputs, and how AI systems can be secured in production environments.",
    blue: "Focus on Blue Team operations — defensive security, log analysis, SIEM, incident response, and threat detection. Goal is to work in a SOC environment.",
  }
}

function getResponse(input: string): string {
  const KB = getKnowledgeBase()
  const q = input.toLowerCase()
  if (q.includes('who') || q.includes(SITE_CONFIG.name.toLowerCase()) || q.includes('about')) return KB.who
  if (q.includes('career') || q.includes('goal') || q.includes('future') || q.includes('aspir')) return KB.career
  if (q.includes('skill') || q.includes('tool') || q.includes('technology') || q.includes('tech')) return KB.skills
  if (q.includes('project') || q.includes('built') || q.includes('work')) return KB.projects
  if (q.includes('cert') || q.includes('cisco') || q.includes('tryhackme') && q.includes('cert')) return KB.certifications
  if (q.includes('learn') || q.includes('study') || q.includes('current') || q.includes('focus')) return KB.learning
  if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire') || q.includes('intern')) return KB.contact
  if (q.includes('resume') || q.includes('cv')) return KB.resume
  if (q.includes('tryhackme') || q.includes('thm')) return KB.tryhackme
  if (q.includes('github') || q.includes('repo') || q.includes('open source') || q.includes('code')) return KB.github
  if (q.includes('ai') || q.includes('llm') || q.includes('prompt') || q.includes('artificial')) return KB.ai
  if (q.includes('blue') || q.includes('soc') || q.includes('defend') || q.includes('defensive')) return KB.blue
  return KB.default
}

const SUGGESTIONS = [
  'Who is Hamza?',
  'Career goals',
  'Skills',
  'Projects',
  'Certifications',
  'Learning roadmap',
  'Contact',
  'Resume',
]

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-secondary"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </div>
  )
}

export function AIAssistant() {
  const [open, setOpen] = useState(false)
  const KB = getKnowledgeBase()
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: KB.default },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll ONLY the chat message container — never the page
  useEffect(() => {
    const container = messagesContainerRef.current
    if (!container || !open) return
    container.scrollTop = container.scrollHeight
  }, [open, messages])

  function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    setMessages((m) => [...m, { role: 'user', content: trimmed }])
    setInput('')
    setIsTyping(true)
    setTimeout(
      () => {
        setIsTyping(false)
        setMessages((m) => [
          ...m,
          { role: 'assistant', content: getResponse(trimmed) },
        ])
      },
      600 + Math.random() * 400,
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    send(input)
  }

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-[0_0_40px_-8px_rgba(59,130,246,0.8)] ring-1 ring-primary/40 transition-all"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-5 w-5 text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sparkles className="h-5 w-5 text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 flex w-[340px] flex-col overflow-hidden rounded-2xl border border-border shadow-[0_24px_80px_-16px_rgba(0,0,0,0.8)] sm:w-[380px]"
            style={{
              background:
                'color-mix(in oklab, var(--card) 80%, transparent)',
              backdropFilter: 'blur(24px)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <ProfileImage size="sm" disableHover />
                <div>
                  <p className="text-sm font-semibold">Portfolio AI</p>
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                    <p className="text-[10px] text-muted-foreground">
                      Ask me anything
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[320px]">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'rounded-br-sm bg-primary text-white'
                        : 'rounded-bl-sm bg-muted/60 text-foreground/90'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-sm bg-muted/60">
                    <TypingIndicator />
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            <div className="overflow-x-auto border-t border-border/50 px-3 py-2">
              <div className="flex gap-2 pb-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="shrink-0 rounded-full border border-border/60 bg-muted/30 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Hamza..."
                className="flex-1 rounded-full border border-border bg-background/40 px-4 py-2 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-primary/50"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                    e.preventDefault()
                    send(input)
                  }
                }}
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary/90 disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
