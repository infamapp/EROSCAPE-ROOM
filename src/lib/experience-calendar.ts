export function getMonthStart(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

export function getDaysInMonth(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
}

export function getWeekdayIndexMon0(d: Date): number {
  const js = d.getDay()
  return (js + 6) % 7
}

/** Simulación: fines de semana + algunos laborables (cada 3 días). */
export function isExperienceCalendarDayAvailable(date: Date): boolean {
  const day = date.getDay()
  const weekend = day === 0 || day === 6
  const someWeekdays = date.getDate() % 3 === 0
  return weekend || someWeekdays
}

export function formatMonthTitleEsUpper(d: Date): string {
  const raw = new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(d)
  return raw.toUpperCase()
}
