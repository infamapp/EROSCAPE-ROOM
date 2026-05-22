export const WHATSAPP_PHONE_E164 = '34640758672' as const

export const ADVISOR_WHATSAPP_MESSAGE =
  'Hola, me gustaría hablar con un asesor de Eroscape.' as const

export function buildWhatsAppAdvisorUrl(message: string = ADVISOR_WHATSAPP_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_PHONE_E164}?text=${encodeURIComponent(message)}`
}
