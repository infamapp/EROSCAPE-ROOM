import type { Metadata } from 'next'

import { ElTocadorBenefits } from '@/components/boutique/ElTocadorBenefits'
import { ElTocadorHero } from '@/components/boutique/ElTocadorHero'
import { ElTocadorTestimonials } from '@/components/boutique/ElTocadorTestimonials'
import { ElTocadorTiers } from '@/components/boutique/ElTocadorTiers'

export const metadata: Metadata = {
  title: 'El Tocador — Eroscape',
  description: 'Membresía y privilegios discretos: prioridad en reservas, noches reservadas y curaduría sensorial.',
  openGraph: {
    title: 'El Tocador — Eroscape',
    description: 'Membresía y privilegios discretos: prioridad en reservas y curaduría sensorial.',
    type: 'website',
  },
}

export default function BoutiquePage() {
  return (
    <main className="tocador-page-root min-h-screen pt-16 sm:pt-20">
      <ElTocadorHero />
      <ElTocadorTiers />
      <ElTocadorBenefits />
      <ElTocadorTestimonials />
    </main>
  )
}
