import { ChevronDown } from 'lucide-react'
import { STATUSES } from '@/constants/questions'
import { isStatus } from '@/types/guards'
import type { Status } from '@/types/question'
import { cn } from '@/utils/cn'

const DOT: Record<Status, string> = {
  Pending: 'bg-faint',
  'In Progress': 'bg-warning',
  Completed: 'bg-success',
}

interface StatusSelectProps {
  value: Status
  /** Accessible name, e.g. 'Status of "Reverse a linked list"'. */
  label: string
  onChange: (status: Status) => void
  className?: string
}

/** Inline status control: a native select with the status dot drawn on top. */
export function StatusSelect({ value, label, onChange, className }: StatusSelectProps) {
  return (
    <div className={cn('relative', className)}>
      <span
        aria-hidden="true"
        className={cn('pointer-events-none absolute left-2.5 top-1/2 size-1.5 -translate-y-1/2 rounded-full', DOT[value])}
      />
      <select
        aria-label={label}
        value={value}
        onChange={(e) => isStatus(e.target.value) && onChange(e.target.value)}
        className="h-11 w-full cursor-pointer appearance-none rounded-control border border-border-strong bg-surface pl-6 pr-7 text-xs font-medium text-ink transition-colors hover:border-faint md:h-8"
      >
        {STATUSES.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <ChevronDown
        size={14}
        aria-hidden="true"
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-faint"
      />
    </div>
  )
}
