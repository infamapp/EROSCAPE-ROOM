import type { Metadata } from 'next'

import { MembresiaPageContent } from '@/components/membresia/MembresiaPageContent'

export const metadata: Metadata = {
  title: 'Membresía — Eroscape',
  description:
    'Acceso anticipado a las salas, descuentos en El Tocador y eventos exclusivos de La Sociedad. Conoce los niveles de membresía.',
  openGraph: {
    title: 'Membresía — Eroscape',
    description:
      'Salas, El Tocador y eventos — una membresía que une las tres puertas de Eroscape.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Membresía — Eroscape',
    description:
      'Acceso a salas, descuentos en El Tocador y eventos solo para miembros.',
  },
}

export default function MembresiaPage() {
  return <MembresiaPageContent />
}
