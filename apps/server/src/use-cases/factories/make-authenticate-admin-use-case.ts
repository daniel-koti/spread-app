import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { AuthenticateAdminCase } from '../authenticate-admin'

export function makeAuthenticateAdminUseCase() {
  const prismaUserRepository = new PrismaUsersRepository()
  const useCase = new AuthenticateAdminCase(prismaUserRepository)

  return useCase
}
