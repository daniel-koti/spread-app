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
      type: data.type,
      wallet_id: data.wallet_id,
      created_at: new Date(),
    }

    this.items.push(transaction)

    return transaction
  }

  async findByWalletId(walletId: string) {
    return this.items.filter((item) => item.wallet_id === walletId)
  }
}
