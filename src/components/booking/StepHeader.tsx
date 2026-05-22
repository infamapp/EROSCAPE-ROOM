'use client'

import { motion, useReducedMotion } from 'framer-motion'

export interface StepHeaderProps {
  actLabel: string
  title: string
  subtitle?: string
}

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

export function StepHeader({ actLabel, title, subtitle }: StepHeaderProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <header className="mb-8">
      <div className="font-(--font-jetbrains) text-xs tracking-[0.2em] uppercase text-(--color-magenta-glow)">
        PASO {actLabel}
      </div>
      <h2
        className="mt-3 font-(--font-playfair) text-white"
        style={{ fontSize: 'clamp(24px, 3.2vw, 32px)' }}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 max-w-2xl font-(--font-inter) text-base leading-relaxed text-(--color-text-secondary)">
          {subtitle}
        </p>
      ) : null}
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

