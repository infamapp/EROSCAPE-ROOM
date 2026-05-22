/** Identidad del Game Master: IA autómata, ámbito privado, sin vigilancia humana continua. */

export const GAME_MASTER_IDENTITY = {
  shortLabel: 'Game Master IA',
  automatonNote: 'IA autómata — no hay Game Master humano en sala.',
  privacyNote: 'Sin escucha humana continua ni sistemas de vídeo o cámara durante la experiencia.',
  humanContactNote:
    'Un asistente humano por voz solo se activa si lo solicitas o ante emergencia con la palabra segura.',
} as const

export const GAME_MASTER_INTRO_MESSAGES = [
  'Ya te esperábamos. Soy la IA que orquesta tu noche — en un ámbito privado, sin presencia humana en sala.',
  'He leído tus preferencias. Ajusto luz, ritmo y narrativa en tiempo real.',
  'Si necesitas una persona, la palabra segura o la app la activan. Hasta entonces, solo nosotros dos.',
] as const

export const GAME_MASTER_NARRATIVE_CLOSER =
  'La Game Master IA adapta luz, ritmo y narrativa en un ámbito privado. Sin nadie escuchando ni cámaras: solo si tú lo pides o usas la palabra segura, un asistente humano responde por voz.'
