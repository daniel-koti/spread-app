import { PrismaProducersRepository } from '../../repositories/prisma/prisma-producers-repository'

import { PrismaWalletsRepository } from '../../repositories/prisma/prisma-wallets-repository'
import { RegisterProducerUseCase } from '../register-producer'

export function makeRegisterProducerUseCase() {
  const prismaProducerRepository = new PrismaProducersRepository()
  const prismaWalletsRepository = new PrismaWalletsRepository()

  const useCase = new RegisterProducerUseCase(
    prismaProducerRepository,
    prismaWalletsRepository,
  )

  return useCase
}
