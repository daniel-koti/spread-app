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

  async findById(transactionId: string) {
    const transaction = await prisma.transaction.findFirst({
      where: {
        id: transactionId,
      },
    })

    if (!transaction) {
      return null
    }

    return transaction
  }

  async save(data: Transaction): Promise<Transaction> {
    const transaction = await prisma.transaction.update({
      where: {
        id: data.id,
      },
      data,
    })

    return transaction
  }

  async fetch() {
    const transactions = await prisma.transaction.findMany({
      orderBy: {
        created_at: 'desc',
      },
    })

    return transactions
  }
}
