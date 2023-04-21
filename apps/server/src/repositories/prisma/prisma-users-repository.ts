import { Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { prisma } from '@/lib/prisma'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    })

    return user
  }

  async findByWallet(idWallet: string) {
    const user = await prisma.user.findFirst({
      where: {
        wallet_id: idWallet,
      },
    })

    return user
  }
}
