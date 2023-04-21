import { Prisma, Producer } from '@prisma/client'
import { ProducersRepository } from '../producers-repository'
import { prisma } from '@/lib/prisma'

export class PrismaProducersRepository implements ProducersRepository {
  async create(data: Prisma.ProducerUncheckedCreateInput) {
    const producer = await prisma.producer.create({
      data,
    })

    return producer
  }

  async findByEmail(email: string): Promise<Producer | null> {
    const producer = await prisma.producer.findFirst({
      where: {
        email,
      },
    })

    return producer
  }

  async findById(id: string): Promise<Producer | null> {
    const producer = await prisma.producer.findFirst({
      where: {
        id,
      },
    })

    return producer
  }

  async findByWallet(idWallet: string): Promise<Producer | null> {
    const producer = await prisma.producer.findFirst({
      where: {
        wallet_id: idWallet,
      },
    })

    return producer
  }
}
