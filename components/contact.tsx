"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Reveal } from "@/components/animations"
import { SectionHeading } from "@/components/section-heading"
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons"
import { Mail, MapPin, Send, Check, ExternalLink, User, MessageSquare, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/hamzanaeem1230",
    icon: GithubIcon,
    handle: "@hamzanaeem1230",
    description: "Labs, scripts & writeups",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hamza-naeem-652b48315",
    icon: LinkedinIcon,
    handle: "in/hamza-naeem-652b48315",
    description: "Professional network",
  },
  {
    label: "Email",
    href: "mailto:hamzanaeem1230@gmail.com",
    icon: Mail,
    handle: "hamzanaeem1230@gmail.com",
    description: "Direct outreach",
  },
]

function IconInput({
  id,
  label,
  icon: Icon,
  type = "text",
  required,
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
}: {
  id: string
  label: string
  icon: React.ElementType
  type?: string
  required?: boolean
  value: string
  onChange: (v: string) => void
  placeholder?: string
  autoComplete?: string
  error?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium text-muted-foreground">
        {label}
        {required && <span className="ml-0.5 text-primary" aria-hidden="true">*</span>}
      </label>
      <div className="relative">
        <Icon
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60"
          aria-hidden="true"
        />
        <input
          id={id}
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "w-full rounded-xl border bg-background/40 py-3 pl-10 pr-4 text-sm outline-none transition-all",
            "placeholder:text-muted-foreground/40",
            "focus:bg-background/60 focus:ring-2 focus:ring-primary/25",
            error
              ? "border-destructive/60 focus:border-destructive/60"
              : "border-border focus:border-primary/50",
          )}
          placeholder={placeholder}
        />
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="flex items-center gap-1.5 text-xs text-destructive">
          <AlertCircle className="h-3 w-3 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

export function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [errors, setErrors] = useState<{ email?: string }>({})

  const validate = () => {
    const newErrors: { email?: string } = {}
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address."
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSent(true)
    setTimeout(() => setSent(false), 4500)
    setForm({ name: "", email: "", message: "" })
    setErrors({})
  }

  const set = (field: keyof typeof form) => (v: string) => {
    setForm((f) => ({ ...f, [field]: v }))
    // Clear email error as user types
    if (field === "email" && errors.email) {
      setErrors((e) => ({ ...e, email: undefined }))
    }
  }

  return (
    <section id="contact" className="relative px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Get in touch"
          title="Let&apos;s build something secure"
          description="Open to internships, junior security roles, and collaboration on interesting projects. I respond promptly."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Contact form */}
          <Reveal className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
              className="rounded-3xl border border-border glass p-7 md:p-9"
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col items-center justify-center gap-4 py-10 text-center"
                    role="status"
                    aria-live="polite"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/15 ring-2 ring-secondary/30">
                      <Check className="h-7 w-7 text-secondary" />
                    </span>
                    <div>
                      <p className="text-lg font-semibold">Message sent!</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Thanks, {form.name || "there"}. I&apos;ll get back to you soon.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <IconInput
                        id="name"
                        label="Name"
                        icon={User}
                        required
                        value={form.name}
                        onChange={set("name")}
                        placeholder="Your name"
                        autoComplete="name"
                      />
                      <IconInput
                        id="email"
                        label="Email"
                        icon={Mail}
                        type="email"
                        required
                        value={form.email}
                        onChange={set("email")}
                        placeholder="you@example.com"
                        autoComplete="email"
                        error={errors.email}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-xs font-medium text-muted-foreground">
                        Message<span className="ml-0.5 text-primary" aria-hidden="true">*</span>
                      </label>
                      <div className="relative">
                        <MessageSquare
                          className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground/60"
                          aria-hidden="true"
                        />
                        <textarea
                          id="message"
                          required
                          rows={5}
                          value={form.message}
                          onChange={(e) => set("message")(e.target.value)}
                          className="w-full resize-none rounded-xl border border-border bg-background/40 py-3 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground/40 focus:border-primary/50 focus:bg-background/60 focus:ring-2 focus:ring-primary/25"
                          placeholder="Tell me about the opportunity..."
                          autoComplete="off"
                        />
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.97 }}
                      whileHover={{ scale: 1.02 }}
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white shadow-[0_0_40px_-10px_var(--glow)] transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                      Send message
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>

          {/* Side contact info */}
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="flex h-full flex-col gap-4">
              {/* Location card */}
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/50 p-5 transition-all hover:border-primary/30">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/25">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <div className="text-sm font-medium">Based in Pakistan</div>
                  <div className="text-xs text-muted-foreground">
                    Remote friendly · Available globally
                  </div>
                </div>
              </div>

              {/* Availability indicator */}
              <div className="flex items-center gap-3 rounded-2xl border border-secondary/25 bg-secondary/5 p-5">
                <span className="relative flex h-3 w-3 shrink-0" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-60" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-secondary" />
                </span>
                <div>
                  <div className="text-sm font-medium">Open to opportunities</div>
                  <div className="text-xs text-muted-foreground">
                    Internships · Junior roles · Collaboration
                  </div>
                </div>
              </div>

              {/* Social links */}
              {socials.map((s) => {
                const external = s.href.startsWith("http")
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center justify-between rounded-2xl border border-border bg-card/50 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/12 text-secondary ring-1 ring-secondary/25 transition-all duration-300 group-hover:scale-110 group-hover:bg-secondary/20">
                        <s.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <div className="text-sm font-medium">{s.label}</div>
                        <div className="text-xs text-muted-foreground">{s.description}</div>
                      </div>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" aria-hidden="true" />
                  </a>
                )
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
