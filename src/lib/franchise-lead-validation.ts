import type { FranchiseLeadPayload } from '@/types/franchise-lead'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function trimString(value: unknown, maxLen: number): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (!trimmed || trimmed.length > maxLen) return null
  return trimmed
}

export type ParseFranchiseLeadResult =
  | { ok: true; lead: FranchiseLeadPayload }
  | { ok: false; error: string }

export function parseFranchiseLeadJson(raw: unknown): ParseFranchiseLeadResult {
  if (!isRecord(raw)) {
    return { ok: false, error: 'Cuerpo de solicitud inválido' }
  }

  const nombre = trimString(raw.nombre, 120)
  const email = trimString(raw.email, 254)
  const telefono = trimString(raw.telefono, 32)
  const ciudad = trimString(raw.ciudad, 80)
  const ciudadDetalle = trimString(raw.ciudadDetalle, 80) ?? undefined
  const mensaje = trimString(raw.mensaje, 2000) ?? undefined

  if (!nombre) return { ok: false, error: 'Nombre requerido' }
  if (!email || !EMAIL_RE.test(email)) return { ok: false, error: 'Correo inválido' }
  if (!telefono || telefono.length < 6) return { ok: false, error: 'Teléfono inválido' }
  if (!ciudad) return { ok: false, error: 'Ciudad requerida' }
  if (ciudad.toLowerCase() === 'otra' && !ciudadDetalle) {
    return { ok: false, error: 'Indica en qué ciudad te interesa abrir' }
  }

  const resolvedCiudad =
    ciudad.toLowerCase() === 'otra' && ciudadDetalle ? ciudadDetalle : ciudad

  return {
    ok: true,
    lead: {
      nombre,
      email,
      telefono,
      ciudad: resolvedCiudad,
      ciudadDetalle: ciudad === 'otra' ? ciudadDetalle : undefined,
      mensaje,
    },
  }
}
