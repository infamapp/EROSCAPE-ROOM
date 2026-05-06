import type { Metadata } from 'next'

import { BoutiquePage } from '@/components/boutique/BoutiquePage'

export const metadata: Metadata = {
  title: 'El Tocador',
  description: 'Catálogo curado con envío discreto y packaging elegante.',
  openGraph: {
    title: 'El Tocador',
    description: 'Catálogo curado con envío discreto.',
    type: 'website',
  },
}

export default function BoutiqueRoutePage() {
  return (
    <BoutiquePage />
  )
}
