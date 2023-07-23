import { Prisma, Transaction } from '@prisma/client'
import { TransactionsRepository } from '../transactions-repository'
import { prisma } from '@/lib/prisma'

export class PrismaTransactionsRepository implements TransactionsRepository {
  async create(data: Prisma.TransactionUncheckedCreateInput) {
    const transaction = await prisma.transaction.create({
      data,
    })

    return transaction
  }

  async findByWalletId(walletId: string) {
    const transactions = await prisma.transaction.findMany({
      where: {
        wallet_id: walletId,
      },
    })

    return transactions
  }

  async verifyTransaction(data: Transaction): Promise<Transaction> {
    const newTransaction = await prisma.transaction.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    })

    return newTransaction
  }
}
