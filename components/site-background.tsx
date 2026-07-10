'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  a: number
}

export function SiteBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)

  // Particle field
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    let raf = 0

    const count = Math.min(80, Math.floor(width / 20))
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.4 + 0.3,
      a: Math.random() * 0.4 + 0.15,
    }))

    function resize() {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(148, 197, 253, ${p.a})`
        ctx.fill()

        // subtle links
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const dist = dx * dx + dy * dy
          if (dist < 14000) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.07 * (1 - dist / 14000)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize)
    if (!prefersReduced) {
      draw()
    } else {
      draw()
      cancelAnimationFrame(raf)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // Mouse spotlight
  useEffect(() => {
    const el = spotlightRef.current
    if (!el) return
    function move(e: MouseEvent) {
      if (!el) return
      el.style.background = `radial-gradient(700px circle at ${e.clientX}px ${e.clientY}px, rgba(59,130,246,0.08), transparent 65%)`
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base */}
      <div className="absolute inset-0 bg-background" />

      {/* primary aurora */}
      <div className="absolute -top-1/4 left-1/2 h-[75vh] w-[75vh] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px] animate-aurora" />
      {/* secondary aurora */}
      <div className="absolute top-1/3 -right-32 h-[60vh] w-[60vh] rounded-full bg-secondary/15 blur-[130px] animate-aurora-slow" />
      {/* tertiary deep accent */}
      <div className="absolute -bottom-40 -left-24 h-[60vh] w-[60vh] rounded-full bg-primary/12 blur-[140px] animate-aurora" />
      {/* subtle center glow */}
      <div
        className="absolute left-1/2 top-1/2 h-[30vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/8 blur-[100px] animate-aurora-slow"
        style={{ animationDelay: '-7s' }}
      />

      {/* moving grid */}
      <div
        className="absolute inset-0 animate-grid opacity-[0.3]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.07) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage:
            'radial-gradient(ellipse 85% 65% at 50% 40%, black 40%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 85% 65% at 50% 40%, black 40%, transparent 100%)',
        }}
      />

      {/* particles */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-60" />

      {/* mouse spotlight */}
      <div ref={spotlightRef} className="absolute inset-0 transition-all duration-300" />

      {/* vignette bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      {/* vignette sides */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(5,7,10,0.4)_100%)]" />
    </div>
  )
}
