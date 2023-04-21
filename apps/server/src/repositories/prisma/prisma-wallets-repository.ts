import { Wallet } from '@prisma/client'

import { WalletsRepository } from '../wallets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaWalletsRepository implements WalletsRepository {
  async create() {
    const wallet = await prisma.wallet.create({ data: {} })
    return wallet
  }

  async findById(id: string) {
    const wallet = await prisma.wallet.findFirst({
      where: {
        id,
      },
    })

    return wallet
  }

  async save(data: Wallet): Promise<Wallet> {
    const wallet = await prisma.wallet.update({
      where: {
        id: data.id,
      },
      data,
    })

    return wallet
  }
}
