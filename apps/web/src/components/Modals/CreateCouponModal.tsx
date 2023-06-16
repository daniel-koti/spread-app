import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import * as z from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { api } from '@/services/api'

import { Modal } from './Modal'
import { toast } from 'react-toastify'

interface CreateCouponModalProps {
  onCloseModal: () => void
  eventId: string
}

interface CouponType {
  id: string
  name: string
}

const createCouponSchema = z.object({
  price: z.number(),
  coupon_type_id: z.string().cuid(),
})

type CreateCouponSchemaInput = z.infer<typeof createCouponSchema>

export function CreateCouponModal({
  onCloseModal,
  eventId,
}: CreateCouponModalProps) {
  const router = useRouter()
  const [couponTypes, setCouponTypes] = useState<CouponType[]>([])

  const { register, handleSubmit, reset } = useForm<CreateCouponSchemaInput>({
    resolver: zodResolver(createCouponSchema),
  })

  useEffect(() => {
    async function fetchCouponTypes() {
      const response = await api.get('couponTypes')

      const { couponsTypes } = response.data
      setCouponTypes(couponsTypes)
    }

    fetchCouponTypes()
  }, [])

  async function handleCreateCoupon(data: CreateCouponSchemaInput) {
    const { price, coupon_type_id: couponTypeId } = data

    const newCoupon = {
      price,
      coupon_type_id: couponTypeId,
      event_id: eventId,
    }

    try {
      await api.post('coupons', newCoupon)

      toast.success('Bilhete criado com sucesso!')
      reset()
      onCloseModal()

      router.replace(router.asPath)
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <Modal title="Criar um bilhete" onClose={onCloseModal}>
      <form
        onSubmit={handleSubmit(handleCreateCoupon)}
        className="bg-slate-100 p-8 mb-4 flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2 items-start">
          <label htmlFor="couponId" className="text-sm text-slate-500  ">
            Tipo de Bilhete
          </label>
          <select
            id="couponId"
            className="rounded-lg border-slate-300 w-full"
            {...register('coupon_type_id')}
          >
            {couponTypes.map((coupon) => {
              return (
                <option key={coupon.id} value={coupon.id}>
                  {coupon.name}
                </option>
              )
            })}
          </select>
        </div>
        <div className="flex flex-col gap-2 items-start">
          <label htmlFor="couponId" className="text-sm text-slate-500">
            Preço
          </label>
          <input
            type="number"
            className="rounded-lg border-slate-300"
            placeholder="0,00 Kz"
            {...register('price', {
              valueAsNumber: true,
            })}
          />
        </div>
        <div className="flex flex-col items-start">
          <button className="bg-green-600 px-8 py-2 rounded-lg text-slate-50 font-medium hover:bg-green-500">
            Cadastrar
          </button>
        </div>
      </form>
    </Modal>
  )
}
