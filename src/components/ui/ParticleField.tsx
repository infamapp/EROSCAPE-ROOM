'use client'

import { memo, useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'

export interface ParticleFieldProps {
  count?: number
  className?: string
}

interface Particle {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  opacity: number
  opacityBase: number
  opacityAmp: number
  twinkleSpeed: number
  color: string
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function getCssVar(name: string, fallback: string): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return v.length > 0 ? v : fallback
}

/** Campo de partículas canvas: solo fondo, `pointer-events: none`, límites 80/30 partículas. */
export const ParticleField = memo(function ParticleField({ count = 60, className }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.innerWidth < 768
    const maxCount = isMobile ? 30 : 80
    const particleCount = clamp(Math.round(count), 0, maxCount)

    const magenta = getCssVar('--color-magenta', '#B9309E')
    const purple = getCssVar('--color-purple', '#9F349B')
    const gold = getCssVar('--color-gold', '#CB7B1B')
    const palette = [magenta, purple, gold] as const

    const resize = () => {
      const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1))
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // Run on the next frame so layout is finalized (avoids tiny top-left canvas on mount).
    const raf0 = requestAnimationFrame(() => resize())
    window.addEventListener('resize', resize)

    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            resize()
          })
        : null

    ro?.observe(canvas)

    const initParticles = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const arr: Particle[] = []
      for (let i = 0; i < particleCount; i++) {
        const opacityBase = 0.15 + Math.random() * 0.2
        const opacityAmp = 0.1 + Math.random() * 0.2
        arr.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: 1 + Math.random() * 3,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          opacity: 0.2,
          opacityBase,
          opacityAmp,
          twinkleSpeed: 0.8 + Math.random() * 1.8,
          color: palette[Math.floor(Math.random() * palette.length)] ?? magenta,
        })
      }
      particlesRef.current = arr
    }

    initParticles()

    const draw = (t: number) => {
      const { width, height } = canvas.getBoundingClientRect()

      ctx.clearRect(0, 0, width, height)

      for (const p of particlesRef.current) {
        p.x += p.vx
        p.y += p.vy

        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10

        p.opacity = clamp(p.opacityBase + Math.sin(t * 0.001 * p.twinkleSpeed) * p.opacityAmp, 0.15, 0.5)

        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      cancelAnimationFrame(raf0)
      window.removeEventListener('resize', resize)
      ro?.disconnect()
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      className={cn('pointer-events-none absolute inset-0 h-full w-full z-1', className)}
      aria-hidden="true"
    />
  )
})
