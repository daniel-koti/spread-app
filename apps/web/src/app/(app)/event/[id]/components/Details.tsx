'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { Calendar, Info, WhatsappLogo } from 'phosphor-react'
import dayjs from 'dayjs'
import { AuthContext } from '@/contexts/AuthContext'
import { useContext } from 'react'
import { Ticket } from './Ticket'

interface DetailsProps {
  event: {
    id: string
    title: string
    description: string
    image: string | null
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
    user: {
      name: string
      phone: string
    }
    categoryEvent: {
      name: string
    }
  }
  coupons: {
    id: string
    price: string
    coupon_type: {
      name: string
    }
  }[]
}

export function Details({coupons, event}: DetailsProps) {
  const { user } = useContext(AuthContext)
  
  return (
    <div className="">
      <header className="bg-white px-6 h-[72px] flex justify-between items-center">
        <Link
          className="border border-gray-400 p-2 rounded-[10px] text-gray-400 hover:bg-gray-50"
          href="/"
        >
          <ArrowLeft size={16} />
        </Link>

        <strong className="font-medium text-gray-500">{event.title}</strong>

        <strong className="text-xs text-gray-500">SPREAD</strong>
      </header>

      {event?.image ? (
        <Image
          className="w-full h-[400px] object-cover"
          src={event?.image!}
          alt=""
          width={750}
          height={450}
        />
      ) : (
        <div className="w-full flex items-center justify-center h-[400px] bg-slate-400">
          <h2 className="text-zinc-50">Sem imagem</h2>
        </div>
      )}

      <div className="my-8 max-w-5xl mx-auto">
        <header className="p-8">
          <div>
            <h1 className="text-5xl font-semibold text-slate-700">
              {event?.title}
            </h1>
            <p className="text-xl text-slate-400 mt-4">{event?.description}</p>
          </div>

          <div className="flex gap-4 items-center mt-8">
            <div className="inline-flex gap-2  px-4 py-2 border border-blue-950 text-blue-950 rounded-full">
              <span className="flex items-center gap-2 uppercase text-sm font-medium">
                <Calendar weight="fill" size={20} />
                {dayjs(event?.date_start).format('DD MMM [,] YYYY')}
              </span>
              <span className="text-slate-400">|</span>
              <span className="flex items-center gap-1">
                {event?.hour_start}
                <span className="text-slate-400">até</span>
                {event?.hour_end}
              </span>
            </div>
            {user?.type === 'USER' && (
              <Link
                href={`https://wa.me/${event?.user?.phone}`}
                target="_blank"
                className="text-white font-medium bg-green-600 px-4 py-2 flex items-center rounded-full gap-2 hover:bg-green-700"
              >
                <WhatsappLogo size={20} />
                Contactar o organizador
              </Link>
            )}
          </div>
        </header>

        <div className="grid grid-cols-3 gap-8 mt-8 items-start">
          <div className="col-span-1 bg-white p-8 rounded-lg">
            <header className="inline-flex items-center gap-2 bg-orange-500 px-4 text-white py-1 rounded-full">
              <Info size={20} />
              <strong className="font-medium text-sm">
                Detalhes do evento
              </strong>
            </header>

            <div className="my-4 grid grid-cols-2">
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">Começa em</span>
                <strong className="text-sm font-medium text-slate-800 capitalize">
                  {dayjs(event?.date_start).format('DD MMM [- ]')}
                  {event?.hour_start}
                </strong>
              </div>
              <div className="flex flex-col px-2 border-l">
                <span className="text-xs text-gray-400">Termina em</span>
                <strong className="text-sm font-medium text-slate-800">
                  {dayjs(event?.date_end).format('DD MMM [- ]')}
                  {event?.hour_end}
                </strong>
              </div>
            </div>

            <div className="flex flex-col my-4">
              <span className="text-xs text-gray-400">Categoria</span>
              <strong className="text-sm font-medium text-slate-800">
                {event?.categoryEvent.name}
              </strong>
            </div>

            <div className="flex flex-col my-4">
              <span className="text-xs text-gray-400">Tipo de evento</span>
              <strong className="text-sm font-medium text-slate-800">
                {event?.type === 'ONLINE' ? 'Online' : 'Presencial'}
              </strong>
            </div>

            <div className="flex flex-col my-4">
              <span className="text-xs text-gray-400">Endereço</span>
              <strong className="text-sm font-medium text-slate-800">
                {event?.address}
              </strong>
            </div>

            <div className="flex flex-col my-4">
              <span className="text-xs text-gray-400">Organizador</span>
              <strong className="text-sm font-medium text-orange-500">
                {event?.user?.name}
              </strong>
            </div>
          </div>
          {event?.tickets_qtd > 0 ? (
            <div className="col-span-2 rounded-lg flex flex-col gap-4">
              {user?.type === 'USER' &&
                coupons?.map((coupon) => {
                  return (
                    <Ticket
                      id={coupon.id}
                      key={coupon.id}
                      name={coupon.coupon_type.name}
                      price={Number(coupon.price)}
                      eventId={event?.id}
                      eventTitle={event?.title}
                    />
                  )
                })}
            </div>
          ) : (
            <strong>Não existem bilhetes disponíveis</strong>
          )}
        </div>
      </div>
    </div>
  )
}