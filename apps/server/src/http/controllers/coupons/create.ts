import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateCouponUseCase } from '@/use-cases/factories/make-create-coupon-use-case'
import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCouponBodySchema = z.object({
    price: z.number(),
    event_id: z.string(),
    coupon_type_id: z.string(),
  })

  const { price, event_id, coupon_type_id } = createCouponBodySchema.parse(
    request.body,
  )

  const isCouponTypeCreated = await prisma.couponType.findUnique({
    where: {
      id: coupon_type_id,
    },
  })

  if (!isCouponTypeCreated) {
    return reply.status(400).send({
      message: 'Coupon type not found',
    })
  }

  const isEventCreated = await prisma.event.findUnique({
    where: {
      id: event_id,
    },
  })

  if (!isEventCreated) {
    return reply.status(400).send({
      message: 'Event not found',
    })
  }

  const isCouponAlreadyExistsOnThisEvent = await prisma.coupon.findFirst({
    where: {
      event_id,
      coupon_type_id,
    },
  })

  if (isCouponAlreadyExistsOnThisEvent) {
    return reply.status(400).send({
      message: 'Coupon type already exists',
    })
  }

  const createCouponUseCase = makeCreateCouponUseCase()

  const coupon = await createCouponUseCase.execute({
    coupon_type_id,
    event_id,
    price: new Prisma.Decimal(price),
  })

  return reply.status(201).send(coupon)
}
