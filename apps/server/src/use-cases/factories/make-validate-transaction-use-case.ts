import { ValidateTransactionUseCase } from '../validate-transaction'
import { PrismaTransactionsRepository } from '../../repositories/prisma/prisma-transactions-repository'
import { PrismaWalletsRepository } from '../../repositories/prisma/prisma-wallets-repository'

export function makeValidateTransactionUseCase() {
  const prismaTransactionsRepository = new PrismaTransactionsRepository()
  const prismaWalletsRepository = new PrismaWalletsRepository()
  const useCase = new ValidateTransactionUseCase(
    prismaTransactionsRepository,
    prismaWalletsRepository,
  )

  return useCase
}
