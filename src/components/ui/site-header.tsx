"use client"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { FileQuestion, MessageCircleQuestion, ScanEye, Shield, ShieldQuestion, TableOfContents } from "lucide-react"

export function SiteHeader() {
  const pathname = usePathname() || "/"
  const pathSegments = pathname.split("/").filter(Boolean)

  const breadcrumbs = pathSegments.map((segment, idx) => {
    const href = "/" + pathSegments.slice(0, idx + 1).join("/")
    const name = segment
      .split(" / ")
      .map((s) => s.charAt(0).toLocaleUpperCase() + s.slice(1))
      .join(" ")
    return { name, href }
  })

  return (
    <header className="flex h-[var(--header-height)] shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[var(--header-height)]">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />

        {/* Shadcn Breadcrumb */}
        <Breadcrumb className="ml-2 font-mono bg-muted p-1 border rounded text-xs">
          {breadcrumbs.map((crumb, idx) => (
            <BreadcrumbItem key={idx}>
              {idx === breadcrumbs.length - 1 ? (
                <span className="text-gray-700 dark:text-gray-300 ">{crumb.name} </span>
              ) : (
                <BreadcrumbLink
                  href={crumb.href}
                  className="text-gray-500 flex hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  {crumb.name}
                  <div className="hidden sm:block mx-2 ">/</div>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          ))}
        </Breadcrumb>

        {/* GitHub button */}
        <div className="ml-auto flex items-center gap-2">
          <Sheet>
            {/* Trigger button */}
            <SheetTrigger asChild>
               <ScanEye className=" hover:bg-muted hover:border w-5 h-5 p-0 m-0 rounded" />
            </SheetTrigger>

            {/* Sheet content */}
            <SheetContent side="right" className="w-96 p-6">
          <SheetHeader>
            <SheetTitle>Root Admin Dashboard Manual</SheetTitle>
            <SheetDescription>
              A quick guide to navigating and using the admin dashboard features.
            </SheetDescription>
          </SheetHeader>

          <div className="mt-4 space-y-4 text-sm text-gray-700 dark:text-gray-300">
            <section>
              <h3 className="font-semibold mb-1">1. Sidebar Navigation</h3>
              <p>
                Use the sidebar to access different sections like Users, Settings,
                Reports, and more. Click on the icons to expand submenus.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-1">2. Breadcrumbs</h3>
              <p>
                The breadcrumb at the top shows your current location in the dashboard.
                Click on any link to quickly navigate back to a parent page.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-1">3. User Management</h3>
              <p>
                Add, edit, or delete users. Assign roles and permissions to control
                access to different dashboard features.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-1">4. Reports & Analytics</h3>
              <p>
                View real-time statistics, charts, and activity logs. Export reports
                for external use.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-1">5. Settings</h3>
              <p>
                Configure dashboard preferences, appearance (dark/light mode),
                notifications, and other global settings.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-1">6. Help & Support</h3>
              <p>
                Access guides, FAQs, and support links. Use this sheet whenever you
                need a quick reference for the dashboard.
              </p>
            </section>
          </div>
        </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
