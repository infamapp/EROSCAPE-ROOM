import { cn } from '@/lib/utils'
import { getTemperatureLabel, type ItemRarity } from '@/types/booking'

function rarityColorVar(rarity: ItemRarity): string {
  switch (rarity) {
    case 'comun':
      return 'var(--color-rarity-comun)'
    case 'descomun':
      return 'var(--color-rarity-descomun)'
    case 'raro':
      return 'var(--color-rarity-raro)'
    case 'epico':
      return 'var(--color-rarity-epico)'
  }
}

export interface RarityBadgeProps {
  rarity: ItemRarity
  className?: string
}

export function RarityBadge({ rarity, className }: RarityBadgeProps) {
  const c = rarityColorVar(rarity)
  return (
    <span
      className={cn(
        'inline-block rounded-full px-2 py-0.5 font-[var(--font-jetbrains)] text-[10px] uppercase tracking-widest',
        className,
      )}
      style={{
        color: c,
        border: `1px solid color-mix(in srgb, ${c} 55%, transparent)`,
        background: `color-mix(in srgb, ${c} 12%, var(--color-bg-elevated))`,
      }}
    >
      {getTemperatureLabel(rarity)}
    </span>
  )
}
