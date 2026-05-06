'use client'

import { Moon } from 'lucide-react'

import { getMockArchiveRecords } from '@/lib/mock-booking-record'
import type { PastBookingRecord } from '@/types/booking-record'

export interface ArchiveTabProps {
  bookingId: string
}

function PastCard({ row }: { row: PastBookingRecord }) {
  const dotted = row.dateIso.replaceAll('-', '.')
  return (
    <article
      className="rounded-xl p-4"
      style={{
        background: 'var(--color-bg-elevated)',
        border: 'var(--border-subtle)',
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="[font-family:var(--font-playfair)] text-lg text-white">{row.experienceTitle}</h3>
          <p
            className="mt-1 [font-family:var(--font-jetbrains)] text-xs"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {dotted}
          </p>
        </div>
        <span className="shrink-0 text-2xl" aria-hidden="true">
          {row.archetypeIcon}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span
          className="[font-family:var(--font-inter)] text-xs"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {row.archetypeName}
        </span>
        <span
          className="[font-family:var(--font-jetbrains)] text-[10px] tracking-wide"
          style={{ color: 'var(--color-gm-terminal)' }}
        >
          VIVIDA
        </span>
      </div>
    </article>
  )
}

export function ArchiveTab({ bookingId }: ArchiveTabProps) {
  const rows = getMockArchiveRecords(bookingId)

  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <Moon
          className="h-10 w-10"
          aria-hidden="true"
          style={{ color: 'var(--color-text-muted)', opacity: 0.5 }}
        />
        <p
          className="mt-6 [font-family:var(--font-cormorant)] text-2xl italic"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Sin noches anteriores.
        </p>
        <p
          className="mt-2 max-w-md [font-family:var(--font-inter)] text-sm"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Tu primera experiencia se guardará aquí para siempre.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <header>
        <p
          className="[font-family:var(--font-jetbrains)] text-[10px] tracking-[0.25em]"
          style={{ color: 'var(--color-magenta)' }}
        >
          ARCHIVO
        </p>
        <h2 className="mt-2 [font-family:var(--font-playfair)] text-2xl text-white">Tu historial</h2>
      </header>
      <ul className="space-y-4">
        {rows.map((row) => (
          <li key={row.bookingId}>
            <PastCard row={row} />
          </li>
        ))}
      </ul>
    </div>
  )
}
