import { useAuth } from '@/app/contexts/authContext'
import { useSearch } from '@/app/contexts/searchContext'
import { HousingHistory } from '@/app/types/history'

export default function SearchHistory() {
  const { searches } = useSearch()
  const { user } = useAuth()

  return (
    <div className="flex h-full w-full flex-col pr-[16px]">
      <h1 className="font-roboto text-[16px] text-text-muted">
        PESQUISAS RECENTES
      </h1>
      <div className="scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-border scrollbar-track-bg mt-[8px] flex h-full w-full flex-col items-start justify-start overflow-y-auto">
        {user ? (
          searches.length > 0 ? null : (
            <h1> Não há pesquisas recentes...</h1>
          )
        ) : (
          <h1> Entre para acessar seu histórico!</h1>
        )}
        {searches.map((search, index) => (
          <HistoryCard info={search} index={index} />
        ))}
      </div>
    </div>
  )
}

export function HistoryCard({
  info,
  index
}: {
  info: HousingHistory | undefined
  index: number
}) {
  return (
    <div>
      {info!.banheiros} {index}
    </div>
  )
}
