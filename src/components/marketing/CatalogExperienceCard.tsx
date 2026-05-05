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

  const inner = (
    <>
      <div className="relative h-[200px] w-full overflow-hidden">
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
      </div>

      <div className="flex flex-col gap-3 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <ExperienceIntensityPill level={item.intensity} />
          <span
            className={cn(
              'rounded-full border px-2.5 py-1 font-(--font-jetbrains) text-[10px] tracking-wide uppercase sm:text-[11px]',
              availabilityStyles(item.availability),
            )}
          >
            {item.availability}
          </span>
        </div>

        <h3 className="font-(--font-playfair) text-lg font-bold leading-snug text-white sm:text-xl">
          {item.title}
        </h3>
        <p className="line-clamp-2 font-(--font-inter) text-sm leading-relaxed text-[var(--color-text-muted)] min-h-[48px]">
          {item.description}
        </p>

        <div
          className="flex flex-wrap items-center gap-x-4 gap-y-1 font-(--font-jetbrains) text-xs text-[var(--color-text-secondary)]"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5 shrink-0 text-[var(--color-gold-light)]" aria-hidden="true" />
            {item.durationMin} min
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="size-3.5 shrink-0 text-[var(--color-gold-light)]" aria-hidden="true" />
            {item.capacity} {item.capacity === 1 ? 'persona' : 'personas'}
          </span>
        </div>

        <p className="font-(--font-playfair) text-base font-semibold tracking-wide text-[var(--color-gold-light)]">
          {priceLabel}
        </p>

        <span
          className={cn(
            'block w-full rounded-full border py-2.5 text-center font-(--font-playfair) text-xs tracking-[0.14em] sm:text-sm',
            item.isComingSoon
              ? 'border-white/50 text-white/70'
              : 'border-white/60 text-white transition-colors duration-300 group-hover:border-transparent group-hover:bg-(--color-magenta) group-hover:text-white',
          )}
        >
          VER ESTA EXPERIENCIA →
        </span>
      </div>
    </>
  )

  return (
    <motion.article
      custom={index}
      variants={shouldReduceMotion ? undefined : cardReveal}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={{ once: true, margin: '-40px' }}
      className={cn(
        'group overflow-hidden rounded-2xl border-(--border-subtle) bg-(--color-bg-elevated) [box-shadow:var(--glow-card)]',
        item.isComingSoon
          ? 'opacity-90'
          : 'transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:[box-shadow:var(--glow-magenta)]',
      )}
      aria-label={item.isComingSoon ? `${item.title}: próximamente` : item.title}
    >
      <Link
        href={href}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)"
      >
        {inner}
      </Link>
    </motion.article>
  )
}
