import { Wallet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { WalletsRepository } from '@/repositories/wallets-repository'

interface GetWalletUseCaseRequest {
  id: string
}

interface GetWalletUseCaseResponse {
  wallet: Wallet
}

export class GetWalletUseCase {
  constructor(private walletsRepository: WalletsRepository) {}

  async execute({
    id,
  }: GetWalletUseCaseRequest): Promise<GetWalletUseCaseResponse> {
    const wallet = await this.walletsRepository.findById(id)

    if (!wallet) {
      throw new ResourceNotFoundError()
    }

    return {
      wallet,
    }
  }
}
