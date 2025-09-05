import ThemeToggle from '@/app/components/home/themeToggle'
import ScrapihausLogo from '@/app/components/logo/scrapihauslogo'
import { useAuth } from '@/app/contexts/authContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()

  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit() {
    try {
      await login(email, password)
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
        <div onClick={() => navigate('/')} className="cursor-pointer">
          <ScrapihausLogo />
        </div>
        <div className="flex h-[64px] w-full flex-col items-center justify-center gap-[8px]">
          <h1 className="text-[32px] font-regular">Bom te ver por aqui!</h1>
          <h1 className="text-[16px] font-regular text-text-muted">
            Não possui uma conta?{' '}
            <span
              onClick={() => navigate('/register')}
              className="cursor-pointer text-text underline"
            >
              Registre-se gratuitamente
            </span>{' '}
          </h1>
        </div>
        <LoginForm
          setEmail={setEmail}
          email={email}
          password={password}
          setPassword={setPassword}
        />
        <div
          onClick={handleSubmit}
          className="flex h-[40px] w-[400px] cursor-pointer items-center justify-center rounded-[4px] bg-border text-[16px] font-semibold text-white transition-colors duration-150 ease-in-out hover:bg-highlight"
        >
          Entrar
        </div>
      </div>
      <div className="pointer-events-none absolute right-[-200px] top-[-200px] h-[600px] w-[600px] rounded-full bg-border opacity-50 blur-[150px]"></div>
      <div className="pointer-events-none absolute bottom-[-200px] left-[-200px] h-[600px] w-[600px] rounded-full bg-border opacity-50 blur-[150px]"></div>
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
    <div className="item-center flex h-[136px] w-full flex-col items-center justify-center gap-[8px] px-12 py-16">
      {['E-mail', 'Senha'].map((placeholder) => {
        return (
          <form>
            <input
              onChange={(e) =>
                placeholder == 'E-mail'
                  ? setEmail(e.target.value)
                  : setPassword(e.target.value)
              }
              value={placeholder == 'E-mail' ? email : password}
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
