/** Tres párrafos de antesala por sala (sin revelar el recorrido). */
const NARRATIVE_BY_SLUG: Record<string, readonly [string, string, string]> = {
  'habitacion-veneciana': [
    'Para quienes saben que el placer más profundo empieza por los sentidos.',
    'Aquí el tiempo se estira. Las texturas hablan bajito. Cada detalle invita a bajar el ritmo… y subir la tensión.',
    'El Game Master escucha. Adapta. Cuida los límites. Y convierte tus deseos en una noche diseñada solo para ti.',
  ],
  'ritual-de-medianoche': [
    'Hay rituales que no se explican. Solo se viven.',
    'Empieza con una invocación apenas perceptible. Un símbolo. Una elección. Y la decisión — íntima — de ir más allá.',
    'El Game Master escucha. Adapta. Cuida los límites. Y convierte tus deseos en una noche diseñada solo para ti.',
  ],
  'la-confesion': [
    'A veces lo que más excita es admitir lo que nunca te habías atrevido a decir.',
    'Un espacio donde las palabras pesan distinto. Donde lo que callas también cuenta.',
    'El Game Master escucha. Adapta. Cuida los límites. Y convierte tus deseos en una noche diseñada solo para ti.',
  ],
  'espejo-negro': [
    'El espejo no miente. Verás cosas de ti que preferías no saber.',
    'Una atmósfera densa, precisa, casi quirúrgica. Lo que refleja no es decoración: es tensión viva.',
    'El Game Master escucha. Adapta. Cuida los límites. Y convierte tus deseos en una noche diseñada solo para ti.',
  ],
  'el-coleccionista': [
    'Guarda recuerdos de tus visitas. Esta noche, tú serás uno de ellos.',
    'Hay habitaciones que guardan secretos. Esta guarda intenciones. Y sabe esperar.',
    'El Game Master escucha. Adapta. Cuida los límites. Y convierte tus deseos en una noche diseñada solo para ti.',
  ],
  'la-mascarada': [
    'Un entorno elegante donde los roles se diluyen.',
    'Máscaras, penumbra y un aire de sociedad reservada. Aquí el anonimato es parte del juego.',
    'El Game Master escucha. Adapta. Cuida los límites. Y convierte tus deseos en una noche diseñada solo para ti.',
  ],
}

const FALLBACK: readonly [string, string, string] = [
  'Lo que te espera no se explica del todo. Se siente.',
  'Empieza con un gesto pequeño. Una puerta entornada. Y la decisión — íntima — de dar un paso más.',
  'El Game Master escucha. Adapta. Cuida los límites. Y convierte tus deseos en una noche diseñada solo para ti.',
]

export function getExperienceNarrativeTriplet(slug: string): readonly [string, string, string] {
  return NARRATIVE_BY_SLUG[slug] ?? FALLBACK
}
