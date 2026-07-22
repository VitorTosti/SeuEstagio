import { ArrowRight, GraduationCap } from 'lucide-react'

type ClosingCtaProps = { onPrototypeAction: () => void }

export function ClosingCta({ onPrototypeAction }: ClosingCtaProps) {
  return (
    <section className="closing-cta">
      <div className="container closing-inner">
        <span className="closing-icon"><GraduationCap aria-hidden="true" size={28} /></span>
        <div><h2>Pronto para o próximo passo?</h2><p>Crie seu perfil e comece a organizar as melhores oportunidades para você.</p></div>
        <button className="button button-light" onClick={onPrototypeAction} type="button">Começar agora <ArrowRight aria-hidden="true" size={18} /></button>
      </div>
    </section>
  )
}
