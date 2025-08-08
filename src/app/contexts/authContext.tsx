// context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react'
import { User } from '../types/user'
import { environments } from '@/utils/env/enviroments'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

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

  useEffect(() => {
    const publicRoutes = ['/login', '/register']

    if (publicRoutes.includes(location.pathname)) {
      return
    } else {
      navigate('/login')
      return
    }

    async function validateUser() {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)

        try {
          await me(parsedUser.access_token)
        } catch (error) {
          // Token inválido, remove e limpa usuário
          localStorage.removeItem('user')
          setUser(null)
        }
      }
      setLoading(false)
    }

    validateUser()
  }, [])

  async function me(access_token: string) {
    const meRes = await fetch(`${environments.backendUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${access_token}` }
    })

    const meData = await meRes.json()

    const newUser: User = {
      full_name: meData.full_name,
      email: meData.email,
      access_token: access_token
    }

    setUser(newUser)
    localStorage.setItem('user', JSON.stringify(newUser))
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

    me(data.access_token)
  }

  // Função de registro
  async function register(full_name: string, email: string, password: string) {
    const res = await fetch(`${environments.backendUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name, email, password })
    })
    if (!res.ok) throw new Error('Registration failed')

    const data = await res.json()

    console.log(data.access_token)

    login(email, password)
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
