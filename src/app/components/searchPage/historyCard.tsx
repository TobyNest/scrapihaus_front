import { History } from "@/app/types/history"
import { faBed, faCar, faShower } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

export default function HistoryCard({item }: {item:History}) {

    const [isOpen, setIsOpen] = useState(false)

    const dataFormatada = item.data_pesquisa.toLocaleDateString( 'pt-BR', {
        day: '2-digit',
        month:'2-digit',
        year: 'numeric'
        }
    )
    const horaFormatada = item.data_pesquisa.toLocaleTimeString( 'pt-BR', {
        hour: '2-digit',
        minute:'2-digit',
        second: '2-digit'
        }
    )

    return (
    <div onClick={() => setIsOpen(!isOpen)} className={`${isOpen ? "min-h-24 h-max" : "min-h-16 h-max "}  hover:rounded-md text-sm p-2 min-w-full h-16 transition-all ease-in-out duration-300 bg-white mb-2 flex flex-col relative cursor-pointer`}>
        <div className={`whitespace-normal break-words flex flex-row  border-b border-b-cinzaBordas mb-2 `}>
            {item.tipo} {item.bairro ? "em" : ""} { item.bairro}
        </div>

        <div className="text-gray-400">
            {dataFormatada} {horaFormatada}
        </div>
        
        <div className={`${isOpen ? "" : "hidden"} text-md flex flex-row gap-2 transition-all duration-100 ease-in-out mt-4 justify-between`}>
            <div className="w-10 flex flex-row gap-1"><FontAwesomeIcon icon={faBed} className={`${item.quartos ? "text-cinzaEscuro" : "text-gray-300"}`}/> {item.quartos} </div>
            <div  className="w-10 flex flex-row gap-1"><FontAwesomeIcon icon={faShower}  className={`${item.banheiros ? "text-cinzaEscuro" : "text-gray-300"}`}/> {item.banheiros}</div>
            <div  className="w-10 flex flex-row gap-1"><FontAwesomeIcon icon={faCar} className={`${item.vagas_garagem ? "text-cinzaEscuro" : "text-gray-300"}`}/> {item.vagas_garagem}</div>
        </div>
        <div className={` ${isOpen ? "opacity-100" : "hidden"} mt-4 transition-all duration-100 ease-in-out`}>
             {item.area_min ? (`${item.area_min} m² - ${item.area_max} m²`) : null}
        </div>
        <div className={` ${isOpen ? "opacity-100" : "hidden"} transition-all duration-100 ease-in-out w-full h-6  mt-4 rounded-sm flex flex-row gap-2 `}>
            <div className="w-1/2 h-full bg-white border-cinzaBordas text-cinzaEscuro border-2 hover:bg-cinzaEscuro hover:text-white hover:border-cinzaEscuro flex justify-center items-center">Baixar</div>
            <div className="w-1/2 h-full bg-cinzaEscuro text-white flex justify-center items-center">Pesquisar</div>
        </div>
        
    </div>
    )
}