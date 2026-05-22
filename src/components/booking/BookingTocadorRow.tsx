'use client'

import Image from 'next/image'
import { Minus, Plus } from 'lucide-react'

import type { BoutiquePack } from '@/lib/boutique-packs'
import { getBoutiquePackPriceEuros } from '@/lib/boutique-packs'
import { boutiqueRarityColorVar, boutiqueRarityLabel } from '@/lib/boutique-rarity'
import { STEP3_TOCADOR_COPY } from '@/lib/booking-tocador-copy'
import { cn, formatCurrency } from '@/lib/utils'

export interface BookingTocadorRowProps {
  pack: BoutiquePack
  isSelected: boolean
  isFocused: boolean
  onFocus: () => void
  onAdd: () => void
  onRemove: () => void
}

export function BookingTocadorRow({
  pack,
  isSelected,
  isFocused,
  onFocus,
  onAdd,
  onRemove,
}: BookingTocadorRowProps) {
  const rarityVar = boutiqueRarityColorVar(pack.rarity)
  const priceEuros = getBoutiquePackPriceEuros(pack.price)

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg border px-2.5 py-2 transition-colors sm:px-3',
        isSelected
          ? 'border-(--color-magenta)/55 bg-(--color-bg-elevated) [box-shadow:var(--glow-magenta)]'
          : 'border-white/10 bg-(--color-bg-elevated)/80',
        isFocused && !isSelected && 'border-white/22',
      )}
    >
      <button
        type="button"
        onClick={onFocus}
        className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta)"
        aria-label={`Ver detalle de ${pack.name}`}
      >
        <Image
          src={pack.imageSrc}
          alt=""
          fill
          sizes="56px"
          className="object-cover object-center"
        />
      </button>

      <button
        type="button"
        onClick={onFocus}
        className="min-w-0 flex-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-subtle)"
      >
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-(--font-playfair) text-sm text-white sm:text-[15px]">{pack.name}</p>
          <span
            className="rounded-full px-1.5 py-0.5 font-(--font-jetbrains) text-[8px] uppercase tracking-[0.14em]"
            style={{
              color: rarityVar,
              border: `1px solid color-mix(in srgb, ${rarityVar} 40%, transparent)`,
              background: `color-mix(in srgb, ${rarityVar} 10%, transparent)`,
            }}
          >
            {boutiqueRarityLabel(pack.rarity)}
          </span>
        </div>
        <p className="mt-0.5 line-clamp-1 font-(--font-inter) text-[11px] text-(--color-text-muted) sm:text-xs">
          {pack.description}
        </p>
        <p className="mt-1 font-(--font-playfair) text-xs text-(--color-gold) sm:hidden">
          {formatCurrency(priceEuros)}
        </p>
      </button>

      <p className="hidden shrink-0 font-(--font-playfair) text-sm text-(--color-gold) sm:block">
        {formatCurrency(priceEuros)}
      </p>

      {isSelected ? (
        <button
          type="button"
          onClick={onRemove}
          className={cn(
            'inline-flex shrink-0 items-center gap-1 rounded-full border border-(--color-magenta)/45 px-2.5 py-1.5',
            'font-(--font-jetbrains) text-[10px] uppercase tracking-[0.12em] text-(--color-magenta-glow)',
            'transition-colors hover:bg-(--color-magenta)/12',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta)',
          )}
          aria-label={`Quitar ${pack.name}`}
        >
          <Minus className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">{STEP3_TOCADOR_COPY.removeLabel}</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={onAdd}
          className={cn(
            'inline-flex shrink-0 items-center gap-1 rounded-full border border-white/18 bg-(--color-bg-subtle) px-2.5 py-1.5',
            'font-(--font-jetbrains) text-[10px] uppercase tracking-[0.12em] text-white',
            'transition-colors hover:border-(--color-magenta)/45 hover:text-(--color-magenta-glow)',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta)',
          )}
          aria-label={`Añadir ${pack.name}`}
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">{STEP3_TOCADOR_COPY.addLabel}</span>
        </button>
      )}
    </div>
  )
}
