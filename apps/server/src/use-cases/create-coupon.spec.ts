import { expect, describe, it, beforeAll } from 'vitest'

import { CreateCouponUseCase } from './create-coupon'
import { InMemoryCouponsRepository } from '../repositories/in-memory/in-memory-coupons-repository'
import { Prisma } from '@prisma/client'

let couponRepository: InMemoryCouponsRepository
let sut: CreateCouponUseCase

describe('Create Coupon Use case', () => {
  beforeAll(() => {
    couponRepository = new InMemoryCouponsRepository()
    sut = new CreateCouponUseCase(couponRepository)
  })

  it('should be able to create a event', async () => {
    const { coupon } = await sut.execute({
      coupon_type_id: 'vip',
      event_id: 'event-01',
      price: new Prisma.Decimal(200.0),
    })

    expect(coupon.event_id).toEqual('event-01')
  })
})
