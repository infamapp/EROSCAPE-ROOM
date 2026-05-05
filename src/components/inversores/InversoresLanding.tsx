'use client'

import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { BarChart3, FileText, LineChart, Lock, Mail } from 'lucide-react'
import { useMemo, useState } from 'react'

import { cn } from '@/lib/utils'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const heroVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: SENSUAL_EASE } },
}

const panelVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: SENSUAL_EASE } },
}

type InvestorProfile = 'vc' | 'family-office' | 'angel' | 'strategic' | 'otro'

type Metric = { value: string; label: string }

const METRICS: ReadonlyArray<Metric> = [
  { value: '5 ciudades', label: 'Presencia' },
  { value: '25 experiencias', label: 'IPs únicas' },
  { value: '€180 ticket medio', label: 'Margen alto' },
] as const

const MODEL_CARDS: ReadonlyArray<{ title: string; description: string; icon: 'ticket' | 'upsell' | 'membership' | 'licensing' }> =
  [
    {
      title: 'Reservas (Base)',
      description: 'Ticket premium con demanda dinámica y control de disponibilidad.',
      icon: 'ticket',
    },
    {
      title: 'El Baúl (Upsell)',
      description: 'Curaduría de complementos in-situ para elevar la noche con intención.',
      icon: 'upsell',
    },
    {
      title: 'El Tocador (Membresía)',
      description: 'Acceso recurrente a privilegios discretos y agenda prioritaria.',
      icon: 'membership',
    },
    {
      title: 'Licencias (Expansión)',
      description: 'Crecimiento mediante acuerdos operativos con estándares de marca.',
      icon: 'licensing',
    },
  ] as const

function getModelIcon(kind: (typeof MODEL_CARDS)[number]['icon']) {
  switch (kind) {
    case 'ticket':
      return BarChart3
    case 'upsell':
      return LineChart
    case 'membership':
      return FileText
    case 'licensing':
      return Lock
  }
}

export interface InversoresLandingProps {
  className?: string
}

