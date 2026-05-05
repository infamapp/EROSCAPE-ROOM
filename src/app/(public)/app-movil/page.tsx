import type { Metadata } from 'next'

import { AppMovilPageContent } from '@/components/app-movil/AppMovilPageContent'

export const metadata: Metadata = {
  title: 'La App — Eroscape',
  description: 'Curación digital, EROSENSE y una experiencia que empieza antes de llegar. Discreción en cada gesto.',
  openGraph: {
    title: 'La App — Eroscape',
    description: 'Curación digital, EROSENSE y una experiencia que empieza antes de llegar. Discreción en cada gesto.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'La App — Eroscape',
    description: 'Curación digital, EROSENSE y una experiencia que empieza antes de llegar. Discreción en cada gesto.',
  },
}

export default function AppMovilPage() {
  return <AppMovilPageContent />
}
