import { useRouter } from 'next/router'
import { Input } from '@/components/UI/Input'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { api } from '@/services/api'
import { toast } from 'react-toastify'

const createProducerSchema = z.object({
  name: z
    .string()
    .nonempty({ message: 'Nome do organizador é obrigatório' })
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
    .nonempty({ message: 'O e-mail é obrigatório' })
    .email({ message: 'Formato do e-mail inválido' })
    .toLowerCase(),
  password: z
    .string()
    .nonempty({ message: 'Password é obrigatória' })
    .min(6, { message: 'Deve ter no mínimo 6 caracteres' }),
  phone: z
    .string()
    .nonempty({ message: 'O número de telefone é obrigatório' })
    .min(6, { message: 'Deve ter no mínimo 6 caracteres' }),
  nif: z.string().min(9, { message: 'Deve ter no mínimo 9 caracteres' }),
  isCompany: z.boolean().default(false),
  type: z.enum(['ADMIN', 'PRODUCER', 'USER']),
})

type CreateProducerInputData = z.infer<typeof createProducerSchema>

export function CreateProducerForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProducerInputData>({
    resolver: zodResolver(createProducerSchema),
    defaultValues: {
      type: 'PRODUCER',
    },
  })

  const router = useRouter()

  async function handleCreateProducer(data: CreateProducerInputData) {
    console.log(data)

    try {
      const { name, email, password, phone, nif, isCompany, type } = data

      const newProducer: CreateProducerInputData = {
        name,
        email,
        password,
        phone,
        nif,
        isCompany,
        type,
      }

      await api.post('/users', newProducer)

      toast.success('Organizador criado com sucesso')
      router.push('/signin')
      reset()
    } catch (error) {
      toast.error('Não foi possível criar o organizador')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateProducer)}
      className="flex flex-col gap-2"
    >
      <div className="grid grid-cols-1 gap-2">
        <input type="hidden" {...register('type')} />

        <Input
          type="text"
          placeholder="Ex: John Doe"
          {...register('name')}
          description="user"
          label="Nome do organizador"
        />
        {errors.name && (
          <span className="text-xs text-red-500">{errors.name.message}</span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Input
            type="email"
            label="E-mail"
            placeholder="Ex: john@example.com"
            description="email"
            {...register('email')}
          />

          {errors.email && (
            <span className="text-xs text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div>
          <Input
            type="password"
            label="Palavra-passe"
            placeholder=""
            description="password"
            {...register('password')}
          />

          {errors.password && (
            <span className="text-xs text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Input
            type="tel"
            label="Telefone"
            description="phone"
            placeholder="(+244) 000 000 000"
            {...register('phone')}
          />

          {errors.phone && (
            <span className="text-xs text-red-500">{errors.phone.message}</span>
          )}
        </div>

        <div>
          <Input
            type="text"
            label="NIF"
            description="nif"
            {...register('nif')}
          />

          {errors.nif && (
            <span className="text-xs text-red-500">{errors.nif.message}</span>
          )}
        </div>
      </div>

      <div className="col-span-6 mt-6">
        <label htmlFor="isCompany" className="inline-flex items-center">
          <span className="text-sm text-gray-700 mr-2">
            É uma pessoa jurídica ? (Empresa)
          </span>
          <input
            type="checkbox"
            id="isCompany"
            className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm cursor-pointer"
            {...register('isCompany')}
          />
        </label>
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
