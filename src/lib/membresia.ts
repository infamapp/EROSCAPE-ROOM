import type { LucideIcon } from 'lucide-react'
import { BadgePercent, CalendarHeart, DoorOpen, Moon, ShoppingBag, Sparkles } from 'lucide-react'

export const MEMBRESIA_ROUTE = '/membresia' as const

export interface MembresiaPerk {
  id: string
  text: string
  Icon: LucideIcon
}

export const MEMBRESIA_HERO_PERKS: readonly MembresiaPerk[] = [
  { id: 'salas', text: 'Acceso anticipado a las salas', Icon: DoorOpen },
  { id: 'tocador', text: 'Descuentos permanentes en El Tocador', Icon: ShoppingBag },
  { id: 'eventos', text: 'Noches y encuentros solo para miembros', Icon: Moon },
  { id: 'cuidado', text: 'Preferencias recordadas en cada visita', Icon: Sparkles },
] as const

export interface MembresiaPillar {
  id: string
  title: string
  body: string
  detail: string
  Icon: LucideIcon
}

export const MEMBRESIA_PILLARS: readonly MembresiaPillar[] = [
  {
    id: 'salas',
    title: 'Las salas, antes que nadie',
    body: 'Reserva con prioridad en las experiencias de Eroscape. Los miembros eligen fecha y franja cuando el calendario aún está cerrado para el resto.',
    detail: 'Incluye acceso anticipado y, en niveles superiores, prioridad absoluta en fechas demandadas.',
    Icon: DoorOpen,
  },
  {
    id: 'tocador',
    title: 'El Tocador, con ventaja',
    body: 'Kits sensoriales, ediciones limitadas y complementos de la boutique con descuento permanente según tu nivel.',
    detail: 'El descuento se aplica en cada pedido del catálogo — sin códigos ni renovar cupones.',
    Icon: BadgePercent,
  },
  {
    id: 'eventos',
    title: 'Eventos entre sombras',
    body: 'La Sociedad abre puertas que no aparecen en la web pública: catas, aperturas privadas y noches temáticas solo para quien lleva la llave.',
    detail: 'Invitaciones por correo discreto. Plazas limitadas y ambiente cuidado.',
    Icon: CalendarHeart,
  },
] as const

export const MEMBRESIA_FEATURE_BLOCKS = [
  {
    n: '01',
    title: 'Una llave, tres mundos',
    body: 'La membresía no es un club aparte: es el hilo que une las salas inmersivas, El Tocador y los encuentros de La Sociedad. Todo bajo los mismos protocolos de discreción.',
  },
  {
    n: '02',
    title: 'Curaduría que te reconoce',
    body: 'La Game Master IA y el equipo conocen tus preferencias de intensidad, idioma y ritmo. Cada noche puede afinarse sin repetir explicaciones.',
  },
  {
    n: '03',
    title: 'Discreción como estándar',
    body: 'Facturación neutra, comunicaciones sobrias y un trato que protege vuestra intimidad en cada paso — reserva, boutique y evento.',
  },
] as const

export const MEMBRESIA_COPY = {
  heroEyebrow: 'Acceso reservado',
  heroTitle: 'Membresía',
  heroSubtitle: 'Las salas, El Tocador y los eventos — unidos para quienes vuelven.',
  heroIntro:
    'Información clara sobre lo que obtienes: prioridad en reservas, descuentos en la boutique y acceso a encuentros que no están en el calendario público.',
  ctaPrimary: 'Ver niveles',
  ctaSecondary: 'Qué incluye',
  pillarsHeading: 'Qué desbloquea tu membresía',
  pillarsSub: 'Tres ejes que explican el valor antes de elegir nivel.',
  tiersHeading: 'Elige tu nivel',
  tiersSub: 'Cada plan suma ventajas en salas, El Tocador y La Sociedad.',
  featuresHeading: 'Cómo se vive por dentro',
  testimonialsHeading: 'Lo que se susurra',
  testimonialsSub: 'Voces de quienes ya llevan la llave.',
} as const
