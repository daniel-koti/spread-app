import { FetchEventsByCategoryUseCase } from '../fetch-events-category'
import { PrismaEventsRepository } from '@/repositories/prisma/prisma-events-repository'

export function makeFetchEventsByCategoryUseCase() {
  const prismaEventsRepository = new PrismaEventsRepository()
  const useCase = new FetchEventsByCategoryUseCase(prismaEventsRepository)

  return useCase
}
