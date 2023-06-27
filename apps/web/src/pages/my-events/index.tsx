import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'
import { DefaultLayout } from '@/components/DefaultLayout'
import { setupAPIClient } from '@/services/api'

import dayjs from 'dayjs'

import { Empty } from '../../components/UI/Empty'

import { ArrowLeft } from 'phosphor-react'
import Link from 'next/link'

import { withSSRAuth } from '@/utils/withSSRAuth'
import { CardEvent } from './components/CardEvent'

interface ServerSideProps {
  events?: {
    id: string
    title: string
    date_start: Date
    created_at: Date
    disclosed: Date | null
    image: string | null
    categoryEvent: {
      name: true
    }
  }[]
}

const MyEvents: NextPageWithLayout = ({ events }: ServerSideProps) => {
  const quantity = events?.length!

  console.log(events)

  return (
    <div className="">
      <header className="bg-white px-6 h-[72px] flex justify-between items-center">
        <Link
          className="border border-gray-300 p-2 rounded-[10px] text-gray-400 hover:bg-gray-50"
          href="/"
        >
          <ArrowLeft size={16} />
        </Link>

        <strong className="font-medium text-gray-500">Meus eventos</strong>

        <Link
          href="/create-event"
          className="bg-green-600 h-12 font-medium px-6 inline-flex items-center justify-center rounded-[10px] text-white hover:bg-green-800 transition-all ease-in-out"
        >
          + Cadastrar evento
        </Link>
      </header>
      {quantity >= 1 ? (
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col gap-2 w-full border-separate border-spacing-y-2 mt-4">
            {events?.map((event) => {
              const dateEvent = dayjs(event.date_start).format(
                'DD [de] MMMM [de] YYYY',
              )

              const createdAt = dayjs(event.created_at).format(
                'DD [de] MMMM [de] YYYY',
              )

              return (
                <CardEvent
                  key={event.id}
                  id={event.id}
                  date={dateEvent}
                  category={String(event?.categoryEvent?.name)}
                  disclosed={event?.disclosed}
                  image={event?.image}
                  title={event.title}
                  createdAt={createdAt}
                />
              )
            })}
          </div>
        </div>
      ) : (
        <div>
          <Empty description="Não existem eventos criados por si 😮‍💨" />
        </div>
      )}
    </div>
  )
}

MyEvents.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)

  const response = await apiClient.get('/events/producer')

  const { events } = response.data

  return {
    props: {
      events,
    },
  }
})

export default MyEvents
