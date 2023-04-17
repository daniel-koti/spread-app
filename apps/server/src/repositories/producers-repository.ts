import { Prisma, Producer } from '@prisma/client'

export interface ProducersRepository {
  create(data: Prisma.ProducerCreateInput): Promise<Producer>
  findByEmail(email: string): Promise<Producer | null>
}
