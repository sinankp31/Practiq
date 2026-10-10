import { Logo } from './Logo'

/** Compact brand bar for screens without the sidebar. */
export function MobileHeader() {
  return (
    <header className="sticky top-0 z-20 flex h-12 items-center border-b border-border bg-surface/95 px-4 backdrop-blur-sm sm:px-6 lg:hidden">
      <Logo />
    </header>
  )
}
