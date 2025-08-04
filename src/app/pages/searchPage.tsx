import TypeSelector from '../components/searchPage/typeSelector'
import BairroSelector from '../components/searchPage/bairroSelector'
import AreaSelector from '../components/searchPage/areaSelector'
import NumberSelector from '../components/searchPage/numberSelector'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useSearch } from '../contexts/searchContext'
import { useState } from 'react'
import { SearchParams } from '../types/searchParams'

export function SearchPage() {
  const navigate = useNavigate()
  const [selectedOption, setSelectedOption] = useState<number>(0)

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

  const { buscarHousings, loading } = useSearch()

  const [valores, setValores] = useState({
    tamanhoMin: '',
    tamanhoMax: ''
  })

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target

    // Remove tudo que não for dígito
    const somenteNumeros = value.replace(/\D/g, '')
    setValores((prev) => ({
      ...prev,
      [name]: somenteNumeros
    }))
  }

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
    <main className="flex h-screen w-full flex-col items-center justify-center bg-white">
      <div className="flex h-full w-full flex-col items-center justify-center gap-8">
        <TypeSelector
          selectedOption={selectedOption}
          setSelectedOption={handleTypeChange}
        />

        {/* box-shadow: offset-x offset-y blur spread color */}
        <div className="h-4/5 w-[45%] rounded-md p-8 shadow-[0_0_30px_0_rgba(0,0,0,0.2)]">
          <BairroSelector />

          <AreaSelector valores={valores} handleChange={handleChange} />
          <div className="mt-8" />
          <div className="flex flex-row items-center justify-between gap-2">
            <div className="flex w-[45%] flex-col gap-4">
              <NumberSelector
                title={'Quartos'}
                setNumber={updateField.bind(null, 'quartos')}
                selectedNumber={searchParams.quartos || 0}
              />

              <NumberSelector
                title={'Banheiros'}
                setNumber={updateField.bind(null, 'banheiros')}
                selectedNumber={searchParams.banheiros || 0}
              />

              <NumberSelector
                title={'Vagas de Garagem'}
                setNumber={updateField.bind(null, 'vagas_garagem')}
                selectedNumber={searchParams.vagas_garagem || 0}
              />
            </div>
            <div className="h-max w-[45%] bg-black">ads</div>
          </div>
          <div className="w-600 flex items-center justify-center">
            <div
              onClick={handleSearch}
              className="group mt-8 flex h-14 w-60 cursor-pointer items-center justify-center rounded-2xl bg-black text-xl font-bold text-white transition-all duration-150 ease-in-out"
            >
              <div>Pesquisar</div>
              <div className="ml-2 h-6 w-0 translate-x-[20px] text-white opacity-0 transition-all duration-300 ease-in-out group-hover:w-6 group-hover:translate-x-0 group-hover:opacity-100">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
