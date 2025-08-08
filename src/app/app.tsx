import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ResultPage from './pages/resultPage'
import SearchPage from './pages/searchPage'
import LoginPage from './pages/authentication/loginPage'
import RegisterPage from './pages/authentication/registerPage'
import HomePage from './pages/homepage'
import { AuthWrapper } from './layouts/authwrapper'
import { SearchWrapper } from './layouts/searchWrapper'

export function App() {
  return (
    <>
      <Router basename="/scrapihaus_front/">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<AuthWrapper />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/search" element={<SearchWrapper />}>
              <Route index element={<SearchPage />} />
              <Route path="result" element={<ResultPage />} />
            </Route>
          </Route>

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </>
  )
}
