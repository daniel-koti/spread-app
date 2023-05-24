import { GetServerSideProps } from 'next'

import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'
import { DefaultLayout } from '@/components/DefaultLayout'
import { getAPIClient } from '@/services/axios'

import dayjs from 'dayjs'

import { Empty } from '../../components/UI/Empty'
import Image from 'next/image'
import { ListBullets, PencilSimpleLine, Question } from 'phosphor-react'
import Link from 'next/link'

interface ServerSideProps {
  events?: {
    id: string
    title: string
    date_start: Date
    created_at: Date
    disclosed: Date | null
    imageUrl: string | null
    categoryEvent: {
      name: true
    }
  }[]
}

const MyEvents: NextPageWithLayout = ({ events }: ServerSideProps) => {
  const quantity = events?.length!

  return (
    <div className="my-8">
      {quantity >= 1 ? (
        <div className="flex flex-col gap-2 w-full border-separate border-spacing-y-2 mt-4">
          {events?.map((event) => {
            const dateEvent = dayjs(event.date_start).format(
              'DD [de] MMMM [de] YYYY',
            )

            const createdAt = dayjs(event.created_at).format(
              'DD [de] MMMM [de] YYYY',
            )

            return (
              <article
                key={event.id}
                className="bg-white flex items-center border-[1px] border-slate-200 rounded-2xl py-5 px-8"
              >
                <div className="w-[30%] text-lg font-semibold flex items-center gap-4">
                  {event.imageUrl?.length ? (
                    <Image
                      src={event.imageUrl}
                      alt=""
                      height={80}
                      width={80}
                      className="h-10 object-cover rounded-md"
                    />
                  ) : (
                    <div className="h-10 w-20 bg-slate-400 flex items-center justify-center rounded-md">
                      <Question size={24} className="text-white" />
                    </div>
                  )}

                  <strong className="font-semibold text-zinc-900">
                    {event.title}
                  </strong>
                </div>
                <div className="flex-1 flex gap-4 justify-between items-center">
                  {event.disclosed ? (
                    <span className="bg-green-300 text-green-700 px-4 py-1 rounded-xl font-medium text-sm">
                      Divulgado
                    </span>
                  ) : (
                    <span className="bg-gray-300 text-gray-700 px-4 py-1 rounded-xl font-medium text-sm">
                      Pendente
                    </span>
                  )}
                  <div className="flex flex-col justify-center items-center">
                    <strong className="uppercase text-xs text-gray-400">
                      Categoria
                    </strong>
                    <span className="text-gray-700 font-medium">
                      {event.categoryEvent.name}
                    </span>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <strong className="uppercase text-xs text-gray-400">
                      Data do evento
                    </strong>
                    <span className="text-gray-700 font-medium">
                      {dateEvent}
                    </span>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <strong className="uppercase text-xs text-gray-400">
                      Criado em
                    </strong>
                    <span className="text-gray-700 font-medium">
                      {createdAt}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {event.disclosed ? (
                      <button
                        disabled
                        className="h-10 w-10 border-[1px] border-gray-100 flex items-center justify-center rounded-md hover:bg-gray-100 disabled:cursor-not-allowed hover:disabled:bg-transparent disabled:opacity-40"
                      >
                        <PencilSimpleLine size={20} />
                      </button>
                    ) : (
                      <Link
                        href={`my-events/update/${event.id}`}
                        className="h-10 w-10 border-[1px] border-gray-100 flex items-center justify-center rounded-md hover:bg-gray-100 disabled:cursor-not-allowed hover:disabled:bg-transparent disabled:opacity-40"
                      >
                        <PencilSimpleLine size={20} />
                      </Link>
                    )}

                    <Link
                      href={`my-events/${event.id}`}
                      className="h-10 w-10 border-[1px] border-gray-100 flex items-center justify-center rounded-md hover:bg-gray-100"
                    >
                      <ListBullets size={20} />
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      ) : (
        <Empty description="Não existem eventos criados por si 😮‍💨" />
      )}
    </div>
  )
}

MyEvents.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const response = await apiClient.get('/events/producer')

  const { events } = response.data

  return {
    props: {
      events,
    },
  }
}

export default MyEvents
