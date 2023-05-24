import { ReactElement, useContext, useState } from 'react'
import Image from 'next/image'
import Router from 'next/router'

import { NextPageWithLayout } from '../_app'
import { DefaultLayout } from '@/components/DefaultLayout'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '@/services/axios'

import * as AlertDialog from '@radix-ui/react-alert-dialog'

import dayjs from 'dayjs'

import { EventProps } from '@/components/Pages/EventsList'
import { Coupon } from '@/components/UI/Coupon'
import { Badge } from '@/components/UI/Badge'
import { Dialog } from '@/components/Modals/Dialog'
import { AuthContext } from '@/contexts/AuthContext'
import { toast } from 'sonner'
import { api } from '@/services/api'

interface CouponProps {
  id: string
  price: string
  coupon_type: {
    name: string
  }
}

interface ServerSideProps {
  event?: EventProps
  coupons?: CouponProps[]
}

const MyEventDetails: NextPageWithLayout = ({
  event,
  coupons,
}: ServerSideProps) => {
  const { user } = useContext(AuthContext)
  const [isDialogDisclose, setIsDialogDisclose] = useState(false)
  const [isDialogDelete, setIsDialogDelete] = useState(false)

  const createdAt = dayjs(event?.created_at).format('DD [de] MMMM [de] YYYY')
  const dateInitial = dayjs(event?.date_start).format('DD [de] MMMM [de] YYYY')

  const disclosedDate = event?.disclosed
    ? dayjs(event?.disclosed).format('DD [de] MMMM [de] YYYY')
    : undefined

  const isAlreadyToDisclose = coupons?.length! > 0

  async function discloseEvent() {
    if (user?.amount! < 5000) {
      toast.error('O valor em carteira é insuficiente')
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
      await api.post('events/disclose', {
        eventId: event?.id,
      })

      toast.success('Evento divulgado com sucesso!')
    } catch (error) {
      toast.error('Não foi possível divulgar o evento')
    }
  }

  async function onDeleteEvent() {
    try {
      const response = await api.delete(`event/remove/${event?.id}`)

      console.log(response)
      toast.success('Evento apagado com sucesso!')
      Router.push('/my-events')
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

  return (
    <div className="my-8">
      {event?.imageUrl ? (
        <Image
          className="w-full h-[400px] object-cover rounded-xl"
          src={event?.imageUrl!}
          alt=""
          width={750}
          height={450}
        />
      ) : (
        <div className="w-full flex items-center justify-center h-[400px] bg-slate-400 rounded-xl">
          <h2 className="text-zinc-50">Sem imagem</h2>
        </div>
      )}

      <div className="mt-8 max-w-5xl mx-auto">
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
                {!event?.disclosed && (
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
                {!event?.disclosed && (
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
              <Coupon coupon={coupons![0]} eventId={event?.id!} />
              <Coupon coupon={coupons![1]} eventId={event?.id!} />
              <Coupon coupon={coupons![2]} eventId={event?.id!} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

MyEventDetails.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params } = ctx

  if (!params?.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const eventId = params.id
  const apiClient = getAPIClient(ctx)

  const response = await apiClient.get(`events/${eventId}`)

  const { event, coupons } = response.data

  return {
    props: {
      event,
      coupons,
    },
  }
}

export default MyEventDetails
