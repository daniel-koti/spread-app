import { getAPIClient } from './axios'

// Object for browsers requesting (not SSR)
export const api = getAPIClient()
