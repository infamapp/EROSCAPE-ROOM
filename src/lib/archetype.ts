import { ARCHETYPES } from './constants'
import type { BookingState } from '../types/booking'
import type { Archetype } from '../types/archetype'

type ArchetypeId = (typeof ARCHETYPES)[number]['id']

function getArchetypeById(id: ArchetypeId): Archetype {
  return ARCHETYPES.find((a) => a.id === id) ?? ARCHETYPES[0]
}

/**
 * Reglas v2.0 (.cursorrules), por orden de precedencia:
 * 1. Omega + 3+ upsells → Libertino
 * 2. Rollete/Swinger + Beta → Arquitecto del Placer
 * 3. Pareja + Alpha → Explorador Curioso
 * 4. Pareja + Beta + Pack sensorial → Romántico Atrevido
 * 5. Resto → Explorador Curioso
 */
export function getPlayerArchetype(state: BookingState): Archetype {
  const companyType = state.step2.companyType ?? null
  const intensityLevel = state.step2.intensityLevel ?? null
  const selectedUpsells = state.step3.selectedUpsells ?? []

  if (intensityLevel === 'turbio' && selectedUpsells.length >= 3) {
    return getArchetypeById('caos')
  }
  if ((companyType === 'rollete' || companyType === 'swinger') && intensityLevel === 'medio') {
    return getArchetypeById('arquitecto')
  }
  if (companyType === 'pareja' && intensityLevel === 'bajo') {
    return getArchetypeById('explorador')
  }
  if (companyType === 'pareja' && intensityLevel === 'medio' && selectedUpsells.includes('pack-sensorial')) {
    return getArchetypeById('romantico')
  }
  return getArchetypeById('explorador')
}
