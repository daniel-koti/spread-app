import { Prisma } from '@prisma/client'
import { expect, describe, it, beforeAll } from 'vitest'

import { InMemoryTransactionsRepository } from '../repositories/in-memory/in-memory-transactions-repository'
import { CreateTransactionUseCase } from './create-transaction'
import { InMemoryWalletsRepository } from '../repositories/in-memory/in-memory-wallets-repository'
import { InsufficientFundsInWalletError } from './errors/insufficient-funds-in-wallet'

let transactionRepository: InMemoryTransactionsRepository
let walletRepository: InMemoryWalletsRepository
let sut: CreateTransactionUseCase

describe('Create Transaction Use case', () => {
  beforeAll(() => {
    transactionRepository = new InMemoryTransactionsRepository()
    walletRepository = new InMemoryWalletsRepository()
    sut = new CreateTransactionUseCase(transactionRepository, walletRepository)
  })

  it('should be able to create a income transaction', async () => {
    const wallet = await walletRepository.create()

    await sut.execute({
      description: 'Carregamento',
      type: 'INCOME',
      price: new Prisma.Decimal(300),
      wallet_id: wallet.id,
    })

    expect(wallet.amount).toEqual(new Prisma.Decimal(300))
  })

  it('should be able to create a outcome transaction', async () => {
    const wallet = await walletRepository.create()

    await sut.execute({
      description: 'Carregamento',
      type: 'INCOME',
      price: new Prisma.Decimal(300),
      wallet_id: wallet.id,
    })

    await sut.execute({
      description: 'Pagamento de bilhete',
      type: 'OUTCOME',
      price: new Prisma.Decimal(150),
      wallet_id: wallet.id,
    })

    expect(wallet.amount).toEqual(new Prisma.Decimal(150))
  })

  it('should not be able to create a outcome transaction without money in wallet', async () => {
    const wallet = await walletRepository.create()

    await expect(() =>
      sut.execute({
        description: 'Pagamento de bilhete',
        type: 'OUTCOME',
        price: new Prisma.Decimal(500),
        wallet_id: wallet.id,
      }),
    ).rejects.toBeInstanceOf(InsufficientFundsInWalletError)
  })
})
