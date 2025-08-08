import { Outlet } from 'react-router-dom'
import { SearchProvider } from '../contexts/searchContext'

export function SearchWrapper() {
  return (
    <SearchProvider>
      <Outlet />
    </SearchProvider>
  )
}
