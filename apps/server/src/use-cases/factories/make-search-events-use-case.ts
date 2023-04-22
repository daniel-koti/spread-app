import { SearchEventsUseCase } from '../search-events'
import { PrismaEventsRepository } from '@/repositories/prisma/prisma-events-repository'

export function makeSearchEventsUseCase() {
  const prismaEventsRepository = new PrismaEventsRepository()
  const useCase = new SearchEventsUseCase(prismaEventsRepository)

  return useCase
}
