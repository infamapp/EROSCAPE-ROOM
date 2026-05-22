 import type { Metadata } from 'next'
 
 import { FaqPage } from '@/components/faq/FaqPage'
 
 export const metadata: Metadata = {
   title: 'FAQ — Eroscape',
   description: 'Respuestas discretas sobre la experiencia, reservas, seguridad, privacidad y la Game Master IA autómata.',
   openGraph: {
     title: 'FAQ — Eroscape',
     description: 'Respuestas discretas sobre la experiencia, reservas, seguridad, privacidad y la Game Master IA autómata.',
     type: 'website',
   },
   twitter: {
     card: 'summary_large_image',
     title: 'FAQ — Eroscape',
     description: 'Respuestas discretas sobre la experiencia, reservas, seguridad, privacidad y la Game Master IA autómata.',
   },
 }
 
 export default function FaqRoutePage() {
   return <FaqPage />
 }
 
