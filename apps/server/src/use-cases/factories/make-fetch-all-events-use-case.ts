import { FetchEventsUseCase } from '../fetch-all-events'
import { PrismaEventsRepository } from '@/repositories/prisma/prisma-events-repository'

export function makeFetchAllEventsUseCase() {
  const prismaEventsRepository = new PrismaEventsRepository()
  const useCase = new FetchEventsUseCase(prismaEventsRepository)

  return useCase
}
