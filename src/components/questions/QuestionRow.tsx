import { memo } from 'react'
import type { Question } from '@/types/question'
import { formatRelativeDate } from '@/utils/date'
import type { Status } from '@/types/question'
import { CategoryTag, DifficultyBadge } from './badges'
import { DeleteQuestionButton } from './DeleteQuestionButton'
import { StatusSelect } from './StatusSelect'

/** Desktop/tablet table row. */
interface QuestionRowProps {
  question: Question
  onStatusChange: (question: Question, status: Status) => void
  onDelete: (question: Question) => void
}

export const QuestionRow = memo(function QuestionRow({ question, onStatusChange, onDelete }: QuestionRowProps) {
  return (
    <tr className="transition-colors hover:bg-subtle/60">
      <td className="px-4 py-3 align-middle font-medium [overflow-wrap:anywhere]">{question.question}</td>
      <td className="px-4 py-3 align-middle">
        <CategoryTag category={question.category} />
      </td>
      <td className="px-4 py-3 align-middle">
        <DifficultyBadge difficulty={question.difficulty} />
      </td>
      <td className="px-4 py-3 align-middle">
        <StatusSelect
          value={question.status}
          label={`Status of "${question.question}"`}
          onChange={(status) => onStatusChange(question, status)}
        />
      </td>
      <td className="hidden px-4 py-3 align-middle text-xs text-muted xl:table-cell">
        {formatRelativeDate(question.updatedAt)}
      </td>
      <td className="px-2 py-3 text-right align-middle">
        <DeleteQuestionButton question={question.question} onClick={() => onDelete(question)} />
      </td>
    </tr>
  )
})
