import { Wallet } from '@prisma/client'
import { WalletsRepository } from '@/repositories/wallets-repository'

interface WalletUseCaseResponse {
  wallet: Wallet
}

export class CreateWalletUseCase {
  constructor(private walletRepository: WalletsRepository) {}

  async execute(): Promise<WalletUseCaseResponse> {
    const wallet = await this.walletRepository.create()

    return {
      wallet,
    }
  }
}
