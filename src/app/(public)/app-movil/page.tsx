import type { Metadata } from 'next'

import { AppMovilPageContent } from '@/components/sections/AppMovilPageContent'

export const metadata: Metadata = {
  title: 'App móvil — Eroscape',
  description: 'La misión en tu bolsillo. Inventario, control de sala y protocolo de seguridad.',
  openGraph: {
    title: 'App móvil — Eroscape',
    description: 'La misión en tu bolsillo. Inventario, control de sala y protocolo de seguridad.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'App móvil — Eroscape',
    description: 'La misión en tu bolsillo. Inventario, control de sala y protocolo de seguridad.',
  },
}

export default function AppMovilPage() {
  return <AppMovilPageContent />
}
