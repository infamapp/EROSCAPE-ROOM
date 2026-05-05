import Link from 'next/link'
import { Drama, Heart, PartyPopper, Users } from 'lucide-react'

import { SOCIEDAD_CORPORATE_CARDS } from '@/lib/la-sociedad'
import { cn } from '@/lib/utils'

const CORP_ICONS = [PartyPopper, Heart, Users, Drama] as const

export function LaSociedadCorporate() {
  return (
    <section className="overflow-hidden px-4 py-20 sm:px-6 sm:py-28" style={{ background: 'var(--color-bg-subtle)' }}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <p className="font-(--font-jetbrains) text-[11px] uppercase tracking-[0.42em] text-[var(--color-magenta-glow)]">
            Más allá de lo privado
          </p>
          <h2 className="mt-4 font-(--font-playfair) text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Eventos & corporativo
          </h2>
          <p className="mt-6 max-w-xl font-(--font-inter) text-base leading-relaxed text-[var(--color-text-muted)] sm:text-lg">
            Llevamos nuestra filosofía de excelencia y comunicación consciente al ámbito profesional: encuentros donde
            la confianza y la escucha son el centro. Lo que se fortalece en la penumbra, ilumina el día a día.
          </p>
          <Link
            href="/reservar"
            className="mt-10 inline-flex items-center justify-center rounded-none px-10 py-4 font-(--font-jetbrains) text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--color-bg-base)] transition-transform duration-300 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-magenta)_55%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-subtle)]"
            style={{
              background: 'var(--color-gold-light)',
              boxShadow: 'var(--glow-gold)',
            }}
          >
            Consultar disponibilidad
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-4 sm:gap-6">
          {SOCIEDAD_CORPORATE_CARDS.map((card, index) => {
            const Icon = CORP_ICONS[index]
            const offset = index === 1 || index === 3
            return (
              <li
                key={card.id}
                className={cn(offset && 'lg:translate-y-8')}
              >
                <div className="group glass-card-detail flex h-full flex-col items-center p-6 text-center transition-colors duration-300 hover:bg-white/[0.04] sm:p-8">
                  <span className="mb-4 inline-flex text-[var(--color-gold-light)] transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
                    <Icon className="size-9 sm:size-10" strokeWidth={1.2} />
                  </span>
                  <h3 className="font-(--font-playfair) text-lg text-white sm:text-xl">{card.title}</h3>
                  <p className="mt-2 font-(--font-inter) text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] sm:text-[11px]">
                    {card.subtitle}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
