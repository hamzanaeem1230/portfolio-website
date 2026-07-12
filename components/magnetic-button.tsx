'use client'

import { cn } from '@/lib/utils'
import { motion, useMotionValue, useSpring } from 'motion/react'
import type { ReactNode } from 'react'
import { useRef } from 'react'

type MagneticButtonProps = {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  disabled?: boolean
  className?: string
  ariaLabel?: string
  download?: boolean | string
}

export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  disabled = false,
  className,
  ariaLabel,
  download,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 })

  function handleMove(e: React.MouseEvent) {
    if (disabled || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    if (!rect) return
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * 0.35)
    y.set(relY * 0.35)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  const base =
    'relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'

  const variants: Record<string, string> = {
    primary:
      'bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_40px_-10px_var(--glow)] hover:shadow-[0_0_50px_-8px_rgba(59,130,246,0.6)]',
    secondary:
      'glass border border-border text-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5',
    ghost:
      'border border-border/60 text-muted-foreground hover:border-primary/30 hover:text-foreground',
  }

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      whileTap={disabled ? undefined : { scale: 0.96 }}
      className={cn(base, variants[variant], className)}
    >
      {children}
    </motion.div>
  )

  if (disabled) {
    return (
      <span aria-disabled="true" aria-label={ariaLabel}>
        {content}
      </span>
    )
  }

  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(download ? { download: typeof download === 'string' ? download : true } : {})}
      >
        {content}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel}>
      {content}
    </button>
  )
}
