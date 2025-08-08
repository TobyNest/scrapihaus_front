import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../contexts/authContext'

export function AuthWrapper() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}
