import { ArrowRight, SearchX } from 'lucide-react'
import type { Internship } from '../features/jobs/types'
import { JobCard } from './JobCard'

type FeaturedJobsProps = {
  jobs: Internship[]
  savedIds: string[]
  onToggleSaved: (id: string) => void
  onApply: () => void
  onReset: () => void
}

export function FeaturedJobs({ jobs, savedIds, onToggleSaved, onApply, onReset }: FeaturedJobsProps) {
  return (
    <section className="section jobs-section" id="vagas">
      <div className="container">
        <div className="section-heading section-heading-row">
          <div><span className="eyebrow">Seleção da semana</span><h2>Vagas em destaque</h2><p>Oportunidades para colocar seu conhecimento em prática.</p></div>
          <a className="text-link" href="#vagas">Ver todas as vagas <ArrowRight aria-hidden="true" size={18} /></a>
        </div>
        {jobs.length > 0 ? (
          <div className="jobs-grid">
            {jobs.map((job) => (
              <JobCard job={job} key={job.id} onApply={onApply} onToggleSaved={onToggleSaved} saved={savedIds.includes(job.id)} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <SearchX aria-hidden="true" size={30} />
            <h3>Nenhuma vaga encontrada</h3>
            <p>Tente outro curso, cargo ou cidade para ampliar seus resultados.</p>
            <button className="button button-secondary" onClick={onReset} type="button">Limpar busca</button>
          </div>
        )}
      </div>
    </section>
  )
}
