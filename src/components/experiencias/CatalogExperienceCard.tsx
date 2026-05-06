'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Clock, Users } from 'lucide-react'

import { ExperienceIntensityPill } from '@/components/experience/ExperienceIntensityPill'
import { intensityImageOverlayGradientClass } from '@/lib/experience-intensity'
import { getExperienceCardImage } from '@/lib/experiences/visuals'
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

export type CatalogAvailability = 'disponible' | 'pocas-plazas' | 'agotado'

export interface CatalogExperienceCardProps {
  title: string
  teaser: string
  intensity: 'ALPHA' | 'BETA' | 'OMEGA'
  durationMin: number
  capacity: number
  priceFrom: number
  city: string
  slug: string
  availability: CatalogAvailability
  imageSrc?: string
  index: number
}

function availabilityBadgeClasses(availability: CatalogAvailability): string {
  switch (availability) {
    case 'disponible':
      return 'bg-green-900/40 text-green-400 border border-green-400/30'
    case 'pocas-plazas':
      return 'bg-amber-900/40 text-amber-400 border border-amber-400/30'
    case 'agotado':
      return 'bg-red-900/40 text-red-400/60 border border-red-400/20'
    default: {
      const _e: never = availability
      return _e
    }
  }
}

function availabilityLabel(availability: CatalogAvailability): string {
  switch (availability) {
    case 'disponible':
      return 'DISPONIBLE'
    case 'pocas-plazas':
      return 'POCAS PLAZAS'
    case 'agotado':
      return 'AGOTADO'
    default: {
      const _e: never = availability
      return _e
    }
  }
}

export function CatalogExperienceCard({
  title,
  teaser,
  intensity,
  durationMin,
  capacity,
  priceFrom,
  city,
  slug,
  availability,
  imageSrc,
  index,
}: CatalogExperienceCardProps) {
  const shouldReduceMotion = useReducedMotion()

  const href = `/experiencias/${city.toLowerCase()}/${slug}`
  const resolved = getExperienceCardImage(slug, title)
  const finalImageSrc = imageSrc ?? resolved.src
  const finalImageAlt = resolved.alt

  const isAgotado = availability === 'agotado'
  const isOmega = intensity === 'OMEGA'

  return (
    <motion.article
      custom={index}
      variants={shouldReduceMotion ? undefined : cardReveal}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={{ once: true, margin: '-40px' }}
      className={cn(
        'group flex  overflow-hidden rounded-2xl border-(--border-subtle) bg-(--color-bg-elevated) [box-shadow:var(--glow-card)] transition-[box-shadow,transform,border-color] duration-300',
        isAgotado
          ? 'opacity-60'
          : 'hover:-translate-y-1.5 hover:[box-shadow:var(--glow-magenta)] hover:border-(--color-magenta)',
      )}
      aria-label={title}
    >
      <Link
        href={href}
        aria-disabled={isAgotado}
        className={cn(
          'flex w-full flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)',
          isAgotado && 'pointer-events-none',
        )}
      >
        <div className="relative h-[220px] w-full overflow-hidden">
          <Image
            src={finalImageSrc}
            alt={finalImageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
          <div
            className={cn(
              'pointer-events-none absolute inset-0 bg-linear-to-t',
              intensityImageOverlayGradientClass(intensity),
            )}
            aria-hidden="true"
          />

          <div className="pointer-events-none absolute left-4 top-4 flex flex-col items-start">
            <ExperienceIntensityPill level={intensity} />
            {isOmega ? (
              <span
                className="mt-2 inline-flex rounded-full border px-2 py-0.5 font-(--font-jetbrains) text-[9px] uppercase tracking-[0.15em]"
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

          <div className="pointer-events-none absolute right-4 top-4">
            <span
              className={cn(
                'inline-flex rounded-full px-2 py-0.5 font-(--font-jetbrains) text-[10px] uppercase tracking-[0.15em]',
                availabilityBadgeClasses(availability),
              )}
            >
              {availabilityLabel(availability)}
            </span>
          </div>
        </div>

        <div className="flex h-full flex-col p-5">
          <h3 className="text-center [font-family:var(--font-playfair)] text-lg font-bold text-(--color-text-primary)">
            {title}
          </h3>
          <p className="mt-2 line-clamp-2 min-h-[44px] text-center font-(--font-inter) text-sm text-(--color-text-secondary)">
            {teaser}
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-(--color-text-muted)">
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {durationMin} min
            </span>
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4" aria-hidden="true" />
              {capacity} {capacity === 1 ? 'persona' : 'personas'}
            </span>
          </div>

          <div className="mt-5 text-center">
            <p className="[font-family:var(--font-playfair)] text-base font-semibold text-(--color-gold-light)">
              {`Desde ${formatCurrency(priceFrom)}`}
            </p>
          </div>

          <span
            className={cn(
              'mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition-[filter,transform,background-color,border-color,color] duration-300 mt-4',
              isAgotado
                ? 'border border-red-400/20 text-red-400/60'
                : 'border border-[color-mix(in_srgb,var(--color-magenta)_35%,transparent)] text-white hover:border-transparent hover:brightness-110',
            )}
            style={
              isAgotado
                ? undefined
                : {
                    background: 'color-mix(in srgb, var(--color-bg-elevated) 55%, transparent)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
                  }
            }
          >
            <span>VER ESTA EXPERIENCIA</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </motion.article>
  )
}

