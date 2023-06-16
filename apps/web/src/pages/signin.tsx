import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'

import loginImage from '../assets/sign-in.avif'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'

import { AuthContext } from '@/contexts/AuthContext'

import { withSRRGuest } from '@/utils/withSSRGuest'

const authenticateSchema = z.object({
  email: z.string().email({ message: 'Insira um e-mail válido' }),
  password: z.string(),
})

type AuthenticateSchemaInputs = z.infer<typeof authenticateSchema>

export default function SignIn() {
  const { signIn } = useContext(AuthContext)

  const { register, handleSubmit } = useForm<AuthenticateSchemaInputs>({
    resolver: zodResolver(authenticateSchema),
  })

  async function handleSignIn(data: AuthenticateSchemaInputs) {
    await signIn({
      email: data.email,
      password: data.password,
    })
  }

  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center ">
      <Head>
        <title>Log in | Spread Events</title>
      </Head>
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="max-w-lg mx-auto px-4 ">
          <h1 className="text-xl font-medium sm:text-3xl text-center text-slate-800">
            Bem-vindo à <strong>SPREAD 🦑</strong>
          </h1>

          <p className="mt-4 text-gray-500 text-center">
            Bem-vindo de volta à nossa plataforma de divulgação de eventos! Faça
            login em sua conta de organizador para gerenciar seus eventos ou de
            cliente para achar os melhores eventos da cidade.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="mt-8 max-w-lg mx-auto px-4"
        >
          <div className="mb-4">
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <input
              type="email"
              className="w-full rounded-[10px] p-6 text-base text-gray-700 border border-gray-200 outline-none focus:border-primary-500"
              placeholder="E-mail"
              {...register('email')}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <input
              type="password"
              className="w-full rounded-[10px] p-6 text-base text-gray-700 border border-gray-200 outline-none focus:border-primary-500"
              placeholder="Palavra-passe"
              {...register('password')}
            />
          </div>

          <div className="flex items-center justify-center">
            <p className="text-gray-500">
              Não possui uma conta?
              <Link className="underline ml-2 text-primary-500" href="/signup">
                Criar conta
              </Link>
            </p>
          </div>

          <button className="inline-block w-full mt-4 rounded-[10px] bg-primary-500  py-6 text-base font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-primary-500">
            Acessar plataforma
          </button>
        </form>
      </div>

      <div className="relative h-64 w-full hidden sm:block sm:h-96 lg:h-full lg:w-1/2 lg:shape-dividers_com-1749">
        <Image
          alt=""
          src={loginImage}
          className="absolute inset-0 h-full w-full object-cover"
          priority
        />
      </div>
    </section>
  )
}

export const getServerSideProps = withSRRGuest(async (ctx) => {
  return {
    props: {},
  }
})
