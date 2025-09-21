import { LucideIcon } from "lucide-react"
import { ReactElement } from "react"


//  for navigation : NavBar.tsx
export interface MenuItem {
  id: string
  label: string
  shortcut?: string | ReactElement | LucideIcon | any
  separator?: boolean
}

export interface MenuGroup {
  id: string
  trigger: string
  items: MenuItem[]
}
