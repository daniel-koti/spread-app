import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import Link from 'next/link'

interface CheckoutTicketDialogProps {
  ticketType: string
  eventTitle: string
  price: string
  onBuyTicket: () => void
}

export function CheckoutTicketDialog({
  onBuyTicket,
  eventTitle,
  price,
  ticketType,
}: CheckoutTicketDialogProps) {
  return (
    <Dialog.Portal className="">
      <Dialog.Overlay className="fixed h-screen w-screen inset-0 bg-black/50" />
      <Dialog.Content className="fixed top-0 right-0 bottom-0 h-screen w-96 bg-white shadow-2xl z-10 data-[state=open]:transition-all duration-300 ease-in-out">
        <Dialog.Title className="text-2xl font-semibold text-gray-800 py-8 px-6 border-b">
          Detalhes do pedido
        </Dialog.Title>
        <Dialog.Close className="absolute border-0 bg-transparent top-2 right-2 cursor-pointer text-gray-400">
          <X size={20} />
        </Dialog.Close>
        <div className="flex flex-col h-full mt-4">
          <div className="px-1 py-1 border-b mx-6 w-full h-fit">
            <div className="mt-2 flex gap-2">
              <span className="text-sm font-medium text-gray-500">Evento:</span>
              <span className="text-sm font-medium text-orange-500">
                {eventTitle}
              </span>
            </div>
            <div className="mt-2 flex gap-2">
              <span className="text-sm font-medium text-gray-500">
                Bilhete:
              </span>
              <span className="text-sm font-medium text-orange-500">
                {ticketType}
              </span>
            </div>
            <div className="mt-2 flex gap-2">
              <strong className="text-3xl text-gray-700">{price}</strong>
            </div>
          </div>
          <div className="mt-4 mx-6">
            <p className="text-sm inline text-gray-500">
              Ao realizar uma compra na Spread, certifique-se de ter a sua
              carteira carregada. Clique em{' '}
              <Link className="text-primary-500 underline" href="/wallet">
                carteira
              </Link>{' '}
              para verificar se tem valores suficientes
            </p>
          </div>

          <footer className="absolute bottom-5 px-4 w-full">
            <button
              onClick={onBuyTicket}
              className="bg-primary-500 px-4 flex items-center w-full justify-center h-[58px] rounded-[10px] hover:bg-orange-700 font-medium"
            >
              Finalizar compra
            </button>
          </footer>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
