'use client'

import { getMockArchiveRecords } from '@/lib/mock-booking-record'
import type { PastBookingRecord } from '@/types/booking-record'

export interface ArchiveTabProps {
  bookingId: string
}

function DiscreetMark() {
  return (
    <svg width="120" height="80" viewBox="0 0 120 80" aria-hidden="true" className="mx-auto opacity-80">
      <g fill="none" stroke="var(--color-text-muted)" strokeWidth="2" opacity="0.85">
        <path d="M60 14 C42 14 28 28 28 46 C28 60 40 70 60 72 C80 70 92 60 92 46 C92 28 78 14 60 14 Z" />
        <path d="M42 44 C48 38 54 36 60 36 C66 36 72 38 78 44" opacity="0.65" />
        <path d="M60 36 V56" opacity="0.55" />
      </g>
    </svg>
  )
}

function PastCard({ row }: { row: PastBookingRecord }) {
  const dotted = row.dateIso.replaceAll('-', '.')
  return (
    <article className="rounded-xl border p-4" style={{ borderColor: 'rgba(185,48,158,0.2)', background: 'var(--color-bg-elevated)' }}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-[var(--font-playfair)] text-lg text-white">{row.experienceTitle}</h3>
          <p className="mt-1 font-[var(--font-jetbrains)] text-xs" style={{ color: 'var(--color-text-muted)' }}>
            {dotted}
          </p>
        </div>
        <span className="shrink-0 text-2xl" aria-hidden="true">
          {row.archetypeIcon}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-[var(--font-inter)] text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          {row.archetypeName}
        </span>
        <span className="font-[var(--font-jetbrains)] text-[10px] tracking-wide" style={{ color: 'var(--color-gm-terminal)' }}>
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
      <div className="flex flex-col items-center py-12 text-center">
        <DiscreetMark />
        <h2 className="mt-6 font-[var(--font-playfair)] text-xl text-white">Aún no has vivido ninguna noche con nosotros.</h2>
        <p className="mt-3 max-w-md font-[var(--font-inter)] text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Tu primera experiencia se guardará aquí para siempre.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="font-[var(--font-jetbrains)] text-xs tracking-[0.2em]" style={{ color: 'var(--color-text-muted)' }}>
        TU HISTORIAL
      </h2>
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
