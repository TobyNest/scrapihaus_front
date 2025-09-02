// context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react'
import { User } from '../types/user'
import { environments } from '@/utils/env/enviroments'
import { useLocation, useNavigate } from 'react-router-dom'

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (
    full_name: string,
    email: string,
    password: string
  ) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  // Valida usuário salvo no localStorage
  useEffect(() => {
    async function validateUser() {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        try {
          const validUser = await me(parsedUser.access_token)
          setUser(validUser) // apenas atualiza estado
        } catch {
          localStorage.removeItem('user')
          setUser(null)
        }
      }
      setLoading(false)
    }

    validateUser()
  }, [])

  // Redireciona se estiver logado em rota pública
  useEffect(() => {
    if (loading) return

    const publicRoutes = ['/', '/login', '/results']
    if (publicRoutes.includes(location.pathname) && user) {
      navigate('/search', { replace: true })
    }
  }, [location.pathname, user, loading, navigate])

  // Função que valida token no backend
  async function me(access_token: string): Promise<User> {
    const meRes = await fetch(`${environments.backendUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${access_token}` }
    })

    if (!meRes.ok) throw new Error('Token inválido')

    const meData = await meRes.json()

    return {
      full_name: meData.full_name,
      email: meData.email,
      access_token
    }
  }

  // Função de login
  async function login(email: string, password: string) {
    const res = await fetch(`${environments.backendUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (!res.ok) throw new Error('Login failed')

    const data = await res.json()

    const newUser = await me(data.access_token) // valida
    setUser(newUser)
    localStorage.setItem('user', JSON.stringify(newUser)) // grava no storage
  }

  // Função de registro
  async function register(full_name: string, email: string, password: string) {
    const res = await fetch(`${environments.backendUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name, email, password })
    })

    if (!res.ok) throw new Error('Registration failed')

    // depois de registrar, já loga
    await login(email, password)
  }

  // Logout
  function logout() {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook para acessar o contexto
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
