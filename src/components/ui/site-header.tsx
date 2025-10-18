"use client"
// ----- Siteheader for Admin ----- //
// - Review[x]
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

  // ----- Generate breadcrumb items from current route ----- //
  const breadcrumbs = pathSegments.map((segment, idx) => {
    const href = "/" + pathSegments.slice(0, idx + 1).join("/")
    const name = segment
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ")
    return { name, href }
  })

  // ----- Define contextual help content per route ----- //
  const helpContent: Record<
    string,
    {
      title: string
      description: string
      sections: { title: string; text: string }[]
    }
  > = {
    // ----- Admin Root Dashboard ----- //
    "/dashboard/admin": {
      title: "Root Admin Dashboard Manual",
      description: "Quick overview of the admin system and how to navigate it.",
      sections: [
        { title: "Navigation", text: "Use the sidebar to move between key sections." },
        { title: "Breadcrumbs", text: "Track your current position and navigate back easily." },
        { title: "Dashboard", text: "You can Overview of the system, total data and appointments list in this page" },
      ],
    },

    // ----- Admin Root Dashboard ----- //
    "/dashboard/admin/permissions": {
      title: "Permission Dashboard Manual",
      description: "Quick overview of all users in the system.",
      sections: [
        { title: "Overview", text: "Check Detail Information for All Users " },
        { title: "Functions", text: "Update and Delete All Users " },
      ],
    },

    // ----- Analytics Overview ----- //
    "/dashboard/admin/analytics": {
      title: "Analytics Management Guide",
      description: "View The Overview of the system effectivelys.",
      sections: [
        { title: "Overview", text: "In Cards, The Clear Analysis of The System is Provided" },
        { title: "Charts", text: "The Charts Based on Doctors and Departs Which Are Importnat Pills of The System are Provided For Monitoring" },
        { title: "Analytics", text: "View trends and daily appointment statistics." },
      ],
    },

    // ----- Doctor Management ----- //
    "/dashboard/admin/doctors": {
      title: "Doctor Management Manual",
      description: "Add, edit, and manage doctors and their associated departments.",
      sections: [
        { title: "Adding Doctors", text: "Click 'Add Doctor' to include a new specialist or generalist." },
        { title: "Departments", text: "Organize doctors by department for better searchability." },
        { title: "Doctor Analytics", text: "View patient load, appointments per doctor, and performance data." },
      ],
    },

    // ----- Patients Management ----- //
    "/dashboard/admin/patients": {
      title: "Patient Management Guide",
      description: "View, edit, and track patient information, history, and reports.",
      sections: [
        { title: "Patient Info", text: "Access patient demographics, visits, and notes." },
        { title: "Reports", text: "Generate or export health reports and appointment summaries." },
      ],
    },

    // ----- Patient History ----- //
    "/dashboard/admin/patient-history": {
      title: "Patient History Overview",
      description: "Access complete medical and appointment history for each patient.",
      sections: [
        { title: "Timeline", text: "Review a chronological view of past visits and treatments." },
        { title: "Records", text: "Access linked health reports and prescription details." },
        { title: "Export", text: "Export patient history for offline documentation or transfer." },
      ],
    },

    // ----- Departments Management ----- //
    "/dashboard/admin/departments": {
      title: "Department Management Manual",
      description: "Manage hospital departments, their staff, and related analytics.",
      sections: [
        { title: "Department Overview", text: "See all active departments and assigned doctors." },
        { title: "Editing Departments", text: "Rename or update department descriptions easily." },
        { title: "Department Insights", text: "View performance metrics and doctor distribution." },
      ],
    },

    // ----- Single Department (Detail Page) ----- //
    "/dashboard/admin/department": {
      title: "Department Detail Guide",
      description: "View and manage specific department data and assigned doctors.",
      sections: [
        { title: "Doctor Assignment", text: "View which doctors are assigned to this department." },
        { title: "Performance", text: "Check appointment statistics for this department." },
        { title: "Update Info", text: "Edit department name or description directly." },
      ],
    },

    // ----- Storage / File Management ----- //
    "/dashboard/admin/storages": {
      title: "Storage Management Manual",
      description: "Upload, manage, and organize digital files like patient records and reports.",
      sections: [
        { title: "Uploading Files", text: "Use the upload button to store reports or media securely." },
        { title: "Categories", text: "Group files by type — reports, scans, prescriptions, etc." },
        { title: "Access Control", text: "Manage file permissions for doctors and staff." },
      ],
    },

    // ----- Features Overview ----- //
    "/dashboard/admin/features": {
      title: "System Features Overview",
      description: "Learn about all integrated modules and tools available to admins.",
      sections: [
        { title: "Analytics Module", text: "Visualize doctor and appointment statistics." },
        { title: "Reports", text: "Generate health summaries and departmental analytics." },
        { title: "Integrations", text: "Connect with external APIs or hospital systems." },
      ],
    },
    // ----- Features Overview ----- //
    "/dashboard/admin/appointments": {
      title: "All Appointments Overview",
      description: "Learn about all appointments To The system.",
      sections: [
        { title: "Filters", text: "Use Filters To Track Appointments and Its Information" },
        { title: "Reports", text: "Check Detail Informations Of All Appointments" },
      ],
    },

    // ----- Help / Documentation ----- //
    "/dashboard/admin/help": {
      title: "Help & Support Center",
      description: "Access documentation, tutorials, and troubleshooting resources.",
      sections: [
        { title: "User Manual", text: "Comprehensive guide for each dashboard feature." },
        { title: "FAQs", text: "Get quick answers to common administrative questions." },
        { title: "Support", text: "Contact technical support or file a help ticket." },
      ],
    },
  }

  // ----- Default help content when route not defined ----- //
  const defaultHelp = {
    title: "Dashboard Help",
    description: "General overview of how to use the dashboard efficiently.",
    sections: [
      { title: "Navigation", text: "Use the sidebar and breadcrumbs to explore features." },
      { title: "Search", text: "Quickly locate records using search and filters." },
      { title: "Settings", text: "Access global preferences and account customization." },
    ],
  }

  // ----- Determine which help section to display ----- //
  const routeKey = Object.keys(helpContent).find((key) => pathname === key)

  const currentHelp = routeKey ? helpContent[routeKey] : defaultHelp
  return (
    <header className="flex h-[var(--header-height)] shrink-0 items-center gap-2 border-b-1 border-dashed transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        {/* --- Sidebar Toggle --- */}
        <SidebarTrigger className="-ml-1" />

        {/* --- Breadcrumb Navigation --- */}
        <Breadcrumb className="ml-2 font-mono bg-muted p-1 border rounded text-xs">
          {breadcrumbs.length === 0 ? (
            <BreadcrumbItem>
              <span className="text-gray-700 dark:text-gray-300 hidden ">Dashboard</span>
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
                    <div className="mx-2">/</div>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            ))
          )}
        </Breadcrumb>

        {/* --- Route-Specific Help Drawer --- */}
        <div className="ml-auto flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <ScanEye className="hover:bg-muted hover:border w-7 h-7 p-1 rounded cursor-pointer transition" />
            </SheetTrigger>
            <SheetContent side="right" className="w-96 p-6 overflow-y-auto">
              <SheetHeader className="border rounded m-3 bg-slate-100/[0.1] border-dashed border-2">
                <SheetTitle className="font-mono">{currentHelp.title}</SheetTitle>
                <SheetDescription className="font-mono text-xs text-justify">{currentHelp.description}</SheetDescription>
              </SheetHeader>

              <div className="mt-4 space-y-4 text-sm text-gray-700 dark:text-gray-300">
                {currentHelp.sections.map((s, i) => (
                  <section key={i}>
                    <h3 className="font-semibold mb-1 font-mono underline">{s.title}</h3>
                    <p className="tracking-wide text-xs text-balance">{s.text}</p>
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
