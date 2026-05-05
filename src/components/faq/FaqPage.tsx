'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useId, useMemo, useState } from 'react'

import { cn } from '@/lib/utils'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

type FaqCategory = 'todas' | 'experiencia' | 'reservas' | 'seguridad' | 'privacidad' | 'maestro-ia'

type FaqItem = {
  id: string
  category: Exclude<FaqCategory, 'todas'>
  question: string
  answer: string
}

const CATEGORIES: ReadonlyArray<{ id: FaqCategory; label: string }> = [
  { id: 'todas', label: 'Todas' },
  { id: 'experiencia', label: 'La Experiencia' },
  { id: 'reservas', label: 'Reservas' },
  { id: 'seguridad', label: 'Seguridad' },
  { id: 'privacidad', label: 'Privacidad' },
  { id: 'maestro-ia', label: 'El Maestro IA' },
] as const

const FAQ_ITEMS: ReadonlyArray<FaqItem> = [
  {
    id: 'dentro-sala',
    category: 'experiencia',
    question: '¿Qué pasa exactamente dentro de la sala?',
    answer:
      'El Maestro orquesta un viaje sensorial personalizado. Estímulos táctiles, auditivos y visuales se alinean con una narrativa que se ajusta a tus límites. No es solo un escape room: es una coreografía íntima y elegante.',
  },
  {
    id: 'sugerente-o-profundo',
    category: 'experiencia',
    question: '¿Es realmente intenso o es solo sugerente?',
    answer:
      'Tú decides la profundidad. La intensidad se calibra antes de entrar y se respeta durante toda la noche. Todo se adapta a tu consentimiento — siempre con discreción, siempre con control.',
  },
  {
    id: 'presencia-humana',
    category: 'privacidad',
    question: '¿Hay personas presentes durante la experiencia?',
    answer:
      'La privacidad es un pilar. La sala se guía desde la sombra y sin supervisión humana directa en el espacio, salvo que una narrativa específica indique lo contrario (siempre se comunica de antemano).',
  },
  {
    id: 'palabra-segura',
    category: 'seguridad',
    question: '¿Qué es la palabra segura y cómo funciona?',
    answer:
      'Es tu control absoluto. Si la pronuncias, la experiencia se detiene, el ambiente cambia a modo seguro y se habilitan salidas. Tu bienestar es el límite no negociable.',
  },
  {
    id: 'con-quien-ir',
    category: 'reservas',
    question: '¿Con quién puedo ir?',
    answer:
      'Puedes venir a solas, en pareja o en un grupo reducido (hasta 4). La dinámica cambia según tu elección: más íntima, más social, o más estratégica — siempre cuidada.',
  },
  {
    id: 'extracto-bancario',
    category: 'privacidad',
    question: '¿Aparecerá esto en mi extracto bancario?',
    answer:
      'Discreción ante todo: los cargos se muestran bajo un descriptor comercial neutro. La naturaleza de tu visita se queda contigo.',
  },
  {
    id: 'maestro-ia',
    category: 'maestro-ia',
    question: '¿Qué es el Maestro IA y qué puede hacer?',
    answer:
      'El Maestro es un sistema de guía narrativa y ambientación. Ajusta música, luz y ritmo en función de tus elecciones, manteniendo el tono y la seguridad. No “juzga”: acompaña.',
  },
] as const

const headerVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: SENSUAL_EASE } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: SENSUAL_EASE } },
}

export interface FaqPageProps {
  className?: string
}

