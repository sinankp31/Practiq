import { createContext } from 'react'
import type { NewQuestionInput, Question, Status } from '@/types/question'

export interface PracticeContextValue {
  questions: Question[]
  addQuestion: (input: NewQuestionInput) => void
  updateStatus: (id: string, status: Status) => void
  deleteQuestion: (id: string) => void
}

export const PracticeContext = createContext<PracticeContextValue | null>(null)
