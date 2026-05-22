import Image from 'next/image'

import { MEMBRESIA_COPY, MEMBRESIA_FEATURE_BLOCKS } from '@/lib/membresia'

export function MembresiaFeatures() {
  return (
    <section className="border-t border-white/6 px-4 py-16 sm:px-6 sm:py-24" aria-labelledby="membresia-features-heading">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-14 md:flex-row md:items-start md:gap-16">
        <div className="flex-1 space-y-12 md:space-y-14">
          <div>
            <h2
              id="membresia-features-heading"
              className="font-(--font-jetbrains) text-[11px] uppercase tracking-[0.42em] text-(--color-text-muted)"
            >
              {MEMBRESIA_COPY.featuresHeading}
            </h2>
          </div>
          {MEMBRESIA_FEATURE_BLOCKS.map((block) => (
            <div key={block.n} className="space-y-3">
              <p className="font-(--font-cormorant) text-3xl italic text-(--color-magenta-glow) sm:text-4xl">{block.n}.</p>
              <h3 className="font-(--font-cormorant) text-2xl italic text-white sm:text-3xl">{block.title}</h3>
              <p className="max-w-xl font-(--font-inter) text-sm leading-relaxed text-(--color-text-muted) sm:text-base">
                {block.body}
              </p>
            </div>
          ))}
        </div>
        <div className="group relative h-[min(420px,70vh)] w-full flex-1 overflow-hidden rounded-2xl border border-white/7 md:h-[560px] md:max-w-lg">
          <Image
            src="/back-3.png"
            alt="Salón íntimo con velas y ambiente violeta"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div
            className="pointer-events-none absolute inset-0 z-10 bg-[color-mix(in_srgb,var(--color-magenta)_18%,transparent)] mix-blend-multiply"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  )
}
