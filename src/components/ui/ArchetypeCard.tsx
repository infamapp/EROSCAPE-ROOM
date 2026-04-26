'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'

import { cn } from '@/lib/utils'
import type { Archetype } from '@/types/archetype'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const lgRevealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 280, damping: 22 },
  },
} as const

const descVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.35, ease: SENSUAL_EASE },
  },
  exit: { height: 0, opacity: 0, transition: { duration: 0.25, ease: SENSUAL_EASE } },
} as const

export interface ArchetypeCardProps {
  archetype: Archetype
  size: 'sm' | 'md' | 'lg'
  showDescription?: boolean
  className?: string
  /** Solo `lg`: rótulo superior (checkout). */
  eyebrowLabel?: string
  /** Solo `lg`: nota a pie bajo la descripción. */
  footerNote?: string
  /** Solo `lg`: al terminar la animación de revelación. */
  onRevealAnimationComplete?: () => void
}

export function ArchetypeCard({
  archetype,
  size,
  showDescription = true,
  className,
  eyebrowLabel = 'TU ESENCIA',
  footerNote = 'Así eres cuando te dejas llevar.',
  onRevealAnimationComplete,
}: ArchetypeCardProps) {
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (size !== 'lg' || !shouldReduceMotion || !onRevealAnimationComplete) return
    const id = window.requestAnimationFrame(() => onRevealAnimationComplete())
    return () => window.cancelAnimationFrame(id)
  }, [onRevealAnimationComplete, shouldReduceMotion, size])

  if (size === 'sm') {
    return (
      <span
        className={cn('inline-flex items-center gap-2 rounded-full border px-3 py-1', className)}
        style={{ borderColor: 'rgba(255,255,255,0.12)', background: 'rgba(17,0,17,0.35)' }}
      >
        <span className="text-lg leading-none" aria-hidden="true">
          {archetype.icon}
        </span>
        <span className="font-[var(--font-jetbrains)] text-[10px] tracking-wide text-white/90">{archetype.name}</span>
      </span>
    )
  }

  if (size === 'md') {
    return (
      <div
        className={cn('overflow-hidden rounded-2xl border p-5 text-left', className)}
        style={{
          background: archetype.gradient,
          borderColor: 'rgba(255,255,255,0.12)',
          boxShadow: 'var(--glow-card)',
        }}
      >
        <div className="flex items-start gap-4">
          <span className="text-5xl leading-none" aria-hidden="true">
            {archetype.icon}
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-[var(--font-playfair)] text-2xl text-white">{archetype.name}</p>
            <AnimatePresence initial={false}>
              {showDescription ? (
                <motion.div
                  key="desc"
                  variants={descVariants}
                  initial={shouldReduceMotion ? false : 'hidden'}
                  animate={shouldReduceMotion ? undefined : 'visible'}
                  exit={shouldReduceMotion ? undefined : 'exit'}
                  className="overflow-hidden"
                >
                  <p className="mt-3 font-[var(--font-inter)] text-sm leading-relaxed text-white/90">{archetype.description}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    )
  }

  const handleLgComplete = (def: unknown) => {
    if (def === 'visible' && onRevealAnimationComplete && !shouldReduceMotion) {
      onRevealAnimationComplete()
    }
  }

  return (
    <motion.div
      className={cn('overflow-hidden rounded-2xl border p-6 sm:p-8', className)}
      style={{
        background: archetype.gradient,
        borderColor: 'rgba(255,255,255,0.12)',
        boxShadow: 'var(--glow-card)',
      }}
      variants={lgRevealVariants}
      initial={shouldReduceMotion ? false : 'hidden'}
      animate={shouldReduceMotion ? undefined : 'visible'}
      onAnimationComplete={handleLgComplete}
    >
      <p className="font-[var(--font-jetbrains)] text-[10px] tracking-[0.2em]" style={{ color: 'var(--color-text-muted)' }}>
        {eyebrowLabel}
      </p>
      <p className="mt-2 text-5xl" aria-hidden="true">
        {archetype.icon}
      </p>
      <h2 className="mt-3 font-[var(--font-playfair)] text-[28px] text-white">{archetype.name}</h2>
      {showDescription ? (
        <p className="mt-3 max-w-xl font-[var(--font-inter)] text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
          {archetype.description}
        </p>
      ) : null}
      {footerNote ? (
        <p className="mt-6 font-[var(--font-inter)] text-xs italic" style={{ color: 'rgba(255,255,255,0.65)' }}>
          {footerNote}
        </p>
      ) : null}
    </motion.div>
  )
}
