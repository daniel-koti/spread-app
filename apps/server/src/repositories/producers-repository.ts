import { Prisma, Producer } from '@prisma/client'

export interface ProducersRepository {
  create(data: Prisma.ProducerUncheckedCreateInput): Promise<Producer>
  findByEmail(email: string): Promise<Producer | null>
  findById(id: string): Promise<Producer | null>
  findByWallet(idWallet: string): Promise<Producer | null>
}
