import { NextResponse } from 'next/server'

import { makeConfirmationCode, parseBookingStateJson } from '@/lib/api-booking-validation'

export const runtime = 'nodejs'

/**
 * POST /api/reservas — crea registro de reserva (prototipo: respuesta mock; producción: persistir en DB).
 */
export async function POST(request: Request) {
  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const parsed = parseBookingStateJson(raw)
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 })
  }

  const { state } = parsed
  const confirmationCode = makeConfirmationCode()

  return NextResponse.json({
    bookingId: state.bookingId,
    confirmationCode,
    status: 'confirmed' as const,
    mock: true as const,
  })
}
