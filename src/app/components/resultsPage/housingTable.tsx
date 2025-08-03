import { Housing } from '@/app/types/housing'
import { faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface HousingListProps {
  housings: Housing[]
}

const TableInfoTitle = [
  { titulo: 'Data de coleta', flex: 3 },
  { titulo: 'Área Privativa', flex: 3 },
  { titulo: 'Tipo', flex: 3 },
  { titulo: 'Endereço', flex: 8 },
  { titulo: 'Quartos', flex: 2 },
  { titulo: 'Banheiros', flex: 2 },
  { titulo: 'Vagas', flex: 2 },
  { titulo: 'Preço', flex: 3 },
  { titulo: 'Preço m²', flex: 2 },
  { titulo: 'IPTU', flex: 2 },
  { titulo: 'Condomínio', flex: 3 },
  { titulo: 'Link', flex: 2 }
]

export default function HousingTable({ housings }: HousingListProps) {
  return (
    <div className="h-full w-full rounded-t-xl text-sm">
      <div className="flex h-10 w-full flex-row justify-between overflow-hidden rounded-t-xl">
        {TableInfoTitle.map((title) => (
          <div
            style={{ flex: title.flex }}
            className={`h-full  flex items-center justify-start overflow-hidden border border-r-0 border-gray-100 bg-white font-semibold last:border-r`}
          >
            <div className="flex h-full w-full items-center justify-start pl-2">
              {title.titulo}
            </div>
          </div>
        ))}
      </div>
      <div className="hide-scrollbar h-full w-full overflow-y-scroll pb-14">
        {housings.map((housing, index) => (
          <HousingRow housing={housing} index={index} />
        ))}
      </div>
    </div>
  )
}

export function HousingRow({
  housing,
  index
}: {
  housing: Housing
  index: number
}) {
  return (
    <div className="flex h-10 w-full flex-row justify-between">
      <HousingRowCell
        value={housing.data}
        flex={TableInfoTitle[0].flex}
        index={index}
      />
      <HousingRowCell
        value={housing.area}
        flex={TableInfoTitle[1].flex}
        index={index}
        suffix="m²"
      />
      <HousingRowCell
        value={housing.type}
        flex={TableInfoTitle[2].flex}
        index={index}
      />
      <HousingRowCell
        value={housing.address}
        flex={TableInfoTitle[3].flex}
        index={index}
      />
      <HousingRowCell
        value={housing.rooms}
        flex={TableInfoTitle[4].flex}
        index={index}
      />
      <HousingRowCell
        value={housing.bathrooms}
        flex={TableInfoTitle[5].flex}
        index={index}
      />
      <HousingRowCell
        value={housing.parkingSlots}
        flex={TableInfoTitle[6].flex}
        index={index}
      />
      <HousingRowCell
        value={housing.price}
        flex={TableInfoTitle[7].flex}
        index={index}
        prefix="R$"
      />
      <HousingRowCell
        value={housing.price_m2}
        flex={TableInfoTitle[8].flex}
        index={index}
        prefix="R$"
      />
      <HousingRowCell
        value={housing.iptu}
        flex={TableInfoTitle[9].flex}
        index={index}
        prefix="R$"
      />
      <HousingRowCell
        value={housing.condominum}
        flex={TableInfoTitle[10].flex}
        index={index}
        prefix="R$"
      />
      <HousingRowCell
        value={'Acessar'}
        flex={TableInfoTitle[11].flex}
        index={index}
        link={housing.link}
      />
    </div>
  )
}

export function HousingRowCell({
  value,
  flex,
  index,
  prefix,
  suffix,
  link
}: {
  value: any
  flex: number
  index: number
  prefix?: string
  suffix?: string
  link?: string
}) {
  return (
    <div
      style={{ flex }}
      className={`${index % 2 !== 0 ? 'bg-white' : 'bg-cinzaClaro'} flex items-center justify-center overflow-hidden border border-r-0 border-t-0 border-gray-200 first-of-type:border-r-0 last-of-type:border-r`}
    >
      <div
        onClick={() => {
          if (link) window.open(link, '_blank')
        }}
        className={`${link && 'group hover:cursor-pointer hover:font-semibold'} flex h-full w-max items-center justify-start pl-2`}
      >
        {value == 0 ? '' : prefix} {value == 0 ? '-' : value}{' '}
        {value == 0 ? '' : suffix}
        {link && (
          <div className="h-full w-full translate-x-[20px] p-2 opacity-0 transition-all duration-200 ease-in-out group-hover:translate-x-0 group-hover:opacity-100">
            <FontAwesomeIcon icon={faSquareArrowUpRight} />
          </div>
        )}
      </div>
    </div>
  )
}
