import { useState } from "react"

export function Home() {

  const [selectedOption, setSelectedOption] = useState(0)


  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-12 bg-white">
      <div className="flex flex-row items-center justify-center gap-16 h-full w-full">
        <div className="flex flex-row w-1/3 h-14 bg-cinzaClaro rounded-full relative">
          
          <div onClick={() => setSelectedOption(0)} className={`z-10 h-full w-1/3 flex items-center justify-center bg-transparent  ${ selectedOption == 0 ? "text-white" : "text-cinzaEscuro"} cursor-pointer transition-all ease-in-out duration-150 rounded-l-full`}>
            Casa 
          </div>
          <div onClick={() => setSelectedOption(1)} className={`z-10 h-full w-1/3 flex items-center justify-center bg-transparent ${ selectedOption == 1 ? "text-white" : "text-cinzaEscuro"} cursor-pointer transition-all ease-in-out duration-150`}>
            Apartamento
          </div>
          <div onClick={() => setSelectedOption(2)} className={`z-10 h-full w-1/3 flex items-center justify-center bg-transparent ${ selectedOption == 2 ? "text-white" : "text-cinzaEscuro"} rounded-r-full cursor-pointer transition-all ease-in-out duration-150`}>
            Terreno/Lote
          </div>
          <div className={`h-full w-1/3 bg-cinzaEscuro absolute rounded-full pointer-events: none ${selectedOption == 0 ? "left-0" : selectedOption == 1 ? "left-1/3" : "left-2/3"} transition-all ease-in-out duration-150`}>
            
          </div>
        </div>
      </div>
    </main>
  )
}
