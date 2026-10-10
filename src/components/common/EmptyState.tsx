import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description: string
  children?: ReactNode
}

/** Shared shell for "nothing here" screens. Plain on purpose: no illustration, just direction. */
export function EmptyState({ title, description, children }: EmptyStateProps) {
  return (
    <div className="rounded-panel border border-dashed border-border-strong px-6 py-12 text-center sm:py-16">
      <h2 className="text-base">{title}</h2>
      <p className="mx-auto mt-1 max-w-sm text-muted">{description}</p>
      {children && <div className="mt-5 flex flex-col items-stretch justify-center gap-2 sm:flex-row sm:items-center">{children}</div>}
    </div>
  )
}
