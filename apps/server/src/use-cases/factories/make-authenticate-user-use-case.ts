import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { AuthenticateUserUseCase } from '../authenticate-user'

export function makeAuthenticateUserUseCase() {
  const prismaUserRepository = new PrismaUsersRepository()

  const useCase = new AuthenticateUserUseCase(prismaUserRepository)

  return useCase
}
