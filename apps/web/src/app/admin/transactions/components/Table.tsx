'use client'

import Link from 'next/link'

import { Dialog } from "@/components/Dialog"
import { AuthContext } from "@/contexts/AuthContext"
import {useRouter} from 'next/navigation'
import { parseCookies } from "nookies"
import { useContext, useState } from "react"
import { toast } from "react-toastify"

import dayjs from 'dayjs'

import 'dayjs/locale/pt'

dayjs.locale('pt')

interface TableProps {
  transactions: {
    id: string
    type: 'INCOME' | 'OUTCOME'
    description: string
    price: number
    file: string | null
    wallet_id: string
    status: 'SUCCESS' | 'FAILED' | 'PENDING'
    created_at: Date
  }[]
}

export function Table({transactions}: TableProps) {
  const router = useRouter()
  const { signOutAdmin } = useContext(AuthContext)
  const [isApproveOpened, setIsApproveOpened] = useState(false)
  const [isRejectOpened, setIsRejectOpened] = useState(false)

  const [walletSelected, setWalletSelected] = useState<string | null>(null)
  const [transactionSelected, setTransactionSelected] = useState<string | null>(
    null,
  )

  function toggleApproveStatus(transactionId?: string, walletId?: string) {
    if (!isApproveOpened) {
      setWalletSelected(walletId ? walletId : null)
      setTransactionSelected(transactionId ? transactionId : null)
    } else {
      setWalletSelected(null)
      setTransactionSelected(null)
    }

    setIsApproveOpened(!isApproveOpened)
  }

  function toggleRejectStatus(transactionId?: string, walletId?: string) {
    if (!isRejectOpened) {
      setWalletSelected(walletId ? walletId : null)
      setTransactionSelected(transactionId ? transactionId : null)
    } else {
      setWalletSelected(null)
      setTransactionSelected(null)
    }

    setIsRejectOpened(!isRejectOpened)
  }

  function saveFileInLocalStorage(data: string) {
    localStorage.setItem('voucher', data)
  }

  async function handleApproveTransaction() {
    const data = {
      walletId: walletSelected,
      transactionId: transactionSelected,
    }

    try {
      const { '@spread.token.admin': token } = parseCookies()

      const response = await fetch('http://localhost:3333/transaction-approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsApproveOpened(false)
        toast.success('Transação aprovada')
        router.refresh()
      }
      
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  async function handleRejectTransaction() {
    const data = {
      walletId: walletSelected,
      transactionId: transactionSelected,
    }

    try {
      const { '@spread.token.admin': token } = parseCookies()

      const response = await fetch('http://localhost:3333/transaction-reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsRejectOpened(false)
        toast.success('Transação rejeitada')
        router.refresh()
      }

    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <>
      <div className="py-24 max-w-full px-4 mx-auto">
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-medium text-center my-6">
            Painel administrativo (Transações)
          </h2>
          <button onClick={signOutAdmin} className="text-red-500">
            Sair da plataforma
          </button>
        </header>
        <div className="overflow-x-auto shadow-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap text-left p-4 font-medium text-gray-900">
                  Descrição
                </th>
                <th className="whitespace-nowrap text-left p-4 font-medium text-gray-900">
                  Tipo
                </th>
                <th className="whitespace-nowrap text-left p-4 font-medium text-gray-900">
                  Valor
                </th>
                <th className="whitespace-nowrap text-left p-4 font-medium text-gray-900">
                  Comprovativo
                </th>
                <th className="whitespace-nowrap text-left p-4 font-medium text-gray-900">
                  Data
                </th>
                <th className="whitespace-nowrap text-left p-4 font-medium text-gray-900">
                  Estado
                </th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {transactions?.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-sm text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <span
                      data-income={transaction.type === 'INCOME'}
                      data-outcome={transaction.type === 'OUTCOME'}
                      className="data-[income=true]:bg-green-200 data-[outcome=true]:bg-red-300 px-4 rounded-full text-sm "
                    >
                      {transaction.type === 'INCOME' ? 'Entrada' : 'Saída'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-sm">
                    {transaction.price}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-sm">
                    {transaction.file ? 'PDF' : '-'}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-sm">
                    {dayjs(transaction.created_at).format('DD MMM[,] YYYY')}
                  </td>
                  <td className="whitespace-nowrap text-gray-700">
                    <span
                      data-success={transaction.status === 'SUCCESS'}
                      data-error={transaction.status === 'FAILED'}
                      data-pending={transaction.status === 'PENDING'}
                      className="data-[success=true]:bg-green-200 data-[error=true]:bg-red-300 data-[pending=true]:bg-zinc-300 px-4 rounded-full text-sm "
                    >
                      {transaction.status === 'SUCCESS'
                        ? 'Aprovado'
                        : transaction.status === 'PENDING'
                        ? 'Pendente'
                        : 'Rejeitado'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    <span className="flex items-center justify-end gap-2 text-sm">
                      {transaction.file && (
                        <Link
                          href="/admin/preview"
                          target="_blank"
                          onClick={() =>
                            saveFileInLocalStorage(transaction?.file!)
                          }
                          className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                        >
                          Abrir
                        </Link>
                      )}
                      {transaction.status === 'PENDING' && (
                        <div className="flex items-center gap-2 justify-end">
                          <button
                            onClick={() =>
                              toggleApproveStatus(
                                transaction.id,
                                transaction.wallet_id,
                              )
                            }
                            className="inline-block rounded bg-green-600 px-4 py-2 text-xs font-medium text-white hover:bg-green-700"
                          >
                            Aprovar
                          </button>
                          <button
                            onClick={() =>
                              toggleRejectStatus(
                                transaction.id,
                                transaction.wallet_id,
                              )
                            }
                            className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                          >
                            Anular
                          </button>
                        </div>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Dialog
        title="Deseja aprovar a transação ?"
        description="Escolha se vai validar o pagamento"
        isOpen={isApproveOpened}
        onToggle={toggleApproveStatus}
        onSubmit={handleApproveTransaction}
        variant="create"
        submitText="Aprovar"
      />
      <Dialog
        title="Deseja rejeitar a transação ?"
        description="Escolha se vai rejeitar o pagamento"
        isOpen={isRejectOpened}
        onToggle={toggleRejectStatus}
        onSubmit={handleRejectTransaction}
        variant="delete"
        submitText="Rejeitar"
      />
    </>  
  )
}