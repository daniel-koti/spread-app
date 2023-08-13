'use client'

import Link from 'next/link'
import Image from 'next/image'
import { AuthContext } from "@/contexts/AuthContext"

import { useContext, useState } from "react"
import { ArrowLeft } from 'lucide-react'
import dayjs from 'dayjs'

import 'dayjs/locale/pt'

dayjs.locale('pt')

import { Badge } from '@/components/Badge'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Dialog } from '@/components/Dialog'
import { Coupon } from './Coupon'
import { parseCookies } from 'nookies'

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
  const router = useRouter()

  const { user } = useContext(AuthContext)
  const [isDialogDisclose, setIsDialogDisclose] = useState(false)
  const [isDialogDelete, setIsDialogDelete] = useState(false)

  const createdAt = dayjs(event?.created_at).format('DD [de] MMMM [de] YYYY')
  const dateInitial = dayjs(event?.date_start).format('DD [de] MMMM [de] YYYY')

  const isAlreadyToDisclose = coupons?.length > 0

  const disclosedDate = event?.disclosed
    ? dayjs(event?.disclosed).format('DD [de] MMMM [de] YYYY')
    : undefined

    async function onDeleteEvent() {
      try {
        const { '@spread.token': token } = parseCookies()

        const response = await fetch(`http://localhost:3333/event/remove/${event.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },        
        })

        if (response.ok) {
          toast.success('Evento apagado com sucesso!')
          router.push('/my-events')
        }

      } catch (error) {
        toast.error('Não foi possível apagar o evento')
      }
    }
  
    function onToggleDiscloseDialog() {
      setIsDialogDisclose(!isDialogDisclose)
    }
  
    function onToggleDeleteDialog() {
      setIsDialogDelete(!isDialogDelete)
    }

    async function discloseEvent() {
      if (user?.amount! < 5000) {
        toast.warn('O valor em carteira é insuficiente')
        return
      }
  
      const eventDateHasPassed = dayjs().isAfter(dayjs(event?.date_start))
  
      if (eventDateHasPassed) {
        toast.error(
          'A data do evento já passou. Para divulgar precisa definir uma nova data',
        )
        setIsDialogDisclose(false)
        return false
      }
  
      try {
        const { '@spread.token': token } = parseCookies()

        const response = await fetch(`http://localhost:3333/events/disclose`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },    
          body: JSON.stringify({eventId: event.id})    
        })

        if (response.ok) {
          onToggleDiscloseDialog()
          toast.success('Evento divulgado com sucesso!')
          router.refresh() 
        }
        
        
      } catch (error) {
        toast.error('Não foi possível divulgar o evento')
      }
    }

  return (
    <>
      <header className="px-6 h-[72px] flex justify-between items-center">
        <Link
          className="border border-gray-300 p-2 rounded-[10px] text-gray-400 hover:bg-gray-50"
          href="/my-events"
        >
          <ArrowLeft size={16} />
        </Link>

        <strong className="font-medium text-gray-500">Evento</strong>

        <Link
          href="/create-event"
          className="bg-green-600 h-12 px-6 inline-flex items-center justify-center rounded-[10px] text-white hover:bg-green-800 transition-all ease-in-out"
        >
          + Cadastrar evento
        </Link>
      </header>
      {event?.image ? (
        <Image
          className="w-full h-[400px] object-cover "
          src={event?.image}
          alt=""
          width={750}
          height={450}
        />
      ) : (
        <div className="w-full flex items-center justify-center h-[400px] bg-slate-400  ">
          <h2 className="text-zinc-50">Sem imagem</h2>
        </div>
      )}

    <div className="mt-8 max-w-5xl mx-auto p-4">
      <header className="">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-slate-800 mb-4 block">
              Criado em :{' '}
              <span className="text-sm text-slate-400">{createdAt}</span>
            </span>

            {event?.disclosed && (
              <Badge description="Divulgado" status="success" />
            )}
          </div>
          <h1 className="text-5xl font-semibold text-slate-700">
            {event?.title}
          </h1>
          <p className="text-xl text-slate-400 mt-4">{event?.description}</p>
        </div>
      </header>

      <div className="mt-8">
        <strong className="text-2xl font-semibold text-slate-700">
          Detalhes
        </strong>
        <hr className="my-4" />
        <div className="flex flex-col gap-4">
          {disclosedDate && (
            <div className="flex items-center gap-2">
              <span className="text-green-700 font-medium bg-green-400 px-2">
                Divulgado em:{' '}
              </span>
              <span className="font-medium text-slate-800">
                {disclosedDate}
              </span>
            </div>
          )}

          <div>
            <span>Data oficial: </span>
            <span className="font-medium text-slate-800">{dateInitial}</span>
          </div>

          <div>
            <span>Horário: </span>
            <span className="font-medium text-slate-800">
              {event?.hour_start} <span className="text-green-700">-</span>{' '}
              {event?.hour_end}
            </span>
          </div>

          <div>
            <span>Quantidade de bilhetes disponível: </span>
            <span className="font-medium text-slate-800">
              {event?.tickets_qtd}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <strong className="text-2xl font-semibold text-slate-700">
          Tickets
        </strong>
        <hr className="mt-4" />
        <div className="flex gap-4 items-start">
          <div className="mt-4 flex-1 ">
            <p className="text-lg text-slate-800">
              Aqui você deve cadastrar os bilhetes de acesso ao seu evento.
              Precisa ter pelo menos 1 tipo de bilhete cadastrado para
              divulgar o seu evento.
            </p>

            <div className="flex items-center gap-4">
              {!event.disclosed && (
                <AlertDialog.Root>
                  <AlertDialog.Trigger asChild>
                    <button
                      disabled={!isAlreadyToDisclose}
                      onClick={onToggleDiscloseDialog}
                      className="mt-8 bg-green-600 hover:bg-green-700 disabled:bg-green-700 disabled:cursor-not-allowed p-4 text-white rounded-[10px] text-lg font-medium cursor-pointer"
                    >
                      Divulgar evento
                    </button>
                  </AlertDialog.Trigger>

                  <Dialog
                    isOpen={isDialogDisclose}
                    onToggle={onToggleDiscloseDialog}
                    title="Tem certeza que deseja divulgar este evento ?"
                    description="Na SPREAD, temos uma taxa de 5.000,00Kz para cada vez que divulgar  um evento. Certifique-se de ter este valor em carteira antes de promover o seu evento."
                    submitText="Divulgar"
                    variant="create"
                    onSubmit={discloseEvent}
                  />
                </AlertDialog.Root>
              )}
              {!event.disclosed && (
                <AlertDialog.Root>
                  <AlertDialog.Trigger asChild>
                    <button
                      onClick={onToggleDeleteDialog}
                      className="mt-8 bg-red-600 hover:bg-red-700 disabled:bg-red-700 disabled:cursor-not-allowed p-4 text-white rounded-[10px] text-lg font-medium cursor-pointer"
                    >
                      Apagar evento
                    </button>
                  </AlertDialog.Trigger>

                  <Dialog
                    isOpen={isDialogDelete}
                    onToggle={onToggleDeleteDialog}
                    title="Tem certeza que deseja apagar este evento ?"
                    description="Só pode apagar o evento antes de estar divulgado."
                    submitText="Apagar"
                    variant="delete"
                    onSubmit={onDeleteEvent}
                  />
                </AlertDialog.Root>
              )}
            </div>
          </div>
          <div className="flex justify-end mt-4 gap-2 border-[1px] border-dashed border-slate-400 p-4">
            <Coupon
              coupon={coupons[0]}
              eventId={event.id}
              disclosed={event.disclosed}
            />
            <Coupon
              coupon={coupons[1]}
              eventId={event.id}
              disclosed={event.disclosed}
            />
            <Coupon
              coupon={coupons[2]}
              eventId={event.id}
              disclosed={event.disclosed}
            />
          </div>
        </div>
      </div>
    </div>
  </>
  )
}