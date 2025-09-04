import { User } from '@/app/types/user'
import {
  faCircleUser,
  faRightFromBracket,
  faUserAstronaut,
  faWebAwesome,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons/faUserAlt'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons/faUserCircle'
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
  const navigate = useNavigate()
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const userInitials = user
    ? user.full_name.charAt(0).toUpperCase() +
      user.full_name.charAt(1).toUpperCase()
    : null

  const menuOptions = ['e-mail']

  return (
    <div
      onClick={() => setIsPopupOpen(!isPopupOpen)}
      className={` ${isPopupOpen ? 'bg-bg-light' : 'cursor-pointer bg-transparent'} ml-[8px] mr-[8px] flex h-[60px] w-full flex-row items-center justify-center gap-[8px] rounded-[8px] pl-[16px] hover:bg-bg`}
    >
      <div className="flex h-[40px] w-[48px] cursor-pointer items-center justify-start rounded-full bg-bg-light duration-300 ease-in-out">
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
          <div className="absolute left-[8px] top-[9%] z-[99] flex w-[16%] flex-col rounded-[8px] border border-black bg-bg px-[8px] py-[8px]">
            <MenuOption value={'Minha conta'} icon={faCircleUser} />
            <MenuOption value={'Fazer upgrade de plano'} icon={faWebAwesome} />
            <div className="h-[1px] w-full bg-bg-light"></div>
            <MenuOption
              value={'Sair'}
              icon={faRightFromBracket}
              onClick={logout}
            />
          </div>
        </div>
      ) : null}
    </div>
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
    <div className="flex h-[48px] w-full flex-row items-center rounded-[8px] transition-all duration-200 ease-in-out hover:bg-bg-light">
      <FontAwesomeIcon
        icon={icon}
        className="text-light h-[20px] w-[20%] p-[4px] text-[8px] text-text"
      />
      <h1 className="flex h-full w-full items-center text-[16px] text-text">
        {value}
      </h1>
    </div>
  )
}
