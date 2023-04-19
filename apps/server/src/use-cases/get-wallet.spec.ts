import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryWalletsRepository } from '../repositories/in-memory/in-memory-wallets-repository'
import { GetWalletUseCase } from './get-wallet'

let walletsRepository: InMemoryWalletsRepository
let sut: GetWalletUseCase

describe('Get Wallet By Id Use Case', () => {
  beforeEach(() => {
    walletsRepository = new InMemoryWalletsRepository()
    sut = new GetWalletUseCase(walletsRepository)
  })

  it('should be able to get wallet by Id', async () => {
    const createdWallet = await walletsRepository.create()

    const { wallet } = await sut.execute({
      id: createdWallet.id,
    })

    expect(wallet.id).toEqual(expect.any(String))
  })
})
