import { BuyTicketUseCase } from '../buy-ticket'
import { PrismaTicketRepository } from '../../repositories/prisma/prisma-ticket-repository'
import { PrismaCouponsRepository } from '../../repositories/prisma/prisma-coupons-repository'
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { PrismaTransactionsRepository } from '../../repositories/prisma/prisma-transactions-repository'
import { PrismaWalletsRepository } from '../../repositories/prisma/prisma-wallets-repository'
import { PrismaEventsRepository } from '../../repositories/prisma/prisma-events-repository'

export function makeBuyTicketUseCase() {
  const prismaTicketRepository = new PrismaTicketRepository()
  const prismaCouponRepository = new PrismaCouponsRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const prismaTransactionsRepository = new PrismaTransactionsRepository()
  const prismaWalletsRepository = new PrismaWalletsRepository()
  const prismaEventsRepository = new PrismaEventsRepository()

  const useCase = new BuyTicketUseCase(
    prismaWalletsRepository,
    prismaTicketRepository,
    prismaCouponRepository,
    prismaUsersRepository,
    prismaTransactionsRepository,
    prismaEventsRepository,
  )

  return useCase
}
