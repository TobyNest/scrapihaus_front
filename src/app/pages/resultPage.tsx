import HousingTable from "../components/resultsPage/housingTable";
import housingData from "@/mocks/housingMock";

export default function ResultPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-cinzaClaro ">
      <div className="h-4/5 w-[90%] rounded-md p-4 shadow-[0_0_30px_0_rgba(0,0,0,0.2)] overflow-hidden">
        <div className="flex min-h-20 w-full flex-row items-center justify-center gap-4 ">
          <div >

          </div>
        </div>
        <div className="h-[90%] w-full">
          <HousingTable housings={housingData}/>
        </div>
      </div>
    </div>
  )
}
