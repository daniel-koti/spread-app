import { Wallet } from '@prisma/client'

export interface WalletUserRepository {
  create(userId: string): Promise<Wallet>
}
