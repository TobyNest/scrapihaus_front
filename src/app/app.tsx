import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SearchPage } from './pages/searchPage'
import ResultPage from './pages/resultPage'
import { SearchProvider } from './contexts/searchContext'
import NewSearchPage from './pages/searchPage'

export function App() {
  return (
    <>
      <Router>
        <SearchProvider>
          <Routes>
            <Route path="/" element={<NewSearchPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </SearchProvider>
      </Router>
    </>
  )
}
