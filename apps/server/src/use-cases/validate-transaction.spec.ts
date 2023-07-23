import { describe, it, expect, beforeEach } from 'vitest'

import { ValidateTransactionUseCase } from './validate-transaction'
import { InMemoryTransactionsRepository } from '../repositories/in-memory/in-memory-transactions-repository'
import { InMemoryWalletsRepository } from '../repositories/in-memory/in-memory-wallets-repository'

let transactionsRepository: InMemoryTransactionsRepository
let walletsRepository: InMemoryWalletsRepository
let sut: ValidateTransactionUseCase

describe('Validate Transactions', () => {
  beforeEach(async () => {
    transactionsRepository = new InMemoryTransactionsRepository()
    walletsRepository = new InMemoryWalletsRepository()
    sut = new ValidateTransactionUseCase(
      transactionsRepository,
      walletsRepository,
    )
  })

  it('should be able to approve a transaction', async () => {
    const wallet = await walletsRepository.create()

    const transaction = await transactionsRepository.create({
      description: 'Carregar carteira',
      price: 4000,
      file: '09481',
      type: 'INCOME',
      wallet_id: wallet.id,
      status: 'PENDING',
    })

    const response = await sut.execute({
      option: 'VALID',
      transactionId: transaction.id,
      walletId: wallet.id,
    })

    expect(response.transaction.status).toEqual('SUCCESS')
  })

  it('should be able to reject a transaction', async () => {
    const wallet = await walletsRepository.create()

    const transaction = await transactionsRepository.create({
      description: 'Carregar carteira',
      price: 4000,
      file: '09481',
      type: 'INCOME',
      wallet_id: wallet.id,
      status: 'PENDING',
    })

    const response = await sut.execute({
      option: 'INVALID',
      transactionId: transaction.id,
      walletId: wallet.id,
    })

    expect(response.transaction.status).toEqual('FAILED')
  })
})
