'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState } from 'react'

import { CatalogExperienceCard } from '@/components/marketing/CatalogExperienceCard'
import { CITIES, DEFAULT_CITY_SLUG, isCityBookable } from '@/lib/constants'
import { EXPERIENCIAS_CATALOG_ITEMS, EXPERIENCIAS_DESTACADAS_SLICES } from '@/lib/experiences/catalog-items'
import { cn } from '@/lib/utils'
import type { ExperienciasCatalogIntensity, ExperienciasCatalogItem } from '@/types/experiencias-catalog'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const headerReveal = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: SENSUAL_EASE } },
}

export type ExperienciasCatalogCitySlug = (typeof CITIES)[number]['slug']
type IntensityFilter = 'all' | ExperienciasCatalogIntensity

export interface ExperienciasHomeCatalogProps {
  /** Ciudad activa controlada (junto con onActiveCityChange), p. ej. con el mapa en la home */
  activeCitySlug?: ExperienciasCatalogCitySlug
  onActiveCityChange?: (slug: ExperienciasCatalogCitySlug) => void
  /** Página /experiencias (catálogo completo) vs home (solo destacadas, sin filtros de intensidad ni tabs de ciudad) */
  layout?: 'full' | 'featured'
}

const INTENSITY_FILTERS_FULL: readonly { id: IntensityFilter; label: string }[] = [
  { id: 'all', label: 'TODAS' },
  { id: 'ALPHA', label: 'ALPHA' },
  { id: 'BETA', label: 'BETA' },
  { id: 'OMEGA', label: 'OMEGA' },
] as const

