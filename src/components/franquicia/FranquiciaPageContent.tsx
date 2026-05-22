'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

import { FranquiciaLeadForm } from '@/components/franquicia/FranquiciaLeadForm'
import {
  FRANCHISE_FORM_ANCHOR,
  FRANCHISE_METRICS,
  FRANCHISE_PAGE_COPY,
} from '@/lib/franchise'
import { cn } from '@/lib/utils'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const heroVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: SENSUAL_EASE } },
} as const

export interface FranquiciaPageContentProps {
  className?: string
}

export function FranquiciaPageContent({ className }: FranquiciaPageContentProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <main className={cn('min-h-screen pb-24', className)}>
      <section className="relative isolate overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'repeating-linear-gradient(90deg, color-mix(in_srgb, var(--color-gold) 8%, transparent) 0, color-mix(in_srgb, var(--color-gold) 8%, transparent) 1px, transparent 1px, transparent 64px), repeating-linear-gradient(0deg, color-mix(in_srgb, var(--color-gold) 6%, transparent) 0, color-mix(in_srgb, var(--color-gold) 6%, transparent) 1px, transparent 1px, transparent 72px)',
            opacity: 0.55,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'var(--texture-parchment-noise)' }}
          aria-hidden="true"
        />

        <div className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-20">
          <motion.div
            variants={heroVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            animate={shouldReduceMotion ? undefined : 'visible'}
          >
            <Image src="/erosGold.png" alt="Eroscape" width={72} height={72} priority className="mx-auto h-[72px] w-[72px] select-none" />
          </motion.div>

          <motion.p
            className="mt-6 inline-flex items-center rounded-full border px-4 py-1 text-[10px] uppercase tracking-[0.28em] text-(--color-gold) [font-family:var(--font-jetbrains)]"
            style={{ borderColor: 'color-mix(in srgb, var(--color-gold) 30%, transparent)' }}
            variants={heroVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            animate={shouldReduceMotion ? undefined : 'visible'}
          >
            {FRANCHISE_PAGE_COPY.eyebrow}
          </motion.p>

          <motion.h1
            className="mt-6 text-balance text-4xl font-bold tracking-[0.03em] text-(--color-text-primary) [font-family:var(--font-playfair)] sm:text-5xl lg:text-6xl"
            variants={heroVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            animate={shouldReduceMotion ? undefined : 'visible'}
          >
            {FRANCHISE_PAGE_COPY.heroTitle}
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-xl text-pretty text-sm leading-relaxed text-(--color-text-secondary) [font-family:var(--font-inter)] sm:text-base"
            variants={heroVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            animate={shouldReduceMotion ? undefined : 'visible'}
          >
            {FRANCHISE_PAGE_COPY.heroIntro}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4"
            variants={heroVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            animate={shouldReduceMotion ? undefined : 'visible'}
          >
            {FRANCHISE_METRICS.map((metric, idx) => (
              <div key={metric.label} className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-(--color-gold-light) [font-family:var(--font-playfair)] sm:text-3xl">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-(--color-text-muted) [font-family:var(--font-jetbrains)]">
                    {metric.label}
                  </p>
                </div>
                {idx < FRANCHISE_METRICS.length - 1 ? (
                  <span className="text-(--color-text-muted)" aria-hidden="true">
                    |
                  </span>
                ) : null}
              </div>
            ))}
          </motion.div>

          <motion.div
            className="mt-10"
            variants={heroVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            animate={shouldReduceMotion ? undefined : 'visible'}
          >
            <Link
              href={FRANCHISE_FORM_ANCHOR}
              className="inline-flex items-center justify-center rounded-full border px-7 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-(--color-gold-light) transition-[background-color] [font-family:var(--font-jetbrains)] hover:bg-(--color-gold)/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-gold-light) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)"
              style={{ borderColor: 'var(--border-gold)' }}
            >
              Solicitar información
            </Link>
          </motion.div>
        </div>
      </section>

      <section
        id="solicitud"
        className="mx-auto max-w-3xl scroll-mt-28 px-4 py-12 sm:px-6 sm:py-16"
      >
        <FranquiciaLeadForm />
      </section>
    </main>
  )
}
