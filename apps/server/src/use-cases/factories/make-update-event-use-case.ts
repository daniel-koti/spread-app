import { PrismaEventsRepository } from '@/repositories/prisma/prisma-events-repository'
import { UpdateEventUseCase } from '../update-event'

export function makeUpdateEventUseCase() {
  const prismaEventsRepository = new PrismaEventsRepository()
  const useCase = new UpdateEventUseCase(prismaEventsRepository)

  return useCase
}
