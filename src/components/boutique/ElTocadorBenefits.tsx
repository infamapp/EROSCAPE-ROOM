import Image from 'next/image'

const BLOCKS = [
  {
    n: '01',
    title: 'El santuario de la discreción',
    body:
      'Cada visita se trata con el máximo cuidado. Como miembro, tu identidad queda protegida por nuestros protocolos de La Sociedad: anonimato y respeto dentro y fuera de Eroscape.',
  },
  {
    n: '02',
    title: 'Curaduría de los sentidos',
    body:
      'El Maestro y el equipo preparan cada detalle a partir de lo que ya sabemos de ti: fragancia del espacio, ritmo de la noche e intensidad. La experiencia empieza antes de cruzar la puerta.',
  },
  {
    n: '03',
    title: 'Eventos entre sombras',
    body:
      'Catas sensoriales reservadas, encuentros cerrados y noches temáticas donde solo entran quienes llevan la llave de El Tocador.',
  },
] as const

export function ElTocadorBenefits() {
  return (
    <section id="beneficios" className="mx-auto flex max-w-7xl flex-col items-center gap-14 px-4 py-20 sm:gap-20 sm:px-6 sm:py-28 md:flex-row md:items-start lg:py-32">
      <div className="flex-1 space-y-12 md:space-y-14">
        {BLOCKS.map((b) => (
          <div key={b.n} className="space-y-3">
            <p className="font-(--font-cormorant) text-3xl italic text-[var(--color-magenta-glow)] sm:text-4xl">{b.n}.</p>
            <h2 className="font-(--font-cormorant) text-2xl italic text-white sm:text-3xl">{b.title}</h2>
            <p className="max-w-xl font-(--font-inter) text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base">
              {b.body}
            </p>
          </div>
        ))}
      </div>
      <div className="group relative h-[min(420px,70vh)] w-full flex-1 overflow-hidden rounded-2xl border border-white/[0.07] md:h-[600px] md:max-w-lg">
        <Image
          src="/back-3.png"
          alt="Interior íntimo con velas y penumbra violeta"
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover transition-transform duration-700 group-hover:scale-100"
        />
        <div
          className="pointer-events-none absolute inset-0 z-10 bg-[color-mix(in_srgb,var(--color-magenta)_18%,transparent)] mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0"
          aria-hidden="true"
        />
      </div>
    </section>
  )
}
