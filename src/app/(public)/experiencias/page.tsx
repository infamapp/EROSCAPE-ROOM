import type { Metadata } from 'next'

import { ExperienciasPage } from '@/components/experiencias/ExperienciasPage'

export const metadata: Metadata = {
  title: 'Experiencias',
  description: 'Catálogo de experiencias. Elegí ciudad e intensidad y encontrá tu noche.',
  openGraph: {
    title: 'Experiencias',
    description: 'Catálogo de experiencias. Elegí tu noche.',
    type: 'website',
  },
}

export default function ExperienciasRoutePage() {
  return <ExperienciasPage />
}
