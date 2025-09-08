import ThemeToggle from '@/app/components/home/themeToggle'
import ScrapihausLogo from '@/app/components/logo/scrapihauslogo'
import { useAuth } from '@/app/contexts/authContext'
import { FormValidationError } from '@/app/errors/FormValidationError'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const { register, loading } = useAuth()

  const navigate = useNavigate()

  const [full_name, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({})
  const [generalError, setGeneralError] = useState<string | null>(null)

  // Requisitos de senha
  const passwordRequirements = [
    {
      id: 'length',
      label: 'Mínimo de 6 caracteres',
      isValid: password.length >= 6
    },
    {
      id: 'number',
      label: 'Ao menos um número',
      isValid: /\d/.test(password)
    },
    {
      id: 'special',
      label: 'Ao menos um caractere especial',
      isValid: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    }
  ]

  const handleChange = (field: string, value: string) => {
    if (field === 'full_name') setFullName(value)
    if (field === 'email') setEmail(value)
    if (field === 'password') setPassword(value)

    // Limpa erros do campo enquanto digita
    setFieldErrors((prev) => ({ ...prev, [field]: '' }))
    setGeneralError(null)
  }

  const handleSubmit = async (): Promise<void> => {
    // Valida campos sem chamar API
    const errors: { [key: string]: string } = {}
    if (!full_name) errors.full_name = 'Nome não pode ser vazio'
    if (!email) errors.email = 'E-mail não pode ser vazio'
    if (!password) errors.password = 'Senha não pode ser vazia'

    passwordRequirements.forEach((req) => {
      if (!req.isValid) errors.password = 'Senha não atende os requisitos'
    })

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    try {
      await register(full_name, email, password)
    } catch (err: any) {
      if (err instanceof FormValidationError) {
        if (err.field) {
          setFieldErrors((prev) => ({ ...prev, [err.field!]: err.message }))
        } else {
          setGeneralError(err.message)
        }
      } else {
        setGeneralError('Erro inesperado. Tente novamente.')
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
        <div className="flex h-[96px] w-full flex-col items-center justify-center gap-[8px]">
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
          full_name={full_name}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
          fieldErrors={fieldErrors}
          generalError={generalError}
          passwordRequirements={passwordRequirements}
        />
      </div>
      <div className="pointer-events-none absolute right-[-200px] top-[-200px] h-[600px] w-[600px] rounded-full bg-border opacity-50 blur-[150px]"></div>
      <div className="pointer-events-none absolute bottom-[-200px] left-[-200px] h-[600px] w-[600px] rounded-full bg-border opacity-50 blur-[150px]"></div>
    </div>
  )
}

type RegisterFormProps = {
  email: string
  password: string
  full_name: string
  handleSubmit(): Promise<void>
  loading: boolean
  fieldErrors: { [key: string]: string }
  generalError: string | null
  passwordRequirements: { id: string; label: string; isValid: boolean }[]
  handleChange: (field: string, value: string) => void
}

export function RegisterForm({
  email,
  password,
  full_name,
  handleSubmit,
  handleChange,
  loading,
  fieldErrors,
  generalError,
  passwordRequirements
}: RegisterFormProps) {
  const allRequirementsValid = passwordRequirements.every((req) => req.isValid)

  return (
    <div className="item-center flex w-full flex-col items-center justify-center">
      <form
        className="flex w-full flex-col items-center justify-center gap-[12px]"
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        {generalError && <p className="text-red-500">{generalError}</p>}

        <input
          value={full_name}
          onChange={(e) => handleChange('full_name', e.target.value)}
          className={`h-[48px] w-[400px] rounded bg-bg bg-opacity-60 px-3 text-text outline-none placeholder:text-[16px] placeholder:text-text-muted focus:border-border ${
            fieldErrors.full_name ? 'border border-red-500' : ''
          }`}
          placeholder="Seu Nome"
          type="text"
        />
        {fieldErrors.full_name && (
          <p className="text-sm text-red-500">{fieldErrors.full_name}</p>
        )}

        <input
          value={email}
          onChange={(e) => handleChange('email', e.target.value)}
          className={`h-[48px] w-[400px] rounded bg-bg bg-opacity-60 px-3 text-text outline-none placeholder:text-[16px] placeholder:text-text-muted focus:border-border ${
            fieldErrors.email ? 'border border-red-500' : ''
          }`}
          placeholder="E-mail"
          type="email"
        />
        {fieldErrors.email && (
          <p className="text-sm text-red-500">{fieldErrors.email}</p>
        )}

        <input
          value={password}
          onChange={(e) => handleChange('password', e.target.value)}
          className={`h-[48px] w-[400px] rounded bg-bg bg-opacity-60 px-3 text-text outline-none placeholder:text-[16px] placeholder:text-text-muted focus:border-border ${
            fieldErrors.password ? 'border border-red-500' : ''
          }`}
          placeholder="Senha"
          type="password"
        />
        {fieldErrors.password && (
          <p className="text-sm text-red-500">{fieldErrors.password}</p>
        )}

        {/* Lista de requisitos */}
        <div
          className={`mt-2 flex flex-col gap-1 overflow-hidden transition-all duration-500 ease-in-out ${allRequirementsValid ? 'max-h-0 opacity-0' : 'max-h-40 opacity-100'}`}
        >
          <h4 className="text-sm font-semibold">Requisitos da senha:</h4>
          {passwordRequirements.map((req) => (
            <div
              key={req.id}
              className={`flex items-center gap-2 text-sm ${req.isValid ? 'text-green-500' : 'text-red-500'}`}
            >
              <FontAwesomeIcon icon={req.isValid ? faCheck : faTimes} />{' '}
              {req.label}
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-[16px] flex h-[40px] w-[400px] items-center justify-center rounded bg-border text-[16px] font-semibold text-white transition-colors duration-150 ease-in-out hover:bg-highlight disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Cadastrando...</span>
            </div>
          ) : (
            'Registrar'
          )}
        </button>
      </form>
    </div>
  )
}
