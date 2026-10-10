import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from '@/app/navItems'
import { Logo } from './Logo'

/** Desktop navigation. Hidden below the lg breakpoint (BottomNav takes over). */
export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-border bg-surface lg:flex">
      <div className="flex h-14 items-center px-5">
        <Logo />
      </div>

      <nav aria-label="Primary" className="flex-1 px-3 pt-2">
        <ul className="space-y-0.5">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex h-9 items-center gap-2.5 rounded-control px-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-accent-soft text-accent-hover'
                      : 'text-muted hover:bg-subtle hover:text-ink'
                  }`
                }
              >
                <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <p className="px-5 py-4 text-2xs text-faint">Practice with purpose.</p>
    </aside>
  )
}
