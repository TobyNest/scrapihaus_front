// src/contexts/HousingContext.tsx
import { createContext, useContext, useState } from 'react'
import { Housing } from '../types/housing'
import { SearchParams } from '../types/searchParams'
import { environments } from '@/utils/env/enviroments'
import { History } from '../types/history'
import { useAuth } from './authContext' // para pegar o token do usuário logado

type SearchController = {
  housings: Housing[]
  searches: History[] // histórico do usuário
  loading: boolean
  error: string | null
  buscarHousings: (params: SearchParams) => Promise<void>
  fetchMySearches: () => Promise<void>
}

const SearchContext = createContext<SearchController | undefined>(undefined)

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [housings, setHousings] = useState<Housing[]>([])
  const [searches, setSearches] = useState<History[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { user } = useAuth()

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

      const response = await fetch(
        `${environments.backendUrl}/housings/?${query}`,
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${user?.access_token}` }
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

  async function fetchMySearches() {
    if (!user) return // só busca se estiver logado

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${environments.backendUrl}/my-searches`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${user.access_token}` }
      })

      if (!res.ok) throw new Error('Erro ao buscar histórico')

      const data: History[] = await res.json()
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
        buscarHousings,
        fetchMySearches
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
