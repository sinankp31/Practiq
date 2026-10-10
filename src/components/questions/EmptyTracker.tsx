import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/common/EmptyState'
import { usePractice } from '@/features/practice/usePractice'
import { AddQuestionButton } from './AddQuestionButton'

export function EmptyTracker() {
  const { loadSamples } = usePractice()
  return (
    <EmptyState title="No interview questions yet." description="Start building your preparation list.">
      <AddQuestionButton label="Add your first question" />
      <Button onClick={loadSamples}>Load sample questions</Button>
    </EmptyState>
  )
}
