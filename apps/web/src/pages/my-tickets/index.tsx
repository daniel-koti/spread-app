import { ReactElement } from 'react'

import { DefaultLayout } from '@/components/DefaultLayout'

import { setupAPIClient } from '@/services/api'

import { withSSRAuth } from '@/utils/withSSRAuth'
import { Info } from 'lucide-react'
import { NextPageWithLayout } from '../_app'
import { Ticket } from './components/Ticket'

interface ServerSideProps {
  tickets?: {
    id: string
    created_at: Date
    event: {
      title: string
      address: string
    }
    coupon: {
      coupon_type: {
        name: string
      }
    }
    reference: string
    status: 'VALID' | 'INVALID' | 'USED' | 'EXPIRED'
  }[]
}

const MyTickets: NextPageWithLayout = ({ tickets }: ServerSideProps) => {
  console.log(tickets)

  return (
    <div className="">
      <header className="bg-white px-6 h-[72px] flex justify-between items-center">
        <strong className="text-slate-900 font-semibold text-2xl">
          Meus bilhetes
        </strong>

        <span className="font-medium text-sm text-gray-500 flex items-center gap-2">
          <Info size={16} />
          Lista dos tickets comprados
        </span>

        <strong className="text-xs text-gray-500">SPREAD</strong>
      </header>

      <div className="grid gap-6 px-4 m-6 sm:px-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tickets.map((ticket) => {
          return (
            <Ticket
              key={ticket?.id}
              status={ticket?.status}
              createdAt={ticket?.created_at}
              event={ticket?.event.title}
              reference={ticket?.reference}
              type={ticket?.coupon?.coupon_type.name}
            />
          )
        })}
      </div>
    </div>
  )
}

MyTickets.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/tickets/user')

  const { tickets } = response.data

  return {
    props: {
      tickets,
    },
  }
})

export default MyTickets
