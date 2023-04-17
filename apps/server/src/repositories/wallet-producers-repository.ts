import { WalletProducer } from '@prisma/client'

export interface WalletProducersRepository {
  create(userId: string): Promise<WalletProducer>
}
