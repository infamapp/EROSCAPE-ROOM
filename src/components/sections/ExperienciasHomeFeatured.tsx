'use client'

import { useState } from 'react'

import { ExperienciasHomeCatalog } from '@/components/sections/ExperienciasHomeCatalog'
import { SpainMapSection } from '@/components/sections/SpainMapSection'
import { CITIES } from '@/lib/constants'

type CitySlug = (typeof CITIES)[number]['slug']

export function ExperienciasHomeFeatured() {
  const [activeCity, setActiveCity] = useState<CitySlug>('madrid')

  return (
    <>
      <SpainMapSection activeCitySlug={activeCity} onSelectCity={setActiveCity} />
      <ExperienciasHomeCatalog
        layout="featured"
        activeCitySlug={activeCity}
        onActiveCityChange={setActiveCity}
      />
    </>
  )
}
