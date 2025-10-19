import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { logout } from "@/app/store/features/auth/authSlice"
import { useCallback } from "react"

export function useHandleLogout() {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLogout = useCallback(() => {
    // ----- Clear Redux state
    dispatch(logout())

    // ----- Clear token if any
    localStorage.removeItem("token")

    // ----- Navigate to login page safely (client-side)
    router.push("/login")

    // ----- Optional: reload to ensure clean state
    setTimeout(() => {
      window.location.reload()
    }, 100)
  }, [dispatch, router])

  return handleLogout
}
