'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'

import { CHECKOUT_WELCOME_COPY } from '@/lib/booking-checkout-copy'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const OVERLAY_DURATION_MS = 2600

export interface CheckoutWelcomeOverlayProps {
  onComplete: () => void
}

export function CheckoutWelcomeOverlay({ onComplete }: CheckoutWelcomeOverlayProps) {
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) {
      onComplete()
      return undefined
    }
    const t = window.setTimeout(onComplete, OVERLAY_DURATION_MS)
    return () => window.clearTimeout(t)
  }, [shouldReduceMotion, onComplete])

  if (shouldReduceMotion) return null

  return (
    <motion.div
      className="fixed inset-0 z-200 flex flex-col items-center justify-center px-6"
      style={{ background: 'var(--color-bg-base)' }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.85, duration: 0.55, ease: SENSUAL_EASE }}
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 42%, color-mix(in srgb, var(--color-magenta) 22%, transparent), transparent 70%)',
        }}
      />

      <motion.div
        className="relative flex max-w-md flex-col items-center text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: SENSUAL_EASE }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, ease: SENSUAL_EASE }}
          className="relative"
        >
          <div
            className="absolute inset-0 -m-6 rounded-full blur-2xl"
            style={{ background: 'color-mix(in srgb, var(--color-magenta) 28%, transparent)' }}
            aria-hidden="true"
          />
          <Image
            src="/eros-logo-ico.png"
            alt=""
            width={96}
            height={96}
            priority
            className="relative h-20 w-20 select-none sm:h-24 sm:w-24"
            aria-hidden="true"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4, ease: SENSUAL_EASE }}
          className="mt-6 font-(--font-jetbrains) text-[10px] uppercase tracking-[0.28em] text-(--color-magenta-glow)"
        >
          {CHECKOUT_WELCOME_COPY.eyebrow}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.45, ease: SENSUAL_EASE }}
          className="mt-3 font-(--font-playfair) text-2xl tracking-[0.06em] text-white sm:text-3xl"
          style={{ textShadow: 'var(--glow-magenta)' }}
        >
          {CHECKOUT_WELCOME_COPY.legend}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72, duration: 0.4, ease: SENSUAL_EASE }}
          className="mt-3 max-w-sm font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary) sm:text-base"
        >
          {CHECKOUT_WELCOME_COPY.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.35, ease: SENSUAL_EASE }}
          className="mt-6 font-(--font-jetbrains) text-[9px] uppercase tracking-[0.2em] text-(--color-text-muted)"
        >
          {CHECKOUT_WELCOME_COPY.footnote}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
