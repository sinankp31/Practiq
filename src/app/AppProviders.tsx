import type { ReactNode } from 'react'
import { PracticeProvider } from '@/features/practice/PracticeProvider'

/** Single place to compose app-wide providers. */
export function AppProviders({ children }: { children: ReactNode }) {
  return <PracticeProvider>{children}</PracticeProvider>
}
