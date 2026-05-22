'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'

import { STEP2_GATE_COPY } from '@/lib/booking-intensity-copy'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

export interface Step2NivelProhibidoGateProps {
  onComplete: () => void
}

export function Step2NivelProhibidoGate({ onComplete }: Step2NivelProhibidoGateProps) {
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const delay = shouldReduceMotion ? 800 : 2800
    const t = window.setTimeout(onComplete, delay)
    return () => window.clearTimeout(t)
  }, [onComplete, shouldReduceMotion])

  return (
    <button
      type="button"
      className="flex h-full min-h-[50vh] w-full flex-col items-center justify-center px-6 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta)"
      onClick={onComplete}
      aria-label="Continuar a elegir intensidad"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.92 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
        transition={shouldReduceMotion ? undefined : { duration: 0.7, ease: SENSUAL_EASE }}
        className="flex flex-col items-center"
      >
        <Image
          src="/eros-logo-ico.png"
          alt=""
          width={88}
          height={88}
          priority
          className="h-20 w-20 select-none"
          aria-hidden="true"
        />
        <p className="mt-6 font-(--font-jetbrains) text-[10px] uppercase tracking-[0.28em] text-(--color-magenta-glow)">
          {STEP2_GATE_COPY.eyebrow}
        </p>
        <h2
          className="mt-3 font-(--font-playfair) text-3xl tracking-[0.14em] text-white sm:text-4xl"
          style={{ textShadow: 'var(--glow-magenta)' }}
        >
          {STEP2_GATE_COPY.title}
        </h2>
        <p className="mt-4 max-w-md font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary) sm:text-base">
          {STEP2_GATE_COPY.subtitle}
        </p>
        <p className="mt-6 font-(--font-jetbrains) text-[9px] uppercase tracking-[0.18em] text-(--color-text-muted)">
          {STEP2_GATE_COPY.footnote}
        </p>
      </motion.div>
    </button>
  )
}
