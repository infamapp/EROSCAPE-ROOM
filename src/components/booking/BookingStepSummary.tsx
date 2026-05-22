'use client'

import { CalendarDays, Clock, MapPin, Sparkles } from 'lucide-react'

import { cn } from '@/lib/utils'

export interface BookingStepSummaryItem {
  label: string
  value: string
  isPlaceholder?: boolean
}

export interface BookingStepSummaryProps {
  items: BookingStepSummaryItem[]
  totalLabel?: string
  totalValue?: string
  className?: string
}

const SUMMARY_ICONS = [MapPin, Sparkles, CalendarDays, Clock] as const

export function BookingStepSummary({ items, totalLabel, totalValue, className }: BookingStepSummaryProps) {
  return (
    <aside
      className={cn(
        'rounded-2xl border border-white/14 bg-(--color-bg-elevated) p-5 sm:p-6',
        '[box-shadow:0_0_0_1px_color-mix(in_srgb,var(--color-magenta)_18%,transparent)]',
        className,
      )}
      aria-label="Resumen de tu selección"
    >
      <p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.2em] text-(--color-text-secondary)">
        Tu selección
      </p>

      <ul className="mt-4 space-y-3">
        {items.map((item, index) => {
          const Icon = SUMMARY_ICONS[index] ?? MapPin
          return (
            <li key={item.label} className="flex gap-3">
              <Icon
                className="mt-0.5 h-4 w-4 shrink-0 text-(--color-magenta-glow)"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.16em] text-(--color-text-muted)">
                  {item.label}
                </p>
                <p
                  className={cn(
                    'mt-0.5 truncate font-(--font-inter) text-sm font-medium',
                    item.isPlaceholder ? 'text-(--color-text-muted)' : 'text-white',
                  )}
                >
                  {item.value}
                </p>
              </div>
            </li>
          )
        })}
      </ul>

      {totalLabel && totalValue ? (
        <div
          className="mt-5 flex items-baseline justify-between gap-3 border-t border-white/10 pt-4"
        >
          <span className="font-(--font-inter) text-sm text-(--color-text-secondary)">{totalLabel}</span>
          <span className="font-(--font-playfair) text-lg text-(--color-gold)">{totalValue}</span>
        </div>
      ) : null}
    </aside>
  )
}

export function formatBookingDateEs(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  const date = new Date(y, m - 1, d)
  const raw = new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(date)
  return raw.charAt(0).toUpperCase() + raw.slice(1)
}
