import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type QuotaPopupProps = {
  isOpen: boolean
  onClose: () => void
  onRegister: () => void
  onLogin: () => void
}

export default function QuotaPopup({
  isOpen,
  onClose,
  onRegister,
  onLogin
}: QuotaPopupProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative w-[400px] rounded-[8px] bg-bg p-6 text-text shadow-lg"
        onClick={(e) => e.stopPropagation()} // impede fechar ao clicar dentro
      >
        <button
          onClick={onClose}
          className="text-textflex absolute right-2 top-2 h-[24px] w-[24px] items-center justify-center rounded-full bg-bg-light hover:bg-bg-dark"
        >
          <FontAwesomeIcon
            icon={faX}
            className="mb-[1px] text-[12px] text-text"
          />
        </button>
        <h2 className="mb-4 text-xl font-bold">Limite de pesquisas atingido</h2>
        <p className="mb-6">
          Você atingiu o máximo de pesquisas permitidas para usuários não
          cadastrados.
        </p>
        <div className="flex w-full flex-row gap-[8px]">
          <button
            onClick={onRegister}
            className="w-full rounded bg-bg-dark py-2 text-text transition-colors hover:bg-bg-light"
          >
            Criar Conta
          </button>
          <button
            onClick={onLogin}
            className="w-full rounded bg-blue-600 py-2 text-white transition-colors hover:bg-blue-700"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  )
}
