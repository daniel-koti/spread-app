import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryTransactionsRepository } from '../repositories/in-memory/in-memory-transactions-repository'
import { FetchTransactionsByWalletUseCase } from './fetch-transactions-wallet'
import { Prisma } from '@prisma/client'

let transactionsRepository: InMemoryTransactionsRepository
let sut: FetchTransactionsByWalletUseCase

describe('Fetch Transactions By Wallet Id Use Case', () => {
  beforeEach(async () => {
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new FetchTransactionsByWalletUseCase(transactionsRepository)
  })

  it('should be able to fetch transactions by wallet Id', async () => {
    await transactionsRepository.create({
      type: 'INCOME',
      description: 'Carregar carteira',
      price: new Prisma.Decimal(500),
      wallet_id: '001',
    })

    await transactionsRepository.create({
      type: 'INCOME',
      description: 'Carregar carteira',
      price: new Prisma.Decimal(300),
      wallet_id: '001',
    })

    await transactionsRepository.create({
      type: 'INCOME',
      description: 'Carregar carteira',
      price: new Prisma.Decimal(500),
      wallet_id: '002',
    })

    const { transactions } = await sut.execute({
      walletId: '002',
    })

    expect(transactions).toHaveLength(1)
    expect(transactions).toEqual([expect.objectContaining({ type: 'INCOME' })])
  })
})
