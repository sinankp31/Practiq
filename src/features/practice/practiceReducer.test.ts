import { describe, expect, it } from 'vitest'
import { makeQuestion } from '@/test-utils'
import { practiceReducer, type PracticeState } from './practiceReducer'

const base: PracticeState = { questions: [makeQuestion({ id: 'a' }), makeQuestion({ id: 'b' })], machineCoding: 'Not Started', loadState: 'ready' }

describe('practiceReducer', () => {
  it('adds new questions to the top', () => {
    const next = practiceReducer(base, { type: 'add', question: makeQuestion({ id: 'new' }) })
    expect(next.questions.map((q) => q.id)).toEqual(['new', 'a', 'b'])
  })

  it('updates status and updatedAt, leaving other questions untouched', () => {
    const next = practiceReducer(base, { type: 'updateStatus', id: 'a', status: 'Completed', updatedAt: '2026-02-02T00:00:00.000Z' })
    expect(next.questions[0]).toMatchObject({ status: 'Completed', updatedAt: '2026-02-02T00:00:00.000Z' })
    expect(next.questions[1]).toBe(base.questions[1])
  })

  it('returns the same state object for a no-op status change', () => {
    expect(practiceReducer(base, { type: 'updateStatus', id: 'a', status: 'Pending', updatedAt: 'x' })).toBe(base)
    expect(practiceReducer(base, { type: 'updateStatus', id: 'missing', status: 'Completed', updatedAt: 'x' })).toBe(base)
  })

  it('deletes by id', () => {
    expect(practiceReducer(base, { type: 'delete', id: 'a' }).questions.map((q) => q.id)).toEqual(['b'])
  })

  it('only loads samples into an empty tracker', () => {
    const samples = [makeQuestion({ id: 's' })]
    expect(practiceReducer(base, { type: 'loadSamples', questions: samples })).toBe(base)
    const empty = { ...base, questions: [] }
    expect(practiceReducer(empty, { type: 'loadSamples', questions: samples }).questions).toBe(samples)
  })

  it('sets machine coding status', () => {
    expect(practiceReducer(base, { type: 'setMachineCoding', status: 'Practiced' }).machineCoding).toBe('Practiced')
  })

  it('hydrates and becomes ready', () => {
    const loading: PracticeState = { questions: [], machineCoding: 'Not Started', loadState: 'loading' }
    const next = practiceReducer(loading, { type: 'hydrate', questions: base.questions, machineCoding: 'Completed' })
    expect(next).toMatchObject({ loadState: 'ready', machineCoding: 'Completed' })
  })
})
