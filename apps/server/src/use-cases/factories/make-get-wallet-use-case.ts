import { GetWalletUseCase } from '../get-wallet'
import { PrismaWalletsRepository } from '@/repositories/prisma/prisma-wallets-repository'

export function makeGetWalletUseCase() {
  const prismaWalletsRepository = new PrismaWalletsRepository()
  const useCase = new GetWalletUseCase(prismaWalletsRepository)

  return useCase
}
