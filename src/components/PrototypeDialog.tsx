import { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'

type PrototypeDialogProps = {
  open: boolean
  title: string
  children: ReactNode
  onClose: () => void
}

export function PrototypeDialog({
  open,
  title,
  children,
  onClose,
}: PrototypeDialogProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) closeButtonRef.current?.focus()
  }, [open])

  if (!open) return null

  return (
    <div className="dialog-backdrop" onMouseDown={onClose}>
      <dialog
        aria-labelledby="prototype-dialog-title"
        className="prototype-dialog"
        onMouseDown={(event) => event.stopPropagation()}
        open
      >
        <button
          aria-label="Fechar"
          className="icon-button dialog-close"
          onClick={onClose}
          ref={closeButtonRef}
          title="Fechar"
          type="button"
        >
          <X aria-hidden="true" size={20} />
        </button>
        <span className="dialog-kicker">Protótipo SeuEstagio</span>
        <h2 id="prototype-dialog-title">{title}</h2>
        <div className="dialog-copy">{children}</div>
        <button className="button button-primary" onClick={onClose} type="button">
          Continuar explorando
        </button>
      </dialog>
    </div>
  )
}
