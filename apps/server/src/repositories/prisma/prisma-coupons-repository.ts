import { Prisma } from '@prisma/client'
import { CouponsRepository } from '../coupons-repository'
import { prisma } from '@/lib/prisma'

export class PrismaCouponsRepository implements CouponsRepository {
  async create(data: Prisma.CouponUncheckedCreateInput) {
    const coupon = await prisma.coupon.create({
      data,
    })

    return coupon
  }

  async findById(id: string) {
    const coupon = await prisma.coupon.findFirst({
      where: {
        id,
      },
    })

    return coupon
  }

  async fetchByEvent(eventId: string) {
    const coupons = await prisma.coupon.findMany({
      where: {
        event_id: eventId,
      },
    })

    return coupons
  }
}
