'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useId, useMemo, useState } from 'react'

import { AdvisorContactSection } from '@/components/advisor/AdvisorContactSection'
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
  { id: 'maestro-ia', label: 'EL GAME MASTER IA' },
] as const

const FAQ_ITEMS: ReadonlyArray<FaqItem> = [
  {
    id: 'dentro-sala',
    category: 'experiencia',
    question: '¿Qué pasa exactamente dentro de la sala?',
    answer:
      'La Game Master IA — un sistema autómata, no una persona — orquesta un viaje sensorial personalizado. Estímulos táctiles, auditivos y visuales se alinean con una narrativa que respeta tus límites. Todo ocurre en un ámbito privado: sin Game Master humano en sala.',
  },
  {
    id: 'sugerente-o-profundo',
    category: 'experiencia',
    question: '¿Es realmente intenso o es sugerente?',
    answer:
      'Tú decides la profundidad. La intensidad se calibra antes de entrar y se respeta durante toda la noche. Todo se adapta a tu consentimiento — siempre con discreción, siempre con control.',
  },
  {
    id: 'presencia-humana',
    category: 'privacidad',
    question: '¿Hay personas presentes o alguien escuchando durante la experiencia?',
    answer:
      'No hay presencia humana en sala ni supervisión continua. La experiencia la guía la Game Master IA en un ámbito privado. No existen sistemas de vídeo ni cámaras que graben o escuchen lo que ocurre. Nadie observa tu intimidad.',
  },
  {
    id: 'cameras-grabacion',
    category: 'privacidad',
    question: '¿Hay cámaras, micrófonos o grabaciones?',
    answer:
      'No. No hay sistemas de vídeo ni cámara activos durante la experiencia, ni grabación de audio o imagen de lo que vivís en sala. La privacidad es absoluta salvo que tú actives un canal de contacto humano.',
  },
  {
    id: 'palabra-segura',
    category: 'seguridad',
    question: '¿Qué es la palabra segura y cómo funciona?',
    answer:
      'La palabra segura frena la actividad al instante. Solo entonces — o si tú lo solicitas expresamente — se activa un asistente humano por voz para corroborar que todo está bien. No hay intervención humana continua: solo a petición o en emergencia.',
  },
  {
    id: 'contacto-humano-voz',
    category: 'seguridad',
    question: '¿Cuándo interviene una persona humana?',
    answer:
      'Únicamente si lo pides (desde la app o el protocolo acordado) o si usas la palabra segura. En ese caso un asistente atiende por voz. El resto del tiempo la sala permanece en ámbito privado guiada solo por la IA autómata.',
  },
  {
    id: 'con-quien-ir',
    category: 'reservas',
    question: '¿Con quién puedo ir?',
    answer:
      'A partir de dos personas por experiencia. Disponemos de experiencias para grupos de 2 a 10 personas. Para eventos más personalizados o grupos especiales, contáctanos directamente.',
  },
  {
    id: 'extracto-bancario',
    category: 'privacidad',
    question: '¿Aparecerá esto en mi extracto bancario?',
    answer:
      'En tu extracto bancario aparecerán los datos de la empresa, los cuales no se correlacionan con la naturaleza de la experiencia. Sin huellas.',
  },
  {
    id: 'maestro-ia',
    category: 'maestro-ia',
    question: '¿Qué es el Game Master IA y qué puede hacer?',
    answer:
      'Es una inteligencia artificial autómata: guía narrativa y ambientación en tiempo real (música, luz, ritmo) según tus elecciones y límites. No es un Game Master humano. No juzga: acompaña en la sombra digital. Si necesitas una persona, la activas tú — palabra segura o app — y un asistente responde por voz.',
  },
  {
    id: 'maestro-ia-humano',
    category: 'maestro-ia',
    question: '¿Existe un Game Master humano en la sala?',
    answer:
      'No. Quien guía la experiencia es siempre la Game Master IA. No hay nadie escuchando ni observando de forma continua. El contacto humano existe solo como respaldo por voz, y solo cuando lo solicitas o ante emergencia con la palabra segura.',
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
    <main
      className={cn(
        'min-h-screen pb-20 pt-[calc(var(--layout-nav-height)+env(safe-area-inset-top,0px)+1rem)] sm:pt-[calc(var(--layout-nav-height)+env(safe-area-inset-top,0px)+1.5rem)]',
        className,
      )}
    >
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
          La Game Master IA te guía en un ámbito privado. Si necesitas una persona, la activas tú — nunca al revés.
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

      <AdvisorContactSection
        className="mt-16"
        eyebrow="TU GUÍA"
        title="¿Aún te queda una duda en la garganta?"
        body="Escribinos con calma. Tu privacidad es parte del ritual: no pedimos más de lo necesario."
        ctaLabel="Habla con un asesor"
        secondaryHref="/la-sociedad/seguridad"
        secondaryLabel="Ver consentimiento"
      />
    </main>
  )
}
