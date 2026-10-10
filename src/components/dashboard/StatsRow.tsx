import type { PracticeStats } from '@/features/progress/selectStats'

interface StatProps {
  label: string
  value: number
  detail: string
}

function Stat({ label, value, detail }: StatProps) {
  // Mobile: label + detail on the left, number on the right (compact rows).
  // sm+: a plain stacked column inside the strip.
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-x-4 px-4 py-3 sm:block sm:px-5 sm:py-4">
      <dt className="text-xs font-medium text-muted">{label}</dt>
      <dd className="col-start-2 row-span-2 row-start-1 text-2xl font-semibold tracking-tight tabular-nums sm:mt-1 sm:block">
        {value}
      </dd>
      <dd className="text-2xs text-muted sm:mt-0.5">{detail}</dd>
    </div>
  )
}

/** One bordered strip with dividers, rather than three separate cards. */
export function StatsRow({ stats }: { stats: PracticeStats }) {
  const { total, inProgress, pending, dsa, interview } = stats
  return (
    <dl className="grid divide-y divide-border overflow-hidden rounded-panel border border-border bg-surface sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      <Stat label="Total questions" value={total} detail={`${inProgress} in progress, ${pending} pending`} />
      <Stat label="Completed DSA problems" value={dsa.completed} detail={`of ${dsa.total} DSA ${dsa.total === 1 ? 'question' : 'questions'}`} />
      <Stat
        label="Completed interview questions"
        value={interview.completed}
        detail={`of ${interview.total} Git and Technical`}
      />
    </dl>
  )
}
