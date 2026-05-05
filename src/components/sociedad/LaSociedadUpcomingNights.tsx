import Image from 'next/image'
import Link from 'next/link'

import { SOCIEDAD_EVENTS, type SociedadEventStatus } from '@/lib/la-sociedad'
import { cn } from '@/lib/utils'

function statusLabel(status: SociedadEventStatus): string {
  switch (status) {
    case 'cerrado':
      return 'Cerrado'
    case 'ultimas':
      return 'Últimas plazas'
    case 'disponible':
      return 'Disponible'
    default: {
      const _exhaustive: never = status
      return _exhaustive
    }
  }
}

function statusBadgeClass(status: SociedadEventStatus): string {
  switch (status) {
    case 'cerrado':
      return 'bg-[color-mix(in_srgb,var(--color-omega-badge)_85%,#1a0508)] text-white'
    case 'ultimas':
      return 'bg-[color-mix(in_srgb,var(--color-gold)_75%,#1a1204)] text-[var(--color-bg-base)]'
    case 'disponible':
      return 'bg-[color-mix(in_srgb,var(--color-magenta)_55%,#140814)] text-white'
    default: {
      const _exhaustive: never = status
      return _exhaustive
    }
  }
}

export function LaSociedadUpcomingNights() {
  return (
    <section
      id="proximas-noches"
      className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28"
      style={{ background: 'var(--color-bg-elevated)' }}
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-14 flex flex-col items-center text-center sm:mb-16">
          <h2 className="font-(--font-playfair) text-3xl font-semibold uppercase tracking-[0.35em] text-white sm:text-4xl">
            Próximas noches
          </h2>
          <div className="mt-4 h-1 w-24 rounded-full bg-[color-mix(in_srgb,var(--color-magenta)_70%,transparent)]" />
        </header>

        <ul className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {SOCIEDAD_EVENTS.map((ev) => (
            <li key={ev.id}>
              <article className="glass-card-detail group flex h-full flex-col overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] md:hover:-translate-y-2">
                <div className="relative h-72 overflow-hidden sm:h-80">
                  <Image
                    src={ev.imageSrc}
                    alt={ev.imageAlt}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.06]"
                  />
                  <div
                    className={cn(
                      'absolute right-3 top-3 rounded-full px-3 py-1 font-(--font-jetbrains) text-[10px] font-bold uppercase tracking-[0.14em]',
                      statusBadgeClass(ev.status),
                    )}
                  >
                    {statusLabel(ev.status)}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.28em] text-[var(--color-gold-light)]">
                    {ev.dateLine}
                  </p>
                  <h3 className="mt-3 font-(--font-playfair) text-2xl text-[var(--color-magenta-glow)] sm:text-[1.65rem]">
                    {ev.title}
                  </h3>
                  <p className="mt-3 flex-1 font-(--font-cormorant) text-base italic leading-relaxed text-[var(--color-text-muted)]">
                    «{ev.quote}»
                  </p>
                  <Link
                    href="/experiencias"
                    className="mt-6 inline-flex w-fit items-center justify-center rounded-full border border-white/20 px-6 py-2.5 font-(--font-jetbrains) text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-[color-mix(in_srgb,var(--color-magenta)_55%,transparent)] hover:text-[var(--color-magenta-glow)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-magenta)_55%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-elevated)]"
                  >
                    Saber más
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
