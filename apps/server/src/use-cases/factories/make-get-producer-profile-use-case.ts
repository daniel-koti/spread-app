import { GetProducerProfileUseCase } from '../get-producer-profile'
import { PrismaProducersRepository } from '@/repositories/prisma/prisma-producers-repository'

export function makeGetProducerProfileUseCase() {
  const prismaProducersRepository = new PrismaProducersRepository()
  const useCase = new GetProducerProfileUseCase(prismaProducersRepository)

  return useCase
}
