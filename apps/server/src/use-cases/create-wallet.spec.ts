import { expect, describe, it, beforeAll } from 'vitest'

import { CreateWalletUseCase } from './create-wallet'

import { WalletsRepository } from '@/repositories/wallets-repository'
import { InMemoryWalletsRepository } from '../repositories/in-memory/in-memory-wallets-repository'

let walletUsersRepository: WalletsRepository
let sut: CreateWalletUseCase

describe('Create Wallet Use case', () => {
  beforeAll(() => {
    walletUsersRepository = new InMemoryWalletsRepository()
    sut = new CreateWalletUseCase(walletUsersRepository)
  })

  it('should be able to create a wallet', async () => {
    const { wallet } = await sut.execute()
    expect(wallet.id).toEqual(expect.any(String))
  })
})
