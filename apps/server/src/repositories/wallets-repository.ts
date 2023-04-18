import { Wallet } from '@prisma/client'

export interface WalletsRepository {
  create(): Promise<Wallet>
}
