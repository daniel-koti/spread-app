import { PrismaProducersRepository } from '../../repositories/prisma/prisma-producers-repository'
import { AuthenticateProducerUseCase } from '../authenticate-producer'

export function makeAuthenticateProducerUseCase() {
  const prismaProducerRepository = new PrismaProducersRepository()
  const useCase = new AuthenticateProducerUseCase(prismaProducerRepository)

  return useCase
}
