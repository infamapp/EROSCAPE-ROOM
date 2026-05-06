export function SeguridadHero() {
  return (
    <section className="relative flex min-h-[min(100dvh,820px)] flex-col items-center justify-center overflow-hidden border-b-(--border-subtle) px-4 pb-24 pt-28 text-center sm:px-6 sm:pt-32">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-[color-mix(in_srgb,var(--color-magenta)_5%,transparent)] to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border-(--border-subtle) px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-(--color-text-secondary) [font-family:var(--font-jetbrains)] sm:text-[11px]">
          <span aria-hidden="true">✦</span>
          El poder de la palabra
          <span aria-hidden="true">✦</span>
        </div>
        <h1 className="text-[clamp(2rem,5vw,3.75rem)] font-semibold italic leading-tight text-white [font-family:var(--font-cormorant)]">
          El consentimiento manda. Sin él, no hay juego.
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-(--color-text-secondary) [font-family:var(--font-inter)] sm:text-base">
          En Eroscape, el placer solo existe con cuidado. Antes de empezar defines tus límites, eliges tu palabra segura y afinas la intensidad contigo, no contra ti.
        </p>
      </div>
    </section>
  )
}
