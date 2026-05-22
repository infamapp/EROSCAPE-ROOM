import type { Metadata } from 'next'

import { FranchiseCtaSection } from '@/components/marketing/FranchiseCtaSection'
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
    <main className="sociedad-page-root min-h-screen pb-20 pt-[calc(var(--layout-nav-height)+env(safe-area-inset-top,0px)+1rem)] sm:pt-[calc(var(--layout-nav-height)+env(safe-area-inset-top,0px)+1.5rem)]">
      <LaSociedadHero />
      <LaSociedadUpcomingNights />
      <LaSociedadCorporate />
      <LaSociedadCommitment />
      <FranchiseCtaSection className="border-t border-white/6" />
    </main>
  )
}
