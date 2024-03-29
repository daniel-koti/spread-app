import { Prisma, Transaction } from '@prisma/client'
import { TransactionsRepository } from '../repositories/transactions-repository'
import { WalletsRepository } from '../repositories/wallets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InsufficientFundsInWalletError } from './errors/insufficient-funds-in-wallet-error'

interface CreateTransactionUseCaseRequest {
  description: string
  price: number
  type: 'INCOME' | 'OUTCOME'
  file: string | null
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
    file,
  }: CreateTransactionUseCaseRequest): Promise<CreateTransactionUseCaseResponse> {
    const wallet = await this.walletRepository.findById(wallet_id)

    if (!wallet) {
      throw new ResourceNotFoundError()
    }

    if (type === 'INCOME') {
      wallet.amount = new Prisma.Decimal(Number(wallet.amount) + price)
    } else {
      // checks if the wallet has enough amount
      if (price > Number(wallet.amount)) {
        throw new InsufficientFundsInWalletError()
      } else {
        wallet.amount = new Prisma.Decimal(Number(wallet.amount) - price)
        await this.walletRepository.save(wallet)
      }
    }

    const transaction = await this.transactionRepository.create({
      description,
      price,
      type,
      wallet_id,
      file,
      status: type === 'INCOME' ? 'PENDING' : 'SUCCESS',
    })

    return {
      transaction,
    }
  }
}
