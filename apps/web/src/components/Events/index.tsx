'use client'

import Link from 'next/link'

import { useEffect, useState } from 'react'
import { Event } from './schema'
import { api } from '@/services/api'

import Image from 'next/image'
import { Clock, MapPin } from 'phosphor-react'

export function Events() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    async function fetchEvents() {
      const response = await api.get('events')
      setEvents(response.data.events)
    }

    fetchEvents()
  }, [])

  return (
    <div className="mt-2">
      <div className="grid grid-cols-4 mt-8">
        {events.map((event) => {
          return (
            <Link
              href="#"
              key={event.id}
              className="bg-zinc-50 border-[1px] border-slate-200 rounded-3xl pb-6"
            >
              <header className="w-full">
                <Image
                  src={event.imageUrl}
                  alt=""
                  width={300}
                  height={500}
                  className="w-full rounded-t-3xl"
                />
              </header>
              <section className="mt-4 px-4">
                <div className="flex flex-col gap-2">
                  <strong className="font-medium text-primary-500 text-md">
                    {event.title}
                  </strong>
                  <div className="text-slate-500 flex items-center">
                    <Clock />
                    <span className="ml-2 text-xs">
                      12 Janeiro, 2023 | 18:00h
                    </span>
                  </div>
                  <div className="text-slate-500 flex items-center">
                    <MapPin />
                    <span className="ml-2 text-xs">Marginal de Luanda</span>
                  </div>
                </div>
                <hr className="my-4" />
                <p className="text-xs text-slate-500 description-wrapper">
                  {event.description}
                </p>
                <hr className="my-4" />
              </section>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
