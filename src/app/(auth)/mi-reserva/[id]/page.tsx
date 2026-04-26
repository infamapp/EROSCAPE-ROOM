'use client'

import { useParams } from 'next/navigation'
import { useMemo } from 'react'

import { AgentHeadquarters } from '@/components/dashboard/AgentHeadquarters'
import { useClubMemberLocal } from '@/hooks/useClubMemberLocal'
import { getMockBookingRecord } from '@/lib/mock-booking-record'

export default function MiReservaDashboardPage() {
  const params = useParams()
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : ''

  const booking = useMemo(() => getMockBookingRecord(id || 'guest'), [id])
  const clubLocal = useClubMemberLocal()
  const showClubBadge = Boolean(booking.isClubMember) || clubLocal

  if (!id) {
    return (
      <main className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="font-(--font-inter) text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Credencial no válida.
        </p>
      </main>
    )
  }

  return (
    <main>
      <AgentHeadquarters bookingId={id} booking={booking} showClubBadge={showClubBadge} />
    </main>
  )
}
