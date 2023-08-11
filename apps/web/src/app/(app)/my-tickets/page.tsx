import { cookies } from 'next/headers'
import { Ticket } from './components/Ticket'

import { fetchAPI } from '@/utils/fetchAPI'
import { Info } from 'lucide-react'

interface MyTicketsProps {
  tickets: {
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

async function getMyTickets() {
  const token = cookies().get('@spread.token')?.value

  const response = await fetchAPI<MyTicketsProps>('tickets/user', {
    headers: { Authorization: 'Bearer ' + token },
  })

  return response.tickets
}

export default async function MyTickets() {
  const tickets = await getMyTickets()

  return (
    <div className="">
      <header className="bg-white px-6 h-[72px] flex justify-between items-center">
        <strong className="text-zinc-700 font-medium text-xl">
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
