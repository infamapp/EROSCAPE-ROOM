export const STEP4_LEGAL_COPY = {
  title: 'El juramento',
  subtitle: 'Límites claros, palabra de seguridad y documentos legales. Todo queda entre nosotros y vosotros.',
  trustBanner: 'Tu privacidad es sagrada aquí.',
  documentsHeading: 'Documentos legales',
  documentsHint: 'Abrid cada apartado y leed con calma antes de firmar.',
  readConfirmLabel:
    'Confirmo que he leído la política de privacidad, el consentimiento informado y el aviso legal.',
  safeWordHeading: 'La palabra que para el tiempo',
  safeWordHint: 'Esta palabra detiene todo. Inmediatamente. Sin preguntas.',
  safeWordPlaceholder: 'Elegid vuestra palabra…',
  signatureHeading: 'Firma del pacto',
  ageConfirmLabel: 'Confirmo que soy mayor de edad (+18) y acepto las condiciones de este espacio.',
} as const

export interface BookingLegalSection {
  heading: string
  paragraphs: readonly string[]
}

export interface BookingLegalAccordionItem {
  id: 'privacidad' | 'consentimiento' | 'aviso-legal'
  title: string
  sections: readonly BookingLegalSection[]
}

export const BOOKING_LEGAL_ACCORDION: readonly BookingLegalAccordionItem[] = [
  {
    id: 'privacidad',
    title: 'Política de privacidad',
    sections: [
      {
        heading: 'Responsable del tratamiento',
        paragraphs: [
          'Los datos que facilitáis en la reserva se tratan conforme al Reglamento General de Protección de Datos (RGPD) y la normativa española aplicable.',
          'Utilizamos la información únicamente para gestionar vuestra noche, personalizar la experiencia con los límites que declaréis y mantener la seguridad del espacio.',
        ],
      },
      {
        heading: 'Datos que recogemos',
        paragraphs: [
          'Datos de contacto verificados, preferencias de la experiencia, composición del grupo, idioma y la palabra de seguridad acordada.',
          'No vendemos ni cedemos datos a terceros con fines comerciales. Solo compartimos información cuando existe obligación legal o consentimiento expreso.',
        ],
      },
      {
        heading: 'Conservación y derechos',
        paragraphs: [
          'Conservamos los datos el tiempo estrictamente necesario para la reserva, el seguimiento post-visita acordado y las obligaciones legales.',
          'Podéis ejercer los derechos de acceso, rectificación, supresión, limitación, portabilidad y oposición contactando con el responsable indicado en la web.',
        ],
      },
    ],
  },
  {
    id: 'consentimiento',
    title: 'Consentimiento informado',
    sections: [
      {
        heading: 'Alcance de la experiencia',
        paragraphs: [
          'El servicio consiste en una experiencia de escape room para adultos con temática sensual y narrativa inmersiva. Todo ocurre en un espacio controlado, con personal profesional y protocolos de seguridad.',
          'No constituye asesoramiento médico, psicológico ni terapéutico.',
        ],
      },
      {
        heading: 'Límites y revocación',
        paragraphs: [
          'Participáis de forma libre, voluntaria y revocable en cualquier momento mediante la palabra de seguridad acordada.',
          'Se respetan límites explícitos y se prioriza el bienestar de todas las personas presentes. Cualquier indicación de malestar detiene la experiencia.',
        ],
      },
      {
        heading: 'Palabra de seguridad',
        paragraphs: [
          'La palabra que elijáis tiene efecto inmediato: interrumpe cualquier acción en curso sin juicio ni represalias.',
          'Activa la conexión directa con un asistente humano para corroborar que todo está bien. También podéis avisar a través de la app en cualquier momento.',
        ],
      },
      {
        heading: 'Vigencia',
        paragraphs: [
          'Al firmar este pacto confirmáis que habéis leído y comprendido el documento, que la información facilitada es veraz y que aceptáis las condiciones aplicables a vuestra reserva.',
        ],
      },
    ],
  },
  {
    id: 'aviso-legal',
    title: 'Aviso legal',
    sections: [
      {
        heading: 'Identificación del titular',
        paragraphs: [
          'Este sitio y el servicio de reservas son operados por la entidad titular indicada en los datos registrales publicados en la web corporativa.',
          'El acceso implica la aceptación de las condiciones de uso del sitio y de las normas de conducta del espacio.',
        ],
      },
      {
        heading: 'Condiciones de la reserva',
        paragraphs: [
          'Los precios, horarios y contenidos de cada experiencia se confirman en el momento de la contratación.',
          'Las políticas de cancelación, reprogramación y reembolso se aplican según las condiciones publicadas al sellar la noche.',
        ],
      },
      {
        heading: 'Modificaciones',
        paragraphs: [
          'Podemos actualizar estos textos con antelación razonable cuando cambien requisitos legales o el formato del servicio.',
          'La versión vigente es la que aceptáis en este paso del flujo de reserva.',
        ],
      },
    ],
  },
] as const
