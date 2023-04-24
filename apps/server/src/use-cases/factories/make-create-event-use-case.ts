import { PrismaEventsRepository } from '@/repositories/prisma/prisma-events-repository'
import { CreateEventUseCase } from '../create-event'
import { PrismaProducersRepository } from '@/repositories/prisma/prisma-producers-repository'

export function makeCreateEventUseCase() {
  const prismaEventsRepository = new PrismaEventsRepository()
  const prismaProducersRepository = new PrismaProducersRepository()

  const useCase = new CreateEventUseCase(
    prismaEventsRepository,
    prismaProducersRepository,
  )

  return useCase
}
