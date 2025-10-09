"use client"

import { useState } from "react"
import Link from "next/link"
import { redirect, usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Building2, UserCheck, Settings, Menu, X, BriefcaseMedicalIcon, LineChart, LogOut } from "lucide-react"
import { RootState } from "@/app/store/store"
import { useDispatch, useSelector } from "react-redux"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { clearDoctor } from "@/app/store/features/doctor/doctorSlice"
// --- navigation for both specialist and generalist doctor -- //
const Generalistnavigation = [
  { name: "Tasks", href: "/dashboard/doctor/task", icon: UserCheck },
  { name: "Appointments", href: "/dashboard/doctor/appointment", icon: Calendar },
  { name: "Patients", href: "/dashboard/doctor/patient", icon: Users },
  { name: "Departments", href: "/dashboard/doctor/department", icon: Building2 },
  { name: "Available", href: "/dashboard/doctor/Assigned", icon: LineChart },
  { name: "Settings", href: "/dashboard/doctor/setting", icon: Settings },
]

const SpecialistNavigation = [
  { name: "Tasks", href: "/dashboard/doctor/task", icon: UserCheck },
  { name: "Appointments", href: "/dashboard/doctor/appointment", icon: Calendar },
  { name: "Patients", href: "/dashboard/doctor/patient", icon: Users },
  { name: "Departments", href: "/dashboard/doctor/department", icon: Building2 },
  { name: "Settings", href: "/dashboard/doctor/setting", icon: Settings },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showMenu, setShowMenu] = useState(false) // toggle for click menu
  const pathname = usePathname()
  const user = useSelector((state: RootState) => state.auth.user);
  const doctor = useSelector((state: RootState) => state.doctor);
  const dispatch = useDispatch();
  const router = useRouter()
  const navigation = doctor?.data?.type !== "Generalist" ? SpecialistNavigation : Generalistnavigation;

  const handleLogout = () => {
    dispatch(clearDoctor());
    redirect('/')
  }

  const goToInfo = () => {
    router.push('setting');
  }
  return (
    <>
      {/* Mobile menu button */}
      <div className="flex justify-end w-full">
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 border me-4 z-50 bg-white/[0.4] md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out flex flex-col justify-between md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div>
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 px-6 py-6 border-b border-sidebar-border">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded">
              <BriefcaseMedicalIcon className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-sidebar-foreground tracking-widest">MyanClinic</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded font-mono transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Footer with click-to-toggle menu */}
        <div className="px-6 py-4 border-t border-sidebar-border flex flex-col items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-3 cursor-pointer w-full">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">{user?.email[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.email}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.role}</p>
                </div>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-44 p-0 font-mono ">
              <DropdownMenuItem>
                <p className="text-center text-lg w-full underline ">Command /-</p>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={()=>handleLogout()} className="hover:border text-center py-2 m-1 ">
                <p className="w-full text-center  text-slate-500 hover:text-slate-700">Logout</p>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={()=>goToInfo()} className="hover:border text-center py-2 m-1 ">
                <p className="w-full text-center  text-slate-500 hover:text-slate-700">User Info</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
