import { bairrosSP } from "@/utils/listaBairros/listaBairrosSp";
import { faMagnifyingGlass, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";


export default function SearchSection() {

  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<string[]>([])
  const [activeIndex, setActiveIndex] = useState<number>(-1)
  const [filtered, setFiltered] = useState<string[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    if(value.trim() === "") {
      setFiltered([])
      return
    }

    const results = bairrosSP.filter((bairro) => bairro.toLowerCase().includes(value.toLowerCase()))
    setFiltered(results)
    setActiveIndex(-1)
  }

  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "ArrowDown") {
      e.preventDefault()
      setActiveIndex((prev)=> prev < filtered.length - 1 ? prev + 1 : 0)
    }
    if (e.key == "ArrowUp") {
      e.preventDefault()
      setActiveIndex((prev)=> prev > 0 ? prev - 1 : filtered.length - 1)
    }
    if (e.key == "Enter" && activeIndex >= 0) {
      e.preventDefault()
      addBairro(filtered[activeIndex])
    }
  }

  const addBairro = (bairro: string) => {
    if (!selected.includes(bairro)) {
      setSelected([...selected,bairro])
    }
    setQuery("")
    setFiltered([])
    setActiveIndex(-1)
  }

  const removeBairro = (bairro: string) => {
    setSelected((prev)=>prev.filter((b) => b !== bairro))
  }

  return <div className="h-[240px] w-[712px] flex flex-col justify-between ">
    <div className="w-full h-[123px] bg-bg bg-opacity-60 rounded-[4px] flex flex-col px-[24px] py-[16px]">
      <div className="h-1/2 w-full  flex flex-row items-center justify-center gap-[8px]">
      <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl text-text-muted"/>
      <div className="w-full  h-full px-[8px] flex flex-row items-center justify-start gap-[16px]">
        {selected.map((bairro, index)=> {
          return <div key={index} onClick={() => removeBairro(bairro)} className="cursor-pointer group h-[32px] w-min bg-bg border border-bg-light rounded-[2px] text-text font-roboto text-base whitespace-nowrap inline-flex items-center justify-center px-[12px] py-[4px] font-light gap-[8px]">
            <h1>{bairro}</h1>
            <FontAwesomeIcon icon={faX} className="text-xs text-text-muted group-hover:text-text font-light "/>
          </div>

        })}
        <div className="relative ">
        <input type="text" value={query} onChange={handleChange} onKeyDown={handleKeyDown} placeholder="Digite um bairro..." className="w-full h-full bg-transparent border-0 focus:outline-none text-text font-roboto"></input>
        {query && filtered.length > 0 && (
          <ul className="absolute z-10 mt-1 w-full rounded-[4px] border-border border bg-bg-light">
            {filtered.map((bairro, index) => {
              return <li key={bairro} onClick={() => addBairro(bairro)} className={`cursor-pointer px-3 py-2 hover:bg-bg-dark ${index === activeIndex ? "bg-border" : ""}`}>
                {bairro}
              </li>
            })
              
            }
          </ul>
        )}
        </div>
      </div>
      </div>
    </div>
    <div className="w-full h-[52px] bg-bg opacity-60 rounded-[4px]">
    </div>
    <div className="w-full h-[40px] bg-border rounded-[4px]">
    </div>
  </div>
}
