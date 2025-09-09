type QuotaPopupProps = {
  isOpen: boolean
  onClose: () => void
  onRegister: () => void
}

export default function QuotaPopup({
  isOpen,
  onClose,
  onRegister
}: QuotaPopupProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // fecha clicando fora
    >
      <div
        className="relative w-[400px] rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()} // impede fechar ao clicar dentro
      >
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
        >
          X
        </button>
        <h2 className="mb-4 text-xl font-bold">Limite de pesquisas atingido</h2>
        <p className="mb-6">
          Você atingiu o máximo de pesquisas permitidas para usuários não
          cadastrados. Crie uma conta para continuar pesquisando!
        </p>
        <button
          onClick={onRegister}
          className="w-full rounded bg-blue-600 py-2 text-white transition-colors hover:bg-blue-700"
        >
          Criar Conta
        </button>
      </div>
    </div>
  )
}
