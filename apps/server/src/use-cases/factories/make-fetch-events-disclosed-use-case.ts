import { PrismaEventsRepository } from '@/repositories/prisma/prisma-events-repository'
import { FetchEventsDisclosedUseCase } from '../fetch-events-disclosed'

export function makeFetchEventsDisclosedUseCase() {
  const prismaEventsRepository = new PrismaEventsRepository()
  const useCase = new FetchEventsDisclosedUseCase(prismaEventsRepository)

  return useCase
}
