import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal } from './Modal'

import * as z from 'zod'
import { api } from '@/services/api'
import { toast } from 'sonner'

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
  const { 'spread.isUser': isUser } = parseCookies()

  async function handleRechargeWallet(data: RechargeWalletSchemaInput) {
    try {
      await api.post(
        `wallet/${isUser === 'true' ? 'income-users' : 'income-producers'}`,
        data,
      )

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
      <form className="p-8" onSubmit={handleSubmit(handleRechargeWallet)}>
        <div className="flex flex-col gap-2 items-start">
          <label htmlFor="couponId" className="text-sm text-slate-500">
            Quantidade a depositar
          </label>
          <input
            type="number"
            min={100}
            step={50}
            className="rounded-lg border-slate-300 w-full"
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
