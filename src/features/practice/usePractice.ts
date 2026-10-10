import { useContext } from 'react'
import { PracticeContext, type PracticeContextValue } from './PracticeContext'

export function usePractice(): PracticeContextValue {
  const value = useContext(PracticeContext)
  if (!value) throw new Error('usePractice must be used inside <PracticeProvider>')
  return value
}
