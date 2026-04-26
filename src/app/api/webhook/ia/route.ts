import { NextResponse } from 'next/server'

import type { Archetype } from '@/types/archetype'

export const runtime = 'nodejs'

export interface WebhookIaBody {
  bookingId: string
  answers: Record<string, string>
  safeWord?: string
  archetype?: Archetype
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

function isArchetype(v: unknown): v is Archetype {
  if (!isRecord(v)) return false
  return (
    typeof v.id === 'string' &&
    typeof v.name === 'string' &&
    typeof v.icon === 'string' &&
    typeof v.description === 'string' &&
    typeof v.gradient === 'string'
  )
}

function verifyIaAuthorization(request: Request): boolean {
  const secret = process.env.IA_WEBHOOK_SECRET
  if (!secret) return true
  const auth = request.headers.get('authorization')
  if (!auth) return false
  const expected = `Bearer ${secret}`
  return auth === expected || auth === secret
}

function parseBody(raw: unknown): { ok: true; body: WebhookIaBody } | { ok: false; error: string } {
  if (!isRecord(raw)) return { ok: false, error: 'invalid_json' }
  if (typeof raw.bookingId !== 'string' || raw.bookingId.length === 0) {
    return { ok: false, error: 'invalid_booking' }
  }
  if (!isRecord(raw.answers)) return { ok: false, error: 'invalid_answers' }
  const answers: Record<string, string> = {}
  for (const [k, val] of Object.entries(raw.answers)) {
    if (typeof val === 'string') answers[k] = val
  }
  const safeWord = typeof raw.safeWord === 'string' ? raw.safeWord : undefined
  const archetype = isArchetype(raw.archetype) ? raw.archetype : undefined
  return { ok: true, body: { bookingId: raw.bookingId, answers, safeWord, archetype } }
}

/**
 * POST /api/webhook/ia — cuestionario IA hacia sistema externo (prototipo sin URL: mock).
 */
export async function POST(request: Request) {
  if (!verifyIaAuthorization(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'parse_error' }, { status: 400 })
  }

  const parsed = parseBody(raw)
  if (!parsed.ok) {
    return NextResponse.json({ success: false, error: parsed.error }, { status: 400 })
  }

  const { body } = parsed
  const targetUrl = process.env.IA_WEBHOOK_URL

  if (!targetUrl) {
    return NextResponse.json({ success: true as const, mock: true as const, ok: true as const })
  }

  const outbound = {
    bookingId: body.bookingId,
    answers: body.answers,
    ...(body.safeWord !== undefined ? { safeWord: body.safeWord } : {}),
    ...(body.archetype !== undefined ? { archetype: body.archetype } : {}),
  }

  const secret = process.env.IA_WEBHOOK_SECRET
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (secret) {
    headers.Authorization = `Bearer ${secret}`
  }

  try {
    const res = await fetch(targetUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(outbound),
    })
    if (!res.ok) {
      return NextResponse.json({ success: false, error: 'Webhook delivery failed' }, { status: 502 })
    }
    return NextResponse.json({ success: true as const, ok: true as const })
  } catch {
    return NextResponse.json({ success: false, error: 'Webhook delivery failed' }, { status: 502 })
  }
}
