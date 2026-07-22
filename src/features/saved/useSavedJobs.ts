import { useState } from 'react'
import { readSavedIds, writeSavedIds } from './savedJobs'

function initialSavedIds() {
  if (typeof window === 'undefined') return []
  return readSavedIds(window.localStorage)
}

export function useSavedJobs() {
  const [savedIds, setSavedIds] = useState<string[]>(initialSavedIds)

  const toggleSaved = (id: string) => {
    setSavedIds((current) => {
      const next = current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id]

      if (typeof window !== 'undefined') {
        writeSavedIds(window.localStorage, next)
      }

      return next
    })
  }

  return { savedIds, toggleSaved }
}
