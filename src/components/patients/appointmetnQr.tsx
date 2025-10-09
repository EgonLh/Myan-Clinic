"use client"

import { useEffect, useState } from "react"
import QRCode from "qrcode"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface AppointmentQRCodeProps {
  appointment: {
    id: number
    doctor?: { user?: { name?: string } }
    patient?: { user?: { name?: string } }
    date: string
    status: string
    meetingLink?: string
    costs?: number
  }
}

export function AppointmentQRCode({ appointment }: AppointmentQRCodeProps) {
  const [qrCode, setQrCode] = useState<string | null>(null)

  useEffect(() => {
    const generateQr = async () => {
      try {
        const qrData = {
          id: appointment.id,
          doctor: appointment.doctor?.user?.name,
          patient: appointment.patient?.user?.name,
          date: appointment.date,
          status: appointment.status,
          meetingLink: appointment.meetingLink,
          costs: appointment.costs,
        }
        const qrString = JSON.stringify(qrData, null, 2)
        const dataUrl = await QRCode.toDataURL(qrString)
        setQrCode(dataUrl)
      } catch (err) {
        console.error("QR generation failed:", err)
      }
    }

    if (appointment) generateQr()
  }, [appointment])

  const handleDownload = () => {
    if (!qrCode) return
    const link = document.createElement("a")
    link.href = qrCode
    link.download = `appointment-${appointment.id}-qr.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!qrCode) return null

  return (
    <div className="flex flex-col items-center gap-2 mt-3">
      <img
        src={qrCode}
        alt="Appointment QR Code"
        className="w-full h-full border rounded-md "
      />
      <Button
        variant="outline"
        onClick={handleDownload}
        className="flex items-center w-full shadow-none gap-1 font-mono text-xs"
      >
        <Download className="w-3 h-3" /> Download QR
      </Button>
    </div>
  )
}
