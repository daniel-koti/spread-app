import { useRouter } from 'next/router'
import { Input } from '@/components/FormsInputs/Input'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { toast } from 'sonner'
import { api } from '@/services/api'

const createProducerSchema = z.object({
  name: z.string().min(3, 'Campo obrigatório'),
  email: z.string().email(),
  password: z.string().min(6, 'Campo obrigatório'),
  phone: z.string().min(6, 'Campo obrigatório'),
  nif: z.string().min(9, 'Campo obrigatório'),
  company: z.boolean().default(false),
})

type CreateProducerInputSchema = z.infer<typeof createProducerSchema>

export function CreateProducerForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<CreateProducerInputSchema>({
    resolver: zodResolver(createProducerSchema),
  })

  const router = useRouter()

  async function handleCreateProducer(data: CreateProducerInputSchema) {
    try {
      await api.post('producers', data)

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

      <div className="grid grid-cols-2 gap-2">
        <Input
          type="tel"
          label="Telefone"
          description="phone"
          placeholder="(+244) 000 000 000"
          {...register('phone')}
        />
        <Input type="text" label="NIF" description="nif" {...register('nif')} />
      </div>

      <div className="col-span-6 mt-6">
        <label htmlFor="isCompany" className="inline-block">
          <span className="text-sm text-gray-700 mr-2">
            É uma pessoa jurídica ? (Empresa)
          </span>
          <input
            type="checkbox"
            id="isCompany"
            className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm cursor-pointer"
            {...register('company')}
          />
        </label>
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
