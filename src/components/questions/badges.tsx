import { Badge, type BadgeTone } from '@/components/ui/Badge'
import type { Category, Difficulty, Status } from '@/types/question'

const DIFFICULTY_TONE: Record<Difficulty, BadgeTone> = { Easy: 'success', Medium: 'warning', Hard: 'danger' }
const STATUS_TONE: Record<Status, BadgeTone> = { Pending: 'neutral', 'In Progress': 'warning', Completed: 'success' }

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return <Badge tone={DIFFICULTY_TONE[difficulty]}>{difficulty}</Badge>
}

export function StatusBadge({ status }: { status: Status }) {
  return (
    <Badge tone={STATUS_TONE[status]} dot>
      {status}
    </Badge>
  )
}

export function CategoryTag({ category }: { category: Category }) {
  return (
    <span className="inline-block rounded-control border border-border px-1.5 py-0.5 font-mono text-2xs text-muted">
      {category}
    </span>
  )
}
