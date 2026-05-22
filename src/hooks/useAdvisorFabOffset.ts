'use client'

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

/** Clases `bottom-*` para el FAB según barras fijas inferiores por ruta. */
export function useAdvisorFabOffset(): { mobileBottomClass: string; desktopBottomClass: string } {
  const pathname = usePathname()

  return useMemo(() => {
    const isExperienceDetail =
      pathname.startsWith('/experiencias/') && pathname.split('/').filter(Boolean).length >= 3

    let mobileBottomClass = 'bottom-5'
    let desktopBottomClass = 'lg:bottom-6'

    if (isExperienceDetail) {
      mobileBottomClass = 'bottom-28'
      desktopBottomClass = 'lg:bottom-28'
    }

    return {
      mobileBottomClass,
      desktopBottomClass,
    }
  }, [pathname])
}
