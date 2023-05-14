import { useRouter } from 'next/router'
import { Input } from '@/components/FormsInputs/Input'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { toast } from 'sonner'
import { api } from '@/services/api'

const createUserSchema = z.object({
  name: z.string().min(3, 'Campo obrigatório'),
  email: z.string().email(),
  password: z.string().min(6, 'Campo obrigatório'),
})

type CreateUserInputSchema = z.infer<typeof createUserSchema>

export function CreateUserForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<CreateUserInputSchema>({
    resolver: zodResolver(createUserSchema),
  })

  const router = useRouter()

  async function handleCreateUser(data: CreateUserInputSchema) {
    try {
      await api.post('users', data)
      toast.success('Usuário criado com sucesso')
      reset()

      router.push('/signin')
    } catch (error) {
      toast.error('Não foi possível criar o usuário')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateUser)}
      className="flex flex-col gap-2"
    >
      <div className="grid grid-cols-1 gap-2">
        <Input
          type="text"
          placeholder="Ex: John Doe"
          {...register('name')}
          description="user"
          label="Nome do organizador"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Input
          type="email"
          label="E-mail"
          placeholder="Ex: john@example.com"
          description="email"
          {...register('email')}
        />
        <Input
          type="password"
          label="Palavra-passe"
          placeholder=""
          description="password"
          {...register('password')}
        />
      </div>

      {isValid && (
        <button
          type="submit"
          className="group mt-4 relative inline-block overflow-hidden rounded-sm border border-primary-500 px-8 py-3 focus:outline-none focus:ring"
        >
          <span className="absolute inset-y-0 left-0 w-[2px] bg-primary-500 transition-all group-hover:w-full group-active:bg-primary-500"></span>

          <span className="relative text-sm font-medium text-primary-500 transition-colors group-hover:text-white">
            Cadastrar
          </span>
        </button>
      )}
    </form>
  )
}
