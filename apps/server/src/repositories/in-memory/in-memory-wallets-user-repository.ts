import { randomUUID } from 'node:crypto'
import { Prisma, WalletUser } from '@prisma/client'

import { WalletUsersRepository } from '../wallet-users-repository'

export class InMemoryWalletsUserRepository implements WalletUsersRepository {
  public items: WalletUser[] = []

  async create(userId: string) {
    const wallet: WalletUser = {
      id: randomUUID(),
      amount: new Prisma.Decimal(0.0),
      created_at: new Date(),
      user_id: userId,
    }

    this.items.push(wallet)

    return wallet
  }
}
