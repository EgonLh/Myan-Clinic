"use client"
// ----- Navbar for Patient ----- //
// - Review [x]
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Heart,
  Calendar,
  Pill,
  FileText,
  Activity,
  Settings,
  Bell,
  User,
  Menu,
  Home,
  MessageSquare,
  HelpCircle,
  Camera,
  LogOut,
  BriefcaseMedical,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { DialogTitle } from "@radix-ui/react-dialog"
import { useSelector } from "react-redux"
import { RootState } from "@/app/store/store"

// ----- Props -----
interface NavbarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

// ----- Navigation items -----
const navigationItems = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "appointments", label: "Appointments", icon: Calendar },
  { id: "actions", label: "Action", icon: Pill },
  { id: "medicine-identifier", label: "Medicine ID", icon: Camera },
  { id: "records", label: "Records", icon: FileText },
  { id: "storage", label: "Storage", icon: Activity },
]

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const {user} = useSelector((state:RootState) => state.auth);

  const handleLogout = () => {
    console.log("Logging Out")
  }
  return (
    <header className="sticky flex justify-center top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-24 items-center justify-between px-4">
        {/* ----- Logo ----- */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <BriefcaseMedical className="w-4 h-4 text-primary-foreground" />
          </div>
          <h1 className="text-lg font-semibold hidden sm:block font-mono tracking-wide">
            MyanClinic
          </h1>
        </div>

        {/* ----- Desktop Navigation ----- */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "secondary" : "ghost"}
                className={cn(
                  "gap-2 h-9",
                  activeTab === item.id &&
                    "bg-primary/10 text-primary hover:bg-primary/15"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden xl:inline font-mono">{item.label}</span>
              </Button>
            )
          })}
        </nav>

        {/* ----- Right Side Actions ----- */}
        <div className="flex items-center gap-2">
          {/* ----- User Dropdown ----- */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 shadow-none rounded">
                <Avatar className="h-8 w-8 rounded">
                  <AvatarFallback className="rounded ">{user?.role[0]}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              {/* User Info */}
              <div className="flex items-center gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{user?.email}</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {user?.role}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator className="border-dotted border-t" />
              <DropdownMenuItem className="font-mono" onClick={() => onTabChange("overview")}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="font-mono" onClick={() => onTabChange("actions")}>
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Support
              </DropdownMenuItem>
              <DropdownMenuSeparator className="border-dotted border-t" />
              <DropdownMenuItem className="font-mono" onClick={() => handleLogout()}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* ----- Mobile Menu ----- */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden h-9 w-9">
                <Menu className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-3">
              <DialogTitle> </DialogTitle>
              <div className="flex flex-col space-y-4 mt-4">
                {/* ----- User Info ----- */}
                <div className="flex justify-center items-center rounded border border-2 border-dashed items-center gap-3 p-2">
                  <Avatar className="h-10 w-10 rounded">
                    <AvatarFallback className="rounded">{user?.role[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground font-mono">{user?.email}</p>
                    <p className="text-xs font-mono">{user?.role}</p>
                  </div>
                </div>

                {/* ----- Navigation Links ----- */}
                <nav className="flex flex-col space-y-2">
                  {navigationItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Button
                        key={item.id}
                        variant={activeTab === item.id ? "secondary" : "ghost"}
                        className={cn(
                          "justify-start gap-3 h-10",
                          activeTab === item.id &&
                            "bg-primary/10 text-primary hover:bg-primary/15 border-blue-300 border-dashed border-2"
                        )}
                        onClick={() => {
                          onTabChange(item.id)
                          setMobileMenuOpen(false) // Close mobile menu
                        }}
                      >
                        <Icon className="w-4 h-4 font-mono" />
                        {item.label}
                      </Button> 
                    )
                  })}
                </nav>

              
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
