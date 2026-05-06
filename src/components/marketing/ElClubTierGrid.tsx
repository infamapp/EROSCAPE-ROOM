'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2, Crown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { CLUB_TIERS, type ClubTierDefinition, type ClubTierId } from '@/lib/el-club'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: SENSUAL_EASE } },
} as const

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
} as const

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: SENSUAL_EASE } },
} as const

const tierDimTransition = { duration: 0.28, ease: SENSUAL_EASE }

function tierCtaLabel(tier: ClubTierDefinition): string {
  return `ACTIVAR ${tier.name}`
}

export interface ElClubTierGridProps {
  hoveredTier: ClubTierId | null
  onHoverTier: (id: ClubTierId | null) => void
  onActivate: (tier: ClubTierDefinition) => void
}

export function ElClubTierGrid({ hoveredTier, onHoverTier, onActivate }: ElClubTierGridProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.section
      variants={sectionVariants}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={{ once: true, margin: '-60px' }}
      aria-labelledby="club-tiers-heading"
    >
      <h2 id="club-tiers-heading" className="sr-only">
        Niveles de membresía
      </h2>
      <motion.div
        className="grid gap-6 md:grid-cols-3 md:items-stretch"
        variants={staggerContainer}
        initial={shouldReduceMotion ? false : 'hidden'}
        whileInView={shouldReduceMotion ? undefined : 'visible'}
        viewport={{ once: true, margin: '-40px' }}
      >
        {CLUB_TIERS.map((tier) => {
          const dimOthers = hoveredTier !== null && hoveredTier !== tier.id
          const isFeatured = tier.featured === true
          return (
            <motion.article
              key={tier.id}
              variants={staggerItem}
              className={cn(
                'relative flex flex-col rounded-2xl border border-(--border-subtle) p-6',
                isFeatured && 'md:z-10',
              )}
              style={{
                background: 'var(--color-bg-elevated)',
                boxShadow: isFeatured ? 'var(--glow-gold), var(--glow-card)' : 'var(--glow-card)',
                borderTopWidth: 4,
                borderTopColor: isFeatured ? 'var(--color-gold)' : tier.accentVar,
                borderColor: isFeatured ? 'var(--border-gold)' : 'var(--border-subtle)',
              }}
              animate={shouldReduceMotion ? undefined : { opacity: dimOthers ? 0.52 : 1, scale: 1 }}
              transition={tierDimTransition}
              onMouseEnter={() => onHoverTier(tier.id)}
              onMouseLeave={() => onHoverTier(null)}
            >
              {isFeatured ? (
                <div
                  className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full px-3 py-1 font-[var(--font-jetbrains)] text-[9px] tracking-[0.2em] text-white"
                  style={{ background: 'var(--gradient-cta)', boxShadow: 'var(--glow-gold)' }}
                >
                  <Crown className="h-3 w-3" aria-hidden="true" />
                  MÁS POPULAR
                </div>
              ) : null}
              <div className={cn('flex flex-1 flex-col', isFeatured && 'md:z-10 md:scale-105 md:pt-4')}>
                <p className="font-[var(--font-jetbrains)] text-xs tracking-[0.25em]" style={{ color: tier.accentVar }}>
                  {tier.name}
                </p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-[var(--font-playfair)] text-5xl font-bold sm:text-6xl" style={{ color: 'var(--color-gold-light)' }}>
                    {tier.price}€
                  </span>
                  <span className="font-[var(--font-jetbrains)] text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    / {tier.period}
                  </span>
                </div>
                <ul className="mt-6 flex flex-1 flex-col gap-3 font-[var(--font-inter)] text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: 'var(--color-magenta)' }} aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="mt-8 w-full rounded-full py-3 font-[var(--font-jetbrains)] text-xs tracking-wide text-white transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-magenta)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-base)] active:opacity-90"
                  style={{ background: 'var(--gradient-cta)' }}
                  aria-label={tierCtaLabel(tier)}
                  onClick={() => onActivate(tier)}
                >
                  {tierCtaLabel(tier)}
                </button>
              </div>
            </motion.article>
          )
        })}
      </motion.div>
    </motion.section>
  )
}
