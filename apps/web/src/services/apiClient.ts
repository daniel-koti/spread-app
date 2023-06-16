import { setupAPIClient } from './api'

// Object for browsers requesting (not SSR)
export const api = setupAPIClient()
