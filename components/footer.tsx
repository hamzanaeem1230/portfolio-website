import { ShieldCheck, Mail, Heart, ArrowUp } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons"

const socialLinks = [
  {
    href: "https://github.com/hamzanaeem1230",
    icon: GithubIcon,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/hamza-naeem-652b48315",
    icon: LinkedinIcon,
    label: "LinkedIn",
  },
  {
    href: "mailto:hamzanaeem1230@gmail.com",
    icon: Mail,
    label: "Email",
  },
]

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Terminal", href: "#terminal" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
]

export function Footer() {
  return (
    <footer className="relative border-t border-border px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
          {/* Brand */}
          <div className="max-w-xs">
            <a href="#home" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30 shadow-[0_0_20px_-6px_rgba(59,130,246,0.5)]">
                <ShieldCheck className="h-4.5 w-4.5" />
              </span>
              <span className="text-sm font-semibold tracking-tight">Hamza Naeem</span>
            </a>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Cybersecurity student, Blue Team enthusiast, and AI Security explorer — building
              skills one lab at a time.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Navigation
            </p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Connect
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground hover:shadow-[0_0_20px_-8px_rgba(59,130,246,0.5)]"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Hamza Naeem. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            Built with
            <Heart className="h-3 w-3 fill-primary text-primary" aria-hidden="true" />
            using Next.js &bull; Tailwind CSS &bull; Framer Motion
          </p>
          <a
            href="#home"
            aria-label="Back to top"
            className="group flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
