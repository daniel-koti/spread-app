import { Prisma, Transaction } from '@prisma/client'
import { TransactionsRepository } from '../repositories/transactions-repository'
import { WalletsRepository } from '../repositories/wallets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ValidateTransactionUseCaseRequest {
  transactionId: string
  walletId: string
  option: 'VALID' | 'INVALID'
}

interface ValidateTransactionUseCaseResponse {
  transaction: Transaction
}

export class ValidateTransactionUseCase {
  constructor(
    private transactionRepository: TransactionsRepository,
    private walletRepository: WalletsRepository,
  ) {}

  async execute({
    transactionId,
    walletId,
    option,
  }: ValidateTransactionUseCaseRequest): Promise<ValidateTransactionUseCaseResponse> {
    // Find wallet to update
    const wallet = await this.walletRepository.findById(walletId)

    if (!wallet) {
      throw new ResourceNotFoundError()
    }

    const transaction = await this.transactionRepository.findById(transactionId)

    if (!transaction) {
      throw new ResourceNotFoundError()
    }

    if (option === 'VALID') {
      wallet.amount = new Prisma.Decimal(
        Number(wallet.amount) + Number(transaction.price),
      )

      await this.walletRepository.save(wallet)
      transaction.status = 'SUCCESS'
      await this.transactionRepository.save(transaction)
    } else {
      // transaction was not approved
      transaction.status = 'FAILED'
      await this.transactionRepository.save(transaction)
    }

    return {
      transaction,
    }
  }
}
