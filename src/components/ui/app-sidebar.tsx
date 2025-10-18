"use client"

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
  IconSearch,
  IconSettings,
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
import { Separator } from "@radix-ui/react-menubar"

const data = {
  user: {
    name: "admin",
    email: "admin@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Analytics",
      url: "/dashboard/admin/analytics",
      icon: IconChartBar,
    },
    {
      title: "Doctors",
      url: "/dashboard/admin/doctors",
      icon: IconUsers,
    },
    {
      title: "Patients",
      url: "/dashboard/admin/patients",
      icon: IconListDetails,
    },
    {
      title: "Department",
      url: "/dashboard/admin/department",
      icon: IconInnerShadowTop,
    },
    {
      title: "Permissions",
      url: "/dashboard/admin/permissions",
      icon: IconFolder,
    },
  ],
  About: [
    {
      title: "Features",
      url: "/dashboard/admin/features",
      icon: IconDatabase,
    },
    {
      title: "Get Help",
      url: "/dashboard/admin/help",
      icon: IconHelp,
    },
  ],
  Storage: [
    {
      title: "Patient History",
      url: "/dashboard/admin/patient-history",
      icon: IconDatabase,
    },
    {
      title: "Document Storage",
      url: "/dashboard/admin/storages",
      icon: IconReport,
    },
    {
      title: "Appointments",
      url: "/dashboard/admin/appointments",
      icon: IconFileWord,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props} className="">
      <SidebarHeader >
        <SidebarMenu >
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!py-6 flex items-center justify-start "
            >
              <a href="#">
                <Syringe className="!size-6 bg-black p-1 rounded text-green-500" />
                <span className="text-base font-semibold">MyanClinic.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <div className="text-start ms-4 mt-6 text-xs font-mono">Storage</div>
        <NavSecondary items={data.Storage} />
        <div className="text-start mt-6 ms-4 text-xs font-mono">About</div>
        <NavSecondary items={data.About} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
