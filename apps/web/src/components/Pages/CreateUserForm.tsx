import { useRouter } from 'next/router'
import { Input } from '@/components/UI/Input'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { api } from '@/services/apiClient'
import { toast } from 'react-toastify'

const createUserSchema = z.object({
  name: z
    .string()
    .nonempty('Nome do cliente é obrigatório')
    .transform((name) => {
      return name
        .trim()
        .split(' ')
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1))
        })
        .join(' ')
    }),
  email: z
    .string()
    .nonempty('O e-mail é obrigatório')
    .email('Formato do e-mail inválido')
    .toLowerCase(),
  phone: z.string().nullable(),
  nif: z.string().nullable(),
  password: z
    .string()
    .nonempty('Password é obrigatório')
    .min(6, 'Deve ter no mínimo 6 caracteres'),
  isCompany: z.boolean().default(false),

  type: z.enum(['ADMIN', 'PRODUCER', 'USER']),
})

type CreateUserInputSchema = z.infer<typeof createUserSchema>

export function CreateUserForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserInputSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      type: 'USER',
      phone: null,
      nif: null,
      isCompany: false,
    },
  })

  const router = useRouter()

  async function handleCreateUser(data: CreateUserInputSchema) {
    try {
      await api.post('/users', data)
      toast.success('Usuário criado com sucesso')
      reset()

      await router.push('/signin')
    } catch (error) {
      toast.error('Não foi possível criar o usuário')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateUser)}
      className="flex flex-col gap-2"
    >
      <div>
        <input type="hidden" {...register('type')} />
        <input type="hidden" {...register('isCompany')} />
        <input type="hidden" {...register('nif')} />
        <input type="hidden" {...register('phone')} />

        <Input
          type="text"
          placeholder="Ex: John Doe"
          {...register('name')}
          description="user"
          label="Nome"
        />
        {errors.name && (
          <span className="text-xs text-red-500">{errors.name.message}</span>
        )}
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

      <button
        type="submit"
        className="group mt-4 relative inline-block overflow-hidden rounded-sm border border-primary-500 px-8 py-3 focus:outline-none focus:ring"
      >
        <span className="absolute inset-y-0 left-0 w-[2px] bg-primary-500 transition-all group-hover:w-full group-active:bg-primary-500"></span>

        <span className="relative text-sm font-medium text-primary-500 transition-colors group-hover:text-white">
          Cadastrar
        </span>
      </button>
    </form>
  )
}
