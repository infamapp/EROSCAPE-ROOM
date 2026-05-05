import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google'

import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { PanicModeProvider } from '@/components/panic/PanicMode'
import { RouteTransitionLoader } from '@/components/ui/RouteTransitionLoader'
import { BookingProvider } from '@/hooks/useBookingFlow'

import './globals.css'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
})

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'Eroscape — Experiencias Únicas',
  description: 'Reserva tu experiencia inmersiva',
  openGraph: {
    title: 'Eroscape — Experiencias Únicas',
    description: 'Reserva tu experiencia inmersiva',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eroscape — Experiencias Únicas',
    description: 'Reserva tu experiencia inmersiva',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="min-h-screen" style={{ background: 'var(--color-bg-base)' }}>
        <PanicModeProvider>
          <BookingProvider>
            <Navbar />
            <RouteTransitionLoader excludePathPrefixes={['/reservar']} />
            {children}
            <Footer />
          </BookingProvider>
        </PanicModeProvider>
      </body>
    </html>
  )
}
