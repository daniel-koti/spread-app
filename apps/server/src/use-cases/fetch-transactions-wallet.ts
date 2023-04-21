import { Transaction } from '@prisma/client'
import { TransactionsRepository } from '@/repositories/transactions-repository'

interface FetchTransactionsByWalletUseCaseRequest {
  walletId: string
}

interface FetchTransactionsByWalletUseCaseResponse {
  transactions: Transaction[]
}

export class FetchTransactionsByWalletUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    walletId,
  }: FetchTransactionsByWalletUseCaseRequest): Promise<FetchTransactionsByWalletUseCaseResponse> {
    const transactions = await this.transactionsRepository.findByWalletId(
      walletId,
    )

    return {
      transactions,
    }
  }
}
