import { ValidateTicketUseCase } from '../validate-ticket'
import { PrismaTicketRepository } from '../../repositories/prisma/prisma-ticket-repository'

export function makeValidateTicketUseCase() {
  const prismaTicketsRepository = new PrismaTicketRepository()
  const useCase = new ValidateTicketUseCase(prismaTicketsRepository)

  return useCase
}
