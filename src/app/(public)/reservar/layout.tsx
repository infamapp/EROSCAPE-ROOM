'use client'

import type { ReactNode } from 'react'

import { MissionProgress } from '@/components/booking/MissionProgress'
import { StepIndicator } from '@/components/booking/StepIndicator'
import { useBookingFlow } from '@/hooks/useBookingFlow'

export interface ReservarLayoutProps {
  children: ReactNode
}

export default function ReservarLayout({ children }: ReservarLayoutProps) {
  const { state } = useBookingFlow()

  return (
    <>
      <MissionProgress />
      <div className="pt-18">
        <StepIndicator currentStep={state.currentStep} />
      </div>
      {children}
    </>
  )
}

