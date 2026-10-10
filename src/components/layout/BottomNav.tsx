import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from '@/app/navItems'

/** Mobile/tablet navigation: thumb-reachable tab bar, hidden at lg+. */
export function BottomNav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="grid grid-cols-2">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex h-14 flex-col items-center justify-center gap-0.5 text-2xs font-medium transition-colors ${
                  isActive ? 'text-accent-hover' : 'text-muted'
                }`
              }
            >
              <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
