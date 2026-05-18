'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Clock, Users } from 'lucide-react'
import { useState } from 'react'

import { SpainMapSection } from '@/components/marketing/SpainMapSection'
import { CITIES, DEFAULT_CITY_SLUG, isCityBookable } from '@/lib/constants'
import { FEATURED_EXPERIENCES, type FeaturedExperience, type FeaturedExperienceIntensity } from '@/lib/featured-experiences'
import { getExperienceCardImage } from '@/lib/experiences/visuals'
import { cn } from '@/lib/utils'

type CitySlug = (typeof CITIES)[number]['slug']

export interface ExperienciasHomeFeaturedProps {
  id?: string
}

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const headerReveal = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: SENSUAL_EASE } },
}

const gridVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: SENSUAL_EASE, staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: SENSUAL_EASE } },
}

const SURFACE_CARD =
  'rounded-2xl overflow-hidden border-(--border-subtle) bg-(--color-bg-elevated) [box-shadow:var(--glow-card)]'

const CITY_PILLS = CITIES.map((c) => ({ slug: c.slug, label: c.displayName })) as readonly {
  slug: CitySlug
  label: string
}[]

function intensityCopy(intensity: FeaturedExperienceIntensity): string {
  switch (intensity) {
    case 'ALPHA':
      return 'DESPERTAR · Suave'
    case 'BETA':
      return 'INTENSO · Sin frenos'
    case 'OMEGA':
      return 'SIN LÍMITES · Todo permitido'
    default: {
      const _e: never = intensity
      return _e
    }
  }
}

function intensityBadgeClass(intensity: FeaturedExperienceIntensity): string {
  switch (intensity) {
    case 'ALPHA':
      return 'border border-[color-mix(in_srgb,var(--color-intensity-alpha)_40%,transparent)] bg-[rgba(59,130,246,0.60)] text-white'
    case 'BETA':
      return 'border border-[color-mix(in_srgb,var(--color-intensity-beta)_40%,transparent)] bg-[rgba(245,158,11,0.60)] text-white'
    case 'OMEGA':
      return 'border border-[color-mix(in_srgb,var(--color-intensity-omega)_40%,transparent)] bg-[rgba(185,48,158,0.60)] text-white'
    default: {
      const _e: never = intensity
      return _e
    }
  }
}

interface SpainCitySelectorProps {
  activeCity: CitySlug
  onSelectCity: (slug: CitySlug) => void
}

