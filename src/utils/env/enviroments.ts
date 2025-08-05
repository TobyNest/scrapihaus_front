import { STAGE } from '../enums/stage'

type Environments = {
  backendUrl: string
  apiUrl: string
  stage: STAGE
}

export const environments: Environments = {
  backendUrl: import.meta.env.VITE_BACKEND_URL,
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  stage: (import.meta.env.VITE_STAGE as STAGE) || STAGE.TEST
}
