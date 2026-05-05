'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

export function AppMovilErosenseSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="erosense" className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-linear-to-br from-[color-mix(in_srgb,var(--color-purple-mid)_55%,var(--color-bg-base))] to-[var(--color-bg-base)] p-8 sm:rounded-[3rem] sm:p-12 md:p-20">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="relative z-10 space-y-6 text-center md:text-left">
            <h2 className="font-(--font-cormorant) text-4xl font-semibold italic tracking-[0.12em] text-[var(--color-gold-light)] sm:text-5xl">
              EROSENSE™
            </h2>
            <p className="font-(--font-inter) text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
              Tecnología sensorial que armoniza luz, aroma y vibración con lo que vives en sala, en tiempo real, desde la
              app.
            </p>
            <Link
              href="#vistas-app"
              scroll
              className="inline-flex items-center justify-center rounded-full px-8 py-3 font-(--font-jetbrains) text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-bg-base)] transition-[filter,transform] duration-300 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-magenta)_55%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color-mix(in_srgb,var(--color-purple-mid)_40%,var(--color-bg-base))]"
              style={{ background: 'var(--color-gold-light)' }}
            >
              Saber más sobre la tecnología
            </Link>
          </div>

          <div className="relative flex h-[260px] items-center justify-center sm:h-[300px]">
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <div className="h-px w-full max-w-md bg-linear-to-r from-transparent via-[color-mix(in_srgb,var(--color-magenta)_55%,transparent)] to-transparent opacity-60" />
            </div>
            {!reduceMotion ? (
              <>
                <motion.span
                  className="absolute size-[200px] rounded-full border border-[color-mix(in_srgb,var(--color-magenta)_22%,transparent)]"
                  animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.55, 0.35] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: SENSUAL_EASE }}
                />
                <motion.span
                  className="absolute size-[280px] rounded-full border border-[color-mix(in_srgb,var(--color-magenta)_12%,transparent)]"
                  animate={{ scale: [1, 1.04, 1], opacity: [0.2, 0.35, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: SENSUAL_EASE }}
                />
              </>
            ) : null}
            <svg className="relative z-[1] h-full w-full max-w-[400px] text-[color-mix(in_srgb,var(--color-magenta)_40%,transparent)]" viewBox="0 0 400 200" aria-hidden="true">
              <path
                d="M0 100 Q 50 20, 100 100 T 200 100 T 300 100 T 400 100"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              />
              <path
                d="M0 110 Q 50 30, 100 110 T 200 110 T 300 110 T 400 110"
                fill="none"
                stroke="currentColor"
                strokeDasharray="4 4"
                strokeWidth={1}
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
