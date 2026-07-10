'use client'

import dynamic from 'next/dynamic'

const FloatingParticles = dynamic(() => import('@/components/FloatingParticles').then(mod => ({ default: mod.FloatingParticles })), { ssr: false })

export function ClientParticles() {
  return <FloatingParticles />
}
