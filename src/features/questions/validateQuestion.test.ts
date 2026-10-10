import { describe, expect, it } from 'vitest'
import { makeQuestion } from '@/test-utils'
import { EMPTY_DRAFT, validateQuestionDraft, type QuestionDraft } from './validateQuestion'

const valid: QuestionDraft = { question: 'What is a closure?', category: 'Technical', difficulty: 'Medium', status: 'Pending' }

describe('validateQuestionDraft', () => {
  it('accepts a complete draft', () => {
    expect(validateQuestionDraft(valid, [])).toEqual({ ok: true, value: valid })
  })

  it('reports every missing field on an empty draft', () => {
    const r = validateQuestionDraft(EMPTY_DRAFT, [])
    expect(r.ok).toBe(false)
    if (!r.ok) expect(Object.keys(r.errors).sort()).toEqual(['category', 'difficulty', 'question', 'status'])
  })

  it.each([
    ['whitespace only', '    '],
    ['too short', 'abc'],
    ['symbols only', '?!?!?!'],
    ['too long', 'x'.repeat(201)],
  ])('rejects question text that is %s', (_label, text) => {
    const r = validateQuestionDraft({ ...valid, question: text }, [])
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.errors.question).toBeTruthy()
  })

  it('rejects duplicates regardless of case and spacing', () => {
    const existing = [makeQuestion({ question: 'Reverse a linked list' })]
    const r = validateQuestionDraft({ ...valid, question: '  reverse   A LINKED list ' }, existing)
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.errors.question).toMatch(/already/)
  })

  it('does not flag only the missing select when text is fine', () => {
    const r = validateQuestionDraft({ ...valid, difficulty: '' }, [])
    expect(r.ok).toBe(false)
    if (!r.ok) expect(Object.keys(r.errors)).toEqual(['difficulty'])
  })
})
