// src/contexts/HousingContext.tsx
import { createContext, useContext, useState } from 'react'
import { Housing } from '../types/housing'
import { SearchParams } from '../types/searchParams'
import { environments } from '@/utils/env/enviroments'
import { HousingHistory } from '../types/history'
import { User } from '../types/user'

type SearchController = {
  housings: Housing[]
  searches: HousingHistory[]
  loading: boolean
  error: string | null
  searchParams: SearchParams
  selectedOption: number
  updateField: <K extends keyof SearchParams>(
    key: K,
    value: SearchParams[K]
  ) => void
  handleTypeChange: (index: number) => void
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>
  buscarHousings: (params: SearchParams, user: User | null) => Promise<void>
  fetchMySearches: (access_token: string) => Promise<void>
  isResultPage?: boolean
  setIsResultPage: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchContext = createContext<SearchController | undefined>(undefined)

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [housings, setHousings] = useState<Housing[]>([])
  const [searches, setSearches] = useState<HousingHistory[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [isResultPage, setIsResultPage] = useState(false)

  // 🔎 estados que estavam no componente
  const [searchParams, setSearchParams] = useState<SearchParams>({
    tipo: 'Casa' // valor padrão
  })
  const [selectedOption, setSelectedOption] = useState<number>(0)

  // Atualiza qualquer campo de SearchParams
  const updateField = <K extends keyof SearchParams>(
    key: K,
    value: SearchParams[K]
  ) => {
    setSearchParams((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  // Troca o tipo de imóvel (Casa, Apartamento, etc.)
  const handleTypeChange = (index: number) => {
    const typeOptions = ['Casa', 'Apartamento', 'Terreno/Lote']
    const selectedType = typeOptions[index]

    if (!selectedType) return
    setSelectedOption(index)
    setSearchParams((prev) => ({
      ...prev,
      tipo: selectedType
    }))
  }

  // 🔍 pesquisa de imóveis
  async function buscarHousings(params: SearchParams, user: User | null) {
    setLoading(true)
    setError(null)

    try {
      // Filtra apenas os parâmetros válidos
      const filteredParams: Record<string, any> = Object.fromEntries(
        Object.entries(params).filter(
          ([_, v]) => v !== undefined && v !== null && v !== ''
        )
      )

      // Constrói a query string
      const query = new URLSearchParams()

      for (const [key, value] of Object.entries(filteredParams)) {
        if (key === 'bairros' && Array.isArray(value)) {
          value.forEach((bairro) => query.append('bairro', bairro))
        } else {
          query.append(key, String(value))
        }
      }

      const response = await fetch(
        `${environments.backendUrl}/housings/?${query.toString()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(user ? { Authorization: `Bearer ${user.access_token}` } : {})
          }
        }
      )

      if (!response.ok) throw new Error('Erro ao realizar pesquisa')

      const data: Housing[] = await response.json()
      setHousings(data)
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido')
      setHousings([])
    } finally {
      setLoading(false)
    }
  }

  // 🔁 histórico de buscas
  async function fetchMySearches(access_token: string) {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${environments.backendUrl}/my-searches`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${access_token}` }
      })

      if (!res.ok) throw new Error('Erro ao buscar histórico')

      const data: HousingHistory[] = await res.json()
      setSearches(data)
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido')
      setSearches([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <SearchContext.Provider
      value={{
        housings,
        searches,
        loading,
        error,
        searchParams,
        selectedOption,
        updateField,
        handleTypeChange,
        setSearchParams,
        buscarHousings,
        fetchMySearches,
        isResultPage,
        setIsResultPage
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch deve ser usado dentro de um SearchProvider')
  }
  return context
}
