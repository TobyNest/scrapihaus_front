import { FormValidationError } from "@/app/errors/FormValidationError"


/**
 * Traduz mensagens de erro vindas da API para mensagens amigáveis
 * @param apiMessage Mensagem crua vinda do backend
 * @returns Um FormValidationError mais claro para a UI
 */
export function translateApiError(apiMessage: string): FormValidationError {
  switch (apiMessage) {
    // 🔹 Auth/Login
    case 'Incorrect email or password':
      return new FormValidationError('Credenciais incorretas.', 'password')

    case 'Could not validate credentials':
      return new FormValidationError('Sessão expirada. Faça login novamente.', undefined)

    case 'Inactive user':
      return new FormValidationError('Sua conta está desativada.', undefined)

    // 🔹 Auth/Register
    case 'Email already registered':
      return new FormValidationError('Este e-mail já está cadastrado.', 'email')

    case 'Email and password cannot be empty':
      return new FormValidationError('Preencha todos os campos.', undefined)

    case 'Password must be at least 6 characters long and contain at least one number and one special character':
      return new FormValidationError(
        'A senha deve ter pelo menos 6 caracteres, incluir um número e um caractere especial.',
        'password'
      )

    // 🔹 Housings
    case 'Free request quota exceeded; please register or login':
      return new FormValidationError(
        'Limite de pesquisas gratuitas atingido. Crie uma conta ou faça login.',
        undefined
      )

    case 'quartos must be a non-negative integer':
      return new FormValidationError('O número de quartos deve ser positivo.', 'quartos')

    case 'banheiros must be a non-negative integer':
      return new FormValidationError('O número de banheiros deve ser positivo.', 'banheiros')

    case 'vagas_garagem must be a non-negative integer':
      return new FormValidationError('O número de vagas deve ser positivo.', 'vagas_garagem')

    case 'area_min must be a non-negative float':
      return new FormValidationError('Área mínima deve ser um número positivo.', 'area_min')

    case 'area_max must be a non-negative float':
      return new FormValidationError('Área máxima deve ser um número positivo.', 'area_max')

    case 'area_min cannot be greater than area_max':
      return new FormValidationError('Área mínima não pode ser maior que a área máxima.', undefined)

    // 🔹 Admin
    case 'User not found':
      return new FormValidationError('Usuário não encontrado.', undefined)

    case 'Admin privileges required':
      return new FormValidationError('Acesso negado. Permissão de administrador necessária.', undefined)

    case 'Search history not found':
      return new FormValidationError('Histórico de pesquisa não encontrado.', undefined)

    // 🔹 Fallback
    default:
      return new FormValidationError('Erro inesperado. Tente novamente mais tarde.', undefined)
  }
}