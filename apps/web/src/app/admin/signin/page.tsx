'use client'

import { AuthContext } from '@/contexts/AuthContext'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'

import { z } from 'zod'

const authenticateSchema = z.object({
  email: z.string().email({ message: 'Insira um e-mail válido' }),
  password: z.string(),
})

type AuthenticateSchemaInputs = z.infer<typeof authenticateSchema>

export default function Admin() {
  const { signInAdmin } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AuthenticateSchemaInputs>({
    resolver: zodResolver(authenticateSchema),
  })

  async function handleSignIn(data: AuthenticateSchemaInputs) {
    await signInAdmin({
      email: data.email,
      password: data.password,
    })
  }

  return (
    <div className='min-h-screen flex items-center'>
      <div className="flex max-w-lg mx-auto flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white shadow-md">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Painel administrativo
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(handleSignIn)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email (Admin)
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email')}
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Palavra-passe
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                {...register('password')}
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              Entrar
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Não é um administrador?{' '}
          <Link
            href="/signin"
            className="font-semibold leading-6 text-orange-600 hover:text-orange-500"
          >
            Entre como um utilizador normal
          </Link>
        </p>
      </div>
    </div>
    </div>
    
  )
}