import Image from 'next/image'

import { APP_MOVIL_PREVIEW_FRAMES } from '@/lib/app-movil'
import { cn } from '@/lib/utils'

export function AppMovilPreviewStrip() {
  return (
    <section id="vistas-app" className="scroll-mt-24 overflow-hidden px-4 pb-20 pt-4 sm:px-6 sm:pb-28">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-10 md:flex-row md:items-end md:gap-8 lg:gap-12">
        {APP_MOVIL_PREVIEW_FRAMES.map((frame) => {
          const isCenter = frame.emphasis === 'center'
          return (
            <article
              key={frame.id}
              className={cn(
                'group relative w-[min(100%,280px)] overflow-hidden rounded-4xl border border-white/10 bg-(--color-bg-elevated) shadow-xl transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] md:hover:-translate-y-3',
                isCenter ? 'z-20 border-[6px] md:w-[min(100%,320px)] md:-translate-y-4' : 'z-10 border-4',
              )}
            >
              <div className="relative aspect-9/19 w-full">
                <Image
                  src={frame.imageSrc}
                  alt={frame.imageAlt}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover opacity-85 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-(--color-magenta-glow) [font-family:var(--font-jetbrains)]">
                    {frame.label}
                  </p>
                  <p
                    className={cn(
                      'mt-1 font-(--font-cormorant) text-white',
                      isCenter ? 'text-lg sm:text-xl' : 'text-sm sm:text-base',
                    )}
                  >
                    {frame.caption}
                  </p>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
