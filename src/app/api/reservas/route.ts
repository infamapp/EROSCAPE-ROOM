import { NextResponse } from 'next/server'

import {
  makeConfirmationCode,
  parseBookingPayerJson,
  parseBookingStateJson,
} from '@/lib/api-booking-validation'

export const runtime = 'nodejs'

/**
 * POST /api/reservas — confirma reserva (prototipo: mock; producción: persistir en DB).
 */
export async function POST(request: Request) {
  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  if (typeof raw !== 'object' || raw === null) {
    return NextResponse.json({ error: 'Cuerpo JSON inválido' }, { status: 400 })
  }

  const body = raw as Record<string, unknown>
  const parsed = parseBookingStateJson(body.state ?? body)
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 })
  }

  const payerParsed = parseBookingPayerJson(body.payer)
  if (!payerParsed.ok) {
    return NextResponse.json({ error: payerParsed.error }, { status: 400 })
  }

  const { state } = parsed
  const { payer } = payerParsed
  const confirmationCode = makeConfirmationCode()
  const paidAt = new Date().toISOString()

  const confirmedState = {
    ...state,
    currentStep: 5 as const,
    step5: {
      cardholderName: payer.cardholderName,
      email: payer.email,
      documentType: payer.documentType,
      documentNumber: payer.documentNumber,
      paymentStatus: 'paid' as const,
      paidAt,
      confirmationCode,
      cardLast4: payer.cardLast4,
    },
    totalPrice: payer.totalPaid,
  }

  return NextResponse.json({
    bookingId: state.bookingId,
    confirmationCode,
    paidAt,
    status: 'confirmed' as const,
    mock: true as const,
    payer: {
      cardholderName: payer.cardholderName,
      email: payer.email,
      documentType: payer.documentType,
      documentNumber: payer.documentNumber,
      cardLast4: payer.cardLast4,
    },
    state: confirmedState,
  })
}
