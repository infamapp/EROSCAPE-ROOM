'use client'

import { motion, useReducedMotion } from 'framer-motion'

export interface StepHeaderProps {
  actLabel: string
  title: string
}

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

export function StepHeader({ actLabel, title }: StepHeaderProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <header className="mb-8">
      <div className="font-[var(--font-jetbrains)] text-xs tracking-[0.2em] uppercase" style={{ color: '#DC2626' }}>
        PASO {actLabel}
      </div>
      <h2
        className="mt-3 font-[var(--font-playfair)] text-white"
        style={{ fontSize: 'clamp(24px, 3.2vw, 32px)' }}
      >
        {title}
      </h2>
      <motion.div
        className="mt-4 h-[2px] w-40"
        style={{ background: 'var(--color-gold)' }}
        initial={shouldReduceMotion ? false : { opacity: 0, scaleX: 0 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, scaleX: 1 }}
        transition={shouldReduceMotion ? undefined : { duration: 0.6, ease: SENSUAL_EASE }}
      />
    </header>
  )
}

