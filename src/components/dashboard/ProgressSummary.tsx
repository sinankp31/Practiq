import type { PracticeStats } from '@/features/progress/selectStats'
import { cn } from '@/utils/cn'

const SEGMENTS = [
  { key: 'completed', label: 'Completed', bar: 'bg-success' },
  { key: 'inProgress', label: 'In progress', bar: 'bg-warning' },
  { key: 'pending', label: 'Pending', bar: 'bg-border-strong' },
] as const

export function ProgressSummary({ stats }: { stats: PracticeStats }) {
  const { total, completed, percentComplete } = stats

  return (
    <section aria-labelledby="progress-heading" className="h-full rounded-panel border border-border bg-surface p-5">
      <h2 id="progress-heading" className="text-xs font-medium text-muted">
        Overall progress
      </h2>

      <p className="mt-1 flex flex-wrap items-baseline gap-x-2">
        <span className="text-[1.75rem] font-semibold leading-tight tracking-tight tabular-nums">{percentComplete}%</span>
        <span className="text-xs text-muted">
          {total === 0 ? 'Add questions to start tracking your progress.' : `${completed} of ${total} completed`}
        </span>
      </p>

      {/* Segmented bar: widths are each status's share of all questions. */}
      <div
        role="progressbar"
        aria-label="Questions completed"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentComplete}
        className="mt-4 flex h-2 overflow-hidden rounded-full bg-subtle"
      >
        {total > 0 &&
          SEGMENTS.map(({ key, bar }) => (
            <div
              key={key}
              className={cn(bar, 'transition-[width] duration-300 ease-out')}
              style={{ width: `${(stats[key] / total) * 100}%` }}
            />
          ))}
      </div>

      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
        {SEGMENTS.map(({ key, label, bar }) => (
          <li key={key} className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" className={cn('size-1.5 rounded-full', bar)} />
            {label}
            <span className="font-medium tabular-nums text-ink">{stats[key]}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
