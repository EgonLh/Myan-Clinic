"use client"

import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { logout } from "@/app/store/features/auth/authSlice"
import { useCallback } from "react"

export function useHandleLogout() {
  const dispatch = useDispatch()
  const router = useRouter()

  return useCallback(() => {
    dispatch(logout())
    localStorage.removeItem("token")

    // only one navigation
    router.replace("/login")
  }, [dispatch, router])
}
