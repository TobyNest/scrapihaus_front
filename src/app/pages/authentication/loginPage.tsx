import ThemeToggle from '@/app/components/home/themeToggle'
import ScrapihausLogo from '@/app/components/logo/scrapihauslogo'
import { useAuth } from '@/app/contexts/authContext'
import { FormValidationError} from '@/app/errors/FormValidationError'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()

  const { login, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Errors
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string |undefined}>({})
  const [generalError, setGeneralError] = useState<string | null>(null)

  async function handleSubmit() {

    try{
      await login(email,password)
    } catch (err) {
      if (err instanceof FormValidationError) {
        if (err.field) {
          setFieldErrors((prev) => ({...prev, [err.field!] : err.message}))
        } else {
          setGeneralError(err.message)
        }
      } else if (err instanceof Error) {
        setGeneralError('Erro inesperado. Tente novamente mais tarde.')
      }
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
          handleSubmit={handleSubmit}
          fieldErrors={fieldErrors}
          setFieldErrors={setFieldErrors}
          generalError={generalError} loading={loading}        />
        
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
  handleSubmit(): Promise<void>
  fieldErrors: {[key:string]: string | undefined}
  generalError: string | null
  setFieldErrors: React.Dispatch<React.SetStateAction<{
    [key: string]: string | undefined;
}>>
loading: boolean
}

export function LoginForm({
  email,
  password,
  setEmail,
  setPassword,
  handleSubmit,
  fieldErrors,
  generalError,
  setFieldErrors,
  loading

}: LoginFormProps) {

  return (
    <div className="item-center flex h-[200px]  w-full flex-col items-center justify-center  ">
      <form onSubmit ={(e) => {e.preventDefault(); handleSubmit()}} className='w-full flex items-center justify-center flex-col gap-[16px]'>
      {['E-mail', 'Senha'].map((placeholder) => {

        const field = placeholder === "E-mail" ? 'email' : 'password'
        const errorMessage = fieldErrors[field]

        return (
          <div className='flex w=full flex-col'>
            <input
              onChange={(e) => {
                placeholder == 'E-mail'
                ? setEmail(e.target.value)
                : setPassword(e.target.value)

                setFieldErrors(prev => ({...prev, [field]: undefined}))
              }
                
              }
              value={placeholder == 'E-mail' ? email : password}
              className="placeholder:font-extra-light h-[48px] w-[400px] rounded-[4px] bg-bg bg-opacity-60 px-[12px] py-[16px] text-text outline-none placeholder:text-[16px] placeholder:text-text-muted focus:border-border focus:outline-none"
              type={placeholder === 'Senha' ? 'password' : 'text'}
              placeholder={placeholder}
              key={placeholder}
            ></input>
            {errorMessage && (<span className='mt-1 text-sm text-red-500'>{errorMessage}</span>)}
          </div>
            
        )
        
      }
    )
      
      }

      <button
      disabled={loading}
          type='submit'
          className={`flex h-[40px] w-[400px] mt-[16px] cursor-pointer items-center justify-center rounded-[4px] bg-border text-[16px] font-semibold text-white transition-colors duration-150 ease-in-out hover:bg-highlight ${loading && "animate-pulse"}`}
        >
          {loading ? <div className='w-full flex flex-row items-center justify-center gap-[16px]'>
            <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
            <span>Entrando...</span>
            </div> : 'Entrar'}
        </button>
        </form>
    </div>
  )
}
