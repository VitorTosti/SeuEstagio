import { GraduationCap, Menu, X } from 'lucide-react'
import { useState } from 'react'

type HeaderProps = {
  onPrototypeAction: () => void
}

export function Header({ onPrototypeAction }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a aria-label="SeuEstagio - página inicial" className="brand" href="#inicio">
          <span className="brand-mark"><GraduationCap aria-hidden="true" size={22} /></span>
          <span>SeuEstagio</span>
        </a>
        <button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          className="icon-button menu-button"
          onClick={() => setMenuOpen((current) => !current)}
          type="button"
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <nav aria-label="Navegação principal" className={menuOpen ? 'nav nav-open' : 'nav'}>
          <a href="#vagas">Vagas</a>
          <a href="#empresas">Para empresas</a>
          <a href="#faq">Ajuda</a>
        </nav>
        <div className="header-actions">
          <button className="button button-ghost" onClick={onPrototypeAction} type="button">Entrar</button>
          <button className="button button-primary" onClick={onPrototypeAction} type="button">Criar conta</button>
        </div>
      </div>
    </header>
  )
}
