import { Clock, MapPin } from 'phosphor-react'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@/services/api'
import { toast } from 'sonner'

const createEventSchema = z.object({
  title: z.string(),
  description: z.string(),
  imageUrl: z.string().nullable(),
  categoryId: z.string(),
  dateStart: z.string(),
  dateEnd: z.string(),
  hourStart: z.string().nullable(),
  hourEnd: z.string().nullable(),
  type: z.enum(['online', 'person']),
  address: z.string(),
})

type CreateNewEventInput = z.infer<typeof createEventSchema>

interface CreateEventFormProps {
  categories?: {
    id: string
    name: string
  }[]
}

export function CreateEventForm({ categories }: CreateEventFormProps) {
  const { register, handleSubmit, reset, watch } = useForm<CreateNewEventInput>(
    {
      resolver: zodResolver(createEventSchema),
      defaultValues: {
        type: 'person',
      },
    },
  )

  const typeEvent = watch('type')
  const dateStart = watch('dateStart')
  const currentDate = new Date().toISOString().split('T')[0] // 2023-05-17

  console.log(dateStart)

  async function handleCreateEvent(data: CreateNewEventInput) {
    const {
      title,
      description,
      address,
      categoryId,
      dateEnd,
      dateStart,
      hourEnd,
      hourStart,
      imageUrl,
      type,
    } = data

    const newEvent = {
      title,
      description,
      address,
      category_id: categoryId,
      date_start: new Date(dateStart),
      date_end: new Date(dateEnd),
      hour_start: hourStart,
      hour_end: hourEnd,
      imageUrl,
      type,
      latitude: null,
      longitude: null,
    }

    try {
      await api.post('/events', newEvent)
      reset()
      toast.success('Evento criado com sucesso!')
    } catch (err) {
      toast.error('Não foi possível criar o evento')
    }
  }

  return (
    <form className="p-8" onSubmit={handleSubmit(handleCreateEvent)}>
      <header className="my-6">
        <span className="text-slate-800 text-2xl font-medium">
          Dados Básicos
        </span>
        <hr className="my-4 text-slate-100" />
      </header>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start gap-3">
          <label htmlFor="title" className="text-sm text-slate-500 block ">
            Título
          </label>
          <input
            {...register('title')}
            type="text"
            id="title"
            className="bg-slate-50 w-full flex items-center rounded-[10px] h-12 border-[1px] border-slate-300 px-4 outline-primary-500 text-slate-700 text-base"
          />
        </div>

        <div className="flex flex-col items-start gap-3">
          <label htmlFor="description" className="text-sm text-slate-500">
            Descrição do evento
          </label>
          <textarea
            {...register('description')}
            id="description"
            rows={5}
            className="w-full flex items-center bg-slate-50 rounded-[10px] border-[1px] outline-primary-500 border-slate-300 px-4 text-slate-700 text-base resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 items-center">
          <div className="flex flex-col gap-3 items-start">
            <label htmlFor="image" className="text-sm text-slate-500">
              Imagem URL
            </label>
            <input
              {...register('imageUrl')}
              id="image"
              type="url"
              placeholder="http://"
              className="w-full bg-slate-50 border-[1px] border-dashed rounded-[10px] h-12 border-slate-300 px-4 outline-primary-500 text-slate-700 text-sm"
            />
          </div>

          <div className="flex flex-col gap-2 items-start">
            <label htmlFor="category" className="text-sm text-slate-500">
              Categoria do evento
            </label>
            <select
              {...register('categoryId')}
              id="category"
              className="w-full bg-slate-50 rounded-[10px] h-12 border-slate-300 px-4 outline-primary-500 text-slate-700 text-sm"
            >
              {categories?.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                )
              })}
            </select>
          </div>
        </div>

        <div className="my-6">
          <span className="flex items-center gap-4 text-slate-800 text-2xl font-medium">
            Horário <Clock />
          </span>
          <hr className="my-4 text-slate-100" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="date_start" className="text-sm text-slate-500">
              Data inicial
            </label>
            <input
              {...register('dateStart')}
              id="date_start"
              type="date"
              min={currentDate}
              className="bg-slate-50 h-12 rounded-[10px] border border-slate-300 px-4 outline-primary-500 text-slate-700 text-sm resize-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="date_end" className="text-sm text-slate-500">
              Data final
            </label>
            <input
              {...register('dateEnd')}
              disabled={!dateStart}
              id="date_end"
              type="date"
              min={dateStart}
              className="bg-slate-50 h-12 rounded-[10px] border border-slate-300 px-4 outline-primary-500 text-slate-700 text-sm resize-none disabled:text-zinc-300 disabled:border-zinc-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="hour_start" className="text-sm text-slate-500">
                Hora inicial
              </label>
              <input
                {...register('hourStart')}
                id="hour_start"
                type="time"
                className="bg-slate-50 h-12 rounded-[10px] border border-slate-300 px-4 outline-primary-500 text-slate-700 text-sm resize-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="hour_end" className="text-sm text-slate-500">
                Hora final
              </label>
              <input
                {...register('hourEnd')}
                id="hour_end"
                type="time"
                className="bg-slate-50 h-12 rounded-[10px] border border-slate-300 px-4 outline-primary-500 text-slate-700 text-sm resize-none"
              />
            </div>
          </div>
        </div>

        <header className="my-6">
          <span className="flex items-center gap-4 text-slate-800 text-2xl font-medium">
            Endereço <MapPin />
          </span>
          <hr className="my-4 text-slate-100" />
        </header>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 items-start">
            <label htmlFor="type" className="text-sm text-slate-500">
              Tipo de evento
            </label>
            <select
              {...register('type')}
              id="type"
              className="w-full bg-slate-50 rounded-[10px] h-12 border-slate-300 px-4 outline-primary-500 text-slate-700 text-sm"
            >
              <option value="person">Presencial</option>
              <option value="online">Online</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-2 items-start">
            <label htmlFor="address" className="text-sm text-slate-500">
              Endereço {typeEvent === 'online' && '(URL)'}
            </label>
            <input
              {...register('address')}
              id="address"
              type={`${typeEvent === 'online' ? 'url' : 'text'}`}
              className="w-full bg-slate-50 rounded-[10px] h-12 border-slate-300 px-4 outline-primary-500 text-slate-700 text-sm"
              placeholder={`${
                typeEvent === 'online' ? 'https://' : 'Localização'
              }`}
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="bg-green-600 w-full mt-4 hover:bg-green-700 py-3 rounded-[10px] text-zinc-100 font-medium"
      >
        Concluir cadastro
      </button>
    </form>
  )
}
