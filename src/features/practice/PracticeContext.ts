import { createContext } from 'react'
import type { MachineCodingStatus, NewQuestionInput, Question, Status } from '@/types/question'

export interface PracticeContextValue {
  questions: Question[]
  machineCoding: MachineCodingStatus
  isLoading: boolean
  /** True when the last save failed (storage full or blocked). Data is still usable in memory. */
  persistenceError: boolean
  addQuestion: (input: NewQuestionInput) => void
  updateStatus: (id: string, status: Status) => void
  deleteQuestion: (id: string) => void
  /** Fill an empty tracker with demo questions. */
  loadSamples: () => void
  setMachineCoding: (status: MachineCodingStatus) => void
}

export const PracticeContext = createContext<PracticeContextValue | null>(null)
