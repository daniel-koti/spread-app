import { Prisma, Transaction } from '@prisma/client'

export interface TransactionsRepository {
  create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>
  verifyTransaction(transaction: Transaction): Promise<Transaction>
  findByWalletId(walletId: string): Promise<Transaction[]>
}
