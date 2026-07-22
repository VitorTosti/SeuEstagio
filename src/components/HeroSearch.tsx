import { Bookmark, MapPin, Search, Sparkles } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import type { JobCriteria } from '../features/jobs/filterJobs'
import type { Internship } from '../features/jobs/types'

type HeroSearchProps = {
  suggestedJobs: Internship[]
  onSearch: (criteria: JobCriteria) => void
}

const popularSearches = ['Engenharia de Software', 'Marketing', 'Administração']

export function HeroSearch({ suggestedJobs, onSearch }: HeroSearchProps) {
  const [query, setQuery] = useState('')
  const [city, setCity] = useState('')

  const submit = (event: FormEvent) => {
    event.preventDefault()
    onSearch({ query, city })
  }

  const runPopularSearch = (value: string) => {
    setQuery(value)
    onSearch({ query: value, city })
  }

  return (
    <section className="hero" id="inicio">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow"><Sparkles aria-hidden="true" size={16} /> Oportunidades para universitários</span>
          <h1>Seu estágio começa aqui.</h1>
          <p className="hero-lead">
            Encontre oportunidades alinhadas ao seu curso, à sua cidade e aos
            seus objetivos, sem perder tempo com vagas que não combinam com você.
          </p>
          <form className="search-bar" onSubmit={submit}>
            <label className="search-field">
              <span className="sr-only">Curso ou cargo</span>
              <Search aria-hidden="true" size={21} />
              <input
                aria-label="Curso ou cargo"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Curso ou cargo"
                value={query}
              />
            </label>
            <label className="search-field">
              <span className="sr-only">Cidade</span>
              <MapPin aria-hidden="true" size={21} />
              <input
                aria-label="Cidade"
                onChange={(event) => setCity(event.target.value)}
                placeholder="Cidade"
                value={city}
              />
            </label>
            <button className="button button-primary search-submit" type="submit">Encontrar vagas</button>
          </form>
          <div className="popular-row" aria-label="Buscas populares">
            <span>Populares:</span>
            {popularSearches.map((item) => (
              <button key={item} onClick={() => runPopularSearch(item)} type="button">{item}</button>
            ))}
          </div>
        </div>
        <div aria-label="Prévia de vagas sugeridas" className="product-preview">
          <div className="preview-header">
            <div>
              <span className="preview-kicker">Vagas sugeridas</span>
              <strong>Boas opções para começar</strong>
            </div>
            <span className="filter-badge">Filtros (2)</span>
          </div>
          <div className="preview-list">
            {suggestedJobs.map((job, index) => (
              <div className={index === 1 ? 'preview-job preview-job-active' : 'preview-job'} key={job.id}>
                <span className={`company-logo logo-${job.logoTone}`}>{job.logo}</span>
                <div className="preview-job-copy">
                  <strong>{job.role}</strong>
                  <span>{job.company} · {job.city}</span>
                  <div className="job-meta"><span>{job.modality}</span><span>{job.pay}</span></div>
                </div>
                <Bookmark aria-hidden="true" className="preview-bookmark" size={18} />
              </div>
            ))}
          </div>
          <div className="quick-apply"><Sparkles aria-hidden="true" size={18} /><span>Candidatura rápida</span></div>
        </div>
      </div>
    </section>
  )
}
