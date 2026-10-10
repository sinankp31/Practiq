import { Trash2 } from 'lucide-react'

export function DeleteQuestionButton({ question, onClick }: { question: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Delete question: ${question}`}
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-control text-faint transition-colors hover:bg-danger-soft hover:text-danger md:size-8"
    >
      <Trash2 size={16} aria-hidden="true" />
    </button>
  )
}
