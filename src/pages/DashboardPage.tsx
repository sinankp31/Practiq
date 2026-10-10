import { useMemo } from 'react'
import { StatsRow } from '@/components/dashboard/StatsRow'
import { PageHeader } from '@/components/layout/PageHeader'
import { AddQuestionButton } from '@/components/questions/AddQuestionButton'
import { Skeleton } from '@/components/ui/Skeleton'
import { usePractice } from '@/features/practice/usePractice'
import { selectStats } from '@/features/progress/selectStats'

export default function DashboardPage() {
  const { questions, isLoading } = usePractice()
  const stats = useMemo(() => selectStats(questions), [questions])

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Your interview preparation at a glance."
        action={<AddQuestionButton />}
      />
      <div className="space-y-4">{isLoading ? <Skeleton className="h-24 w-full" /> : <StatsRow stats={stats} />}</div>
    </>
  )
}
