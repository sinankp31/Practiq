import { describe, expect, it } from 'vitest'
import { makeQuestion } from '@/test-utils'
import { selectStats } from './selectStats'

describe('selectStats', () => {
  it('handles an empty tracker without dividing by zero', () => {
    const s = selectStats([])
    expect(s.total).toBe(0)
    expect(s.percentComplete).toBe(0)
    expect(s.dsa).toEqual({ total: 0, completed: 0 })
  })

  it('counts statuses and splits DSA from interview questions', () => {
    const s = selectStats([
      makeQuestion({ id: '1', category: 'DSA', status: 'Completed' }),
      makeQuestion({ id: '2', category: 'DSA', status: 'In Progress' }),
      makeQuestion({ id: '3', category: 'Git', status: 'Completed' }),
      makeQuestion({ id: '4', category: 'Technical', status: 'Completed' }),
      makeQuestion({ id: '5', category: 'Technical', status: 'Pending' }),
    ])
    expect(s).toMatchObject({ total: 5, completed: 3, inProgress: 1, pending: 1 })
    expect(s.dsa).toEqual({ total: 2, completed: 1 })
    expect(s.interview).toEqual({ total: 3, completed: 2 })
    expect(s.percentComplete).toBe(60)
  })

  it('rounds the percentage to a whole number', () => {
    const qs = [
      makeQuestion({ id: '1', status: 'Completed' }),
      makeQuestion({ id: '2' }),
      makeQuestion({ id: '3' }),
    ]
    expect(selectStats(qs).percentComplete).toBe(33)
  })

  it('reaches 100% when everything is completed', () => {
    expect(selectStats([makeQuestion({ status: 'Completed' })]).percentComplete).toBe(100)
  })
})
