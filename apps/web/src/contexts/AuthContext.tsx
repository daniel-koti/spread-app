import { ReactNode, createContext, useEffect, useState } from 'react'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { api } from '@/services/api'
import { toast } from 'sonner'

import Router from 'next/router'
import { AxiosError } from 'axios'

export interface User {
  id: string
  name: string
  email: string
  wallet_id: string
  amount: number
  phone?: number
  company?: boolean
  nif?: string
  status?: 'ENABLED' | 'DISABLED'
}

interface SignInProps {
  email: string
  password: string
  isProducer: boolean
}

interface AuthContextProps {
  user: User | null
  isAuthenticated: boolean
  typeUser: 'client' | 'producer'
  signIn: (data: SignInProps) => Promise<void>
  signOut: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [typeUser, setTypeUser] = useState<'client' | 'producer'>('client')

  const isAuthenticated = !!user
  /**
   * * Preciso que toda vez que a aplicação é recarregada,
   * * Os dados do usuário sejam carregados novamente
   */

  useEffect(() => {
    const { 'spread.token': token } = parseCookies()
    const { 'spread.isUser': isUser } = parseCookies()

    if (token) {
      api
        .get(`${isUser === 'true' ? 'users' : 'producers'}/me`)
        .then((response) => {
          const { user } = response.data

          setUser({
            ...user,
          })

          isUser === 'true' ? setTypeUser('client') : setTypeUser('producer')
        })
        .catch(() => {
          Router.push('/signin')
        })
    }
  }, [])

  async function signIn({ email, password, isProducer }: SignInProps) {
    try {
      const response = await api.post(
        `${isProducer ? 'producers' : 'users'}/sessions`,
        { email, password },
      )

      const { token, isUser, user } = response.data

      setCookie(undefined, 'spread.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 Days
      })

      setCookie(undefined, 'spread.isUser', isUser, {
        maxAge: 60 * 60 * 30, // 30 Days
      })

      setUser({
        ...user,
      })

      isProducer ? setTypeUser('producer') : setTypeUser('client')

      api.defaults.headers.Authorization = `Bearer ${token}`

      Router.push('/')
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error('Credenciais inválidas')
      } else {
        toast.error('Não foi possível autenticar. Tente mais tarde')
      }
    }
  }

  function signOut() {
    destroyCookie(undefined, 'spread.token')
    destroyCookie(undefined, 'spread.isUser')

    setUser(null)

    Router.push('/signin')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        typeUser,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
