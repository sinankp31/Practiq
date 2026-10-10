import type { Question } from '@/types/question'

/** Test factory: a valid question with sensible defaults. */
export function makeQuestion(overrides: Partial<Question> = {}): Question {
  return {
    id: 'q1',
    question: 'Reverse a linked list',
    category: 'DSA',
    difficulty: 'Easy',
    status: 'Pending',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  }
}
