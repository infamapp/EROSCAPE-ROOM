export interface FranchiseLeadPayload {
  nombre: string
  email: string
  telefono: string
  ciudad: string
  ciudadDetalle?: string
  mensaje?: string
}

export interface FranchiseLeadFormState {
  nombre: string
  email: string
  telefono: string
  ciudadSlug: string
  ciudadOtra: string
  mensaje: string
}
