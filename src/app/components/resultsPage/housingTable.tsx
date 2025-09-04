import { Housing } from '@/app/types/housing'
import { CellType } from '@/utils/env/cellTypeEnum'
import {
  faSearch,
  faSquareArrowUpRight
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import saveAs from 'file-saver'
import * as XLSX from 'xlsx'

const TableInfoTitle = [
  { titulo: 'Nº', flex: 1 },
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

export default function HousingTable({
  housings,
  setIsResultPage
}: {
  housings: Housing[]
  setIsResultPage: (isResultPage: boolean) => void
}) {
  return (
    <div className="text-roboto flex h-full w-full flex-col gap-[16px] overflow-hidden">
      <div className="flex w-full flex-row justify-between gap-[16px]">
        <div className="flex flex-row gap-[16px]">
          <div
            onClick={() => setIsResultPage(false)}
            className="h-[32px] cursor-pointer rounded-[4px] bg-border px-[8px] py-[4px] text-white"
          >
            Realizar outra pesquisa
          </div>
          <div className="flex h-[32px] flex-row items-center justify-between gap-[16px] rounded-[4px] bg-bg-dark px-[8px] py-[4px]">
            <div className="flex flex-row">
              <FontAwesomeIcon
                icon={faSearch}
                className="mr-[4px] mt-[4px] text-border"
              />
              <h1 className="text-text-muted">Resultado:</h1>
            </div>
            <div className="inline-flex w-full whitespace-nowrap font-bold text-text">
              {housings.length - 1} linhas
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            housings.length > 0 && exportToExcel(housings)
          }}
          className={`h-[32px] ${housings.length > 0 && 'hover:bg-border hover:text-white'} cursor-pointer rounded-[4px] bg-bg-light px-[8px] py-[4px] transition-all duration-150 ease-in-out`}
        >
          Exportar Excel
        </div>
      </div>
      <div className="h-full w-full rounded-t-xl bg-bg-dark text-sm transition-all duration-150 ease-in-out">
        <div className="flex h-10 w-full flex-row justify-between overflow-hidden rounded-t-xl">
          {TableInfoTitle.map((title) => (
            <div
              style={{ flex: title.flex }}
              className={`flex h-full items-center justify-start overflow-hidden border border-r-0 border-bg bg-bg-60 font-semibold last:border-r`}
            >
              <div className="flex h-full w-full items-center justify-start pl-2">
                {title.titulo}
              </div>
            </div>
          ))}
        </div>
        <div className="hide-scrollbar h-full w-full overflow-y-scroll bg-bg-dark pb-14">
          {housings.map((housing, index) => (
            <HousingRow housing={housing} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function exportToExcel(data: Housing[], fileName = 'dados.xlsx') {
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Dados')

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })

  saveAs(blob, fileName)
}

export function HousingRow({
  housing,
  index
}: {
  housing: Housing
  index: number
}) {
  return (
    <div className="bg-bg-black flex h-10 w-full flex-row justify-between">
      <HousingRowCell
        value={index + 1}
        flex={TableInfoTitle[0].flex}
        index={index}
        cell={CellType.NUMEROS}
      />
      <HousingRowCell
        value={housing.data_coleta}
        flex={TableInfoTitle[1].flex}
        index={index}
        cell={CellType.DATA}
      />
      <HousingRowCell
        value={housing.area_privativa}
        flex={TableInfoTitle[2].flex}
        index={index}
        cell={CellType.METRO_QUADRADO}
      />
      <HousingRowCell
        value={housing.tipo}
        flex={TableInfoTitle[3].flex}
        index={index}
        cell={CellType.TEXTO}
      />
      <HousingRowCell
        value={housing.bairro}
        flex={TableInfoTitle[4].flex}
        index={index}
        cell={CellType.TEXTO}
      />
      <HousingRowCell
        value={housing.endereco}
        flex={TableInfoTitle[5].flex}
        index={index}
        cell={CellType.TEXTO}
      />
      <HousingRowCell
        value={housing.quartos}
        flex={TableInfoTitle[6].flex}
        index={index}
        cell={CellType.NUMEROS}
      />
      <HousingRowCell
        value={housing.banheiros}
        flex={TableInfoTitle[7].flex}
        index={index}
        cell={CellType.NUMEROS}
      />
      <HousingRowCell
        value={housing.vagas_garagem}
        flex={TableInfoTitle[8].flex}
        index={index}
        cell={CellType.NUMEROS}
      />
      <HousingRowCell
        value={housing.valor_total}
        flex={TableInfoTitle[9].flex}
        index={index}
        cell={CellType.DINHEIRO}
      />
      <HousingRowCell
        value={housing.valor_m2}
        flex={TableInfoTitle[10].flex}
        index={index}
        cell={CellType.DINHEIRO}
      />
      <HousingRowCell
        value={housing.iptu}
        flex={TableInfoTitle[11].flex}
        index={index}
        cell={CellType.DINHEIRO}
      />
      <HousingRowCell
        value={housing.condominio}
        flex={TableInfoTitle[12].flex}
        index={index}
        cell={CellType.DINHEIRO}
      />
      <HousingRowCell
        value={'Acessar'}
        flex={TableInfoTitle[13].flex}
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
      className={`${index % 2 !== 0 ? 'bg-bg-dark' : 'bg-bg'} flex items-center justify-start overflow-hidden border border-transparent bg-opacity-60`}
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
