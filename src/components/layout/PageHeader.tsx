import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  description?: string
  /** Primary page action, e.g. "Add question". */
  action?: ReactNode
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3 pb-6">
      <div className="min-w-0">
        <h1 className="text-xl sm:text-[1.375rem]">{title}</h1>
        {description && <p className="mt-1 text-muted">{description}</p>}
      </div>
      {action}
    </header>
  )
}
