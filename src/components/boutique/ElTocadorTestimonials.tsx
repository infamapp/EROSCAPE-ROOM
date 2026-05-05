const QUOTES: readonly { text: string; meta: string; accent?: boolean }[] = [
  {
    text: 'Un refugio para quienes buscamos algo más que entretenimiento. El Tocador ha redefinido mi idea de exclusividad.',
    meta: 'Miembro verificado · Madrid',
  },
  {
    text: 'La atención al detalle es casi obsesiva. Notar que el espacio se moldea a lo que deseas es embriagador.',
    meta: 'Miembro verificado · Barcelona',
    accent: true,
  },
  {
    text: 'No es solo una membresía: es la llave a un mundo donde el misterio y el lujo se entrelazan con cuidado.',
    meta: 'Miembro verificado · Valencia',
  },
]

export function ElTocadorTestimonials() {
  return (
    <section className="border-t border-white/[0.06] px-4 py-20 sm:px-6 sm:py-28" style={{ background: 'rgba(15, 14, 17, 0.92)' }}>
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-14 text-center font-(--font-jetbrains) text-[11px] uppercase tracking-[0.42em] text-[var(--color-text-muted)] sm:mb-20 sm:text-xs">
          Sentimiento de sociedad
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {QUOTES.map((q, i) => (
            <blockquote
              key={`tocador-quote-${i}`}
              className={`tocador-glass rounded-lg p-8 italic sm:p-10 ${q.accent ? 'border-t-2 border-[color-mix(in_srgb,var(--color-magenta)_35%,transparent)]' : ''}`}
            >
              <p className="font-(--font-cormorant) text-xl leading-relaxed text-[var(--color-text-secondary)] sm:text-2xl">
                &ldquo;{q.text}&rdquo;
              </p>
              <footer className="mt-6 font-(--font-inter) text-xs text-[var(--color-text-muted)] not-italic">{q.meta}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
