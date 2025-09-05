import { User } from '@/app/types/user'
import {
  faCircleUser,
  faRightFromBracket,
  faWebAwesome,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserDetails({
  user,
  logout
}: {
  user: User | null
  logout: () => void
}) {
  return (
    <>
      {user ? <LoggedMenu user={user} logout={logout} /> : <NotLoggedButtons />}
    </>
  )
}

function MenuOption({
  value,
  icon,
  onClick
}: {
  value: string | undefined
  icon: IconDefinition
  onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      className="flex h-[40px] w-full flex-row items-center rounded-[8px] text-text-muted transition-all duration-200 ease-in-out hover:bg-border hover:text-text"
    >
      <FontAwesomeIcon
        icon={icon}
        className="h-[20px] w-[20%] p-[2px] text-[8px]"
      />
      <h1 className="flex h-full w-full items-center text-[16px]">{value}</h1>
    </div>
  )
}

function LoggedMenu({
  user,
  logout
}: {
  user: User | null
  logout: () => void
}) {
  const navigate = useNavigate()
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  function HandleLogout() {
    logout()
    navigate('/')
  }

  const userInitials = user
    ? user.full_name.charAt(0).toUpperCase() +
      user.full_name.charAt(1).toUpperCase()
    : null

  return (
    <div
      onClick={() => setIsPopupOpen(!isPopupOpen)}
      className={` ${isPopupOpen ? 'bg-bg-dark' : 'cursor-pointer bg-transparent'} mr-[8px] flex h-[60px] w-full flex-row items-center justify-center gap-[8px] rounded-[8px] pl-[16px] hover:bg-bg-light`}
    >
      <div className="flex h-[40px] w-[48px] items-center justify-center rounded-full bg-bg duration-300 ease-in-out">
        {userInitials}
      </div>
      <div className="items-justify-center flex w-full flex-col justify-start">
        <h1 className="text-[16px] font-bold text-text">
          {user?.full_name || 'Nome usuario'}
        </h1>
        <h1 className="text-[12px] font-extralight text-text-muted">
          Conta básica
        </h1>
      </div>
      {isPopupOpen ? (
        <div className="text-roboto absolute left-0 top-0 z-[90] h-screen w-screen cursor-pointer">
          <div className="absolute left-[8px] top-[8%] z-[99] flex w-[16%] flex-col gap-[8px] rounded-[8px] bg-bg-light px-[8px] py-[8px]">
            <MenuOption value={'Minha conta'} icon={faCircleUser} />
            <MenuOption value={'Fazer upgrade de plano'} icon={faWebAwesome} />
            <div className="h-[1px] w-full bg-bg"></div>
            <MenuOption
              value={'Sair'}
              icon={faRightFromBracket}
              onClick={HandleLogout}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}

function NotLoggedButtons() {
  const navigate = useNavigate()

  return (
    <div className="flex h-[40px] w-[90%] flex-row gap-[8px]">
      <div
        onClick={() => navigate('/login')}
        className="flex h-full w-[30%] cursor-pointer items-center justify-center rounded-[4px] bg-text text-bg-dark hover:bg-text-muted"
      >
        Entrar
      </div>
      <div
        onClick={() => navigate('/register')}
        className="flex h-[40px] w-full cursor-pointer items-center justify-center rounded-[4px] border border-bg-light text-text hover:bg-bg"
      >
        Cadastre-se gratuitamente
      </div>
    </div>
  )
}
