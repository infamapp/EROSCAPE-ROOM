import type { Metadata } from 'next'
import Link from 'next/link'

import { LaSociedadCommitment } from '@/components/sociedad/LaSociedadCommitment'
import { LaSociedadCorporate } from '@/components/sociedad/LaSociedadCorporate'
import { LaSociedadHero } from '@/components/sociedad/LaSociedadHero'
import { LaSociedadUpcomingNights } from '@/components/sociedad/LaSociedadUpcomingNights'

export const metadata: Metadata = {
  title: 'La Sociedad — Eroscape',
  description: 'Noches reservadas, eventos privados y un círculo que entiende la discreción como arte.',
  openGraph: {
    title: 'La Sociedad — Eroscape',
    description: 'Noches reservadas, eventos privados y un círculo que entiende la discreción como arte.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'La Sociedad — Eroscape',
    description: 'Noches reservadas, eventos privados y un círculo que entiende la discreción como arte.',
  },
}

export default function LaSociedadPage() {
  return (
    <main className="sociedad-page-root min-h-screen pb-20 pt-16 sm:pt-20">
      <LaSociedadHero />
      <LaSociedadUpcomingNights />
      <LaSociedadCorporate />
      <LaSociedadCommitment />
      <p className="mx-auto max-w-2xl px-4 text-center font-(--font-inter) text-sm text-[var(--color-text-muted)]">
        <Link
          href="/la-sociedad/seguridad"
          className="text-[var(--color-magenta-glow)] underline-offset-4 transition-colors hover:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-magenta)_55%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-experience)]"
        >
          Seguridad y consentimiento
        </Link>
        {' · '}
        ¿Planes de membresía?{' '}
        <Link
          href="/el-club"
          className="text-[var(--color-magenta-glow)] underline-offset-4 transition-colors hover:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-magenta)_55%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-experience)]"
        >
          Ver niveles en El Club
        </Link>
        .
      </p>
    </main>
  )
}
