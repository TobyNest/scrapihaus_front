import { useSearch } from '@/app/contexts/searchContext'
import { bairrosSP } from '@/utils/listaBairros/listaBairrosSp'
import {
  faBed,
  faCar,
  faMagnifyingGlass,
  faShower,
  faX
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchSection({
  variant = 'search'
}: {
  variant?: 'search' | 'home'
}) {
  const {
    handleTypeChange,
    updateField,
    selectedOption,
    buscarHousings,
    searchParams
  } = useSearch()

  const navigate = useNavigate()

  return (
    <div className="flex min-h-[240px] w-[712px] flex-col justify-between gap-[8px] font-roboto">
      <div
        className={` ${variant == 'search' ? 'border border-bg-light bg-bg-dark' : ''} flex min-h-[123px] w-full flex-col rounded-[4px] bg-bg bg-opacity-60 px-[24px] py-[16px] transition-colors duration-500`}
      >
        <div className="flex h-full w-full flex-col gap-[24px]">
          <BairroTagSearch />

          <div className="flex h-[24px] w-full flex-row justify-between gap-[16px]">
            <NumberSelector
              value={searchParams.quartos}
              parameter={'quartos'}
              setValue={updateField.bind(null, 'quartos')}
            />
            <NumberSelector
              value={searchParams.banheiros}
              parameter={'banheiros'}
              setValue={updateField.bind(null, 'banheiros')}
            />
            <NumberSelector
              value={searchParams.vagas_garagem}
              parameter={'vagas_garagem'}
              setValue={updateField.bind(null, 'vagas_garagem')}
            />
          </div>
        </div>
      </div>
      <div
        className={` ${variant == 'search' ? 'border border-bg-light bg-bg-dark' : ''} h-[52px] w-full rounded-[4px] bg-bg bg-opacity-60 px-[16px] py-[8px] transition-colors duration-500`}
      >
        <AreaAndTypeSelector
          minAreaValue={searchParams.min_area}
          setMinArea={updateField.bind(null, 'min_area')}
          maxAreaValue={searchParams.max_area}
          setMaxArea={updateField.bind(null, 'max_area')}
          setSelectedOption={handleTypeChange}
          selectedOption={selectedOption}
        />
      </div>
      <div
        onClick={() => {
          buscarHousings(searchParams)
          navigate('/search/results')
        }}
        className="hover:bg-border-dark flex h-[40px] w-full items-center justify-center rounded-[4px] bg-border font-roboto text-sm font-medium text-white transition-all duration-150 ease-in-out hover:cursor-pointer"
      >
        PESQUISAR
      </div>
    </div>
  )
}

export function AreaAndTypeSelector({
  minAreaValue,
  setMinArea,
  maxAreaValue,
  setMaxArea,
  selectedOption,
  setSelectedOption
}: {
  minAreaValue: number | undefined
  setMinArea: (area: number | undefined) => void
  maxAreaValue: number | undefined
  setMaxArea: (area: number | undefined) => void
  setSelectedOption: (value: number) => void
  selectedOption: number
}) {
  return (
    <div className="flex h-full w-full flex-row">
      <div className="flex h-full w-[45%] flex-row items-center justify-start gap-[16px]">
        <div className="flex flex-row items-center justify-center gap-[8px]">
          <input
            onChange={() => setMinArea(minAreaValue)}
            value={minAreaValue}
            type="number"
            className="h-[32px] w-[96px] rounded-[2px] border border-bg-light bg-bg px-2 text-text focus:outline-none"
          ></input>
          <h1 className="flex items-center justify-center text-text">m²</h1>
        </div>
        <h1 className="text-text">até</h1>
        <div className="flex flex-row items-center justify-center gap-[8px]">
          <input
            onChange={() => setMaxArea(maxAreaValue)}
            value={maxAreaValue}
            type="number"
            className="h-[32px] w-[96px] rounded-[2px] border border-bg-light bg-bg px-2 text-text focus:outline-none"
          ></input>
          <h1 className="flex items-center justify-center text-text">m²</h1>
        </div>
      </div>
      <div className="flex h-full w-[55%] items-center justify-end">
        <div className="flex-rol relative flex h-full w-[90%] border border-bg-light font-roboto text-text">
          <div
            onClick={() => setSelectedOption(0)}
            className={`z-10 flex h-full w-1/3 cursor-pointer select-none items-center justify-center rounded-l-full bg-transparent transition-all duration-150 ease-in-out`}
          >
            Casa
          </div>
          <div
            onClick={() => setSelectedOption(1)}
            className={`z-10 flex h-full w-1/3 cursor-pointer select-none items-center justify-center bg-transparent transition-all duration-150 ease-in-out`}
          >
            Apartamento
          </div>
          <div
            onClick={() => setSelectedOption(2)}
            className={`z-10 flex h-full w-1/3 cursor-pointer select-none items-center justify-center rounded-r-full bg-transparent transition-all duration-150 ease-in-out`}
          >
            Terreno/Lote
          </div>
          <div
            className={`pointer-events: none bg-cinzaEscuro absolute h-full w-1/3 rounded-sm ${selectedOption == 0 ? 'left-0' : selectedOption == 1 ? 'left-1/3' : 'left-2/3'} transition-all duration-150 ease-in-out`}
          ></div>
          <div
            className={`pointer-events: none absolute h-full w-1/3 bg-border ${selectedOption == 0 ? 'left-0' : selectedOption == 1 ? 'left-1/3' : 'left-2/3'} transition-all duration-150 ease-in-out`}
          ></div>
        </div>
      </div>
    </div>
  )
}

export function NumberSelector({
  parameter,
  value,
  setValue
}: {
  parameter: string
  value: number | undefined
  setValue: (value: number | undefined) => void
}) {
  return (
    <div className="flex h-full w-fit flex-row items-start justify-start gap-[8px]">
      <div className="flex h-[24px] w-[24px] items-center justify-center text-xl">
        <FontAwesomeIcon
          icon={
            parameter === 'quartos'
              ? faBed
              : parameter === 'banheiros'
                ? faShower
                : faCar
          }
          className="text-text-muted"
        />
      </div>
      {[0, 1, 2, 3, 4].map((number) => (
        <div
          onClick={
            value == number ? () => setValue(undefined) : () => setValue(number)
          }
          style={{ userSelect: 'none' }}
          className={` ${number === value ? 'border-border bg-border text-white' : 'bg-bg-light text-text hover:border-border'} flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-full border-2 border-bg-light transition-all duration-150 ease-in-out`}
          key={number}
        >
          {number}
        </div>
      ))}
    </div>
  )
}

export function BairroTagSearch() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [filtered, setFiltered] = useState<string[]>([])

  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    if (value.trim() === '') {
      setFiltered([])
      return
    }

    const results = bairrosSP
      .filter((bairro) => bairro.toLowerCase().includes(value.toLowerCase()))
      .filter((bairro) => !selected.includes(bairro))
    setFiltered(results)
    setActiveIndex(0)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0))
    }
    if (e.key == 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1))
    }
    if (e.key == 'Enter' && activeIndex >= 0) {
      e.preventDefault()
      addBairro(filtered[activeIndex])
    }
  }

  const addBairro = (bairro: string) => {
    if (!selected.includes(bairro) && bairro.length > 0) {
      setSelected([...selected, bairro])
    }
    setQuery('')
    setFiltered([])
    setActiveIndex(-1)
    inputRef.current?.focus()
  }

  const removeBairro = (bairro: string) => {
    setSelected((prev) => prev.filter((b) => b !== bairro))
  }

  return (
    <div className="flex flex-row items-start justify-center gap-[8px]">
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="mt-[4px] text-xl text-text-muted"
      />
      <div className="flex h-full w-full flex-wrap items-center justify-start gap-[16px] px-[8px]">
        {selected.map((bairro, index) => {
          return (
            <div
              key={index}
              onClick={() => removeBairro(bairro)}
              className="group inline-flex h-[32px] cursor-pointer items-center justify-center gap-[8px] whitespace-nowrap rounded-[2px] border border-bg-light bg-bg px-[12px] py-[4px] font-roboto text-base font-light text-text"
            >
              <h1>{bairro}</h1>
              <FontAwesomeIcon
                icon={faX}
                className="text-xs font-light text-text-muted group-hover:text-text"
              />
            </div>
          )
        })}
        <div className="relative min-w-[120px] flex-grow">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Digite um bairro..."
            className="h-[32px] w-full border-0 bg-transparent font-roboto text-text focus:outline-none"
          />
          {query && filtered.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full max-w-[200px] rounded-[4px] border border-border bg-bg-light">
              {filtered.map((bairro, index) => {
                return (
                  <li
                    key={bairro}
                    onClick={() => addBairro(bairro)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`cursor-pointer px-3 py-2 ${
                      index === activeIndex ? 'bg-border' : ''
                    }`}
                  >
                    {bairro}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
