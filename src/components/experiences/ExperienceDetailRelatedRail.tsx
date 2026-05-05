'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

import type { RelatedExperienceLink } from '@/lib/experiences/detail-copy'
import { getExperienceCardImage } from '@/lib/experiences/visuals'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const cardHover = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.35, ease: SENSUAL_EASE } },
}

export interface ExperienceDetailRelatedRailProps {
  items: readonly RelatedExperienceLink[]
}

export function ExperienceDetailRelatedRail({ items }: ExperienceDetailRelatedRailProps) {
  const reduceMotion = useReducedMotion()

  if (items.length === 0) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
      <h2 className="mb-8 border-b border-white/10 pb-4 font-(--font-jetbrains) text-[11px] uppercase tracking-[0.28em] text-white/40 sm:mb-12 sm:text-xs">
        Otras experiencias
      </h2>
      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        {items.map((item, index) => {
          const { src: cardImageSrc, alt: cardImageAlt } = getExperienceCardImage(item.slug, item.title)
          return (
            <motion.div
              key={item.slug}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: SENSUAL_EASE }}
            >
              <Link
                href={item.href}
                className="group relative block h-[min(360px,52vh)] overflow-hidden rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-experience)] md:h-[400px]"
              >
                <motion.div
                  className="absolute inset-0"
                  variants={reduceMotion ? undefined : cardHover}
                  initial="rest"
                  whileHover={reduceMotion ? undefined : 'hover'}
                >
                  <Image
                    src={cardImageSrc}
                    alt={cardImageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </motion.div>
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" aria-hidden="true" />
                <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                  <p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.22em] text-(--color-gold-light) sm:text-[11px]">
                    {item.tag}
                  </p>
                  <h3 className="mt-2 font-(--font-playfair) text-2xl text-white sm:text-3xl">{item.title}</h3>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
