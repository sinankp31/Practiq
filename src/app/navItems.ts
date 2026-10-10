import { LayoutDashboard, ListChecks, type LucideIcon } from 'lucide-react'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  /** Match only the exact path (needed for the index route). */
  end?: boolean
}

export const NAV_ITEMS: readonly NavItem[] = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/questions', label: 'Questions', icon: ListChecks },
]
