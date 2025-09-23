"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { NavItem } from "@/types/menus"

// Navigation configuration
const navConfig: NavItem[] = [
  {
    title: "Healthcare",
    children: [
      {
        title: "Appointments",
        href: "/login",
        description: "Book and manage doctor appointments online.",
      },
      {
        title: "Medical Records",
        href: "/login",
        description: "Access your secure and well-organized medical history.",
      },
      {
        title: "Monitoring",
        href: "/login",
        description: "Monitor your health metrics and get insights.",
      },
      {
        title: "Consultation",
        href: "/login",
        description: "Get online consultations from healthcare professionals.",
      },
    ],
  },
  {
    title: "Features",
    children: [
      {
        title: "Payments & Billing",
        href: "/services",
        description: "Easy and secure payments with analytics support.",
      },
      {
        title: "Storages",
        href: "/services",
        description: "Secure Storages for Your Medicial Records.",
      },
      {
        title: "Reports",
        href: "/services",
        description: "Download test results and history in multiple formats.",
      },
      {
        title: "Support",
        href: "/services",
        description: "24/7 technical and medical support.",
      },
    ],
  },
  { title: "About Us", href: "/about" },
  { title: "FAQ", href: "/#FAQ" },
]


export function NavigationBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="   sticky top-0 bg-background/95 z-60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Column 1: Logo */}
          <div className="flex items-center">
            <a href="/" className="text-xl font-sans hover:text-3 hover:border rounded hover:px-2 hover:bg-black hover:text-slate-300 font-bold text-foreground transition-all duration-300 hover:tracking-widest ">
              MyanClinic
            </a>
          </div>

          {/* Column 2: Desktop Navigation Menu */}
          <div className="hidden md:flex">
            <NavigationMenu viewport={true}>
              <NavigationMenuList>
                {navConfig.map((item) => (
                  <NavigationMenuItem key={item.title} >
                    {item.children ? (
                      <>
                        <NavigationMenuTrigger className="bg-transparent ">{item.title}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
                            {item.children.map((child) => (
                              <ListItem
                                key={child.title}
                                href={child.href!}
                                title={child.title}
                              >
                                {child.description}
                              </ListItem>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink
                        className="group bg-transparent inline-flex h-10 w-max items-center justify-center rounded-md  px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                        href={item.href}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Column 3: CTA Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <Button className="hidden md:inline-flex">Get Started</Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navConfig.map((item) => (
                <React.Fragment key={item.title}>
                  <a
                    href={item.href || "#"}
                    className="block rounded-md px-3 py-2 text-center transition-all duration-300 hover:py-3 font-mono text-base font-medium text-muted-foreground  hover:text-black "
                  >
                    {item.title}
                  </a>
                </React.Fragment>
              ))}
              <div className="px-3 py-2">
                <Button className="w-full" onClick={() => window.location.href = "/login"}>Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// sub-component for list items in the dropdown
const ListItem = ({
  className,
  title,
  children,
  ...props
}: {
  className?: string
  title: string
  children: React.ReactNode
  href: string
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  )
}
