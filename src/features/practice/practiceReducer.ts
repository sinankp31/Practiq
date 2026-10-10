import type { MachineCodingStatus, Question, Status } from '@/types/question'

export interface PracticeState {
  questions: Question[]
  machineCoding: MachineCodingStatus
  /** 'loading' until the repository has answered, so the UI never flashes a false empty state. */
  loadState: 'loading' | 'ready'
}

export type PracticeAction =
  | { type: 'hydrate'; questions: Question[]; machineCoding: MachineCodingStatus }
  | { type: 'add'; question: Question }
  | { type: 'updateStatus'; id: string; status: Status; updatedAt: string }
  | { type: 'delete'; id: string }
  | { type: 'loadSamples'; questions: Question[] }
  | { type: 'setMachineCoding'; status: MachineCodingStatus }

/**
 * Pure reducer: no ids, dates or storage in here. Anything non-deterministic
 * is created by the caller and passed in the action, which keeps this trivially testable.
 */
export function practiceReducer(state: PracticeState, action: PracticeAction): PracticeState {
  switch (action.type) {
    case 'hydrate':
      return { questions: action.questions, machineCoding: action.machineCoding, loadState: 'ready' }

    case 'add':
      return { ...state, questions: [action.question, ...state.questions] }

    case 'updateStatus': {
      const target = state.questions.find((q) => q.id === action.id)
      // Unknown id or no-op change: return the same state so React skips the re-render.
      if (!target || target.status === action.status) return state
      return {
        ...state,
        questions: state.questions.map((q) =>
          q.id === action.id ? { ...q, status: action.status, updatedAt: action.updatedAt } : q,
        ),
      }
    }

    case 'delete':
      return { ...state, questions: state.questions.filter((q) => q.id !== action.id) }

    case 'loadSamples':
      // Only ever fills an empty tracker; it must never overwrite real data.
      return state.questions.length === 0 ? { ...state, questions: action.questions } : state

    case 'setMachineCoding':
      return state.machineCoding === action.status ? state : { ...state, machineCoding: action.status }
  }
}
