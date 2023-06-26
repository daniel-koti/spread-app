import { ReactNode, createContext, useEffect, useState } from 'react'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { api } from '@/services/apiClient'

import Router, { useRouter } from 'next/router'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export interface User {
  id?: string
  name?: string
  email: string
  amount?: number
  wallet_id?: string
  phone?: number
  isCompany?: boolean
  type?: 'PRODUCER' | 'ADMIN' | 'USER'
  nif?: string
  status?: 'ENABLED' | 'DISABLED'
}

interface SignInProps {
  email: string
  password: string
}

interface AuthContextProps {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  signIn: (data: SignInProps) => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function signOut() {
  destroyCookie(undefined, '@spread.token')
  destroyCookie(undefined, 'refreshToken')
  Router.push('/signin')
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const isAuthenticated = !!user

  /**
   * * Preciso que toda vez que a aplicação é recarregada,
   * * Os dados do usuário sejam carregados novamente
   */

  useEffect(() => {
    const { '@spread.token': token } = parseCookies()

    if (token) {
      api
        .get('/me')
        .then((response) => {
          const { user } = response.data

          setUser({
            ...user,
          })
        })
        .catch(() => {
          signOut()
        })
    }
  }, [])

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post(`/sessions`, { email, password })

      const { token } = response.data

      setCookie(undefined, '@spread.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 Days
        path: '/',
      })

      setUser({
        email,
      })

      api.defaults.headers.Authorization = `Bearer ${token}`

      await router.push('/')
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error('Credenciais inválidas')
      } else {
        toast.error('Não foi possível autenticar. Tente mais tarde')
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
