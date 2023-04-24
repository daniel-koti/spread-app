import { expect, describe, it, beforeAll } from 'vitest'
import { Prisma } from '@prisma/client'

import { CreateCouponUseCase } from './create-coupon'
import { InMemoryCouponsRepository } from '../repositories/in-memory/in-memory-coupons-repository'

let couponRepository: InMemoryCouponsRepository

let sut: CreateCouponUseCase

describe('Create Coupon Use case', () => {
  beforeAll(() => {
    couponRepository = new InMemoryCouponsRepository()

    sut = new CreateCouponUseCase(couponRepository)
  })

  it('should be able to create a coupon', async () => {
    const { coupon } = await sut.execute({
      coupon_type_id: 'vip',
      event_id: '002',
      price: new Prisma.Decimal(200.0),
    })

    expect(coupon.event_id).toEqual('002')
  })
})
