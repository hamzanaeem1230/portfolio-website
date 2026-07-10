import { Reveal } from '@/components/animations'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: {
  eyebrow: string
  title: ReactNode
  description?: string
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <Reveal
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-border glass px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-secondary">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </Reveal>
  )
}
