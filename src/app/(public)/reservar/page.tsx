import { Suspense } from 'react'

import { ReservarClient } from './reservar-client'

export default function ReservarPage() {
  return (
    <Suspense>
      <ReservarClient />
    </Suspense>
  )
}