export function FaqPage({ className }: FaqPageProps) {
  const shouldReduceMotion = useReducedMotion()
  const baseId = useId()
  const [activeCategory, setActiveCategory] = useState<FaqCategory>('todas')
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null)

  const visibleItems = useMemo(() => {
    if (activeCategory === 'todas') return FAQ_ITEMS
    return FAQ_ITEMS.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  return (
    <main className={cn('min-h-screen pb-20 pt-16 sm:pt-20', className)}>
      <section className="mx-auto max-w-4xl px-4 pt-12 text-center sm:px-6">
        <motion.p
          className="text-xs font-semibold uppercase tracking-[0.22em] text-(--color-magenta)"
          variants={headerVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          animate={shouldReduceMotion ? undefined : 'visible'}
        >
          Lo que todos preguntan (pero pocos se atreven a decir)
        </motion.p>
        <motion.h1
          className="mt-4 text-balance font-(--font-cormorant,serif) text-5xl italic leading-[1.02] text-white sm:text-6xl"
          variants={headerVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          animate={shouldReduceMotion ? undefined : 'visible'}
        >
          Tus dudas, resueltas.
        </motion.h1>
        <motion.p
          className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-(--color-text-secondary)"
          variants={headerVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          animate={shouldReduceMotion ? undefined : 'visible'}
        >
          Si no encuentras lo que buscas, el Maestro puede guiarte con calma — sin exponer nada que no quieras revelar.
        </motion.p>
      </section>

      <section className="mx-auto mt-10 max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCategory
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-[border-color,color,background-color,box-shadow] duration-300',
                  isActive
                    ? 'text-(--color-bg)'
                    : 'border text-(--color-text-secondary) hover:text-white',
                )}
                style={{
                  background: isActive ? 'var(--gradient-cta)' : undefined,
                  borderColor: isActive ? 'transparent' : 'rgba(255,255,255,0.10)',
                  boxShadow: isActive ? '0 0 18px rgba(185,48,158,0.28)' : undefined,
                }}
                aria-pressed={isActive}
              >
                {cat.label}
              </button>
            )
          })}
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-4xl space-y-3 px-4 sm:px-6">
        {visibleItems.map((item) => {
          const expanded = openId === item.id
          const triggerId = `${baseId}-${item.id}-trigger`
          const panelId = `${baseId}-${item.id}-panel`

          return (
            <motion.div
              key={item.id}
              className="overflow-hidden rounded-2xl border bg-[color-mix(in_srgb,var(--color-bg-elevated)_70%,transparent)]"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              variants={cardVariants}
              initial={shouldReduceMotion ? false : 'hidden'}
              whileInView={shouldReduceMotion ? undefined : 'visible'}
              viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
            >
              <button
                id={triggerId}
                type="button"
                className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left sm:px-8"
                onClick={() => setOpenId((current) => (current === item.id ? null : item.id))}
                aria-expanded={expanded}
                aria-controls={panelId}
              >
                <span className="text-lg font-semibold text-white sm:text-xl">{item.question}</span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 flex-none transition-transform duration-300',
                    expanded ? 'rotate-180 text-(--color-gold)' : 'text-(--color-text-secondary)',
                  )}
                />
              </button>

              <AnimatePresence initial={false}>
                {expanded ? (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={shouldReduceMotion ? undefined : { height: 'auto', opacity: 1 }}
                    exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: SENSUAL_EASE }}
                    className="px-6 pb-6 sm:px-8"
                  >
                    <p className="text-pretty text-sm leading-relaxed text-(--color-text-secondary) sm:text-base">
                      {item.answer}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </section>

      <section className="mx-auto mt-16 max-w-5xl px-4 sm:px-6">
        <div
          className="relative overflow-hidden rounded-3xl border p-10 text-center sm:p-14"
          style={{
            borderColor: 'rgba(255,255,255,0.08)',
            background: 'color-mix(in_srgb,var(--color-bg-elevated)_72%,transparent)',
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(185,48,158,0.10), transparent 55%)' }}
            aria-hidden="true"
          />
          <div className="relative">
            <h2 className="text-balance font-(--font-cormorant,serif) text-3xl italic text-white sm:text-4xl">
              ¿Aún te queda una duda en la garganta?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-(--color-text-secondary) sm:text-base">
              Escríbenos con calma. Tu privacidad es parte del ritual: no pedimos más de lo necesario.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="/la-sociedad/seguridad"
                className="rounded-full border px-8 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/5"
                style={{ borderColor: 'rgba(255,255,255,0.14)' }}
              >
                Ver consentimiento
              </a>
              <a
                href="/la-sociedad"
                className="rounded-full px-8 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white"
                style={{ background: 'var(--gradient-cta)' }}
              >
                Contactar
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

