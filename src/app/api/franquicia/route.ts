import { NextResponse } from 'next/server'

import { parseFranchiseLeadJson } from '@/lib/franchise-lead-validation'

export const runtime = 'nodejs'

/**
 * POST /api/franquicia — captura leads de franquicia (prototipo: ack mock; producción: CRM / email).
 */
export async function POST(request: Request) {
  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const parsed = parseFranchiseLeadJson(raw)
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 })
  }

  const leadId = crypto.randomUUID()

  // TODO: Resend / CRM — no persistir PII en logs
  return NextResponse.json({
    leadId,
    status: 'received' as const,
    mock: true as const,
  })
}
