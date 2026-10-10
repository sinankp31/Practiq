import { useMemo } from 'react'
import { ProgressSummary } from '@/components/dashboard/ProgressSummary'
import { StatsRow } from '@/components/dashboard/StatsRow'
import { PageHeader } from '@/components/layout/PageHeader'
import { AddQuestionButton } from '@/components/questions/AddQuestionButton'
import { MachineCodingCard } from '@/features/machine-coding/MachineCodingCard'
import { Skeleton } from '@/components/ui/Skeleton'
import { usePractice } from '@/features/practice/usePractice'
import { selectStats } from '@/features/progress/selectStats'

export default function DashboardPage() {
  const { questions, machineCoding, setMachineCoding, isLoading } = usePractice()
  const stats = useMemo(() => selectStats(questions), [questions])

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Your interview preparation at a glance."
        action={<AddQuestionButton />}
      />
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      ) : (
        <div className="space-y-4">
          <StatsRow stats={stats} />
          <div className="grid gap-4 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <ProgressSummary stats={stats} />
            </div>
            <div className="lg:col-span-2">
              <MachineCodingCard value={machineCoding} onChange={setMachineCoding} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
