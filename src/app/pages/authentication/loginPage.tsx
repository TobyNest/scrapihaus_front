import BackGroundAnimatedGrid from '@/app/components/authentication/loginPage/backgroundGrid'
import { useAuth } from '@/app/contexts/authContext'
import { faHouse, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  // Auth
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  async function handleSubmit() {
    try {
      await login(email, password)
      navigate('/search')
    } catch {
      alert('Erro ao fazer login')
    }
  }

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
      <div className="left-1/3 top-[28%] flex h-max w-max flex-col gap-8">
        <LoginTitle />
        <LoginForm
          setEmail={setEmail}
          email={email}
          password={password}
          setPassword={setPassword}
        />
        <LoginButtons handleSubmit={handleSubmit} />
      </div>
      <BackGroundAnimatedGrid squareSize={30} />
    </div>
  )
}

export function LoginTitle() {
  return (
    <div
      className={`z-10 flex h-full w-full flex-col items-center rounded-sm bg-white px-8 py-6 font-fredoka shadow-sombraPadrao`}
    >
      <div className="flex h-max w-full flex-col items-start justify-center text-cinzaEscuro">
        <h1 className="text-3xl">Login</h1>
        <p className="text-md mt-2 text-gray-400">
          Faça o login para acessar todas as funcionalidades!{' '}
        </p>
      </div>
    </div>
  )
}

type LoginFormProps = {
  email: string
  password: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
  setPassword: React.Dispatch<React.SetStateAction<string>>
}

export function LoginForm({
  email,
  password,
  setEmail,
  setPassword
}: LoginFormProps) {
  return (
    <div
      className={`z-10 flex h-full w-full flex-col items-center rounded-sm bg-white p-8 font-fredoka shadow-sombraPadrao`}
    >
      <form className="h-max w-full">
        <label htmlFor="email">
          <h1 className="text-md text-gray-500">E-MAIL:</h1>
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          id="email"
          className="h-10 w-full py-2 outline-none placeholder:text-gray-300"
          placeholder="email@email.com.br"
        ></input>
        <label htmlFor="password">
          <h1 className="text-md mt-4 text-gray-500">SENHA:</h1>
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="h-10 w-full py-2 outline-none placeholder:text-gray-300"
          placeholder="senha"
        ></input>
      </form>
    </div>
  )
}

export function LoginButtons({
  handleSubmit
}: {
  handleSubmit: () => Promise<void>
}) {
  const navigate = useNavigate()

  return (
    <div className="h-15 z-10 flex w-full flex-row gap-8">
      <div
        onClick={() => navigate('/register')}
        className="group flex min-h-12 w-60 cursor-pointer items-center justify-center rounded-sm border-cinzaBordas bg-white text-xl text-cinzaEscuro shadow-sombraPadrao transition-all duration-150 ease-in-out"
      >
        <div>Não tenho conta</div>
        <div className="text-cinzEscuro ml-2 h-6 w-0 translate-x-[20px] text-white opacity-0 transition-all duration-300 ease-in-out group-hover:w-6 group-hover:translate-x-0 group-hover:opacity-100">
          <FontAwesomeIcon
            className="mb-[0.5] text-cinzaEscuro"
            icon={faUser}
          />
        </div>
      </div>
      <div
        onClick={handleSubmit}
        className="group flex min-h-12 w-60 cursor-pointer items-center justify-center rounded-sm bg-black text-xl font-semibold text-white transition-all duration-150 ease-in-out"
      >
        <div>Acessar</div>
        <div className="ml-2 h-6 w-0 translate-x-[20px] text-white opacity-0 transition-all duration-300 ease-in-out group-hover:w-6 group-hover:translate-x-0 group-hover:opacity-100">
          <FontAwesomeIcon className="mb-[1.5px]" icon={faHouse} />
        </div>
      </div>
    </div>
  )
}
