'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Gem } from 'lucide-react'

import { MEMBRESIA_COPY, MEMBRESIA_HERO_PERKS } from '@/lib/membresia'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const perksContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
} as const

const perksItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: SENSUAL_EASE } },
} as const

export function MembresiaHero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative flex min-h-[min(100dvh,900px)] flex-col items-center justify-center overflow-hidden px-4 pb-20 pt-28 text-center sm:px-6 sm:pt-32">
      <div className="absolute inset-0 z-0 opacity-25" aria-hidden="true">
        <Image src="/back-2.png" alt="" fill priority sizes="100vw" className="object-cover" />
      </div>
      <div
        className="absolute inset-0 z-[1] bg-linear-to-b from-(--color-bg-base)/50 via-transparent to-(--color-bg-base)/92"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        <p className="mb-6 font-(--font-jetbrains) text-[11px] uppercase tracking-[0.38em] text-(--color-gold-light) sm:text-xs">
          {MEMBRESIA_COPY.heroEyebrow}
        </p>
        <h1 className="font-(--font-cormorant) text-5xl font-light italic tracking-tight text-white sm:text-7xl md:text-8xl">
          {MEMBRESIA_COPY.heroTitle}
        </h1>
        <p className="mx-auto mt-4 max-w-xl font-(--font-cormorant) text-lg italic text-(--color-text-muted) sm:text-xl md:text-2xl">
          {MEMBRESIA_COPY.heroSubtitle}
        </p>
        <p className="mx-auto mt-6 max-w-2xl font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary) sm:text-base">
          {MEMBRESIA_COPY.heroIntro}
        </p>

        <div className="mx-auto mt-10 flex max-w-md items-center gap-4 sm:mt-12">
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-[color-mix(in_srgb,var(--color-magenta)_55%,transparent)] to-transparent" />
          <Gem className="size-4 shrink-0 text-(--color-magenta-glow)" aria-hidden="true" />
          <div className="h-px flex-1 bg-linear-to-l from-transparent via-[color-mix(in_srgb,var(--color-magenta)_55%,transparent)] to-transparent" />
        </div>

        <motion.ul
          className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4"
          variants={reduceMotion ? undefined : perksContainer}
          initial={reduceMotion ? false : 'hidden'}
          animate={reduceMotion ? undefined : 'visible'}
          aria-label="Beneficios de la membresía"
        >
          {MEMBRESIA_HERO_PERKS.map((perk) => {
            const PerkIcon = perk.Icon
            return (
              <motion.li
                key={perk.id}
                variants={reduceMotion ? undefined : perksItem}
                className="rounded-xl border border-white/10 bg-(--color-bg-elevated)/80 px-4 py-5 text-center backdrop-blur-sm sm:px-5 sm:py-6"
                style={{ boxShadow: 'var(--glow-card)' }}
              >
                <span
                  className="mx-auto flex size-12 items-center justify-center rounded-full border border-white/10 bg-[color-mix(in_srgb,var(--color-magenta)_14%,transparent)] text-(--color-magenta-glow)"
                  aria-hidden="true"
                >
                  <PerkIcon className="size-5" strokeWidth={1.35} />
                </span>
                <p className="mt-3 font-(--font-cormorant) text-[15px] italic leading-snug text-(--color-text-secondary) sm:text-base">
                  {perk.text}
                </p>
              </motion.li>
            )
          })}
        </motion.ul>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:mt-14 sm:flex-row sm:gap-6">
          <Link
            href="#niveles"
            className="inline-flex min-w-[200px] items-center justify-center rounded-full px-10 py-3.5 font-(--font-jetbrains) text-xs font-bold uppercase tracking-[0.18em] text-white transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)"
            style={{ background: 'var(--gradient-cta)' }}
          >
            {MEMBRESIA_COPY.ctaPrimary}
          </Link>
          <Link
            href="#que-incluye"
            className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-white/35 px-10 py-3.5 font-(--font-jetbrains) text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)"
          >
            {MEMBRESIA_COPY.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  )
}
