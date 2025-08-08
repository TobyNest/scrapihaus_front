// context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react'
import { User } from '../types/user'
import { environments } from '@/utils/env/enviroments'

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

  // Carregar usuário do localStorage no início
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Função de login
  async function login(email: string, password: string) {
    const res = await fetch(`${environments.backendUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (!res.ok) throw new Error('Login failed')

    const data = await res.json()

    // Buscar dados do usuário
    const meRes = await fetch(`${environments.backendUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${data.access_token}` }
    })
    const meData = await meRes.json()

    const newUser: User = {
      full_name: meData.full_name,
      email: meData.email,
      access_token: data.access_token
    }

    setUser(newUser)
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  // Função de registro
  async function register(full_name: string, email: string, password: string) {
    const res = await fetch(`${environments.backendUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name, email, password })
    })

    if (!res.ok) throw new Error('Registration failed')

    // Já loga após registrar
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
