'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: SENSUAL_EASE } },
} as const

export interface ElClubMembershipActionsProps {
  onNotifyLaunch: () => void
  onDemoBadge: () => void
  demoHint: string | null
}

export function ElClubMembershipActions({ onNotifyLaunch, onDemoBadge, demoHint }: ElClubMembershipActionsProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.section
      className="mt-16 rounded-2xl border border-[rgba(185,48,158,0.15)] p-6 sm:p-8"
      style={{ background: 'var(--color-bg-subtle)' }}
      variants={sectionVariants}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={{ once: true, margin: '-40px' }}
    >
      <h2 className="font-[var(--font-playfair)] text-xl text-white">Suscripción con Stripe</h2>
      <p className="mt-2 max-w-2xl font-[var(--font-inter)] text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        El cobro recurrente se activará en una fase posterior. Mientras tanto puedes explorar el panel con la insignia de miembro en modo
        demostración.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          className="rounded-full px-6 py-2.5 font-[var(--font-jetbrains)] text-xs tracking-wide text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-magenta)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-base)]"
          style={{ background: 'var(--gradient-hero)' }}
          onClick={onNotifyLaunch}
        >
          AVISARME CUANDO ABRA
        </button>
        <button
          type="button"
          className="rounded-full border border-[rgba(185,48,158,0.35)] px-6 py-2.5 font-[var(--font-jetbrains)] text-xs tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-magenta)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-base)]"
          style={{ color: 'var(--color-text-secondary)' }}
          onClick={onDemoBadge}
        >
          UNIRME (DEMO EN ESTE DISPOSITIVO)
        </button>
        <Link
          href="/mi-reserva/club-member-demo"
          className="inline-flex items-center justify-center rounded-full border border-[rgba(185,48,158,0.25)] px-6 py-2.5 font-[var(--font-jetbrains)] text-xs tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-magenta)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-base)]"
          style={{ color: 'var(--color-text-muted)' }}
        >
          DEMO: ENTRAR A MI ESPACIO
        </Link>
      </div>
      {demoHint ? (
        <p className="mt-4 font-[var(--font-inter)] text-sm" style={{ color: 'var(--color-gm-terminal)' }}>
          {demoHint}
        </p>
      ) : null}
    </motion.section>
  )
}
