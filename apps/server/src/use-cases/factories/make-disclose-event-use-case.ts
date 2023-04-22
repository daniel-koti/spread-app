import { DiscloseEventUseCase } from '../disclose-event'
import { PrismaDiscloseRepository } from '@/repositories/prisma/prisma-disclose-repository'
import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { PrismaEventsRepository } from '@/repositories/prisma/prisma-events-repository'
import { PrismaProducersRepository } from '@/repositories/prisma/prisma-producers-repository'

export function makeDiscloseEventUseCase() {
  const prismaDiscloseRepository = new PrismaDiscloseRepository()
  const prismaTransactionRepository = new PrismaTransactionsRepository()
  const prismaEventRepository = new PrismaEventsRepository()
  const prismaProducersRepository = new PrismaProducersRepository()

  const useCase = new DiscloseEventUseCase(
    prismaDiscloseRepository,
    prismaTransactionRepository,
    prismaEventRepository,
    prismaProducersRepository,
  )

  return useCase
}
