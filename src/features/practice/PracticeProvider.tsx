import { useMemo, useReducer, type ReactNode } from 'react'
import { createSampleQuestions } from '@/constants/sampleQuestions'
import { createQuestion } from '@/features/questions/createQuestion'
import type { NewQuestionInput, Status } from '@/types/question'
import { PracticeContext, type PracticeContextValue } from './PracticeContext'
import { practiceReducer, type PracticeState } from './practiceReducer'

// Development default: start with sample data. Replaced by persisted state later.
const createInitialState = (): PracticeState => ({ questions: createSampleQuestions() })

export function PracticeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(practiceReducer, undefined, createInitialState)

  // dispatch is stable, so these callbacks keep one identity for the app's lifetime.
  const actions = useMemo(
    () => ({
      addQuestion: (input: NewQuestionInput) => dispatch({ type: 'add', question: createQuestion(input) }),
      updateStatus: (id: string, status: Status) =>
        dispatch({ type: 'updateStatus', id, status, updatedAt: new Date().toISOString() }),
      deleteQuestion: (id: string) => dispatch({ type: 'delete', id }),
    }),
    [],
  )

  const value = useMemo<PracticeContextValue>(() => ({ questions: state.questions, ...actions }), [state.questions, actions])

  return <PracticeContext.Provider value={value}>{children}</PracticeContext.Provider>
}
