import { randomUUID } from 'node:crypto'
import { Prisma, Wallet } from '@prisma/client'

import { WalletUserRepository } from '../wallet-user-repository'

export class InMemoryWalletRepository implements WalletUserRepository {
  public items: Wallet[] = []

  async create(userId: string) {
    const wallet: Wallet = {
      id: randomUUID(),
      amount: new Prisma.Decimal(0.0),
      created_at: new Date(),
      user_id: userId,
    }

    this.items.push(wallet)

    return wallet
  }
}
