import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ResultPage from './pages/resultPage'
import { SearchProvider } from './contexts/searchContext'
import SearchPage from './pages/searchPage'
import LoginPage from './pages/authentication/loginPage'

export function App() {
  return (
    <>
      <Router basename="/scrapihaus_front/">
        <SearchProvider>
          <Routes>
            
            <Route path="/" element={<SearchPage />} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </SearchProvider>
      </Router>
    </>
  )
}
