import type { CompanyType } from '@/types/booking'

export interface ParticipantLimits {
  min: number
  max: number
  initial: number
}

export const PARTICIPANT_LIMITS: Record<CompanyType, ParticipantLimits> = {
  pareja: { min: 2, max: 2, initial: 2 },
  rollete: { min: 1, max: 2, initial: 1 },
  'plan-golfo': { min: 2, max: 10, initial: 2 },
  swinger: { min: 2, max: 10, initial: 2 },
}

export function getParticipantLimits(companyType: CompanyType | null): ParticipantLimits | null {
  if (!companyType) return null
  return PARTICIPANT_LIMITS[companyType]
}

export function resizeParticipantNames(names: string[], limits: ParticipantLimits): string[] {
  const targetLen = Math.min(Math.max(names.length, limits.initial), limits.max)
  if (names.length === targetLen) return names
  if (names.length > targetLen) return names.slice(0, targetLen)
  return [...names, ...Array(targetLen - names.length).fill('')]
}

export function areParticipantNamesValid(companyType: CompanyType | null, names: string[]): boolean {
  const limits = getParticipantLimits(companyType)
  if (!limits) return false
  if (names.length < limits.min || names.length > limits.max) return false
  return names.every((name) => name.trim().length > 0)
}
