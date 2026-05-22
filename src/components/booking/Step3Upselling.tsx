'use client'

import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Minus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import { BookingBottomBar } from '@/components/booking/BookingBottomBar'
import { BookingFlowHeader } from '@/components/booking/BookingFlowHeader'
import { BookingSelectionDetail } from '@/components/booking/BookingSelectionDetail'
import { BookingTocadorRow } from '@/components/booking/BookingTocadorRow'
import { useBookingFlow } from '@/hooks/useBookingFlow'
import { STEP3_TOCADOR_COPY } from '@/lib/booking-tocador-copy'
import {
  BOUTIQUE_PACKS,
  getBoutiquePackById,
  getBoutiquePackPriceEuros,
  type BoutiquePack,
} from '@/lib/boutique-packs'
import { boutiqueRarityLabel } from '@/lib/boutique-rarity'
import { formatCurrency } from '@/lib/utils'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

type TocadorPackId = (typeof BOUTIQUE_PACKS)[number]['id']

interface TocadorSelectionPanelProps {
  rows: BoutiquePack[]
  total: number
  onRemove: (id: TocadorPackId) => void
}

function TocadorSelectionPanel({ rows, total, onRemove }: TocadorSelectionPanelProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <aside
      className="hidden flex-col rounded-2xl border border-white/12 bg-(--color-bg-subtle) p-4 lg:flex lg:sticky lg:top-[calc(var(--layout-nav-height)+env(safe-area-inset-top,0px)+5rem)]"
      aria-label={STEP3_TOCADOR_COPY.selectionHeading}
    >
      <h3 className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.2em] text-(--color-text-secondary)">
        {STEP3_TOCADOR_COPY.selectionHeading}
      </h3>

      <div className="mt-3 min-h-0 flex-1">
        {rows.length === 0 ? (
          <p className="font-(--font-inter) text-sm leading-relaxed text-(--color-text-muted)">
            {STEP3_TOCADOR_COPY.selectionEmpty}
          </p>
        ) : (
          <ul className="space-y-1.5">
            <AnimatePresence initial={false}>
              {rows.map((pack) => (
                <motion.li
                  key={pack.id}
                  layout={!shouldReduceMotion}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.2, ease: SENSUAL_EASE }}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-(--color-bg-elevated) px-2 py-1.5"
                >
                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded border border-white/10">
                    <Image src={pack.imageSrc} alt="" fill sizes="36px" className="object-cover object-center" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-(--font-inter) text-xs text-white">{pack.name}</p>
                    <p className="font-(--font-jetbrains) text-[9px] text-(--color-text-muted)">
                      {formatCurrency(getBoutiquePackPriceEuros(pack.price))}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemove(pack.id as TocadorPackId)}
                    className="inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-white/15 text-(--color-text-secondary) transition-colors hover:border-(--color-magenta)/45 hover:text-(--color-magenta-glow) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta)"
                    aria-label={`${STEP3_TOCADOR_COPY.removeLabel} ${pack.name}`}
                  >
                    <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>

      <div className="mt-3 border-t border-white/10 pt-3">
        <p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.16em] text-(--color-text-muted)">
          {STEP3_TOCADOR_COPY.selectionTotalLabel}
        </p>
        <p className="mt-0.5 font-(--font-playfair) text-xl text-(--color-gold)">{formatCurrency(total)}</p>
      </div>
    </aside>
  )
}

export function Step3Upselling() {
  const router = useRouter()
  const { state, updateStep3, getTotalPrice } = useBookingFlow()

  const selected = state.step3.selectedUpsells as TocadorPackId[]
  const [focusId, setFocusId] = useState<TocadorPackId | null>(BOUTIQUE_PACKS[0]?.id ?? null)

  const selectedRows = useMemo(
    () =>
      selected
        .map((id) => getBoutiquePackById(id))
        .filter((p): p is BoutiquePack => Boolean(p)),
    [selected],
  )

  const focusPack = useMemo(() => {
    const id = focusId ?? selected[selected.length - 1] ?? BOUTIQUE_PACKS[0]?.id
    return id ? getBoutiquePackById(id) : undefined
  }, [focusId, selected])

  const total = getTotalPrice()

  const handleAdd = (id: TocadorPackId) => {
    if (selected.includes(id)) return
    updateStep3({ selectedUpsells: [...selected, id] })
    setFocusId(id)
  }

  const handleRemove = (id: TocadorPackId) => {
    const next = selected.filter((x) => x !== id)
    updateStep3({ selectedUpsells: next })
    if (focusId === id) setFocusId((next[next.length - 1] as TocadorPackId | undefined) ?? BOUTIQUE_PACKS[0]?.id ?? null)
  }

  return (
    <div className="mx-auto w-full max-w-[94rem] px-4 pt-1 sm:px-8 lg:px-10">
      <BookingFlowHeader
        actLabel="III"
        title={STEP3_TOCADOR_COPY.title}
        subtitle={STEP3_TOCADOR_COPY.subtitle}
      />

      {selectedRows.length > 0 ? (
        <p className="mt-2 font-(--font-jetbrains) text-[10px] uppercase tracking-[0.14em] text-(--color-text-muted) lg:hidden">
          {selectedRows.length} {selectedRows.length === 1 ? 'kit' : 'kits'} · {formatCurrency(total)}
        </p>
      ) : null}

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start lg:gap-5">
        <div className="min-w-0 space-y-3">
          <section
            className="rounded-2xl border border-white/12 bg-(--color-bg-subtle) p-3 sm:p-4"
            aria-labelledby="tocador-catalog-heading"
          >
            <h3
              id="tocador-catalog-heading"
              className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.2em] text-(--color-text-secondary)"
            >
              {STEP3_TOCADOR_COPY.catalogHeading}
            </h3>

            <ul className="mt-2.5 space-y-1.5" role="list">
              {BOUTIQUE_PACKS.map((pack) => (
                <li key={pack.id}>
                  <BookingTocadorRow
                    pack={pack}
                    isSelected={selected.includes(pack.id)}
                    isFocused={focusId === pack.id}
                    onFocus={() => setFocusId(pack.id)}
                    onAdd={() => handleAdd(pack.id)}
                    onRemove={() => handleRemove(pack.id)}
                  />
                </li>
              ))}
            </ul>
          </section>

          {focusPack ? (
            <BookingSelectionDetail
              dense
              label="Detalle"
              title={focusPack.name}
              summary={focusPack.description}
              meta={
                <p className="font-(--font-inter) text-xs text-(--color-text-secondary)">
                  {formatCurrency(getBoutiquePackPriceEuros(focusPack.price))} ·{' '}
                  {boutiqueRarityLabel(focusPack.rarity)}
                </p>
              }
            />
          ) : null}
        </div>

        <TocadorSelectionPanel rows={selectedRows} total={total} onRemove={handleRemove} />
      </div>

      <p className="mt-2 font-(--font-inter) text-[11px] text-(--color-text-muted) lg:hidden">
        {STEP3_TOCADOR_COPY.hint}
      </p>

      <BookingBottomBar
        currentStep={3}
        isValid
        showBack
        nextLabel="CONTINUAR →"
        maxWidthClass="max-w-[94rem]"
        onBack={() => router.push('/reservar?step=2&phase=intensidad')}
        onNext={() => router.push('/reservar?step=4')}
        subtotal={total > 0 ? total : undefined}
      />
    </div>
  )
}
