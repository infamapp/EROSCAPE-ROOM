'use client'

import { motion, useReducedMotion } from 'framer-motion'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const heroVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: SENSUAL_EASE } },
} as const

export function ElClubHero() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden border-b border-[rgba(185,48,158,0.18)]"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(185,48,158,0.35), transparent 55%), linear-gradient(180deg, rgba(17,0,17,0.98) 0%, var(--color-bg-base) 100%)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: 'var(--texture-parchment-noise)' }}
        aria-hidden="true"
      />
      <motion.div
        className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-24"
        variants={heroVariants}
        initial={shouldReduceMotion ? false : 'hidden'}
        animate={shouldReduceMotion ? undefined : 'visible'}
      >
        <p className="font-[var(--font-jetbrains)] text-[10px] tracking-[0.35em]" style={{ color: 'var(--color-text-muted)' }}>
          PROTOCOLO CERRADO
        </p>
        <h1 className="mt-4 font-[var(--font-playfair)] text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight text-white">
          ACCEDE AL LADO OSCURO DE EROSCAPE
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-[var(--font-inter)] text-base sm:text-lg" style={{ color: 'var(--color-text-secondary)' }}>
          Membresías exclusivas para operativos recurrentes.
        </p>
      </motion.div>
    </section>
  )
}
