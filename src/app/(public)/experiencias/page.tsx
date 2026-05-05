'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState, type ReactNode } from 'react'

import { CatalogExperienceCard } from '@/components/marketing/CatalogExperienceCard'
import { CITIES } from '@/lib/constants'
import { EXPERIENCIAS_CATALOG_ITEMS } from '@/lib/experiences/catalog-items'
import { cn } from '@/lib/utils'
import type { ExperienciasCatalogIntensity, ExperienciasCatalogItem } from '@/types/experiencias-catalog'

type IntensityFilter = 'all' | ExperienciasCatalogIntensity

interface ErosJson {
  experiences: Record<string, { name: unknown; description: unknown }>
  thematic_rooms: { themes: Array<{ name: unknown; desc: unknown }> }
  final_rooms: { rooms: Array<{ name: unknown; desc: unknown }> }
}

type ModeKey = 'lovers' | 'golf' | 'libertino' | 'secreto'

interface ModeCardItem {
  key: ModeKey
  title: string
  description: string
  imageSrc: string
  accentClassName: string
}

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

/** Superficie tipo catálogo: elevada + borde token + glow card (DesignTokens v2) */
const SURFACE_CARD =
  'rounded-2xl border-(--border-subtle) bg-(--color-bg-elevated) [box-shadow:var(--glow-card)]'

const INTENSITY_FILTERS_FULL: readonly { id: IntensityFilter; label: string }[] = [
  { id: 'all', label: 'TODAS' },
  { id: 'ALPHA', label: 'ALPHA' },
  { id: 'BETA', label: 'BETA' },
  { id: 'OMEGA', label: 'OMEGA' },
] as const

const FALLBACK_MODES: readonly ModeCardItem[] = [
  {
    key: 'lovers',
    title: 'Lovers',
    description:
      'Para parejas que quieren reconectar, jugar y volver a mirarse distinto. Complicidad, tensión suave y un final cuidado.',
    imageSrc: '/habitacioveneciana.png',
    accentClassName:
      'hover:[box-shadow:var(--glow-magenta)] hover:border-[color-mix(in_srgb,var(--color-magenta)_55%,transparent)]',
  },
  {
    key: 'golf',
    title: 'Plan Golfo',
    description:
      'Para amigos con tensión, rolletes o parejas aventureras. Risas nerviosas, adrenalina y decisiones rápidas.',
    imageSrc: '/ritualmedianoche.png',
    accentClassName:
      'hover:[box-shadow:var(--glow-gold)] hover:border-[color-mix(in_srgb,var(--color-gold)_45%,transparent)]',
  },
  {
    key: 'libertino',
    title: 'Libertino',
    description:
      'Para mentes muy abiertas. Tres niveles de intensidad hacia una exploración total, siempre consensuada.',
    imageSrc: '/espejonegro.png',
    accentClassName:
      'hover:[box-shadow:var(--glow-intense)] hover:border-[color-mix(in_srgb,var(--color-omega-badge)_50%,transparent)]',
  },
  {
    key: 'secreto',
    title: 'El Secreto',
    description:
      'No desvelamos pruebas ni recorrido. El misterio es parte del placer: entrás sin mapa, salís con historia.',
    imageSrc: '/lamascarada.png',
    accentClassName:
      'hover:[box-shadow:0_0_28px_color-mix(in_srgb,var(--color-purple-muted)_35%,transparent)] hover:border-[color-mix(in_srgb,var(--color-purple-muted)_40%,transparent)]',
  },
] as const

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function getString(value: unknown): string | null {
  return typeof value === 'string' ? value : null
}

function parseErosJson(value: unknown): ErosJson | null {
  if (!isRecord(value)) return null
  const experiences = value.experiences
  const thematicRooms = value.thematic_rooms
  const finalRooms = value.final_rooms

  if (!isRecord(experiences)) return null
  if (!isRecord(thematicRooms) || !Array.isArray(thematicRooms.themes)) return null
  if (!isRecord(finalRooms) || !Array.isArray(finalRooms.rooms)) return null

  return {
    experiences: experiences as Record<string, { name: unknown; description: unknown }>,
    thematic_rooms: { themes: thematicRooms.themes as Array<{ name: unknown; desc: unknown }> },
    final_rooms: { rooms: finalRooms.rooms as Array<{ name: unknown; desc: unknown }> },
  }
}

const headerReveal = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: SENSUAL_EASE } },
}

const modeCardReveal = {
  hidden: { opacity: 0, y: 18 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: SENSUAL_EASE, delay: index * 0.06 },
  }),
}

function modeImageForKey(key: ModeKey): string {
  switch (key) {
    case 'lovers':
      return '/habitacioveneciana.png'
    case 'golf':
      return '/ritualmedianoche.png'
    case 'libertino':
      return '/espejonegro.png'
    case 'secreto':
      return '/lamascarada.png'
    default: {
      const _e: never = key
      return _e
    }
  }
}

