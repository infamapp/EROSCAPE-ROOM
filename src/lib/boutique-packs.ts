import type { BoutiqueProductRarity } from '@/components/boutique/ProductCard'

export interface BoutiquePack {
  id: string
  name: string
  description: string
  imageSrc: string
  rarity: BoutiqueProductRarity
  price: number
}

export const BOUTIQUE_PACKS = [
  {
    id: 'desire-box',
    name: 'Desire Box',
    description:
      'Experiencia inmersiva para parejas: pistas, aromas activables, cartas narrativas y una prueba final que desbloquea la sorpresa.',
    imageSrc: '/kits/pack5-escape-desire-box.PNG',
    rarity: 'exclusivo',
    price: 42900,
  },
  {
    id: 'sweet-connection',
    name: 'Sweet Connection',
    description:
      'Diseñado para regalar conexión y complicidad: vela aromática, aceite corporal, cartas románticas y bombones gourmet.',
    imageSrc: '/kits/pack00-sweet-connection.PNG',
    rarity: 'premium',
    price: 27900,
  },
  {
    id: 'mini-love-box',
    name: 'Mini Love Box',
    description:
      'Un pequeño detalle que lo cambia todo: osito floral, vela aromática, tarjeta romántica y aceite corporal en caja premium.',
    imageSrc: '/kits/pack00-mini-love-box.PNG',
    rarity: 'esencial',
    price: 18900,
  },
  {
    id: 'intimate-experience',
    name: 'Intimate Experience',
    description:
      'Explora nuevas sensaciones con elegancia: kit spa, sales aromáticas, cartas de fantasías y accesorios sensoriales premium.',
    imageSrc: '/kits/pack-intimate-experience.PNG',
    rarity: 'premium',
    price: 35900,
  },
  {
    id: 'after-dark',
    name: 'After Dark',
    description:
      'Activa todos los sentidos: juego de cartas extremo, accesorios premium, luces LED, altavoz Bluetooth y playlist privada.',
    imageSrc: '/kits/pack-afterdark.PNG',
    rarity: 'exclusivo',
    price: 39900,
  },
] as const satisfies readonly BoutiquePack[]

const PACK_ID_SET = new Set<string>(BOUTIQUE_PACKS.map((p) => p.id))

/** Precios en céntimos (ej. 42900 → 429,00 €). */
export function getBoutiquePackPriceEuros(priceInCents: number): number {
  return priceInCents / 100
}

export function getBoutiquePackById(id: string): BoutiquePack | undefined {
  return BOUTIQUE_PACKS.find((p) => p.id === id)
}

export function isBoutiquePackId(id: string): boolean {
  return PACK_ID_SET.has(id)
}

export function sanitizeBoutiquePackIds(ids: string[]): string[] {
  return ids.filter(isBoutiquePackId)
}
