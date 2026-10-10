import { memo } from 'react'
import type { Question } from '@/types/question'
import { formatRelativeDate } from '@/utils/date'
import { CategoryTag, DifficultyBadge, StatusBadge } from './badges'

/** Desktop/tablet table row. */
export const QuestionRow = memo(function QuestionRow({ question }: { question: Question }) {
  return (
    <tr className="transition-colors hover:bg-subtle/60">
      <td className="px-4 py-3 align-middle font-medium">{question.question}</td>
      <td className="px-4 py-3 align-middle">
        <CategoryTag category={question.category} />
      </td>
      <td className="px-4 py-3 align-middle">
        <DifficultyBadge difficulty={question.difficulty} />
      </td>
      <td className="px-4 py-3 align-middle">
        <StatusBadge status={question.status} />
      </td>
      <td className="hidden px-4 py-3 align-middle text-xs text-muted xl:table-cell">
        {formatRelativeDate(question.updatedAt)}
      </td>
    </tr>
  )
})
