import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SelectorNumbers from '../components/searchPage/selector'
import { SearchParams } from '../types/searchParams'
import { useSearch } from '../contexts/searchContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass'
import TypeSelector from '../components/searchPage/typeSelector'
import BairroInput from '../components/searchPage/bairroInput'

export default function newSearchPage() {
  const navigate = useNavigate()
  const [selectedOption, setSelectedOption] = useState<number>(0)
  const { buscarHousings, loading } = useSearch()

  const handleTypeChange = (index: number) => {
    const typeOptions = ['Casa', 'Apartamento', 'Terreno/Lote']
    const selectedType = typeOptions[index]

    if (!selectedType) return // segurança para índice inválido

    setSelectedOption(index)
    setSearchParams((prev) => ({
      ...prev,
      tipo: selectedType
    }))
  }

  const [searchParams, setSearchParams] = useState<SearchParams>({
    tipo: 'Casa' // obrigatório
  })

  const updateField = <K extends keyof SearchParams>(
    key: K,
    value: SearchParams[K]
  ) => {
    setSearchParams((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSearch = async () => {
    await buscarHousings(searchParams)

    if (!loading) {
      navigate('/result')
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white font-fredoka">
      <div className="flex flex-col gap-4">
        <div className="mb-8">
          <TypeSelector
            selectedOption={selectedOption}
            setSelectedOption={handleTypeChange}
          />
        </div>

        <div className="fit flex h-fit min-h-20 min-w-[700px] flex-row rounded-sm bg-white px-8 py-6 shadow-[0_0_30px_0_rgba(0,0,0,0.2)]">
          <BairroInput
            setInput={updateField.bind(null, 'bairro')}
            input={searchParams.bairro || ''}
          />
          <div className="flex min-w-[200px] flex-col border-l-2 pl-8">
            <label htmlFor="area-minima">
              <h1 className="text-md text-gray-500">ÁREA MÍNIMA:</h1>
            </label>
            <div className="flex flex-row justify-between">
              <input
                id="area-minima"
                className="duration-50 mt-3 w-20 rounded-md border-cinzaBordas outline-none transition-all ease-in-out placeholder:text-gray-300"
                type="number"
                placeholder="Área"
              ></input>

              <div className="flex h-full w-10 items-end">m²</div>
            </div>
          </div>
          <div className="flex min-w-[200px] flex-col border-l-2 pl-8">
            <label htmlFor="area-maxima">
              <h1 className="text-md text-gray-500">ÁREA MÁXIMA:</h1>
            </label>
            <div className="flex flex-row justify-between">
              <input
                id="area-maxima"
                className="duration-50 mt-3 w-20 rounded-md border-cinzaBordas outline-none transition-all ease-in-out placeholder:text-gray-300"
                type="number"
                placeholder="Área"
              ></input>

              <div className="flex h-full w-10 items-end">m²</div>
            </div>
          </div>
        </div>
        <div className="flex min-h-20 min-w-[700px] flex-row justify-between rounded-sm bg-white px-8 py-6 shadow-[0_0_30px_0_rgba(0,0,0,0.2)]">
          <SelectorNumbers
            setSelectedNumber={updateField.bind(null, 'quartos')}
            selectedNumber={searchParams.quartos || 0}
            title={'quartos'}
          />
          <SelectorNumbers
            setSelectedNumber={updateField.bind(null, 'banheiros')}
            selectedNumber={searchParams.banheiros || 0}
            title={'banheiros'}
          />
          <SelectorNumbers
            setSelectedNumber={updateField.bind(null, 'vagas_garagem')}
            selectedNumber={searchParams.vagas_garagem || 0}
            title={'vagas de garagem'}
          />
        </div>
        <div className="w-600 flex items-center justify-center">
          <div
            onClick={handleSearch}
            className="group mt-8 flex h-12 w-60 cursor-pointer items-center justify-center rounded-sm bg-black text-xl font-semibold text-white transition-all duration-150 ease-in-out"
          >
            <div>Pesquisar</div>
            <div className="ml-2 h-6 w-0 translate-x-[20px] text-white opacity-0 transition-all duration-300 ease-in-out group-hover:w-6 group-hover:translate-x-0 group-hover:opacity-100">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
