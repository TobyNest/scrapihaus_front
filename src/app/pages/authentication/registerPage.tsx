import BackGroundAnimatedGrid from '@/app/components/authentication/loginPage/backgroundGrid'
import ThemeToggle from '@/app/components/home/themeToggle'
import { useAuth } from '@/app/contexts/authContext'
import { faHouse, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SetStateAction, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const { register } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [full_name, setFullName] = useState('')

  const navigate = useNavigate()

  async function handleSubmit() {
    try {
      await register(full_name, email, password)
      navigate('/search')
    } catch {
      alert('Erro ao fazer login')
    }
  }

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-bg-dark font-roboto text-text">
      <div className="absolute top-0 flex h-[48px] w-full items-center justify-end"></div>
      <div className="flex h-full w-full max-w-[684px] flex-col items-center justify-center gap-[32px]">
        <ThemeToggle />
        <h1 className="m-0 flex h-min w-min items-center justify-start text-[24px] font-bold text-text">
          SCRAPIHAUS
        </h1>
        <div className="flex h-[64px] w-full flex-col items-center justify-center gap-[8px]">
          <h1 className="text-[32px] font-regular">Primeira vez por aqui?</h1>
          <h1 className="text-[16px] font-regular text-text-muted">
            Já possui cadastro?{' '}
            <span
              onClick={() => navigate('/login')}
              className="cursor-pointer text-text underline"
            >
              Acesse sua conta
            </span>{' '}
          </h1>
        </div>
        <RegisterForm
          email={email}
          password={password}
          fullname={full_name}
          setEmail={setEmail}
          setFullName={setFullName}
          setPassword={setPassword}
        />
        <div
          onClick={handleSubmit}
          className="flex h-[40px] w-[400px] cursor-pointer items-center justify-center rounded-[4px] bg-border text-[16px] font-semibold text-white transition-colors duration-150 ease-in-out hover:bg-highlight"
        >
          Registrar
        </div>
      </div>
      <div className="pointer-events-none absolute right-[-200px] top-[-200px] h-[600px] w-[600px] rounded-full bg-border opacity-50 blur-[150px]"></div>
      <div className="pointer-events-none absolute bottom-[-200px] left-[-200px] h-[600px] w-[600px] rounded-full bg-border opacity-50 blur-[150px]"></div>
    </div>
  )
}

export function OldRegisterPage() {
  // Auth
  const { register } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [full_name, setFullName] = useState('')

  const navigate = useNavigate()

  async function handleSubmit() {
    try {
      await register(full_name, email, password)
      navigate('/search')
    } catch {
      alert('Erro ao fazer login')
    }
  }

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
      <div className="left-1/3 top-[28%] flex h-max w-max flex-col gap-8">
        <RegisterTitle />
        <RegisterForm
          setFullName={setFullName}
          fullname={full_name}
          setEmail={setEmail}
          email={email}
          password={password}
          setPassword={setPassword}
        />
        <RegisterButtons handleSubmit={handleSubmit} />
      </div>
      <BackGroundAnimatedGrid squareSize={30} />
    </div>
  )
}

export function RegisterTitle() {
  return (
    <div
      className={`z-10 flex h-full w-full flex-col items-center rounded-sm bg-white px-8 py-6 font-fredoka shadow-sombraPadrao`}
    >
      <div className="text-cinzaEscuro flex h-max w-full flex-col items-start justify-center">
        <h1 className="text-3xl">Registre-se</h1>
        <p className="text-md mt-2 text-gray-400">
          Por favor registre-se para acessar todas as funcionalidades!
        </p>
      </div>
    </div>
  )
}

type RegisterFormProps = {
  email: string
  password: string
  fullname: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
  setFullName: React.Dispatch<React.SetStateAction<string>>
  setPassword: React.Dispatch<React.SetStateAction<string>>
}

export function RegisterForm({
  email,
  password,
  fullname,
  setFullName,
  setEmail,
  setPassword
}: RegisterFormProps) {
  return (
    <div className="item-center flex h-[136px] w-full flex-col items-center justify-center gap-[8px] px-12 py-16">
      {['Seu Nome', 'E-mail', 'Senha'].map((placeholder) => {
        return (
          <form>
            <input
              onChange={(e) =>
                placeholder == 'E-mail'
                  ? setEmail(e.target.value)
                  : placeholder == 'Seu Nome'
                    ? setFullName(e.target.value)
                    : setPassword(e.target.value)
              }
              value={
                placeholder == 'E-mail'
                  ? email
                  : placeholder == 'Seu Nome'
                    ? fullname
                    : password
              }
              className="placeholder:font-extra-light h-[48px] w-[400px] rounded-[4px] bg-bg bg-opacity-60 px-[12px] py-[16px] text-text outline-none placeholder:text-[16px] placeholder:text-text-muted focus:border-border focus:outline-none"
              type={placeholder === 'Senha' ? 'password' : 'text'}
              placeholder={placeholder}
              key={placeholder}
            ></input>
          </form>
        )
      })}
    </div>
  )
}

export function RegisterButtons({
  handleSubmit
}: {
  handleSubmit: () => Promise<void>
}) {
  const navigate = useNavigate()

  return (
    <div className="h-15 z-10 flex w-full flex-row gap-8">
      <div
        onClick={() => navigate('/login')}
        className="border-cinzaBordas text-cinzaEscuro group flex min-h-12 w-60 cursor-pointer items-center justify-center rounded-sm bg-white text-xl shadow-sombraPadrao transition-all duration-150 ease-in-out"
      >
        <div>Já sou cadastrado</div>
        <div className="text-cinzEscuro ml-2 h-6 w-0 translate-x-[20px] text-white opacity-0 transition-all duration-300 ease-in-out group-hover:w-6 group-hover:translate-x-0 group-hover:opacity-100">
          <FontAwesomeIcon
            className="text-cinzaEscuro mb-[0.5]"
            icon={faUser}
          />
        </div>
      </div>
      <div
        onClick={handleSubmit}
        className="group flex min-h-12 w-60 cursor-pointer items-center justify-center rounded-sm bg-black text-xl font-semibold text-white transition-all duration-150 ease-in-out"
      >
        <div>Registrar</div>
        <div className="ml-2 h-6 w-0 translate-x-[20px] text-white opacity-0 transition-all duration-300 ease-in-out group-hover:w-6 group-hover:translate-x-0 group-hover:opacity-100">
          <FontAwesomeIcon className="mb-[1.5px]" icon={faHouse} />
        </div>
      </div>
    </div>
  )
}
