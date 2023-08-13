'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import * as z from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { api } from '@/services/apiClient'


import { toast } from 'react-toastify'
import { Modal } from '@/components/Modal'
import { parseCookies } from 'nookies'

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
      const response = await api.get('coupon/types')

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
      const { '@spread.token': token } = parseCookies()

      const response = await fetch('http://localhost:3333/coupon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(newCoupon),
    })

    if (response.ok) {
      toast.success('Bilhete criado com sucesso!')
      reset()
      onCloseModal()

      router.refresh()
    }

    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <Modal title="Criar um bilhete" onClose={onCloseModal}>
      <form
        onSubmit={handleSubmit(handleCreateCoupon)}
        className="bg-slate-100 p-8 mb-12 flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2 items-start">
          <label htmlFor="couponId" className="text-sm text-slate-500  ">
            Tipo de Bilhete
          </label>
          <select
            id="couponId"
            className="rounded-lg border-slate-300 border w-full px-2 py-4 outline-none"
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
            className="rounded-lg border-slate-300 border px-2 py-4 w-full outline-none"
            placeholder="0,00 Kz"
            {...register('price', {
              valueAsNumber: true,
            })}
          />
        </div>
        <div className="flex flex-col items-start">
          <button
            type="submit"
            className="bg-green-600 px-8 h-12 flex items-center justify-center rounded-[10px] text-slate-50 font-medium hover:bg-green-500"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </Modal>
  )
}