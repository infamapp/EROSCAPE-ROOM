'use client'

import { useEffect, useState } from 'react'

export interface UseScrollTriggerOptions {
  threshold?: number
}

export interface UseScrollTriggerResult {
  isScrolled: boolean
}

export function useScrollTrigger(options: UseScrollTriggerOptions = {}): UseScrollTriggerResult {
  const { threshold = 80 } = options
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const update = () => setIsScrolled(window.scrollY > threshold)

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [threshold])

  return { isScrolled }
}
