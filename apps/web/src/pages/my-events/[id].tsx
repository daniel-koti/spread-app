import { ReactElement } from 'react'
import Image from 'next/image'

import { NextPageWithLayout } from '../_app'
import { DefaultLayout } from '@/components/DefaultLayout'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '@/services/axios'

import { Plus } from 'phosphor-react'
import { EventProps } from '@/components/Pages/EventsList'

interface ServerSideProps {
  event?: EventProps
}

const MyEventDetails: NextPageWithLayout = ({ event }: ServerSideProps) => {
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
            <span className="text-slate-800 mb-4 block">
              23 de Janeiro de 2023
            </span>
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
            <div>
              <span>Data oficial: </span>
              <span className="font-medium text-slate-800">
                23 de Janeiro de 2023
              </span>
            </div>

            <div>
              <span>Horário: </span>
              <span className="font-medium text-slate-800">
                18:30 <span className="text-green-700">-</span> 23:00
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

              <button className="mt-8 bg-green-600 p-4 text-white rounded-[10px] text-lg font-medium">
                Divulgar evento
              </button>
            </div>
            <div className="flex justify-end mt-4 gap-2 border-[1px] border-dashed border-slate-400 p-4">
              <article className="h-60 w-36 flex items-center justify-center rounded border-[1px] border-dashed border-primary-500 relative">
                <button className="w-12 h-12 flex items-center justify-center bg-primary-500/90 hover:bg-primary-500">
                  <Plus size={24} className="text-zinc-50" />
                </button>
              </article>
              <article className="h-60 w-36 flex items-center justify-center rounded border-[1px] border-dashed border-primary-500 relative">
                <button className="w-12 h-12 flex items-center justify-center bg-primary-500/90 hover:bg-primary-500">
                  <Plus size={24} className="text-zinc-50" />
                </button>
              </article>
              <article className="h-60 w-36 rounded flex items-center justify-center border-[1px] border-dashed border-primary-500 relative">
                <button className="w-12 h-12 flex items-center justify-center bg-primary-500/90 hover:bg-primary-500">
                  <Plus size={24} className="text-zinc-50" />
                </button>
              </article>
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

  const { event } = response.data

  return {
    props: {
      event,
    },
  }
}

export default MyEventDetails
