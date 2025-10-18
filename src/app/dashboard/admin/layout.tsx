// ----- Admin Dashboard (only) Layout ----- //
// - Review [x]
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { SiteHeader } from "@/components/ui/site-header"
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // ----- Admin Main Layout ----- //
  return (
    <div className=" flex  w-full  justify-center  ">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        {/* ----- Sidebar-Admin ----- */}
        <AppSidebar variant="floating" collapsible="offcanvas" />
        <SidebarInset>
          {/* ----- SidebarHeader-Admin ----- */}
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                {children}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
