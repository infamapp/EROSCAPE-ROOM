'use client'

import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export interface BookingSelectionDetailProps {
  label: string
  title: string
  summary: string
  meta?: ReactNode
  className?: string
  dense?: boolean
}

export function BookingSelectionDetail({
  label,
  title,
  summary,
  meta,
  className,
  dense = false,
}: BookingSelectionDetailProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-(--color-magenta)/35 bg-(--color-bg-elevated) [box-shadow:var(--glow-card)]',
        dense ? 'px-3 py-2.5 sm:px-3.5 sm:py-3' : 'px-4 py-4 sm:px-5 sm:py-5',
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.2em] text-(--color-magenta-glow)">
        {label}
      </p>
      <h4
        className={cn(
          'mt-1.5 font-(--font-playfair) text-white',
          dense ? 'text-base sm:text-[17px]' : 'mt-2 text-lg sm:text-xl',
        )}
      >
        {title}
      </h4>
      <p
        className={cn(
          'font-(--font-inter) leading-relaxed text-(--color-text-secondary)',
          dense ? 'mt-1 line-clamp-2 text-xs' : 'mt-2 text-sm',
        )}
      >
        {summary}
      </p>
      {meta ? (
        <div className={cn('border-t border-white/10', dense ? 'mt-2 pt-2' : 'mt-3 pt-3')}>{meta}</div>
      ) : null}
    </div>
  )
}
