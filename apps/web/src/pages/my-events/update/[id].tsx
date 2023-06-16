import Router from 'next/router'
import { ReactElement } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import * as z from 'zod'

import { NextPageWithLayout } from '../../_app'
import { DefaultLayout } from '@/components/DefaultLayout'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '@/services/axios'

import { EventProps } from '@/components/Pages/EventsList'
import { Clock, MapPin } from 'phosphor-react'
import { api } from '@/services/api'
import { toast } from 'react-toastify'

const updateEventSchema = z.object({
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

type UpdateNewEventInput = z.infer<typeof updateEventSchema>

interface ServerSideProps {
  event?: EventProps
  categories?: {
    id: string
    name: string
  }[]
}

const UpdateEvent: NextPageWithLayout = ({
  event,
  categories,
}: ServerSideProps) => {
  const currentDate = new Date().toISOString().split('T')[0]

  const { register, handleSubmit, watch } = useForm<UpdateNewEventInput>({
    resolver: zodResolver(updateEventSchema),
    defaultValues: {
      title: event?.title,
      description: event?.description,
      imageUrl: event?.imageUrl,
      categoryId: event?.category_id,
      dateStart: event?.date_start.toString().split('T')[0],
      dateEnd: event?.date_end.toString().split('T')[0],
      hourStart: event?.hour_start,
      hourEnd: event?.hour_end,
      type: event?.type,
      address: event?.address,
    },
  })

  const typeEvent = watch('type')
  const dateStart = watch('dateStart')

  async function handleUpdateEvent(data: UpdateNewEventInput) {
    const newEvent = {
      id: event?.id,
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl,
      category_id: data.categoryId,
      date_start: new Date(data.dateStart),
      date_end: new Date(data.dateEnd),
      hour_start: data.hourStart,
      hour_end: data.hourEnd,
      type: data.type,
      address: data.address,
      longitude: null,
      latitude: null,
      disclosed: null,
      created_at: event?.created_at,
      producer: event?.producer_id,
    }

    try {
      await api.put('/event/update', newEvent)

      Router.push('/my-events')
      toast.success('Evento atualizado com sucesso!')
    } catch (err) {
      toast.error('Não foi possível atualizar o evento')
    }
  }

  return (
    <div className="my-8 bg-white rounded-lg border-[1px] border-slate-200 max-w-4xl mx-auto">
      <header className="bg-gradient-to-r from-orange-50 to-white p-8 rounded-t-lg border-b border-slate-200">
        <h1 className="text-4xl text-primary-500 font-semibold">
          Editar evento
        </h1>
      </header>

      <form className="p-8" onSubmit={handleSubmit(handleUpdateEvent)}>
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
          Atualizar
        </button>
      </form>
    </div>
  )
}

UpdateEvent.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params } = ctx

  if (!params?.id) {
    return {
      redirect: {
        destination: '/my-events',
        permanent: false,
      },
    }
  }

  const eventId = params.id
  const apiClient = getAPIClient(ctx)

  const response = await apiClient.get(`events/${eventId}`)
  const responseCategories = await apiClient.get('categories')

  const { event } = response.data
  const { categories } = responseCategories.data

  return {
    props: {
      event,
      categories,
    },
  }
}

export default UpdateEvent
