'use client'

import { useEffect, useState } from 'react'

import { EROSCAPE_CLUB_MEMBER_STORAGE_KEY } from '@/lib/el-club'

export function useClubMemberLocal(): boolean {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const read = () => {
      try {
        setActive(window.localStorage.getItem(EROSCAPE_CLUB_MEMBER_STORAGE_KEY) === '1')
      } catch {
        setActive(false)
      }
    }

    read()

    const onStorage = (event: StorageEvent) => {
      if (event.key === EROSCAPE_CLUB_MEMBER_STORAGE_KEY) read()
    }
    window.addEventListener('storage', onStorage)

    const onClubUpdated = () => read()
    window.addEventListener('eroscape-club-member-updated', onClubUpdated)

    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('eroscape-club-member-updated', onClubUpdated)
    }
  }, [])

  return active
}
