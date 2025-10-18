"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ScanEye } from "lucide-react"

export function SiteHeader() {
  const pathname = usePathname() || "/"
  const pathSegments = pathname.split("/").filter(Boolean)

  // Build breadcrumbs dynamically
  const breadcrumbs = pathSegments.map((segment, idx) => {
    const href = "/" + pathSegments.slice(0, idx + 1).join("/")
    const name = segment
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ")
    return { name, href }
  })

  // Define help content per route
  const helpContent: Record<
    string,
    {
      title: string
      description: string
      sections: { title: string; text: string }[]
    }
  > = {
    "/admin": {
      title: "Root Admin Dashboard Manual",
      description: "Quick overview of the admin system and how to navigate it.",
      sections: [
        { title: "Navigation", text: "Use the sidebar to move between key sections." },
        { title: "Breadcrumbs", text: "Track your current position and navigate back easily." },
        { title: "Customization", text: "You can personalize dashboard settings and layout here." },
      ],
    },
    "/appointments": {
      title: "Appointments Management Guide",
      description: "Manage, filter, and track patient appointments efficiently.",
      sections: [
        { title: "Filtering", text: "Use filters to find appointments by doctor, patient, or date." },
        { title: "Status", text: "Track appointment progress — confirmed, pending, or done." },
        { title: "Analytics", text: "View trends and daily appointment statistics." },
      ],
    },
    "/doctors": {
      title: "Doctor Management Manual",
      description: "Add, edit, and manage doctors and their associated departments.",
      sections: [
        { title: "Adding Doctors", text: "Click 'Add Doctor' to include a new specialist or generalist." },
        { title: "Departments", text: "Organize doctors by department for better searchability." },
        { title: "Doctor Analytics", text: "View patient load, appointments per doctor, and performance data." },
      ],
    },
    "/patients": {
      title: "Patient Management Guide",
      description: "View, edit, and track patient information, history, and reports.",
      sections: [
        { title: "Patient Info", text: "Access patient demographics, visits, and notes." },
        { title: "Reports", text: "Generate or export health reports and appointment summaries." },
      ],
    },
    "/departments": {
      title: "Department Management Manual",
      description: "Manage hospital departments, their staff, and related analytics.",
      sections: [
        { title: "Department Overview", text: "See all active departments and assigned doctors." },
        { title: "Editing Departments", text: "Rename or update department descriptions easily." },
      ],
    },
  }

  // Fallback help content
  const defaultHelp = {
    title: "Dashboard Help",
    description: "General overview of how to use the dashboard efficiently.",
    sections: [
      { title: "Navigation", text: "Use the sidebar and breadcrumbs to explore features." },
      { title: "Search", text: "Quickly locate records using search and filters." },
      { title: "Settings", text: "Access global preferences and account customization." },
    ],
  }

  // Determine which help to use
  const routeKey = Object.keys(helpContent).find((key) => pathname.startsWith(key))
  const currentHelp = routeKey ? helpContent[routeKey] : defaultHelp

  return (
    <header className="flex h-[var(--header-height)] shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />

        {/* Breadcrumb */}
        <Breadcrumb className="ml-2 font-mono bg-muted p-1 border rounded text-xs">
          {breadcrumbs.length === 0 ? (
            <BreadcrumbItem>
              <span className="text-gray-700 dark:text-gray-300">Dashboard</span>
            </BreadcrumbItem>
          ) : (
            breadcrumbs.map((crumb, idx) => (
              <BreadcrumbItem key={idx}>
                {idx === breadcrumbs.length - 1 ? (
                  <span className="text-gray-700 dark:text-gray-300">{crumb.name}</span>
                ) : (
                  <BreadcrumbLink
                    href={crumb.href}
                    className="text-gray-500 flex hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    {crumb.name}
                    <div className="hidden sm:block mx-2">/</div>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            ))
          )}
        </Breadcrumb>

        {/* Help Sheet */}
        <div className="ml-auto flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <ScanEye className="hover:bg-muted hover:border w-5 h-5 p-1 rounded cursor-pointer transition" />
            </SheetTrigger>
            <SheetContent side="right" className="w-96 p-6 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>{currentHelp.title}</SheetTitle>
                <SheetDescription>{currentHelp.description}</SheetDescription>
              </SheetHeader>

              <div className="mt-4 space-y-4 text-sm text-gray-700 dark:text-gray-300">
                {currentHelp.sections.map((s, i) => (
                  <section key={i}>
                    <h3 className="font-semibold mb-1">{s.title}</h3>
                    <p>{s.text}</p>
                  </section>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
