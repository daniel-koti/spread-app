import { randomUUID } from 'node:crypto'
import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserUncheckedCreateInput) {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      nif: data.nif ?? null,
      isCompany: Boolean(data.isCompany),
      status: 'ENABLED',
      phone: data.phone ?? null,
      type: data.type,
      created_at: new Date(),
      wallet_id: data.wallet_id,
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByWallet(idWallet: string) {
    const user = this.items.find((item) => item.wallet_id === idWallet)

    if (!user) {
      return null
    }

    return user
  }
}
