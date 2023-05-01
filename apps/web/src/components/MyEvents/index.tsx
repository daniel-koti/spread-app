import { useEffect, useState } from 'react'
import { Container } from '../Container'
import { api } from '@/services/api'
import { Event } from './Event'

interface EventProps {
  id: string
  title: string
  description: string
  address: string
  type: string
  category_id: string
  created_at: string
  date_start: string
  date_end: string
  disclosed: Date | null
  hour_end: string
  hour_start: string
  imageUrl: string | null
  latitude: string | null
  longitude: string | null
  producer_id: string
  status: 'ENABLED' | 'DISABLED'
}

export function MyEvents() {
  const [events, setEvents] = useState<EventProps[]>([])

  useEffect(() => {
    async function fetchEvents() {
      const response = await api.get('events/producer')
      setEvents(response.data.events)
    }

    fetchEvents()
  }, [])

  return (
    <Container>
      <h1 className="text-2xl font-semibold text-slate-400 mb-4">
        Meus Eventos
      </h1>

      {events.length === 0 ? (
        <strong className="text-2xl text-center text-slate-300">
          Nenhum evento encontrado
        </strong>
      ) : (
        <div className="grid grid-cols-3 gap-8">
          {events.map((event) => {
            return (
              <Event
                key={event.id}
                title={event.title}
                description={event.description}
                imageUrl={event.imageUrl}
              />
            )
          })}
        </div>
      )}
    </Container>
  )
}
