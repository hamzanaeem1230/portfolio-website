'use client'

import { motion, useScroll, useSpring } from 'motion/react'

/**
 * Thin fixed progress bar at the very top of the viewport that tracks
 * page scroll depth. Uses a spring so it feels fluid, not mechanical.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed inset-x-0 top-0 z-[9999] h-[3px] bg-gradient-to-r from-primary via-secondary to-primary"
    />
  )
}
