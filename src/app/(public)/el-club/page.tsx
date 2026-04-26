import type { Metadata } from 'next'

import { ElClubPageContent } from '@/components/sections/ElClubPageContent'

export const metadata: Metadata = {
  title: 'El Club — Eroscape',
  description: 'Membresías exclusivas para operativos recurrentes.',
  openGraph: {
    title: 'El Club — Eroscape',
    description: 'Membresías exclusivas para operativos recurrentes.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'El Club — Eroscape',
    description: 'Membresías exclusivas para operativos recurrentes.',
  },
}

export default function ElClubPage() {
  return <ElClubPageContent />
}
