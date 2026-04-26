'use client'

import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

import { CITIES, EXPERIENCES_TEMPLATE } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { ExperienceCard } from '@/components/sections/ExperienceCard'
import { CityMap } from '@/components/ui/CityMap'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

type CitySlug = (typeof CITIES)[number]['slug']

export function CitySelector() {
  const shouldReduceMotion = useReducedMotion()
  const [activeCity, setActiveCity] = useState<CitySlug>('madrid')
  const mapRef = useRef<HTMLDivElement | null>(null)

  const activeCityData = useMemo(() => CITIES.find((c) => c.slug === activeCity) ?? CITIES[0], [activeCity])

  const experiences = useMemo(() => {
    return EXPERIENCES_TEMPLATE.map((exp) => ({ ...exp }))
  }, [])

  useEffect(() => {
    // Preserve old ref to avoid layout shift if someone anchors to it.
    // (No logic needed now that the map is a UI primitive.)
    void mapRef.current
  }, [])

  return (
    <section id="experiencias" className="w-full py-20 sm:py-28" style={{ background: 'var(--color-bg-base)' }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2
            className="font-(--font-playfair) tracking-[0.20em] text-white"
            style={{ fontSize: 'clamp(18px, 2.6vw, 28px)' }}
          >
            ¿DÓNDE QUIERES QUE OCURRA?
          </h2>
          <p className="mt-5 font-(--font-jetbrains) text-xs sm:text-sm" style={{ color: 'var(--color-text-muted)' }}>
            5 ciudades · 5 experiencias por ciudad · Plazas limitadas
          </p>
        </div>

        <div className="mt-14">
          <div ref={mapRef} className="flex w-full justify-center">
            <CityMap
              className="w-full"
              cities={CITIES}
              activeCitySlug={activeCity}
              onSelectCity={(slug) => setActiveCity(slug as CitySlug)}
            />
          </div>
        </div>

        <div className="mt-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCity}
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0 }}
              transition={shouldReduceMotion ? undefined : { duration: 0.25, ease: SENSUAL_EASE }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-12"
            >
              {experiences.map((exp, index) => (
                <motion.div
                  key={`${activeCity}-${exp.slug}`}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={shouldReduceMotion ? undefined : { duration: 0.35, delay: index * 0.08, ease: SENSUAL_EASE }}
                  className={cn(
                    'w-full',
                    // md: keep 2-column grid, center the last card
                    index === 4 ? 'md:col-span-2 md:justify-self-center md:max-w-[520px]' : '',
                    // lg: keep card widths consistent (12-col grid)
                    index <= 2 ? 'lg:col-span-4' : '',
                    // bottom row centered: start at columns 3 and 7 (2 cards, same width as top)
                    index === 3 ? 'lg:col-span-4 lg:col-start-3' : '',
                    index === 4 ? 'lg:col-span-4 lg:col-start-7' : ''
                  )}
                >
                  <ExperienceCard experience={exp} city={activeCityData} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 text-center font-(--font-jetbrains) text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Ciudad: <span style={{ color: 'var(--color-text-secondary)' }}>{activeCityData.displayName}</span>
            {' · '}
            <Link href={`/experiencias/${activeCityData.slug}`} style={{ color: 'var(--color-magenta)' }}>
              Ver todas →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

