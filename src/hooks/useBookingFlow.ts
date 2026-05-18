'use client'

import type { ReactNode } from 'react'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { UPSELL_ITEMS } from '@/lib/constants'
import { generateBookingId } from '@/lib/utils'
import { areParticipantNamesValid } from '@/lib/booking-participants'
import type { BookingState, BookingStep1, BookingStep2, BookingStep3, BookingStep4, LegalConsent } from '@/types/booking'

export const COMPLETED_BOOKING_STORAGE_KEY = 'eroscape_completed_booking'

export interface BookingContextValue {
  state: BookingState
  isHydrated: boolean
  narrativeTension: number
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: number) => void
  updateStep1: (data: Partial<BookingStep1>) => void
  updateStep2: (data: Partial<BookingStep2>) => void
  updateStep3: (data: BookingStep3) => void
  updateStep4: (data: BookingStep4) => void
  sealPactAndAdvance: (consent: LegalConsent) => void
  resetFlow: () => void
  finalizeCheckout: (completedBookingId: string) => void
  isStepValid: (step: number) => boolean
  getTotalPrice: () => number
}

export interface BookingProviderProps {
  children: ReactNode
}

const STORAGE_KEY = 'eroscape_booking'

function computeTotalPrice(step3: BookingStep3): number {
  const upsellTotal = step3.selectedUpsells.reduce((sum, id) => {
    const item = UPSELL_ITEMS.find((u) => u.id === id)
    return sum + (item?.price ?? 0)
  }, 0)
  return upsellTotal
}

function createInitialState(): BookingState {
  const step3: BookingStep3 = { selectedUpsells: [] }
  const step4: BookingStep4 = { consent: null }

  return {
    currentStep: 1,
    step1: {},
    step2: { language: 'es' },
    step3,
    step4,
    bookingId: generateBookingId(),
    totalPrice: 0,
  }
}

function restoreState(): BookingState {
  if (typeof window === 'undefined') return createInitialState()

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return createInitialState()
    const parsed = JSON.parse(raw) as Partial<BookingState>

    if (typeof parsed.bookingId !== 'string' || parsed.bookingId.length === 0) return createInitialState()

    const step3: BookingStep3 = {
      selectedUpsells: Array.isArray(parsed.step3?.selectedUpsells) ? parsed.step3?.selectedUpsells : [],
    }

    const step4: BookingStep4 = {
      consent: parsed.step4?.consent ?? null,
    }

    const restored: BookingState = {
      currentStep:
        parsed.currentStep === 1 || parsed.currentStep === 2 || parsed.currentStep === 3 || parsed.currentStep === 4 || parsed.currentStep === 5
          ? parsed.currentStep
          : 1,
      step1: parsed.step1 ?? {},
      step2: parsed.step2 ?? { language: 'es' },
      step3,
      step4,
      bookingId: parsed.bookingId,
      totalPrice: typeof parsed.totalPrice === 'number' ? parsed.totalPrice : computeTotalPrice(step3),
    }

    return restored
  } catch {
    return createInitialState()
  }
}

export const BookingContext = createContext<BookingContextValue>(null!)

