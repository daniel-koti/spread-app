'use client'

import { useEffect, useState } from 'react'
import { Event } from '../UI/Event'

import { api } from '@/services/api'

export interface EventProps {
  id: string
  title: string
  description: string
  imageUrl: string
  address: string
  category_id: string
  date_start: Date
  date_end: Date
  latitude: number | null
  longitude: number | null
  hour_start: string
  hour_end: string
  disclosed: Date | null
  type: 'online' | 'person'
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
      <div className="grid grid-cols-4 mt-8">
        {events.map((event) => {
          return (
            <Event
              key={event.id}
              id={event.id}
              date={event.date_start}
              description={event.description}
              imageUrl={event.imageUrl}
              title={event.title}
              type={event.type}
              disclosed={event.disclosed}
              isEdit={false}
            />
          )
        })}
      </div>
    </div>
  )
}
