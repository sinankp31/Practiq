import { useId, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/ui/FormField'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { CATEGORIES, DIFFICULTIES, STATUSES } from '@/constants/questions'
import type { Category, Difficulty, NewQuestionInput, Status } from '@/types/question'
import { isCategory, isDifficulty, isStatus } from '@/types/guards'

interface QuestionFormProps {
  onSubmit: (input: NewQuestionInput) => void
  onCancel: () => void
}

export function QuestionForm({ onSubmit, onCancel }: QuestionFormProps) {
  const uid = useId()
  const [text, setText] = useState('')
  const [category, setCategory] = useState<Category>('DSA')
  const [difficulty, setDifficulty] = useState<Difficulty>('Medium')
  const [status, setStatus] = useState<Status>('Pending')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    onSubmit({ question: text, category, difficulty, status })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <FormField htmlFor={`${uid}-question`} label="Question">
        <Textarea
          id={`${uid}-question`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. Explain how a hash map handles collisions"
          autoFocus
        />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-3">
        <FormField htmlFor={`${uid}-category`} label="Category">
          <Select id={`${uid}-category`} value={category} onChange={(e) => isCategory(e.target.value) && setCategory(e.target.value)}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </Select>
        </FormField>
        <FormField htmlFor={`${uid}-difficulty`} label="Difficulty">
          <Select id={`${uid}-difficulty`} value={difficulty} onChange={(e) => isDifficulty(e.target.value) && setDifficulty(e.target.value)}>
            {DIFFICULTIES.map((d) => <option key={d}>{d}</option>)}
          </Select>
        </FormField>
        <FormField htmlFor={`${uid}-status`} label="Status">
          <Select id={`${uid}-status`} value={status} onChange={(e) => isStatus(e.target.value) && setStatus(e.target.value)}>
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </Select>
        </FormField>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary">Add question</Button>
      </div>
    </form>
  )
}