export function BookingProvider({ children }: BookingProviderProps) {
  // Keep SSR + first client render deterministic, then restore after mount.
  const [state, setState] = useState<BookingState>(() => createInitialState())
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const t = window.setTimeout(() => {
      setState(restoreState())
      setIsHydrated(true)
    }, 0)
    return () => window.clearTimeout(t)
  }, [])

  const getTotalPrice = useCallback(() => computeTotalPrice(state.step3), [state.step3])

  const isStepValid = useCallback(
    (step: number) => {
      if (step === 1) {
        return Boolean(state.step1.citySlug && state.step1.experienceSlug && state.step1.date && state.step1.timeSlot)
      }
      if (step === 2) {
        const companyType = state.step2.companyType ?? null
        const names = state.step2.names ?? []
        return Boolean(
          companyType &&
            state.step2.intensityLevel &&
            areParticipantNamesValid(companyType, names),
        )
      }
      if (step === 3) {
        return true
      }
      if (step === 4) {
        return Boolean(state.step4.consent?.hasReadDocument && state.step4.consent?.ageConfirmed)
      }
      if (step === 5) {
        return true
      }
      return false
    },
    [state.step1, state.step2, state.step4.consent],
  )

  const nextStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: (Math.min(5, prev.currentStep + 1) as BookingState['currentStep']),
    }))
  }, [])

  const prevStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: (Math.max(1, prev.currentStep - 1) as BookingState['currentStep']),
    }))
  }, [])

  const goToStep = useCallback((step: number) => {
    const n = Number(step)
    const next = Number.isFinite(n) ? Math.round(n) : 1
    setState((prev) => ({
      ...prev,
      currentStep: (Math.min(5, Math.max(1, next)) as BookingState['currentStep']),
    }))
  }, [])

  const updateStep1 = useCallback((data: Partial<BookingStep1>) => {
    setState((prev) => ({ ...prev, step1: { ...prev.step1, ...data } }))
  }, [])

  const updateStep2 = useCallback((data: Partial<BookingStep2>) => {
    setState((prev) => ({ ...prev, step2: { ...prev.step2, ...data } }))
  }, [])

  const updateStep3 = useCallback((data: BookingStep3) => {
    setState((prev) => {
      const totalPrice = computeTotalPrice(data)
      return { ...prev, step3: data, totalPrice }
    })
  }, [])

  const updateStep4 = useCallback((data: BookingStep4) => {
    setState((prev) => ({ ...prev, step4: data }))
  }, [])

  const sealPactAndAdvance = useCallback((consent: LegalConsent) => {
    setState((prev) => ({
      ...prev,
      step4: { consent },
      currentStep: 5,
    }))
  }, [])

  const resetFlow = useCallback(() => {
    setState(createInitialState())
  }, [])

  const finalizeCheckout = useCallback((completedBookingId: string) => {
    setState(() => {
      if (typeof window !== 'undefined') {
        try {
          window.sessionStorage.removeItem(STORAGE_KEY)
          window.sessionStorage.setItem(COMPLETED_BOOKING_STORAGE_KEY, completedBookingId)
        } catch {
          // ignore
        }
      }
      return createInitialState()
    })
  }, [])

  const narrativeTension = useMemo(() => {
    const base = (state.currentStep - 1) * 20
    const bonusOmega = state.step2.intensityLevel === 'turbio' ? 5 : 0
    const bonusUpsells = Math.min(10, state.step3.selectedUpsells.length * 2)
    const bonusConsent = state.step4.consent ? 5 : 0
    return Math.min(100, base + bonusOmega + bonusUpsells + bonusConsent)
  }, [state.currentStep, state.step2.intensityLevel, state.step3.selectedUpsells.length, state.step4.consent])

  useEffect(() => {
    if (!isHydrated) return
    if (typeof window === 'undefined') return
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // ignore
    }
  }, [isHydrated, state])

  const value = useMemo<BookingContextValue>(
    () => ({
      state,
      isHydrated,
      narrativeTension,
      nextStep,
      prevStep,
      goToStep,
      updateStep1,
      updateStep2,
      updateStep3,
      updateStep4,
      sealPactAndAdvance,
      resetFlow,
      finalizeCheckout,
      isStepValid,
      getTotalPrice,
    }),
    [
      finalizeCheckout,
      getTotalPrice,
      isHydrated,
      isStepValid,
      narrativeTension,
      nextStep,
      prevStep,
      goToStep,
      resetFlow,
      state,
      updateStep1,
      updateStep2,
      updateStep3,
      updateStep4,
      sealPactAndAdvance,
    ],
  )

  return React.createElement(BookingContext.Provider, { value }, children)
}

export function useBookingFlow(): BookingContextValue {
  const ctx = useContext(BookingContext)
  return ctx
}

