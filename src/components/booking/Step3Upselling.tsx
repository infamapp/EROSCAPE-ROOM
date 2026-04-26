'use client'

import type { LucideIcon } from 'lucide-react'
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion'
import { Clock, Clock3, Cpu, Crown, Gift, Package, Swords } from 'lucide-react'
import { createPortal } from 'react-dom'
import type { RefObject } from 'react'
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'

import { StepHeader } from '@/components/booking/StepHeader'
import { RarityBadge } from '@/components/ui/RarityBadge'
import { useBookingFlow } from '@/hooks/useBookingFlow'
import { UPSELL_ITEMS } from '@/lib/constants'
import { cn, formatCurrency } from '@/lib/utils'
import type { ItemRarity } from '@/types/booking'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]
const LOOT_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const arsenalRowVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 420, damping: 18, mass: 0.6 },
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2, ease: SENSUAL_EASE } },
} as const

type UpsellId = (typeof UPSELL_ITEMS)[number]['id']

const ICON_BY_NAME: Record<(typeof UPSELL_ITEMS)[number]['icon'], LucideIcon> = {
  Package,
  Clock,
  Clock3,
  Cpu,
  Gift,
}

function getRarityCssVar(rarity: ItemRarity): string {
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

interface HexFrameProps {
  iconName: string
  rarity: ItemRarity
  isSelected: boolean
  selectionPulse: boolean
  size?: 40 | 60
}

function HexFrame({ iconName, rarity, isSelected, selectionPulse, size = 60 }: HexFrameProps) {
  const shouldReduceMotion = useReducedMotion()
  const rawClipId = useId()
  const clipId = `hex-${rawClipId.replace(/:/g, '')}`
  const color = getRarityCssVar(rarity)
  const Icon = ICON_BY_NAME[iconName as keyof typeof ICON_BY_NAME] ?? Package
  const dim = size
  const iconClass = size === 60 ? 'h-7 w-7' : 'h-5 w-5'
  const poly = '30,4 56,17 56,43 30,56 4,43 4,17'

  return (
    <motion.div
      className="relative shrink-0"
      style={{
        width: dim,
        height: dim,
        filter: isSelected ? 'brightness(1.3)' : undefined,
        boxShadow: isSelected ? `0 0 20px ${color}` : undefined,
      }}
      animate={
        shouldReduceMotion || !selectionPulse
          ? undefined
          : { rotate: [30, 0], scale: [1, 1.15, 1] }
      }
      transition={
        shouldReduceMotion || !selectionPulse
          ? undefined
          : { rotate: { type: 'spring', stiffness: 260, damping: 18 }, scale: { duration: 0.45, ease: SENSUAL_EASE } }
      }
    >
      <svg width={dim} height={dim} viewBox="0 0 60 60" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <clipPath id={clipId}>
            <polygon points={poly} />
          </clipPath>
        </defs>
        <polygon
          points={poly}
          fill="var(--color-bg-elevated)"
          fillOpacity="0.75"
          stroke={color}
          strokeWidth="2"
        />
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ clipPath: `url(#${clipId})` }}
      >
        <Icon className={iconClass} style={{ color }} aria-hidden="true" />
      </div>
    </motion.div>
  )
}

interface LootFlightPayload {
  id: UpsellId
  fromX: number
  fromY: number
  toX: number
  toY: number
  rarity: ItemRarity
  iconName: string
}

interface UpsellItemCardProps {
  item: (typeof UPSELL_ITEMS)[number]
  isSelected: boolean
  selectionPulse: boolean
  onToggle: (id: UpsellId, rect: DOMRect | null) => void
  hexRef: (el: HTMLDivElement | null) => void
}

