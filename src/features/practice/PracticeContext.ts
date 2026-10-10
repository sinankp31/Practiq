import { createContext } from 'react'
import type { NewQuestionInput, Question, Status } from '@/types/question'

export interface PracticeContextValue {
  questions: Question[]
  isLoading: boolean
  /** True when the last save failed (storage full or blocked). Data is still usable in memory. */
  persistenceError: boolean
  addQuestion: (input: NewQuestionInput) => void
  updateStatus: (id: string, status: Status) => void
  deleteQuestion: (id: string) => void
  /** Fill an empty tracker with demo questions. */
  loadSamples: () => void
}

export const PracticeContext = createContext<PracticeContextValue | null>(null)
