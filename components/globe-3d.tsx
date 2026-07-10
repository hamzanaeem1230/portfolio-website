'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Generate random points on a sphere surface
function generateSpherePoints(count: number, radius: number) {
  const points = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const x = radius * Math.sin(phi) * Math.cos(theta)
    const y = radius * Math.sin(phi) * Math.sin(theta)
    const z = radius * Math.cos(phi)
    points[i * 3] = x
    points[i * 3 + 1] = y
    points[i * 3 + 2] = z
  }
  return points
}

// Continent-like land masses as clusters of points
function generateLandPoints(count: number, radius: number) {
  const points: number[] = []
  const landAreas = [
    // North America
    { latMin: 25, latMax: 70, lonMin: -130, lonMax: -60, density: 0.8 },
    // South America
    { latMin: -55, latMax: 12, lonMin: -80, lonMax: -35, density: 0.7 },
    // Europe
    { latMin: 35, latMax: 70, lonMin: -10, lonMax: 40, density: 0.9 },
    // Africa
    { latMin: -35, latMax: 37, lonMin: -20, lonMax: 52, density: 0.8 },
    // Asia
    { latMin: 10, latMax: 72, lonMin: 40, lonMax: 150, density: 1.0 },
    // Australia
    { latMin: -45, latMax: -10, lonMin: 110, lonMax: 155, density: 0.5 },
  ]

  for (let i = 0; i < count; i++) {
    const area = landAreas[Math.floor(Math.random() * landAreas.length)]
    if (Math.random() > area.density) continue

    const lat =
      (area.latMin + Math.random() * (area.latMax - area.latMin)) *
      (Math.PI / 180)
    const lon =
      (area.lonMin + Math.random() * (area.lonMax - area.lonMin)) *
      (Math.PI / 180)

    const jitter = (Math.random() - 0.5) * 0.08
    const x = radius * Math.cos(lat) * Math.cos(lon) + jitter
    const y = radius * Math.sin(lat) + jitter
    const z = radius * Math.cos(lat) * Math.sin(lon) + jitter
    points.push(x, y, z)
  }
  return new Float32Array(points)
}

function Stars() {
  const positions = useMemo(() => generateSpherePoints(2000, 8), [])

  return (
    <Points positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#93c5fd"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

function GlobePoints() {
  const ref = useRef<THREE.Points>(null)
  const landRef = useRef<THREE.Points>(null)

  const spherePositions = useMemo(() => generateSpherePoints(1800, 1.5), [])
  const landPositions = useMemo(() => generateLandPoints(3000, 1.52), [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.08
    }
    if (landRef.current) {
      landRef.current.rotation.y = state.clock.elapsedTime * 0.08
    }
  })

  return (
    <>
      {/* Base globe */}
      <Points ref={ref} positions={spherePositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#1d4ed8"
          size={0.008}
          sizeAttenuation
          depthWrite={false}
          opacity={0.4}
        />
      </Points>

      {/* Land masses */}
      <Points ref={landRef} positions={landPositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#60a5fa"
          size={0.012}
          sizeAttenuation
          depthWrite={false}
          opacity={0.85}
        />
      </Points>
    </>
  )
}

function NetworkLines() {
  const ref = useRef<THREE.Group>(null)

  const connections = useMemo(() => {
    const lines: Array<{ start: THREE.Vector3; end: THREE.Vector3 }> = []
    const radius = 1.54
    const hotspots = [
      new THREE.Vector3(0.8, 0.9, 0.6),
      new THREE.Vector3(-0.9, 0.5, 0.8),
      new THREE.Vector3(0.3, -0.7, 1.2),
      new THREE.Vector3(-0.6, -0.3, -1.1),
      new THREE.Vector3(1.1, 0.2, -0.7),
      new THREE.Vector3(-0.4, 1.1, -0.6),
      new THREE.Vector3(0.7, -0.9, -0.8),
      new THREE.Vector3(-1.0, -0.8, 0.4),
    ].map((v) => v.normalize().multiplyScalar(radius))

    for (let i = 0; i < hotspots.length; i++) {
      for (let j = i + 1; j < hotspots.length; j++) {
        if (Math.random() > 0.4) continue
        lines.push({ start: hotspots[i], end: hotspots[j] })
      }
    }
    return lines
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.08
    }
  })

  return (
    <group ref={ref}>
      {connections.map((conn, i) => {
        const points = [conn.start, conn.end]
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        return (
          <line key={i} geometry={geometry}>
            <lineBasicMaterial color="#06b6d4" transparent opacity={0.25} />
          </line>
        )
      })}
    </group>
  )
}

function GlowSphere() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.04 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02
    }
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.58, 32, 32]} />
      <meshBasicMaterial
        color="#3b82f6"
        transparent
        opacity={0.05}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

function MouseInteraction() {
  const { camera } = useThree()

  useFrame((state) => {
    const { mouse } = state
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.3, 0.02)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 0.2, 0.02)
    camera.lookAt(0, 0, 0)
  })

  return null
}

export function Globe3D() {
  return (
    <div className="relative h-full w-full" aria-hidden="true">
      {/* Outer glow ring */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[420px] w-[420px] rounded-full bg-primary/8 blur-[60px]" />
      </div>
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Stars />
          <GlobePoints />
          <NetworkLines />
          <GlowSphere />
          <MouseInteraction />
          <ambientLight intensity={0.4} color="#60a5fa" />
          <pointLight position={[5, 5, 5]} intensity={0.8} color="#06b6d4" />
          <pointLight position={[-5, -3, -5]} intensity={0.4} color="#3b82f6" />
        </Suspense>
      </Canvas>
    </div>
  )
}
