import { describe, expect, it } from 'vitest'
import { makeQuestion } from '@/test-utils'
import { CORRUPT_BACKUP_KEY, createLocalStorageRepository, STORAGE_KEY } from './localStorageRepository'
import { parsePersistedState } from './parsePersistedState'

/** Minimal in-memory Storage. */
function fakeStorage(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial))
  return {
    data,
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
  }
}

describe('localStorageRepository', () => {
  it('returns defaults on first visit', async () => {
    const repo = createLocalStorageRepository(fakeStorage())
    expect(await repo.load()).toEqual({ version: 1, questions: [], machineCoding: 'Not Started' })
  })

  it('round-trips saved state', async () => {
    const storage = fakeStorage()
    const repo = createLocalStorageRepository(storage)
    const state = { version: 1 as const, questions: [makeQuestion()], machineCoding: 'Practiced' as const }
    await repo.save(state)
    expect(await createLocalStorageRepository(storage).load()).toEqual(state)
  })

  it('falls back to defaults on malformed JSON and keeps a backup of the raw text', async () => {
    const storage = fakeStorage({ [STORAGE_KEY]: '{oops' })
    const state = await createLocalStorageRepository(storage).load()
    expect(state.questions).toEqual([])
    expect(storage.data.get(CORRUPT_BACKUP_KEY)).toBe('{oops')
  })

  it('does not throw when storage itself is unavailable', async () => {
    const broken = { getItem: () => { throw new Error('blocked') }, setItem: () => { throw new Error('blocked') } }
    const repo = createLocalStorageRepository(broken)
    expect((await repo.load()).questions).toEqual([])
    await expect(repo.save({ version: 1, questions: [], machineCoding: 'Not Started' })).rejects.toThrow()
  })
})

describe('parsePersistedState', () => {
  it('drops malformed and duplicate questions but keeps valid ones', () => {
    const good = makeQuestion({ id: 'g' })
    const parsed = parsePersistedState({ version: 1, questions: [good, { id: 'bad' }, good, { ...good, id: 'x', status: 'Done' }] })
    expect(parsed?.questions).toEqual([good])
  })

  it('migrates the legacy bare-array format', () => {
    expect(parsePersistedState([makeQuestion()])?.questions).toHaveLength(1)
  })

  it('defaults machineCoding when missing or invalid', () => {
    expect(parsePersistedState({ version: 1, questions: [] })?.machineCoding).toBe('Not Started')
    expect(parsePersistedState({ version: 1, questions: [], machineCoding: 'Wizard' })?.machineCoding).toBe('Not Started')
  })

  it.each([[null], ['text'], [42], [{ version: 2, questions: [] }], [{ version: 1, questions: 'nope' }]])('rejects %j', (input) => {
    expect(parsePersistedState(input)).toBeNull()
  })
})
