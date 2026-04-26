'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const ReservarClient = dynamic(() => import('./reservar-client').then((m) => m.ReservarClient), { ssr: false })

export default function ReservarPage() {
  return (
    <Suspense>
      <ReservarClient />
    </Suspense>
  )
}

