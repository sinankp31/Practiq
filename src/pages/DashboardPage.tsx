import { AddQuestionButton } from '@/components/questions/AddQuestionButton'
import { PageHeader } from '@/components/layout/PageHeader'

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Your interview preparation at a glance."
        action={<AddQuestionButton />}
      />
    </>
  )
}
