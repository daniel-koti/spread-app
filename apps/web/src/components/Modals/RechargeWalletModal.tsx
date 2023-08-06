import { useRouter } from 'next/router'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal } from './Modal'

import * as z from 'zod'
import { api } from '@/services/apiClient'
import { toast } from 'react-toastify'
import { convertFileToBase64 } from '@/utils/formatted'

interface RechargeWalletModalProps {
  onClose: () => void
}

const rechargeWalletSchema = z.object({
  amount: z
    .number()
    .min(100, { message: 'O valor precisa ser no mínimo de 100kz' }),
  file: z.any().refine((files) => files?.length === 1, {
    message: 'Comprovativo obrigatório',
  }),
})

type RechargeWalletSchemaInput = z.infer<typeof rechargeWalletSchema>

export function RechargeWalletModal({ onClose }: RechargeWalletModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RechargeWalletSchemaInput>({
    resolver: zodResolver(rechargeWalletSchema),
    defaultValues: {
      amount: 100,
    },
  })

  const router = useRouter()

  async function handleRechargeWallet(data: RechargeWalletSchemaInput) {
    const { amount, file } = data

    const voucher = await convertFileToBase64(file[0])

    try {
      await api.post('transactions/income', { amount, file: voucher })

      reset()
      onClose()

      toast.success('Valor depositado com sucesso!')
      router.replace(router.asPath)
    } catch (error) {
      toast.error('Não foi possível depositar o valor')
    }
  }

  function handleClose() {
    reset()
    onClose()
  }

  return (
    <Modal title="Carregar carteira" onClose={handleClose}>
      <form
        className="bg-slate-100 p-8 mb-12 "
        onSubmit={handleSubmit(handleRechargeWallet)}
      >
        <div className="flex flex-col gap-2 items-start">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="couponId" className="text-sm text-slate-500">
              Quantidade a depositar
            </label>
            <input
              type="number"
              defaultValue={100}
              min={100}
              step={50}
              className="rounded-lg border-slate-300 w-full px-2 py-4 outline-none"
              placeholder="100,00 Kz"
              {...register('amount', {
                valueAsNumber: true,
              })}
            />

            {errors.amount && (
              <span className="text-xs text-red-500">
                {errors.amount.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="file" className="text-sm text-slate-500">
              Comprovativo de pegamento
            </label>
            <input
              type="file"
              accept=".pdf"
              className="rounded-lg border-slate-300 w-full px-2 py-4 outline-none"
              {...register('file')}
            />

            {errors.file && (
              <span className="text-xs text-red-500">
                Comprovativo obrigatório
              </span>
            )}
          </div>
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
