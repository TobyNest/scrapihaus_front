import { HousingHistory } from '@/app/types/history'
import { User } from '@/app/types/user'
import {
  faArrowAltCircleDown,
  faBuilding,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export default function SearchHistory({
  searches,
  user,
  loading
}: {
  searches: HousingHistory[]
  user: User | null
  loading: boolean
}) {
  if (loading && user) {
    return <SkeletonCards />
  }

  return (
    <div className="flex h-full w-full flex-col pr-[16px]">
      <h1 className="font-roboto text-[16px] text-text-muted">
        PESQUISAS RECENTES
      </h1>
      <div className="hide-scrollbar mt-[8px] flex w-full flex-col gap-[8px] overflow-y-auto">
        {user ? (
          searches.length > 0 ? (
            searches.map((search, index) => (
              <HistoryCard info={search} key={index} />
            ))
          ) : (
            <h1>Não há pesquisas recentes...</h1>
          )
        ) : (
          <h1>Entre para acessar seu histórico!</h1>
        )}
      </div>
    </div>
  )
}

function SkeletonCards() {
  return (
    <div className="flex h-full w-full flex-col gap-[16px] pr-[16px]">
      <div className="mr-[32px] flex h-[112px] w-full animate-pulse flex-col justify-between rounded-md border border-bg-light bg-bg-light p-4">
        <div className="h-4 w-1/3 rounded bg-bg-dark" />
        <div className="mt-2 h-3 w-1/2 rounded bg-bg-dark" />
        <div className="mt-2 h-3 w-1/4 rounded bg-bg-dark" />
      </div>
      <div className="mr-[32px] flex h-[112px] w-full animate-pulse flex-col justify-between rounded-md border border-bg-light bg-bg-light p-4">
        <div className="h-4 w-1/3 rounded bg-bg-dark" />
        <div className="mt-2 h-3 w-1/2 rounded bg-bg-dark" />
        <div className="mt-2 h-3 w-1/4 rounded bg-bg-dark" />
      </div>
      <div className="mr-[32px] flex h-[112px] w-full animate-pulse flex-col justify-between rounded-md border border-bg-light bg-bg-light p-4">
        <div className="h-4 w-1/3 rounded bg-bg-dark" />
        <div className="mt-2 h-3 w-1/2 rounded bg-bg-dark" />
        <div className="mt-2 h-3 w-1/4 rounded bg-bg-dark" />
      </div>
      <div className="mr-[32px] flex h-[112px] w-full animate-pulse flex-col justify-between rounded-md border border-bg-light bg-bg-light p-4">
        <div className="h-4 w-1/3 rounded bg-bg-dark" />
        <div className="mt-2 h-3 w-1/2 rounded bg-bg-dark" />
        <div className="mt-2 h-3 w-1/4 rounded bg-bg-dark" />
      </div>
      <div className="mr-[32px] flex h-[112px] w-full animate-pulse flex-col justify-between rounded-md border border-bg-light bg-bg-light p-4">
        <div className="h-4 w-1/3 rounded bg-bg-dark" />
        <div className="mt-2 h-3 w-1/2 rounded bg-bg-dark" />
        <div className="mt-2 h-3 w-1/4 rounded bg-bg-dark" />
      </div>
    </div>
  )
}

export function HistoryCard({ info }: { info: HousingHistory }) {
  // const [isActive, setIsActive] = useState(false)
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

  const [hover, setHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
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
        <div className="h-[56px] w-full rounded-[4px] border border-bg-light p-[8px] transition-all duration-500 ease-in-out group-hover:h-[192px]">
          <div className="flex w-full flex-row gap-[8px]">
            <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-border">
              <FontAwesomeIcon
                icon={faBuilding}
                className="text-[16px] text-white"
              />
            </div>
            <div className="flex h-[32px] flex-col gap-[1px]">
              <h1 className="text-[14px] font-bold text-text">{info.tipo}</h1>
              <div className="flex flex-row text-[12px] text-text-muted">
                {info.bairro && info.bairro.length > 0 && (
                  <>
                    <span>{info.bairro[0]}</span>
                    {info.bairro.length > 1 && <span>, {info.bairro[1]}</span>}
                    {info.bairro.length > 2 && (
                      <span className="ml-[4px] rounded-full bg-text-muted px-[4px] font-bold text-bg-dark">
                        +{info.bairro.length - 2}
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div
            className={`${hover ? 'opacity-100 duration-700 ease-in' : 'opacity-0 duration-200 ease-out'} mt-[16px] flex w-full flex-col gap-[8px]`}
          >
            {atributos.map((item) => (
              <div
                className={`${item.value ? 'text-text' : 'text-text-muted opacity-40'} flex w-full flex-row items-center justify-between border-b border-text-muted text-[12px]`}
              >
                <h1>{item.title}</h1>
                <h1 className="mb-[2px] text-[12px] font-bold">
                  {item.value || 0}
                </h1>
              </div>
            ))}
            <div className="mt-[12px] flex w-full flex-row items-center justify-between text-[12px] font-bold">
              <div className="flex h-[24px] w-1/3 items-center justify-center rounded-[2px] bg-bg-light">
                {info.area_min} m²
              </div>
              <h1 className="text-[12px] font-regular text-text">até</h1>
              <div className="flex h-[24px] w-1/3 items-center justify-center rounded-[2px] bg-bg-light">
                {info.area_max} m²
              </div>
            </div>
          </div>
        </div>

        <div
          className={` ${hover ? 'bg-border duration-300 ease-in' : 'bg-transparent duration-200 ease-out'} absolute bottom-[8px] left-[8px] right-[8px] flex h-[24px] cursor-pointer items-center justify-center rounded-[4px] text-[10px] hover:bg-border hover:bg-opacity-100 group-hover:opacity-100`}
        >
          {hover ? (
            'PESQUISAR NOVAMENTE'
          ) : (
            <FontAwesomeIcon
              icon={faChevronDown}
              className="text-[12px] text-white"
            />
          )}
        </div>
      </div>
    </div>
  )
}
