'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CheckCircle, Lock } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

import { GameMasterChat } from '@/components/ui/GameMasterChat'
import { AGENT_QUESTIONS } from '@/lib/agent-questionnaire'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const TOTAL = AGENT_QUESTIONS.length
const R = 52
const C = 2 * Math.PI * R

function profileStorageKey(bookingId: string): string {
  return `eroscape_agent_profile_${bookingId}`
}

function loadAnswers(bookingId: string): string[] {
  if (typeof window === 'undefined') return Array(TOTAL).fill('')
  try {
    const raw = window.localStorage.getItem(profileStorageKey(bookingId))
    if (!raw) return Array(TOTAL).fill('')
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return Array(TOTAL).fill('')
    return AGENT_QUESTIONS.map((_, i) => (typeof parsed[i] === 'string' ? parsed[i] : ''))
  } catch {
    return Array(TOTAL).fill('')
  }
}

function saveAnswers(bookingId: string, answers: string[]) {
  try {
    window.localStorage.setItem(profileStorageKey(bookingId), JSON.stringify(answers))
  } catch {
    // ignore
  }
}

interface ProfileFormState {
  answers: string[]
  index: number
  draft: string
}

function getInitialProfileState(bookingId: string): ProfileFormState {
  const next = loadAnswers(bookingId)
  const firstEmpty = next.findIndex((a) => !a.trim())
  const idx = firstEmpty === -1 ? TOTAL - 1 : firstEmpty
  return { answers: next, index: idx, draft: next[idx] ?? '' }
}

export interface AgentProfileTabProps {
  bookingId: string
}

