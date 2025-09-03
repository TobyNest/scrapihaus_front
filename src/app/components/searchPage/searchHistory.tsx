import { HousingHistory } from '@/app/types/history'
import { User } from '@/app/types/user'
import {
  faArrowAltCircleDown,
  faBuilding
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export default function SearchHistory({
  searches,
  user
}: {
  searches: HousingHistory[]
  user: User | null
}) {
  return (
    <div className="flex h-full w-full flex-col pr-[16px]">
      <h1 className="font-roboto text-[16px] text-text-muted">
        PESQUISAS RECENTES
      </h1>
      <div className="hide-scrollbar mt-[8px] flex w-full flex-col gap-[8px] overflow-y-auto">
        {user ? (
          searches.length > 0 ? (
            searches.map((search, index) => (
              <HistoryCard info={search} index={index} key={index} />
            ))
          ) : (
            <h1> Não há pesquisas recentes...</h1>
          )
        ) : (
          <h1> Entre para acessar seu histórico!</h1>
        )}
      </div>
    </div>
  )
}

export function HistoryCard({
  info,
  index
}: {
  info: HousingHistory
  index: number
}) {
  const [isActive, setIsActive] = useState(false)
  const date = new Date(info.data_pesquisa)
  const formatedDate = date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  const atributos = [
    { title: 'Quartos', value: info.quartos },
    { title: 'Banheiros', value: info.banheiros },
    { title: 'Vagas de Garagem', value: info.vagas_garagem }
  ]

  return (
    <div
      className={`group relative max-h-[128px] w-full rounded-[8px] border border-bg-light p-[8px] font-roboto transition-all duration-500 hover:max-h-[272px]`}
    >
      <div className="flex h-[296px] w-full flex-col gap-[8px]">
        <div className="flex flex-row items-start justify-between">
          <h1 className="text-[16px] font-bold text-text">{formatedDate}</h1>
          <FontAwesomeIcon
            icon={faArrowAltCircleDown}
            className="mt-[4px] cursor-pointer text-[18px] text-border"
          />
        </div>
        <div className="group-hover:h-[192px] h-[48px] w-full rounded-[4px] border border-bg-light p-[8px] transition-all duration-500 ease-in-out">
          <div className="flex w-full flex-row gap-[8px]">
            <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-border">
              <FontAwesomeIcon icon={faBuilding} className="text-[16px] text-white" />
            </div>
            <div className="flex h-[24px] flex-col gap-[4px]">
              <h1 className="text-[12px] font-bold text-text">{info.tipo}</h1>
              <div className="flex flex-row  text-[10px] text-text-muted">
                {info.bairro && info.bairro.length > 0 && (
                  <>
                  <span>{info.bairro[0]}</span>
                  {info.bairro.length > 1  && <span>,  {info.bairro[1]}</span>}
                  {info.bairro.length > 2  && <span className='ml-[4px] bg-text-muted rounded-full text-bg-dark px-[4px] font-bold'>+{info.bairro.length - 2}</span>}
                  </>
                )}
              </div>
              
            </div>
          </div>
            <div className="mt-[16px] flex gap-[8px] w-full  flex-col opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 ">
                {atributos.map((item) => (
                  <div className={`${item.value ? "text-text" : "text-text-muted opacity-40"}  flex w-full flex-row items-center justify-between border-b border-text-muted text-[12px]`}>
                    <h1>{item.title}</h1>
                    <h1 className='mb-[2px] text-[12px] font-bold'>{item.value || 0}</h1>
                  </div>
                ))}
                <div className='w-full flex-row flex justify-between mt-[12px] items-center text-[12px] font-bold'>
                  <div className='w-1/3 h-[24px] bg-bg-light rounded-[2px] flex items-center justify-center'>{info.area_min} m²</div>
                  <h1 className='text-text text-[12px] font-regular'>até</h1>
                  <div className='w-1/3 h-[24px] bg-bg-light rounded-[2px] flex items-center justify-center'>{info.area_max} m²</div>
                </div>
              </div>
        </div>
        <div className="absolute bottom-[8px] left-[8px] right-[8px] h-[24px] rounded-[4px] bg-border text-[10px] flex items-center justify-center cursor-pointer">
          PESQUISAR NOVAMENTE
        </div>
      </div>
    </div>
  )
}
