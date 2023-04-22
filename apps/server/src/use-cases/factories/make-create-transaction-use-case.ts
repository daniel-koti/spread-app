import { CreateTransactionUseCase } from '../create-transaction'

import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { PrismaWalletsRepository } from '@/repositories/prisma/prisma-wallets-repository'

export function makeCreateTransactionUseCase() {
  const prismaTransactionRepository = new PrismaTransactionsRepository()
  const prismaWalletsRepository = new PrismaWalletsRepository()

  const useCase = new CreateTransactionUseCase(
    prismaTransactionRepository,
    prismaWalletsRepository,
  )

  return useCase
}
