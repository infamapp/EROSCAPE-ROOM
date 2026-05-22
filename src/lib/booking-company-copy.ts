import type { CompanyType } from '@/types/booking'

export const COMPANY_TYPE_DETAILS: Record<CompanyType, string> = {
  pareja:
    'Para dos personas que quieren volver a mirarse distinto. Ritmo cuidado, tensión suave y un final que se queda en la piel.',
  rollete:
    'Para encuentros sin guion. Directo, lúdico, sin promesas: solo química, elección y un espacio que acompaña lo que pasa.',
  'plan-golfo':
    'Para cuando la risa también aprieta. Dinámica de grupo, decisiones rápidas y ese momento en que alguien por fin dice “sí”.',
  swinger:
    'Para quienes ya conocen sus acuerdos. Libertad, cuidado y discreción: el placer se expande sin perder el control.',
}

export function getCompanyTypeDetail(id: CompanyType): string {
  return COMPANY_TYPE_DETAILS[id]
}
