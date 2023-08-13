import { fetchAPI } from '@/utils/fetchAPI'
import dayjs from 'dayjs'
import { ArrowDown, ArrowUp, CircleDollarSign } from 'lucide-react'
import { cookies } from 'next/headers'
import { RechargeWallet } from './components/RechargeWallet'

interface TransactionProps {
  transactions: {
    id: string
    type: 'INCOME' | 'OUTCOME'
    status: 'SUCCESS' | 'PENDING' | 'FAILED'
    description: string
    price: string
    created_at: Date
  }[]
}

async function getTransactions() {
  const token = cookies().get('@spread.token')?.value

  const response = await fetchAPI<TransactionProps>('transactions/user', {
    headers: { Authorization: 'Bearer ' + token },
  })

  return response.transactions
}

export default async function Wallet() {
  const transactions = await getTransactions()

  const validTransactions = transactions.filter(
    (transaction) => transaction.status === 'SUCCESS',
  )

  const summary = validTransactions?.reduce(
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

  return (
    <div className="mx-6 my-4">
      <div className="grid grid-cols-3 gap-4">
        <article className="bg-white rounded-md p-8 ">
          <header className="flex items-center justify-between text-gray-700">
            <span>Entrada</span>
            <ArrowUp size={32} />
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
            <span className="">Saída</span>
            <ArrowDown size={32} className="text-red-600" />
          </header>

          <strong className="block mt-1 text-3xl">
            {new Intl.NumberFormat('pt-AO', {
              style: 'currency',
              currency: 'AOA',
            }).format(Number(summary?.outcome))}
          </strong>
        </article>
        <article className="bg-orange-500 rounded-md p-8">
          <header className="flex items-center justify-between text-gray-700">
            <span className="text-gray-100">Total</span>
            <CircleDollarSign size={32} className="text-gray-100" />
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
        <RechargeWallet />

        {transactions.length > 0 ? (
          <table className="w-full border-separate border-spacing-y-2 mt-4">
            <tbody>
              {transactions.map((transaction) => {
                const date = dayjs(transaction.created_at).format(
                  'DD [de] MMMM [de] YYYY',
                )

                return (
                  <tr key={transaction.id}>
                    <td className="w-[30%] py-5 px-8 bg-white text-lg font-semibold rounded-s-lg">
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
                    <td className="py-5 px-8 bg-white font-medium">{date}</td>
                    <td className="py-5 px-8 bg-white rounded-e-lg font-medium">
                      <span
                        data-success={transaction.status === 'SUCCESS'}
                        data-error={transaction.status === 'FAILED'}
                        data-pending={transaction.status === 'PENDING'}
                        className="text-sm data-[success=true]:bg-green-200 data-[error=true]:bg-red-200 data-[pending=true]:bg-zinc-300 px-4 py-1 rounded-full"
                      >
                        {transaction.status === 'SUCCESS'
                          ? 'Aprovado'
                          : transaction.status === 'PENDING'
                          ? 'Pendente'
                          : 'Rejeitado'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <div className="mt-20">
            <span>Vazio</span>
          </div>
        )}
      </div>
    </div>
  )
}
