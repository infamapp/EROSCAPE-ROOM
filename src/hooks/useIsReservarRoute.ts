'use client'

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

export function useIsReservarRoute(): boolean {
  const pathname = usePathname()
  return useMemo(
    () => pathname === '/reservar' || pathname.startsWith('/reservar/'),
    [pathname],
  )
}
