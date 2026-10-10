import { memo } from 'react'
import type { Question, Status } from '@/types/question'
import { formatRelativeDate } from '@/utils/date'
import { CategoryTag, DifficultyBadge } from './badges'
import { DeleteQuestionButton } from './DeleteQuestionButton'
import { StatusSelect } from './StatusSelect'

/** Mobile list item. Stacked so nothing needs horizontal scrolling. */
interface QuestionCardProps {
  question: Question
  onStatusChange: (id: string, status: Status) => void
  onDelete: (question: Question) => void
}

export const QuestionCard = memo(function QuestionCard({ question, onStatusChange, onDelete }: QuestionCardProps) {
  return (
    <li className="space-y-3 p-4">
      <p className="font-medium leading-snug">{question.question}</p>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <CategoryTag category={question.category} />
        <DifficultyBadge difficulty={question.difficulty} />
        <span className="ml-auto text-2xs text-faint">{formatRelativeDate(question.updatedAt)}</span>
      </div>
      <div className="flex items-center gap-2">
        <StatusSelect
          className="flex-1"
          value={question.status}
          label={`Status of "${question.question}"`}
          onChange={(status) => onStatusChange(question.id, status)}
        />
        <DeleteQuestionButton question={question.question} onClick={() => onDelete(question)} />
      </div>
    </li>
  )
})
