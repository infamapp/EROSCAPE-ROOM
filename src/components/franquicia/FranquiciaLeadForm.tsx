'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2, LockKeyhole } from 'lucide-react'
import { useState, type FormEvent } from 'react'

import {
  FRANCHISE_CITY_OPTIONS,
  FRANCHISE_PAGE_COPY,
} from '@/lib/franchise'
import { cn } from '@/lib/utils'
import type { FranchiseLeadFormState } from '@/types/franchise-lead'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const panelVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: SENSUAL_EASE } },
} as const

const INITIAL_STATE: FranchiseLeadFormState = {
  nombre: '',
  email: '',
  telefono: '',
  ciudadSlug: '',
  ciudadOtra: '',
  mensaje: '',
}

const fieldBorder = { borderBottom: '1px solid color-mix(in srgb, var(--color-gold) 30%, transparent)' } as const

export interface FranquiciaLeadFormProps {
  className?: string
}

export function FranquiciaLeadForm({ className }: FranquiciaLeadFormProps) {
  const shouldReduceMotion = useReducedMotion()
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<FranchiseLeadFormState>(INITIAL_STATE)

  const showOtraCiudad = form.ciudadSlug === 'otra'

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const selectedCity = FRANCHISE_CITY_OPTIONS.find((c) => c.slug === form.ciudadSlug)
    const isOtra = form.ciudadSlug === 'otra'

    try {
      const res = await fetch('/api/franquicia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          telefono: form.telefono,
          ciudad: isOtra ? 'otra' : (selectedCity?.label ?? form.ciudadSlug),
          ciudadDetalle: isOtra ? form.ciudadOtra : undefined,
          mensaje: form.mensaje || undefined,
        }),
      })

      const data: unknown = await res.json()
      if (!res.ok) {
        const message =
          typeof data === 'object' &&
          data !== null &&
          'error' in data &&
          typeof (data as { error: unknown }).error === 'string'
            ? (data as { error: string }).error
            : 'No pudimos enviar tu solicitud. Inténtalo de nuevo.'
        setError(message)
        return
      }

      setSubmitted(true)
      setForm(INITIAL_STATE)
    } catch {
      setError('Error de conexión. Comprueba tu red e inténtalo de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={cn(className)}>
      <h2 className="text-3xl font-semibold text-white [font-family:var(--font-playfair)] sm:text-4xl">
        {FRANCHISE_PAGE_COPY.formTitle}
      </h2>
      <p className="mt-4 font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary) sm:text-base">
        {FRANCHISE_PAGE_COPY.formIntro}
      </p>

      <motion.div
        className="mt-10 rounded-3xl border p-8 sm:p-10"
        style={{
          borderColor: 'color-mix(in srgb, var(--color-gold) 20%, transparent)',
          background: 'var(--color-bg-elevated)',
        }}
        variants={panelVariants}
        initial={shouldReduceMotion ? false : 'hidden'}
        whileInView={shouldReduceMotion ? undefined : 'visible'}
        viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      >
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="submitted"
              variants={panelVariants}
              initial={shouldReduceMotion ? false : 'hidden'}
              animate={shouldReduceMotion ? undefined : 'visible'}
              className="flex flex-col items-center justify-center gap-3 py-12 text-center"
            >
              <CheckCircle2 className="h-10 w-10 text-(--color-gold-light)" aria-hidden="true" />
              <p className="text-sm font-semibold text-white [font-family:var(--font-playfair)]">
                {FRANCHISE_PAGE_COPY.successTitle}
              </p>
              <p className="max-w-md text-sm text-(--color-text-secondary) [font-family:var(--font-inter)]">
                {FRANCHISE_PAGE_COPY.successBody}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              className="space-y-6"
              onSubmit={handleSubmit}
              variants={panelVariants}
              initial={shouldReduceMotion ? false : 'hidden'}
              animate={shouldReduceMotion ? undefined : 'visible'}
            >
              <div>
                <label
                  className="mb-1 block text-[9px] uppercase tracking-[0.22em] text-(--color-text-muted) [font-family:var(--font-jetbrains)]"
                  htmlFor="franquicia-nombre"
                >
                  Nombre o empresa
                </label>
                <input
                  id="franquicia-nombre"
                  value={form.nombre}
                  onChange={(e) => setForm((s) => ({ ...s, nombre: e.target.value }))}
                  type="text"
                  required
                  autoComplete="name"
                  className="w-full bg-transparent py-2 text-sm text-white outline-none [font-family:var(--font-inter)] focus-visible:ring-2 focus-visible:ring-(--color-gold)/40"
                  style={fieldBorder}
                />
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label
                    className="mb-1 block text-[9px] uppercase tracking-[0.22em] text-(--color-text-muted) [font-family:var(--font-jetbrains)]"
                    htmlFor="franquicia-email"
                  >
                    Correo
                  </label>
                  <input
                    id="franquicia-email"
                    value={form.email}
                    onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full bg-transparent py-2 text-sm text-white outline-none [font-family:var(--font-inter)] focus-visible:ring-2 focus-visible:ring-(--color-gold)/40"
                    style={fieldBorder}
                  />
                </div>
                <div>
                  <label
                    className="mb-1 block text-[9px] uppercase tracking-[0.22em] text-(--color-text-muted) [font-family:var(--font-jetbrains)]"
                    htmlFor="franquicia-telefono"
                  >
                    Teléfono
                  </label>
                  <input
                    id="franquicia-telefono"
                    value={form.telefono}
                    onChange={(e) => setForm((s) => ({ ...s, telefono: e.target.value }))}
                    type="tel"
                    required
                    autoComplete="tel"
                    className="w-full bg-transparent py-2 text-sm text-white outline-none [font-family:var(--font-inter)] focus-visible:ring-2 focus-visible:ring-(--color-gold)/40"
                    style={fieldBorder}
                  />
                </div>
              </div>

              <div>
                <label
                  className="mb-1 block text-[9px] uppercase tracking-[0.22em] text-(--color-text-muted) [font-family:var(--font-jetbrains)]"
                  htmlFor="franquicia-ciudad"
                >
                  ¿En qué ciudad te gustaría abrir?
                </label>
                <select
                  id="franquicia-ciudad"
                  value={form.ciudadSlug}
                  onChange={(e) => setForm((s) => ({ ...s, ciudadSlug: e.target.value }))}
                  required
                  className="w-full cursor-pointer appearance-none bg-transparent py-2 text-sm text-white outline-none [font-family:var(--font-inter)] focus-visible:ring-2 focus-visible:ring-(--color-gold)/40"
                  style={fieldBorder}
                >
                  <option value="" disabled className="bg-(--color-bg-elevated) text-(--color-text-muted)">
                    Selecciona una ciudad
                  </option>
                  {FRANCHISE_CITY_OPTIONS.map((city) => (
                    <option key={city.slug} value={city.slug} className="bg-(--color-bg-elevated)">
                      {city.label}
                    </option>
                  ))}
                </select>
              </div>

              {showOtraCiudad ? (
                <div>
                  <label
                    className="mb-1 block text-[9px] uppercase tracking-[0.22em] text-(--color-text-muted) [font-family:var(--font-jetbrains)]"
                    htmlFor="franquicia-ciudad-otra"
                  >
                    Indica tu ciudad
                  </label>
                  <input
                    id="franquicia-ciudad-otra"
                    value={form.ciudadOtra}
                    onChange={(e) => setForm((s) => ({ ...s, ciudadOtra: e.target.value }))}
                    type="text"
                    required
                    placeholder="Ej. Málaga, Lisboa…"
                    className="w-full bg-transparent py-2 text-sm text-white outline-none placeholder:text-(--color-text-muted) [font-family:var(--font-inter)] focus-visible:ring-2 focus-visible:ring-(--color-gold)/40"
                    style={fieldBorder}
                  />
                </div>
              ) : null}

              <div>
                <label
                  className="mb-1 block text-[9px] uppercase tracking-[0.22em] text-(--color-text-muted) [font-family:var(--font-jetbrains)]"
                  htmlFor="franquicia-mensaje"
                >
                  Mensaje <span className="text-(--color-text-muted)">(opcional)</span>
                </label>
                <textarea
                  id="franquicia-mensaje"
                  value={form.mensaje}
                  onChange={(e) => setForm((s) => ({ ...s, mensaje: e.target.value }))}
                  rows={4}
                  className="w-full resize-y bg-transparent py-2 text-sm text-white outline-none [font-family:var(--font-inter)] focus-visible:ring-2 focus-visible:ring-(--color-gold)/40"
                  style={fieldBorder}
                />
              </div>

              {error ? (
                <p className="text-sm text-(--color-magenta) [font-family:var(--font-inter)]" role="alert">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-full border px-7 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-(--color-gold-light) transition-[background-color,opacity] [font-family:var(--font-jetbrains)] enabled:hover:bg-(--color-gold)/10 disabled:opacity-60 sm:w-auto"
                style={{ borderColor: 'var(--color-gold)' }}
              >
                {isSubmitting ? 'Enviando…' : FRANCHISE_PAGE_COPY.submitLabel}
              </button>

              <p className="flex items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-(--color-text-muted) [font-family:var(--font-jetbrains)]">
                <LockKeyhole className="h-4 w-4 text-(--color-gold)" aria-hidden="true" />
                {FRANCHISE_PAGE_COPY.privacyNote}
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
