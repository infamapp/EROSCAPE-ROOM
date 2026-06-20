import { NextResponse } from 'next/server'
import Stripe from 'stripe'

import { parseBookingStateJson } from '@/lib/api-booking-validation'
import { getBookingTotalPrice } from '@/lib/booking-pricing'

export const runtime = 'nodejs'

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

/**
 * POST /api/checkout — crea PaymentIntent de Stripe (metadata bookingId, descriptor neutro).
 * El importe se recalcula en servidor a partir del estado de la reserva: nunca se confía
 * en un monto enviado por el cliente.
 */
export async function POST(request: Request) {
  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return NextResponse.json({ error: 'No se pudo iniciar el pago' }, { status: 500 })
  }

  const parsed = parseBookingStateJson(isRecord(raw) ? raw.state ?? raw : raw)
  if (!parsed.ok) {
    return NextResponse.json({ error: 'Datos de reserva inválidos' }, { status: 400 })
  }

  const secret = process.env.STRIPE_SECRET_KEY
  if (!secret) {
    return NextResponse.json({ error: 'No se pudo iniciar el pago' }, { status: 500 })
  }

  const { state } = parsed
  const totalEur = getBookingTotalPrice(state)
  const amountCents = Math.max(50, Math.round(totalEur * 100))

  try {
    const stripe = new Stripe(secret)
    const intent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: 'eur',
      automatic_payment_methods: { enabled: true },
      metadata: { bookingId: state.bookingId },
      description: 'Ocio y Eventos SL',
      statement_descriptor: 'OCIO EVENTOS',
    })

    if (!intent.client_secret) {
      return NextResponse.json({ error: 'No se pudo iniciar el pago' }, { status: 500 })
    }

    return NextResponse.json({ clientSecret: intent.client_secret })
  } catch {
    return NextResponse.json({ error: 'No se pudo iniciar el pago' }, { status: 500 })
  }
}
