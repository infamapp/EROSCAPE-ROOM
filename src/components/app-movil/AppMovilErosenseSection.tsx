'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

export function AppMovilErosenseSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="erosense" className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28">
      <div
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-linear-to-br from-[color-mix(in_srgb,var(--color-purple-mid)_55%,var(--color-bg-base))] to-(--color-bg-base) p-8 sm:rounded-[3rem] sm:p-12 md:p-20"
        style={{ background: 'var(--color-bg-base)' }}
      >
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="relative z-10 space-y-6 text-center md:text-left">
            <p className="text-[10px] uppercase tracking-[0.22em] text-(--color-text-muted) [font-family:var(--font-jetbrains)]">
              EROSENSE™
            </p>
            <h2 className="text-4xl font-semibold italic text-(--color-gold-light) [font-family:var(--font-playfair)] sm:text-5xl">
              EROSENSE™
            </h2>
            <p className="font-(--font-inter) text-base leading-relaxed text-(--color-text-secondary) sm:text-lg">
              Tecnología sensorial que armoniza luz, aroma y vibración con lo que vives en sala, en tiempo real, desde la
              app.
            </p>
            <Link
              href="#vistas-app"
              scroll
              className="inline-flex items-center justify-center rounded-full border px-8 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-(--color-gold-light) transition-[background-color,color,border-color] [font-family:var(--font-jetbrains)] hover:bg-[color-mix(in_srgb,var(--color-gold)_14%,transparent)] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-gold) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)"
              style={{ borderColor: 'var(--color-gold)' }}
            >
              Saber más sobre la tecnología
            </Link>
          </div>

          <div className="relative flex h-[260px] items-center justify-center sm:h-[300px]">
            <svg
              className="relative z-1 h-full w-full max-w-[420px] text-[color-mix(in_srgb,var(--color-gold)_35%,transparent)]"
              viewBox="0 0 420 200"
              aria-hidden="true"
            >
              <motion.path
                d="M0 100 Q 52 20, 105 100 T 210 100 T 315 100 T 420 100"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                initial={reduceMotion ? false : { pathLength: 0, opacity: 0.35 }}
                whileInView={reduceMotion ? undefined : { pathLength: 1, opacity: 0.8 }}
                viewport={{ once: true, margin: '-20%' }}
                transition={reduceMotion ? undefined : { duration: 1.2, ease: SENSUAL_EASE }}
              />
              <motion.path
                d="M0 115 Q 52 35, 105 115 T 210 115 T 315 115 T 420 115"
                fill="none"
                stroke="currentColor"
                strokeWidth={1}
                strokeDasharray="5 6"
                initial={reduceMotion ? false : { pathLength: 0, opacity: 0.25 }}
                whileInView={reduceMotion ? undefined : { pathLength: 1, opacity: 0.6 }}
                viewport={{ once: true, margin: '-20%' }}
                transition={reduceMotion ? undefined : { duration: 1.35, ease: SENSUAL_EASE, delay: 0.1 }}
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
