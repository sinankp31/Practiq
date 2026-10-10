import { QUESTION_MAX_LENGTH, QUESTION_MIN_LENGTH } from '@/constants/questions'
import { isCategory, isDifficulty, isStatus } from '@/types/guards'
import type { Category, Difficulty, NewQuestionInput, Question, Status } from '@/types/question'
import { normalizeQuestionText } from './createQuestion'

/** Form state: selects start empty ('') so a missing choice is a validation error, not a silent default. */
export interface QuestionDraft {
  question: string
  category: Category | ''
  difficulty: Difficulty | ''
  status: Status | ''
}

export const EMPTY_DRAFT: QuestionDraft = { question: '', category: '', difficulty: '', status: '' }

export type QuestionDraftErrors = Partial<Record<keyof QuestionDraft, string>>

export type ValidationResult =
  | { ok: true; value: NewQuestionInput }
  | { ok: false; errors: QuestionDraftErrors }

const comparable = (text: string) => normalizeQuestionText(text).toLowerCase()

function validateQuestionText(raw: string, existing: readonly Question[]): string | undefined {
  const text = normalizeQuestionText(raw)
  if (text === '') return 'Enter a question.'
  if (text.length < QUESTION_MIN_LENGTH) return `Write at least ${QUESTION_MIN_LENGTH} characters so the question is clear later.`
  if (text.length > QUESTION_MAX_LENGTH) return `Keep it under ${QUESTION_MAX_LENGTH} characters (currently ${text.length}).`
  if (!/[\p{L}\p{N}]/u.test(text)) return 'Use words or numbers, not only symbols.'
  if (existing.some((q) => comparable(q.question) === comparable(text))) return 'This question is already in your tracker.'
  return undefined
}

/** Pure: returns either a ready-to-save value (properly typed) or a message per invalid field. */
export function validateQuestionDraft(draft: QuestionDraft, existing: readonly Question[]): ValidationResult {
  const errors: QuestionDraftErrors = {}

  const textError = validateQuestionText(draft.question, existing)
  if (textError) errors.question = textError
  if (!isCategory(draft.category)) errors.category = 'Select a category.'
  if (!isDifficulty(draft.difficulty)) errors.difficulty = 'Select a difficulty.'
  if (!isStatus(draft.status)) errors.status = 'Select a status.'

  if (Object.keys(errors).length > 0) return { ok: false, errors }
  // Re-check so TypeScript narrows the types without any casts.
  if (isCategory(draft.category) && isDifficulty(draft.difficulty) && isStatus(draft.status)) {
    return {
      ok: true,
      value: { question: draft.question, category: draft.category, difficulty: draft.difficulty, status: draft.status },
    }
  }
  return { ok: false, errors }
}
