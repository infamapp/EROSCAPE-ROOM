import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { IntensityLevel, MissionLevel, ItemRarity } from '@/types/booking'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatCurrency(amount: number, locale = 'es-ES'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(amount)
}
export function generateBookingId(): string {
  return crypto.randomUUID()
}
export function maskSafeWord(word: string): string {
  return '•'.repeat(Math.max(word.length, 6))
}
export function getIntensityColor(level: IntensityLevel): string {
  const map: Record<IntensityLevel, string> = {
    bajo: 'var(--color-intensity-alpha)',
    medio: 'var(--color-intensity-beta)',
    turbio: 'var(--color-intensity-omega)',
  }
  return map[level]
}
export function getMissionLevel(level: IntensityLevel): MissionLevel {
  const map: Record<IntensityLevel, MissionLevel> = {
    bajo: 'ALPHA',
    medio: 'BETA',
    turbio: 'OMEGA',
  }
  return map[level]
}

export function getRarityColor(rarity: ItemRarity): string {
  const map: Record<ItemRarity, string> = {
    comun: 'var(--color-rarity-comun)',
    descomun: 'var(--color-rarity-descomun)',
    raro: 'var(--color-rarity-raro)',
    epico: 'var(--color-rarity-epico)',
  }
  return map[rarity]
}

export function computeTotalPrice(
  basePrice: number,
  selectedUpsellIds: string[],
  upsellItems: readonly { id: string; price: number }[],
): number {
  const upsellTotal = selectedUpsellIds.reduce((sum, id) => {
    const item = upsellItems.find((u) => u.id === id)
    return sum + (item?.price ?? 0)
  }, 0)
  return basePrice + upsellTotal
}
