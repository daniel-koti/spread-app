import { PrismaEventsRepository } from '@/repositories/prisma/prisma-events-repository'
import { CreateEventUseCase } from '../create-event'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeCreateEventUseCase() {
  const prismaEventsRepository = new PrismaEventsRepository()
  const prismaProducersRepository = new PrismaUsersRepository()

  const useCase = new CreateEventUseCase(
    prismaEventsRepository,
    prismaProducersRepository,
  )

  return useCase
}
