import { randomUUID } from 'node:crypto'
import { Prisma, Wallet } from '@prisma/client'
import { WalletsRepository } from '../wallets-repository'
import { ResourceNotFoundError } from '../../use-cases/errors/resource-not-found-error'

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

  async checkBalance(walletId: string, price: Prisma.Decimal) {
    const wallet = await this.findById(walletId)

    if (!wallet) {
      throw new ResourceNotFoundError()
    }

    return wallet.amount >= price
  }
}
