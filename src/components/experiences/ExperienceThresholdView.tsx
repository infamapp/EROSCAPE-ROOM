'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ChevronDown,
  Clock,
  Coins,
  LockKeyhole,
  Share2,
  ShieldCheck,
  Users,
  Zap,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { ExperienceDetailRelatedRail } from '@/components/experiences/ExperienceDetailRelatedRail'
import {
  EXPERIENCE_FAQ_ITEMS,
  getExperienceDetailCopy,
  getRelatedExperienceLinks,
} from '@/lib/experiences/detail-copy'
import { getExperienceDetailMedia } from '@/lib/experiences/visuals'
import { formatCurrency } from '@/lib/utils'
import type { ExperienciasCatalogIntensity } from '@/types/experiencias-catalog'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const headerVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: SENSUAL_EASE } },
}

const paragraphVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: SENSUAL_EASE, delay: index * 0.15 },
  }),
}

const polaroidVariants = {
  hidden: { opacity: 0, y: 18, rotate: -2 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    rotate: index === 1 ? 2 : index === 2 ? -3 : 0,
    transition: { duration: 0.55, ease: SENSUAL_EASE, delay: index * 0.08 },
  }),
}

const lightboxVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: SENSUAL_EASE } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: SENSUAL_EASE } },
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

function intensityLabel(intensity: ExperienciasCatalogIntensity): string {
  switch (intensity) {
    case 'ALPHA':
      return 'DESPERTAR · Suave'
    case 'BETA':
      return 'INTENSO · Sin frenos'
    case 'OMEGA':
      return 'SIN LÍMITES · Todo permitido'
    default: {
      const _e: never = intensity
      return _e
    }
  }
}

interface SpecRowProps {
  label: string
  value: string
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
}

function SpecRow({ label, value, icon: Icon }: SpecRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-(--border-subtle) px-4 py-3 transition-colors duration-300 hover:bg-(--color-magenta)/5">
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-(--color-gold-light)" aria-hidden />
        <span className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
          {label}
        </span>
      </div>
      <span className="text-right text-sm font-semibold text-(--color-text-primary) [font-family:var(--font-inter)]">
        {value}
      </span>
    </div>
  )
}

interface FaqItemProps {
  id: string
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  shouldAnimate: boolean
}

