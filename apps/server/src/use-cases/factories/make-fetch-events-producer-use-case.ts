import { PrismaEventsRepository } from '@/repositories/prisma/prisma-events-repository'
import { FetchEventsByProducerUseCase } from '../fetch-events-producer'

export function makeFetchEventsByProducerUseCase() {
  const prismaEventsRepository = new PrismaEventsRepository()
  const useCase = new FetchEventsByProducerUseCase(prismaEventsRepository)

  return useCase
}
