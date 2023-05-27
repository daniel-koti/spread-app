import { DiscloseEventUseCase } from '../disclose-event'
import { PrismaDiscloseRepository } from '@/repositories/prisma/prisma-disclose-repository'
import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { PrismaEventsRepository } from '@/repositories/prisma/prisma-events-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaWalletsRepository } from '@/repositories/prisma/prisma-wallets-repository'

export function makeDiscloseEventUseCase() {
  const prismaDiscloseRepository = new PrismaDiscloseRepository()
  const prismaTransactionRepository = new PrismaTransactionsRepository()
  const prismaEventRepository = new PrismaEventsRepository()
  const prismaProducersRepository = new PrismaUsersRepository()
  const prismaWalletsRepository = new PrismaWalletsRepository()

  const useCase = new DiscloseEventUseCase(
    prismaWalletsRepository,
    prismaDiscloseRepository,
    prismaTransactionRepository,
    prismaEventRepository,
    prismaProducersRepository,
  )

  return useCase
}
