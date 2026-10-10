import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/common/EmptyState'

export function NoResults({ onReset }: { onReset: () => void }) {
  return (
    <EmptyState title="No questions found" description="Try changing your search or filters.">
      <Button onClick={onReset}>Clear filters</Button>
    </EmptyState>
  )
}
