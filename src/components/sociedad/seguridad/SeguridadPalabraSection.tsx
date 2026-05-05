import Image from 'next/image'
import Link from 'next/link'
import { KeyRound } from 'lucide-react'

export function SeguridadPalabraSection() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-magenta)_22%,transparent)] glass-card-detail bg-linear-to-br from-[color-mix(in_srgb,var(--color-purple-mid)_28%,var(--surface-experience))] to-[var(--surface-experience)]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col justify-center p-8 sm:p-12 md:p-16">
            <h2 className="font-(--font-cormorant) text-4xl font-semibold italic text-[var(--color-gold-light)] sm:text-5xl md:text-6xl">
              Tu palabra mágica
            </h2>
            <p className="mt-6 font-(--font-inter) text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
              Una sola palabra lo detiene todo. En el acto. Sin preguntas incómodas. Solo recuperas el control absoluto
              sobre el espacio que habitas.
            </p>
            <Link
              href="/reservar"
              className="mt-8 inline-flex w-fit items-center gap-3 rounded-full border border-[color-mix(in_srgb,var(--color-gold-light)_45%,transparent)] px-5 py-2.5 font-(--font-jetbrains) text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-gold-light)] transition-colors hover:bg-[color-mix(in_srgb,var(--color-gold-light)_12%,transparent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-magenta)_55%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-experience)]"
            >
              <KeyRound className="size-5" aria-hidden="true" strokeWidth={1.2} />
              Renegociar tu noche
            </Link>
          </div>
          <div className="relative min-h-[280px] md:min-h-[400px]">
            <Image
              src="/sellos.png"
              alt="Sellos y lacre bajo luz tenue, metáfora visual de un pacto sellado con discreción."
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-cover mix-blend-screen opacity-85"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-linear-to-l from-[var(--surface-experience)] via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
