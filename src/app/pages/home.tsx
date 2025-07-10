import { useState } from "react"

export function Home() {

  const [selectedOption, setSelectedOption] = useState(0)


  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-12 bg-white">
      <div className="flex flex-col items-center justify-center gap-16 h-full w-full">
        <div className="flex flex-row w-1/3 h-14 bg-cinzaClaro rounded-full relative">
          
          <div onClick={() => setSelectedOption(0)} className={`z-10 h-full w-1/3 text-xl flex items-center justify-center bg-transparent  ${ selectedOption == 0 ? "text-white" : "text-cinzaEscuro"} cursor-pointer transition-all ease-in-out duration-150 rounded-l-full select-none`}>
            Casa 
          </div>
          <div onClick={() => setSelectedOption(1)} className={`z-10 h-full w-1/3 text-xl flex items-center justify-center bg-transparent ${ selectedOption == 1 ? "text-white" : "text-cinzaEscuro"} cursor-pointer transition-all ease-in-out duration-150 select-none`}>
            Apartamento
          </div>
          <div onClick={() => setSelectedOption(2)} className={`z-10 h-full w-1/3 text-xl flex items-center justify-center bg-transparent ${ selectedOption == 2 ? "text-white" : "text-cinzaEscuro"} rounded-r-full cursor-pointer transition-all ease-in-out duration-150 select-none`}>
            Terreno/Lote
          </div>
          <div className={`h-full w-1/3 bg-cinzaEscuro absolute rounded-full pointer-events: none ${selectedOption == 0 ? "left-0" : selectedOption == 1 ? "left-1/3" : "left-2/3"} transition-all ease-in-out duration-150`}>
            
          </div>
        </div>
        {/* box-shadow: offset-x offset-y blur spread color */}
        <div className="w-1/3 h-3/4 shadow-[0_0_30px_0_rgba(0,0,0,0.2)] rounded-md p-8">
          <div className="w-full h-8 text-cinzaEscuro text-xl font-bold">
            Bairro
          </div>
          <input className="w-full h-10 bg-cinzaClaro outline-none focus:border-cinzaEscuro p-1 border-cinzaBordas border-2 transition-all ease-in-out duration-50 rounded-md my-3">
          </input>
          <div className="w-full h-8 text-cinzaEscuro text-xl font-bold mt-4">
            Área
          </div>
          <div className="flex flex-col w-2/5 bg-cinzaClaro rounded-md border border-cinzaBordas">
          <div className="h-10 w-14 bg-cinzaEscuro text-white flex justify-center items-center text-xl rounded-md">
            Mín
          </div>
          </div>
        </div>
      </div>
    </main>
  )
}
