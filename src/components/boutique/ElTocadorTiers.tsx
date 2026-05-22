import Link from 'next/link'
import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'

type TierCtaVariant = 'outline' | 'primary' | 'gold'

interface BoutiqueTier {
  id: string
  badge: string
  badgeClass: string
  title: string
  tagline: string
  price: string
  priceNote: string
  features: readonly string[]
  cta: { label: string; href: string; variant: TierCtaVariant }
  highlight: boolean
  ribbon?: string
}

const TIERS: readonly BoutiqueTier[] = [
  {
    id: 'iniciado',
    badge: 'Despertar · suave',
    badgeClass: 'bg-white/[0.06] text-[var(--color-text-muted)] border border-white/10',
    title: 'Iniciado',
    tagline: 'El primer paso en la penumbra.',
    price: 'Gratis',
    priceNote: '',
    features: ['Acceso a reserva estándar', 'Boletín de novedades'],
    cta: { label: 'Empezar', href: '/reservar', variant: 'outline' },
    highlight: false,
  },
  {
    id: 'acolito',
    badge: 'Intenso · sin prisa',
    badgeClass: 'bg-[color-mix(in_srgb,var(--color-gold)_22%,transparent)] text-(--color-gold-light) border border-[color-mix(in_srgb,var(--color-gold)_40%,transparent)]',
    title: 'Acólito',
    tagline: 'Vivir la experiencia completa.',
    price: '29€',
    priceNote: '/mes',
    features: [
      'Prioridad 48 h en reservas',
      '10 % de descuento permanente',
      'Acceso a noches de luna',
      'Cóctel de cortesía por visita',
    ],
    cta: { label: 'Unirse', href: '/reservar', variant: 'primary' },
    highlight: true,
    ribbon: 'Lo más elegido',
  },
  {
    id: 'maestro',
    badge: 'Sin límites · profundo',
    badgeClass: 'bg-red-950/45 text-(--color-gold-light) border border-red-500/25',
    title: 'Game Master IA',
    tagline: 'Para quienes custodian el secreto.',
    price: '79€',
    priceNote: '/mes',
    features: [
      'Prioridad absoluta en agenda',
      'Canal reservado con la Game Master IA',
      'Invitaciones para dos acompañantes',
      'Conserje privado 24/7',
    ],
    cta: { label: 'Solicitar', href: '/reservar', variant: 'gold' },
    highlight: false,
  },
]

export function ElTocadorTiers() {
  return (
    <section id="niveles" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
      <h2 className="mb-16 text-center font-(--font-jetbrains) text-xs uppercase tracking-[0.42em] text-[var(--color-text-muted)] sm:mb-20 sm:text-sm">
        Elige tu nivel
      </h2>
      <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-3">
        {TIERS.map((tier) => (
          <div
            key={tier.id}
            className={cn(
              'tocador-glass relative flex flex-col rounded-xl p-8 sm:p-10',
              tier.highlight && 'z-10 border-[color-mix(in_srgb,var(--color-magenta)_45%,transparent)] md:scale-[1.04] tocador-magenta-glow',
              tier.id === 'maestro' && 'tocador-gold-ring',
            )}
          >
            {tier.highlight && tier.ribbon ? (
              <div className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-[color-mix(in_srgb,var(--color-gold)_45%,transparent)] bg-[color-mix(in_srgb,var(--color-gold)_18%,#0a0610)] px-4 py-1.5 font-(--font-jetbrains) text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-gold-light)">
                {tier.ribbon}
              </div>
            ) : null}

            <span
              className={cn(
                'mb-5 inline-flex w-fit rounded px-3 py-1 font-(--font-jetbrains) text-[10px] font-bold uppercase tracking-[0.14em]',
                tier.badgeClass,
              )}
            >
              {tier.badge}
            </span>
            <h3 className="font-(--font-cormorant) text-3xl italic text-white sm:text-4xl md:text-[2.75rem]">{tier.title}</h3>
            <p className="mt-2 font-(--font-cormorant) text-base italic text-[var(--color-text-muted)]">{tier.tagline}</p>
            <div className="mt-6 font-(--font-cormorant) text-3xl text-white sm:text-4xl">
              {tier.price}
              {tier.priceNote ? (
                <span className="text-lg italic text-[var(--color-text-muted)]">{tier.priceNote}</span>
              ) : null}
            </div>
            <ul className="mt-8 flex flex-1 flex-col gap-3.5">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
                  <Check
                    className={cn(
                      'mt-0.5 size-4 shrink-0',
                      tier.highlight ? 'text-(--color-gold-light)' : 'text-[var(--color-magenta-glow)]',
                      tier.id === 'maestro' && 'text-(--color-gold-light)',
                    )}
                    aria-hidden="true"
                  />
                  <span className="font-(--font-inter) leading-snug">{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              {tier.cta.variant === 'primary' ? (
                <Link
                  href={tier.cta.href}
                  className="flex w-full items-center justify-center rounded-full py-4 font-(--font-jetbrains) text-xs font-bold uppercase tracking-[0.16em] text-white transition-[filter] duration-300 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-base)]"
                  style={{ background: 'var(--gradient-cta)' }}
                >
                  {tier.cta.label}
                </Link>
              ) : tier.cta.variant === 'gold' ? (
                <Link
                  href={tier.cta.href}
                  className="flex w-full items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-gold-light)_45%,transparent)] py-4 font-(--font-jetbrains) text-xs font-bold uppercase tracking-[0.16em] text-(--color-gold-light) transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--color-gold)_12%,transparent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-gold-light) focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-base)]"
                >
                  {tier.cta.label}
                </Link>
              ) : (
                <Link
                  href={tier.cta.href}
                  className="flex w-full items-center justify-center rounded-full border border-white/20 py-4 font-(--font-jetbrains) text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-base)]"
                >
                  {tier.cta.label}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
