import type { ExperienciasCatalogIntensity } from '@/types/experiencias-catalog'

export function intensityPillClassName(level: ExperienciasCatalogIntensity): string {
  switch (level) {
    case 'ALPHA':
      return 'border-[color:var(--color-intensity-alpha)]/45 bg-blue-950/40 text-[var(--color-intensity-alpha)] [box-shadow:var(--glow-alpha-badge)]'
    case 'BETA':
      return 'border-[color:var(--color-intensity-beta)]/45 bg-amber-950/35 text-[var(--color-intensity-beta)] [box-shadow:var(--glow-beta-badge)]'
    case 'OMEGA':
      return 'border-[color:var(--color-omega-badge)]/55 bg-red-950/35 text-[var(--color-omega-badge)] [box-shadow:var(--glow-omega-badge)]'
    default: {
      const _e: never = level
      return _e
    }
  }
}

export function intensityPillLabel(level: ExperienciasCatalogIntensity): string {
  switch (level) {
    case 'ALPHA':
      return 'NIVEL ALPHA'
    case 'BETA':
      return 'NIVEL BETA'
    case 'OMEGA':
      return 'NIVEL OMEGA'
    default: {
      const _e: never = level
      return _e
    }
  }
}

export function intensityShowsSwords(level: ExperienciasCatalogIntensity): boolean {
  return level === 'OMEGA'
}

export function intensityImageOverlayGradientClass(level: ExperienciasCatalogIntensity): string {
  switch (level) {
    case 'ALPHA':
      return 'from-blue-900/50 via-[#080008]/75 to-[#080008]'
    case 'BETA':
      return 'from-amber-900/45 via-[#080008]/78 to-[#080008]'
    case 'OMEGA':
      return 'from-red-950/50 via-[#080008]/80 to-[#080008]'
    default: {
      const _e: never = level
      return _e
    }
  }
}
