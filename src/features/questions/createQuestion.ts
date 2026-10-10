import type { NewQuestionInput, Question } from '@/types/question'
import { createId } from '@/utils/id'

/** Collapse runs of whitespace so "  Binary   search " is stored as "Binary search". */
export const normalizeQuestionText = (text: string) => text.trim().replace(/\s+/g, ' ')

export function createQuestion(input: NewQuestionInput, now: Date = new Date()): Question {
  const timestamp = now.toISOString()
  return {
    id: createId(),
    ...input,
    question: normalizeQuestionText(input.question),
    createdAt: timestamp,
    updatedAt: timestamp,
  }
}
