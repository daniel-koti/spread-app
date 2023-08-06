import { Transaction } from '@prisma/client'
import { TransactionsRepository } from '@/repositories/transactions-repository'

interface FetchTransactionsUseCaseResponse {
  transactions: Transaction[]
}

export class FetchTransactionsUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute(): Promise<FetchTransactionsUseCaseResponse> {
    const transactions = await this.transactionsRepository.fetch()

    return {
      transactions,
    }
  }
}
