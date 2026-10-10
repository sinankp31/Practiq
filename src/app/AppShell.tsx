import { Outlet } from 'react-router-dom'

export function AppShell() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
      <Outlet />
    </main>
  )
}
