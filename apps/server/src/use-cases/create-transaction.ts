import { Prisma, Transaction } from '@prisma/client'
import { TransactionsRepository } from '../repositories/transactions-repository'
import { WalletsRepository } from '../repositories/wallets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InsufficientFundsInWalletError } from './errors/insufficient-funds-in-wallet'

interface CreateTransactionUseCaseRequest {
  description: string
  price: Prisma.Decimal
  type: 'INCOME' | 'OUTCOME'
  wallet_id: string
}

interface CreateTransactionUseCaseResponse {
  transaction: Transaction
}

export class CreateTransactionUseCase {
  constructor(
    private transactionRepository: TransactionsRepository,
    private walletRepository: WalletsRepository,
  ) {}

  async execute({
    description,
    price,
    type,
    wallet_id,
  }: CreateTransactionUseCaseRequest): Promise<CreateTransactionUseCaseResponse> {
    const wallet = await this.walletRepository.findById(wallet_id)

    if (!wallet) {
      throw new ResourceNotFoundError()
    }

    if (type === 'OUTCOME') {
      const isWalletBalanceReady = this.walletRepository.checkBalance(
        wallet.id,
        new Prisma.Decimal(price),
      )

      if (!isWalletBalanceReady) {
        throw new InsufficientFundsInWalletError()
      }

      wallet.amount = new Prisma.Decimal(Number(wallet.amount) - Number(price))
    } else {
      wallet.amount = new Prisma.Decimal(Number(wallet.amount) + Number(price))
    }

    if (price <= new Prisma.Decimal(0)) {
      throw new Error()
    }

    await this.walletRepository.save(wallet)

    const transaction = await this.transactionRepository.create({
      description,
      price,
      type,
      wallet_id,
    })

    return {
      transaction,
    }
  }
}
