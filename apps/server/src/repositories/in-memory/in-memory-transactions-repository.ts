import { Prisma, Transaction } from '@prisma/client'
import { TransactionsRepository } from '../transactions-repository'
import { randomUUID } from 'crypto'

export class InMemoryTransactionsRepository implements TransactionsRepository {
  private items: Transaction[] = []

  async create(data: Prisma.TransactionUncheckedCreateInput) {
    const transaction: Transaction = {
      id: randomUUID(),
      description: data.description,
      price: new Prisma.Decimal(data.price.toString()),
      file: data.file ? data.file : null,
      type: data.type,
      status: data.status ? data.status : 'SUCCESS',
      wallet_id: data.wallet_id,
      created_at: new Date(),
    }

    this.items.push(transaction)

    return transaction
  }

  async findByWalletId(walletId: string) {
    return this.items.filter((item) => item.wallet_id === walletId)
  }

  async verifyTransaction(data: Transaction): Promise<Transaction> {
    const transactionIndex = this.items.findIndex(
      (transaction) => transaction.id === data.id,
    )

    if (transactionIndex >= 0) {
      this.items[transactionIndex] = data
    }

    return data
  }

  async findById(transactionId: string): Promise<Transaction | null> {
    const transaction = this.items.find((item) => item.id === transactionId)

    if (!transaction) {
      return null
    }

    return transaction
  }

  async save(transaction: Transaction) {
    const transactionIndex = this.items.findIndex(
      (item) => item.id === transaction.id,
    )

    if (transactionIndex >= 0) {
      this.items[transactionIndex] = transaction
    }

    return transaction
  }

  async fetch() {
    const transactions = this.items
    return transactions
  }
}
