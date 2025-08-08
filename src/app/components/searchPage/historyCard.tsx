import { History } from '@/app/types/history'
import { faBed, faCar, faShower } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export default function HistoryCard({ item }: { item: History }) {
  const [isOpen, setIsOpen] = useState(false)

  const dataFormatada = item.data_pesquisa.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
  const horaFormatada = item.data_pesquisa.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`${isOpen ? 'h-max min-h-24' : 'h-max min-h-16'} relative mb-2 flex h-16 min-w-full cursor-pointer flex-col bg-white p-2 text-sm transition-all duration-300 ease-in-out hover:rounded-md`}
    >
      <div
        className={`mb-2 flex flex-row whitespace-normal break-words border-b border-b-cinzaBordas`}
      >
        {item.tipo} {item.bairro ? 'em' : ''} {item.bairro}
      </div>

      <div className="text-gray-400">
        {dataFormatada} {horaFormatada}
      </div>

      <div
        className={`${isOpen ? '' : 'hidden'} text-md mt-4 flex flex-row justify-between gap-2 transition-all duration-100 ease-in-out`}
      >
        <div className="flex w-10 flex-row gap-1">
          <FontAwesomeIcon
            icon={faBed}
            className={`${item.quartos ? 'text-cinzaEscuro' : 'text-gray-300'}`}
          />{' '}
          {item.quartos}{' '}
        </div>
        <div className="flex w-10 flex-row gap-1">
          <FontAwesomeIcon
            icon={faShower}
            className={`${item.banheiros ? 'text-cinzaEscuro' : 'text-gray-300'}`}
          />{' '}
          {item.banheiros}
        </div>
        <div className="flex w-10 flex-row gap-1">
          <FontAwesomeIcon
            icon={faCar}
            className={`${item.vagas_garagem ? 'text-cinzaEscuro' : 'text-gray-300'}`}
          />{' '}
          {item.vagas_garagem}
        </div>
      </div>
      <div
        className={` ${isOpen ? 'opacity-100' : 'hidden'} mt-4 transition-all duration-100 ease-in-out`}
      >
        {item.area_min ? `${item.area_min} m² - ${item.area_max} m²` : null}
      </div>
      <div
        className={` ${isOpen ? 'opacity-100' : 'hidden'} mt-4 flex h-6 w-full flex-row gap-2 rounded-sm transition-all duration-100 ease-in-out`}
      >
        <div className="flex h-full w-1/2 items-center justify-center border-2 border-cinzaBordas bg-white text-cinzaEscuro hover:border-cinzaEscuro hover:bg-cinzaEscuro hover:text-white">
          Baixar
        </div>
        <div className="flex h-full w-1/2 items-center justify-center bg-cinzaEscuro text-white">
          Pesquisar
        </div>
      </div>
    </div>
  )
}
