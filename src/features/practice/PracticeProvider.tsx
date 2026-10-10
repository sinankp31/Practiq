import { useEffect, useMemo, useReducer, useRef, useState, type ReactNode } from 'react'
import { createSampleQuestions } from '@/constants/sampleQuestions'
import { createQuestion } from '@/features/questions/createQuestion'
import { repository as defaultRepository } from '@/services'
import { DEFAULT_MACHINE_CODING, STORAGE_VERSION, type PracticeRepository } from '@/services/repository'
import type { MachineCodingStatus, NewQuestionInput, Status } from '@/types/question'
import { PracticeContext, type PracticeContextValue } from './PracticeContext'
import { practiceReducer, type PracticeState } from './practiceReducer'

const INITIAL_STATE: PracticeState = { questions: [], machineCoding: DEFAULT_MACHINE_CODING, loadState: 'loading' }

interface PracticeProviderProps {
  children: ReactNode
  /** Injectable so tests (or a future API) can replace localStorage. */
  repository?: PracticeRepository
}

export function PracticeProvider({ children, repository = defaultRepository }: PracticeProviderProps) {
  const [state, dispatch] = useReducer(practiceReducer, INITIAL_STATE)
  const [persistenceError, setPersistenceError] = useState(false)
  // Set right after loading: the state we just read from storage doesn't need writing back.
  const skipNextSave = useRef(false)

  // Load once on mount.
  useEffect(() => {
    let cancelled = false
    repository.load().then((persisted) => {
      if (cancelled) return
      skipNextSave.current = true
      dispatch({ type: 'hydrate', questions: persisted.questions, machineCoding: persisted.machineCoding })
    })
    return () => {
      cancelled = true
    }
  }, [repository])

  // Save whenever the data changes (but never before the first load finishes).
  useEffect(() => {
    if (state.loadState !== 'ready') return
    if (skipNextSave.current) {
      skipNextSave.current = false
      return
    }
    repository
      .save({ version: STORAGE_VERSION, questions: state.questions, machineCoding: state.machineCoding })
      .then(() => setPersistenceError(false))
      .catch(() => setPersistenceError(true))
  }, [state.loadState, state.questions, state.machineCoding, repository])

  // dispatch is stable, so these callbacks keep one identity for the app's lifetime.
  const actions = useMemo(
    () => ({
      addQuestion: (input: NewQuestionInput) => dispatch({ type: 'add', question: createQuestion(input) }),
      updateStatus: (id: string, status: Status) =>
        dispatch({ type: 'updateStatus', id, status, updatedAt: new Date().toISOString() }),
      deleteQuestion: (id: string) => dispatch({ type: 'delete', id }),
      loadSamples: () => dispatch({ type: 'loadSamples', questions: createSampleQuestions() }),
      setMachineCoding: (status: MachineCodingStatus) => dispatch({ type: 'setMachineCoding', status }),
    }),
    [],
  )

  const value = useMemo<PracticeContextValue>(
    () => ({
      questions: state.questions,
      machineCoding: state.machineCoding,
      isLoading: state.loadState === 'loading',
      persistenceError,
      ...actions,
    }),
    [state.questions, state.machineCoding, state.loadState, persistenceError, actions],
  )

  return <PracticeContext.Provider value={value}>{children}</PracticeContext.Provider>
}
