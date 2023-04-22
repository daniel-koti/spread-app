import { FetchTicketsByUserUseCase } from '../fetch-tickets-users'
import { PrismaTicketRepository } from '@/repositories/prisma/prisma-ticket-repository'

export function makeFetchTicketsByUserUseCase() {
  const prismaTicketsRepository = new PrismaTicketRepository()
  const useCase = new FetchTicketsByUserUseCase(prismaTicketsRepository)

  return useCase
}