function FaqItem({ id, question, answer, isOpen, onToggle, shouldAnimate }: FaqItemProps) {
  return (
    <div className="rounded-2xl border-(--border-subtle) bg-(--color-bg-elevated) p-5 [box-shadow:var(--glow-card)] sm:p-6">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)"
        aria-expanded={isOpen}
        aria-controls={`faq-${id}`}
      >
        <span className="text-sm font-semibold text-white [font-family:var(--font-inter)] sm:text-base">
          {question}
        </span>
        <ChevronDown
          className="mt-0.5 size-5 shrink-0 text-(--color-gold-light) transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={`faq-${id}`}
            key="open"
            initial={shouldAnimate ? { opacity: 0, height: 0 } : false}
            animate={shouldAnimate ? { opacity: 1, height: 'auto' } : undefined}
            exit={shouldAnimate ? { opacity: 0, height: 0 } : undefined}
            transition={shouldAnimate ? { duration: 0.25, ease: SENSUAL_EASE } : undefined}
            className="overflow-hidden"
          >
            <p className="mt-4 font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary)">{answer}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
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
  const shouldAnimate = !reduceMotion
  const copy = useMemo(() => getExperienceDetailCopy(slug), [slug])
  const media = useMemo(() => getExperienceDetailMedia(slug), [slug])
  const priceText = useMemo(() => formatCurrency(basePrice), [basePrice])
  const related = useMemo(() => getRelatedExperienceLinks(slug, citySlug), [slug, citySlug])
  const [openFaqId, setOpenFaqId] = useState<string | null>(EXPERIENCE_FAQ_ITEMS[0]?.id ?? null)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)

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

  useEffect(() => {
    if (!lightboxSrc) return

    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') setLightboxSrc(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightboxSrc])

  const levelBadge = `UMBRAL #${String(slug).slice(0, 2).toUpperCase()} — NIVEL ${catalogIntensity}`

  return (
    <div className="min-h-screen pb-12" style={{ background: 'var(--color-bg-base)', color: 'var(--color-text-primary)' }}>
      <section className="relative min-h-[50vh] w-full overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <Image
            src={media.heroImageSrc}
            alt={`Ambiente de la experiencia: ${title}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/15 to-(--color-bg-base)" aria-hidden="true" />
        </div>

        <nav
          aria-label="Migas de pan"
          className="absolute left-4 top-20 z-20 font-(--font-jetbrains) text-[10px] uppercase tracking-[0.2em] text-white/55 sm:left-8 sm:top-24 sm:text-[11px]"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/experiencias" className="transition-colors hover:text-white">
                Experiencias
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-white/90">{cityDisplayName}</li>
            <li aria-hidden="true">/</li>
            <li className="text-white/90">{title}</li>
          </ol>
        </nav>

        <button
          type="button"
          onClick={handleShare}
          className="absolute right-4 top-20 z-20 inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white/85 backdrop-blur-md transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) sm:right-8 sm:top-24"
          aria-label="Compartir esta experiencia"
        >
          <Share2 className="size-5" aria-hidden="true" />
        </button>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-32 sm:px-8">
          <motion.div
            variants={shouldAnimate ? headerVariants : undefined}
            initial={shouldAnimate ? 'hidden' : false}
            animate={shouldAnimate ? 'visible' : undefined}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.22em] text-white/75 sm:text-[11px]">
              {levelBadge}
            </p>
            <h1 className="mt-4 text-4xl font-bold italic text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.6)] [font-family:var(--font-playfair)] sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <div className="mt-5 flex justify-center">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/85 backdrop-blur-sm">
                {cityDisplayName}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
              Experiencias / {cityDisplayName} / {title}
            </p>

            <div
              className="mt-6 overflow-hidden rounded-2xl border-l-2 border-(--color-magenta) bg-(--color-bg-elevated) [box-shadow:var(--glow-card)]"
              style={{ borderLeftColor: 'var(--color-magenta)' }}
            >
              <SpecRow label="DURACIÓN" value={`${durationMin} min`} icon={Clock} />
              <SpecRow label="PARTICIPANTES" value={participantsLabel(capacity)} icon={Users} />
              <SpecRow label="INTENSIDAD" value={intensityLabel(catalogIntensity)} icon={Zap} />
              <SpecRow label="PRECIO BASE" value={priceText} icon={Coins} />
              <SpecRow label="DISCRECIÓN" value="Total" icon={ShieldCheck} />
            </div>

            <div className="mt-10 space-y-6">
              {copy.bodyTwoParagraphs.map((p, idx) => (
                <motion.p
                  key={idx}
                  custom={idx}
                  variants={shouldAnimate ? paragraphVariants : undefined}
                  initial={shouldAnimate ? 'hidden' : false}
                  whileInView={shouldAnimate ? 'visible' : undefined}
                  viewport={{ once: true, margin: '-20%' }}
                  className="text-lg italic leading-relaxed text-(--color-text-secondary) [font-family:var(--font-cormorant)] sm:text-xl"
                >
                  {p}
                </motion.p>
              ))}
            </div>

            <div className="mt-12">
              <h2 className="font-(--font-jetbrains) text-[11px] uppercase tracking-[0.22em] text-(--color-text-muted)">
                Preguntas rápidas
              </h2>
              <div className="mt-6 space-y-4">
                {EXPERIENCE_FAQ_ITEMS.slice(0, 3).map((item) => (
                  <FaqItem
                    key={item.id}
                    id={item.id}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openFaqId === item.id}
                    onToggle={() => setOpenFaqId(openFaqId === item.id ? null : item.id)}
                    shouldAnimate={shouldAnimate}
                  />
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="space-y-4 lg:sticky lg:top-24">
              <div className="rounded-2xl border-(--border-subtle) bg-(--color-bg-elevated) p-6 [box-shadow:var(--glow-card)]">
                <p className="text-3xl font-bold text-(--color-gold-light) [font-family:var(--font-playfair)]">
                  Desde {priceText}
                </p>
                <p className="mt-2 font-(--font-inter) text-xs text-(--color-text-muted)">
                  + extras opcionales en Tu Baúl
                </p>

                <button
                  type="button"
                  onClick={handleReserva}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full px-8 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-[filter,transform] duration-200 hover:brightness-110 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)"
                  style={{ background: 'var(--gradient-cta)', boxShadow: 'var(--glow-magenta)' }}
                >
                  QUIERO ESTA NOCHE
                </button>

                <Link
                  href="/la-sociedad/seguridad"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border px-8 py-3 text-center text-xs tracking-[0.14em] transition-colors duration-300 hover:bg-(--color-magenta) hover:border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base) [font-family:var(--font-playfair)]"
                  style={{ border: 'var(--border-subtle)', color: 'var(--color-text-primary)' }}
                >
                  <LockKeyhole className="size-4 text-(--color-gold-light)" aria-hidden="true" />
                  Leer sobre consentimiento →
                </Link>

                <div className="mt-6 grid grid-cols-3 gap-2">
                  <div className="rounded-xl border border-(--border-subtle) bg-transparent px-2 py-2 text-center">
                    <ShieldCheck className="mx-auto size-4 text-(--color-gold-light)" aria-hidden="true" />
                    <p className="mt-1 font-(--font-jetbrains) text-[9px] uppercase tracking-[0.14em] text-(--color-text-muted)">
                      Discreción
                    </p>
                  </div>
                  <div className="rounded-xl border border-(--border-subtle) bg-transparent px-2 py-2 text-center">
                    <Clock className="mx-auto size-4 text-(--color-gold-light)" aria-hidden="true" />
                    <p className="mt-1 font-(--font-jetbrains) text-[9px] uppercase tracking-[0.14em] text-(--color-text-muted)">
                      {durationMin} min
                    </p>
                  </div>
                  <div className="rounded-xl border border-(--border-subtle) bg-transparent px-2 py-2 text-center">
                    <Users className="mx-auto size-4 text-(--color-gold-light)" aria-hidden="true" />
                    <p className="mt-1 font-(--font-jetbrains) text-[9px] uppercase tracking-[0.14em] text-(--color-text-muted)">
                      {capacity} pax
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-(--font-jetbrains) text-[11px] uppercase tracking-[0.22em] text-(--color-text-muted)">
                  Galería
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  {media.galleryImageSrcs.map((src, index) => (
                    <motion.button
                      key={src}
                      type="button"
                      onClick={() => setLightboxSrc(src)}
                      custom={index}
                      variants={shouldAnimate ? polaroidVariants : undefined}
                      initial={shouldAnimate ? 'hidden' : false}
                      whileInView={shouldAnimate ? 'visible' : undefined}
                      viewport={{ once: true, margin: '-20%' }}
                      className="group relative aspect-4/3 w-full overflow-hidden rounded-sm border border-white/10 bg-white/5 p-2 pb-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)"
                      aria-label={`Ver imagen ${index + 1} en grande`}
                    >
                      <div className="relative h-full w-full overflow-hidden rounded-sm">
                        <Image
                          src={src}
                          alt={`${title}, detalle de ambiente ${index + 1} de 3`}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Sticky CTA mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-(--border-subtle) bg-(--color-bg-elevated)/95 px-4 py-3 backdrop-blur-md sm:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-(--color-gold-light) [font-family:var(--font-playfair)]">
              Desde {priceText}
            </p>
            <p className="text-[10px] uppercase tracking-[0.18em] text-(--color-text-muted) font-(--font-jetbrains)">
              {intensityLabel(catalogIntensity)}
            </p>
          </div>
          <button
            type="button"
            onClick={handleReserva}
            className="shrink-0 rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)"
            style={{ background: 'var(--gradient-cta)' }}
          >
            QUIERO ESTA NOCHE
          </button>
        </div>
      </div>

      <ExperienceDetailRelatedRail items={related} />

      <AnimatePresence>
        {lightboxSrc ? (
          <motion.div
            variants={lightboxVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4"
            role="dialog"
            aria-modal="true"
            aria-label="Vista ampliada"
            onClick={() => setLightboxSrc(null)}
          >
            <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
                <Image src={lightboxSrc} alt="" fill sizes="100vw" className="object-contain" />
              </div>
              <button
                type="button"
                onClick={() => setLightboxSrc(null)}
                className="mt-4 w-full rounded-full border border-white/15 bg-white/5 px-6 py-3 font-(--font-jetbrains) text-[11px] uppercase tracking-[0.2em] text-white/85 backdrop-blur-md hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta)"
              >
                Cerrar (Esc)
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
