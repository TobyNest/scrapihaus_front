import HousingTable from '../components/resultsPage/housingTable'
// import housingData from '@/mocks/housingMock'
import { useSearch } from '../contexts/searchContext'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { Housing } from '../types/housing'

export default function ResultPage() {
  const { housings } = useSearch()

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-cinzaClaro">
      <div className="h-4/5 w-[90%] overflow-hidden rounded-md p-4 shadow-[0_0_30px_0_rgba(0,0,0,0.2)]">
        <div className="flex h-[10%] w-full flex-row items-center justify-evenly gap-2">
          <div className="e w-100 flex h-12 items-center justify-center rounded-md">
            {housings.length} Imóveis encontrados
          </div>
          <div
            onClick={() => exportToExcel(housings)}
            className="flex h-12 w-60 cursor-pointer select-none items-center justify-center rounded-md bg-cinzaEscuro text-white hover:brightness-90"
          >
            Baixar Excel
          </div>
        </div>
        <div className="h-[90%] w-full">
          <HousingTable housings={housings} />
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
