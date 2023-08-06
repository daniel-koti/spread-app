'use client'

import { useEffect, useState } from 'react'
import { Event } from '../UI/Event'

import { api } from '@/services/apiClient'

export interface EventProps {
  id: string
  title: string
  description: string
  image: string
  address: string
  category_id: string
  date_start: Date
  date_end: Date
  tickets_qtd: number
  hour_start: string
  hour_end: string
  disclosed: Date | null
  type: 'ONLINE' | 'PERSON'
  created_at: Date
  producer_id?: string
}

export function Events() {
  const [events, setEvents] = useState<EventProps[]>([])

  useEffect(() => {
    async function fetchEvents() {
      const response = await api.get('events')
      setEvents(response.data.events)
    }

    fetchEvents()
  }, [])

  return (
    <div className="my-4">
      <div className="grid grid-cols-4 gap-8 mt-8">
        {events.map((event) => {
          return (
            <Event
              key={event.id}
              id={event.id}
              date={event.date_start}
              description={event.description}
              imageUrl={event.image}
              title={event.title}
              type={event.type}
              disclosed={event.disclosed}
            />
          )
        })}
      </div>
    </div>
  )
}
