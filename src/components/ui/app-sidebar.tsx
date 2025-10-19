"use client"
// ----- Sidebar of Main Admin ----- //
//- Review [x]
import * as React from "react"
import {
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/ui/nav-documents"
import { NavMain } from "@/components/ui/nav-main"
import { NavSecondary } from "@/components/ui/nav-secondary"
import { NavUser } from "@/components/ui/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Syringe } from "lucide-react"
import { useSelector } from "react-redux"
import { RootState } from "@/app/store/store"

// -------------------- Sidebar Data --------------------
const data = {
  navMain: [
    { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
    { title: "Analytics", url: "/dashboard/admin/analytics", icon: IconChartBar },
    { title: "Doctors", url: "/dashboard/admin/doctors", icon: IconUsers },
    { title: "Patients", url: "/dashboard/admin/patients", icon: IconListDetails },
    { title: "Department", url: "/dashboard/admin/department", icon: IconInnerShadowTop },
    { title: "Permissions", url: "/dashboard/admin/permissions", icon: IconFolder },
  ],
  Storage: [
    { title: "Patient History", url: "/dashboard/admin/patient-history", icon: IconDatabase },
    { title: "Document Storage", url: "/dashboard/admin/storages", icon: IconReport },
    { title: "Appointments", url: "/dashboard/admin/appointments", icon: IconFileWord },
  ],
  About: [
    { title: "Get Help", url: "/dashboard/admin/help", icon: IconHelp },
  ],
}

// -------------------- AppSidebar Component --------------------
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {user} = useSelector((state: RootState) => state.auth);

  // ---- Data Manipulation ---- //
  const currentUser = {
    role: user?.role || "Guest",
    email: user?.email || "N/A",
    avatar: "https://i.pinimg.com/1200x/23/2a/07/232a073eb5e7601860fb2477ffd3146e.jpg",
  }
  console.log("Current User in Sidebar:", currentUser);
  return (
    <Sidebar collapsible="offcanvas" {...props} className="">
      {/* -------------------- Sidebar Header -------------------- */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!py-6 flex items-center justify-start"
            >
              {/* Branding / Logo */}
              <a href="#">
                <Syringe className="!size-6 bg-black p-1 rounded text-green-500" />
                <span className="text-base font-semibold">MyanClinic.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* -------------------- Sidebar Content -------------------- */}
      <SidebarContent>
        {/* Main navigation */}
        <NavMain items={data.navMain} />

        {/* Storage section */}
        <div className="text-start ms-4 mt-6 text-xs font-mono">Storage</div>
        <NavSecondary items={data.Storage} />

        {/* About section */}
        <div className="text-start mt-6 ms-4 text-xs font-mono">About</div>
        <NavSecondary items={data.About} />
      </SidebarContent>

      {/* -------------------- Sidebar Footer -------------------- */}
      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>
    </Sidebar>
  )
}
