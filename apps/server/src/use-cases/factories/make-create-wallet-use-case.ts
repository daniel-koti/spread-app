import { PrismaWalletsRepository } from '@/repositories/prisma/prisma-wallets-repository'
import { CreateWalletUseCase } from '../create-wallet'

export function makeCreateWalletUseCase() {
  const prismaWalletsRepository = new PrismaWalletsRepository()
  const useCase = new CreateWalletUseCase(prismaWalletsRepository)

  return useCase
}
