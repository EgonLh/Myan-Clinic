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
      title: "Permissions",
      url: "/dashboard/admin/permissions",
      icon: IconFolder,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/admin/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/dashboard/admin/help",
      icon: IconHelp,
    },
  ],
  Storage: [
    {
      name: "Patient History",
      url: "/dashboard/admin/patient-history",
      icon: IconDatabase,
    },
    {
      name: "Document Storage",
      url: "/dashboard/admin/storages",
      icon: IconReport,
    },
    {
      name: "Doctoral Information",
      url: "/dashboard/admin/doctoral-information",
      icon: IconFileWord,
    },
  ],
  Management: [
    {
      name: "Features",
      url: "/dashboard/admin/features",
      icon: IconDatabase,
    },
    {
      name: "Feedback",
      url: "/dashboard/admin/feedbacks",
      icon: IconReport,
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
        <NavDocuments items={data.Storage} />
        <NavDocuments items={data.Management} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
