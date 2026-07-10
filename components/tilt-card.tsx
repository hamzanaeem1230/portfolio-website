'use client'

import { cn } from '@/lib/utils'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import type { ReactNode } from 'react'
import { useRef, useState } from 'react'

export function TiltCard({
  children,
  className,
  glow = true,
}: {
  children: ReactNode
  className?: string
  glow?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), {
    stiffness: 200,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), {
    stiffness: 200,
    damping: 20,
  })

  const glowX = useTransform(mx, (v) => `${v * 100}%`)
  const glowY = useTransform(my, (v) => `${v * 100}%`)

  function handleMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }

  function handleLeave() {
    mx.set(0.5)
    my.set(0.5)
    setHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={cn(
        'group relative rounded-2xl border border-border bg-card/60 transition-shadow duration-300',
        hovered && 'shadow-[0_0_60px_-20px_var(--glow)]',
        className,
      )}
    >
      {glow && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]) =>
                `radial-gradient(340px circle at ${gx} ${gy}, rgba(59,130,246,0.14), transparent 60%)`,
            ),
          }}
        />
      )}
      {children}
    </motion.div>
  )
}
