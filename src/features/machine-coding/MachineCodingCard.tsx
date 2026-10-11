import { MACHINE_CODING_STATUSES } from '@/constants/questions'
import type { MachineCodingStatus } from '@/types/question'

interface MachineCodingCardProps {
  value: MachineCodingStatus
  onChange: (status: MachineCodingStatus) => void
}

/**
 * Machine coding = building a small working UI/app under a time limit.
 * It's tracked as one status for the whole student, not per question.
 * Native radios underneath, so arrow-key navigation and screen readers just work.
 */
export function MachineCodingCard({ value, onChange }: MachineCodingCardProps) {
  return (
    <fieldset className="h-full min-w-0 rounded-panel border border-border bg-surface p-5">
      <legend className="float-left w-full text-xs font-medium text-muted">Machine coding</legend>
      <p className="clear-both mt-1 text-sm">
        <span className="text-muted">Status: </span>
        <span className="font-semibold">{value}</span>
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {MACHINE_CODING_STATUSES.map((status) => (
          <label key={status} className="relative block">
            <input
              type="radio"
              name="machine-coding-status"
              value={status}
              checked={value === status}
              onChange={() => onChange(status)}
              className="peer sr-only"
            />
            <span className="flex h-11 cursor-pointer items-center justify-center rounded-control border border-border-strong text-xs font-medium text-muted transition-colors [input:not(:checked)+&]:hover:border-faint [input:not(:checked)+&]:hover:text-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-canvas peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent md:h-9">
              {status}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
