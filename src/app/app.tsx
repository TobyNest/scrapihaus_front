import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ResultPage from './pages/resultPage'
import { SearchProvider } from './contexts/searchContext'
import SearchPage from './pages/searchPage'
import { AuthProvider } from './contexts/authContext'

export function App() {
  return (
    <>
      <Router basename="/scrapihaus_front/">
        <AuthProvider>
          <SearchProvider>
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="/result" element={<ResultPage />} />
              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </SearchProvider>
        </AuthProvider>
      </Router>
    </>
  )
}
