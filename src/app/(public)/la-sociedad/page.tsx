import type { Metadata } from 'next'

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
    </main>
  )
}
