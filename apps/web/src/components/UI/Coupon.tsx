import { useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { Plus, Trash } from 'phosphor-react'
import { CreateCouponModal } from '../Modals/CreateCouponModal'

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
}

export function Coupon({ coupon, eventId }: CouponComponentProps) {
  const [isOpenModalToCreateCoupon, setIsOpenModalToCreateCoupon] =
    useState(false)

  const priceFormatted = Number(coupon?.price!)

  function toggleModalToCreateCoupon() {
    setIsOpenModalToCreateCoupon(!isOpenModalToCreateCoupon)
  }

  return (
    <article className="h-60 w-36 flex items-center justify-center rounded border-[1px] border-dashed border-primary-500 relative">
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

          <button className="absolute top-4 right-4 bg-red-300 p-1 cursor-pointer hover:bg-red-400 rounded">
            <Trash className="h-5 w-5 text-red-600" />
          </button>
        </div>
      ) : (
        <Dialog.Root open={isOpenModalToCreateCoupon}>
          <Dialog.Trigger asChild>
            <button
              onClick={toggleModalToCreateCoupon}
              className="w-12 h-12 flex items-center justify-center bg-primary-500/90 hover:bg-primary-500"
            >
              <Plus size={24} className="text-zinc-50" />
            </button>
          </Dialog.Trigger>

          <CreateCouponModal
            onCloseModal={toggleModalToCreateCoupon}
            eventId={eventId}
          />
        </Dialog.Root>
      )}
    </article>
  )
}
