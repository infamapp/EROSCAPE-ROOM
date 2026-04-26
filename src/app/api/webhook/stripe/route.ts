import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export const runtime = 'nodejs'

/**
 * POST /api/webhook/stripe — eventos Stripe (prototipo: validar firma y registrar tipo; producción: actualizar DB).
 */
export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  const stripeKey = process.env.STRIPE_SECRET_KEY

  if (!webhookSecret || !stripeKey) {
    return NextResponse.json({ error: 'Webhook no configurado' }, { status: 503 })
  }

  const signature = request.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  const rawBody = await request.text()

  let event: Stripe.Event
  try {
    const stripe = new Stripe(stripeKey)
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      // Producción: marcar reserva como confirmada (bookingId en metadata).
      break
    case 'payment_intent.payment_failed':
      // Producción: marcar reserva como payment_failed.
      break
    default:
      break
  }

  if (process.env.NODE_ENV !== 'production') {
    console.info(`[stripe-webhook] ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
