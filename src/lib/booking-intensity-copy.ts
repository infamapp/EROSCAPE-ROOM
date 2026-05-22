import type { IntensityLevel } from '@/types/booking'

export interface IntensityBookingOption {
  level: IntensityLevel
  missionLevel: 'ALPHA' | 'BETA' | 'OMEGA'
  title: string
  descriptor: string
  hint: string
}

export const INTENSITY_BOOKING_OPTIONS: readonly IntensityBookingOption[] = [
  {
    level: 'bajo',
    missionLevel: 'ALPHA',
    title: 'Despertar · Suave',
    descriptor: 'Insinuación, tacto, respiración. Un inicio lento que no apura nada.',
    hint: 'Precio base de la sala',
  },
  {
    level: 'medio',
    missionLevel: 'BETA',
    title: 'Intenso · Sin frenos',
    descriptor: 'Más cerca, más claro. El juego ya se nota y el ritmo sube.',
    hint: 'Suplemento por intensidad',
  },
  {
    level: 'turbio',
    missionLevel: 'OMEGA',
    title: 'Sin límites · Todo permitido',
    descriptor: 'Solo vuestros límites reales. La IA autómata ajusta ambiente y ritmo.',
    hint: 'Máxima intensidad',
  },
] as const

export const STEP2_GATE_COPY = {
  eyebrow: 'Umbral',
  title: 'NIVEL PROHIBIDO',
  subtitle:
    'La sala y con quién venís ya están definidos. Ahora elegís la temperatura de la noche: baja, media o turbia.',
  footnote: 'Pareja, golfo o swinger comparten las mismas tres intensidades.',
} as const

export const STEP2_DESIRES_COPY = {
  title: 'Cuéntanos lo que deseas',
  subtitle:
    'Con quién venís y cómo queréis que os llamemos. La intensidad viene después — igual para todas las salas y todos los tipos de noche.',
  companyHeading: '¿Con quién exploráis?',
  namesHeading: '¿Cómo queréis que os llamemos?',
  languageHeading: 'Idioma de la experiencia',
} as const

export const STEP2_INTENSITY_COPY = {
  title: 'Elige la intensidad',
  subtitle:
    'No depende de si venís en pareja, golfo o swinger. Es la temperatura que queréis para esta noche, y el precio se ajusta según vuestra elección.',
} as const
