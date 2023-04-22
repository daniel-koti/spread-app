import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { RegisterUserUseCase } from '../register-user'
import { PrismaWalletsRepository } from '../../repositories/prisma/prisma-wallets-repository'

export function makeRegisterUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const prismaWalletsRepository = new PrismaWalletsRepository()

  const useCase = new RegisterUserUseCase(
    prismaUsersRepository,
    prismaWalletsRepository,
  )

  return useCase
}
