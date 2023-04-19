import { Prisma, Coupon } from '@prisma/client'

export interface PackagesRepository {
  create(data: Prisma.CouponUncheckedCreateInput): Promise<Coupon>
}
