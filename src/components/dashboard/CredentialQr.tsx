'use client'

import { QRCodeCanvas } from 'qrcode.react'
import { forwardRef } from 'react'

export interface CredentialQrProps {
  value: string
}

export const CredentialQr = forwardRef<HTMLCanvasElement, CredentialQrProps>(function CredentialQr({ value }, ref) {
  return <QRCodeCanvas ref={ref} value={value} size={200} bgColor="transparent" fgColor="#000000" level="M" className="block" />
})
