'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { buildWhatsAppAdvisorUrl } from '@/lib/contact'
import { cn } from '@/lib/utils'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const revealVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: SENSUAL_EASE } },
} as const

export interface AdvisorContactSectionProps {
  className?: string
  compact?: boolean
  eyebrow?: string
  title?: string
  body?: string
  ctaLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
}

const DEFAULT_COPY = {
  eyebrow: 'TU GUÍA',
  title: '¿Hablamos con calma?',
  body: 'Un asesor te responde por WhatsApp con discreción. Sin presión, sin exposición.',
  ctaLabel: 'Habla con un asesor',
} as const

export function AdvisorContactSection({
  className,
  compact = false,
  eyebrow = DEFAULT_COPY.eyebrow,
  title = DEFAULT_COPY.title,
  body = DEFAULT_COPY.body,
  ctaLabel = DEFAULT_COPY.ctaLabel,
  secondaryHref,
  secondaryLabel,
}: AdvisorContactSectionProps) {
  const shouldReduceMotion = useReducedMotion()
  const whatsAppUrl = buildWhatsAppAdvisorUrl()

  return (
    <section
      className={cn('mx-auto max-w-5xl px-4 sm:px-6', className)}
      aria-labelledby="advisor-contact-heading"
    >
      <motion.div
        className={cn(
          'tocador-glass mx-auto rounded-2xl text-center',
          compact ? 'max-w-xl p-6' : 'max-w-2xl p-8',
        )}
        variants={shouldReduceMotion ? undefined : revealVariants}
        initial={shouldReduceMotion ? false : 'hidden'}
        whileInView={shouldReduceMotion ? undefined : 'visible'}
        viewport={{ once: true, margin: '-15%' }}
      >
        <p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.22em] text-(--color-text-muted)">
          {eyebrow}
        </p>
        <h2
          id="advisor-contact-heading"
          className={cn(
            'mt-3 font-(--font-cormorant) italic text-white',
            compact ? 'text-xl' : 'text-2xl',
          )}
        >
          {title}
        </h2>
        <p
          className={cn(
            'mx-auto mt-3 max-w-xl text-pretty font-(--font-inter) leading-relaxed text-(--color-text-secondary)',
            compact ? 'text-sm' : 'text-sm sm:text-base',
          )}
        >
          {body}
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          {secondaryHref && secondaryLabel ? (
            <a
              href={secondaryHref}
              className="inline-flex w-full items-center justify-center rounded-full border border-(--border-subtle) px-8 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base) sm:w-auto"
            >
              {secondaryLabel}
            </a>
          ) : null}
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full px-8 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-[filter,transform] duration-200 hover:brightness-110 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base) sm:w-auto"
            style={{ background: 'var(--gradient-cta)', boxShadow: 'var(--glow-magenta)' }}
          >
            {ctaLabel}
          </a>
        </div>
      </motion.div>
    </section>
  )
}
