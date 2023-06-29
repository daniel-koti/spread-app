import { ReactElement, useState } from 'react'
import { NextPageWithLayout } from './_app'
import { DefaultLayout } from '@/components/DefaultLayout'

import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import { setupAPIClient } from '@/services/api'

import dayjs from 'dayjs'
import { Empty } from '@/components/UI/Empty'
import { RechargeWalletModal } from '@/components/Modals/RechargeWalletModal'
import { withSSRAuth } from '@/utils/withSSRAuth'
import { Info } from 'lucide-react'

interface ServerSideProps {
  transactions?: {
    id: string
    type: 'INCOME' | 'OUTCOME'
    description: string
    price: string
    created_at: Date
  }[]
}

const Wallet: NextPageWithLayout = ({ transactions }: ServerSideProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const summary = transactions?.reduce(
    (acc, transaction) => {
      if (transaction.type === 'INCOME') {
        acc.income += Number(transaction.price)
        acc.total += Number(transaction.price)
      } else {
        acc.outcome += Number(transaction.price)
        acc.total -= Number(transaction.price)
      }

      return acc
    },
    {
      total: 0,
      income: 0,
      outcome: 0,
    },
  )

  function onToggleModal() {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div className="">
      <header className="bg-white px-6 h-[72px] flex justify-between items-center">
        <strong className="text-slate-900 font-semibold text-2xl">
          Carteira
        </strong>

        <span className="font-medium text-sm text-gray-500 flex items-center gap-2">
          <Info size={16} />
          Transações feitas
        </span>

        <strong className="text-xs text-gray-500">SPREAD</strong>
      </header>
      <div className="mx-6 my-4">
        <div className="grid grid-cols-3 gap-4">
          <article className="bg-white rounded-md p-8 ">
            <header className="flex items-center justify-between text-gray-700">
              <span>Entrada</span>
              <ArrowCircleUp size={32} />
            </header>

            <strong className="block mt-1 text-3xl">
              {new Intl.NumberFormat('pt-AO', {
                style: 'currency',
                currency: 'AOA',
              }).format(Number(summary?.income))}
            </strong>
          </article>
          <article className="bg-white rounded-md p-8 ">
            <header className="flex items-center justify-between text-gray-700">
              <span>Saída</span>
              <ArrowCircleDown size={32} className="text-red-600" />
            </header>

            <strong className="block mt-1 text-3xl">
              {new Intl.NumberFormat('pt-AO', {
                style: 'currency',
                currency: 'AOA',
              }).format(Number(summary?.outcome))}
            </strong>
          </article>
          <article className="bg-primary-500 rounded-md p-8">
            <header className="flex items-center justify-between text-gray-700">
              <span className="text-gray-100">Total</span>
              <CurrencyDollar size={32} className="text-gray-100" />
            </header>

            <strong className="block mt-1 text-3xl text-gray-100">
              {new Intl.NumberFormat('pt-AO', {
                style: 'currency',
                currency: 'AOA',
              }).format(Number(summary?.total))}
            </strong>
          </article>
        </div>

        <div className="my-8">
          <Dialog.Root open={isModalOpen}>
            <Dialog.Trigger asChild>
              <button
                onClick={onToggleModal}
                className="px-4 h-12 bg-primary-500 rounded-md text-white font-medium hover:bg-primary-500/90"
              >
                Carregar carteira
              </button>
            </Dialog.Trigger>

            <RechargeWalletModal onClose={onToggleModal} />
          </Dialog.Root>

          {transactions?.length! > 0 ? (
            <table className="w-full border-separate border-spacing-y-2 mt-4">
              <tbody>
                {transactions!.map((transaction) => {
                  const date = dayjs(transaction.created_at).format(
                    'DD [de] MMMM [de] YYYY',
                  )

                  return (
                    <tr key={transaction.id}>
                      <td className="w-[50%] py-5 px-8 bg-white text-lg font-semibold rounded-s-lg">
                        {transaction.description}
                      </td>
                      <td
                        className={`py-5 px-8 bg-white font-medium ${
                          transaction.type === 'INCOME'
                            ? 'text-green-700'
                            : 'text-red-700'
                        }`}
                      >
                        {transaction.type === 'OUTCOME' && '- '}
                        {new Intl.NumberFormat('pt-AO', {
                          style: 'currency',
                          currency: 'AOA',
                        }).format(Number(transaction.price))}
                      </td>
                      <td className="py-5 px-8 bg-white rounded-e-lg font-medium">
                        {date}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            <div className="mt-20">
              <Empty description="Não existem transações registradas" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

Wallet.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)

  const response = await apiClient.get('/transactions/user')

  const { transactions } = response.data

  return {
    props: {
      transactions,
    },
  }
})

export default Wallet
