import { randomUUID } from 'node:crypto'
import { Prisma, Producer } from '@prisma/client'
import { ProducersRepository } from '../producers-repository'

export class InMemoryProducerRepository implements ProducersRepository {
  public items: Producer[] = []

  async create(data: Prisma.ProducerUncheckedCreateInput) {
    const producer: Producer = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      company: data.company,
      nif: data.nif,
      phone: data.phone,
      status: 'ENABLED',
      password_hash: data.password_hash,
      created_at: new Date(),
      wallet_id: '01',
    }

    this.items.push(producer)

    return producer
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
