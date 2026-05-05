'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { Clock, Coins, Share2, Users, Zap } from 'lucide-react'
import { useMemo } from 'react'

import { ExperienceIntensityPill } from '@/components/experience/ExperienceIntensityPill'
import { ExperienceDetailFaq } from '@/components/experiences/ExperienceDetailFaq'
import { ExperienceDetailRelatedRail } from '@/components/experiences/ExperienceDetailRelatedRail'
import {
  EXPERIENCE_FAQ_ITEMS,
  getExperienceDetailCopy,
  getRelatedExperienceLinks,
} from '@/lib/experiences/detail-copy'
import { formatCurrency } from '@/lib/utils'
import type { ExperienciasCatalogIntensity } from '@/types/experiencias-catalog'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const ctaHover = {
  rest: { scale: 1, filter: 'brightness(1)' },
  hover: {
    scale: 1.04,
    filter: 'brightness(1.06)',
    transition: { duration: 0.3, ease: SENSUAL_EASE },
  },
}

export interface ExperienceThresholdViewProps {
  slug: string
  title: string
  citySlug: string
  cityDisplayName: string
  catalogIntensity: ExperienciasCatalogIntensity
  durationMin: number
  capacity: number
  basePrice: number
}

function participantsLabel(capacity: number): string {
  if (capacity === 2) return 'Pareja'
  if (capacity === 1) return '1 persona'
  return `Hasta ${capacity} personas`
}

