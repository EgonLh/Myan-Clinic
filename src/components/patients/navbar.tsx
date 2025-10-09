"use client"

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

interface NavbarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navigationItems = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "appointments", label: "Appointments", icon: Calendar },
  { id: "actions", label: "Action", icon: Pill },
  { id: "medicine-identifier", label: "Medicine ID", icon: Camera },
  { id: "records", label: "Records", icon: FileText },
  { id: "health-metrics", label: "Metrics", icon: Activity },
]

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky flex justify-center top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container  flex h-24 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <BriefcaseMedical className="w-4 h-4 text-primary-foreground" />
          </div>
          <h1 className="text-lg font-semibold hidden sm:block font-mono tracking-wide">MyanClinic</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden  md:flex items-center space-x-1 ">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "secondary" : "ghost"}
                className={cn("gap-2 h-9", activeTab === item.id && "bg-primary/10 text-primary hover:bg-primary/15")}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden xl:inline font-mono">{item.label}</span>
              </Button>
            )
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Bell className="w-4 h-4" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/patient-profile.png" alt="Profile" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">John Doe</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">john.doe@example.com</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onTabChange("profile")}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onTabChange("settings")}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onTabChange("help")}>
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden h-9 w-9">
                <Menu className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <DialogTitle>Mobile Navigation</DialogTitle>
              <div className="flex flex-col space-y-4 mt-4">
                <div className="flex items-center gap-3 pb-4 border-b">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/patient-profile.png" alt="Profile" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                  </div>
                </div>

                <nav className="flex flex-col space-y-2">
                  {navigationItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Button
                        key={item.id}
                        variant={activeTab === item.id ? "secondary" : "ghost"}
                        className={cn(
                          "justify-start gap-3 h-10",
                          activeTab === item.id && "bg-primary/10 text-primary hover:bg-primary/15",
                        )}
                        onClick={() => {
                          onTabChange(item.id)
                          setMobileMenuOpen(false)
                        }}
                      >
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </Button>
                    )
                  })}
                </nav>

                <div className="pt-4 border-t">
                  <div className="flex flex-col space-y-2">
                    <Button variant="ghost" className="justify-start gap-3 h-10">
                      <MessageSquare className="w-4 h-4" />
                      Messages
                    </Button>
                    <Button variant="ghost" className="justify-start gap-3 h-10">
                      <Settings className="w-4 h-4" />
                      Settings
                    </Button>
                    <Button variant="ghost" className="justify-start gap-3 h-10">
                      <HelpCircle className="w-4 h-4" />
                      Help & Support
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