export function InversoresLanding({ className }: InversoresLandingProps) {
  const shouldReduceMotion = useReducedMotion()
  const [profile, setProfile] = useState<InvestorProfile>('vc')

  const profileLabel = useMemo(() => {
    switch (profile) {
      case 'vc':
        return 'VC'
      case 'family-office':
        return 'Family Office'
      case 'angel':
        return 'Business Angel'
      case 'strategic':
        return 'Partner estratégico'
      case 'otro':
        return 'Otro'
    }
  }, [profile])

  return (
    <main className={cn('min-h-screen pb-24 ', className)}>
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.0), color-mix(in_srgb,var(--color-bg)_82%,transparent) 55%, var(--color-bg))',
            }}
          />
          <Image
            src="/inversores-placeholder.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div
            className="absolute inset-0 -z-10"
            style={{ background: 'radial-gradient(60% 60% at 50% 25%, rgba(207,156,43,0.12), transparent 60%)' }}
            aria-hidden="true"
          />
        </div>

        <div className="mx-auto flex min-h-[92vh] max-w-6xl flex-col items-center justify-center px-4 py-14 text-center sm:px-6">
          <motion.div
            className="mb-5"
            variants={heroVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            animate={shouldReduceMotion ? undefined : 'visible'}
          >
            <Image
              src="/erosGold.png"
              alt="Eroscape"
              width={150}
              height={150}
              priority
              className="h-56 w-56 select-none drop-shadow-[0_0_28px_rgba(207,156,43,0.25)] sm:h-56 sm:w-56"
            />
          </motion.div>
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.42em] text-(--color-gold)"
            variants={heroVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            animate={shouldReduceMotion ? undefined : 'visible'}
          >
            Inversión discreta
          </motion.p>
          <motion.h1
            className="mt-5 text-balance font-serif text-5xl font-semibold uppercase leading-[0.95] text-white sm:text-6xl md:text-7xl"
            variants={heroVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            animate={shouldReduceMotion ? undefined : 'visible'}
          >
            Una categoría nueva.
            <br />
            Una oportunidad única.
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-(--color-text-secondary) sm:text-lg"
            variants={heroVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            animate={shouldReduceMotion ? undefined : 'visible'}
          >
            Eroscape es una plataforma de experiencias inmersivas premium, construida sobre narrativa, tecnología y privacidad. Una propuesta
            elegante, adulta y cuidada — sin lo explícito, con lo memorable.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-10 sm:gap-14"
            variants={heroVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            animate={shouldReduceMotion ? undefined : 'visible'}
          >
            {METRICS.map((m) => (
              <div key={m.label} className="text-center">
                <div className="text-4xl font-semibold tracking-tight text-(--color-gold) sm:text-5xl">{m.value}</div>
                <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">{m.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="mt-12"
            variants={heroVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            animate={shouldReduceMotion ? undefined : 'visible'}
          >
            <a
              href="#contacto"
              className="inline-flex items-center justify-center rounded-full px-9 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-black bg-(--color-gold)"
            >
              Solicitar información
            </a>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-(--color-gold)">Potencial</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold text-white sm:text-4xl">
              La economía de la experiencia sigue creciendo.
            </h2>
            <p className="mt-6 text-pretty text-sm leading-relaxed text-(--color-text-secondary) sm:text-base">
              En un mercado saturado de lo predecible, las experiencias inmersivas premium ganan terreno. Eroscape toma esa tendencia y la
              traduce en una propuesta con alto valor percibido, repetición y expansión controlada.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-baseline gap-4">
                <span className="text-xl font-semibold text-(--color-gold)">+42%</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                  crecimiento interanual estimado
                </span>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="text-xl font-semibold text-(--color-gold)">€2.4B</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">mercado experiencial (TAM)</span>
              </div>
            </div>
          </div>

          <motion.div
            className="rounded-2xl border p-7 sm:p-8"
            style={{
              borderColor: 'rgba(255,255,255,0.10)',
              background: 'color-mix(in_srgb,var(--color-bg-elevated)_70%,transparent)',
            }}
            variants={panelVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            whileInView={shouldReduceMotion ? undefined : 'visible'}
            viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Crecimiento (referencial)</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-(--color-gold)">Señal</span>
            </div>

            <div className="mt-6 flex h-48 items-end gap-2">
              {['25%', '33%', '40%', '50%', '75%', '100%'].map((h, idx) => (
                <div
                  key={h}
                  className="flex-1 rounded-sm"
                  style={{
                    height: h,
                    background:
                      idx === 5
                        ? 'linear-gradient(180deg, rgba(207,156,43,0.95), rgba(207,156,43,0.30))'
                        : 'rgba(207,156,43,0.18)',
                    boxShadow: idx === 5 ? '0 0 22px rgba(207,156,43,0.25)' : undefined,
                  }}
                  aria-hidden="true"
                />
              ))}
            </div>

            <div className="mt-6 flex justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
              <span>2018</span>
              <span>2020</span>
              <span>2022</span>
              <span>2024</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold uppercase tracking-[0.14em] text-white sm:text-4xl">Modelo</h2>
          <div className="mx-auto mt-4 h-px w-24" style={{ backgroundColor: 'rgba(207,156,43,0.65)' }} />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MODEL_CARDS.map((card) => {
            const Icon = getModelIcon(card.icon)
            return (
              <motion.div
                key={card.title}
                className="group rounded-2xl border p-7 transition-[border-color,box-shadow] duration-500"
                style={{
                  borderColor: 'rgba(255,255,255,0.10)',
                  background: 'color-mix(in_srgb,var(--color-bg-elevated)_72%,transparent)',
                }}
                variants={panelVariants}
                initial={shouldReduceMotion ? false : 'hidden'}
                whileInView={shouldReduceMotion ? undefined : 'visible'}
                viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
              >
                <Icon className="h-8 w-8 text-(--color-gold)" />
                <h3 className="mt-5 text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-(--color-text-secondary)">{card.description}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      <section
        className="border-y py-20"
        style={{
          borderColor: 'rgba(255,255,255,0.06)',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.02), transparent)',
        }}
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 md:grid-cols-3">
          {[
            {
              n: '01',
              title: 'Cambio cultural',
              body: 'Auge de la sexualidad positiva y de la búsqueda de intimidad cuidada, sin vulgaridad.',
            },
            {
              n: '02',
              title: 'Economía de la experiencia',
              body: 'El gasto se desplaza de objetos a vivencias con historia, diseño y exclusividad.',
            },
            {
              n: '03',
              title: 'Ventaja de categoría',
              body: 'Una propuesta diferenciada, premium y escalable por estándares y tecnología.',
            },
          ].map((item) => (
            <div key={item.n} className="text-center md:px-6">
              <div className="text-3xl font-semibold text-(--color-gold)">{item.n}</div>
              <div className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-white">{item.title}</div>
              <p className="mx-auto mt-3 max-w-sm text-pretty text-sm leading-relaxed text-white/40">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6" id="contacto">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Contacto</h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-(--color-text-secondary) sm:text-base">
            Acceso solo para inversores acreditados. Sin sobreexposición: lo mínimo necesario, con la máxima discreción.
          </p>
        </div>

        <div
          className="mt-10 rounded-3xl border p-8 sm:p-10"
          style={{
            borderColor: 'rgba(255,255,255,0.10)',
            background: 'color-mix(in_srgb,var(--color-bg-elevated)_72%,transparent)',
          }}
        >
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="ml-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40" htmlFor="nombre">
                  Nombre completo
                </label>
                <input
                  id="nombre"
                  type="text"
                  className={cn(
                    'w-full rounded-xl border px-4 py-4 text-sm text-white outline-none transition-[border-color,box-shadow] duration-300',
                    'bg-transparent',
                  )}
                  style={{
                    borderColor: 'rgba(255,255,255,0.10)',
                    boxShadow: 'none',
                  }}
                  placeholder="Tu nombre"
                />
              </div>
              <div className="space-y-2">
                <label className="ml-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40" htmlFor="email">
                  Email profesional
                </label>
                <input
                  id="email"
                  type="email"
                  className={cn(
                    'w-full rounded-xl border px-4 py-4 text-sm text-white outline-none transition-[border-color,box-shadow] duration-300',
                    'bg-transparent',
                  )}
                  style={{ borderColor: 'rgba(255,255,255,0.10)' }}
                  placeholder="nombre@firma.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40" htmlFor="perfil">
                Perfil de inversor
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                {(
                  [
                    { id: 'vc', label: 'VC' },
                    { id: 'family-office', label: 'Family Office' },
                    { id: 'angel', label: 'Angel' },
                    { id: 'strategic', label: 'Estratégico' },
                    { id: 'otro', label: 'Otro' },
                  ] as const
                ).map((opt) => {
                  const active = opt.id === profile
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setProfile(opt.id)}
                      className={cn(
                        'rounded-full border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] transition-[border-color,background-color,color] duration-300',
                        active ? 'text-black' : 'text-white/60 hover:text-white',
                      )}
                      style={{
                        borderColor: active ? 'transparent' : 'rgba(255,255,255,0.12)',
                        background: active
                          ? 'linear-gradient(135deg, color-mix(in_srgb,var(--color-gold)_88%,white), var(--color-gold))'
                          : 'transparent',
                      }}
                      aria-pressed={active}
                    >
                      {opt.label}
                    </button>
                  )
                })}
              </div>
              <p className="text-[11px] text-white/35">Seleccionado: {profileLabel}</p>
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40" htmlFor="mensaje">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                rows={4}
                className={cn(
                  'w-full rounded-2xl border px-4 py-4 text-sm text-white outline-none transition-[border-color,box-shadow] duration-300',
                  'bg-transparent',
                )}
                style={{ borderColor: 'rgba(255,255,255,0.10)' }}
                placeholder="Qué te interesa conocer"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="inline-flex items-center gap-2 text-[11px] text-white/40">
                <Mail className="h-4 w-4 text-(--color-gold)" />
                Respondemos con discreción.
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-black"
                style={{
                  background: 'linear-gradient(135deg, color-mix(in_srgb,var(--color-gold)_88%,white), var(--color-gold))',
                }}
              >
                Enviar solicitud
              </button>
            </div>
          </form>
        </div>

        <AnimatePresence>
          <motion.p
            className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-2 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-white/30"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: SENSUAL_EASE }}
          >
            <Lock className="h-4 w-4 text-(--color-gold)" /> Confidencial • Compartimos material solo bajo solicitud
          </motion.p>
        </AnimatePresence>
      </section>
    </main>
  )
}

