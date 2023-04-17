import { WalletUser } from '@prisma/client'

export interface WalletUsersRepository {
  create(userId: string): Promise<WalletUser>
}
