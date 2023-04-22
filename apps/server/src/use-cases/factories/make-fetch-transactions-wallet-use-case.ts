import { FetchTransactionsByWalletUseCase } from '../fetch-transactions-wallet'
import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'

export function makeFetchTransactionByWalletUseCase() {
  const prismaTransactionsRepository = new PrismaTransactionsRepository()
  const useCase = new FetchTransactionsByWalletUseCase(
    prismaTransactionsRepository,
  )

  return useCase
}
