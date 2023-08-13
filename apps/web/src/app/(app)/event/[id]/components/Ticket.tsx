import * as Dialog from '@radix-ui/react-dialog'

import { Star } from 'phosphor-react'
import { useContext, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

import { api } from '@/services/apiClient'
import { toast } from 'react-toastify'
import { CheckoutTicketDialog } from './CheckoutTicketModal'
import { useRouter } from 'next/navigation'
import { parseCookies } from 'nookies'

interface TicketProps {
  id: string
  name: string
  price: number
  eventId: string
  eventTitle: string
}

export function Ticket({ name, price, id, eventId, eventTitle }: TicketProps) {
  const { user } = useContext(AuthContext)
  const [isDialogToBuyTicket, setIsDialogToBuyTicket] = useState(false)

  const router = useRouter()

  function onToggleDialogToBuyTicket() {
    setIsDialogToBuyTicket(!isDialogToBuyTicket)
  }

  async function onBuyTicket() {
    if (user?.amount! < price) {
      toast.warn('O valor em carteira é insuficiente')
      return false
    }

    try {
      const { '@spread.token': token } = parseCookies()

      const response = await fetch('http://localhost:3333/buy-ticket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({couponId: id, eventId}),
    })

    if (response.ok) {
      toast.success('Bilhete criado com sucesso!')
      onToggleDialogToBuyTicket()
      router.push('/my-tickets')
    }

      
    } catch (err) {
      toast.error('Não foi possível comprar o bilhete')
    }
  }

  return (
    <article className="bg-zinc-50 rounded-lg  relative">
      <header className="p-4 border-b-[1px] border-slate-300">
        <span className="bg-orange-500 px-2 py-1 rounded-full text-white font-semibold">
          Bilhete {name}
        </span>
      </header>
      <div className="flex justify-between p-4 gap-2  border-slate-300">
        <strong className="text-2xl font-semibold text-slate-700">
          {new Intl.NumberFormat('pt-AO', {
            style: 'currency',
            currency: 'AOA',
          }).format(price)}
        </strong>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button
              onClick={onToggleDialogToBuyTicket}
              className="bg-green-600 px-4 py-1 rounded text-white font-semibold hover:bg-green-700"
            >
              Comprar
            </button>
          </Dialog.Trigger>

          <CheckoutTicketDialog
            price={new Intl.NumberFormat('pt-AO', {
              style: 'currency',
              currency: 'AOA',
            }).format(price)}
            ticketType={name}
            eventTitle={eventTitle}
            onBuyTicket={onBuyTicket}
          />
        </Dialog.Root>
      </div>

      <div className="h-8 bg-orange-500 w-10 flex justify-center items-center text-white absolute rounded-b top-0 right-5">
        <Star size={16} weight="duotone" />
      </div>

      <footer className="px-4 py-1 border-t border-slate-300">
        <span className="text-[10px] text-slate-400">
          Após a compra do bilhete, por favor não partilhe a sua referência com
          mais ninguém. A sua entrada aos eventos dependerá desta referência.
        </span>
      </footer>
    </article>
  )
}