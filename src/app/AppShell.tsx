import { Outlet } from 'react-router-dom'
import { StorageWarning } from '@/components/common/StorageWarning'
import { usePractice } from '@/features/practice/usePractice'
import { Sidebar } from '@/components/layout/Sidebar'
import { BottomNav } from '@/components/layout/BottomNav'
import { MobileHeader } from '@/components/layout/MobileHeader'

export function AppShell() {
  const { persistenceError } = usePractice()
  return (
    <div className="min-h-dvh">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-control focus:bg-ink focus:px-3 focus:py-2 focus:text-canvas"
      >
        Skip to content
      </a>
      <Sidebar />
      <MobileHeader />
      {/* pb clears the fixed bottom nav (3.5rem) below lg; pl clears the sidebar at lg+ */}
      <div className="pb-[calc(3.5rem+env(safe-area-inset-bottom))] lg:pb-0 lg:pl-60">
        {persistenceError && <StorageWarning />}
        <main id="main" tabIndex={-1} className="focus:outline-none mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10 xl:px-10">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  )
}
