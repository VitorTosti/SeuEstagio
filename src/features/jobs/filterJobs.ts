import type { Internship } from './types'

export type JobCriteria = {
  query: string
  city: string
}

const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .trim()

export function filterJobs(jobs: Internship[], criteria: JobCriteria) {
  const query = normalize(criteria.query)
  const city = normalize(criteria.city)

  return jobs.filter((job) => {
    const searchable = normalize(
      [job.role, job.company, ...job.tags].join(' '),
    )

    return (
      (!query || searchable.includes(query)) &&
      (!city || normalize(job.city).includes(city))
    )
  })
}
