'use client'

import { usePathname } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { useMemo } from 'react'

import { cn } from '@/lib/utils'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

function getTensionGradient(tension: number): string {
  if (tension <= 33) return 'linear-gradient(90deg, hsl(260, 80%, 50%), hsl(260, 80%, 50%))'
  if (tension <= 66) return 'linear-gradient(90deg, hsl(35, 90%, 55%), hsl(35, 90%, 55%))'
  return 'linear-gradient(90deg, var(--color-magenta), var(--color-magenta))'
}

export interface MissionProgressProps {
  tension: number
}

export function MissionProgress({ tension }: MissionProgressProps) {
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion()
  const clamped = Math.max(0, Math.min(100, tension))
  const gradient = useMemo(() => getTensionGradient(clamped), [clamped])

  if (pathname !== '/reservar') return null

  return (
    <div className="fixed left-0 right-0 top-0 z-100">
      <div className="relative h-1 w-full bg-black/40">
        <motion.div
          className={cn('h-1')}
          style={{ background: gradient }}
          initial={shouldReduceMotion ? false : { width: 0 }}
          animate={shouldReduceMotion ? undefined : { width: `${clamped}%` }}
          transition={shouldReduceMotion ? undefined : { duration: 0.6, ease: SENSUAL_EASE }}
        />

        <div className="pointer-events-none absolute inset-y-0 hidden w-full items-center md:flex" aria-hidden="true">
          <div
            className="absolute top-1/2 -translate-y-1/2 font-(--font-jetbrains) text-[8px] tracking-[0.18em] text-(--color-text-muted)"
            style={{ left: `min(calc(${clamped}% - 74px), calc(100% - 74px))` }}
          >
            TEMPERATURA
          </div>
        </div>
      </div>

      {clamped >= 100 ? (
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 h-1"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={shouldReduceMotion ? undefined : { opacity: [0, 1, 0] }}
          transition={shouldReduceMotion ? undefined : { duration: 0.8, ease: SENSUAL_EASE }}
          style={{ boxShadow: 'var(--glow-intense)' }}
          aria-hidden="true"
        />
      ) : null}
    </div>
  )
}

