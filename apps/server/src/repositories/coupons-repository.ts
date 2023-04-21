import { Prisma, Coupon } from '@prisma/client'

export interface CouponsRepository {
  create(data: Prisma.CouponUncheckedCreateInput): Promise<Coupon>
  findById(id: string): Promise<Coupon | null>
}
