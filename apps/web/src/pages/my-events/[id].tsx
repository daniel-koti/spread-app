import { ReactElement } from 'react'
import Image from 'next/image'

import { NextPageWithLayout } from '../_app'
import { DefaultLayout } from '@/components/DefaultLayout'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '@/services/axios'

import dayjs from 'dayjs'

import { EventProps } from '@/components/Pages/EventsList'
import { Coupon } from '@/components/UI/Coupon'
import { Badge } from '@/components/UI/Badge'

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
  const createdAt = dayjs(event?.created_at).format('DD [de] MMMM [de] YYYY')
  const dateInitial = dayjs(event?.date_start).format('DD [de] MMMM [de] YYYY')

  const disclosedDate = event?.disclosed
    ? dayjs(event?.disclosed).format('DD [de] MMMM [de] YYYY')
    : undefined

  const isAlreadyToDisclose = coupons?.length! > 0

  return (
    <div className="my-6">
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

              {!event?.disclosed && (
                <button
                  disabled={!isAlreadyToDisclose}
                  className="mt-8 bg-green-600 hover:bg-green-700 disabled:bg-green-700 disabled:cursor-not-allowed p-4 text-white rounded-[10px] text-lg font-medium cursor-pointer"
                >
                  Divulgar evento
                </button>
              )}
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
