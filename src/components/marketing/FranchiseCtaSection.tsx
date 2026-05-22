'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

import { FRANCHISE_HOME_COPY } from '@/lib/franchise'
import { cn } from '@/lib/utils'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const revealVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: SENSUAL_EASE } },
}

export interface FranchiseCtaSectionProps {
  className?: string
}

export function FranchiseCtaSection({ className }: FranchiseCtaSectionProps) {
  const shouldReduceMotion = useReducedMotion()
  const shouldAnimate = !shouldReduceMotion

  return (
    <section className={cn('w-full py-14 sm:py-18 lg:py-20', className)} aria-labelledby="franchise-cta-heading">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <motion.div
          variants={shouldAnimate ? revealVariants : undefined}
          initial={shouldAnimate ? 'hidden' : false}
          whileInView={shouldAnimate ? 'visible' : undefined}
          viewport={{ once: true, margin: '-15%' }}
          className="rounded-2xl px-6 py-10 sm:px-10 sm:py-12"
          style={{
            background:
              'linear-gradient(160deg, var(--color-gold-light) 0%, var(--color-gold) 52%, color-mix(in srgb, var(--color-gold) 88%, #3d1f00) 100%)',
            boxShadow: 'var(--glow-gold)',
          }}
        >
          <p className="font-(--font-jetbrains) text-[10px] font-semibold uppercase tracking-[0.24em] text-(--color-bg-base)/80 sm:text-[11px]">
            {FRANCHISE_HOME_COPY.eyebrow}
          </p>

          <h2
            id="franchise-cta-heading"
            className="mt-4 text-balance text-3xl font-bold tracking-[0.03em] text-(--color-bg-base) [font-family:var(--font-playfair)] sm:text-4xl"
          >
            {FRANCHISE_HOME_COPY.title}
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-pretty font-(--font-inter) text-sm leading-relaxed text-(--color-bg-base)/85 sm:text-base">
            {FRANCHISE_HOME_COPY.intro}
          </p>

          <div className="mt-8">
            <Link
              href={FRANCHISE_HOME_COPY.ctaHref}
              className="inline-flex w-full items-center justify-center rounded-full bg-(--color-bg-base) px-8 py-3 text-xs font-bold uppercase tracking-[0.18em] text-(--color-gold-light) transition-[filter,transform] duration-200 hover:brightness-110 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-bg-base) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-gold) sm:w-auto"
            >
              {FRANCHISE_HOME_COPY.ctaLabel}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
