import { describe, expect, it } from 'vitest'
import { makeQuestion } from '@/test-utils'
import { DEFAULT_FILTERS, filterQuestions, hasActiveFilters } from './filterQuestions'

const questions = [
  makeQuestion({ id: '1', question: 'Binary search in a rotated array', category: 'DSA', difficulty: 'Medium', status: 'In Progress' }),
  makeQuestion({ id: '2', question: 'Binary tree traversal', category: 'DSA', difficulty: 'Easy', status: 'Completed' }),
  makeQuestion({ id: '3', question: 'Explain React keys', category: 'Technical', difficulty: 'Medium', status: 'Pending' }),
  makeQuestion({ id: '4', question: 'git rebase vs merge', category: 'Git', difficulty: 'Medium', status: 'Pending' }),
]
const ids = (qs: ReturnType<typeof filterQuestions>) => qs.map((q) => q.id)

describe('filterQuestions', () => {
  it('returns everything with default filters', () => {
    expect(ids(filterQuestions(questions, DEFAULT_FILTERS))).toEqual(['1', '2', '3', '4'])
  })

  it('searches case-insensitively', () => {
    expect(ids(filterQuestions(questions, { ...DEFAULT_FILTERS, search: 'BINARY' }))).toEqual(['1', '2'])
  })

  it('requires every search word to match, in any order', () => {
    expect(ids(filterQuestions(questions, { ...DEFAULT_FILTERS, search: 'rotated binary' }))).toEqual(['1'])
  })

  it('ignores surrounding whitespace in the search', () => {
    expect(ids(filterQuestions(questions, { ...DEFAULT_FILTERS, search: '   react   ' }))).toEqual(['3'])
  })

  it('filters by each dropdown', () => {
    expect(ids(filterQuestions(questions, { ...DEFAULT_FILTERS, category: 'Git' }))).toEqual(['4'])
    expect(ids(filterQuestions(questions, { ...DEFAULT_FILTERS, difficulty: 'Easy' }))).toEqual(['2'])
    expect(ids(filterQuestions(questions, { ...DEFAULT_FILTERS, status: 'Pending' }))).toEqual(['3', '4'])
  })

  it('combines search and all filters with AND (the spec example)', () => {
    const result = filterQuestions(questions, { search: 'Binary', category: 'DSA', difficulty: 'Medium', status: 'In Progress' })
    expect(ids(result)).toEqual(['1'])
  })

  it('returns an empty list when nothing matches', () => {
    expect(filterQuestions(questions, { ...DEFAULT_FILTERS, search: 'zzz' })).toEqual([])
  })
})

describe('hasActiveFilters', () => {
  it('is false for defaults and whitespace-only search', () => {
    expect(hasActiveFilters(DEFAULT_FILTERS)).toBe(false)
    expect(hasActiveFilters({ ...DEFAULT_FILTERS, search: '  ' })).toBe(false)
  })
  it('is true when anything narrows the list', () => {
    expect(hasActiveFilters({ ...DEFAULT_FILTERS, status: 'Completed' })).toBe(true)
    expect(hasActiveFilters({ ...DEFAULT_FILTERS, search: 'a' })).toBe(true)
  })
})
