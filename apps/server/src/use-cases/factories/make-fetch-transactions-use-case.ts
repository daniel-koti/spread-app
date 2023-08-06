import { FetchTransactionsUseCase } from '../fetch-transactions'
import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'

export function makeFetchTransactionUseCase() {
  const prismaTransactionsRepository = new PrismaTransactionsRepository()
  const useCase = new FetchTransactionsUseCase(prismaTransactionsRepository)

  return useCase
}
