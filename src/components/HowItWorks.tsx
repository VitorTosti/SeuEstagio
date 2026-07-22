import { ArrowRight, FileSearch, Send, SlidersHorizontal } from 'lucide-react'

const steps = [
  { icon: SlidersHorizontal, number: '01', title: 'Descubra', text: 'Filtre oportunidades pelo seu curso, localização e formato de trabalho.' },
  { icon: FileSearch, number: '02', title: 'Compare', text: 'Analise bolsa, benefícios e rotina para escolher com mais segurança.' },
  { icon: Send, number: '03', title: 'Aplique', text: 'Organize suas vagas favoritas e avance para a candidatura com clareza.' },
]

export function HowItWorks() {
  return (
    <section className="section how-it-works" id="como-funciona">
      <div className="container">
        <div className="section-heading centered">
          <span className="eyebrow">Caminho simples</span>
          <h2>Da busca à primeira experiência</h2>
          <p>Três passos para encontrar uma vaga que faça sentido para o seu momento.</p>
        </div>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <article className="step" key={step.title}>
              <span className="step-number">{step.number}</span>
              <span className="step-icon"><step.icon aria-hidden="true" size={23} /></span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              {index < steps.length - 1 && <ArrowRight aria-hidden="true" className="step-arrow" />}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
