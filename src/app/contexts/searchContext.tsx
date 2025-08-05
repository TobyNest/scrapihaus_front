// src/contexts/HousingContext.tsx
import { createContext, useContext, useState } from 'react'
import { Housing } from '../types/housing'
import { SearchParams } from '../types/searchParams'
import { environments } from '@/utils/env/enviroments'

type SearchController = {
  housings: Housing[]
  loading: boolean
  error: string | null
  buscarHousings: (params: SearchParams) => Promise<void>
}

const SearchContext = createContext<SearchController | undefined>(undefined)

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [housings, setHousings] = useState<Housing[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function buscarHousings(params: SearchParams) {
    setLoading(true)
    setError(null)

    try {
      // Remove campos undefined, null ou vazios e transforma tudo em string
      const filteredParams = Object.fromEntries(
        Object.entries(params)
          .filter(([_, v]) => v !== undefined && v !== null && v !== '')
          .map(([key, value]) => [key, String(value)])
      )

      const query = new URLSearchParams(filteredParams).toString()

      const response = await fetch(`${environments.backendUrl}?${query}`, {
        method: 'GET'
      })

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

  return (
    <SearchContext.Provider
      value={{ housings, loading, error, buscarHousings }}
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
