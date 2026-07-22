import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const items = [
  { question: 'É gratuito para estudantes?', answer: 'Sim. A busca, os filtros e o acompanhamento de vagas são gratuitos para estudantes.' },
  { question: 'Como funciona a validação do estágio?', answer: 'Nós fornecemos todos os documentos necessários conforme a Lei do Estágio, facilitando a assinatura entre você, a empresa e sua faculdade.' },
  { question: 'Posso me candidatar no primeiro semestre?', answer: 'Sim, desde que a vaga aceite estudantes do seu período e esteja alinhada às regras da sua instituição.' },
]

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return (
    <section className="section faq-section" id="faq">
      <div className="container faq-layout">
        <div className="section-heading"><span className="eyebrow">Perguntas frequentes</span><h2>Antes de começar</h2><p>Respostas rápidas para você seguir com segurança.</p></div>
        <div className="faq-list">
          {items.map((item, index) => {
            const open = openIndex === index
            return (
              <div className="faq-item" key={item.question}>
                <button aria-controls={`faq-answer-${index}`} aria-expanded={open} onClick={() => setOpenIndex(open ? null : index)} type="button">
                  {item.question}<ChevronDown aria-hidden="true" className={open ? 'rotated' : ''} size={20} />
                </button>
                {open && <div className="faq-answer" id={`faq-answer-${index}`}><p>{item.answer}</p></div>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
