import type { Metadata } from 'next'

import { InversoresLanding } from '@/components/inversores/InversoresLanding'

export const metadata: Metadata = {
  title: 'Monta tu Franquicia — Eroscape',
  description: 'Te montamos tu propia franquicia. Una de las únicas en el mundo de su categoría.',
  openGraph: {
    title: 'Monta tu Franquicia — Eroscape',
    description: 'Te montamos tu propia franquicia. Una de las únicas en el mundo de su categoría.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Monta tu Franquicia — Eroscape',
    description: 'Te montamos tu propia franquicia. Una de las únicas en el mundo de su categoría.',
  },
}

export default function InversoresPage() {
  return <InversoresLanding />
}
