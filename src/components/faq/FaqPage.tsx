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
  { id: 'todas', label: 'TODAS' },
  { id: 'experiencia', label: 'LA EXPERIENCIA' },
  { id: 'reservas', label: 'RESERVAS' },
  { id: 'seguridad', label: 'SEGURIDAD' },
  { id: 'privacidad', label: 'PRIVACIDAD' },
  { id: 'maestro-ia', label: 'EL MAESTRO IA' },
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
          className="mt-4 text-balance font-(--font-cormorant) text-5xl italic leading-[1.02] text-white sm:text-6xl"
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
          Si no encontrás lo que buscás, el Maestro puede guiarte con calma — sin exponer nada que no quieras revelar.
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
                  'rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-[border-color,color,background-color,filter] duration-300',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)',
                  isActive
                    ? 'text-white'
                    : 'border-(--border-subtle) text-(--color-text-muted) hover:text-white',
                )}
                style={isActive ? { background: 'var(--gradient-cta)' } : undefined}
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
              className={cn(
                'overflow-hidden rounded-xl border-(--border-subtle) bg-(--color-bg-elevated)',
                expanded && 'border-l-2 border-l-(--color-magenta)',
              )}
              variants={cardVariants}
              initial={shouldReduceMotion ? false : 'hidden'}
              whileInView={shouldReduceMotion ? undefined : 'visible'}
              viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
            >
              <button
                id={triggerId}
                type="button"
                className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left transition-colors hover:bg-(--color-magenta)/5"
                onClick={() => setOpenId((current) => (current === item.id ? null : item.id))}
                aria-expanded={expanded}
                aria-controls={panelId}
              >
                <span className="font-(--font-inter) text-sm font-medium text-(--color-text-primary)">
                  {item.question}
                </span>
                <motion.span
                  className="flex-none text-(--color-text-muted)"
                  animate={shouldReduceMotion ? undefined : { rotate: expanded ? 180 : 0 }}
                  transition={shouldReduceMotion ? undefined : { duration: 0.25, ease: SENSUAL_EASE }}
                  aria-hidden="true"
                >
                  <ChevronDown className="h-5 w-5" strokeWidth={1.35} />
                </motion.span>
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
                    className="px-5 pb-4"
                    style={{ overflow: 'hidden' }}
                  >
                    <p className="text-pretty font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary)">
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
        <div className="tocador-glass mx-auto max-w-2xl rounded-2xl p-8 text-center">
          <h3 className="font-(--font-cormorant) text-2xl italic text-white">
            ¿Aún te queda una duda en la garganta?
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-pretty font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary)">
            Escribinos con calma. Tu privacidad es parte del ritual: no pedimos más de lo necesario.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="/la-sociedad/seguridad"
              className="rounded-full border-(--border-subtle) px-8 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/5"
            >
              VER CONSENTIMIENTO
            </a>
            <a
              href="/contacto"
              className="rounded-full px-8 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white"
              style={{ background: 'var(--gradient-cta)' }}
            >
              CONTACTAR
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

