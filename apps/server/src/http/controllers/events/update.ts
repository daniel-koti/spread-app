import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { NotAuthorizedError } from '@/use-cases/errors/not-authorized'
import { prisma } from '@/lib/prisma'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    imageUrl: z.string().nullable(),
    date_start: z.string().datetime(),
    date_end: z.string().datetime(),
    hour_start: z.string(),
    hour_end: z.string(),
    address: z.string(),
    type: z.string(),
    category_id: z.string(),
    latitude: z
      .number()
      .refine((value) => {
        return Math.abs(value) <= 90
      })
      .nullable(),
    longitude: z
      .number()
      .refine((value) => {
        return Math.abs(value) <= 180
      })
      .nullable(),
  })

  const data = requestBodySchema.parse(request.body)

  const authenticatedProfile = request.user.sub

  try {
    const event = await prisma.event.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
        producer_id: authenticatedProfile,
      },
    })

    return reply.status(201).send({ event })
  } catch (error) {
    if (error instanceof NotAuthorizedError) {
      return reply.status(401).send({ message: error.message })
    }

    throw error
  }
}
