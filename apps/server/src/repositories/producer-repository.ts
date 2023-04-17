import { Prisma, Producer } from '@prisma/client'

export interface ProducerRepository {
  create(data: Prisma.ProducerCreateInput): Promise<Producer>
  findByEmail(email: string): Promise<Producer | null>
}
