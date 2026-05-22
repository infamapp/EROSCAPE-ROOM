import type { BoutiqueProductRarity } from '@/components/boutique/ProductCard'

export function boutiqueRarityLabel(rarity: BoutiqueProductRarity): string {
  switch (rarity) {
    case 'esencial':
      return 'ESENCIAL'
    case 'premium':
      return 'PREMIUM'
    case 'exclusivo':
      return 'EXCLUSIVO'
    default: {
      const _exhaustive: never = rarity
      return _exhaustive
    }
  }
}

export function boutiqueRarityColorVar(rarity: BoutiqueProductRarity): string {
  switch (rarity) {
    case 'esencial':
      return 'var(--color-gm-terminal)'
    case 'premium':
      return 'var(--color-magenta)'
    case 'exclusivo':
      return 'var(--color-gold)'
    default: {
      const _exhaustive: never = rarity
      return _exhaustive
    }
  }
}
