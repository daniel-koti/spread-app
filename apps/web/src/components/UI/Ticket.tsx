import * as AlertDialog from '@radix-ui/react-alert-dialog'

import { Star } from 'phosphor-react'
import { useContext, useState } from 'react'
import { Dialog } from '../Modals/Dialog'
import { AuthContext } from '@/contexts/AuthContext'

import { api } from '@/services/api'
import { toast } from 'react-toastify'

interface TicketProps {
  id: string
  name: string
  price: number
  eventId: string
}

export function Ticket({ name, price, id, eventId }: TicketProps) {
  const { user } = useContext(AuthContext)
  const [isDialogToBuyTicket, setIsDialogToBuyTicket] = useState(false)

  function onToggleDialogToBuyTicket() {
    setIsDialogToBuyTicket(!isDialogToBuyTicket)
  }

  async function onBuyTicket() {
    if (user?.amount! < price) {
      toast.error('O valor em carteira é insuficiente')
    }

    try {
      await api.post(`events/${eventId}/ticket`, {
        couponId: id,
      })

      onToggleDialogToBuyTicket()
      toast.success('Bilhete comprado com sucesso!')
    } catch (err) {
      toast.error('Não foi possível comprar o bilhete')
    }
  }

  return (
    <article className="bg-white rounded-lg  relative">
      <header className="p-4 border-b-[1px] border-slate-300">
        <span className="bg-primary-500 px-2 py-1 rounded-full text-white font-semibold">
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

        <AlertDialog.Root>
          <AlertDialog.Trigger asChild>
            <button
              onClick={onToggleDialogToBuyTicket}
              className="bg-green-600 px-4 py-1 rounded text-white font-semibold hover:bg-green-700"
            >
              Comprar
            </button>
          </AlertDialog.Trigger>

          <Dialog
            isOpen={isDialogToBuyTicket}
            onToggle={onToggleDialogToBuyTicket}
            title={`Bilhete ${name}`}
            description="Antes de comprar por favor certifique de carregar a sua carteira com valor suficiente."
            submitText="Comprar"
            variant="create"
            onSubmit={onBuyTicket}
          />
        </AlertDialog.Root>
      </div>

      <div className="h-8 bg-primary-500 w-10 flex justify-center items-center text-white absolute rounded-b top-0 right-5">
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
