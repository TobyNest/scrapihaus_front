import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SearchPage } from './pages/searchPage'

export function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </>
  )
}
