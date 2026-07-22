import { GraduationCap, MessageCircle, Network } from 'lucide-react'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a className="brand" href="#inicio"><span className="brand-mark"><GraduationCap aria-hidden="true" size={22} /></span><span>SeuEstagio</span></a>
          <p>Aproximando estudantes e oportunidades desde o primeiro passo da carreira.</p>
          <div className="social-links"><a aria-label="Comunidade profissional" href="#"><Network aria-hidden="true" /></a><a aria-label="Fale com o SeuEstagio" href="#"><MessageCircle aria-hidden="true" /></a></div>
        </div>
        <div><h2>Estudantes</h2><a href="#vagas">Buscar vagas</a><a href="#como-funciona">Como funciona</a><a href="#faq">Dúvidas</a></div>
        <div><h2>Empresas</h2><a href="#empresas">Publicar vaga</a><a href="#empresas">Conhecer soluções</a><a href="#faq">Suporte</a></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 SeuEstagio. Todos os direitos reservados.</span><span>Construído para estudantes brasileiros.</span></div>
    </footer>
  )
}
