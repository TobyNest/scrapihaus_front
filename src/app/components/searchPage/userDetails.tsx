import { User } from '@/app/types/user'
import { useNavigate } from 'react-router-dom'

export default function UserDetails({ user }: { user: User | null }) {
  const navigate = useNavigate()

  return (
    <div className="flex h-[32px] w-full flex-row gap-[8px] pl-[16px]">
      <div
        onClick={() => {
          !user ? navigate('/login') : navigate('/profile')
        }}
        className="h-[40px] w-[48px] cursor-pointer rounded-full bg-bg-light transition-colors duration-300 ease-in-out hover:bg-highlight"
      ></div>
      <div className="flex h-[32px] w-full flex-col">
        <h1 className="text-[16px] font-bold text-text">
          {user?.full_name || 'Nome usuario'}
        </h1>
        <h1 className="text-[12px] font-extralight text-text-muted">
          {user?.email || 'email@email.com'}
        </h1>
      </div>
    </div>
  )
}
