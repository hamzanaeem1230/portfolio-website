'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { PROFILE_IMAGE, SITE_CONFIG } from '@/lib/config'

interface ProfileImageProps {
  /** Controls visual size preset */
  size?: 'sm' | 'md' | 'lg'
  /** Additional class names for the outer wrapper */
  className?: string
  /** Disable the hover scale animation (e.g. for nav avatar) */
  disableHover?: boolean
}

const sizeMap = {
  sm: { outer: 'h-9 w-9', inner: 36 },
  md: { outer: 'h-20 w-20', inner: 80 },
  lg: { outer: 'h-64 w-64 sm:h-72 sm:w-72', inner: 288 },
}

/**
 * Reusable profile image component.
 *
 * To swap the photo site-wide: replace /public/profile.jpg with a new file
 * (same filename), or update PROFILE_IMAGE in /lib/config.ts.
 */
export function ProfileImage({
  size = 'lg',
  className,
  disableHover = false,
}: ProfileImageProps) {
  const { outer, inner } = sizeMap[size]

  const content = (
    <div
      className={cn(
        'relative overflow-hidden',
        // Glassmorphism ring + ambient glow
        'rounded-full ring-2 ring-primary/30 shadow-[0_0_60px_-12px_rgba(59,130,246,0.45)]',
        outer,
        className,
      )}
    >
      {/* Soft blue ambient overlay — purely cosmetic, preserves the photo */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(59,130,246,0.10) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <Image
        src={PROFILE_IMAGE}
        alt={`${SITE_CONFIG.name} — profile photo`}
        fill
        sizes={`${inner}px`}
        className="object-cover object-top"
        priority={size === 'lg'}
        draggable={false}
      />
    </div>
  )

  if (disableHover) return content

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 340, damping: 22 }}
      className="inline-block"
    >
      {content}
    </motion.div>
  )
}
