import { useState } from 'react'
import { AudienceBenefits } from './components/AudienceBenefits'
import { ClosingCta } from './components/ClosingCta'
import { Faq } from './components/Faq'
import { FeaturedJobs } from './components/FeaturedJobs'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { HeroSearch } from './components/HeroSearch'
import { HowItWorks } from './components/HowItWorks'
import { PrototypeDialog } from './components/PrototypeDialog'
import { SocialProof } from './components/SocialProof'
import { TrustStrip } from './components/TrustStrip'
import { filterJobs, type JobCriteria } from './features/jobs/filterJobs'
import { internships } from './features/jobs/jobs'
import { useSavedJobs } from './features/saved/useSavedJobs'

const featuredJobs = internships.filter((job) => job.featured)

export default function App() {
  const [criteria, setCriteria] = useState<JobCriteria>({ query: '', city: '' })
  const [searchKey, setSearchKey] = useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { savedIds, toggleSaved } = useSavedJobs()
  const visibleJobs = filterJobs(featuredJobs, criteria)

  const handleSearch = (nextCriteria: JobCriteria) => {
    setCriteria(nextCriteria)
    window.requestAnimationFrame(() => {
      document.getElementById('vagas')?.scrollIntoView?.({ behavior: 'smooth' })
    })
  }

  const resetSearch = () => {
    setCriteria({ query: '', city: '' })
    setSearchKey((current) => current + 1)
  }

  return (
    <>
      <Header onPrototypeAction={() => setDialogOpen(true)} />
      <main>
        <HeroSearch
          key={searchKey}
          onSearch={handleSearch}
          suggestedJobs={internships.slice(0, 2)}
        />
        <TrustStrip />
        <HowItWorks />
        <FeaturedJobs
          jobs={visibleJobs}
          onApply={() => setDialogOpen(true)}
          onReset={resetSearch}
          onToggleSaved={toggleSaved}
          savedIds={savedIds}
        />
        <AudienceBenefits onPrototypeAction={() => setDialogOpen(true)} />
        <SocialProof />
        <Faq />
        <ClosingCta onPrototypeAction={() => setDialogOpen(true)} />
      </main>
      <Footer />
      <PrototypeDialog
        onClose={() => setDialogOpen(false)}
        open={dialogOpen}
        title="Recurso em desenvolvimento"
      >
        <p>
          Esta ação fará parte da próxima fase do SeuEstagio. Nesta versão,
          você já pode explorar e salvar vagas.
        </p>
      </PrototypeDialog>
    </>
  )
}
