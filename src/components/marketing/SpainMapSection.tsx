'use client'

import { CityMap } from '@/components/ui/CityMap'
import { CITIES, CITY_AVAILABILITY_COPY } from '@/lib/constants'

type CitySlug = (typeof CITIES)[number]['slug']

export interface SpainMapSectionProps {
  activeCitySlug: CitySlug
  onSelectCity: (slug: CitySlug) => void
}

export function SpainMapSection({ activeCitySlug, onSelectCity }: SpainMapSectionProps) {
  return (
    <section
      id="zona-operaciones"
      className="w-full scroll-mt-24 border-t border-[rgba(185,48,158,0.12)] py-12 sm:py-16 lg:py-20"
      style={{ background: 'var(--color-bg-base)' }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2
            className="font-(--font-playfair) tracking-[0.20em] text-white"
            style={{ fontSize: 'clamp(18px, 2.6vw, 28px)' }}
          >
            ¿DÓNDE QUIERES QUE OCURRA?
          </h2>
          <p className="mt-3 font-(--font-jetbrains) text-[11px] text-(--color-text-muted) sm:mt-5 sm:text-sm">
            {CITY_AVAILABILITY_COPY.tagline}
          </p>
          <p className="mt-2 font-(--font-inter) text-xs leading-relaxed text-(--color-text-muted)">
            {CITY_AVAILABILITY_COPY.detail}
          </p>
        </div>

        <div className="mt-8 flex w-full justify-center sm:mt-12">
          <CityMap
            className="w-full max-w-4xl"
            cities={CITIES}
            activeCitySlug={activeCitySlug}
            onSelectCity={(slug) => onSelectCity(slug as CitySlug)}
          />
        </div>
      </div>
    </section>
  )
}
