import Link from 'next/link'
import { cookies } from 'next/headers'
import { fetchAPI } from '@/utils/fetchAPI'

import dayjs from 'dayjs'
import { ArrowLeft } from 'lucide-react'

import { Card } from './components/Card'

interface MyEventsProps {
  events: {
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

async function getMyEvents() {
  const token = cookies().get('@spread.token')?.value

  const response = await fetchAPI<MyEventsProps>('events/producer', {
    headers: { Authorization: 'Bearer ' + token },
    cache: 'no-store',
  })

  return response.events
}

export default async function MyEvents() {
  const events = await getMyEvents()

  const quantity = events ? events.length : 0

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
        <div className="mx-2 px-4">
          <div className="flex flex-col gap-2 w-full border-separate border-spacing-y-2 mt-4">
            {events?.map((event) => {
              const dateEvent = dayjs(event.date_start).format(
                'DD [de] MMMM [de] YYYY',
              )

              const createdAt = dayjs(event.created_at).format(
                'DD [de] MMMM [de] YYYY',
              )

              return (
                <Card
                  id={event.id}
                  key={event.id}
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
          <span>Não existem eventos criados por si 😮‍💨</span>
        </div>
      )}
    </div>
  )
}
