import type { Metadata } from 'next'

import { CtaSection } from '@/components/marketing/CtaSection'
import { ExperienciasHomeCatalog } from '@/components/marketing/ExperienciasHomeCatalog'

export const metadata: Metadata = {
  title: 'Experiencias — Eroscape',
  description: 'Catálogo de salas por ciudad e intensidad. Elige tu noche con discreción.',
  openGraph: {
    title: 'Experiencias — Eroscape',
    description: 'Catálogo de salas por ciudad e intensidad. Elige tu noche con discreción.',
    type: 'website',
  },
}

export default function ExperienciasPage() {
  return (
    <main className="pt-20 sm:pt-24">
      <ExperienciasHomeCatalog layout="full" />
      <CtaSection />
    </main>
  )
}
