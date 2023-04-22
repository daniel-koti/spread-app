import { CreateCouponUseCase } from '../create-coupon'
import { PrismaCouponsRepository } from '../../repositories/prisma/prisma-coupons-repository'

export function makeCreateCouponUseCase() {
  const prismaCouponRepository = new PrismaCouponsRepository()
  const useCase = new CreateCouponUseCase(prismaCouponRepository)

  return useCase
}
