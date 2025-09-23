// nav-items
export type NavItem = {
  title: string
  href?: string
  description?: string
  children?: NavItem[]
}