import { useRouter } from 'next/router'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal } from './Modal'

import * as z from 'zod'
import { api } from '@/services/apiClient'
import { toast } from 'react-toastify'

interface RechargeWalletModalProps {
  onClose: () => void
}

const rechargeWalletSchema = z.object({
  amount: z.number().min(100),
})

type RechargeWalletSchemaInput = z.infer<typeof rechargeWalletSchema>

export function RechargeWalletModal({ onClose }: RechargeWalletModalProps) {
  const { register, handleSubmit, reset } = useForm<RechargeWalletSchemaInput>({
    resolver: zodResolver(rechargeWalletSchema),
  })

  const router = useRouter()

  async function handleRechargeWallet(data: RechargeWalletSchemaInput) {
    try {
      await api.post('transactions/income', data)

      reset()
      onClose()

      toast.success('Valor depositado com sucesso!')
      router.replace(router.asPath)
    } catch (error) {
      toast.error('Não foi possível depositar o valor')
    }
  }

  return (
    <Modal title="Carregar carteira" onClose={onClose}>
      <form
        className="bg-slate-100 p-8 mb-12 "
        onSubmit={handleSubmit(handleRechargeWallet)}
      >
        <div className="flex flex-col gap-2 items-start">
          <label htmlFor="couponId" className="text-sm text-slate-500">
            Quantidade a depositar
          </label>
          <input
            type="number"
            min={100}
            step={50}
            className="rounded-lg border-slate-300 w-full px-2 py-4 outline-none"
            placeholder="100,00 Kz"
            {...register('amount', {
              valueAsNumber: true,
            })}
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-green-600 px-8 py-2 rounded-md text-white font-medium hover:bg-green-700"
        >
          Depositar valor
        </button>
      </form>
    </Modal>
  )
}