function SpainCitySelector({ activeCity, onSelectCity }: SpainCitySelectorProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="-mx-1 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex min-w-0 justify-start gap-2 px-1 sm:justify-center sm:gap-2.5">
        {CITY_PILLS.map((pill) => {
          const city = CITIES.find((c) => c.slug === pill.slug)
          const bookable = city !== undefined && isCityBookable(city)
          const isOn = activeCity === pill.slug
          return (
            <button
              key={pill.slug}
              type="button"
              disabled={!bookable}
              onClick={() => {
                if (!bookable) return
                onSelectCity(pill.slug)
              }}
              className={cn(
                'shrink-0 rounded-full px-4 py-1.5 text-xs font-(--font-jetbrains) uppercase tracking-[0.15em]',
                'transition-[border-color,background-color,color] duration-300',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)',
                isOn ? 'text-white' : 'border-(--border-subtle) bg-transparent text-(--color-text-muted) hover:text-white',
                !bookable && 'cursor-not-allowed opacity-50 hover:text-(--color-text-muted)',
              )}
              style={isOn ? { background: 'var(--gradient-cta)' } : undefined}
              aria-pressed={isOn}
              aria-disabled={bookable ? undefined : true}
            >
              <span className="inline-flex items-center gap-2">
                {isOn ? (
                  <motion.span
                    className="inline-flex h-1.5 w-1.5 rounded-full bg-(--color-magenta)"
                    aria-hidden="true"
                    animate={reduceMotion ? undefined : { scale: [1, 1.4, 1] }}
                    transition={reduceMotion ? undefined : { duration: 2, repeat: Infinity, ease: SENSUAL_EASE }}
                  />
                ) : (
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-white/10" aria-hidden="true" />
                )}
                {pill.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

interface HomeFeaturedCardProps {
  item: FeaturedExperience
}

function HomeFeaturedCard({ item }: HomeFeaturedCardProps) {
  const href = `/experiencias/${item.city.toLowerCase()}/${item.slug}`
  const resolvedImage = getExperienceCardImage(item.slug, item.title)
  const imageSrc = item.imageSrc ?? resolvedImage.src
  const imageAlt = resolvedImage.alt

  return (
    <motion.article variants={cardVariants} className={cn('transition-transform duration-300 hover:-translate-y-1.5', SURFACE_CARD)}>
      <div className="relative h-[200px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          priority={false}
        />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{ background: 'linear-gradient(to bottom, transparent 40%, var(--color-bg-base) 100%)' }}
        />

        <div className="absolute left-4 top-4">
          <span
            className={cn(
              'inline-flex rounded-full px-2 py-0.5 font-(--font-jetbrains) text-[9px] uppercase tracking-[0.15em]',
              intensityBadgeClass(item.intensity),
            )}
          >
            {intensityCopy(item.intensity)}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="[font-family:var(--font-playfair)] text-lg font-bold text-(--color-text-primary)">
          {item.title}
        </h3>
        <p className="mt-1 line-clamp-2 font-(--font-inter) text-sm text-(--color-text-secondary)">
          {item.teaser}
        </p>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-4 text-xs text-(--color-text-muted)">
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {item.durationMin} min
            </span>
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4" aria-hidden="true" />
              Pareja
            </span>
          </div>
          <div className="[font-family:var(--font-playfair)] text-sm font-semibold text-(--color-gold-light)">
            Desde €{item.priceFrom}
          </div>
        </div>

        <Link
          href={href}
          className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-(--color-magenta-dim) px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-(--color-text-secondary) transition-colors duration-300 hover:border-(--color-magenta) hover:bg-(--color-magenta)/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)"
        >
          VER ESTA EXPERIENCIA →
        </Link>
      </div>
    </motion.article>
  )
}

export function ExperienciasHomeFeatured({ id = 'experiencias-destacadas' }: ExperienciasHomeFeaturedProps) {
  const shouldReduceMotion = useReducedMotion()
  const [activeCity, setActiveCity] = useState<CitySlug>(DEFAULT_CITY_SLUG)

  const handleSelectCity = (slug: CitySlug) => {
    const city = CITIES.find((c) => c.slug === slug)
    if (!city || !isCityBookable(city)) return
    setActiveCity(slug)
  }

  const cityLabel = CITIES.find((c) => c.slug === activeCity)?.displayName ?? 'Granada'
  const items = FEATURED_EXPERIENCES.filter((e) => e.city.toLowerCase() === cityLabel.toLowerCase()).slice(0, 3)

  return (
    <section
      id={id}
      className="relative w-full scroll-mt-24 border-t border-[rgba(185,48,158,0.12)] py-14 sm:py-20 lg:py-28"
      style={{ background: 'var(--color-bg-base)' }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-60"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(185,48,158,0.35), rgba(232,160,64,0.25), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <div className="mt-10 sm:mt-12">
          <SpainMapSection activeCitySlug={activeCity} onSelectCity={handleSelectCity} />
        </div>

        <motion.header
          variants={shouldReduceMotion ? undefined : headerReveal}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-20%' }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.22em] text-(--color-text-muted) sm:text-[11px]">
            EXPERIENCIAS DESTACADAS
          </p>
          <h2 className="mt-4 font-(--font-cormorant) text-3xl italic text-(--color-text-primary) sm:text-4xl">
            Tres noches para despertar el apetito
          </h2>
          <p className="mt-4 font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary) sm:text-base">
            Elige una ciudad y mira tres entradas al universo Eroscape. El resto del catálogo te espera cuando quieras.
          </p>
        </motion.header>

        <div className="mt-10 sm:mt-12">
          <SpainCitySelector activeCity={activeCity} onSelectCity={handleSelectCity} />
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeCity}
            variants={shouldReduceMotion ? undefined : gridVariants}
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : 'hidden'}
            animate={shouldReduceMotion ? { opacity: 1, y: 0 } : 'visible'}
            exit={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -12, transition: { duration: 0.2, ease: SENSUAL_EASE } }}
            className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 lg:grid-cols-3"
          >
            {items.map((item) => (
              <HomeFeaturedCard key={`${activeCity}-${item.slug}-${item.title}`} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex justify-center sm:mt-12">
          <Link
            href="/experiencias"
            className="inline-flex w-full max-w-xs items-center justify-center rounded-full border border-(--color-magenta-dim) px-6 py-2.5 font-(--font-jetbrains) text-[10px] uppercase tracking-[0.18em] text-(--color-text-secondary) transition-colors duration-300 hover:border-(--color-magenta) hover:bg-(--color-magenta)/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base) sm:text-[11px]"
          >
            Ver catálogo completo →
          </Link>
        </div>
      </div>
    </section>
  )
}
