import { memo } from 'react'
import type { Question } from '@/types/question'
import { formatRelativeDate } from '@/utils/date'
import { CategoryTag, DifficultyBadge, StatusBadge } from './badges'

/** Mobile list item. Stacked so nothing needs horizontal scrolling. */
export const QuestionCard = memo(function QuestionCard({ question }: { question: Question }) {
  return (
    <li className="space-y-3 p-4">
      <p className="font-medium leading-snug">{question.question}</p>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <CategoryTag category={question.category} />
        <DifficultyBadge difficulty={question.difficulty} />
        <span className="ml-auto text-2xs text-faint">{formatRelativeDate(question.updatedAt)}</span>
      </div>
      <StatusBadge status={question.status} />
    </li>
  )
})
