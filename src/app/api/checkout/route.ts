import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export const runtime = 'nodejs'

export interface CheckoutRequestBody {
  bookingId: string
  totalAmount: number
  currency: 'eur'
}

function isCheckoutBody(v: unknown): v is CheckoutRequestBody {
  if (typeof v !== 'object' || v === null) return false
  const o = v as Record<string, unknown>
  return (
    typeof o.bookingId === 'string' &&
    o.bookingId.trim().length > 0 &&
    typeof o.totalAmount === 'number' &&
    Number.isFinite(o.totalAmount) &&
    o.totalAmount > 0 &&
    o.currency === 'eur'
  )
}

/**
 * POST /api/checkout — crea PaymentIntent de Stripe (metadata bookingId, descriptor neutro).
 */
export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'No se pudo iniciar el pago' }, { status: 500 })
  }

  if (!isCheckoutBody(body)) {
    return NextResponse.json({ error: 'Datos de pago inválidos' }, { status: 400 })
  }

  const secret = process.env.STRIPE_SECRET_KEY
  if (!secret) {
    return NextResponse.json({ error: 'No se pudo iniciar el pago' }, { status: 500 })
  }

  const amountCents = Math.max(50, Math.round(body.totalAmount * 100))

  try {
    const stripe = new Stripe(secret)
    const intent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: 'eur',
      automatic_payment_methods: { enabled: true },
      metadata: { bookingId: body.bookingId },
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
