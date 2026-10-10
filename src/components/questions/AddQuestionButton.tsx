import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { usePractice } from '@/features/practice/usePractice'
import type { NewQuestionInput } from '@/types/question'
import { QuestionForm } from './QuestionForm'

interface AddQuestionButtonProps {
  label?: string
  variant?: 'primary' | 'secondary'
}

/** Self-contained: the button owns its modal, so any page can drop it in. */
export function AddQuestionButton({ label = 'Add question', variant = 'primary' }: AddQuestionButtonProps) {
  const [open, setOpen] = useState(false)
  const { addQuestion } = usePractice()

  function handleSubmit(input: NewQuestionInput) {
    addQuestion(input)
    setOpen(false)
  }

  return (
    <>
      <Button variant={variant} onClick={() => setOpen(true)}>
        <Plus size={16} aria-hidden="true" />
        {label}
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Add question"
        description="Add something to practise. You can change its status any time."
      >
        <QuestionForm onSubmit={handleSubmit} onCancel={() => setOpen(false)} />
      </Modal>
    </>
  )
}
