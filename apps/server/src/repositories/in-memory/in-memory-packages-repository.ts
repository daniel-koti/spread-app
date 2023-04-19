import { randomUUID } from 'node:crypto'
import { Prisma, Coupon } from '@prisma/client'
import { PackagesRepository } from '../packages-repository'

export class InMemoryPackagesRepository implements PackagesRepository {
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
}
