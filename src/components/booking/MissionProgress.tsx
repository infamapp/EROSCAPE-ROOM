'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useMemo } from 'react'

import { useBookingFlow } from '@/hooks/useBookingFlow'
import { cn } from '@/lib/utils'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

function getTensionGradient(tension: number): string {
  if (tension <= 33) return 'linear-gradient(90deg, var(--color-intensity-alpha), var(--color-intensity-alpha))'
  if (tension <= 66) return 'linear-gradient(90deg, var(--color-intensity-beta), var(--color-intensity-beta))'
  return 'linear-gradient(90deg, var(--color-magenta), var(--color-magenta))'
}

export function MissionProgress() {
  const shouldReduceMotion = useReducedMotion()
  const { narrativeTension } = useBookingFlow()

  const gradient = useMemo(() => getTensionGradient(narrativeTension), [narrativeTension])

  return (
    <div className="fixed left-0 right-0 top-0 z-100">
      <div className="relative h-1 w-full bg-black/40">
        <motion.div
          className={cn('h-1')}
          style={{ background: gradient }}
          initial={shouldReduceMotion ? false : { width: 0 }}
          animate={shouldReduceMotion ? undefined : { width: `${narrativeTension}%` }}
          transition={shouldReduceMotion ? undefined : { duration: 0.6, ease: SENSUAL_EASE }}
        />
      </div>

      <div className="pointer-events-none hidden justify-end px-3 pt-1 md:flex">
        <motion.div
          className="font-(--font-jetbrains) text-[10px] tracking-[0.18em]"
          style={{ color: 'var(--color-text-muted)' }}
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.3, ease: SENSUAL_EASE }}
        >
          TEMPERATURA: {narrativeTension}°
        </motion.div>
      </div>

      {narrativeTension >= 100 ? (
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

