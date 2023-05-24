import { ReactNode, createContext, useEffect, useState } from 'react'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { api } from '@/services/api'
import { toast } from 'sonner'

import Router from 'next/router'
import { AxiosError } from 'axios'

export interface User {
  email: string
  name: string
  wallet_id: string
  amount: number
}

interface SignInProps {
  email: string
  password: string
  isProducer: boolean
}

interface AuthContextProps {
  user: User | null
  isAuthenticated: boolean
  signIn: (data: SignInProps) => Promise<void>
  signOut: () => void
  saveNewInfoInContextUser: (data: User) => void
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = !!user

  useEffect(() => {
    async function getProfile() {
      const { 'spread.token': token } = parseCookies()
      const { 'spread.isUser': isUser } = parseCookies()

      if (token) {
        try {
          const response = await api.get(
            `${isUser === 'true' ? 'users' : 'producers'}/me`,
          )

          const { user } = response.data
          setUser(user)
        } catch (err) {
          Router.push('/signin')
        }
      }
    }

    getProfile()
  }, [])

  async function signIn({ email, password, isProducer }: SignInProps) {
    try {
      const { data } = await api.post(
        `${isProducer ? 'producers' : 'users'}/sessions`,
        { email, password },
      )

      setCookie(undefined, 'spread.token', data.token, {
        maxAge: 60 * 60 * 24 * 30, // 30 Days
      })

      setCookie(undefined, 'spread.isUser', data.isUser, {
        maxAge: 60 * 60 * 30, // 30 Days
      })

      api.defaults.headers.Authorization = `Bearer ${data.token}`

      Router.push('/')
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error('Credenciais inválidas')
      } else {
        toast.error('Não foi possível autenticar. Tente mais tarde')
      }
    }
  }

  function saveNewInfoInContextUser(data: User) {
    const { email, name, wallet_id: walletId, amount } = data

    setUser({
      email,
      name,
      wallet_id: walletId,
      amount,
    })
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
        signIn,
        saveNewInfoInContextUser,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
