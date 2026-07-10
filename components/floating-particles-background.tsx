'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  radius: number
  opacity: number
  speedY: number
  speedX: number
  baseOpacity: number
  wobbleOffset: number
  wobbleSpeed: number
}

/**
 * FloatingParticlesBackground - High-performance Canvas-based particle effect
 * Premium floating glass bubble background similar to Apple's WWDC
 * 80-120 particles with smooth 60 FPS animation, zero layout impact
 */
export function FloatingParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationIdRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()

    // Initialize particles
    const particleCount = 30 // 80-120 range, using 100 for balanced visual effect
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1, // 10-30px radius
        opacity: Math.random() * 0.04 + 0.02, // 0.05-0.30
        speedY: -(Math.random() * 0.15 + 0.05), // Negative = upward, 0.3-1.3 px/frame
        speedX: 0, // Will be modulated by sine wave
        baseOpacity: 0,
        wobbleOffset: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.01 + 0.003, // Gentle sine wave speed
      })
    }

    particlesRef.current = particles

    // Animation loop
    let frameCount = 0
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      frameCount++

      // Update and draw particles
      particles.forEach((particle) => {
        // Update position
        particle.y += particle.speedY
        particle.wobbleOffset += particle.wobbleSpeed

        // Gentle side-to-side movement using sine wave
        particle.speedX = Math.sin(particle.wobbleOffset) * 0.5

        particle.x += particle.speedX

        // Respawn if particle leaves viewport (top)
        if (particle.y < -particle.radius * 2) {
          particle.y = canvas.height + particle.radius * 2
          particle.x = Math.random() * canvas.width
        }

        // Wrap around horizontally (optional, for seamless effect)
        if (particle.x < -particle.radius * 2) {
          particle.x = canvas.width + particle.radius * 2
        } else if (particle.x > canvas.width + particle.radius * 2) {
          particle.x = -particle.radius * 2
        }

        // Draw particle as a glass bubble
        // Outer glow
        const glowGradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.radius)
        glowGradient.addColorStop(0, `rgba(34, 211, 238, ${particle.opacity * 0.8})`) // Cyan
        glowGradient.addColorStop(0.5, `rgba(6, 182, 212, ${particle.opacity * 0.4})`) // Darker cyan
        glowGradient.addColorStop(1, `rgba(6, 182, 212, 0)`) // Transparent

        ctx.fillStyle = glowGradient
        ctx.fillRect(particle.x - particle.radius, particle.y - particle.radius, particle.radius * 2, particle.radius * 2)

        // Inner glass effect with slight highlight
        const innerGradient = ctx.createRadialGradient(
          particle.x - particle.radius * 0.3,
          particle.y - particle.radius * 0.3,
          0,
          particle.x,
          particle.y,
          particle.radius * 0.8
        )
        innerGradient.addColorStop(0, `rgba(255, 255, 255, ${particle.opacity * 0.15})`)
        innerGradient.addColorStop(1, `rgba(34, 211, 238, ${particle.opacity * 0.1})`)

        ctx.fillStyle = innerGradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius * 0.7, 0, Math.PI * 2)
        ctx.fill()

        // Subtle blur effect using composite operation
        ctx.globalAlpha = particle.opacity * 0.3
        ctx.fillStyle = 'rgba(6, 182, 212, 0.1)'
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius * 1.2, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      })

      animationIdRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      resizeCanvas()
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ pointerEvents: 'none', width: '100vw', height: '100vh' }}
      aria-hidden="true"
    />
  )
}
