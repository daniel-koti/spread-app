import { randomUUID } from 'node:crypto'
import { Prisma, Coupon } from '@prisma/client'
import { CouponsRepository } from '../coupons-repository'

export class InMemoryCouponsRepository implements CouponsRepository {
  private items: Coupon[] = []

  async create(data: Prisma.CouponUncheckedCreateInput) {
    const coupon: Coupon = {
      id: randomUUID(),
      coupon_type_id: data.coupon_type_id,
      event_id: data.event_id,
      price: new Prisma.Decimal(data.price.toString()),
    }

    this.items.push(coupon)

    return coupon
  }

  async findById(id: string) {
    const coupon = this.items.find((item) => item.id === id)

    if (!coupon) {
      return null
    }

    return coupon
  }

  async fetchByEvent(eventId: string): Promise<Coupon[]> {
    return this.items.filter((item) => item.event_id === eventId)
  }
}