interface EyebrowProps {
  children: ReactNode
}

function Eyebrow({ children }: EyebrowProps) {
  return (
    <p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.22em] text-(--color-text-muted) sm:text-[11px]">
      {children}
    </p>
  )
}

interface ModeCardProps {
  item: ModeCardItem
  index: number
}

function ModeCard({ item, index }: ModeCardProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.article
      custom={index}
      variants={shouldReduceMotion ? undefined : modeCardReveal}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={{ once: true, margin: '-30%' }}
      className={cn(
        'group relative overflow-hidden p-6 backdrop-blur-xl transition-[box-shadow,border-color,transform] duration-500 hover:-translate-y-0.5 sm:p-8',
        SURFACE_CARD,
        item.accentClassName,
      )}
      aria-label={item.title}
    >
      <div className="pointer-events-none absolute inset-0 opacity-90" aria-hidden="true">
        <Image
          src={item.imageSrc}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover opacity-35"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'var(--gradient-card)' }}
        />
      </div>

      <div className="relative">
        <Eyebrow>Las reglas del juego</Eyebrow>
        <h3 className="mt-3 text-2xl font-bold tracking-[0.04em] text-(--color-text-primary) [font-family:var(--font-playfair)] sm:text-3xl">
          {item.title}
        </h3>
        <p className="mt-4 max-w-xl font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary) sm:text-base">
          {item.description}
        </p>
      </div>
    </motion.article>
  )
}

interface SectionDividerProps {
  id?: string
  children: ReactNode
}

function SectionDivider({ id, children }: SectionDividerProps) {
  return (
    <div
      id={id}
      className="relative border-y border-[color-mix(in_srgb,var(--color-magenta-dim)_35%,transparent)] bg-(--color-bg-subtle)/50 py-20 sm:py-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-70"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(185,48,158,0.35), rgba(232,160,64,0.25), transparent)',
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  )
}