export function ExperienceThresholdView({
  slug,
  title,
  citySlug,
  cityDisplayName,
  catalogIntensity,
  durationMin,
  capacity,
  basePrice,
}: ExperienceThresholdViewProps) {
  const router = useRouter()
  const reduceMotion = useReducedMotion()
  const copy = useMemo(() => getExperienceDetailCopy(slug), [slug])
  const priceText = useMemo(() => formatCurrency(basePrice), [basePrice])
  const related = useMemo(() => getRelatedExperienceLinks(slug, citySlug), [slug, citySlug])

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const shareTitle = `${title} — Eroscape`

    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        const nav = navigator as Navigator & { share?: (data: { title?: string; url?: string }) => Promise<void> }
        await nav.share?.({ title: shareTitle, url })
        return
      } catch {
        // portapapeles
      }
    }

    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // ignorar
    }
  }

  const handleReserva = () => {
    try {
      sessionStorage.setItem(
        'eroscape_booking_prefill',
        JSON.stringify({ citySlug, experienceSlug: slug }),
      )
    } catch {
      // ignorar
    }
    router.push('/reservar?step=1')
  }

  return (
    <div className="min-h-screen pb-12" style={{ background: 'var(--surface-experience)', color: 'var(--color-text-primary)' }}>
      <section className="relative flex min-h-[min(100dvh,920px)] w-full items-end overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <Image
            src={copy.heroImageSrc}
            alt={`Ambiente de la experiencia: ${title}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
          <div className="absolute inset-0 bg-linear-to-t from-[var(--surface-experience)] via-transparent to-transparent" aria-hidden="true" />
        </div>

        <nav aria-label="Migas de pan" className="absolute left-4 top-20 z-20 font-(--font-jetbrains) text-[10px] uppercase tracking-[0.2em] text-white/50 sm:left-8 sm:top-24 sm:text-[11px]">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true">
              /
            </li>
            <li>
              <Link href="/experiencias" className="transition-colors hover:text-white">
                Experiencias
              </Link>
            </li>
            <li aria-hidden="true">
              /
            </li>
            <li className="text-white/90">{cityDisplayName}</li>
          </ol>
        </nav>

        <button
          type="button"
          onClick={handleShare}
          className="absolute right-4 top-20 z-20 inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white/80 backdrop-blur-md transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) sm:right-8 sm:top-24"
          aria-label="Compartir esta experiencia"
        >
          <Share2 className="size-5" aria-hidden="true" />
        </button>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-32 sm:px-8 sm:pb-32">
          <div className="max-w-4xl space-y-4">
            <p className="font-(--font-jetbrains) text-[11px] uppercase tracking-[0.3em] text-(--color-gold-light) sm:text-xs">
              {copy.eyebrow}
            </p>
            <h1 className="font-(--font-playfair) text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl lg:leading-[1.06]">
              {title}
            </h1>
            <p className="font-(--font-playfair) text-xl italic text-white/70 sm:text-2xl">{copy.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="relative z-20 mx-auto -mt-16 max-w-7xl px-4 sm:px-8">
        <div className="glass-card-detail grid grid-cols-2 divide-x divide-white/5 rounded-2xl p-4 sm:grid-cols-4 sm:p-8">
          <div className="flex flex-col items-center justify-center p-3 text-center sm:p-4">
            <Clock className="mb-2 size-7 text-(--color-gold-light)" strokeWidth={1.25} aria-hidden="true" />
            <span className="font-(--font-jetbrains) text-[10px] font-bold uppercase tracking-[0.12em] text-white/40 sm:text-[11px]">
              Duración
            </span>
            <span className="mt-1 font-(--font-inter) text-base text-white sm:text-lg">{durationMin} min</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 text-center sm:p-4">
            <Users className="mb-2 size-7 text-(--color-gold-light)" strokeWidth={1.25} aria-hidden="true" />
            <span className="font-(--font-jetbrains) text-[10px] font-bold uppercase tracking-[0.12em] text-white/40 sm:text-[11px]">
              Participantes
            </span>
            <span className="mt-1 font-(--font-inter) text-base text-white sm:text-lg">{participantsLabel(capacity)}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 text-center sm:p-4">
            <Zap className="mb-2 size-7 text-[var(--color-magenta-glow)]" strokeWidth={1.25} aria-hidden="true" />
            <span className="font-(--font-jetbrains) text-[10px] font-bold uppercase tracking-[0.12em] text-white/40 sm:text-[11px]">
              Intensidad
            </span>
            <div className="mt-2">
              <ExperienceIntensityPill level={catalogIntensity} className="scale-90 border-white/10" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-3 text-center sm:p-4">
            <Coins className="mb-2 size-7 text-(--color-gold-light)" strokeWidth={1.25} aria-hidden="true" />
            <span className="font-(--font-jetbrains) text-[10px] font-bold uppercase tracking-[0.12em] text-white/40 sm:text-[11px]">
              Precio
            </span>
            <span className="mt-1 font-(--font-inter) text-base text-white sm:text-lg">Desde {priceText}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:py-28">
        <h2 className="font-(--font-playfair) text-3xl text-white sm:text-4xl">Lo que te espera</h2>
        <div className="mx-auto mt-6 h-px w-24 bg-(--color-gold-light)" aria-hidden="true" />
        <div className="mx-auto mt-8 max-w-3xl space-y-6 text-left sm:mt-10">
          <p className="font-(--font-inter) text-base leading-relaxed text-white/60 sm:text-lg">
            {copy.bodyTwoParagraphs[0]}
          </p>
          <p className="font-(--font-inter) text-base leading-relaxed text-white/60 sm:text-lg">
            {copy.bodyTwoParagraphs[1]}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-8 sm:pb-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`glass-card-detail group relative h-[min(420px,62vh)] overflow-hidden rounded-2xl md:h-[560px] lg:h-[600px] ${i === 1 ? 'mt-12 md:mt-0' : ''} ${i === 2 ? 'mt-12 md:mt-16 lg:mt-24' : ''}`}
            >
              <Image
                src={copy.galleryImageSrcs[i]}
                alt={`${title}, detalle de ambiente ${i + 1} de 3`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={`object-cover transition-all duration-700 group-hover:scale-105 ${i === 0 ? 'grayscale group-hover:grayscale-0' : ''}`}
              />
            </div>
          ))}
        </div>
      </section>

      <section
        className="border-y border-white/5 py-16 sm:py-24 lg:py-28"
        style={{ background: 'rgba(15, 14, 17, 0.95)' }}
      >
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-8">
          <h2 className="mb-8 font-(--font-playfair) text-3xl text-white sm:mb-10 sm:text-4xl">El misterio te aguarda</h2>
          <motion.button
            type="button"
            onClick={handleReserva}
            initial="rest"
            whileHover={reduceMotion ? undefined : 'hover'}
            variants={ctaHover}
            className="rounded-full px-10 py-4 font-(--font-jetbrains) text-xs font-bold uppercase tracking-[0.2em] text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-experience)] sm:px-14 sm:py-5 sm:text-sm neon-bloom-cta"
            style={{ background: 'var(--gradient-cta)' }}
          >
            QUIERO ESTA NOCHE
          </motion.button>
        </div>
      </section>

      <ExperienceDetailFaq items={EXPERIENCE_FAQ_ITEMS} />
      <ExperienceDetailRelatedRail items={related} />
    </div>
  )
}
