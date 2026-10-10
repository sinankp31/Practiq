import { useState } from 'react'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { usePractice } from '@/features/practice/usePractice'
import type { Question } from '@/types/question'
import { QuestionCard } from './QuestionCard'
import { QuestionRow } from './QuestionRow'

const TH = 'px-4 py-2.5 text-left text-2xs font-medium text-muted'

/**
 * Same data, two layouts. CSS decides which one is visible (md breakpoint);
 * the hidden one is display:none, so it's also removed from the accessibility tree.
 */
export function QuestionList({ questions }: { questions: Question[] }) {
  const { updateStatus, deleteQuestion } = usePractice()
  const [pendingDelete, setPendingDelete] = useState<Question | null>(null)

  function confirmDelete() {
    if (pendingDelete) deleteQuestion(pendingDelete.id)
    setPendingDelete(null)
  }

  return (
    <>
      <div className="hidden overflow-x-auto rounded-panel border border-border bg-surface md:block">
        <table className="w-full table-fixed border-collapse text-sm">
          <caption className="sr-only">Interview questions</caption>
          <colgroup>
            <col />
            <col className="w-28" />
            <col className="w-28" />
            <col className="w-44" />
            <col className="hidden w-32 xl:table-column" />
            <col className="w-14" />
          </colgroup>
          <thead>
            <tr className="border-b border-border bg-subtle/50">
              <th scope="col" className={TH}>Question</th>
              <th scope="col" className={TH}>Category</th>
              <th scope="col" className={TH}>Difficulty</th>
              <th scope="col" className={TH}>Status</th>
              <th scope="col" className={`${TH} hidden xl:table-cell`}>Updated</th>
              <th scope="col" className={TH}><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {questions.map((q) => (
              <QuestionRow key={q.id} question={q} onStatusChange={updateStatus} onDelete={setPendingDelete} />
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-border overflow-hidden rounded-panel border border-border bg-surface md:hidden">
        {questions.map((q) => (
          <QuestionCard key={q.id} question={q} onStatusChange={updateStatus} onDelete={setPendingDelete} />
        ))}
      </ul>

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Delete this question?"
        description={pendingDelete ? `"${pendingDelete.question}" will be removed from your tracker. This can't be undone.` : ''}
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  )
}
