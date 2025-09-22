"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
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
  ChevronLeft,
  ChevronRight,
  Camera,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navigationItems = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "appointments", label: "Appointments", icon: Calendar },
  { id: "medications", label: "Medications", icon: Pill },
  { id: "medicine-identifier", label: "Medicine ID", icon: Camera }, // Added medicine identifier to navigation
  { id: "records", label: "Medical Records", icon: FileText },
  { id: "health-metrics", label: "Health Metrics", icon: Activity },
]

const secondaryItems = [
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "help", label: "Help & Support", icon: HelpCircle },
]

function SidebarContent({ activeTab, onTabChange, collapsed = false }: SidebarProps & { collapsed?: boolean }) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn("p-6 border-b", collapsed && "p-4")}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <Heart className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && <h1 className="text-lg font-semibold">HealthCare Portal</h1>}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-6">
        <div>
          {!collapsed && (
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Main Navigation
            </h3>
          )}
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-10",
                    activeTab === item.id && "bg-primary/10 text-primary hover:bg-primary/15",
                    collapsed && "justify-center px-2",
                  )}
                  onClick={() => onTabChange(item.id)}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {!collapsed && item.label}
                </Button>
              )
            })}
          </nav>
        </div>

        <div>
          {!collapsed && (
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Account</h3>
          )}
          <nav className="space-y-1">
            {secondaryItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={cn("w-full justify-start gap-3 h-10", collapsed && "justify-center px-2")}
                  onClick={() => onTabChange(item.id)}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {!collapsed && item.label}
                </Button>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          <SidebarContent
            activeTab={activeTab}
            onTabChange={(tab) => {
              onTabChange(tab)
              setOpen(false)
            }}
          />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden md:flex md:flex-col md:fixed md:inset-y-0 bg-card border-r transition-all duration-300",
          collapsed ? "md:w-16" : "md:w-72",
        )}
      >
        <div className="absolute -right-3 top-6 z-50">
          <Button
            variant="outline"
            size="icon"
            className="w-6 h-6 rounded-full bg-background shadow-md"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
          </Button>
        </div>
        <SidebarContent activeTab={activeTab} onTabChange={onTabChange} collapsed={collapsed} />
      </div>
    </>
  )
}
