import { FormValidationError } from '@/app/errors/FormValidationError'

/**
 * Traduz mensagens de erro vindas da API em erros amigáveis
 * para o usuário, lançando instâncias de FormValidationError.
 *
 * @param message Mensagem recebida da API (data.detail)
 * @returns FormValidationError
 */
export function translateApiError(message: string): FormValidationError {
  switch (message) {
    /**
     * LOGIN
     */
    case 'Incorrect email or password':
      return new FormValidationError('E-mail ou senha incorretos', 'password')

    case 'Inactive user':
      return new FormValidationError(
        'Este usuário está inativo. Entre em contato com o suporte.'
      )

    /**
     * REGISTRO
     */
    case 'Email already registered':
      return new FormValidationError('E-mail já cadastrado', 'email')

    case 'Password must be at least 6 characters long':
      return new FormValidationError(
        'A senha deve ter no mínimo 6 caracteres',
        'password'
      )

    case 'Password must contain at least one number':
      return new FormValidationError(
        'A senha deve conter pelo menos um número',
        'password'
      )

    case 'Password must contain at least one special character':
      return new FormValidationError(
        'A senha deve conter pelo menos um caractere especial',
        'password'
      )

    case 'Password must be at least 6 characters long and contain at least one number and one special character':
      return new FormValidationError(
        'A senha não atende os requisitos mínimos',
        'password'
      )

    /**
     * FALLBACK
     */
    default:
      return new FormValidationError(
        'Erro inesperado. Tente novamente mais tarde.'
      )
  }
}
