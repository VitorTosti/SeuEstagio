import { BellRing, CheckCircle2, GraduationCap, ScanSearch, UsersRound } from 'lucide-react'

type AudienceBenefitsProps = { onPrototypeAction: () => void }

export function AudienceBenefits({ onPrototypeAction }: AudienceBenefitsProps) {
  return (
    <section className="audience-section" id="empresas">
      <div className="container audience-grid">
        <article className="audience-panel student-panel">
          <span className="audience-label"><GraduationCap aria-hidden="true" size={18} /> Para estudantes</span>
          <h2>Dê o primeiro passo na sua carreira</h2>
          <p>Vagas relevantes e informações claras para você decidir com confiança.</p>
          <ul className="feature-list">
            <li><ScanSearch aria-hidden="true" /><span><strong>Filtros por curso</strong>Veja primeiro o que combina com a sua formação.</span></li>
            <li><BellRing aria-hidden="true" /><span><strong>Alertas personalizados</strong>Acompanhe novas oportunidades no seu ritmo.</span></li>
          </ul>
          <button className="button button-primary" onClick={onPrototypeAction} type="button">Criar meu perfil</button>
        </article>
        <article className="audience-panel company-panel">
          <span className="audience-label"><UsersRound aria-hidden="true" size={18} /> Para empresas</span>
          <h2>Encontre talentos que querem crescer</h2>
          <p>Apresente sua cultura e aproxime a oportunidade dos estudantes certos.</p>
          <ul className="feature-list">
            <li><CheckCircle2 aria-hidden="true" /><span><strong>Triagem objetiva</strong>Requisitos claros desde o primeiro contato.</span></li>
            <li><UsersRound aria-hidden="true" /><span><strong>Marca empregadora</strong>Mostre como é começar uma carreira na sua equipe.</span></li>
          </ul>
          <button className="button button-dark" onClick={onPrototypeAction} type="button">Publicar uma vaga</button>
        </article>
      </div>
    </section>
  )
}
