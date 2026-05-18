'use client'

import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState, type ReactNode } from 'react'

import { CatalogExperienceCard } from '@/components/experiencias/CatalogExperienceCard'
import { IntensityModeCard } from '@/components/experiencias/IntensityModeCard'
import { CITIES, DEFAULT_CITY_SLUG, isCityBookable } from '@/lib/constants'
import { getExperiencesByCity } from '@/lib/experiences/catalog-items'
import { cn } from '@/lib/utils'
import type { ExperienciasCatalogIntensity } from '@/types/experiencias-catalog'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

type CitySlug = (typeof CITIES)[number]['slug']
type IntensityFilter = 'TODAS' | ExperienciasCatalogIntensity

const headerReveal = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: SENSUAL_EASE } },
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.22em] text-(--color-text-muted) sm:text-[11px]">
      {children}
    </p>
  )
}

function DividerBand({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <div
      id={id}
      className="relative border-y border-[color-mix(in_srgb,var(--color-magenta-dim)_35%,transparent)] bg-(--color-bg-subtle)/50 py-20 sm:py-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-70"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(185,48,158,0.35), rgba(232,160,64,0.25), transparent)',
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  )
}

function normalizeAvailability(
  raw: 'DISPONIBLE' | 'POCAS PLAZAS' | 'AGOTADO' | 'PRÓXIMAMENTE',
): 'disponible' | 'pocas-plazas' | 'agotado' {
  switch (raw) {
    case 'DISPONIBLE':
      return 'disponible'
    case 'POCAS PLAZAS':
      return 'pocas-plazas'
    case 'AGOTADO':
    case 'PRÓXIMAMENTE':
      return 'agotado'
    default: {
      const _e: never = raw
      return _e
    }
  }
}