export default function ExperienciasPage() {
  const shouldReduceMotion = useReducedMotion()
  const [activeCitySlug, setActiveCitySlug] = useState<(typeof CITIES)[number]['slug']>('madrid')
  const [intensity, setIntensity] = useState<IntensityFilter>('all')
  const [modesOverride, setModesOverride] = useState<readonly ModeCardItem[] | null>(null)
  const [themesIntro, setThemesIntro] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    async function loadCopy() {
      try {
        const res = await fetch('/eros.json', { cache: 'force-cache' })
        if (!res.ok) return
        const raw: unknown = await res.json()
        const parsed = parseErosJson(raw)
        if (!parsed) return
        if (!isMounted) return

        const nextModes: ModeCardItem[] = (['lovers', 'golf', 'libertino', 'secreto'] as const).map((key) => {
          const node = parsed.experiences[key]
          const title = node ? getString(node.name) : null
          const description = node ? getString(node.description) : null
          const base = FALLBACK_MODES.find((m) => m.key === key) ?? FALLBACK_MODES[0]

          return {
            key,
            title: title ?? base.title,
            description: description ?? base.description,
            imageSrc: modeImageForKey(key),
            accentClassName: base.accentClassName,
          }
        })

        setModesOverride(nextModes)

        const firstTheme = parsed.thematic_rooms.themes[0]
        const firstThemeText = firstTheme ? getString(firstTheme.desc) : null
        setThemesIntro(firstThemeText)
      } catch {
        // fallback en memoria (FALLBACK_MODES)
      }
    }
    void loadCopy()
    return () => {
      isMounted = false
    }
  }, [])

  const modes = modesOverride ?? FALLBACK_MODES

  const filteredRooms: readonly ExperienciasCatalogItem[] = useMemo(() => {
    if (intensity === 'all') return EXPERIENCIAS_CATALOG_ITEMS
    return EXPERIENCIAS_CATALOG_ITEMS.filter((item) => item.intensity === intensity)
  }, [intensity])

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: 'var(--color-bg-base)' }}>
      {/* Capa inmersiva (Design System: no fondo plano; halo desde tokens) */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[min(70vh,520px)]"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 120% 80% at 50% -20%, color-mix(in srgb, var(--color-purple-mid) 22%, transparent) 0%, transparent 65%)',
        }}
      />

      <main className="relative z-0 pt-20 sm:pt-24">
        <section className="relative scroll-mt-24 border-t border-[color-mix(in_srgb,var(--color-magenta)_18%,transparent)] py-14 sm:py-20 lg:py-24">
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
              <Eyebrow>Catálogo</Eyebrow>

              <h1
                className="mt-5 font-bold leading-[1.08] tracking-[0.04em] text-(--color-gold-light) [font-family:var(--font-playfair)]"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}
              >
                ELEGÍ TU NOCHE
              </h1>

              <div className="mx-auto mt-3 flex justify-center">
                <div className="h-px w-24 bg-(--color-gold)/70" aria-hidden="true" />
              </div>

              <p className="mt-5 font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary) sm:text-base">
                Dos decisiones te separan del deseo. Primero, elegí cómo jugás. Después, elegí dónde.
              </p>
            </motion.header>
          </div>
        </section>

        <section id="modos-intensidad" className="scroll-mt-24 pb-6 sm:pb-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <Eyebrow>La intensidad</Eyebrow>
              <h2 className="mt-3 text-2xl font-bold tracking-[0.06em] text-(--color-text-primary) [font-family:var(--font-playfair)] sm:text-3xl">
                Las reglas del juego
              </h2>
              <p className="mt-3 font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary) sm:text-base">
                Elegí el modo que mejor define tu noche. Todo sucede con discreción, cuidado y consentimiento.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
              {modes.map((item, index) => (
                <ModeCard key={item.key} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>

        <SectionDivider id="el-escenario">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <Eyebrow>Ahora elegí tu escenario</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-[0.06em] text-(--color-text-primary) [font-family:var(--font-playfair)] sm:text-5xl">
              EL ESCENARIO.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary) sm:text-base">
              Cada sala es un universo irrepetible{themesIntro ? `. ${themesIntro}` : '.'}
            </p>
          </div>
        </SectionDivider>

        <section
          id="catalogo-salas"
          className="relative scroll-mt-24 border-t border-[color-mix(in_srgb,var(--color-magenta)_12%,transparent)] py-14 sm:py-20 lg:py-28"
          style={{ background: 'var(--color-bg-base)' }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p
              className="mb-3 font-(--font-jetbrains) text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted) sm:text-[11px]"
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
                  const isActive = activeCitySlug === city.slug
                  return (
                    <button
                      key={city.slug}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveCitySlug(city.slug)}
                      className={cn(
                        'shrink-0 border-b-2 pb-2 font-(--font-playfair) text-sm tracking-wide transition-colors duration-300 sm:text-base',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)',
                        isActive
                          ? 'border-(--color-magenta) text-(--color-text-primary)'
                          : 'border-transparent text-(--color-text-muted) hover:text-(--color-text-secondary)',
                      )}
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
              <div role="group" aria-labelledby="catalogo-intensidad-label" className="flex flex-wrap gap-2 sm:gap-2.5">
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
                          ? 'text-(--color-text-primary)'
                          : 'border border-[color-mix(in_srgb,var(--color-magenta)_35%,transparent)] bg-transparent text-(--color-text-secondary) hover:border-[color-mix(in_srgb,var(--color-magenta)_55%,transparent)]',
                      )}
                      style={isOn ? { background: 'var(--gradient-cta)' } : undefined}
                    >
                      {pill.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={intensity}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: SENSUAL_EASE }}
                className="mt-12 grid gap-5 sm:mt-14 sm:gap-6 lg:grid-cols-3"
              >
                {filteredRooms.map((item, index) => (
                  <CatalogExperienceCard key={item.slug} item={item} citySlug={activeCitySlug} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredRooms.length === 0 ? (
              <p className="mt-10 text-center font-(--font-inter) text-sm text-(--color-text-muted)">
                No hay salas con este filtro en este momento.
              </p>
            ) : null}
          </div>
        </section>

        <section id="habitacion-final" className="scroll-mt-24 border-t border-[color-mix(in_srgb,var(--color-magenta)_12%,transparent)] pb-16 pt-6 sm:pb-24 sm:pt-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div
              className={cn(
                'rounded-3xl p-8 backdrop-blur-xl sm:p-12',
                SURFACE_CARD,
              )}
              style={{
                background: 'var(--gradient-help-cta-card)',
                boxShadow: 'var(--glow-card), inset 0 1px 0 color-mix(in srgb, var(--color-gold) 12%, transparent)',
              }}
            >
              <Eyebrow>El clímax</Eyebrow>
              <h3 className="mt-3 text-2xl font-bold tracking-[0.06em] text-(--color-text-primary) [font-family:var(--font-playfair)] sm:text-3xl">
                La Habitación Final
              </h3>
              <p className="mt-4 max-w-3xl font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary) sm:text-base">
                Llegues por donde llegues, el destino siempre es el placer. Un espacio diseñado para cruzar tus propios límites.
              </p>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-start">
                <Link
                  href="/reservar"
                  className="inline-flex items-center justify-center rounded-full px-8 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-primary) transition-[filter,transform] duration-200 hover:brightness-110 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)"
                  style={{ background: 'var(--gradient-cta)' }}
                >
                  Confirmar mi noche
                </Link>
                <Link
                  href="/la-sociedad/seguridad"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--color-gold)_45%,transparent)] px-8 py-3 text-center font-(--font-playfair) text-xs tracking-[0.14em] text-(--color-text-primary) transition-colors duration-300 hover:border-transparent hover:bg-(--color-magenta) focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)"
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
