import { useMemo, useState } from 'react'
import { EmptyTracker } from '@/components/questions/EmptyTracker'
import { NoResults } from '@/components/questions/NoResults'
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

  const resetFilters = () => setFilters(DEFAULT_FILTERS)

  return (
    <>
      <PageHeader
        title="Questions"
        description="Track, filter and practice your interview questions."
        action={questions.length > 0 ? <AddQuestionButton /> : undefined}
      />
      {questions.length === 0 ? (
        <EmptyTracker />
      ) : (
        <>
          <QuestionToolbar
            filters={filters}
            onChange={setFilters}
            onReset={resetFilters}
            resultCount={visible.length}
            totalCount={questions.length}
          />
          {visible.length === 0 ? <NoResults onReset={resetFilters} /> : <QuestionList questions={visible} />}
        </>
      )}
    </>
  )
}
