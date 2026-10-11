import { useId, useRef, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/ui/FormField'
import { describedBy } from '@/components/ui/fieldIds'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { CATEGORIES, DIFFICULTIES, STATUSES } from '@/constants/questions'
import { EMPTY_DRAFT, validateQuestionDraft, type QuestionDraft } from '@/features/questions/validateQuestion'
import type { NewQuestionInput, Question } from '@/types/question'
import { cn } from '@/utils/cn'

interface QuestionFormProps {
  /** Used to detect duplicates. */
  existing: readonly Question[]
  onSubmit: (input: NewQuestionInput) => void
  onCancel: () => void
}

export function QuestionForm({ existing, onSubmit, onCancel }: QuestionFormProps) {
  const uid = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const [draft, setDraft] = useState<QuestionDraft>(EMPTY_DRAFT)
  const [submitted, setSubmitted] = useState(false)

  // Errors are derived, not stored: once the user has tried to submit,
  // every keystroke re-validates, so messages disappear as soon as they're fixed.
  const result = validateQuestionDraft(draft, existing)
  const errors = submitted && !result.ok ? result.errors : {}

  const update = <K extends keyof QuestionDraft>(key: K, value: QuestionDraft[K]) => setDraft((d) => ({ ...d, [key]: value }))

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (result.ok) {
      onSubmit(result.value)
      return
    }
    setSubmitted(true)
    // Move focus to the first invalid field once the error state has rendered.
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus())
  }

  const id = (name: string) => `${uid}-${name}`

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4">
      <FormField htmlFor={id('question')} label="Question" error={errors.question} hint="Be specific enough to recognise it later.">
        <Textarea
          id={id('question')}
          value={draft.question}
          onChange={(e) => update('question', e.target.value)}
          invalid={!!errors.question}
          aria-describedby={describedBy(id('question'), true)}
          placeholder="e.g. Explain how a hash map handles collisions"
          data-autofocus
        />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-3">
        <ChoiceField
          id={id('category')}
          label="Category"
          placeholder="Select"
          options={CATEGORIES}
          value={draft.category}
          error={errors.category}
          onChange={(v) => update('category', v)}
        />
        <ChoiceField
          id={id('difficulty')}
          label="Difficulty"
          placeholder="Select"
          options={DIFFICULTIES}
          value={draft.difficulty}
          error={errors.difficulty}
          onChange={(v) => update('difficulty', v)}
        />
        <ChoiceField
          id={id('status')}
          label="Status"
          placeholder="Select"
          options={STATUSES}
          value={draft.status}
          error={errors.status}
          onChange={(v) => update('status', v)}
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary">
          Add question
        </Button>
      </div>
    </form>
  )
}

interface ChoiceFieldProps<T extends string> {
  id: string
  label: string
  placeholder: string
  options: readonly T[]
  value: T | ''
  error?: string
  onChange: (value: T) => void
}

function ChoiceField<T extends string>({ id, label, placeholder, options, value, error, onChange }: ChoiceFieldProps<T>) {
  return (
    <FormField htmlFor={id} label={label} error={error}>
      <Select
        id={id}
        value={value}
        invalid={!!error}
        aria-describedby={describedBy(id, !!error)}
        className={cn(value === '' && 'text-faint', '[&>option]:text-ink')}
        onChange={(e) => {
          const picked = options.find((o) => o === e.target.value)
          if (picked) onChange(picked)
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </Select>
    </FormField>
  )
}
