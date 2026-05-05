export function SeguridadHero() {
  return (
    <section className="relative flex min-h-[min(100dvh,820px)] flex-col items-center justify-center overflow-hidden border-b border-[color-mix(in_srgb,var(--color-gm-terminal)_22%,transparent)] px-4 pb-24 pt-28 text-center sm:px-6 sm:pt-32">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-[color-mix(in_srgb,var(--color-gm-terminal)_8%,transparent)] to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-1/2 h-[min(50vw,400px)] w-[min(95vw,800px)] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: 'color-mix(in srgb, var(--color-gm-terminal) 12%, transparent)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        <div
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--color-gm-terminal)_45%,transparent)] bg-[color-mix(in_srgb,var(--color-gm-terminal)_10%,transparent)] px-4 py-1.5 font-(--font-jetbrains) text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--color-gm-terminal)] sm:text-[11px]"
          style={{ boxShadow: '0 0 22px color-mix(in srgb, var(--color-gm-terminal) 22%, transparent)' }}
        >
          <span aria-hidden="true">✦</span>
          El poder de la palabra
          <span aria-hidden="true">✦</span>
        </div>
        <h1 className="font-(--font-cormorant) text-[clamp(2rem,5vw,3.75rem)] font-semibold italic leading-tight text-white">
          El consentimiento manda. Sin él, no hay juego.
        </h1>
        <p className="mx-auto mt-8 max-w-2xl font-(--font-inter) text-base leading-relaxed text-[var(--color-text-muted)] sm:text-lg">
          En Eroscape, el placer solo existe con cuidado. Antes de empezar defines tus límites, eliges tu palabra segura y afinas la intensidad contigo, no contra ti.
        </p>
      </div>
    </section>
  )
}
