"use client"

import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import type { RootState } from "@/app/store/store"

export const useAuthGuard = () => {
    const router = useRouter()
    const user = useSelector((state: RootState) => state.auth.user)
    const token = useSelector((state: RootState) => state.auth.token)
    console.log("Hook is working", user)
    useEffect(() => {
        if (!user || !token) {
            router.push("/login")
        }
    }, [user, token, router])
}
