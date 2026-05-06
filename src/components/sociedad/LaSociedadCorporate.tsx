import Link from 'next/link'
import { Heart, Moon, PartyPopper, Users } from 'lucide-react'

import { SOCIEDAD_CORPORATE_CARDS } from '@/lib/la-sociedad'

const CORP_ICONS = [PartyPopper, Heart, Users, Moon] as const

export function LaSociedadCorporate() {
  return (
    <section
      className="overflow-hidden"
      style={{ background: 'var(--color-bg-subtle)' }}
    >
      {/* Divider band canónico */}
      <div className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 sm:pt-28">
        <div className="flex flex-col items-center text-center">
          <p className="text-[11px] uppercase tracking-[0.32em] text-(--color-magenta-glow) [font-family:var(--font-jetbrains)]">
            Más allá de lo privado
          </p>
          <h2 className="mt-4 text-3xl font-bold uppercase tracking-[0.2em] text-white [font-family:var(--font-playfair)] sm:text-4xl">
            Eventos & corporativo
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-(--color-text-secondary) [font-family:var(--font-inter)] sm:text-base">
            Llevamos nuestra filosofía de excelencia y comunicación consciente al ámbito profesional: encuentros donde
            la confianza y la escucha son el centro. Lo que se fortalece en la penumbra, ilumina el día a día.
          </p>
          <div className="mt-6 h-px w-24 bg-[color-mix(in_srgb,var(--color-gold)_70%,transparent)]" />
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 px-4 pb-20 pt-14 sm:px-6 sm:pb-28 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="text-[11px] uppercase tracking-[0.32em] text-(--color-text-muted) [font-family:var(--font-jetbrains)]">
            Tu evento, nuestra discreción
          </p>
          <h3 className="mt-3 text-2xl font-bold leading-tight text-white [font-family:var(--font-playfair)] sm:text-3xl">
            Una noche pensada para ti
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-(--color-text-secondary) [font-family:var(--font-inter)] sm:text-base">
            Diseñamos cada noche a medida: confidencialidad firmada, cuidado integral y un equipo que sostiene la
            experiencia desde antes hasta después.
          </p>

          <Link
            href="/reservar"
            className="mt-8 inline-flex items-center justify-center rounded-full border px-8 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-(--color-gold-light) transition-[background-color,color,border-color,filter] duration-300 [font-family:var(--font-jetbrains)] hover:bg-[color-mix(in_srgb,var(--color-gold)_14%,transparent)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-gold) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-subtle)"
            style={{ borderColor: 'var(--color-gold)' }}
          >
            Consultar disponibilidad
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {SOCIEDAD_CORPORATE_CARDS.map((card, index) => {
            const Icon = CORP_ICONS[index]
            return (
              <li key={card.id}>
                <div className="group flex h-full flex-col items-start rounded-xl border-(--border-subtle) bg-(--color-bg-elevated) p-5 [box-shadow:var(--glow-card)] transition-[box-shadow,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--color-gold)_45%,transparent)] hover:[box-shadow:var(--glow-gold)]">
                  <span
                    className="inline-flex text-(--color-gold-light) transition-transform duration-300 group-hover:scale-110"
                    aria-hidden="true"
                  >
                    {Icon ? <Icon className="size-6" strokeWidth={1.4} /> : null}
                  </span>
                  <h4 className="mt-4 text-sm font-semibold text-white [font-family:var(--font-playfair)]">
                    {card.title}
                  </h4>
                  <p className="mt-2 text-[9px] uppercase tracking-[0.12em] text-(--color-text-muted) [font-family:var(--font-jetbrains)]">
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
