import { CouponsRepository } from '@/repositories/coupons-repository'
import { Prisma, Coupon } from '@prisma/client'

interface CreateCouponUseCaseRequest {
  event_id: string
  coupon_type_id: string
  price: Prisma.Decimal
}

interface CreateCouponUseCaseResponse {
  coupon: Coupon
}

export class CreateCouponUseCase {
  constructor(private couponsRepository: CouponsRepository) {}

  async execute({
    coupon_type_id,
    event_id,
    price,
  }: CreateCouponUseCaseRequest): Promise<CreateCouponUseCaseResponse> {
    const coupon = await this.couponsRepository.create({
      coupon_type_id,
      event_id,
      price,
    })

    return {
      coupon,
    }
  }
}
