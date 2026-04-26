import type { IntensityLevel, MissionLevel } from './booking'

export interface City {
  slug: string
  displayName: string
  barrio: string
  svgX: string
  svgY: string
}

export interface ExperienceCard {
  n: number
  slug: string
  title: string
  intensity: IntensityLevel
  missionLevel: MissionLevel
  duration: number
  maxParticipants: number
  basePrice: number
}

export interface Experience extends ExperienceCard {
  citySlug: string
}
