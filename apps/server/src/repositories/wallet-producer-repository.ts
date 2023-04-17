import { WalletProducer } from '@prisma/client'

export interface WalletProducerRepository {
  create(userId: string): Promise<WalletProducer>
}
