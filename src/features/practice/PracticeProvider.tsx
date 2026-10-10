import { useEffect, useMemo, useReducer, useRef, useState, type ReactNode } from 'react'
import { createSampleQuestions } from '@/constants/sampleQuestions'
import { createQuestion } from '@/features/questions/createQuestion'
import { repository as defaultRepository } from '@/services'
import { STORAGE_VERSION, type PracticeRepository } from '@/services/repository'
import type { NewQuestionInput, Question, Status } from '@/types/question'
import { PracticeContext, type PracticeContextValue } from './PracticeContext'
import { practiceReducer, type PracticeState } from './practiceReducer'

const INITIAL_STATE: PracticeState = { questions: [], loadState: 'loading' }

interface PracticeProviderProps {
  children: ReactNode
  /** Injectable so tests (or a future API) can replace localStorage. */
  repository?: PracticeRepository
}

export function PracticeProvider({ children, repository = defaultRepository }: PracticeProviderProps) {
  const [state, dispatch] = useReducer(practiceReducer, INITIAL_STATE)
  const [persistenceError, setPersistenceError] = useState(false)
  // The array we just loaded from storage: saving it straight back would be pointless.
  const hydratedQuestions = useRef<Question[] | null>(null)

  // Load once on mount.
  useEffect(() => {
    let cancelled = false
    repository.load().then((persisted) => {
      if (cancelled) return
      hydratedQuestions.current = persisted.questions
      dispatch({ type: 'hydrate', questions: persisted.questions })
    })
    return () => {
      cancelled = true
    }
  }, [repository])

  // Save whenever the data changes (but never before the first load finishes).
  useEffect(() => {
    if (state.loadState !== 'ready' || state.questions === hydratedQuestions.current) return
    repository
      .save({ version: STORAGE_VERSION, questions: state.questions })
      .then(() => setPersistenceError(false))
      .catch(() => setPersistenceError(true))
  }, [state.loadState, state.questions, repository])

  // dispatch is stable, so these callbacks keep one identity for the app's lifetime.
  const actions = useMemo(
    () => ({
      addQuestion: (input: NewQuestionInput) => dispatch({ type: 'add', question: createQuestion(input) }),
      updateStatus: (id: string, status: Status) =>
        dispatch({ type: 'updateStatus', id, status, updatedAt: new Date().toISOString() }),
      deleteQuestion: (id: string) => dispatch({ type: 'delete', id }),
      loadSamples: () => dispatch({ type: 'loadSamples', questions: createSampleQuestions() }),
    }),
    [],
  )

  const value = useMemo<PracticeContextValue>(
    () => ({ questions: state.questions, isLoading: state.loadState === 'loading', persistenceError, ...actions }),
    [state.questions, state.loadState, persistenceError, actions],
  )

  return <PracticeContext.Provider value={value}>{children}</PracticeContext.Provider>
}
