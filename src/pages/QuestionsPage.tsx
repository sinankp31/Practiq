import { useMemo, useState } from 'react'
import { AddQuestionButton } from '@/components/questions/AddQuestionButton'
import { QuestionList } from '@/components/questions/QuestionList'
import { QuestionToolbar } from '@/components/questions/QuestionToolbar'
import { PageHeader } from '@/components/layout/PageHeader'
import { usePractice } from '@/features/practice/usePractice'
import { DEFAULT_FILTERS, filterQuestions } from '@/features/questions/filterQuestions'
import type { QuestionFilters } from '@/types/question'

export default function QuestionsPage() {
  const { questions } = usePractice()
  // Filters are UI state: they live here, not in global state.
  const [filters, setFilters] = useState<QuestionFilters>(DEFAULT_FILTERS)
  const visible = useMemo(() => filterQuestions(questions, filters), [questions, filters])

  return (
    <>
      <PageHeader
        title="Questions"
        description="Track, filter and practice your interview questions."
        action={<AddQuestionButton />}
      />
      <QuestionToolbar
        filters={filters}
        onChange={setFilters}
        onReset={() => setFilters(DEFAULT_FILTERS)}
        resultCount={visible.length}
        totalCount={questions.length}
      />
      <QuestionList questions={visible} />
    </>
  )
}
