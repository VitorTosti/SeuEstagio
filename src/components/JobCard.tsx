import { Bookmark, Building2, Check, MapPin } from 'lucide-react'
import type { Internship } from '../features/jobs/types'

type JobCardProps = {
  job: Internship
  saved: boolean
  onToggleSaved: (id: string) => void
  onApply: () => void
}

export function JobCard({ job, saved, onToggleSaved, onApply }: JobCardProps) {
  const saveLabel = saved
    ? `Remover ${job.role} dos favoritos`
    : `Salvar ${job.role}`

  return (
    <article aria-label={`${job.role} na ${job.company}`} className="job-card">
      <div className="job-card-top">
        <span className={`company-logo logo-${job.logoTone}`}>{job.logo}</span>
        <button
          aria-label={saveLabel}
          className={saved ? 'icon-button save-button saved' : 'icon-button save-button'}
          onClick={() => onToggleSaved(job.id)}
          title={saveLabel}
          type="button"
        >
          <Bookmark aria-hidden="true" fill={saved ? 'currentColor' : 'none'} size={20} />
        </button>
      </div>
      <div className="job-card-copy">
        <h3>{job.role}</h3>
        <p className="company-line"><Building2 aria-hidden="true" size={16} /> {job.company}</p>
        <p className="location-line"><MapPin aria-hidden="true" size={16} /> {job.city}</p>
      </div>
      <div className="job-meta job-meta-large"><span>{job.modality}</span><span>{job.pay}</span></div>
      <ul className="benefit-list">
        {job.benefits.map((benefit) => <li key={benefit}><Check aria-hidden="true" size={14} />{benefit}</li>)}
      </ul>
      <button className="button button-secondary apply-button" onClick={onApply} type="button">Candidatura rápida</button>
    </article>
  )
}
