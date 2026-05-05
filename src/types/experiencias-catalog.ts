export type ExperienciasCatalogIntensity = 'ALPHA' | 'BETA' | 'OMEGA'

export type ExperienciasCatalogAvailability =
  | 'DISPONIBLE'
  | 'POCAS PLAZAS'
  | 'AGOTADO'
  | 'PRÓXIMAMENTE'

export interface ExperienciasCatalogItem {
  slug: string
  title: string
  intensity: ExperienciasCatalogIntensity
  availability: ExperienciasCatalogAvailability
  description: string
  durationMin: number
  capacity: number
  priceFrom: number
  isComingSoon: boolean
}