export function ExperienciasPage() {
  const shouldReduceMotion = useReducedMotion()
  const [activeCity, setActiveCity] = useState<CitySlug>(DEFAULT_CITY_SLUG)

  const handleSelectCity = (slug: CitySlug) => {
    const city = CITIES.find((c) => c.slug === slug)
    if (!city || !isCityBookable(city)) return
    setActiveCity(slug)
  }
  const [activeIntensity, setActiveIntensity] = useState<IntensityFilter>('TODAS')

  const all = useMemo(() => getExperiencesByCity(activeCity), [activeCity])

  const filtered = useMemo(() => {
    if (activeIntensity === 'TODAS') return all
    return all.filter((e) => e.intensity === activeIntensity)
  }, [activeIntensity, all])

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--color-bg-base)' }}>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[min(70vh,520px)]"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 120% 80% at 50% -20%, color-mix(in srgb, var(--color-purple-mid) 22%, transparent) 0%, transparent 65%)',
        }}
      />

      <main className="relative z-0 pt-20 sm:pt-24">
        {/* 1. Hero */}
        <section className="relative scroll-mt-24 border-t border-[color-mix(in_srgb,var(--color-magenta)_18%,transparent)] py-14 sm:py-20 lg:py-24">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-60"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(185,48,158,0.35), rgba(232,160,64,0.25), transparent)',
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
              <Eyebrow>CATÁLOGO</Eyebrow>
              <h1
                className="mt-5 text-5xl font-bold leading-[1.05] tracking-[0.04em] [font-family:var(--font-playfair)] sm:text-6xl"
                style={{
                  background: 'var(--gradient-cta)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                ELEGÍ TU NOCHE
              </h1>
              <p className="mt-5 font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary) sm:text-base">
                Dos decisiones te separan del deseo. Primero, elegí cómo jugás. Después, elegí dónde.
              </p>
            </motion.header>
          </div>
        </section>

        {/* 2. Reglas del juego */}
        <section className="scroll-mt-24 pb-6 sm:pb-18">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>LA INTENSIDAD</Eyebrow>
              <h2 className="mt-3 text-2xl font-bold tracking-[0.06em] text-(--color-text-primary) [font-family:var(--font-playfair)] sm:text-3xl">
                Las reglas del juego
              </h2>
              <p className="mt-3 font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary) sm:text-base">
                Elegí el modo que mejor define tu noche. Todo sucede con discreción, cuidado y consentimiento.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: 'Lovers',
                  description:
                    'Para parejas que quieren reconectarse, jugar y volver a mirarse distinto. Complicidad, tensión suave y un final cuidado.',
                  imageSrc: '/habitacioveneciana.png',
                },
                {
                  title: 'Plan Golfo',
                  description:
                    'Para amigos con tensión, rolletes o parejas aventureras. Risas nerviosas, adrenalina y decisiones rápidas.',
                  imageSrc: '/ritualmedianoche.png',
                },
                {
                  title: 'Libertino',
                  description:
                    'Para mentes muy abiertas. Tres niveles de intensidad hacia una exploración total, siempre consensuada.',
                  imageSrc: '/espejonegro.png',
                },
                {
                  title: 'El Secreto',
                  description:
                    'No desvelamos pruebas ni recorrido. El misterio es parte del placer: entrás sin mapa, salís con historia.',
                  imageSrc: '/lamascarada.png',
                },
              ].map((item, index) => (
                <IntensityModeCard
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  imageSrc={item.imageSrc}
                  eyebrow="LAS REGLAS DEL JUEGO"
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 3. Divider band */}
        <DividerBand id="el-escenario">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <Eyebrow>AHORA ELEGÍ TU ESCENARIO</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-[0.06em] text-(--color-text-primary) [font-family:var(--font-playfair)] sm:text-5xl">
              EL ESCENARIO.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary) sm:text-base">
              Cada sala es un universo irrepetible.
            </p>
          </div>
        </DividerBand>

        {/* 4-5. Filtros + Grid */}
        <section
          id="catalogo-salas"
          className="relative scroll-mt-24 border-t border-[color-mix(in_srgb,var(--color-magenta)_12%,transparent)] py-14 sm:py-20 lg:py-28"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div
              className="sticky top-16 z-20 -mx-4 border-b border-(--border-subtle) px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6 md:static md:mx-0 md:border-0 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-0"
              style={{ background: 'color-mix(in srgb, var(--color-bg-base) 80%, transparent)' }}
            >
              <p className="mb-3 text-center font-(--font-jetbrains) text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted) sm:text-[11px]">
                Ciudad
              </p>
              <div className="-mx-1 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div role="tablist" className="flex min-w-0 gap-6 px-1 sm:justify-center sm:gap-10">
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
                        onClick={() => handleSelectCity(city.slug)}
                        className={cn(
                          'shrink-0 border-b-2 pb-2 font-(--font-playfair) text-sm tracking-wide transition-colors duration-200 sm:text-base',
                          'focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)',
                          isActive
                            ? 'border-(--color-magenta) text-(--color-text-primary)'
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

              <div className="mt-6 sm:mt-8">
                <p className="mb-3 text-center font-(--font-jetbrains) text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted) sm:text-[11px]">
                  INTENSIDAD
                </p>
                <div className="flex flex-wrap justify-center gap-2 pt-2 sm:gap-2.5">
                  {(['TODAS', 'ALPHA', 'BETA', 'OMEGA'] as const).map((pill) => {
                    const isOn = activeIntensity === pill
                    return (
                      <button
                        key={pill}
                        type="button"
                        onClick={() => setActiveIntensity(pill)}
                        className={cn(
                          'rounded-full px-3 py-1.5 font-(--font-jetbrains) text-[10px] uppercase leading-tight tracking-wide sm:px-4 sm:text-[11px]',
                          'focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)',
                          isOn
                            ? 'text-white'
                            : 'border border-(--border-subtle) bg-transparent text-(--color-text-muted) hover:text-white',
                        )}
                        style={isOn ? { background: 'var(--gradient-cta)' } : undefined}
                      >
                        {pill}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${activeCity}-${activeIntensity}`}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: SENSUAL_EASE }}
                className="mt-12 grid gap-5 sm:mt-14 sm:gap-6 lg:grid-cols-3"
              >
                {filtered.map((item, index) => (
                  <CatalogExperienceCard
                    key={`${activeCity}-${item.slug}`}
                    title={item.title}
                    teaser={item.description}
                    intensity={item.intensity}
                    durationMin={item.durationMin}
                    capacity={item.capacity}
                    priceFrom={item.priceFrom}
                    city={CITIES.find((c) => c.slug === activeCity)?.displayName ?? 'Madrid'}
                    slug={item.slug}
                    availability={normalizeAvailability(item.availability)}
                    index={index}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {filtered.length === 0 ? (
              <p className="mt-10 text-center font-(--font-inter) text-sm text-(--color-text-muted)">
                No hay salas con este filtro en este momento.
              </p>
            ) : null}
          </div>
        </section>

        {/* 6. Habitación Final */}
        <section className="scroll-mt-24 border-t border-[color-mix(in_srgb,var(--color-magenta)_12%,transparent)] pb-16 pt-6 sm:pb-24 sm:pt-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 w-fit">
            <div
              className="rounded-3xl border-(--border-subtle) p-8 backdrop-blur-xl [box-shadow:var(--glow-card)] sm:p-12"
              style={{
                background: 'linear-gradient(135deg, rgba(185,48,158,0.15), rgba(159,52,155,0.08))',
              }}
            >
              <h3 className="mt-1 text-2xl italic text-(--color-text-primary) [font-family:var(--font-playfair)] sm:text-3xl text-center">
                La Habitación Final
              </h3>
              <p className="mt-4 max-w-3xl font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary) sm:text-base text-center">
                Llegues por donde llegues, el destino siempre es el placer. Un espacio diseñado para cruzar tus propios límites.
              </p>
              <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center justify-center">
                <Link
                  href="/reservar"
                  className="inline-flex items-center justify-center rounded-full px-8 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white transition-[filter,transform] duration-200 hover:brightness-110 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)"
                  style={{ background: 'var(--gradient-cta)', boxShadow: 'var(--glow-magenta)' }}
                >
                  CONFIRMAR MI NOCHE
                </Link>
                <Link
                  href="/la-sociedad/seguridad"
                  className="inline-flex items-center justify-center rounded-full border border-(--border-gold) px-8 py-3 text-center text-xs tracking-[0.14em] transition-colors duration-300 hover:bg-(--color-magenta) hover:border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base) [font-family:var(--font-playfair)]"
                  style={{ color: 'var(--color-gold-light)' }}
                >
                  Consentimiento →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

