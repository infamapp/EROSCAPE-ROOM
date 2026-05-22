'use client'

import Image from 'next/image'
import { LockKeyhole, MapPin } from 'lucide-react'

import { getExperienceBookingSummary } from '@/lib/booking-selection-copy'
import { INTENSITY_BOOKING_OPTIONS } from '@/lib/booking-intensity-copy'
import { getBoutiquePackPriceEuros, type BoutiquePack } from '@/lib/boutique-packs'
import { getExperienceCardImage } from '@/lib/experiences/visuals'
import { STEP5_CHECKOUT_COPY } from '@/lib/booking-checkout-copy'
import { formatCurrency } from '@/lib/utils'
import type { IntensityLevel } from '@/types/booking'

export interface CheckoutOrderSummaryProps {
  experienceSlug: string
  experienceTitle: string
  cityDisplayName: string
  dateLine: string
  intensityLevel: IntensityLevel | null
  selectedTocadorPacks: readonly BoutiquePack[]
  basePrice: number
  tocadorTotal: number
  total: number
}

function getSelectedIntensityLabel(level: IntensityLevel | null): string | null {
  if (!level) return null
  return INTENSITY_BOOKING_OPTIONS.find((o) => o.level === level)?.title ?? null
}

export function CheckoutOrderSummary({
  experienceSlug,
  experienceTitle,
  cityDisplayName,
  dateLine,
  intensityLevel,
  selectedTocadorPacks,
  basePrice,
  tocadorTotal,
  total,
}: CheckoutOrderSummaryProps) {
  const visual = getExperienceCardImage(experienceSlug, experienceTitle)
  const summary = getExperienceBookingSummary(experienceSlug)
  const intensityLabel = getSelectedIntensityLabel(intensityLevel)

  return (
    <section
      className="overflow-hidden rounded-2xl border border-white/12 bg-(--color-bg-subtle)"
      aria-labelledby="checkout-order-heading"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[2/1]">
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center"
          priority
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-(--color-bg-subtle) to-transparent" />
      </div>

      <div className="p-4 sm:p-5">
        <h3
          id="checkout-order-heading"
          className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.2em] text-(--color-text-secondary)"
        >
          {STEP5_CHECKOUT_COPY.summaryHeading}
        </h3>

        <h4 className="mt-2 font-(--font-playfair) text-xl text-white sm:text-2xl">{experienceTitle}</h4>

        {summary ? (
          <p className="mt-2 font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary)">
            {summary.summary}
          </p>
        ) : null}

        <ul className="mt-4 space-y-2 font-(--font-inter) text-xs text-(--color-text-secondary)">
          <li className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-(--color-magenta-glow)" aria-hidden="true" />
            <span>
              <span className="text-(--color-text-muted)">Ciudad · </span>
              {cityDisplayName}
            </span>
          </li>
          <li>
            <span className="text-(--color-text-muted)">Fecha · </span>
            {dateLine}
          </li>
          {intensityLabel ? (
            <li>
              <span className="text-(--color-text-muted)">Intensidad · </span>
              {intensityLabel}
            </li>
          ) : null}
        </ul>

        {selectedTocadorPacks.length > 0 ? (
          <div className="mt-4 border-t border-white/10 pt-4">
            <p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.16em] text-(--color-text-muted)">
              {STEP5_CHECKOUT_COPY.tocadorHeading}
            </p>
            <ul className="mt-2 space-y-1.5">
              {selectedTocadorPacks.map((pack) => (
                <li
                  key={pack.id}
                  className="flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-(--color-bg-elevated) px-2.5 py-2"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded border border-white/10">
                      <Image src={pack.imageSrc} alt="" fill sizes="32px" className="object-cover object-center" />
                    </div>
                    <span className="truncate text-xs text-white">{pack.name}</span>
                  </div>
                  <span className="shrink-0 font-(--font-jetbrains) text-[10px] text-(--color-text-secondary)">
                    {formatCurrency(getBoutiquePackPriceEuros(pack.price))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="mt-4 border-t border-white/10 pt-4 font-(--font-inter) text-xs italic text-(--color-text-muted)">
            {STEP5_CHECKOUT_COPY.tocadorEmpty}
          </p>
        )}

        <div className="mt-4 rounded-lg border border-(--color-gold)/25 bg-(--color-bg-elevated) px-3 py-2.5">
          <div className="flex items-start gap-2">
            <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-(--color-gold-light)" aria-hidden="true" />
            <p className="font-(--font-inter) text-xs text-(--color-text-muted)">
              {STEP5_CHECKOUT_COPY.statementLabel}:{' '}
              <span className="text-white">{STEP5_CHECKOUT_COPY.statementValue}</span>
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-2 border-t border-white/10 pt-4 font-(--font-inter) text-sm text-(--color-text-secondary)">
          <div className="flex justify-between gap-2">
            <span>{STEP5_CHECKOUT_COPY.lineBase}</span>
            <span>{formatCurrency(basePrice)}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span>{STEP5_CHECKOUT_COPY.lineTocador}</span>
            <span>{formatCurrency(tocadorTotal)}</span>
          </div>
          <div className="flex justify-between gap-2 border-t border-white/10 pt-2 font-(--font-playfair) text-lg text-(--color-gold)">
            <span>{STEP5_CHECKOUT_COPY.lineTotal}</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
