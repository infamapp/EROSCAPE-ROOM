'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { AppMovilPhoneMockup } from '@/components/sections/AppMovilPhoneMockup'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const heroTextVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: SENSUAL_EASE } },
} as const

export function AppMovilHero() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden border-b border-[rgba(185,48,158,0.15)]"
      style={{
        background:
          'radial-gradient(ellipse 70% 50% at 70% 0%, color-mix(in srgb, var(--color-magenta) 28%, transparent), transparent 55%), var(--color-bg-base)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: 'var(--texture-parchment-noise)' }}
        aria-hidden="true"
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 py-16 sm:px-6 md:flex-row md:justify-between md:py-20">
        <motion.div
          className="max-w-xl text-center md:text-left"
          variants={heroTextVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          animate={shouldReduceMotion ? undefined : 'visible'}
        >
          <p className="font-[var(--font-jetbrains)] text-[10px] tracking-[0.3em]" style={{ color: 'var(--color-text-muted)' }}>
            APP MÓVIL
          </p>
          <h1 className="mt-4 font-[var(--font-playfair)] text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight text-white">
            EL JUEGO CONTINÚA EN TU MANO
          </h1>
          <p className="mt-5 font-[var(--font-inter)] text-sm sm:text-base" style={{ color: 'var(--color-text-secondary)' }}>
            Tu sala en tu pantalla: mecánicas en tiempo real, pistas y sorpresas digitales. Tu seguridad, siempre primero.
          </p>
        </motion.div>
        <AppMovilPhoneMockup />
      </div>
    </section>
  )
}
