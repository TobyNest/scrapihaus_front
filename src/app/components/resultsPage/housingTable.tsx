import { Housing } from '@/app/types/housing'
import { CellType } from '@/utils/env/cellTypeEnum'
import { faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface HousingListProps {
  housings: Housing[]
}

const TableInfoTitle = [
  { titulo: 'Data de coleta', flex: 4 },
  { titulo: 'Área Privativa', flex: 3 },
  { titulo: 'Tipo', flex: 3 },
  { titulo: 'Bairro', flex: 3 },
  { titulo: 'Endereço', flex: 8 },
  { titulo: 'Quartos', flex: 2 },
  { titulo: 'Banheiros', flex: 2 },
  { titulo: 'Vagas', flex: 2 },
  { titulo: 'Preço', flex: 3 },
  { titulo: 'Preço m²', flex: 3 },
  { titulo: 'IPTU', flex: 3 },
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
            className={`flex h-full items-center justify-start overflow-hidden border border-r-0 border-gray-100 bg-white font-semibold last:border-r`}
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
        value={housing.data_coleta}
        flex={TableInfoTitle[0].flex}
        index={index}
        cell={CellType.DATA}
      />
      <HousingRowCell
        value={housing.area_privativa}
        flex={TableInfoTitle[1].flex}
        index={index}
        cell={CellType.METRO_QUADRADO}
      />
      <HousingRowCell
        value={housing.tipo}
        flex={TableInfoTitle[2].flex}
        index={index}
        cell={CellType.TEXTO}
      />
      <HousingRowCell
        value={housing.bairro}
        flex={TableInfoTitle[3].flex}
        index={index}
        cell={CellType.TEXTO}
      />
      <HousingRowCell
        value={housing.endereco}
        flex={TableInfoTitle[4].flex}
        index={index}
        cell={CellType.TEXTO}
      />
      <HousingRowCell
        value={housing.quartos}
        flex={TableInfoTitle[5].flex}
        index={index}
        cell={CellType.NUMEROS}
      />
      <HousingRowCell
        value={housing.banheiros}
        flex={TableInfoTitle[6].flex}
        index={index}
        cell={CellType.NUMEROS}
      />
      <HousingRowCell
        value={housing.vagas_garagem}
        flex={TableInfoTitle[7].flex}
        index={index}
        cell={CellType.NUMEROS}
      />
      <HousingRowCell
        value={housing.valor_total}
        flex={TableInfoTitle[8].flex}
        index={index}
        cell={CellType.DINHEIRO}
      />
      <HousingRowCell
        value={housing.valor_m2}
        flex={TableInfoTitle[9].flex}
        index={index}
        cell={CellType.DINHEIRO}
      />
      <HousingRowCell
        value={housing.iptu}
        flex={TableInfoTitle[10].flex}
        index={index}
        cell={CellType.DINHEIRO}
      />
      <HousingRowCell
        value={housing.condominio}
        flex={TableInfoTitle[11].flex}
        index={index}
        cell={CellType.DINHEIRO}
      />
      <HousingRowCell
        value={'Acessar'}
        flex={TableInfoTitle[12].flex}
        index={index}
        link={housing.link}
        cell={CellType.LINK}
      />
    </div>
  )
}

export function HousingRowCell({
  value,
  flex,
  index,
  link,
  cell
}: {
  value: any
  flex: number
  index: number
  link?: string
  cell: CellType
}) {
  let newValue = value

  switch (cell) {
    case CellType.DATA:
      newValue = new Date(value).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
      break

    case CellType.METRO_QUADRADO:
      newValue = value + ' m²'
      break

    case CellType.TEXTO:
      newValue = value || '-'
      break

    case CellType.NUMEROS:
      newValue = value || '-'
      break

    case CellType.DINHEIRO:
      const numero =
        typeof value === 'string'
          ? parseFloat(value.replace(',', '.'))
          : Number(value)

      newValue =
        numero && numero !== 0
          ? new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              maximumFractionDigits: 2
            }).format(numero)
          : ' - '
      break

    case CellType.LINK:
      newValue = 'Acessar'
      break
  }

  return (
    <div
      style={{ flex }}
      className={`${index % 2 !== 0 ? 'bg-white' : 'bg-cinzaClaro'} flex items-center justify-start overflow-hidden border border-r-0 border-t-0 border-gray-200 first-of-type:border-r-0 last-of-type:border-r`}
    >
      <div
        onClick={() => {
          if (link) window.open(link, '_blank')
        }}
        className={`${link && 'group hover:cursor-pointer hover:font-semibold'} flex h-full items-center pl-2`}
      >
        {newValue}
        {link && (
          <div className="h-full w-full translate-x-[20px] p-2 opacity-0 transition-all duration-200 ease-in-out group-hover:translate-x-0 group-hover:opacity-100">
            <FontAwesomeIcon icon={faSquareArrowUpRight} />
          </div>
        )}
      </div>
    </div>
  )
}
