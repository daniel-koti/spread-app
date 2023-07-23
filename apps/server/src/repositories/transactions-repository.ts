import { Prisma, Transaction } from '@prisma/client'

export interface TransactionsRepository {
  create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>
  verifyTransaction(transaction: Transaction): Promise<Transaction>
  findById(transactionId: string): Promise<Transaction | null>
  findByWalletId(walletId: string): Promise<Transaction[]>
  save(transaction: Transaction): Promise<Transaction>
}
