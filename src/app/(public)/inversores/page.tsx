import type { Metadata } from 'next'

import { InversoresLanding } from '@/components/inversores/InversoresLanding'

export const metadata: Metadata = {
  title: 'Inversores — Eroscape',
  description: 'Relación con inversores: una oportunidad premium construida sobre narrativa, tecnología y privacidad.',
  openGraph: {
    title: 'Inversores — Eroscape',
    description: 'Relación con inversores: una oportunidad premium construida sobre narrativa, tecnología y privacidad.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inversores — Eroscape',
    description: 'Relación con inversores: una oportunidad premium construida sobre narrativa, tecnología y privacidad.',
  },
}

export default function InversoresPage() {
  return <InversoresLanding />
}

