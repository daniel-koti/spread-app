import { fetchAPI } from '@/utils/fetchAPI'
import { EventCard } from './EventCard'
import Link from 'next/link'

export interface EventProps {
  events: {
    id: string
    title: string
    description: string
    image: string
    address: string
    category_id: string
    date_start: Date
    date_end: Date
    hour_start: string
    hour_end: string
    disclosed: Date
    type: 'ONLINE' | 'PERSON'
    created_at: Date
  }[]
}

async function getEvents() {
  const response = await fetchAPI<EventProps>('events', {
    cache: 'no-store'
  })

  return response.events
}

export async function Events() {
  const events = await getEvents()

  return (
    <div className="m-8">
      <header className="flex items-center justify-between">
        <strong className="text-2xl text-zinc-900 font-medium">
          Eventos divulgados
        </strong>
        
      </header>
      <div className="grid grid-cols-4 gap-4 mt-8">
        {events.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            image={event.image}
            description={event.description}
            date={event.date_start}
            disclosed={event.disclosed}
            type={event.type}
          />
        ))}
      </div>
    </div>
  )
}
