"use client"

import { useAuthGuard } from "@/hooks/useAuthGuard"

export default function DoctorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    useAuthGuard()
    return (
        <>{children}</>
    )
}