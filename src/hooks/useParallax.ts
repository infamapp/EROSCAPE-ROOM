'use client'

import { useEffect, useState } from 'react'

export interface ParallaxState {
  mouseX: number
  mouseY: number
}

export function useParallax(): ParallaxState {
  const [state, setState] = useState<ParallaxState>({ mouseX: 0, mouseY: 0 })

  useEffect(() => {
    if (window.innerWidth < 768) return

    const handleMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const nx = cx === 0 ? 0 : (e.clientX - cx) / cx
      const ny = cy === 0 ? 0 : (e.clientY - cy) / cy
      setState({ mouseX: Math.max(-1, Math.min(1, nx)), mouseY: Math.max(-1, Math.min(1, ny)) })
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return state
}

