import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUserUseCase() {
  const prismaUserRepository = new PrismaUsersRepository()
  const useCase = new AuthenticateUseCase(prismaUserRepository)

  return useCase
}
