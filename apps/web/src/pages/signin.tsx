import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'

import loginImage from '../assets/sign-in.avif'

import { At } from 'phosphor-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useContext, useState } from 'react'

import { AuthContext } from '@/contexts/AuthContext'

const authenticateSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Campo obrigatório'),
})

type AuthenticateSchemaInputs = z.infer<typeof authenticateSchema>

export default function SignIn() {
  const { signIn } = useContext(AuthContext)

  const { register, handleSubmit } = useForm<AuthenticateSchemaInputs>({
    resolver: zodResolver(authenticateSchema),
  })

  const [isProducer, setIsProducer] = useState(true)

  async function handleSignIn(data: AuthenticateSchemaInputs) {
    await signIn({
      email: data.email,
      password: data.password,
      isProducer,
    })
  }

  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <Head>
        <title>Log in | Spread Events</title>
      </Head>
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Bem-vindo à <strong>SPREAD 🦑</strong>!
          </h1>

          <p className="mt-4 text-gray-500">
            Bem-vindo de volta à nossa plataforma de divulgação de eventos! Faça
            login em sua conta de organizador para gerenciar seus eventos ou de
            cliente para achar os melhores eventos da cidade.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mx-auto max-w-md text-center mt-4">
          <div>
            <input
              defaultChecked
              className="peer sr-only"
              id="option1"
              type="radio"
              tabIndex={-1}
              name="option"
              onClick={() => setIsProducer(true)}
            />

            <label
              htmlFor="option1"
              className="block cursor-pointer items-center justify-center w-full rounded-lg border border-gray-200 p-3 hover:border-primary-500/90 peer-checked:border-primary-500/70 peer-checked:bg-primary-500/70 peer-checked:text-white"
              tabIndex={0}
            >
              <span className="text-sm font-medium"> Organizador </span>
            </label>
          </div>

          <div>
            <input
              className="peer sr-only"
              id="option2"
              type="radio"
              tabIndex={-1}
              name="option"
              onClick={() => setIsProducer(false)}
            />

            <label
              htmlFor="option2"
              className="block cursor-pointer w-full rounded-lg border border-gray-200 p-3 hover:border-primary-500/70 peer-checked:border-primary-500/70 peer-checked:bg-primary-500/70 peer-checked:text-white"
              tabIndex={0}
            >
              <span className="text-sm font-medium"> Cliente </span>
            </label>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Insira o seu e-mail"
                autoComplete="email"
                {...register('email')}
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <At className="h-4 w-4 text-gray-400" />
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Palavra-passe"
                {...register('password')}
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <p className="text-sm text-gray-500">
              Não possui uma conta?
              <Link className="underline ml-2 text-primary-500" href="/signup">
                Criar conta
              </Link>
            </p>
          </div>

          <button className="inline-block w-full rounded bg-primary-500 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-primary-500">
            Entrar na plataforma
          </button>
        </form>
      </div>

      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
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
