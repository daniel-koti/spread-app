import { fetchAPI } from "@/utils/fetchAPI"
import { cookies } from "next/headers"
import { Table } from "./components/Table"

interface TransactionProps {
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

async function getTransactions() {
  const token = cookies().get('@spread.token.admin')?.value

  const response = await fetchAPI<TransactionProps>('transactions', {
    headers: { Authorization: 'Bearer ' + token },
  })

  
  return response.transactions
}

export default async function Transactions() {
  const transactions = await getTransactions()

  return (
    <>
      <div className="py-24 max-w-full px-4 mx-auto">
        <Table transactions={transactions}  />
      </div>
    </>
  )
}