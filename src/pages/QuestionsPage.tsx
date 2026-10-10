import { AddQuestionButton } from '@/components/questions/AddQuestionButton'
import { PageHeader } from '@/components/layout/PageHeader'
import { QuestionList } from '@/components/questions/QuestionList'
import { usePractice } from '@/features/practice/usePractice'

export default function QuestionsPage() {
  const { questions } = usePractice()

  return (
    <>
      <PageHeader
        title="Questions" description="Track, filter and practice your interview questions."
        action={<AddQuestionButton />}
      />
      <QuestionList questions={questions} />
    </>
  )
}
