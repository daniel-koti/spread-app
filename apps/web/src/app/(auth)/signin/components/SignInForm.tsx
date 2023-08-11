'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

const authenticateSchema = z.object({
  email: z.string().email({ message: 'Insira um e-mail válido' }),
  password: z.string(),
})

type AuthenticateSchemaInputs = z.infer<typeof authenticateSchema>

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AuthenticateSchemaInputs>({
    resolver: zodResolver(authenticateSchema),
  })

  const { signIn } = useContext(AuthContext)

  async function handleSignIn(data: AuthenticateSchemaInputs) {
    await signIn({
      email: data.email,
      password: data.password,
    })
  }

  return (
    <form onSubmit={handleSubmit(handleSignIn)} className="">
      <div className="space-y-2">
        <label htmlFor="email" className="text-zinc-800 text-sm">
          Email
        </label>

        <Input type="email" placeholder="E-mail" {...register('email')} />
      </div>

      <div className="space-y-2 mt-5">
        <label htmlFor="password" className="text-zinc-800 text-sm">
          Password
        </label>

        <Input
          type="password"
          placeholder="Palavra-passe"
          {...register('password')}
        />
      </div>

      <p className="text-gray-500 flex justify-center my-8">
        Não possui uma conta?
        <Link className="underline ml-2 text-orange-600" href="/signup">
          Criar conta
        </Link>
      </p>

      <Button
        disabled={isSubmitting}
        className="w-full"
        size="lg"
        variant="primary"
      >
        Login
      </Button>
    </form>
  )
}