function UpsellItemCard({ item, isSelected, selectionPulse, onToggle, hexRef }: UpsellItemCardProps) {
  const rarityColor = getRarityCssVar(item.rarity)
  const innerRef = useRef<HTMLDivElement | null>(null)

  const handleToggle = () => {
    const rect = innerRef.current?.getBoundingClientRect() ?? null
    onToggle(item.id, rect)
  }

  return (
    <motion.article
      layout
      className={cn(
        'relative rounded-2xl border-2 p-4 transition-shadow md:p-5',
        'focus-within:ring-2 focus-within:ring-(--color-magenta) focus-within:ring-offset-2 focus-within:ring-offset-(--color-bg-base)'
      )}
      style={{
        borderColor: isSelected ? rarityColor : 'rgba(185,48,158,0.2)',
        background: isSelected ? 'rgba(185,48,158,0.10)' : 'var(--color-bg-elevated)',
        boxShadow: 'var(--glow-card)',
      }}
      animate={isSelected ? { y: -4 } : { y: 0 }}
      transition={{ type: 'spring', stiffness: 380, damping: 26 }}
    >
      {item.popular ? (
        <div
          className="absolute right-3 top-1 flex items-center gap-1 rounded-full px-2 py-0.5 font-(--font-jetbrains) text-[9px] tracking-wide"
          style={{ border: 'var(--border-gold)', color: 'var(--color-gold)', background: 'rgba(203,123,27,0.12)' }}
        >
          <Crown className="h-3 w-3" style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
          EL FAVORITO
        </div>
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div ref={(el) => hexRef(el)} className="flex shrink-0 justify-center sm:justify-start">
          <div ref={innerRef}>
            <HexFrame iconName={item.icon} rarity={item.rarity} isSelected={isSelected} selectionPulse={selectionPulse} />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-(--font-playfair) text-lg text-white">{item.name}</h3>
          <div className="mt-2">
            <RarityBadge rarity={item.rarity} />
          </div>
          <p className="mt-2 font-(--font-inter) text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            {item.description}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-stretch gap-3 sm:items-end sm:text-right">
          <p className="font-(--font-playfair) text-xl text-white">{formatCurrency(item.price)}</p>
          <button
            type="button"
            onClick={handleToggle}
            className="rounded-full px-4 py-2 font-(--font-jetbrains) text-xs tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)"
            style={
              isSelected
                ? { background: 'transparent', border: `2px solid ${rarityColor}`, color: rarityColor }
                : { background: 'var(--color-bg-subtle)', border: '2px solid rgba(185,48,158,0.25)', color: 'var(--color-text-primary)' }
            }
          >
            {isSelected ? 'SACARLO' : 'LO QUIERO'}
          </button>
        </div>
      </div>
    </motion.article>
  )
}

function LootFlightClone({ payload, onDone }: { payload: LootFlightPayload; onDone: () => void }) {
  const shouldReduceMotion = useReducedMotion()
  const color = getRarityCssVar(payload.rarity)
  const Icon = ICON_BY_NAME[payload.iconName as keyof typeof ICON_BY_NAME] ?? Package

  useEffect(() => {
    if (!shouldReduceMotion) return undefined
    const t = window.setTimeout(() => onDone(), 0)
    return () => window.clearTimeout(t)
  }, [shouldReduceMotion, onDone])

  if (shouldReduceMotion) return null

  return (
    <motion.div
      className="pointer-events-none fixed z-220 flex h-14 w-14 items-center justify-center rounded-lg border-2"
      style={{
        borderColor: color,
        background: 'var(--color-bg-elevated)',
        boxShadow: `0 0 18px ${color}`,
        left: 0,
        top: 0,
        x: payload.fromX - 28,
        y: payload.fromY - 28,
      }}
      initial={{ scale: 1, opacity: 1 }}
      animate={{
        x: payload.toX - 28,
        y: payload.toY - 28,
        scale: 0.75,
        opacity: 0.15,
      }}
      transition={{ duration: 0.4, ease: LOOT_EASE }}
      onAnimationComplete={onDone}
    >
      <Icon className="h-7 w-7" style={{ color }} aria-hidden="true" />
    </motion.div>
  )
}

interface ArsenalPanelProps {
  selectedIds: UpsellId[]
  panelDropRef: RefObject<HTMLDivElement | null>
  className?: string
}

function ArsenalPanel({ selectedIds, panelDropRef, className }: ArsenalPanelProps) {
  const shouldReduceMotion = useReducedMotion()
  const rows = useMemo(
    () => selectedIds.map((id) => UPSELL_ITEMS.find((u) => u.id === id)).filter((u): u is (typeof UPSELL_ITEMS)[number] => Boolean(u)),
    [selectedIds],
  )
  const total = useMemo(() => rows.reduce((s, u) => s + u.price, 0), [rows])

  return (
    <aside
      className={cn('flex flex-col rounded-2xl border p-5', className)}
      style={{ borderColor: 'rgba(185,48,158,0.25)', background: 'var(--color-bg-elevated)', boxShadow: 'var(--glow-card)' }}
    >
      <div ref={panelDropRef} className="flex items-center gap-2 border-b border-[rgba(185,48,158,0.15)] pb-4">
        <Swords className="h-5 w-5 shrink-0" style={{ color: 'var(--color-text-muted)' }} aria-hidden="true" />
        <h2 className="font-(--font-jetbrains) text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--color-gm-alert)' }}>
          TU BAÚL
        </h2>
      </div>

      <div className="min-h-[120px] flex-1 py-4">
        {rows.length === 0 ? (
          <p className="font-(--font-inter) text-sm italic" style={{ color: 'var(--color-text-muted)' }}>
            El baúl está vacío. La noche también puede ser salvaje así.
          </p>
        ) : (
          <LayoutGroup>
            <ul className="space-y-3">
              <AnimatePresence mode="popLayout">
                {rows.map((u) => (
                  <motion.li
                    key={u.id}
                    layout
                    variants={arsenalRowVariants}
                    initial={shouldReduceMotion ? false : 'hidden'}
                    animate={shouldReduceMotion ? undefined : 'visible'}
                    exit={shouldReduceMotion ? undefined : 'exit'}
                    className="flex items-center gap-3 rounded-xl border border-[rgba(185,48,158,0.12)] px-2 py-2"
                    style={{ background: 'rgba(8,0,8,0.35)' }}
                  >
                    <HexFrame iconName={u.icon} rarity={u.rarity} isSelected={false} selectionPulse={false} size={40} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-(--font-inter) text-sm text-white">{u.name}</p>
                    </div>
                    <p className="shrink-0 font-(--font-jetbrains) text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      {formatCurrency(u.price)}
                    </p>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </LayoutGroup>
        )}
      </div>

      <footer className="mt-auto border-t border-[rgba(185,48,158,0.15)] pt-4">
        <p className="font-(--font-jetbrains) text-[10px] tracking-[0.18em]" style={{ color: 'var(--color-text-muted)' }}>
          EL VALOR DE TU NOCHE:
        </p>
        <p className="mt-1 font-(--font-playfair) text-3xl" style={{ color: 'var(--color-gold)' }}>
          {formatCurrency(total)}
        </p>
      </footer>
    </aside>
  )
}

export function Step3Upselling() {
  const shouldReduceMotion = useReducedMotion()
  const { state, updateStep3, nextStep, prevStep, getTotalPrice } = useBookingFlow()

  const selected = state.step3.selectedUpsells as UpsellId[]
  const [itemAdded, setItemAdded] = useState<UpsellId | null>(null)
  const [lootFlight, setLootFlight] = useState<LootFlightPayload | null>(null)

  const panelDropRef = useRef<HTMLDivElement | null>(null)
  const mobileLootTargetRef = useRef<HTMLDivElement | null>(null)
  const hexRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const setHexRef = useCallback((id: string) => {
    return (el: HTMLDivElement | null) => {
      hexRefs.current[id] = el
    }
  }, [])

  useEffect(() => {
    if (!itemAdded) return undefined
    const t = window.setTimeout(() => setItemAdded(null), 600)
    return () => window.clearTimeout(t)
  }, [itemAdded])

  const total = getTotalPrice()

  const clearLootFlight = useCallback(() => setLootFlight(null), [])

  const handleToggle = useCallback(
    (id: UpsellId, hexRect: DOMRect | null) => {
      const isSelected = selected.includes(id)
      const next = isSelected ? selected.filter((x) => x !== id) : [...selected, id]
      updateStep3({ selectedUpsells: next })

      if (!isSelected) {
        setItemAdded(id)
        if (!shouldReduceMotion && hexRect && typeof window !== 'undefined') {
          const desktop = window.matchMedia('(min-width: 1024px)').matches
          const targetEl = desktop ? panelDropRef.current : mobileLootTargetRef.current
          const panelRect = targetEl?.getBoundingClientRect()
          const item = UPSELL_ITEMS.find((u) => u.id === id)
          if (item && panelRect && panelRect.width > 0 && panelRect.height > 0) {
            setLootFlight({
              id,
              fromX: hexRect.left + hexRect.width / 2,
              fromY: hexRect.top + hexRect.height / 2,
              toX: panelRect.left + panelRect.width / 2,
              toY: panelRect.top + panelRect.height / 2,
              rarity: item.rarity,
              iconName: item.icon,
            })
          }
        }
      }
    },
    [selected, updateStep3, shouldReduceMotion],
  )

  const lootPortal =
    typeof document !== 'undefined' && lootFlight ? (
      createPortal(
        <LootFlightClone payload={lootFlight} onDone={clearLootFlight} />,
        document.body,
      )
    ) : null

  return (
    <div className="relative min-h-screen pb-40 md:pb-28">
      {lootPortal}

      <div className="relative mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:max-w-[1200px]">
        <StepHeader actLabel="III" title="ABRE EL BAÚL" />
        <p className="-mt-4 mb-10 font-(--font-jetbrains) text-xs tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
          Suma tentaciones a tu noche
        </p>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,35%)] lg:items-start">
          <div className="space-y-4">
            {UPSELL_ITEMS.map((item) => (
              <UpsellItemCard
                key={item.id}
                item={item}
                isSelected={selected.includes(item.id)}
                selectionPulse={itemAdded === item.id}
                hexRef={setHexRef(item.id)}
                onToggle={(id, rect) => {
                  const r = rect ?? hexRefs.current[item.id]?.getBoundingClientRect() ?? null
                  handleToggle(id, r)
                }}
              />
            ))}
          </div>

          <ArsenalPanel selectedIds={selected} panelDropRef={panelDropRef} className="hidden lg:flex lg:min-h-[420px] lg:sticky lg:top-24" />
        </div>

        <div
          className="fixed inset-x-0 bottom-[72px] z-110 border-t px-4 py-3 lg:hidden"
          style={{
            background: 'rgba(8,0,8,0.80)',
            borderColor: 'rgba(185,48,158,0.25)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div ref={mobileLootTargetRef} className="mx-auto max-w-lg">
            <p className="text-center font-(--font-jetbrains) text-xs tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
              {selected.length} tentaci{selected.length === 1 ? 'ón' : 'ones'} elegida{selected.length === 1 ? '' : 's'} · {formatCurrency(total)}
            </p>
          </div>
        </div>

        <div
          className="fixed inset-x-0 bottom-0 z-120 border-t px-4 py-4"
          style={{
            background: 'rgba(8,0,8,0.86)',
            borderColor: 'rgba(185,48,158,0.25)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-center font-(--font-jetbrains) text-sm sm:text-left" style={{ color: 'var(--color-text-muted)' }}>
              El valor de tu noche: <span style={{ color: 'var(--color-gold)' }}>{formatCurrency(total)}</span>
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
              <button
                type="button"
                onClick={prevStep}
                className="rounded-full border border-[rgba(185,48,158,0.2)] px-5 py-3 font-(--font-jetbrains) text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                ← VOLVER
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="rounded-full px-5 py-3 font-(--font-jetbrains) text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)"
                style={{ background: 'var(--gradient-cta)' }}
              >
                CONTINUAR →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
