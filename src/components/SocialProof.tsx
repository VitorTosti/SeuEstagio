import { Quote } from 'lucide-react'

const metrics = [
  ['15 mil+', 'estudantes conectados'],
  ['2.400', 'empresas parceiras'],
  ['R$ 2,1 mil', 'média de bolsa'],
  ['94%', 'avaliações positivas'],
]

export function SocialProof() {
  return (
    <section className="section proof-section">
      <div className="container proof-grid">
        <div className="testimonial-image-wrap">
          <img alt="Mariana, estudante de engenharia e estagiária" className="testimonial-image" src="./student-portrait.webp" />
          <span className="testimonial-caption"><strong>Mariana Silva</strong>Engenharia · Estagiária na VTEX</span>
        </div>
        <blockquote>
          <Quote aria-hidden="true" className="quote-icon" size={38} />
          <p>“Encontrei minha primeira experiência em tecnologia em duas semanas. As informações claras sobre bolsa e rotina fizeram toda a diferença.”</p>
          <footer>Mariana Silva, estudante de Engenharia</footer>
        </blockquote>
      </div>
      <div className="container metrics-grid">
        {metrics.map(([value, label]) => <div className="metric" key={label}><strong>{value}</strong><span>{label}</span></div>)}
      </div>
    </section>
  )
}