export function AgentProfileTab({ bookingId }: AgentProfileTabProps) {
  const shouldReduceMotion = useReducedMotion()
  const [form, setForm] = useState<ProfileFormState>(() => getInitialProfileState(bookingId))
  const { answers, index, draft } = form
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setDraft = useCallback((value: string) => {
    setForm((f) => ({ ...f, draft: value }))
  }, [])

  const answeredCount = useMemo(() => answers.filter((a) => a.trim().length > 0).length, [answers])
  const dashOffset = C * (1 - answeredCount / TOTAL)

  const handleNext = useCallback(() => {
    const trimmed = draft.trim()
    if (!trimmed) return
    const nextAnswers = [...answers]
    nextAnswers[index] = trimmed
    saveAnswers(bookingId, nextAnswers)
    if (index < TOTAL - 1) {
      const nextIndex = index + 1
      setForm({
        answers: nextAnswers,
        index: nextIndex,
        draft: nextAnswers[nextIndex] ?? '',
      })
    } else {
      setForm({ answers: nextAnswers, index, draft: trimmed })
    }
  }, [answers, bookingId, draft, index])

  const handleSubmitGm = useCallback(async () => {
    setSubmitting(true)
    setError(null)
    const body: Record<string, string> = {}
    answers.forEach((a, i) => {
      body[`q${i}`] = a
    })
    try {
      const res = await fetch('/api/webhook/ia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, answers: body }),
      })
      const data = (await res.json()) as { ok?: boolean; success?: boolean }
      if (!res.ok || (!data.ok && !data.success)) {
        setError('No se pudo enviar. Inténtalo de nuevo.')
        return
      }
      setSubmitted(true)
    } catch {
      setError('Error de red.')
    } finally {
      setSubmitting(false)
    }
  }, [answers, bookingId])

  const scrollToQuestionnaire = useCallback(() => {
    document.getElementById('agent-profile-questionnaire')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const allDone = answeredCount === TOTAL

  return (
    <div className="space-y-10">
      <header>
        <p
          className="[font-family:var(--font-jetbrains)] text-[10px] tracking-[0.25em]"
          style={{ color: 'var(--color-magenta)' }}
        >
          PROGRESO
        </p>
        <h2 className="mt-2 [font-family:var(--font-playfair)] text-2xl text-white">TUS DESEOS DEFINIDOS</h2>
        <p className="mt-2 [font-family:var(--font-inter)] text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Completa estas confesiones para que la Game Master IA ajuste cada detalle a ti.
        </p>
      </header>

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-8">
        <div className="relative h-32 w-32 shrink-0">
          <svg width="128" height="128" viewBox="0 0 120 120" className="-rotate-90" aria-hidden="true">
            <circle
              cx="60"
              cy="60"
              r={R}
              fill="none"
              stroke="color-mix(in srgb, var(--color-magenta) 15%, transparent)"
              strokeWidth="10"
            />
            <circle
              cx="60"
              cy="60"
              r={R}
              fill="none"
              stroke="var(--color-magenta)"
              strokeWidth="10"
              strokeDasharray={C}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="[font-family:var(--font-jetbrains)] text-lg text-white">{answeredCount}</span>
            <span
              className="[font-family:var(--font-jetbrains)] text-[10px]"
              style={{ color: 'var(--color-text-muted)' }}
            >
              /{TOTAL}
            </span>
          </div>
        </div>
        <div className="space-y-3 text-center sm:text-left">
          <p
            className="[font-family:var(--font-jetbrains)] text-sm"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            [{answeredCount}/{TOTAL} confesiones completas]
          </p>
          {answeredCount === 0 ? (
            <button
              type="button"
              onClick={scrollToQuestionnaire}
              className="rounded-full px-5 py-2.5 [font-family:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.2em] text-white transition-[filter,transform] duration-200 hover:brightness-110 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
              style={{ background: 'var(--gradient-cta)' }}
            >
              Completar mis deseos
            </button>
          ) : null}
        </div>
      </div>

      <ul className="grid gap-2 sm:grid-cols-2" aria-label="Estado del cuestionario">
        {AGENT_QUESTIONS.map((q, i) => {
          const done = answers[i]?.trim().length > 0
          return (
            <li
              key={q}
              className="flex items-start gap-2 rounded-lg border px-3 py-2 text-left"
              style={{
                borderColor: i === index ? 'var(--color-magenta)' : 'color-mix(in srgb, var(--color-magenta) 15%, transparent)',
                background: i === index ? 'color-mix(in srgb, var(--color-magenta) 8%, transparent)' : 'var(--color-bg-elevated)',
              }}
            >
              {done ? (
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: 'var(--color-gm-terminal)' }} aria-hidden="true" />
              ) : (
                <Lock className="mt-0.5 h-4 w-4 shrink-0" style={{ color: 'var(--color-text-muted)' }} aria-hidden="true" />
              )}
              <span
                className="[font-family:var(--font-inter)] text-xs leading-snug"
                style={{ color: done ? 'var(--color-text-secondary)' : 'var(--color-text-muted)' }}
              >
                {q}
              </span>
            </li>
          )
        })}
      </ul>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <GameMasterChat onStartQuestionnaire={scrollToQuestionnaire} />

        <div
          id="agent-profile-questionnaire"
          className="rounded-2xl p-5"
          style={{
            border: 'var(--border-subtle)',
            background: 'var(--color-bg-elevated)',
            boxShadow: 'var(--glow-card)',
          }}
        >
          <p
            className="[font-family:var(--font-jetbrains)] text-[10px] tracking-widest"
            style={{ color: 'var(--color-text-muted)' }}
          >
            PREGUNTA {index + 1} / {TOTAL}
          </p>
          <p className="mt-3 [font-family:var(--font-inter)] text-sm leading-relaxed text-white">
            {AGENT_QUESTIONS[index]}
          </p>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={4}
            className="mt-4 w-full resize-none rounded-xl border bg-(--color-bg-base) px-3 py-2 [font-family:var(--font-inter)] text-sm text-white placeholder:text-(--color-text-muted) focus-visible:border-(--color-magenta) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta)"
            style={{ borderColor: 'color-mix(in srgb, var(--color-magenta) 25%, transparent)' }}
            placeholder="Escribe tu respuesta..."
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {['Sí', 'No', 'Prefiero no decirlo'].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setDraft(opt)}
                className="rounded-full border px-3 py-1.5 [font-family:var(--font-inter)] text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta)"
                style={{
                  borderColor: 'color-mix(in srgb, var(--color-magenta) 25%, transparent)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                {opt}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={handleNext}
            disabled={!draft.trim()}
            className="mt-4 w-full rounded-full py-3 [font-family:var(--font-jetbrains)] text-xs tracking-wide text-white disabled:opacity-40"
            style={{ background: 'var(--gradient-cta)' }}
          >
            {index < TOTAL - 1 ? 'SEGUIR CONTANDO →' : 'GUARDAR ÚLTIMA CONFESIÓN'}
          </button>

          <AnimatePresence>
            {allDone ? (
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
                transition={{ duration: 0.3, ease: SENSUAL_EASE }}
                className="mt-6 border-t pt-6"
                style={{ borderColor: 'color-mix(in srgb, var(--color-magenta) 15%, transparent)' }}
              >
                {submitted ? (
                  <p className="[font-family:var(--font-inter)] text-sm" style={{ color: 'var(--color-gm-terminal)' }}>
                    Tus deseos ya están con la Game Master IA.
                  </p>
                ) : (
                  <>
                    {error ? <p className="mb-2 text-sm text-red-400">{error}</p> : null}
                    <button
                      type="button"
                      onClick={() => void handleSubmitGm()}
                      disabled={submitting}
                      className="w-full rounded-full py-3 [font-family:var(--font-jetbrains)] text-xs tracking-wide text-white disabled:opacity-50"
                      style={{ background: 'var(--gradient-hero)' }}
                    >
                      {submitting ? 'ENVIANDO…' : 'ENVIAR MIS DESEOS A LA IA'}
                    </button>
                  </>
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
