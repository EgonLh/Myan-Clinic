"use client"
// ----- Root Admin User Navigation ----- //
// - Review [x] 
import * as React from "react"
import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowBigLeft, Blocks, UserCircle } from "lucide-react"
import { useRouter } from "next/navigation"

// ------------------------------------
// NavUser Component
// ------------------------------------
// Displays the current user's info in the sidebar with a dropdown menu
// containing options like Account, Billing, Notifications, and Log out.
// Includes a modal (Dialog) for user account details.
// ------------------------------------
export function NavUser({
  user,
}: {
  user: {
    role: string
    email: string
    avatar: string
  }
}) {
  const router = useRouter();

  // ---- Handlers ---- //
  const BackToMainHandler = () => {
    router.push("/");
  };
  const Logout = () => {
    router.push("/");
  }
  const { isMobile } = useSidebar() // Detects sidebar mode (mobile or desktop)
  const [openDialog, setOpenDialog] = React.useState(false) // State for Account dialog

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {/* Dropdown Trigger (User Info Button) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {/* User Avatar */}
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={user.avatar} alt={user.role} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>

              {/* Role and Email */}
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.role}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
              </div>

              {/* Options Icon */}
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          {/* Dropdown Content */}
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            {/* Dropdown Header - User Info */}
            <DropdownMenuLabel className="p-0 font-mono font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.role} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.role}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* Action Items */}
            <DropdownMenuGroup>
              <DropdownMenuItem className="font-mono" onSelect={() => setOpenDialog(true)}>
                <IconUserCircle />
                Account
              </DropdownMenuItem>

              <DropdownMenuItem className="font-mono" onSelect={()=>BackToMainHandler()}>
                <ArrowBigLeft />
                Go To Main
              </DropdownMenuItem>

            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            {/* Log Out Action */}
            <DropdownMenuItem className="font-mono" onSelect={Logout}>
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>

      {/* ------------------------------------ */}
      {/* Account Info Dialog */}
      {/* ------------------------------------ */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-sm p-3">
          <DialogHeader>
            <DialogTitle>
              <div className="font-mono flex items-center hover:underline transitions-all duration-300 decoration-dashed underline-offset-4 decoration-indigo-500">
                <Blocks className="w-6 h-6 me-1"/> User Information</div>
            </DialogTitle>
            <DialogDescription asChild>
              <Card className="border-none  p-1 rounded-sm shadow-none ">
                
                <CardContent className="flex px-0 justify-between  items-center ">
                  <div>
                   <div className="w-full font-mono  flex justify-start ">
                    <div className="underline text-xs">{user.email}</div>
                  </div>
                  <div className="w-full flex justify-between ">
                    <div className="hover:underline text-xl">{user.role}</div>
                  </div>
                 </div>
                  <div className=" rounded-t-sm ">
                    <Avatar className="h-20 w-20   border rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.role}   />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  </div>
                 
                </CardContent>
              </Card>
            </DialogDescription>
          </DialogHeader>

          {/* Close Button */}
          <div className=" border-t-2 border-dashed  flex justify-end">
            <DialogClose asChild>
              <Button variant="outline" className="mt-3">Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </SidebarMenu>
  )
}
