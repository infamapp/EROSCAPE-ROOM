'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Clock, Users } from 'lucide-react'

import { ExperienceIntensityPill } from '@/components/experience/ExperienceIntensityPill'
import { getExperienceCardImage } from '@/lib/experiences/visuals'
import { intensityImageOverlayGradientClass } from '@/lib/experience-intensity'
import type { ExperienciasCatalogItem } from '@/types/experiencias-catalog'
import { cn, formatCurrency } from '@/lib/utils'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const cardReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: SENSUAL_EASE, delay: i * 0.06 },
  }),
}

export interface CatalogExperienceCardProps {
  item: ExperienciasCatalogItem
  citySlug: string
  index: number
}

function availabilityStyles(availability: ExperienciasCatalogItem['availability']): string {
  switch (availability) {
    case 'DISPONIBLE':
      return 'text-emerald-400/95 border-emerald-500/35 bg-emerald-950/35'
    case 'POCAS PLAZAS':
      return 'text-[var(--color-text-muted)] border-white/15 bg-white/[0.04]'
    case 'AGOTADO':
      return 'text-red-400 border-red-500/35 bg-red-950/30'
    case 'PRÓXIMAMENTE':
      return 'text-[var(--color-gold-light)] border-[var(--color-gold)]/35 bg-[rgba(203,123,27,0.12)]'
    default: {
      const _e: never = availability
      return _e
    }
  }
}

export function CatalogExperienceCard({ item, citySlug, index }: CatalogExperienceCardProps) {
  const shouldReduceMotion = useReducedMotion()
  const href = `/experiencias/${citySlug}/${item.slug}`
  const priceLabel = `Desde ${formatCurrency(item.priceFrom)}`
  const cardImage = getExperienceCardImage(item.slug, item.title)

  const isAgotado = item.availability === 'AGOTADO'
  const isOmega = item.intensity === 'OMEGA'
  const isDisabled = isAgotado || item.isComingSoon

  const ctaLabel = isAgotado
    ? 'NO DISPONIBLE'
    : item.isComingSoon
      ? 'PRÓXIMAMENTE'
      : 'VER ESTA EXPERIENCIA →'

  const ariaLabel = isAgotado
    ? `${item.title}: agotado`
    : item.isComingSoon
      ? `${item.title}: próximamente`
      : item.title

  const inner = (
    <>
      <div className="relative h-[220px] w-full overflow-hidden">
        <Image
          src={cardImage.src}
          alt={cardImage.alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover opacity-90"
        />
        <div
          className={cn(
            'pointer-events-none absolute inset-0 bg-linear-to-t',
            intensityImageOverlayGradientClass(item.intensity),
          )}
          aria-hidden="true"
        />

        <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <div className="flex flex-col items-start gap-1.5">
            <ExperienceIntensityPill level={item.intensity} />
            {isOmega ? (
              <span
                className="rounded-full border px-2 py-0.5 font-(--font-jetbrains) text-[9px] uppercase tracking-[0.18em]"
                style={{
                  background: 'rgba(127,29,29,0.45)',
                  color: 'var(--color-omega-badge, #f87171)',
                  borderColor: 'color-mix(in srgb, var(--color-omega-badge, #f87171) 45%, transparent)',
                }}
              >
                Sin límites
              </span>
            ) : null}
          </div>
          <span
            className={cn(
              'rounded-full border px-2.5 py-1 font-(--font-jetbrains) text-[10px] tracking-wide uppercase sm:text-[11px]',
              availabilityStyles(item.availability),
            )}
          >
            {item.availability}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4 sm:p-5">
        <h3 className="text-lg font-bold leading-snug text-white [font-family:var(--font-playfair)] sm:text-xl">
          {item.title}
        </h3>
        <p className="line-clamp-2 min-h-[48px] font-(--font-inter) text-sm leading-relaxed text-(--color-text-muted)">
          {item.description}
        </p>

        <div
          className="flex flex-wrap items-center gap-x-4 gap-y-1 font-(--font-jetbrains) text-xs"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5 shrink-0 text-(--color-gold-light)" aria-hidden="true" />
            {item.durationMin} min
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="size-3.5 shrink-0 text-(--color-gold-light)" aria-hidden="true" />
            {item.capacity} {item.capacity === 1 ? 'persona' : 'personas'}
          </span>
        </div>

        <p className="text-base font-semibold tracking-wide text-(--color-gold-light) [font-family:var(--font-playfair)]">
          {priceLabel}
        </p>

        <span
          className={cn(
            'block w-full rounded-full border py-2.5 text-center font-(--font-playfair) text-xs tracking-[0.14em] sm:text-sm',
            isAgotado
              ? 'border-red-500/30 text-red-400/60'
              : item.isComingSoon
                ? 'border-white/50 text-white/70'
                : 'border-white/60 text-white transition-colors duration-300 group-hover:border-transparent group-hover:bg-(--color-magenta) group-hover:text-white',
          )}
        >
          {ctaLabel}
        </span>
      </div>
    </>
  )

  const articleClasses = cn(
    'group overflow-hidden rounded-2xl border-(--border-subtle) bg-(--color-bg-elevated) [box-shadow:var(--glow-card)] transition-[box-shadow,transform,border-color] duration-300',
    isDisabled
      ? 'opacity-60'
      : 'hover:-translate-y-1.5 hover:[box-shadow:var(--glow-magenta)] hover:border-[color-mix(in_srgb,var(--color-magenta)_55%,transparent)]',
  )

  return (
    <motion.article
      custom={index}
      variants={shouldReduceMotion ? undefined : cardReveal}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={{ once: true, margin: '-40px' }}
      className={articleClasses}
      aria-label={ariaLabel}
    >
      {isDisabled ? (
        <div aria-disabled="true" className="block cursor-not-allowed">
          {inner}
        </div>
      ) : (
        <Link
          href={href}
          className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)"
        >
          {inner}
        </Link>
      )}
    </motion.article>
  )
}
