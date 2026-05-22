import type { Metadata } from 'next'

import { SeguridadGuaranteesGrid } from '@/components/sociedad/seguridad/SeguridadGuaranteesGrid'
import { SeguridadHero } from '@/components/sociedad/seguridad/SeguridadHero'
import { SeguridadLegalAccordion } from '@/components/sociedad/seguridad/SeguridadLegalAccordion'
import { SeguridadPalabraSection } from '@/components/sociedad/seguridad/SeguridadPalabraSection'
import { SeguridadProcess } from '@/components/sociedad/seguridad/SeguridadProcess'
import { SeguridadPromisesBar } from '@/components/sociedad/seguridad/SeguridadPromisesBar'

export const metadata: Metadata = {
  title: 'Seguridad y consentimiento — La Sociedad — Eroscape',
  description: 'Cómo cuidamos límites, palabra segura, privacidad y legalidad en cada noche Eroscape.',
  openGraph: {
    title: 'Seguridad y consentimiento — La Sociedad — Eroscape',
    description: 'Cómo cuidamos límites, palabra segura, privacidad y legalidad en cada noche Eroscape.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seguridad y consentimiento — La Sociedad — Eroscape',
    description: 'Cómo cuidamos límites, palabra segura, privacidad y legalidad en cada noche Eroscape.',
  },
}

export default function LaSociedadSeguridadPage() {
  return (
    <main className="sociedad-page-root min-h-screen pb-20 pt-[calc(var(--layout-nav-height)+env(safe-area-inset-top,0px)+1rem)] sm:pt-[calc(var(--layout-nav-height)+env(safe-area-inset-top,0px)+1.5rem)]">
      <SeguridadHero />
      <SeguridadProcess />
      <SeguridadGuaranteesGrid />
      <SeguridadPalabraSection />
      <SeguridadPromisesBar />
      <SeguridadLegalAccordion />
    </main>
  )
}
