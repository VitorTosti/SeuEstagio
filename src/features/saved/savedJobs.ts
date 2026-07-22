const STORAGE_KEY = 'seuestagio:saved-jobs'

export type StorageLike = {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
}

export function readSavedIds(storage: StorageLike): string[] {
  try {
    const stored = storage.getItem(STORAGE_KEY)
    if (!stored) return []

    const parsed: unknown = JSON.parse(stored)
    if (!Array.isArray(parsed)) return []

    return parsed.filter((item): item is string => typeof item === 'string')
  } catch {
    return []
  }
}

export function writeSavedIds(storage: StorageLike, ids: string[]) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify([...new Set(ids)]))
  } catch {
    // State remains available for the current session when storage is blocked.
  }
}
