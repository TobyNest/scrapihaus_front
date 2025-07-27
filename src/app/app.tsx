import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SearchPage } from './pages/searchPage'
import ResultPage from './pages/resultPage'

export function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </>
  )
}
