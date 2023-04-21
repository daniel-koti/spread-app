import { randomUUID } from 'node:crypto'
import { Prisma, Wallet } from '@prisma/client'
import { WalletsRepository } from '../wallets-repository'

export class InMemoryWalletsRepository implements WalletsRepository {
  public items: Wallet[] = []

  async create() {
    const wallet = {
      id: randomUUID(),
      amount: new Prisma.Decimal(0.0),
      created_at: new Date(),
    }

    this.items.push(wallet)

    return wallet
  }

  async findById(id: string) {
    const wallet = this.items.find((item) => item.id === id)

    if (!wallet) {
      return null
    }

    return wallet
  }

  async save(wallet: Wallet) {
    const walletIndex = this.items.findIndex((item) => item.id === wallet.id)

    if (walletIndex >= 0) {
      this.items[walletIndex] = wallet
    }

    return wallet
  }
}
