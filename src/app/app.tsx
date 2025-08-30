import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ResultPage from './pages/resultPage'
import SearchPage from './pages/searchPage'
import LoginPage from './pages/authentication/loginPage'
import RegisterPage from './pages/authentication/registerPage'
import HomePage from './pages/homepage'
import { AuthProvider } from './contexts/authContext'

export function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/search" element={<SearchPage />} />
            <Route path="result" element={<ResultPage />} />

            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}
