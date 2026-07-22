import { describe, expect, test } from 'vitest'
import { filterJobs } from './filterJobs'
import type { Internship } from './types'

const jobs: Internship[] = [
  {
    id: 'design',
    role: 'Estágio em Design',
    company: 'Acme',
    city: 'São Paulo',
    modality: 'Híbrido',
    pay: 'R$ 2.000/mês',
    tags: ['UX'],
    benefits: [],
    featured: true,
    logo: 'A',
    logoTone: 'teal',
  },
  {
    id: 'dados',
    role: 'Analista de Dados Júnior',
    company: 'Beta',
    city: 'Belo Horizonte',
    modality: 'Remoto',
    pay: 'R$ 2.400/mês',
    tags: ['Tecnologia'],
    benefits: [],
    featured: true,
    logo: 'B',
    logoTone: 'blue',
  },
]

describe('filterJobs', () => {
  test('returns every job when criteria are empty', () => {
    expect(filterJobs(jobs, { query: '', city: '' })).toEqual(jobs)
  })

  test('matches text without accents or letter case', () => {
    expect(
      filterJobs(jobs, { query: 'ESTAGIO', city: 'sao paulo' }),
    ).toEqual([jobs[0]])
  })

  test('combines role or tag query with city', () => {
    expect(
      filterJobs(jobs, { query: 'tecnologia', city: 'belo' }),
    ).toEqual([jobs[1]])
  })
})
