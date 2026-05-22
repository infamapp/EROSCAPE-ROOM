import type { Metadata } from 'next'

import { FranquiciaPageContent } from '@/components/franquicia/FranquiciaPageContent'

export const metadata: Metadata = {
  title: 'Monta tu Franquicia — Eroscape',
  description:
    '¿Quieres montar tu propio Eroscape? Solicita información y cuéntanos en qué ciudad te gustaría abrir.',
  openGraph: {
    title: 'Monta tu Franquicia — Eroscape',
    description:
      '¿Quieres montar tu propio Eroscape? Solicita información y cuéntanos en qué ciudad te gustaría abrir.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Monta tu Franquicia — Eroscape',
    description:
      '¿Quieres montar tu propio Eroscape? Solicita información y cuéntanos en qué ciudad te gustaría abrir.',
  },
}

export default function FranquiciaPage() {
  return <FranquiciaPageContent />
}
