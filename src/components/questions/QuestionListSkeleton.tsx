import { Skeleton } from '@/components/ui/Skeleton'

export function QuestionListSkeleton() {
  return (
    <div role="status" aria-label="Loading questions" className="space-y-px overflow-hidden rounded-panel border border-border bg-surface">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="flex items-center gap-4 border-b border-border p-4 last:border-b-0">
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="hidden h-4 w-16 md:block" />
          <Skeleton className="h-8 w-24" />
        </div>
      ))}
    </div>
  )
}
