import { Prisma } from '@prisma/client'
import { DiscloseRepository } from '../disclose-repository'
import { prisma } from '@/lib/prisma'

export class PrismaDiscloseRepository implements DiscloseRepository {
  async create(data: Prisma.DisclosureUncheckedCreateInput) {
    const disclose = await prisma.disclosure.create({
      data,
    })

    return disclose
  }
}
