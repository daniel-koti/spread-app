'use client'

import { ReactNode, createContext, useEffect, useState } from 'react'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { api } from '@/services/apiClient'

import { useRouter } from 'next/navigation'
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
  updateProfile: (user: User) => void
  signIn: (data: SignInProps) => Promise<void>
  signInAdmin: (data: SignInProps) => Promise<void>
  signOut: () => void
  signOutAdmin: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

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
      fetch('http://localhost:3333/me', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data.user)
        })
    }
  }, [])

  async function signIn({ email, password }: SignInProps) {
    const response = await fetch('http://localhost:3333/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (response.ok) {
      const data = await response.json()
      const token = data.token

      setCookie(undefined, '@spread.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 Days
        path: '/',
      })

      setUser({
        email,
      })

      router.push('/')
    } else {
      toast.error('Não foi possível autenticar')
    }
  }

  async function signInAdmin({ email, password }: SignInProps) {
    try {
      const response = await fetch('http://localhost:3333/sessions-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      
    if (response.ok) {
      const data = await response.json()
      const token = data.token

      setCookie(undefined, '@spread.token.admin', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 Days
        path: '/',
      })

      setUser({
        email,
      })

      router.push('/admin/transactions')
    } else {
      toast.error('Credenciais inválidas')
    }

      
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error('Credenciais inválidas')
      } else {
        toast.error('Não foi possível autenticar. Tente mais tarde')
      }
    }
  }

  async function signOut() {
    destroyCookie(undefined, '@spread.token')
    router.push('/signin')
  }

  async function signOutAdmin() {
    destroyCookie(undefined, '@spread.token.admin')
    router.push('/admin/signin')
  }

  function updateProfile(user: User) {
    setUser(user)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        updateProfile,
        signIn,
        signInAdmin,
        signOut,
        signOutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
