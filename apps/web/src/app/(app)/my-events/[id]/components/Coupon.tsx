'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import * as DialogRadix from '@radix-ui/react-dialog'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { Plus, Trash } from 'lucide-react'

import { api } from '@/services/apiClient'
import { toast } from 'react-toastify'
import { CreateCouponModal } from './CreateCouponModal'
import { Dialog } from '@/components/Dialog'
import { parseCookies } from 'nookies'

export interface CouponProps {
  id: string
  price: string
  coupon_type: {
    name: string
  }
}

interface CouponComponentProps {
  coupon: CouponProps
  eventId: string
  disclosed: Date | null
}

export function Coupon({ coupon, eventId, disclosed }: CouponComponentProps) {
  const [isOpenModalToCreateCoupon, setIsOpenModalToCreateCoupon] =
    useState(false)

  const router = useRouter()

  const [isDialogDelete, setIsDialogDelete] = useState(false)

  const priceFormatted = Number(coupon?.price!)

  function toggleModalToCreateCoupon() {
    setIsOpenModalToCreateCoupon(!isOpenModalToCreateCoupon)
  }

  function onToggleDeleteDialog() {
    setIsDialogDelete(!isDialogDelete)
  }

  async function onDeleteCoupon() {    
    try {
      const { '@spread.token': token } = parseCookies()

      const response = await fetch(`http://localhost:3333/coupon/${coupon.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      })

      if (response.ok) {
        toast.success('Bilhete apagado com sucesso!')
        onToggleDeleteDialog()  
        router.refresh()
      }
      
    } catch (error) {
      toast.error('Não foi possível apagar o bilhete')
    }
  }

  return (
    <article className="h-60 w-36 flex items-center justify-center rounded border-[1px] border-dashed border-orange-500 relative">
      {coupon ? (
        <div className="flex flex-col items-center justify-center h-full w-full border bg-white relative">
          <strong className="text-primary-500">
            {coupon.coupon_type.name}
          </strong>
          <span className="text-sm text-slate-700">
            {new Intl.NumberFormat('pt-AO', {
              style: 'currency',
              currency: 'AOA',
            }).format(priceFormatted)}
          </span>

          {!disclosed && (
            <AlertDialog.Root>
              <AlertDialog.Trigger asChild>
                <button
                  onClick={onToggleDeleteDialog}
                  className="absolute top-4 right-4 bg-red-300 p-1 cursor-pointer hover:bg-red-400 rounded"
                >
                  <Trash className="h-5 w-5 text-red-600" />
                </button>
              </AlertDialog.Trigger>

              <Dialog
                isOpen={isDialogDelete}
                onToggle={onToggleDeleteDialog}
                title="Tem certeza que deseja apagar este bilhete ?"
                description="Só pode apagar bilhetes enquanto o evento ainda não foi divulgado"
                submitText="Apagar"
                variant="delete"
                onSubmit={onDeleteCoupon}
              />
            </AlertDialog.Root>
          )}
        </div>
      ) : (
        <DialogRadix.Root open={isOpenModalToCreateCoupon}>
          <DialogRadix.Trigger asChild>
            <button
              onClick={toggleModalToCreateCoupon}
              className="w-12 h-12 flex items-center justify-center bg-orange-500/90 hover:bg-orange-500"
            >
              <Plus size={24} className="text-zinc-50" />
            </button>
          </DialogRadix.Trigger>

          <CreateCouponModal
            onCloseModal={toggleModalToCreateCoupon}
            eventId={eventId}
          />
        </DialogRadix.Root>
      )}
    </article>
  )
}