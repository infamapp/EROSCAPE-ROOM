'use client'

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

import { ParticleField } from '@/components/ui/ParticleField'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const heroVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: SENSUAL_EASE },
  },
}

export function LaSociedadHero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative flex min-h-[min(100dvh,920px)] flex-col items-center justify-center overflow-hidden px-4 pb-24 pt-28 text-center sm:px-6 sm:pt-32">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle at 50% 42%, color-mix(in srgb, var(--color-magenta) 22%, transparent) 0%, color-mix(in srgb, var(--color-bg-base) 88%, transparent) 52%, transparent 100%)',
        }}
      />
      <ParticleField count={40} />
      <div
        className="pointer-events-none absolute inset-0 z-2 bg-linear-to-b from-[color-mix(in_srgb,var(--surface-experience)_92%,transparent)] via-transparent to-(--surface-experience)"
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center"
        variants={reduceMotion ? undefined : heroVariants}
        initial={reduceMotion ? false : 'hidden'}
        animate={reduceMotion ? undefined : 'visible'}
      >
        <div
          className="relative mb-8 rounded-full border border-[color-mix(in_srgb,var(--color-magenta)_35%,transparent)] bg-[color-mix(in_srgb,var(--surface-experience)_75%,transparent)] p-6 backdrop-blur-sm"
          style={{
            boxShadow:
              '0 0 28px color-mix(in srgb, var(--color-magenta-glow) 28%, transparent), inset 0 0 12px color-mix(in srgb, var(--color-magenta) 12%, transparent)',
          }}
        >
          <Image src="/lasociedad-ico.png" alt="" width={160} height={160} className="h-40 w-40" priority />
        </div>

        <h1 className="text-5xl font-bold tracking-[0.3em] text-white [font-family:var(--font-playfair)] sm:text-7xl md:leading-[0.95]">
          LA SOCIEDAD
        </h1>
        <p className="mt-6 max-w-2xl font-(--font-cormorant) text-xl italic text-[var(--color-gold-light)] sm:text-2xl md:text-3xl">
          «Lo que ocurre aquí, no sale de aquí.»
        </p>

        <div className="mx-auto mt-10 flex w-full max-w-md items-center gap-4 opacity-80">
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-[color-mix(in_srgb,var(--color-magenta)_50%,transparent)] to-[color-mix(in_srgb,var(--color-magenta)_50%,transparent)]" />
          <span className="size-1.5 shrink-0 rotate-45 bg-[var(--color-magenta-glow)] shadow-[0_0_12px_color-mix(in_srgb,var(--color-magenta-glow)_45%,transparent)]" aria-hidden="true" />
          <div className="h-px flex-1 bg-linear-to-l from-transparent via-[color-mix(in_srgb,var(--color-magenta)_50%,transparent)] to-[color-mix(in_srgb,var(--color-magenta)_50%,transparent)]" />
        </div>

        <p className="mt-10 max-w-2xl font-(--font-inter) text-base leading-relaxed text-[var(--color-text-muted)] sm:text-lg">
          Un espacio de libertad medida, para quienes desean explorar bajo el velo de la discreción. En Eroscape, la
          comunidad respira misterio, elegancia y una sensualidad cuidada.
        </p>
      </motion.div>

      <Link
        href="#proximas-noches"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[var(--color-text-muted)] opacity-50 transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-magenta)_55%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-experience)]"
        aria-label="Ir a próximas noches"
      >
        <motion.span
          animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={reduceMotion ? undefined : { duration: 2.2, repeat: Infinity, ease: SENSUAL_EASE }}
        >
          <ChevronDown className="size-9" strokeWidth={1.25} aria-hidden="true" />
        </motion.span>
      </Link>
    </section>
  )
}
