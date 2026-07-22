import { expect, test } from 'vitest'
import { readSavedIds, writeSavedIds } from './savedJobs'

test('reads only string ids from stored JSON', () => {
  const storage = {
    getItem: () => '["job-1",42,"job-2"]',
    setItem: () => undefined,
  }

  expect(readSavedIds(storage)).toEqual(['job-1', 'job-2'])
})

test('falls back to an empty collection for invalid storage', () => {
  const storage = {
    getItem: () => '{broken',
    setItem: () => undefined,
  }

  expect(readSavedIds(storage)).toEqual([])
})

test('writes unique saved ids', () => {
  let value = ''
  const storage = {
    getItem: () => value,
    setItem: (_key: string, next: string) => {
      value = next
    },
  }

  writeSavedIds(storage, ['job-1', 'job-1', 'job-2'])

  expect(value).toBe('["job-1","job-2"]')
})

test('does not throw when storage access fails', () => {
  const storage = {
    getItem: () => {
      throw new Error('blocked')
    },
    setItem: () => {
      throw new Error('blocked')
    },
  }

  expect(readSavedIds(storage)).toEqual([])
  expect(() => writeSavedIds(storage, ['job-1'])).not.toThrow()
})
