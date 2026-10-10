import type { PracticeStats } from '@/features/progress/selectStats'

interface StatProps {
  label: string
  value: number
  detail: string
}

function Stat({ label, value, detail }: StatProps) {
  return (
    <div className="px-4 py-4 sm:px-5">
      <dt className="text-xs font-medium text-muted">{label}</dt>
      <dd className="mt-1">
        <span className="text-2xl font-semibold tracking-tight tabular-nums">{value}</span>
        <span className="mt-0.5 block text-2xs text-muted">{detail}</span>
      </dd>
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
