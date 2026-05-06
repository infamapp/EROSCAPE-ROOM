'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

import { SOCIEDAD_EVENTS, type SociedadEventStatus } from '@/lib/la-sociedad'
import { cn } from '@/lib/utils'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: SENSUAL_EASE } },
}

function statusLabel(status: SociedadEventStatus): string {
  switch (status) {
    case 'cerrado':
      return 'CERRADO'
    case 'ultimas':
      return 'ÚLTIMAS PLAZAS'
    case 'disponible':
      return 'DISPONIBLE'
    default: {
      const _exhaustive: never = status
      return _exhaustive
    }
  }
}

function statusBadgeClass(status: SociedadEventStatus): string {
  switch (status) {
    case 'cerrado':
      return 'bg-red-900/40 text-red-400 border border-red-400/30'
    case 'ultimas':
      return 'bg-amber-900/40 text-amber-400 border border-amber-400/30'
    case 'disponible':
      return 'bg-green-900/40 text-green-400 border border-green-400/30'
    default: {
      const _exhaustive: never = status
      return _exhaustive
    }
  }
}

export function LaSociedadUpcomingNights() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="proximas-noches"
      className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28"
      style={{ background: 'var(--color-bg-elevated)' }}
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-14 flex flex-col items-center text-center sm:mb-16">
          <p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.22em] text-(--color-text-muted) sm:text-[11px]">
            PRÓXIMAS NOCHES
          </p>
          <h2 className="mt-3 text-3xl font-bold uppercase tracking-[0.2em] text-white [font-family:var(--font-playfair)] sm:text-4xl">
            Próximas noches
          </h2>
          <div className="mt-4 h-px w-24 bg-[color-mix(in_srgb,var(--color-magenta)_70%,transparent)]" />
        </header>

        <motion.ul
          variants={reduceMotion ? undefined : gridVariants}
          initial={reduceMotion ? false : 'hidden'}
          whileInView={reduceMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-15%' }}
          className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-8"
        >
          {SOCIEDAD_EVENTS.map((ev) => (
            <motion.li
              key={ev.id}
              variants={reduceMotion ? undefined : cardVariants}
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border-(--border-subtle) bg-(--color-bg-elevated) [box-shadow:var(--glow-card)] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1.5 hover:[box-shadow:var(--glow-magenta)] hover:border-[color-mix(in_srgb,var(--color-magenta)_45%,transparent)]">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={ev.imageSrc}
                    alt={ev.imageAlt}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.06]"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-(--color-bg-elevated) via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  <div
                    className={cn(
                      'absolute right-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] [font-family:var(--font-jetbrains)]',
                      statusBadgeClass(ev.status),
                    )}
                  >
                    {statusLabel(ev.status)}
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
                  <p className="font-(--font-jetbrains) text-[9px] uppercase tracking-[0.2em] text-(--color-magenta)">
                    {ev.dateLine}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-white [font-family:var(--font-playfair)]">
                    {ev.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm italic leading-relaxed text-(--color-text-secondary) [font-family:var(--font-cormorant)]">
                    «{ev.quote}»
                  </p>
                  <Link
                    href="/experiencias"
                    className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-(--color-magenta-dim) px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors [font-family:var(--font-jetbrains)] hover:border-(--color-magenta) hover:bg-(--color-magenta)/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-elevated)"
                  >
                    Saber más
                  </Link>
                </div>
              </article>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