export function ExperienciasHomeCatalog({
  activeCitySlug: controlledActiveCity,
  onActiveCityChange,
  layout = 'full',
}: ExperienciasHomeCatalogProps = {}) {
  const shouldReduceMotion = useReducedMotion()
  const [internalActiveCity, setInternalActiveCity] = useState<ExperienciasCatalogCitySlug>(DEFAULT_CITY_SLUG)
  const controlled =
    controlledActiveCity !== undefined && onActiveCityChange !== undefined
  const activeCity = controlled ? controlledActiveCity : internalActiveCity
  const setActiveCity = (slug: ExperienciasCatalogCitySlug) => {
    const city = CITIES.find((c) => c.slug === slug)
    if (!city || !isCityBookable(city)) return
    if (controlled) onActiveCityChange(slug)
    else setInternalActiveCity(slug)
  }
  const [intensity, setIntensity] = useState<IntensityFilter>('all')

  const filtered: readonly ExperienciasCatalogItem[] = useMemo(() => {
    if (layout === 'featured') {
      return EXPERIENCIAS_CATALOG_ITEMS.slice(0, EXPERIENCIAS_DESTACADAS_SLICES)
    }
    if (intensity === 'all') return EXPERIENCIAS_CATALOG_ITEMS
    return EXPERIENCIAS_CATALOG_ITEMS.filter((item) => item.intensity === intensity)
  }, [intensity, layout])

  const sectionId = layout === 'featured' ? 'experiencias-destacadas' : 'catalogo-experiencias'

  return (
    <section
      id={sectionId}
      className="relative w-full scroll-mt-24 border-t border-[rgba(185,48,158,0.12)] py-14 sm:py-20 lg:py-28"
      style={{ background: 'var(--color-bg-base)' }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-60"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(185,48,158,0.35), rgba(232,160,64,0.25), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.header
          variants={shouldReduceMotion ? undefined : headerReveal}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-20%' }}
          className="mx-auto max-w-3xl text-center"
        >
          <nav aria-label="Migas de pan" className="mb-5 font-(--font-jetbrains) text-[10px] uppercase tracking-[0.22em] text-(--color-text-muted) sm:mb-6 sm:text-[11px]">
            <ol className="flex flex-wrap items-center justify-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-(--color-text-secondary)">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">
                /
              </li>
              {layout === 'featured' ? (
                <li>
                  <Link href="/experiencias" className="transition-colors hover:text-(--color-text-secondary)">
                    Experiencias
                  </Link>
                </li>
              ) : (
                <li className="text-white">Experiencias</li>
              )}
            </ol>
          </nav>

          <h2
            className="font-(--font-cormorant) font-semibold leading-[1.08] tracking-[0.04em] text-(--color-gold-light)"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}
          >
            {layout === 'featured' ? 'Experiencias destacadas' : 'ELIGE TU NOCHE'}
          </h2>

          <div className="mx-auto mt-3 flex justify-center">
            <div className="h-px w-24 bg-(--color-gold)/70" aria-hidden="true" />
          </div>

          <p className="mt-5 font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary) sm:text-base">
            {layout === 'featured'
              ? 'Tres salas para despertar el apetito. El resto del universo Eroscape te espera en el catálogo completo.'
              : 'Cada sala es un universo. Cada noche, irrepetible.'}
          </p>
        </motion.header>

        {layout === 'full' ? (
          <>
            <p
              className="mb-3 mt-10 font-(--font-jetbrains) text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted) sm:mt-14 sm:text-[11px]"
              id="catalogo-ciudades-label"
            >
              Ciudad
            </p>
            <div className="-mx-1 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div
                role="tablist"
                aria-labelledby="catalogo-ciudades-label"
                className="flex min-w-0 gap-6 px-1 sm:justify-center sm:gap-10"
              >
                {CITIES.map((city) => {
                  const isActive = activeCity === city.slug
                  const bookable = isCityBookable(city)
                  return (
                    <button
                      key={city.slug}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      disabled={!bookable}
                      onClick={() => setActiveCity(city.slug)}
                      className={cn(
                        'shrink-0 border-b-2 pb-2 font-(--font-playfair) text-sm tracking-wide transition-colors duration-300 sm:text-base',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)',
                        isActive
                          ? 'border-(--color-magenta) text-white'
                          : 'border-transparent text-(--color-text-muted) hover:text-(--color-text-secondary)',
                        !bookable && 'cursor-not-allowed opacity-50 hover:text-(--color-text-muted)',
                      )}
                      aria-disabled={bookable ? undefined : true}
                    >
                      {city.displayName.toUpperCase()}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-8 sm:mt-10">
              <p
                className="mb-3 font-(--font-jetbrains) text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted) sm:text-[11px]"
                id="catalogo-intensidad-label"
              >
                Intensidad
              </p>
              <div
                role="group"
                aria-labelledby="catalogo-intensidad-label"
                className="flex flex-wrap gap-2 sm:gap-2.5"
              >
                {INTENSITY_FILTERS_FULL.map((pill) => {
                  const isOn = intensity === pill.id
                  return (
                    <button
                      key={pill.id}
                      type="button"
                      onClick={() => setIntensity(pill.id)}
                      className={cn(
                        'rounded-full px-3 py-1.5 font-(--font-jetbrains) text-[10px] uppercase leading-tight tracking-wide sm:px-4 sm:text-[11px]',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)',
                        isOn
                          ? 'text-white'
                          : 'border border-[rgba(185,48,158,0.35)] bg-transparent text-(--color-text-secondary) hover:border-[rgba(185,48,158,0.55)]',
                      )}
                      style={isOn ? { background: 'var(--gradient-cta)' } : undefined}
                    >
                      {pill.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </>
        ) : null}

        <div className="mt-12 grid gap-5 sm:mt-14 sm:gap-6 lg:grid-cols-3">
          {filtered.map((item, index) => (
            <CatalogExperienceCard key={item.slug} item={item} citySlug={activeCity} index={index} />
          ))}
        </div>

        {layout === 'full' && filtered.length === 0 ? (
          <p className="mt-10 text-center font-(--font-inter) text-sm text-(--color-text-muted)">
            No hay salas con este filtro en este momento.
          </p>
        ) : null}

        {layout === 'featured' ? (
          <div className="mt-10 flex justify-center sm:mt-12">
            <Link
              href="/experiencias"
              className="inline-flex items-center gap-2 rounded-full border border-white/55 px-6 py-2.5 font-(--font-playfair) text-xs tracking-[0.14em] text-white transition-colors duration-300 hover:border-transparent hover:bg-(--color-magenta) hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base) sm:text-sm"
            >
              Ver catálogo completo →
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}
