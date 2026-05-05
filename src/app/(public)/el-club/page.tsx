import type { Metadata } from 'next'

import { ElClubPageContent } from '@/components/sections/ElClubPageContent'

export const metadata: Metadata = {
  title: 'El Club — Eroscape',
  description: 'Membresías exclusivas y comparativa de niveles para quienes vuelven una y otra vez.',
  openGraph: {
    title: 'El Club — Eroscape',
    description: 'Membresías exclusivas y comparativa de niveles para quienes vuelven una y otra vez.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'El Club — Eroscape',
    description: 'Membresías exclusivas y comparativa de niveles para quienes vuelven una y otra vez.',
  },
}

export default function ElClubPage() {
  return <ElClubPageContent />
}
