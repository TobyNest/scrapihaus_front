import HousingTable from '../components/resultsPage/housingTable'
// import housingData from '@/mocks/housingMock'
import { useSearch } from '../contexts/searchContext'

export default function ResultPage() {
  const { housings } = useSearch()

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-cinzaClaro">
      <div className="h-4/5 w-[90%] overflow-hidden rounded-md p-4 shadow-[0_0_30px_0_rgba(0,0,0,0.2)]">
        <div className="flex min-h-20 w-full flex-row items-center justify-center gap-4">
          <div></div>
        </div>
        <div className="h-[90%] w-full">
          <HousingTable housings={housings} />
        </div>
      </div>
    </div>
  )
}
