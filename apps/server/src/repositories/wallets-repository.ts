import { Wallet } from '@prisma/client'

export interface WalletsRepository {
  create(): Promise<Wallet>
  findById(id: string): Promise<Wallet | null>
  save(wallet: Wallet): Promise<Wallet>
}
